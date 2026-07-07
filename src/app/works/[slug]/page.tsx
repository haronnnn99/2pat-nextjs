import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { RevealObserver } from "@/components/reveal-observer";
import { ProjectHero } from "@/components/sub/project-hero";
import { IntroCard } from "@/components/sub/intro-card";
import { PCard } from "@/components/sub/pcard";
import { Gallery } from "@/components/sub/gallery";
import { VideoBlock } from "@/components/sub/video-block";
import { Credits } from "@/components/sub/credits";
import { ProjectNav } from "@/components/sub/project-nav";
import { ChapterLayout } from "@/components/layouts/chapter-layout";
import { SplitLayout } from "@/components/layouts/split-layout";
import { CaseStudyLayout } from "@/components/layouts/case-study-layout";
import { PhotoEssayLayout } from "@/components/layouts/photo-essay-layout";
import { EditorialSpreadLayout } from "@/components/layouts/editorial-spread-layout";
import { SessionTimelineLayout } from "@/components/layouts/session-timeline-layout";
import { getSubPageContent, getSubPageSlugs } from "@/lib/sanity/queries";
import type { SubPageContent } from "@/lib/subpages";

export async function generateStaticParams() {
  const slugs = await getSubPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getSubPageContent(slug);
  if (!content) return { title: "Not found" };
  return {
    title: content.title,
    description: content.heroDesc,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getSubPageContent(slug);
  if (!content) notFound();

  return (
    <>
      <Nav activePath="/works" />
      <RevealObserver />
      {renderLayout(content)}
      <Footer />
    </>
  );
}

function renderLayout(content: SubPageContent) {
  switch (content.layout) {
    case "chapter":
      return <ChapterLayout content={content} />;
    case "split":
      return <SplitLayout content={content} />;
    case "case-study":
      return <CaseStudyLayout content={content} />;
    case "photo-essay":
      return <PhotoEssayLayout content={content} />;
    case "editorial-spread":
      return <EditorialSpreadLayout content={content} />;
    case "session-timeline":
      return <SessionTimelineLayout content={content} />;
    case "classic":
    default:
      return <ClassicLayout content={content} />;
  }
}

function ClassicLayout({ content }: { content: SubPageContent }) {
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
      {content.cards.map((card) => (
        <PCard key={card.num} card={card} />
      ))}
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
