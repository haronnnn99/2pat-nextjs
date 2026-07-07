import Link from "next/link";
import Image from "next/image";
import { Pill } from "./pill";
import { ServicesAccordion } from "./services-accordion";
import { getServices } from "@/lib/sanity/queries";

/**
 * About + Services section — Anton huge "WE ARE 2PAT TEAM OF ... STORYTELLERS"
 * with scribble accents, then services accordion, team block, and the huge
 * CONTACT US scribble CTA.
 *
 * Async server component: fetches services from Sanity, hands them to the
 * client-side accordion for stateful interaction.
 */
export async function AboutServices() {
  const services = await getServices();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-paper px-[var(--spacing-pad-x)] py-32"
    >
      <div className="mx-auto max-w-[var(--spacing-max-w)]">
        <h2
          className="relative font-display uppercase leading-[1.02] tracking-[0.01em] text-ink max-w-[1000px]"
          style={{ fontSize: "clamp(48px, 6.5vw, 96px)" }}
          data-reveal
        >
          WE ARE THE 2PAT TEAM OF{" "}
          <span className="relative inline-block">
            EVENT,
            <svg
              viewBox="0 0 300 80"
              preserveAspectRatio="none"
              className="absolute pointer-events-none overflow-visible"
              style={{
                left: "-8%",
                top: "-15%",
                width: "116%",
                height: "130%",
              }}
            >
              <ellipse
                cx="150"
                cy="40"
                rx="140"
                ry="32"
                className="scribble-stroke"
                strokeDasharray="6 4"
                transform="rotate(-3 150 40)"
              />
              <ellipse
                cx="150"
                cy="40"
                rx="130"
                ry="28"
                className="scribble-stroke-thin"
                transform="rotate(2 150 40)"
              />
            </svg>
          </span>{" "}
          MEDIA &amp;{" "}
          <span className="relative inline-block">
            BRANDING
            <svg
              viewBox="0 0 200 22"
              preserveAspectRatio="none"
              className="absolute pointer-events-none"
              style={{
                left: "-2%",
                bottom: "-18px",
                width: "104%",
                height: "22px",
              }}
            >
              <path
                d="M 5 10 Q 50 2, 100 12 T 195 8"
                className="scribble-stroke"
              />
              <path
                d="M 8 16 Q 60 8, 120 17 T 192 14"
                className="scribble-stroke-thin"
              />
            </svg>
          </span>{" "}
          STORYTELLERS.
        </h2>

        <div className="mt-10 flex items-center gap-4" data-reveal data-delay="2">
          <Pill href="/contact">Get in touch ↗</Pill>
          <span className="text-ink-soft text-sm tracking-[0.21px]">
            — Crafting moments that stay since 2024
          </span>
        </div>

        <ServicesAccordion services={services} />

        <div className="mt-32 grid grid-cols-[1.4fr_1fr] gap-14 items-center max-md:grid-cols-1">
          <div className="relative w-full aspect-[16/10]" data-reveal="slide-left">
            <Image
              src="/portfolio-ref/page-09.png"
              alt="2PAT team behind the scenes"
              fill
              sizes="(max-width: 900px) 100vw, 60vw"
              className="object-cover"
            />
          </div>
          <div
            className="text-[15px] leading-[1.65] text-ink"
            data-reveal="slide-right"
            data-delay="2"
          >
            <p className="font-medium text-orange">
              A creative partner — every step of the way.
            </p>
            <p className="mt-4">
              With a distinctive strength in emotional storytelling and visual
              expression, 2PAT goes beyond event planning.
            </p>
            <p className="mt-4">
              We craft immersive experiences that leave lasting impressions.
              Whether you&rsquo;re starting with a clear vision or just a spark
              of an idea, we&rsquo;ll be there from concept to reality.
            </p>
            <p className="mt-6 text-ink-soft">
              — Based in HCMC, Vietnam · est. 2024
            </p>
          </div>
        </div>

        <div className="mt-36 text-center" data-reveal="scale">
          <Link
            href="/contact"
            className="relative inline-block font-display uppercase leading-none tracking-[0.04em] text-orange px-15"
            style={{ fontSize: "clamp(64px, 9vw, 140px)" }}
          >
            <svg
              viewBox="0 0 600 160"
              preserveAspectRatio="none"
              className="absolute pointer-events-none overflow-visible"
              style={{ left: 0, top: "-10%", width: "100%", height: "120%" }}
            >
              <ellipse
                cx="300"
                cy="80"
                rx="280"
                ry="64"
                className="scribble-stroke"
                transform="rotate(-1.5 300 80)"
              />
              <ellipse
                cx="300"
                cy="80"
                rx="270"
                ry="58"
                className="scribble-stroke-thin"
                transform="rotate(1 300 80)"
              />
            </svg>
            CONTACT US <span className="inline-block ml-4">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
