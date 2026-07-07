/**
 * GROQ queries + fetch helpers that adapt Sanity's document shape back into
 * the types the existing components expect (Project, SubPageContent, etc.).
 *
 * This lets Phase 3 be a data-source swap — landing pages and sub-pages don't
 * know they're reading from Sanity vs. hard-coded arrays.
 */

import { sanityClient, urlFor } from "./client";
import type {
  Chapter,
  ProjectCard,
  ProjectLayout,
  Responsibility,
  Session,
  SubPageContent,
  Testimonial,
} from "@/lib/subpages";
import type { Project, Service, ServiceCategory } from "@/lib/projects";

// ─────────────────────────────────────────────────────────────
// Raw shapes returned by Sanity queries (with all denormalized images
// projected as string paths via `asset->url`).
// ─────────────────────────────────────────────────────────────

type SanityImage = { asset?: { url?: string } };

type RawProject = {
  _id: string;
  title: string;
  slug: { current: string };
  service: ServiceCategory;
  serviceLabel?: string;
  year: string;
  location?: string;
  meta: string;
  brief?: string;
  mosaic?: Project["mosaic"];
  hasSubPage: boolean;
  heroImage?: SanityImage;
  heroImage2?: SanityImage;

  // Sub-page shape
  layout?: ProjectLayout;
  heroTitle?: string;
  heroDesc?: string;
  introEyebrow?: string;
  introSlogan?: string;
  introEm?: string;
  introFoot?: string;
  cards?: Array<Omit<ProjectCard, "image"> & { image?: SanityImage }>;
  chapters?: Array<Omit<Chapter, "image"> & { image?: SanityImage }>;
  headline?: string;
  keyMetrics?: { value: string; label: string }[];
  brief_block?: {
    eyebrow: string;
    heading: string;
    body: string;
    image?: SanityImage;
  };
  answer_block?: {
    eyebrow: string;
    heading: string;
    body: string;
    image?: SanityImage;
  };
  responsibilities?: Responsibility[];
  testimonial?: Testimonial;
  splitSummary?: string;
  sessions?: Array<Omit<Session, "image"> & { image?: SanityImage }>;
  galleryLabel?: string;
  galleryImages?: SanityImage[];
  videoLabel?: string;
  videoEmbedUrl?: string;
  videoPlaceholder?: SanityImage;
  credits?: { role: string; name: string }[];
  watermark?: string;
  prev?: { slug?: { current: string }; title?: string; meta?: string };
  next?: { slug?: { current: string }; title?: string; meta?: string };
};

type RawService = {
  slug: ServiceCategory;
  label: string;
  number: string;
  blurb: string;
  meta?: string[];
};

// ─────────────────────────────────────────────────────────────
// Image helpers
// ─────────────────────────────────────────────────────────────

const imgUrl = (img: SanityImage | undefined, w = 1600): string =>
  img?.asset?.url ? `${img.asset.url}?w=${w}&auto=format` : "";

const imgUrlArr = (imgs: SanityImage[] | undefined, w = 1200): string[] =>
  (imgs ?? []).map((i) => imgUrl(i, w)).filter(Boolean);

// GROQ projection for image asset — used across all queries.
const IMG = `{ asset->{url} }`;

// ─────────────────────────────────────────────────────────────
// Projects
// ─────────────────────────────────────────────────────────────

const PROJECT_LIST_QUERY = `*[_type == "project"] | order(_createdAt asc) {
  _id,
  title,
  slug,
  service,
  serviceLabel,
  year,
  location,
  meta,
  brief,
  mosaic,
  hasSubPage,
  heroImage ${IMG}
}`;

export async function getProjects(): Promise<Project[]> {
  const raw = await sanityClient.fetch<RawProject[]>(PROJECT_LIST_QUERY, {}, {
    next: { revalidate: 60, tags: ["projects"] },
  });
  return raw.map((r) => ({
    slug: r.slug.current,
    title: r.title,
    service: r.service,
    serviceLabel: r.serviceLabel ?? "",
    year: r.year,
    location: r.location,
    meta: r.meta,
    brief: r.brief ?? "",
    heroImage: imgUrl(r.heroImage),
    mosaic: r.mosaic,
    hasSubPage: r.hasSubPage,
  }));
}

// ─────────────────────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────────────────────

const SERVICES_QUERY = `*[_type == "service"] | order(number asc) {
  slug, label, number, blurb, meta
}`;

export async function getServices(): Promise<Service[]> {
  const raw = await sanityClient.fetch<RawService[]>(SERVICES_QUERY, {}, {
    next: { revalidate: 60, tags: ["services"] },
  });
  return raw.map((r) => ({
    slug: r.slug,
    label: r.label,
    number: r.number,
    blurb: r.blurb,
    meta: r.meta ?? [],
  }));
}

// ─────────────────────────────────────────────────────────────
// Sub-page (full content by slug)
// ─────────────────────────────────────────────────────────────

