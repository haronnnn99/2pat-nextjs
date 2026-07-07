import Image from "next/image";
import { PROCESS_STEPS, type ProjectCard } from "@/lib/subpages";
import { clsx } from "@/lib/clsx";

/**
 * Numbered project card — renders the 4 variants (cream/sand/orange/outcome)
 * across 3 layouts (standard, split, process).
 *
 * Post 2026-06-25 palette revert: `outcome` variant is now cream bg with navy
 * text accents (no more red-deep dark bg). `orange` variant kept as full orange
 * bg with cream text (used for Story Concept in Half Moon).
 */
export function PCard({ card }: { card: ProjectCard }) {
  if (card.layout === "process") return <ProcessCard card={card} />;
  if (card.layout === "split") return <SplitCard card={card} />;
  return <StandardCard card={card} />;
}

function StandardCard({ card }: { card: ProjectCard }) {
  const { bg, accent } = variantClasses(card.variant);
  return (
    <section
      className={clsx(
        "min-h-screen flex items-center px-[var(--spacing-pad-x)] py-20",
        bg,
      )}
    >
      <div className="mx-auto max-w-[var(--spacing-max-w)] grid grid-cols-[1fr_2fr] gap-20 items-start max-md:grid-cols-1 max-md:gap-8">
        <div className="flex flex-col gap-4" data-reveal="slide-left">
          <div
            className={clsx(
              "font-display leading-[0.9] tracking-[-0.04em]",
              accent.num,
            )}
            style={{ fontSize: "clamp(80px, 8vw, 140px)" }}
          >
            {card.num}
          </div>
          <div
            className={clsx(
              "text-[14px] tracking-[0.21em] uppercase font-medium pt-3.5 mt-2 min-w-[200px] inline-block w-fit border-t",
              accent.label,
            )}
          >
            {card.label}
          </div>
        </div>
        <div data-reveal="slide-right" data-delay="2">
          <h2
            className={clsx(
              "font-display leading-[0.95] tracking-[-0.03em] lowercase mb-8",
              accent.heading,
            )}
            style={{ fontSize: "clamp(46px, 5.5vw, 80px)" }}
            dangerouslySetInnerHTML={{ __html: card.heading }}
          />
          <CardBody body={card.body} />
          {card.tags && <Tags tags={card.tags} border={accent.tagBorder} textColor={accent.tagText} />}
          {card.metrics && <Metrics metrics={card.metrics} accent={accent} />}
        </div>
      </div>
    </section>
  );
}

