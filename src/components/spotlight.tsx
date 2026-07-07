"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS, projectHref } from "@/lib/projects";
import { clsx } from "@/lib/clsx";

/**
 * Featured spotlight — list of 5 project names left, single spotlight image right.
 * Hovering a list item swaps the right image (with fade transition).
 */
export function Spotlight() {
  const featured = PROJECTS.filter((p) =>
    ["half-moon-jungle-party", "nfq-summit-asia-2025", "mer-minishow", "colorful-china", "bluezone-ecopark"].includes(
      p.slug,
    ),
  );
  const [activeSlug, setActiveSlug] = useState(featured[0]?.slug);

  const active = featured.find((p) => p.slug === activeSlug) ?? featured[0];

  return (
    <section className="bg-paper px-[var(--spacing-pad-x)] py-32 border-t border-orange">
      <div className="mx-auto max-w-[var(--spacing-max-w)] grid grid-cols-[1fr_1.2fr] gap-20 items-stretch max-md:grid-cols-1 max-md:gap-10">
        <div className="flex flex-col gap-10">
          <div data-reveal="slide-left">
            <div className="text-[13px] tracking-[0.32em] uppercase text-orange mb-3">
              / FEATURED ({featured.length})
            </div>
            <h2
              className="font-display leading-[0.95] tracking-[-0.03em] text-ink lowercase"
              style={{ fontSize: "clamp(48px, 6vw, 90px)" }}
            >
              look closer.
            </h2>
          </div>
          <ul
            className="list-none border-t border-orange"
            data-reveal
            data-delay="1"
          >
            {featured.map((project) => {
              const isActive = activeSlug === project.slug;
              return (
                <li
                  key={project.slug}
                  onMouseEnter={() => setActiveSlug(project.slug)}
                  className="border-b border-orange"
                >
                  <Link
                    href={projectHref(project)}
                    className={clsx(
                      "flex justify-between items-center py-5 gap-6 font-display uppercase leading-[1.05] tracking-[0.02em]",
                      "transition-[padding-left,color] duration-300",
                      isActive ? "text-orange pl-4" : "text-ink",
                    )}
                    style={{ fontSize: "clamp(22px, 2.2vw, 32px)" }}
                  >
                    <span>{project.title}</span>
                    <span
                      className={clsx(
                        "text-base transition-transform duration-300",
                        isActive && "translate-x-1.5",
                      )}
                    >
                      →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div
          className="relative overflow-hidden bg-sand aspect-[4/5] min-h-[520px] max-md:min-h-[400px]"
          data-reveal="slide-right"
          data-delay="1"
        >
          {featured.map((project) => (
            <Image
              key={project.slug}
              src={project.heroImage}
              alt={project.title}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={clsx(
                "object-cover transition-opacity duration-400",
                project.slug === active?.slug ? "opacity-100" : "opacity-0",
              )}
              priority={project.slug === featured[0]?.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
