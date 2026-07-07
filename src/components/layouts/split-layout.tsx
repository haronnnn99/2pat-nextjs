import Image from "next/image";
import { ProjectHero } from "@/components/sub/project-hero";
import { IntroCard } from "@/components/sub/intro-card";
import { Gallery } from "@/components/sub/gallery";
import { VideoBlock } from "@/components/sub/video-block";
import { Credits } from "@/components/sub/credits";
import { ProjectNav } from "@/components/sub/project-nav";
import type { SubPageContent } from "@/lib/subpages";

/**
 * Layout B — Split Editorial
 * Sticky left info panel (title, service, meta, quick credits) + right scrolling
 * content that alternates image blocks with card text — magazine article feel.
 *
 * Applied to NFQ Summit Asia 2025 — 7-day media coverage.
 */
export function SplitLayout({ content }: { content: SubPageContent }) {
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

      <section className="bg-paper px-[var(--spacing-pad-x)] py-24">
        <div className="mx-auto max-w-[var(--spacing-max-w)] grid grid-cols-[1fr_1.6fr] gap-16 items-start max-md:grid-cols-1 max-md:gap-8">
          {/* Sticky left info panel */}
          <aside className="sticky top-24 self-start flex flex-col gap-8 max-md:static">
            <div>
              <div className="text-[13px] tracking-[0.32em] uppercase text-orange mb-2">
                / {content.serviceLabel.toUpperCase()}
              </div>
              <div className="font-display text-[28px] leading-[0.95] uppercase tracking-[-0.02em] text-ink">
                {content.location} · {content.year}
              </div>
            </div>

            <p className="text-[15px] leading-[1.6] text-ink max-w-[320px]">
              {content.splitSummary}
            </p>

            <div className="border-t border-orange pt-6">
              <div className="text-[11px] tracking-[0.24em] uppercase text-orange mb-4">
                / CREDITS (top 4)
              </div>
              <dl className="grid grid-cols-1 gap-3">
                {content.credits.slice(0, 4).map((c) => (
                  <div key={c.role}>
                    <dt className="text-[10px] tracking-[0.21em] uppercase text-ink-soft">
                      {c.role}
                    </dt>
                    <dd className="text-[13px] text-ink">{c.name}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>

          {/* Right scrolling content */}
          <div className="flex flex-col gap-16">
            {content.cards.map((card, i) => (
              <article
                key={card.num}
                className="flex flex-col gap-6"
                data-reveal
              >
                <div className="text-[13px] tracking-[0.32em] uppercase text-orange">
                  {card.label}
                </div>
                <h3
                  className="font-display leading-[0.92] tracking-[-0.03em] text-ink lowercase"
                  style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
                  dangerouslySetInnerHTML={{ __html: card.heading }}
                />
                {/* Show reference image between text blocks */}
                {card.image && (
                  <div className="relative w-full aspect-[16/10] bg-sand" data-reveal="fade" data-delay="2">
                    <Image
                      src={card.image}
                      alt={card.label}
                      fill
                      sizes="(max-width: 900px) 100vw, 60vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                )}
                <div className="text-[17px] leading-[1.55] text-ink flex flex-col gap-4 max-w-[640px]">
                  {card.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
                {card.metrics && (
                  <div className="grid grid-cols-3 gap-6 mt-4 border-t border-orange pt-6 max-md:grid-cols-2">
                    {card.metrics.map((m, k) => (
                      <div key={k}>
                        <div
                          className="font-display leading-none tracking-[-0.03em] text-orange"
                          style={{ fontSize: "clamp(32px, 3vw, 48px)" }}
                        >
                          {m.value}
                        </div>
                        <div className="mt-2 text-[11px] tracking-[0.21em] uppercase text-ink-soft">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {card.tags && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {card.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs tracking-[0.18em] uppercase py-1.5 px-3.5 rounded-pill border border-orange text-ink-soft"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

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