function SplitCard({ card }: { card: ProjectCard }) {
  const { bg, accent, splitTextColor } = variantClasses(card.variant);
  return (
    <section className={clsx("min-h-screen flex items-stretch", bg)}>
      <div className="w-full grid grid-cols-2 min-h-screen max-md:grid-cols-1">
        <div
          className={clsx(
            "flex flex-col justify-center py-20 max-md:py-14",
            splitTextColor,
          )}
          style={{ paddingLeft: "clamp(40px, 6vw, 100px)", paddingRight: "clamp(40px, 6vw, 100px)" }}
          data-reveal="slide-left"
        >
          <div
            className={clsx(
              "font-display leading-[0.9] tracking-[-0.04em] mb-1",
              accent.num,
            )}
            style={{ fontSize: "clamp(60px, 6vw, 100px)" }}
          >
            {card.num}
          </div>
          <div
            className={clsx(
              "text-[14px] tracking-[0.21em] uppercase font-medium pt-3.5 mb-9 border-t",
              accent.label,
            )}
          >
            {card.label}
          </div>
          <h2
            className={clsx(
              "font-display leading-[0.95] tracking-[-0.03em] lowercase mb-7",
              accent.heading,
            )}
            style={{ fontSize: "clamp(40px, 4vw, 64px)" }}
            dangerouslySetInnerHTML={{ __html: card.heading }}
          />
          <CardBody body={card.body} />
          {card.tags && <Tags tags={card.tags} border={accent.tagBorder} textColor={accent.tagText} />}
          {card.metrics && <Metrics metrics={card.metrics} accent={accent} compact />}
        </div>
        <div className="relative w-full min-h-screen max-md:min-h-[60vh]" data-reveal="slide-right" data-delay="2">
          {card.image && (
            <Image
              src={card.image}
              alt={card.label}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ card }: { card: ProjectCard }) {
  const { bg, accent } = variantClasses(card.variant);
  return (
    <section
      className={clsx(
        "min-h-screen flex items-center px-[var(--spacing-pad-x)] py-20",
        bg,
      )}
    >
      <div className="mx-auto max-w-[var(--spacing-max-w)] grid grid-cols-[1fr_2fr] gap-20 items-start max-md:grid-cols-1 max-md:gap-8">
        <div className="flex flex-col gap-4" data-reveal="slide-left">
          <div
            className={clsx(
              "font-display leading-[0.9] tracking-[-0.04em]",
              accent.num,
            )}
            style={{ fontSize: "clamp(80px, 8vw, 140px)" }}
          >
            {card.num}
          </div>
          <div
            className={clsx(
              "text-[14px] tracking-[0.21em] uppercase font-medium pt-3.5 mt-2 min-w-[200px] inline-block w-fit border-t",
              accent.label,
            )}
          >
            {card.label}
          </div>
        </div>
        <div data-reveal="slide-right" data-delay="2">
          <h2
            className={clsx(
              "font-display leading-[0.95] tracking-[-0.03em] lowercase mb-8",
              accent.heading,
            )}
            style={{ fontSize: "clamp(46px, 5.5vw, 80px)" }}
            dangerouslySetInnerHTML={{ __html: card.heading }}
          />
          <ol className="list-none flex flex-col gap-6 max-w-[540px]">
            {PROCESS_STEPS.map((step) => (
              <li key={step.num} className="grid grid-cols-[52px_1fr] gap-5 items-start">
                <div className="w-11 h-11 border border-orange rounded-full flex items-center justify-center font-display text-xl leading-none pt-0.5 text-orange">
                  {step.num}
                </div>
                <div>
                  <div className="font-semibold text-[17px] leading-[1.3] mb-1.5 text-ink">
                    {step.title}
                  </div>
                  <div className="text-sm leading-[1.5] text-ink-soft">
                    {step.body}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Helpers

function CardBody({ body }: { body: string[] }) {
  return (
    <div className="max-w-[640px] text-[18px] leading-[1.47] mb-8">
      {body.map((para, i) => (
        <p key={i} className={i > 0 ? "mt-5" : ""}>
          {para}
        </p>
      ))}
    </div>
  );
}

function Tags({
  tags,
  border,
  textColor,
}: {
  tags: string[];
  border: string;
  textColor: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className={clsx(
            "text-xs tracking-[0.18em] uppercase py-1.5 px-3.5 rounded-pill border",
            border,
            textColor,
          )}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function Metrics({
  metrics,
  accent,
  compact,
}: {
  metrics: { value: string; label: string }[];
  accent: ReturnType<typeof variantClasses>["accent"];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mt-4" : "mt-6"}>
      {metrics.map((m, i) => (
        <div
          key={i}
          className={clsx(
            "flex items-baseline gap-3.5",
            compact ? "mt-3.5 pt-3 border-t" : "mt-6 pt-5 border-t",
            accent.metricBorder,
          )}
        >
          <strong
            className={clsx(
              "font-display font-normal leading-none tracking-[-0.03em]",
              accent.metricValue,
            )}
            style={{ fontSize: compact ? "clamp(26px, 2.4vw, 36px)" : "clamp(40px, 4vw, 60px)" }}
          >
            {m.value}
          </strong>
          <span
            className={clsx(
              "text-[14px] tracking-[0.21em] uppercase",
              accent.metricLabel,
            )}
            style={{ fontSize: compact ? 12 : undefined }}
          >
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Variant classes

type VariantAccent = {
  num: string;
  label: string;
  heading: string;
  tagBorder: string;
  tagText: string;
  metricBorder: string;
  metricValue: string;
  metricLabel: string;
};

function variantClasses(v: ProjectCard["variant"]): {
  bg: string;
  accent: VariantAccent;
  splitTextColor: string;
} {
  switch (v) {
    case "sand":
      return {
        bg: "bg-sand text-ink",
        splitTextColor: "text-ink",
        accent: {
          num: "text-ink",
          label: "text-ink border-ink",
          heading: "text-ink",
          tagBorder: "border-ink",
          tagText: "text-ink",
          metricBorder: "border-ink",
          metricValue: "text-ink",
          metricLabel: "text-ink-soft",
        },
      };
    case "orange":
      return {
        bg: "bg-orange text-paper",
        splitTextColor: "text-paper",
        accent: {
          num: "text-paper",
          label: "text-paper border-paper",
          heading: "text-paper",
          tagBorder: "border-paper",
          tagText: "text-paper",
          metricBorder: "border-paper",
          metricValue: "text-paper",
          metricLabel: "text-paper/80",
        },
      };
    case "white":
      return {
        bg: "bg-paper text-ink",
        splitTextColor: "text-ink",
        accent: {
          num: "text-orange",
          label: "text-ink border-orange",
          heading: "text-ink",
          tagBorder: "border-orange",
          tagText: "text-ink-soft",
          metricBorder: "border-orange",
          metricValue: "text-orange",
          metricLabel: "text-ink-soft",
        },
      };
    case "outcome":
      // Cream bg with ink+navy accents (post 2026-06-25 palette revert).
      return {
        bg: "bg-paper text-ink",
        splitTextColor: "text-ink",
        accent: {
          num: "text-ink",
          label: "text-ink border-ink",
          heading: "text-ink",
          tagBorder: "border-ink",
          tagText: "text-ink",
          metricBorder: "border-ink",
          metricValue: "text-ink",
          metricLabel: "text-ink-soft",
        },
      };
    case "cream":
    default:
      return {
        bg: "bg-paper text-ink",
        splitTextColor: "text-ink",
        accent: {
          num: "text-orange",
          label: "text-ink border-orange",
          heading: "text-ink",
          tagBorder: "border-orange",
          tagText: "text-ink-soft",
          metricBorder: "border-orange",
          metricValue: "text-orange",
          metricLabel: "text-ink-soft",
        },
      };
  }
}