const SUBPAGE_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  service,
  serviceLabel,
  year,
  location,
  meta,
  layout,
  heroTitle,
  heroDesc,
  heroImage ${IMG},
  heroImage2 ${IMG},
  introEyebrow,
  introSlogan,
  introEm,
  introFoot,
  cards[] {
    num, label, heading, body, tags,
    metrics[] { value, label },
    variant, layout,
    image ${IMG}
  },
  chapters[] {
    num, eyebrow, title, body,
    image ${IMG}
  },
  headline,
  keyMetrics[] { value, label },
  brief_block {
    eyebrow, heading, body,
    image ${IMG}
  },
  answer_block {
    eyebrow, heading, body,
    image ${IMG}
  },
  responsibilities[] { num, title, body, highlight },
  testimonial { eyebrow, quote, attribution },
  splitSummary,
  sessions[] {
    day, time, title, speaker, note,
    image ${IMG}
  },
  galleryLabel,
  galleryImages[] ${IMG},
  videoLabel,
  videoEmbedUrl,
  videoPlaceholder ${IMG},
  credits[] { role, name },
  watermark,
  prev-> { title, meta, slug },
  next-> { title, meta, slug }
}`;

/** Fetch a full sub-page's content by slug, adapted into the SubPageContent
 *  shape existing layouts already consume. Returns null when slug not found. */
export async function getSubPageContent(
  slug: string,
): Promise<SubPageContent | null> {
  const r = await sanityClient.fetch<RawProject | null>(
    SUBPAGE_QUERY,
    { slug },
    { next: { revalidate: 60, tags: ["projects", `project:${slug}`] } },
  );
  if (!r) return null;

  // Build display strings for prev/next (lowercase, expected by ProjectNav).
  const navRef = (n: RawProject["prev"]) =>
    n?.slug?.current
      ? {
          slug: n.slug.current,
          title: (n.title ?? "").toLowerCase(),
          meta: n.meta ?? "",
        }
      : undefined;

  const content: SubPageContent = {
    slug: r.slug.current,
    title: r.title,
    layout: r.layout ?? "classic",
    meta: r.meta,
    location: r.location ?? "",
    year: r.year,
    serviceLabel: r.serviceLabel ?? "",
    heroTitle: r.heroTitle ?? "",
    heroDesc: r.heroDesc ?? "",
    heroImage: imgUrl(r.heroImage),
    heroImage2: r.heroImage2?.asset?.url ? imgUrl(r.heroImage2) : undefined,
    introEyebrow: r.introEyebrow ?? "",
    introSlogan: r.introSlogan ?? "",
    introEm: r.introEm ?? "",
    introFoot: r.introFoot ?? "",
    cards: (r.cards ?? []).map((c) => ({
      ...c,
      image: c.image ? imgUrl(c.image) : undefined,
    })),
    chapters: r.chapters?.map((c) => ({ ...c, image: imgUrl(c.image) })),
    headline: r.headline,
    keyMetrics: r.keyMetrics,
    brief: r.brief_block
      ? { ...r.brief_block, image: imgUrl(r.brief_block.image) }
      : undefined,
    answer: r.answer_block
      ? { ...r.answer_block, image: imgUrl(r.answer_block.image) }
      : undefined,
    responsibilities: r.responsibilities,
    testimonial: r.testimonial,
    splitSummary: r.splitSummary,
    sessions: r.sessions?.map((s) => ({
      ...s,
      image: s.image ? imgUrl(s.image) : undefined,
    })),
    galleryLabel: r.galleryLabel ?? "",
    galleryCount: (r.galleryImages ?? []).length,
    galleryImages: imgUrlArr(r.galleryImages),
    videoLabel: r.videoLabel ?? "",
    videoEmbedUrl: r.videoEmbedUrl,
    videoPlaceholder: r.videoPlaceholder?.asset?.url
      ? imgUrl(r.videoPlaceholder)
      : undefined,
    credits: r.credits ?? [],
    watermark: r.watermark ?? "",
    prev: navRef(r.prev) ?? { slug: "", title: "", meta: "" },
    next: navRef(r.next) ?? { slug: "", title: "", meta: "" },
  };

  return content;
}

// ─────────────────────────────────────────────────────────────
// Slug list for generateStaticParams
// ─────────────────────────────────────────────────────────────

export async function getSubPageSlugs(): Promise<string[]> {
  const rows = await sanityClient.fetch<{ slug: { current: string } }[]>(
    `*[_type == "project" && hasSubPage == true]{slug}`,
    {},
    { next: { revalidate: 60, tags: ["projects"] } },
  );
  return rows.map((r) => r.slug.current);
}

// ─────────────────────────────────────────────────────────────
// projectHref — used by mosaic components; keeps hard-coded fallback logic
// ─────────────────────────────────────────────────────────────

export function projectHref(p: Project): string {
  return p.hasSubPage ? `/works/${p.slug}` : "#";
}

// Re-export so callers can `import { urlFor } from "@/lib/sanity/queries"`
export { urlFor };
