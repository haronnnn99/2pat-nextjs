import Image from "next/image";
import { ProjectHero } from "@/components/sub/project-hero";
import { IntroCard } from "@/components/sub/intro-card";
import { Gallery } from "@/components/sub/gallery";
import { VideoBlock } from "@/components/sub/video-block";
import { Credits } from "@/components/sub/credits";
import { ProjectNav } from "@/components/sub/project-nav";
import { clsx } from "@/lib/clsx";
import type { SubPageContent } from "@/lib/subpages";

/**
 * Layout D — Data-Driven Case Study
 * Metrics-forward header, brief/answer 2-col, 6-cell ownership grid with
 * highlight cell for the signature responsibility, testimonial quote on
 * orange bg. Consultancy report feel while keeping brand palette + Anton.
 *
 * Applied to Mer Minishow — showcase full-stack producer + licensing.
 */
export function CaseStudyLayout({ content }: { content: SubPageContent }) {
  return (
    <>
      <ProjectHero
        title={content.heroTitle}
        desc={content.heroDesc}
        image={content.heroImage}
        image2={content.heroImage2}
        meta={content.meta}
      />
      <IntroCard
        eyebrow={content.introEyebrow}
        slogan={content.introSlogan}
        em={content.introEm}
        foot={content.introFoot}
      />

      {/* Headline + metric bar */}
      <section className="bg-paper px-[var(--spacing-pad-x)] py-24 border-t border-ink">
        <div className="mx-auto max-w-[var(--spacing-max-w)]">
          <div className="text-[13px] tracking-[0.32em] uppercase text-orange mb-6" data-reveal>
            / AT A GLANCE
          </div>
          <h2
            className="font-display leading-[0.95] tracking-[-0.03em] text-ink lowercase mb-16"
            style={{ fontSize: "clamp(48px, 6vw, 90px)" }}
            data-reveal
            data-delay="1"
          >
            {content.headline}
          </h2>

          {content.keyMetrics && (
            <div className="grid grid-cols-4 gap-3 border-t border-orange border-b py-10 max-md:grid-cols-2">
              {content.keyMetrics.map((m, i) => (
                <div key={i} className="flex flex-col gap-2" data-reveal data-delay={((i % 4) + 1) as unknown as string}>
                  <div
                    className="font-display leading-none tracking-[-0.04em] text-orange"
                    style={{ fontSize: "clamp(64px, 8vw, 120px)" }}
                  >
                    {m.value}
                  </div>
                  <div className="text-[11px] tracking-[0.24em] uppercase text-ink-soft">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brief / Answer 2-col */}
      {content.brief && content.answer && (
        <section className="bg-paper px-[var(--spacing-pad-x)] py-24">
          <div className="mx-auto max-w-[var(--spacing-max-w)] grid grid-cols-2 gap-14 max-md:grid-cols-1">
            <BriefAnswerCard block={content.brief} />
            <BriefAnswerCard block={content.answer} />
          </div>
        </section>
      )}

      {/* 6-cell responsibilities grid */}
      {content.responsibilities && (
        <section className="bg-paper px-[var(--spacing-pad-x)] py-24 border-t border-ink">
          <div className="mx-auto max-w-[var(--spacing-max-w)]">
            <div className="text-[14px] tracking-[0.21em] uppercase text-orange mb-4" data-reveal>
              / WHAT 2PAT OWNED
            </div>
            <h2
              className="font-display leading-[0.95] tracking-[-0.03em] text-ink lowercase mb-14 max-w-[900px]"
              style={{ fontSize: "clamp(46px, 6vw, 88px)" }}
              data-reveal
              data-delay="1"
            >
              six roles,<br />one producer.
            </h2>

            <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
              {content.responsibilities.map((r, i) => (
                <article
                  key={r.num}
                  className={clsx(
                    "py-9 px-8 border flex flex-col gap-4 min-h-[240px] relative",
                    r.highlight
                      ? "bg-orange text-paper border-orange"
                      : "bg-paper text-ink border-ink",
                  )}
                  data-reveal
                  data-delay={((i % 3) + 1) as unknown as string}
                >
                  <div className="flex justify-between items-baseline">
                    <span
                      className={clsx(
                        "font-display text-[22px] leading-none",
                        r.highlight ? "text-paper/70" : "text-orange",
                      )}
                    >
                      {r.num}
                    </span>
                    {r.highlight && (
                      <span className="text-[10px] tracking-[0.21em] uppercase font-bold text-orange bg-paper py-1 px-2.5 rounded-pill">
                        Signature
                      </span>
                    )}
                  </div>
                  <h3
                    className={clsx(
                      "font-display leading-[1.05] uppercase tracking-[-0.01em]",
                      r.highlight ? "text-paper" : "text-ink",
                    )}
                    style={{ fontSize: "clamp(24px, 2.4vw, 32px)" }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className={clsx(
                      "text-[14px] leading-[1.5] mt-auto",
                      r.highlight ? "text-paper opacity-95" : "text-ink-soft",
                    )}
                  >
                    {r.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial on orange bg */}
      {content.testimonial && (
        <section
          data-nav-dark
          className="bg-orange text-paper px-[var(--spacing-pad-x)] py-32 border-t border-ink"
        >
          <div className="mx-auto max-w-[980px]">
            <div
              className="text-[13px] tracking-[0.32em] uppercase text-paper/70 mb-8"
              data-reveal
            >
              {content.testimonial.eyebrow}
            </div>
            <p
              className="font-display leading-[1.12] tracking-[-0.02em] text-paper lowercase"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
              data-reveal
              data-delay="1"
            >
              &ldquo;{content.testimonial.quote}&rdquo;
            </p>
            <div
              className="mt-11 text-[13px] tracking-[0.21em] uppercase text-paper opacity-85"
              data-reveal
              data-delay="2"
            >
              — {content.testimonial.attribution}
            </div>
          </div>
        </section>
      )}

      <Gallery
        label={content.galleryLabel}
        count={content.galleryCount}
        images={content.galleryImages}
      />
      <VideoBlock
        label={content.videoLabel}
        embedUrl={content.videoEmbedUrl}
        placeholder={content.videoPlaceholder}
      />
      <Credits credits={content.credits} watermark={content.watermark} />
      <ProjectNav prev={content.prev} next={content.next} />
    </>
  );
}

function BriefAnswerCard({
  block,
}: {
  block: NonNullable<SubPageContent["brief"]>;
}) {
  return (
    <div className="flex flex-col gap-6" data-reveal>
      <div className="relative w-full aspect-[4/5] bg-sand max-md:aspect-[16/10]">
        <Image
          src={block.image}
          alt={block.eyebrow}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="text-[13px] tracking-[0.32em] uppercase text-orange">
        {block.eyebrow}
      </div>
      <h3
        className="font-display leading-[0.95] tracking-[-0.03em] text-ink lowercase"
        style={{ fontSize: "clamp(36px, 4vw, 60px)" }}
        dangerouslySetInnerHTML={{ __html: block.heading }}
      />
      <p className="text-[17px] leading-[1.55] text-ink">{block.body}</p>
    </div>
  );
}
