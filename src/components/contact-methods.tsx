import Link from "next/link";

/**
 * Contact methods — 4-cell grid on cream bg. Email / Phone / Visit / Follow.
 * Full-height row so each cell aligns bottom-to-bottom regardless of content.
 */
export function ContactMethods() {
  return (
    <section className="min-h-screen bg-paper px-[var(--spacing-pad-x)] py-20 flex flex-col justify-center">
      <div className="mx-auto max-w-[var(--spacing-max-w)] w-full">
        <div className="text-[14px] tracking-[0.21em] uppercase text-orange mb-4" data-reveal>
          / OTHER WAYS
        </div>
        <h2
          className="font-display leading-[0.95] tracking-[-0.03em] text-ink lowercase"
          style={{ fontSize: "clamp(46px, 6vw, 88px)" }}
          data-reveal
          data-delay="1"
        >
          four doors,<br />one team.
        </h2>

        <div className="mt-14 grid grid-cols-4 gap-3 max-md:grid-cols-1">
          <a
            href="mailto:contact@2pat-vn.com"
            className="group border border-ink bg-paper py-9 px-7 flex flex-col gap-4 min-h-[220px]"
            data-reveal
          >
            <div className="font-display text-[22px] leading-none text-orange">01</div>
            <div className="text-[11px] tracking-[0.24em] uppercase text-ink-soft">/ Email</div>
            <div className="font-display leading-[1.1] tracking-[-0.01em] uppercase text-ink mt-auto transition-colors group-hover:text-orange" style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}>
              contact@<br />2pat-vn.com
            </div>
          </a>

          <a
            href="tel:0353220598"
            className="group border border-ink bg-paper py-9 px-7 flex flex-col gap-4 min-h-[220px]"
            data-reveal
            data-delay="1"
          >
            <div className="font-display text-[22px] leading-none text-orange">02</div>
            <div className="text-[11px] tracking-[0.24em] uppercase text-ink-soft">/ Phone</div>
            <div className="font-display leading-[1.1] tracking-[-0.01em] uppercase text-ink mt-auto transition-colors group-hover:text-orange" style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}>
              035 322<br />0598
            </div>
          </a>

          <div className="border border-ink bg-paper py-9 px-7 flex flex-col gap-4 min-h-[220px]" data-reveal data-delay="2">
            <div className="font-display text-[22px] leading-none text-orange">03</div>
            <div className="text-[11px] tracking-[0.24em] uppercase text-ink-soft">/ Visit</div>
            <div className="font-display leading-[1.1] tracking-[-0.01em] uppercase text-ink mt-auto" style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}>
              HCMC,<br />vietnam
            </div>
          </div>

          <div className="border border-ink bg-paper py-9 px-7 flex flex-col gap-4 min-h-[220px]" data-reveal data-delay="3">
            <div className="font-display text-[22px] leading-none text-orange">04</div>
            <div className="text-[11px] tracking-[0.24em] uppercase text-ink-soft">/ Follow</div>
            <div className="mt-auto flex gap-2 flex-wrap">
              {["IG", "FB", "YT", "TT"].map((label) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="border border-ink rounded-full w-[38px] h-[38px] flex items-center justify-center text-[11px] font-bold tracking-[0.05em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
