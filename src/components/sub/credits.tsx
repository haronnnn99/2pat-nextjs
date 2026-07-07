export function Credits({
  credits,
  watermark,
}: {
  credits: { role: string; name: string }[];
  watermark: string;
}) {
  return (
    <section className="relative overflow-hidden bg-paper px-[var(--spacing-pad-x)] py-24">
      {/* Watermark — Anton huge red, opacity 0.07, absolute center behind content */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display leading-[0.85] tracking-[-0.04em] text-orange whitespace-nowrap pointer-events-none uppercase"
        style={{ fontSize: "clamp(180px, 24vw, 380px)", opacity: 0.07, zIndex: 0 }}
      >
        {watermark}
      </div>

      <div className="relative z-[1] max-w-[var(--spacing-max-w)] mx-auto grid grid-cols-[1fr_3fr] gap-20 max-md:grid-cols-1 max-md:gap-10">
        <h2
          className="font-display font-normal text-[35px] leading-[1.15] tracking-[-0.02em] text-ink lowercase"
          data-reveal="slide-left"
        >
          credits.
        </h2>
        <dl className="grid grid-cols-2 gap-x-14 gap-y-8 max-md:grid-cols-1" data-reveal="slide-right" data-delay="2">
          {credits.map((c, i) => (
            <div key={i}>
              <dt className="text-[14px] tracking-[0.21em] uppercase text-orange mb-1.5">
                {c.role}
              </dt>
              <dd className="text-base text-ink">{c.name}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
