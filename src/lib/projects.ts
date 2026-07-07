/**
 * Hard-coded projects catalog (Phase 1). Sanity CMS will replace this in Phase 3.
 * Slugs match the mockup URLs so sub-page routes stay stable across the migration.
 */

export type ServiceCategory = "event" | "media" | "branding" | "show";

export type Project = {
  slug: string;
  title: string;
  service: ServiceCategory;
  serviceLabel: string;
  year: string;
  location?: string;
  meta: string;
  brief: string;
  heroImage: string;
  /** Optional: card size in the landing mosaic. */
  mosaic?: "tall" | "wide" | "big" | "standard";
  /** True for the 3 projects with real sub-pages built in Phase 1. */
  hasSubPage: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "half-moon-jungle-party",
    title: "Half Moon & Jungle",
    service: "event",
    serviceLabel: "Event Production",
    year: "2025",
    location: "Phan Thiết",
    meta: "Phan Thiết · 2025 · Multi-night festival",
    brief:
      "A Vietnamese reimagining of Thailand's iconic Full Moon Party — UV-painted palms, fire performance, and a documentary recap staged on the Phan Thiết coast across multiple nights.",
    heroImage: "/portfolio-ref/page-06.png",
    mosaic: "tall",
    hasSubPage: true,
  },
  {
    slug: "nfq-summit-asia-2025",
    title: "NFQ Summit Asia 2025",
    service: "media",
    serviceLabel: "Media Production",
    year: "2025",
    location: "HCMC",
    meta: "HCMC · 2025 · 7-day coverage",
    brief:
      "Seven-day media coverage of NFQ Summit Asia 2025 in HCMC — script, filming, photography, and a long-form recap film tying every program track into a single editorial voice.",
    heroImage: "/portfolio-ref/page-14.png",
    mosaic: "wide",
    hasSubPage: true,
  },
  {
    slug: "mer-minishow",
    title: "Mer Minishow",
    service: "show",
    serviceLabel: "Show Production",
    year: "2025",
    location: "HCMC",
    meta: "HCMC · 2025 · 90-min concert",
    brief:
      "A one-night music show led by teacher Malvin — full-stack producer from concept to song licensing to show night, with a recap film extending the night into a year-round portfolio asset.",
    heroImage: "/portfolio-ref/page-08.png",
    mosaic: "tall",
    hasSubPage: true,
  },
  {
    slug: "haniff-2024",
    title: "HANIFF 2024",
    service: "event",
    serviceLabel: "Event Production",
    year: "2024",
    location: "Hanoi",
    meta: "Hanoi · 2024 · Heritage in Motion",
    brief:
      "Heritage in Motion — Hanoi International Film Festival 2024 staged with cultural programming, red-carpet identity, and full event production support.",
    heroImage: "/portfolio-ref/page-05.png",
    mosaic: "standard",
    hasSubPage: false,
  },
  {
    slug: "bluezone-ecopark",
    title: "Bluezone Ecopark",
    service: "branding",
    serviceLabel: "TikTok Branding",
    year: "2025",
    meta: "2025 · Long-form campaign",
    brief:
      "TikTok branding and short-form content for Bluezone Ecopark — translating residential lifestyle into platform-native storytelling with consistent voice and visual register.",
    heroImage: "/portfolio-ref/page-10.png",
    mosaic: "standard",
    hasSubPage: false,
  },
  {
    slug: "deli-lifestyle",
    title: "Deli Lifestyle",
    service: "branding",
    serviceLabel: "TikTok Branding",
    year: "2025",
    meta: "2025 · Content series",
    brief:
      "Brand identity and short-form content series for Deli Lifestyle — voice-first, audience-driven, and built for platform-native consumption.",
    heroImage: "/portfolio-ref/page-11.png",
    mosaic: "standard",
    hasSubPage: false,
  },
  {
    slug: "trang-kien",
    title: "Trang Kiến",
    service: "branding",
    serviceLabel: "Content Script",
    year: "2024",
    meta: "2024 · TikTok series",
    brief:
      "Content script and series direction for Trang Kiến — long-arc TikTok narratives with an original character voice, calibrated to algorithm and audience tempo.",
    heroImage: "/portfolio-ref/page-12.png",
    mosaic: "standard",
    hasSubPage: false,
  },
  {
    slug: "co-cam",
    title: "Cô Cám",
    service: "branding",
    serviceLabel: "Content Script",
    year: "2024",
    meta: "2024 · Recurring series",
    brief:
      "Content script and direction for the Cô Cám series — building a recurring on-platform persona with arc-driven storytelling across multiple episodes.",
    heroImage: "/portfolio-ref/page-13.png",
    mosaic: "standard",
    hasSubPage: false,
  },
  {
    slug: "colorful-china",
    title: "Colorful China",
    service: "show",
    serviceLabel: "Stage & Sound",
    year: "2025",
    location: "Hồ Gươm Opera",
    meta: "Hồ Gươm Opera · Aug 2025",
    brief:
      "Stage and sound design for Colorful China at Hồ Gươm Opera — cultural performance with international production scale, calibrated to the venue's acoustic and architectural lines.",
    heroImage: "/portfolio-ref/page-07.png",
    mosaic: "standard",
    hasSubPage: false,
  },
];

/** Get the URL path for a project card (real sub-page or placeholder `#`). */
export function projectHref(project: Project): string {
  return project.hasSubPage ? `/works/${project.slug}` : "#";
}

/** Group projects by service. Order preserved via input order. */
export function projectsByService(): Record<ServiceCategory, Project[]> {
  const buckets: Record<ServiceCategory, Project[]> = {
    event: [],
    media: [],
    branding: [],
    show: [],
  };
  for (const p of PROJECTS) buckets[p.service].push(p);
  return buckets;
}

export type Service = {
  slug: ServiceCategory;
  label: string;
  number: string;
  blurb: string;
  meta: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "event",
    label: "Event Planning",
    number: "01",
    blurb:
      "An event is more than a gathering — it's an emotional journey. We deliver flexible solutions tailored to your goals and budget, from initial concept to final recap.",
    meta: [
      "Seminars & summits",
      "Product launches",
      "Brand fun runs",
      "Private events",
      "Stage & logistics",
      "Show production",
    ],
  },
  {
    slug: "media",
    label: "Media Production",
    number: "02",
    blurb:
      "Telling your brand story through visuals — inspiring with every frame. From creative concept to refined post-production, at international standard.",
    meta: [
      "Brand video",
      "Event documentary",
      "Multi-platform livestream",
      "Photography",
      "Scripting & filming",
      "Post-production",
    ],
  },
  {
    slug: "branding",
    label: "Branding & Content",
    number: "03",
    blurb:
      "From concept to execution. We craft brand stories that connect with audiences and turn moments into lasting impressions across every channel.",
    meta: [
      "Brand identity",
      "Visual storytelling",
      "TikTok branding",
      "Content script",
      "Campaign concept",
      "Social presence",
    ],
  },
  {
    slug: "show",
    label: "Show Production",
    number: "04",
    blurb:
      "End-to-end stage, sound, and lighting for live shows, concerts, and cultural performances. Holistic execution from creative direction to lasting resonance.",
    meta: [
      "Stage design",
      "Sound & audio",
      "Lighting",
      "Coordination",
      "Live media",
      "Post-show recap",
    ],
  },
];
