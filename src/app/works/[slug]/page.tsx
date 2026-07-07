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
import { SUB_PAGES } from "@/lib/subpages";

export function generateStaticParams() {
  return Object.keys(SUB_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = SUB_PAGES[slug];
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
  const content = SUB_PAGES[slug];
  if (!content) notFound();

  return (
    <>
      <Nav activePath="/works" />
      <RevealObserver />

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

      <Footer />
    </>
  );
}
