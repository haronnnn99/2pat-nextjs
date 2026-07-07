/** Contact page closing — manifesto strip echoing the brand tagline. */
export function ClosingManifesto() {
  return (
    <section
      data-nav-dark
      className="min-h-screen bg-orange text-paper border-t border-ink px-[var(--spacing-pad-x)] py-24 flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div
        className="text-[13px] tracking-[0.32em] uppercase text-paper/70 mb-10 self-start w-full max-w-[var(--spacing-max-w)] mx-auto"
        data-reveal="slide-left"
      >
        — Our promise
      </div>
      <p
        className="font-display leading-[0.92] tracking-[-0.04em] text-paper lowercase max-w-[var(--spacing-max-w)] w-full mx-auto"
        style={{ fontSize: "clamp(60px, 10vw, 170px)" }}
        data-reveal
        data-delay="1"
      >
        the right place,
        <br />
        the right time.
        <span
          className="block mt-4 italic opacity-75 tracking-[-0.02em]"
          style={{ fontSize: "0.45em" }}
        >
          — since 2024. hcmc.
        </span>
      </p>
      <div
        className="mt-auto pt-20 w-full max-w-[var(--spacing-max-w)] mx-auto flex justify-between text-paper text-sm tracking-[0.21px]"
        data-reveal
        data-delay="3"
      >
        <span>2pat · est. 2024</span>
        <span>contact@2pat-vn.com</span>
      </div>
    </section>
  );
}
