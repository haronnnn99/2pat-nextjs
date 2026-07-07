export function ContactHero() {
  return (
    <section className="min-h-screen bg-paper px-[var(--spacing-pad-x)] pt-36 pb-20 flex items-center">
      <div className="mx-auto max-w-[var(--spacing-max-w)] w-full grid grid-cols-[1.2fr_1fr] gap-14 items-end max-md:grid-cols-1 max-md:gap-8 max-md:items-start">
        <div className="flex flex-col gap-8">
          <div className="text-[14px] tracking-[0.32em] uppercase text-orange" data-reveal>
            / CONTACT
          </div>
          <h1
            className="font-display leading-[0.92] tracking-[-0.04em] text-ink lowercase"
            style={{ fontSize: "clamp(72px, 11vw, 180px)" }}
            data-reveal="scale"
            data-delay="1"
          >
            let&rsquo;s make<br />it real.
          </h1>
          <p className="text-[18px] leading-[1.45] text-ink max-w-[520px]" data-reveal data-delay="2">
            Got an event in mind? A story to tell? A brand worth building?
            We&rsquo;re a small team in HCMC — full-stack producer, end-to-end
            ownership, no hand-offs.
          </p>
        </div>
        <div
          className="text-[11px] tracking-[0.21em] uppercase text-ink-soft leading-[1.6] text-right max-md:text-left"
          data-reveal="slide-right"
          data-delay="2"
        >
          ( 2pat<br />
          est. <strong className="text-ink font-bold">2024</strong><br />
          HCMC, vietnam<br /><br />
          contact@2pat-vn.com<br />
          035-322-0598 )
        </div>
      </div>
    </section>
  );
}
