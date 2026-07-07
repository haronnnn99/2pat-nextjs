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
 * Layout F — Editorial Spread
 * Magazine article feel — huge Anton dropcap opens the brief, multi-column
 * body text runs beside a large image, then a pulled-out quote in Anton and
 * a geometric grid of responsibilities that mimics art deco tile work.
 *
 * Applied to Gatsby Dinh Độc Lập.
 */
export function EditorialSpreadLayout({ content }: { content: SubPageContent }) {
  const brief = content.brief;
  const answer = content.answer;
  const responsibilities = content.responsibilities ?? [];
  const testimonial = content.testimonial;

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

      {/* THE BRIEF — dropcap + multi-column body + big image inline */}
      {brief && (
        <section className="bg-paper px-[var(--spacing-pad-x)] py-24 border-t border-ink">
          <div className="mx-auto max-w-[var(--spacing-max-w)]">
            <div
              className="text-[13px] tracking-[0.32em] uppercase text-orange mb-4"
              data-reveal
            >
              {brief.eyebrow}
            </div>
            <h2
              className="font-display leading-[0.92] tracking-[-0.03em] text-ink lowercase mb-16 max-w-[900px]"
              style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
              data-reveal
              data-delay="1"
              dangerouslySetInnerHTML={{ __html: brief.heading }}
            />

            <div className="grid grid-cols-[220px_1fr_1fr] gap-10 items-start max-md:grid-cols-1 max-md:gap-6">
              {/* Anton dropcap in own column */}
              <div
                className="font-display leading-[0.85] tracking-[-0.05em] text-orange uppercase max-md:hidden"
                style={{ fontSize: "clamp(140px, 15vw, 260px)" }}
                data-reveal
                data-delay="2"
              >
                A
              </div>

              {/* First body column — inline dropcap on mobile */}
              <p
                className="text-[17px] leading-[1.7] text-ink max-md:first-letter:font-display max-md:first-letter:text-[80px] max-md:first-letter:leading-[0.85] max-md:first-letter:float-left max-md:first-letter:pr-3 max-md:first-letter:text-orange"
                data-reveal
                data-delay="2"
              >
                {brief.body}
              </p>

              {/* Reference image third column */}
              <div className="relative w-full aspect-[4/5] bg-sand" data-reveal="fade" data-delay="3">
                <Image
                  src={brief.image}
                  alt={brief.eyebrow}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PULL QUOTE — testimonial as huge Anton quote breaking the page */}
      {testimonial && (
        <section
          data-nav-dark
          className="bg-orange text-paper px-[var(--spacing-pad-x)] py-32 border-t border-ink relative overflow-hidden"
        >
          {/* Art-deco geometric border top-left */}
          <div className="absolute top-0 left-0 w-32 h-32 border-r-2 border-b-2 border-paper opacity-30 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-l-2 border-t-2 border-paper opacity-30 pointer-events-none" />

          <div className="mx-auto max-w-[980px] relative">
            <div
              className="text-[13px] tracking-[0.32em] uppercase text-paper/70 mb-8"
              data-reveal
            >
              {testimonial.eyebrow}
            </div>
            <p
              className="font-display leading-[1.05] tracking-[-0.02em] text-paper lowercase before:content-['“'] before:font-display before:text-[2em] before:leading-[0] before:align-middle before:mr-2 before:text-paper/50"
              style={{ fontSize: "clamp(36px, 5vw, 68px)" }}
              data-reveal
              data-delay="1"
            >
              {testimonial.quote}
            </p>
            <div
              className="mt-11 text-[13px] tracking-[0.21em] uppercase text-paper opacity-85"
              data-reveal
              data-delay="2"
            >
              — {testimonial.attribution}
            </div>
          </div>
        </section>
      )}

      {/* THE ANSWER — image left, body + margin notes right */}
      {answer && (
        <section className="bg-paper px-[var(--spacing-pad-x)] py-24 border-t border-ink">
          <div className="mx-auto max-w-[var(--spacing-max-w)]">
            <div className="text-[13px] tracking-[0.32em] uppercase text-orange mb-4" data-reveal>
              {answer.eyebrow}
            </div>
            <h2
              className="font-display leading-[0.92] tracking-[-0.03em] text-ink lowercase mb-14 max-w-[900px]"
              style={{ fontSize: "clamp(56px, 8vw, 120px)" }}
              data-reveal
              data-delay="1"
              dangerouslySetInnerHTML={{ __html: answer.heading }}
            />

            <div className="grid grid-cols-[1.4fr_1fr] gap-14 items-start max-md:grid-cols-1 max-md:gap-8">
              <div className="relative w-full aspect-[4/3] bg-sand" data-reveal="fade" data-delay="2">
                <Image
                  src={answer.image}
                  alt={answer.eyebrow}
                  fill
                  sizes="(max-width: 900px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
              <div data-reveal data-delay="2">
                <p className="text-[17px] leading-[1.7] text-ink">{answer.body}</p>
                <div className="mt-10 pt-6 border-t border-orange">
                  <div className="text-[11px] tracking-[0.24em] uppercase text-orange mb-3">
                    / margin note
                  </div>
                  <p className="text-[13px] leading-[1.55] text-ink-soft italic">
                    Art deco isn&rsquo;t a costume. Applied properly it&rsquo;s
                    a geometry — line, symmetry, gold-on-black — that meets the
                    architecture it inhabits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RESPONSIBILITIES — art deco geometric tile grid */}
      {responsibilities.length > 0 && (
        <section className="bg-paper px-[var(--spacing-pad-x)] py-24 border-t border-ink">
          <div className="mx-auto max-w-[var(--spacing-max-w)]">
            <div className="text-[14px] tracking-[0.21em] uppercase text-orange mb-4" data-reveal>
              / SIX ROLES
            </div>
            <h2
              className="font-display leading-[0.95] tracking-[-0.03em] text-ink lowercase mb-14"
              style={{ fontSize: "clamp(46px, 6vw, 88px)" }}
              data-reveal
              data-delay="1"
            >
              one team,<br />one night.
            </h2>

            <div className="grid grid-cols-3 gap-0 border-t border-l border-ink max-md:grid-cols-1">
              {responsibilities.map((r, i) => (
                <article
                  key={r.num}
                  className={clsx(
                    "border-r border-b border-ink p-9 relative flex flex-col gap-4 min-h-[220px]",
                    r.highlight ? "bg-orange text-paper" : "bg-paper text-ink",
                  )}
                  data-reveal
                  data-delay={((i % 3) + 1) as unknown as string}
                >
                  {/* Art-deco corner mark top-right */}
                  <div
                    className={clsx(
                      "absolute top-0 right-0 w-6 h-6 border-l border-b",
                      r.highlight ? "border-paper/60" : "border-ink/50",
                    )}
                  />
                  <div
                    className={clsx(
                      "font-display text-[22px] leading-none",
                      r.highlight ? "text-paper/70" : "text-orange",
                    )}
                  >
                    {r.num}
                  </div>
                  <h3
                    className={clsx(
                      "font-display leading-[1.05] uppercase tracking-[-0.01em]",
                      r.highlight ? "text-paper" : "text-ink",
                    )}
                    style={{ fontSize: "clamp(22px, 2.4vw, 30px)" }}
                  >
                    {r.title}
                  </h3>
                  <p
                    className={clsx(
                      "text-[13px] leading-[1.5] mt-auto",
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
