"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS, projectHref, type ServiceCategory } from "@/lib/projects";
import { clsx } from "@/lib/clsx";

type FilterValue = "all" | ServiceCategory;

/**
 * Works archive — 4-col asymmetric mosaic with filter pills (sand bg to match landing).
 * The mosaic layout has been reshuffled from the mockup to keep 3 rows full.
 */
export function Archive() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const counts = useMemo(() => {
    const total = PROJECTS.length;
    return {
      all: total,
      event: PROJECTS.filter((p) => p.service === "event").length,
      media: PROJECTS.filter((p) => p.service === "media").length,
      branding: PROJECTS.filter((p) => p.service === "branding").length,
      show: PROJECTS.filter((p) => p.service === "show").length,
    };
  }, []);

  const filters: { value: FilterValue; label: string }[] = [
    { value: "all", label: `All (${counts.all})` },
    { value: "event", label: `Event (${counts.event})` },
    { value: "media", label: `Media (${counts.media})` },
    { value: "branding", label: `Branding (${counts.branding})` },
    { value: "show", label: `Show (${counts.show})` },
  ];

  // Reorder projects for the mosaic — matches the mockup's manual placement.
  const orderedSlugs = [
    "half-moon-jungle-party", // tall, col 1 rows 1-2
    "nfq-summit-asia-2025",   // wide, cols 2-3 row 1
    "mer-minishow",            // tall, col 4 rows 1-2
    "haniff-2024",             // standard, col 2 row 2
    "bluezone-ecopark",        // standard, col 3 row 2
    "colorful-china",          // standard, row 3 col 1
    "deli-lifestyle",          // standard, row 3 col 2
    "trang-kien",              // standard, row 3 col 3
    "co-cam",                  // standard, row 3 col 4
  ];
  const orderedProjects = orderedSlugs
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter((p): p is (typeof PROJECTS)[number] => Boolean(p));

  return (
    <section id="archive" className="bg-sand pt-24 pb-0 border-t border-ink">
      <div className="max-w-[var(--spacing-max-w)] mx-auto mb-8 px-[var(--spacing-pad-x)]">
        <div
          className="text-[13px] tracking-[0.32em] uppercase text-ink-soft mb-4"
          data-reveal="slide-left"
        >
          / THE ARCHIVE ({counts.all})
        </div>
        <h2
          className="font-display leading-[0.92] tracking-[-0.03em] text-ink lowercase"
          style={{ fontSize: "clamp(56px, 9vw, 160px)" }}
          data-reveal
          data-delay="1"
        >
          the receipts.
        </h2>
      </div>

      <div
        className="max-w-[var(--spacing-max-w)] mx-auto px-[var(--spacing-pad-x)] flex gap-2 flex-wrap mb-10"
        data-reveal
        data-delay="2"
      >
        {filters.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={clsx(
              "border rounded-pill py-[9px] px-[18px] font-body font-medium text-xs tracking-[0.18em] uppercase transition-colors",
              filter === value
                ? "bg-orange text-paper border-orange"
                : "bg-transparent text-ink border-ink hover:bg-orange hover:text-paper hover:border-orange",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 auto-rows-[320px] gap-3 px-3 bg-sand max-md:grid-cols-2 max-md:auto-rows-[240px]">
        {orderedProjects.map((project) => {
          const hidden = filter !== "all" && project.service !== filter;
          const size = project.mosaic ?? "standard";
          return (
            <Link
              key={project.slug}
              href={projectHref(project)}
              className={clsx(
                "group relative overflow-hidden bg-ink cursor-pointer",
                hidden && "hidden",
                size === "tall" && "row-span-2 max-md:row-span-2",
                size === "wide" && "col-span-2 max-md:col-span-2",
                size === "big" && "col-span-2 row-span-2",
              )}
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                sizes="(max-width: 900px) 50vw, 25vw"
                className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,rgba(0,0,0,0.78)_100%)] transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute left-6 right-6 bottom-[22px] flex justify-between items-center gap-4 z-[2] text-paper">
                <span className="font-body font-medium text-[15px] leading-[1.3] tracking-[0.01em]">
                  {project.title}
                  <span className="opacity-55 mx-2 font-light">/</span>
                  {project.serviceLabel.split(" ")[0]}
                </span>
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 w-9 h-9 rounded-full border border-paper flex items-center justify-center text-[15px] leading-none transition-[background-color,color,transform] duration-300 group-hover:bg-paper group-hover:text-ink group-hover:-rotate-45"
                >
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="bg-sand pt-14 pb-24 text-center">
        <span className="block text-xs tracking-[0.32em] uppercase text-ink-soft opacity-70">
          — end of archive
        </span>
      </div>
    </section>
  );
}
