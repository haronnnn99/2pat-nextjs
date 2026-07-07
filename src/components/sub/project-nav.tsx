import Link from "next/link";

/** Prev / Next strip before footer on every sub-page. */
export function ProjectNav({
  prev,
  next,
}: {
  prev: { slug: string; title: string; meta: string };
  next: { slug: string; title: string; meta: string };
}) {
  return (
    <section className="py-14 bg-paper border-t border-orange border-b">
      <div className="max-w-[var(--spacing-max-w)] mx-auto px-[var(--spacing-pad-x)] grid grid-cols-2 gap-10 items-start max-md:grid-cols-1 max-md:gap-8">
        <Link
          href={`/works/${prev.slug}`}
          className="group flex flex-col gap-2 transition-colors"
          data-reveal="slide-left"
        >
          <div className="text-[14px] tracking-[0.21em] uppercase text-orange">
            ← Previous
          </div>
          <div
            className="font-display leading-[0.95] tracking-[-0.02em] lowercase text-ink transition-colors group-hover:text-orange"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
          >
            {prev.title}
          </div>
          <div className="text-xs tracking-[0.18em] uppercase text-ink-soft">
            {prev.meta}
          </div>
        </Link>

        <Link
          href={`/works/${next.slug}`}
          className="group flex flex-col gap-2 text-right items-end transition-colors max-md:text-left max-md:items-start"
          data-reveal="slide-right"
        >
          <div className="text-[14px] tracking-[0.21em] uppercase text-orange">
            Next →
          </div>
          <div
            className="font-display leading-[0.95] tracking-[-0.02em] lowercase text-ink transition-colors group-hover:text-orange"
            style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
          >
            {next.title}
          </div>
          <div className="text-xs tracking-[0.18em] uppercase text-ink-soft">
            {next.meta}
          </div>
        </Link>
      </div>
    </section>
  );
}
