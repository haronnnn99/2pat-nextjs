import Link from "next/link";

/**
 * Landing CTA — "let's make it real" on cream with orange headline.
 * Reverted from red-deep bg → cream + orange text per anh 2026-06-25.
 */
export function CTA() {
  return (
    <section
      id="contact"
      className="bg-paper text-ink border-t border-ink px-[var(--spacing-pad-x)] pt-36 pb-32 text-left"
    >
      <div className="mx-auto max-w-[var(--spacing-max-w)] relative">
        <h2
          className="font-display leading-[0.88] tracking-[-0.05em] text-orange lowercase"
          style={{ fontSize: "clamp(120px, 18vw, 280px)" }}
          data-reveal
        >
          let&rsquo;s<br />make<br />it real.
        </h2>
        <p
          className="mt-8 text-[23px] leading-[1.2] max-w-[540px] text-ink-soft"
          data-reveal
          data-delay="2"
        >
          Got an event in mind? Got a story waiting to be told? Let&rsquo;s
          build it together.
        </p>
        <Link
          href="/contact"
          data-reveal
          data-delay="3"
          className="mt-12 inline-flex items-center gap-2 border border-ink rounded-pill px-7 py-4 text-base transition-colors hover:bg-orange hover:text-paper hover:border-orange"
        >
          Start a project →
        </Link>
      </div>
    </section>
  );
}
