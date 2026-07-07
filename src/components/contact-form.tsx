"use client";

import { useState } from "react";
import { clsx } from "@/lib/clsx";

type ProjectType = "event" | "media" | "branding" | "show" | "other";
type BudgetRange = "under-50m" | "50-200m" | "200-500m" | "500m-plus" | "tbd";

const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "event", label: "Event" },
  { value: "media", label: "Media" },
  { value: "branding", label: "Branding" },
  { value: "show", label: "Show" },
  { value: "other", label: "Other" },
];

const BUDGET_RANGES: { value: BudgetRange; label: string }[] = [
  { value: "under-50m", label: "Under 50M VND" },
  { value: "50-200m", label: "50 — 200M" },
  { value: "200-500m", label: "200 — 500M" },
  { value: "500m-plus", label: "500M+" },
  { value: "tbd", label: "To be discussed" },
];

/**
 * Contact form section — full-bleed orange bg with cream field cards.
 * All state is local; submit currently shows a placeholder alert until Phase 3
 * (Sanity wiring) or a serverless action is added.
 */
export function ContactForm() {
  const [ptype, setPtype] = useState<ProjectType | null>(null);
  const [budget, setBudget] = useState<BudgetRange | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(
      "Form is a mockup placeholder — wire to backend or serverless action next.",
    );
  };

  return (
    <section
      data-nav-dark
      id="form"
      className="min-h-screen bg-orange text-paper border-t border-ink px-[var(--spacing-pad-x)] pt-20 pb-16 flex flex-col justify-center"
    >
      <div className="mx-auto max-w-[1000px] w-full">
        <div className="text-[12px] tracking-[0.21em] uppercase text-paper/70 mb-2.5" data-reveal>
          / START A PROJECT
        </div>
        <h2
          className="font-display leading-[0.95] tracking-[-0.03em] text-paper lowercase mb-7"
          style={{ fontSize: "clamp(36px, 4.5vw, 64px)" }}
          data-reveal
          data-delay="1"
        >
          tell us<br />the brief.
        </h2>

        <form onSubmit={onSubmit} data-reveal data-delay="2">
          <div className="grid grid-cols-2 gap-2.5 max-md:grid-cols-1">
            <FieldCard num="01" label="/ Your name">
              <input
                type="text"
                required
                placeholder="Anh Haron"
                className="field-input"
              />
            </FieldCard>

            <FieldCard num="02" label="/ Email">
              <input
                type="email"
                required
                placeholder="you@brand.com"
                className="field-input"
              />
            </FieldCard>

            <FieldCard num="03" label="/ Project type" span={2}>
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {PROJECT_TYPES.map((opt) => (
                  <PillRadio
                    key={opt.value}
                    label={opt.label}
                    active={ptype === opt.value}
                    onClick={() => setPtype(opt.value)}
                  />
                ))}
              </div>
            </FieldCard>

            <FieldCard
              num="04"
              label={
                <>
                  / Budget range{" "}
                  <span className="opacity-55">(optional)</span>
                </>
              }
              span={2}
            >
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {BUDGET_RANGES.map((opt) => (
                  <PillRadio
                    key={opt.value}
                    label={opt.label}
                    active={budget === opt.value}
                    onClick={() => setBudget(opt.value)}
                  />
                ))}
              </div>
            </FieldCard>

            <FieldCard num="05" label="/ Tell us about your project" span={2}>
              <textarea
                required
                placeholder="What you're building, when it lands, who it's for, and what success looks like."
                className="field-input resize-y min-h-[60px] leading-[1.45]"
              />
            </FieldCard>
          </div>

          <div className="mt-5 flex justify-between items-center flex-wrap gap-4 text-paper">
            <div className="text-[11px] tracking-[0.21em] uppercase opacity-80">
              We reply within 2 business days.
            </div>
            <button
              type="submit"
              className="border border-paper text-paper bg-transparent px-6 py-3 rounded-pill text-xs tracking-[0.18em] uppercase font-body font-medium transition-colors hover:bg-paper hover:text-orange"
            >
              Send brief →
            </button>
          </div>
        </form>
      </div>

      {/* Field card + input global styles */}
      <style>{`
        .field-input {
          background: transparent;
          border: 0;
          font-family: inherit;
          font-size: 16px;
          color: var(--color-ink);
          padding: 2px 0;
          width: 100%;
          outline: none;
          border-bottom: 1px solid rgba(58, 42, 38, 0.18);
          transition: border-color 0.2s;
        }
        .field-input::placeholder { color: rgba(58, 42, 38, 0.4); }
        .field-input:focus { border-bottom-color: var(--color-orange); }
      `}</style>
    </section>
  );
}

function FieldCard({
  num,
  label,
  children,
  span = 1,
}: {
  num: string;
  label: React.ReactNode;
  children: React.ReactNode;
  span?: 1 | 2;
}) {
  return (
    <div
      className={clsx(
        "bg-paper text-ink border border-ink py-4 px-5.5 flex flex-col gap-2",
        span === 2 && "col-span-2 max-md:col-span-1",
      )}
    >
      <div className="flex items-baseline gap-2.5">
        <span className="font-display text-[18px] leading-none text-orange">
          {num}
        </span>
        <label className="text-[10px] tracking-[0.24em] uppercase text-ink-soft font-medium">
          {label}
        </label>
      </div>
      {children}
    </div>
  );
}

function PillRadio({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-block py-1.5 px-3.5 rounded-pill border text-[11px] tracking-[0.18em] uppercase font-medium transition-colors",
        active
          ? "bg-orange text-paper border-orange"
          : "bg-transparent text-ink-soft border-ink-soft hover:border-orange hover:text-orange",
      )}
    >
      {label}
    </button>
  );
}
