import Image from "next/image";
import { ProjectHero } from "@/components/sub/project-hero";
import { IntroCard } from "@/components/sub/intro-card";
import { VideoBlock } from "@/components/sub/video-block";
import { Credits } from "@/components/sub/credits";
import { ProjectNav } from "@/components/sub/project-nav";
import type { SubPageContent } from "@/lib/subpages";

/**
 * Layout E — Photo Essay
 * Photojournalism feel: each `chapter` becomes a full-bleed 100vh image with
 * a large Anton caption overlay in the bottom-left, and a short body paragraph
 * pulled out into a small aside card that overlays the image bottom-right.
 * No section snapping — user scrolls the essay like reading a photo book.
 */
export function PhotoEssayLayout({ content }: { content: SubPageContent }) {
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

      <section className="bg-ink">
        {chapters.map((ch, i) => (
          <article
            key={ch.num}
            className="relative w-full h-screen min-h-[640px] overflow-hidden"
          >
            <Image
              src={ch.image}
              alt={ch.eyebrow}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
            {/* Gradient wash at bottom to make text legible */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_40%,rgba(0,0,0,0.85)_100%)]" />

            <div
              className="absolute inset-0 flex flex-col justify-end px-[var(--spacing-pad-x)] pb-16 text-paper max-md:pb-10"
              data-reveal
            >
              <div className="max-w-[var(--spacing-max-w)] mx-auto w-full grid grid-cols-[1.4fr_1fr] gap-14 items-end max-md:grid-cols-1 max-md:gap-6">
                <div>
                  <div className="text-[13px] tracking-[0.32em] uppercase text-orange mb-4">
                    / {ch.eyebrow}
                  </div>
                  <h3
                    className="font-display leading-[0.92] tracking-[-0.03em] text-paper lowercase"
                    style={{ fontSize: "clamp(56px, 9vw, 150px)" }}
                    dangerouslySetInnerHTML={{ __html: ch.title }}
                  />
                </div>
                <div className="text-[15px] leading-[1.55] text-paper/90 border-l-2 border-orange pl-5 max-md:border-l-0 max-md:border-t-2 max-md:pl-0 max-md:pt-4">
                  {ch.body[0]}
                </div>
              </div>
            </div>

            {/* Frame number ticker in top-right corner */}
            <div className="absolute top-8 right-8 text-[11px] tracking-[0.32em] uppercase text-paper/60 z-[3] max-md:top-4 max-md:right-4">
              frame {String(i + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
            </div>
          </article>
        ))}
      </section>

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
