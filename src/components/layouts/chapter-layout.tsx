import Image from "next/image";
import { ProjectHero } from "@/components/sub/project-hero";
import { IntroCard } from "@/components/sub/intro-card";
import { Gallery } from "@/components/sub/gallery";
import { VideoBlock } from "@/components/sub/video-block";
import { Credits } from "@/components/sub/credits";
import { ProjectNav } from "@/components/sub/project-nav";
import type { SubPageContent } from "@/lib/subpages";

/**
 * Layout C — Chapter/Timeline
 * Long-form journalism feel: sticky left rail with chapter progress dots,
 * right column flows chapter-by-chapter with big Anton headlines and
 * full-bleed chapter images. Signature 2PAT slash labels retained.
 *
 * Applied to Half Moon & Jungle Party — dusk/rise/crest/dawn arc.
 */
export function ChapterLayout({ content }: { content: SubPageContent }) {
  const chapters = content.chapters ?? [];
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
        <div className="mx-auto max-w-[var(--spacing-max-w)] grid grid-cols-[220px_1fr] gap-16 items-start max-md:grid-cols-1 max-md:gap-8">
          {/* Sticky left rail — chapter progress dots */}
          <aside className="sticky top-24 self-start flex flex-col gap-4 max-md:static max-md:sticky-none">
            <div className="text-[13px] tracking-[0.32em] uppercase text-orange">
              / THE ARC (04)
            </div>
            <ol className="list-none flex flex-col gap-4 border-l border-ink">
              {chapters.map((ch) => (
                <li
                  key={ch.num}
                  className="pl-4 relative before:content-[''] before:absolute before:-left-[5px] before:top-2 before:w-2.5 before:h-2.5 before:rounded-full before:bg-orange before:border-2 before:border-paper"
                >
                  <div className="text-[11px] tracking-[0.24em] uppercase text-ink-soft">
                    {ch.eyebrow}
                  </div>
                </li>
              ))}
            </ol>
          </aside>

          {/* Right — chapters flow */}
          <div className="flex flex-col gap-32">
            {chapters.map((ch, i) => (
              <article key={ch.num} className="flex flex-col gap-8" data-reveal>
                <div className="text-[13px] tracking-[0.32em] uppercase text-orange">
                  / CHAPTER {ch.num}
                </div>
                <h3
                  className="font-display leading-[0.92] tracking-[-0.03em] text-ink lowercase"
                  style={{ fontSize: "clamp(56px, 8vw, 130px)" }}
                  dangerouslySetInnerHTML={{ __html: ch.title }}
                />
                <div className="relative w-full aspect-[16/9] bg-sand" data-reveal="fade" data-delay="2">
                  <Image
                    src={ch.image}
                    alt={ch.eyebrow}
                    fill
                    sizes="(max-width: 900px) 100vw, 70vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
                <div className="max-w-[640px] text-[18px] leading-[1.6] text-ink flex flex-col gap-5">
                  {ch.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
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
