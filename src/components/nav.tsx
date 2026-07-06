"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pill } from "./pill";
import { clsx } from "@/lib/clsx";

/** Adaptive nav — inverts to on-dark variant when a `data-nav-dark` section
 *  is under the probe line. Set data-nav-dark on any orange bg section. */
export function Nav({ activePath }: { activePath?: string }) {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const probeY = 32; // NAV_HEIGHT / 2
    let ticking = false;
    const update = () => {
      ticking = false;
      const darks = document.querySelectorAll<HTMLElement>("[data-nav-dark]");
      let active = false;
      for (const s of Array.from(darks)) {
        const r = s.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) {
          active = true;
          break;
        }
      }
      setOnDark(active);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/works", label: "Works" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-[100] grid grid-cols-[1fr_auto_1fr] items-center",
        "px-[var(--spacing-pad-x)] py-4",
        "border-b transition-[background-color,color,border-color] duration-400",
        onDark
          ? "bg-orange border-b-paper text-paper"
          : "bg-paper border-b-transparent text-ink",
      )}
    >
      <Link
        href="/"
        className="font-display text-[22px] uppercase tracking-[0.06em] justify-self-start"
      >
        2PAT
      </Link>
      <ul className="flex gap-9 justify-self-center list-none">
        {links.map(({ href, label }) => {
          const isActive = activePath === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  "font-body font-medium text-[13px] uppercase tracking-[0.18em] py-1",
                  "transition-colors duration-150",
                  isActive && !onDark && "text-orange",
                  isActive && onDark && "opacity-70",
                  !isActive && "hover:opacity-70",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="justify-self-end">
        <Pill href="/contact" variant={onDark ? "inverted" : "outline"}>
          Start →
        </Pill>
      </div>
    </nav>
  );
}
