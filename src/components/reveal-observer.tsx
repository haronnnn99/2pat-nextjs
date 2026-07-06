"use client";

import { useEffect } from "react";

/**
 * Client-side reveal observer — adds `.in-view` to elements with `data-reveal`
 * when they scroll into view. Mount once at the layout root.
 *
 * Reproduces the IntersectionObserver pattern from the mockup script blocks.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
