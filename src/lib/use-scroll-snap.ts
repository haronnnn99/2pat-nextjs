"use client";

import { useEffect } from "react";

const NAV_HEIGHT = 64;
const SCROLL_DURATION = 950; // ms — snap animation length
const LOCK_MS = 1250; // ms — ignore wheel during + after snap
const MIN_DELTA = 6; // px — min wheel delta to trigger snap

const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t ** 4 : 1 - ((-2 * t + 2) ** 4) / 2;

/**
 * JS-driven scroll snap between sections matching `selector`.
 * Ported verbatim from the mockup script blocks — battle-tested against
 * touchpad inertia + midpoint boundary bugs.
 *
 * Do NOT combine with CSS scroll-snap-type — they will fight and stutter.
 */
export function useScrollSnap(selector: string) {
  useEffect(() => {
    const snapTargets = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    );
    if (snapTargets.length === 0) return;

    let isProgrammaticScrolling = false;
    let wheelLocked = false;
    let wheelLockTimer: ReturnType<typeof setTimeout> | null = null;

    const absTop = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY;

    const smoothScrollTo = (targetY: number, duration = SCROLL_DURATION) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 2) return Promise.resolve();
      isProgrammaticScrolling = true;
      const t0 = performance.now();
      return new Promise<void>((resolve) => {
        const step = (now: number) => {
          const p = Math.min((now - t0) / duration, 1);
          window.scrollTo(0, startY + distance * easeInOutQuart(p));
          if (p < 1) {
            requestAnimationFrame(step);
          } else {
            isProgrammaticScrolling = false;
            resolve();
          }
        };
        requestAnimationFrame(step);
      });
    };

    const snapTo = (index: number) => {
      if (index < 0 || index >= snapTargets.length) return;
      const el = snapTargets[index];
      const targetY = index === 0 ? 0 : Math.max(0, absTop(el) - NAV_HEIGHT);
      return smoothScrollTo(targetY);
    };

    const lockWheel = () => {
      wheelLocked = true;
      if (wheelLockTimer) clearTimeout(wheelLockTimer);
      wheelLockTimer = setTimeout(() => {
        wheelLocked = false;
      }, LOCK_MS);
    };

    const inSnapZone = () => {
      const last = snapTargets[snapTargets.length - 1];
      return window.scrollY < absTop(last) + window.innerHeight * 0.6;
    };

    // Overlap-based current index (avoids midpoint boundary bugs).
    const getCurrentSnapIndex = () => {
      const viewTop = window.scrollY;
      const viewBottom = viewTop + window.innerHeight;
      let bestIdx = 0;
      let bestOverlap = -1;
      snapTargets.forEach((el, i) => {
        const top = absTop(el);
        const bottom = top + el.offsetHeight;
        const overlap = Math.max(
          0,
          Math.min(bottom, viewBottom) - Math.max(top, viewTop),
        );
        if (overlap > bestOverlap) {
          bestOverlap = overlap;
          bestIdx = i;
        }
      });
      return bestIdx;
    };

    const isTypingInForm = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        target.isContentEditable
      );
    };

    const onWheel = (e: WheelEvent) => {
      if (!inSnapZone()) return;
      if (isTypingInForm(e.target)) return;
      if (wheelLocked || isProgrammaticScrolling) {
        e.preventDefault();
        return;
      }
      if (Math.abs(e.deltaY) < MIN_DELTA) return;
      e.preventDefault();
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIdx = getCurrentSnapIndex() + direction;
      if (nextIdx >= 0 && nextIdx < snapTargets.length) {
        snapTo(nextIdx);
        lockWheel();
      } else if (nextIdx >= snapTargets.length) {
        const last = snapTargets[snapTargets.length - 1];
        smoothScrollTo(last.offsetTop + last.offsetHeight, 480);
        lockWheel();
      }
    };

    const KEYS_DOWN = ["ArrowDown", "PageDown", " "];
    const KEYS_UP = ["ArrowUp", "PageUp"];
    const onKey = (e: KeyboardEvent) => {
      if (!inSnapZone() || wheelLocked || isProgrammaticScrolling) return;
      if (isTypingInForm(e.target)) return;
      const cur = getCurrentSnapIndex();
      if (KEYS_DOWN.includes(e.key)) {
        e.preventDefault();
        snapTo(cur + 1);
        lockWheel();
      } else if (KEYS_UP.includes(e.key)) {
        e.preventDefault();
        snapTo(cur - 1);
        lockWheel();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      if (!inSnapZone()) return;
      if (isTypingInForm(e.target)) return;
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!inSnapZone() || wheelLocked || isProgrammaticScrolling) return;
      if (isTypingInForm(e.target)) return;
      const dy = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(dy) < 50) return;
      snapTo(getCurrentSnapIndex() + (dy > 0 ? 1 : -1));
      lockWheel();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      if (wheelLockTimer) clearTimeout(wheelLockTimer);
    };
  }, [selector]);
}
