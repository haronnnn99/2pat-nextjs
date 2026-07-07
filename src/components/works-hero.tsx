import Image from "next/image";
import { Pill } from "./pill";

export function WorksHero() {
  return (
    <section className="bg-paper px-[var(--spacing-pad-x)] pt-36 pb-20">
      <div className="mx-auto max-w-[var(--spacing-max-w)] grid grid-cols-2 gap-14 items-stretch max-md:grid-cols-1 max-md:gap-10">
        <div className="flex flex-col gap-8 justify-center py-10">
          <div
            className="text-[14px] tracking-[0.32em] uppercase text-orange"
            data-reveal
          >
            / EVERY PROJECT, 2024 — 2025
          </div>
          <h1
            className="font-display leading-[0.95] tracking-[-0.03em] text-ink lowercase"
            style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
            data-reveal="scale"
            data-delay="1"
          >
            we ship<br />the whole thing.
          </h1>
          <p
            className="text-[18px] leading-[1.45] text-ink max-w-[460px]"
            data-reveal
            data-delay="2"
          >
            Selected projects across event planning, media production, branding
            &amp; content, and show production — every piece end-to-end produced
            or owned by 2PAT.
          </p>

          <div
            className="mt-6 grid grid-cols-[auto_1fr_auto] gap-7 items-end max-md:grid-cols-[1fr_auto]"
            data-reveal
            data-delay="3"
          >
            <div className="text-[11px] tracking-[0.21em] uppercase text-ink-soft leading-[1.6] max-w-[200px]">
              ( 2pat<br />est. 2024<br />HCMC, vietnam )
            </div>
            <div className="relative w-[120px] h-[120px] bg-sand max-md:hidden">
              <Image
                src="/portfolio-ref/page-15.png"
                alt="2PAT detail"
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
            <Pill href="/contact">Start a project ↗</Pill>
          </div>
        </div>

        <div
          className="relative bg-sand aspect-[4/5] min-h-[500px] max-md:aspect-[4/3] max-md:min-h-0"
          data-reveal="fade"
          data-delay="2"
        >
          <Image
            src="/portfolio-ref/page-06.png"
            alt="Featured: Half Moon & Jungle Party"
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
