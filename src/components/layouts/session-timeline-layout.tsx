import Image from "next/image";
import { ProjectHero } from "@/components/sub/project-hero";
import { IntroCard } from "@/components/sub/intro-card";
import { Gallery } from "@/components/sub/gallery";
import { VideoBlock } from "@/components/sub/video-block";
import { Credits } from "@/components/sub/credits";
import { ProjectNav } from "@/components/sub/project-nav";
import type { SubPageContent } from "@/lib/subpages";

/**
 * Layout G — Session Timeline
 * Vertical timeline like a conference program guide. Sessions are grouped by
 * day; each entry has a big Anton time stamp on the left rail, a session
 * title + speaker + coverage note on the right, and a thin thumbnail image.
 * The bar between entries visualizes the passage of the day.
 *
 * Applied to Gradion Summit.
 */
export function SessionTimelineLayout({
  content,
}: {
  content: SubPageContent;
}) {
  const sessions = content.sessions ?? [];
  const summary = content.splitSummary;

  // Group sessions by day for the day-label rail
  const days: Record<string, typeof sessions> = {};
  for (const s of sessions) {
    days[s.day] = days[s.day] ? [...days[s.day], s] : [s];
  }
  const dayOrder = Object.keys(days);

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

      {/* Program header + summary */}
      <section className="bg-paper px-[var(--spacing-pad-x)] py-24 border-t border-ink">
        <div className="mx-auto max-w-[var(--spacing-max-w)] grid grid-cols-[1fr_1fr] gap-14 items-end max-md:grid-cols-1 max-md:gap-8">
          <div>
            <div className="text-[13px] tracking-[0.32em] uppercase text-orange mb-4" data-reveal>
              / THE PROGRAM
            </div>
            <h2
              className="font-display leading-[0.92] tracking-[-0.03em] text-ink lowercase"
              style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
              data-reveal
              data-delay="1"
            >
              every session,<br />on the record.
            </h2>
          </div>
          {summary && (
            <p
              className="text-[16px] leading-[1.6] text-ink max-w-[480px] max-md:max-w-full"
              data-reveal
              data-delay="2"
            >
              {summary}
            </p>
          )}
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-paper px-[var(--spacing-pad-x)] pb-24">
        <div className="mx-auto max-w-[var(--spacing-max-w)]">
          {dayOrder.map((day, dayIdx) => (
            <div key={day} className="mb-16" data-reveal>
              {/* Day marker with hairline */}
              <div className="flex items-center gap-6 mb-10">
                <div
                  className="font-display leading-none tracking-[-0.03em] text-orange uppercase"
                  style={{ fontSize: "clamp(48px, 6vw, 96px)" }}
                >
                  {day}
                </div>
                <div className="flex-1 h-px bg-orange" />
                <div className="text-[11px] tracking-[0.32em] uppercase text-ink-soft">
                  {days[day].length} sessions
                </div>
              </div>

              {/* Sessions */}
              <ol className="list-none flex flex-col">
                {days[day].map((session, i) => (
                  <li
                    key={i}
                    className="grid grid-cols-[140px_1fr_240px] gap-8 py-8 border-b border-ink items-start last:border-b-0 max-md:grid-cols-1 max-md:gap-4 max-md:py-6"
                  >
                    {/* Time column */}
                    <div className="flex flex-col gap-1">
                      <div
                        className="font-display leading-none tracking-[-0.03em] text-ink"
                        style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
                      >
                        {session.time}
                      </div>
                      <div className="text-[10px] tracking-[0.32em] uppercase text-orange">
                        / hh:mm
                      </div>
                    </div>

                    {/* Title + speaker + coverage note */}
                    <div className="flex flex-col gap-3">
                      <h3
                        className="font-display leading-[0.95] tracking-[-0.02em] text-ink lowercase"
                        style={{ fontSize: "clamp(28px, 3vw, 44px)" }}
                      >
                        {session.title}
                      </h3>
                      {session.speaker && (
                        <div className="text-[12px] tracking-[0.24em] uppercase text-orange">
                          / {session.speaker}
                        </div>
                      )}
                      {session.note && (
                        <p className="text-[14px] leading-[1.55] text-ink-soft max-w-[520px]">
                          {session.note}
                        </p>
                      )}
                    </div>

                    {/* Thumbnail */}
                    {session.image && (
                      <div className="relative w-full aspect-[16/10] bg-sand max-md:max-w-[240px]">
                        <Image
                          src={session.image}
                          alt={session.title}
                          fill
                          sizes="(max-width: 900px) 240px, 240px"
                          className="object-cover"
                          priority={dayIdx === 0 && i === 0}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          ))}
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
