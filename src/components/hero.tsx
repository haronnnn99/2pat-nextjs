"use client";

import { useEffect, useRef } from "react";
import { Pill } from "./pill";

/**
 * Landing hero — 100vh, centered 2PAT wordmark with parallax fade on scroll.
 * The wordmark uses inline min(vw, vh, cap) so it never overflows the viewport.
 */
export function Hero() {
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const wordmark = wordmarkRef.current;
      const section = sectionRef.current;
      if (!wordmark || !section) return;
      const progress = Math.min(window.scrollY / section.offsetHeight, 1);
      wordmark.style.transform = `translateY(-${progress * 50}px) scale(${1 - progress * 0.12})`;
      wordmark.style.opacity = `${1 - progress * 0.55}`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[600px] px-[var(--spacing-pad-x)] pt-20 pb-8 overflow-hidden flex flex-col items-center"
    >
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h1
          ref={wordmarkRef}
          className="font-display uppercase leading-[0.88] tracking-[-0.04em] text-orange text-center will-change-transform"
          style={{ fontSize: "min(22vw, 38vh, 320px)" }}
          data-reveal="scale"
        >
          2PAT
        </h1>
        <p
          className="mt-3 font-body uppercase text-[13px] tracking-[0.32em] text-ink-soft"
          data-reveal
          data-delay="2"
        >
          Choose the right place · Seize the right time
        </p>
      </div>

      <div className="mt-auto pt-6 w-full grid grid-cols-[1fr_auto_1fr] items-end gap-6 text-[13px] tracking-[0.21px] relative z-[5] max-md:grid-cols-1">
        <p
          className="max-w-[240px] text-ink leading-[1.35]"
          data-reveal="slide-left"
          data-delay="3"
        >
          An event planner, media &amp; branding studio. Crafting moments that
          stay.
        </p>
        <div
          className="justify-self-center text-center text-[11px] uppercase tracking-[0.3em] text-ink-soft leading-[1.4]"
          data-reveal
          data-delay="4"
        >
          Scroll
          <span className="block mt-1.5 text-lg text-orange animate-bounce">
            ↓
          </span>
        </div>
        <div
          className="justify-self-end flex gap-2.5 text-ink max-md:justify-self-start"
          data-reveal="slide-right"
          data-delay="3"
        >
          <SocialCircle label="Instagram">IG</SocialCircle>
          <SocialCircle label="Facebook">FB</SocialCircle>
          <SocialCircle label="YouTube">YT</SocialCircle>
          <SocialCircle label="TikTok">TT</SocialCircle>
        </div>
      </div>
    </section>
  );
}

function SocialCircle({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href="#"
      aria-label={label}
      className="w-8 h-8 rounded-full border border-orange text-orange flex items-center justify-center text-[11px] font-bold tracking-[0] transition-colors hover:bg-orange hover:text-paper"
    >
      {children}
    </a>
  );
}

/** Empty component kept for callers importing Pill from hero context. */
export { Pill };
