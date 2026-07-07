import Link from "next/link";
import Image from "next/image";
import { Pill } from "./pill";
import { PROJECTS, projectHref, type Project } from "@/lib/projects";
import { clsx } from "@/lib/clsx";

/**
 * Landing projects section — 4-col asymmetric mosaic on sand bg.
 * Shows 8 cards (skips one to keep the sizing pattern balanced).
 */
export function ProjectsMosaic() {
  const featured = PROJECTS.slice(0, 8); // 8 cards for the landing mosaic

  return (
    <section id="works" className="bg-sand overflow-hidden">
      {/* Banner header */}
      <div className="relative px-[var(--spacing-pad-x)] pt-20 pb-14 text-center bg-sand">
        <div
          className="text-[13px] tracking-[0.32em] uppercase text-ink-soft mb-8"
          data-reveal
        >
          — Selected works
        </div>
        <h2
          className="font-display uppercase leading-[0.9] tracking-[0.08em] text-ink"
          style={{ fontSize: "clamp(90px, 14vw, 220px)" }}
          data-reveal
          data-delay="2"
        >
          PORTFOLIO
        </h2>
      </div>

      {/* Mosaic grid — 4 cols, asymmetric heights, 12px gap */}
      <div className="grid grid-cols-4 auto-rows-[320px] gap-3 px-3 bg-sand max-md:grid-cols-2 max-md:auto-rows-[240px]">
        {featured.map((project, i) => (
          <MosaicCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/* Footer CTA */}
      <div className="bg-sand px-[var(--spacing-pad-x)] pt-20 pb-24 text-center">
        <span className="block text-xs tracking-[0.32em] uppercase text-ink-soft opacity-70 mb-6">
          — more projects in the archive
        </span>
        <Pill href="/works" variant="inverted">
          More projects →
        </Pill>
      </div>
    </section>
  );
}

function MosaicCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const size = project.mosaic ?? "standard";
  const sizeClasses = clsx(
    size === "tall" && "row-span-2 max-md:row-span-2",
    size === "wide" && "col-span-2 max-md:col-span-2",
    size === "big" && "col-span-2 row-span-2 max-md:col-span-2 max-md:row-span-2",
  );

  return (
    <Link
      href={projectHref(project)}
      data-reveal
      className={clsx(
        "group relative overflow-hidden bg-ink cursor-pointer",
        sizeClasses,
      )}
    >
      <Image
        src={project.heroImage}
        alt={project.title}
        fill
        sizes="(max-width: 900px) 50vw, 25vw"
        className="object-cover transition-transform duration-[600ms] group-hover:scale-[1.04]"
        priority={index < 3}
      />
      {/* Gradient over bottom strip where text lives */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_55%,rgba(0,0,0,0.78)_100%)] transition-opacity duration-300 group-hover:opacity-90" />

      <div className="absolute left-6 right-6 bottom-[22px] flex justify-between items-center gap-4 z-[2] text-paper">
        <span className="font-body font-medium text-[15px] leading-[1.3] tracking-[0.01em]">
          {project.title}
          <span className="opacity-55 mx-2 font-light">/</span>
          {project.serviceLabel}
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
}
