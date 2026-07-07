export function IntroCard({
  eyebrow,
  slogan,
  em,
  foot,
}: {
  eyebrow: string;
  slogan: string;
  em: string;
  foot: string;
}) {
  return (
    <section
      data-nav-dark
      className="min-h-screen bg-orange text-paper px-[var(--spacing-pad-x)] py-24 flex flex-col items-center justify-center border-t border-ink"
    >
      <div
        className="text-[13px] tracking-[0.32em] uppercase text-paper/70 mb-10 self-start w-full max-w-[var(--spacing-max-w)] mx-auto"
        data-reveal="slide-left"
      >
        {eyebrow}
      </div>
      <p
        className="font-display leading-[0.92] tracking-[-0.04em] text-paper lowercase max-w-[var(--spacing-max-w)] w-full mx-auto"
        style={{ fontSize: "clamp(60px, 9vw, 150px)" }}
        data-reveal
        data-delay="1"
      >
        <span dangerouslySetInnerHTML={{ __html: slogan }} />
        <span
          className="block mt-4 italic opacity-75 tracking-[-0.02em]"
          style={{ fontSize: "0.45em" }}
        >
          {em}
        </span>
      </p>
      <div
        className="mt-auto pt-20 w-full max-w-[var(--spacing-max-w)] mx-auto flex justify-between items-end text-paper text-sm tracking-[0.21px]"
        data-reveal
        data-delay="3"
      >
        <span>{foot}</span>
        <span className="uppercase tracking-[0.3em] text-[11px] opacity-80">
          Continue{" "}
          <span className="inline-block ml-2.5 text-sm animate-bounce">↓</span>
        </span>
      </div>
    </section>
  );
}
