"use client";

import { useState } from "react";
import { clsx } from "@/lib/clsx";
import type { Service } from "@/lib/projects";

/**
 * Services accordion — client component so the "open row" state stays local.
 * Receives services as a prop from its server-component parent (AboutServices),
 * so the data source can be swapped (Sanity vs. hard-coded) without touching
 * the interactive shell.
 */
export function ServicesAccordion({ services }: { services: Service[] }) {
  const [openSlug, setOpenSlug] = useState<Service["slug"]>(
    services[0]?.slug ?? "event",
  );

  return (
    <div className="mt-24 relative border-t border-orange">
      {services.map((service) => {
        const isOpen = openSlug === service.slug;
        return (
          <ServiceRow
            key={service.slug}
            service={service}
            isOpen={isOpen}
            onToggle={() =>
              setOpenSlug(
                isOpen ? services[0]?.slug ?? "event" : service.slug,
              )
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
