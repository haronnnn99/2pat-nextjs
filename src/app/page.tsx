import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Pill } from "@/components/pill";
import { RevealObserver } from "@/components/reveal-observer";

export default function HomePage() {
  return (
    <>
      <Nav activePath="/" />
      <RevealObserver />

      {/* HERO — cream bg, orange 2PAT wordmark. Verifies fonts + tokens. */}
      <section className="relative h-screen min-h-[600px] px-[var(--spacing-pad-x)] pt-20 pb-8 overflow-hidden flex flex-col items-center">
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <h1
            className="font-display uppercase leading-[0.88] tracking-[-0.04em] text-orange text-center"
            style={{ fontSize: "min(22vw, 38vh, 320px)" }}
            data-reveal="scale"
          >
            2PAT
          </h1>
          <p
            className="mt-3 font-body uppercase text-[13px] tracking-[0.32em] text-ink-soft"
            data-reveal
            data-delay="2"
          >
            Choose the right place · Seize the right time
          </p>
        </div>

        <div className="mt-auto pt-6 w-full grid grid-cols-[1fr_auto_1fr] items-end gap-6 text-[13px] tracking-[0.21px] relative z-[5]">
          <p
            className="max-w-[240px] text-ink leading-[1.35]"
            data-reveal="slide-left"
            data-delay="3"
          >
            An event planner, media &amp; branding studio. Crafting moments that
            stay.
          </p>
          <div
            className="justify-self-center text-center text-[11px] uppercase tracking-[0.3em] text-ink-soft leading-[1.4]"
            data-reveal
            data-delay="4"
          >
            Scroll
            <span className="block mt-1.5 text-lg text-orange animate-bounce">
              ↓
            </span>
          </div>
          <div
            className="justify-self-end"
            data-reveal="slide-right"
            data-delay="3"
          >
            <Pill href="/contact">Start a project ↗</Pill>
          </div>
        </div>
      </section>

      {/* MANIFESTO (orange bg — verifies data-nav-dark inverts the nav). */}
      <section
        data-nav-dark
        className="min-h-screen bg-orange text-paper px-[var(--spacing-pad-x)] py-24 flex flex-col items-center justify-center relative overflow-hidden"
      >
        <div
          className="text-[13px] tracking-[0.32em] uppercase text-paper/70 mb-10 self-start w-full max-w-[var(--spacing-max-w)] mx-auto"
          data-reveal="slide-left"
        >
          — Our belief
        </div>
        <p
          className="font-display leading-[0.92] tracking-[-0.04em] text-paper lowercase max-w-[var(--spacing-max-w)] w-full mx-auto"
          style={{ fontSize: "clamp(70px, 11vw, 180px)" }}
          data-reveal
          data-delay="1"
        >
          an event is more
          <br />
          than a gathering.
          <span
            className="block mt-4 italic opacity-75 tracking-[-0.02em]"
            style={{ fontSize: "0.45em" }}
          >
            — it&rsquo;s an emotional journey.
          </span>
        </p>
      </section>

      <Footer />
    </>
  );
}
