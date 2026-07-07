"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Pill } from "./pill";
import { SERVICES, type Service } from "@/lib/projects";
import { clsx } from "@/lib/clsx";

/**
 * About + Services section — Anton huge "WE ARE 2PAT TEAM OF ... STORYTELLERS"
 * with scribble accents, then services accordion, team block, and the huge
 * CONTACT US scribble CTA.
 */
export function AboutServices() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-paper px-[var(--spacing-pad-x)] py-32"
    >
      <div className="mx-auto max-w-[var(--spacing-max-w)]">
        {/* Scribble headline */}
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

        {/* Services accordion */}
        <ServicesAccordion />

        {/* Team block */}
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

        {/* CONTACT US big scribble */}
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

function ServicesAccordion() {
  const [openSlug, setOpenSlug] = useState<Service["slug"]>("event");

  return (
    <div className="mt-24 relative border-t border-orange">
      {SERVICES.map((service) => {
        const isOpen = openSlug === service.slug;
        return (
          <ServiceRow
            key={service.slug}
            service={service}
            isOpen={isOpen}
            onToggle={() =>
              setOpenSlug(isOpen ? "event" : (service.slug as Service["slug"]))
            }
          />
        );
      })}
    </div>
  );
}

function ServiceRow({
  service,
  isOpen,
  onToggle,
}: {
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      onClick={onToggle}
      className={clsx(
        "relative grid grid-cols-[320px_1fr_auto] gap-10 items-center cursor-pointer border-b border-orange",
        "overflow-hidden transition-[grid-template-rows] duration-500",
        "max-md:grid-cols-[140px_1fr_auto] max-md:gap-4",
      )}
      style={{
        gridTemplateRows: isOpen ? "320px" : "140px",
      }}
    >
      {/* Number — massive, overflows row */}
      <div className="relative h-full">
        <div
          className={clsx(
            "absolute left-0 top-1/2 -translate-y-1/2 font-display leading-[0.9] tracking-[-0.04em] text-orange whitespace-nowrap z-[1]",
            "transition-[font-size,opacity] duration-400",
            isOpen ? "opacity-100" : "opacity-35 hover:opacity-70",
          )}
          style={{
            fontSize: isOpen
              ? "clamp(200px, 22vw, 300px)"
              : "clamp(110px, 12vw, 170px)",
          }}
        >
          {service.number}
        </div>
      </div>

      {/* Body */}
      <div className="relative z-[2]">
        <h3
          className="font-display uppercase leading-none tracking-[0.06em] text-ink"
          style={{ fontSize: "clamp(28px, 3vw, 40px)" }}
        >
          {service.label}
        </h3>
        <div
          className={clsx(
            "overflow-hidden transition-[max-height,margin-top,opacity] duration-500",
            isOpen ? "max-h-[400px] mt-5 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <p className="relative pl-4 text-sm leading-[1.5] text-ink max-w-[460px] before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:rounded-full before:border before:border-ink">
            {service.blurb}
          </p>
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 mt-4 text-xs tracking-[0.18em] uppercase text-ink-soft list-none">
            {service.meta.map((item) => (
              <li key={item} className="before:content-['—_'] before:text-orange">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Toggle icon */}
      <div
        className={clsx(
          "relative z-[2] mt-10 w-8 h-8 rounded-full border border-orange bg-paper",
          "flex items-center justify-center text-lg leading-none transition-all duration-300",
          isOpen ? "bg-orange border-orange text-paper rotate-45" : "text-orange",
        )}
      >
        +
      </div>
    </article>
  );
}
