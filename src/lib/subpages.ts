/**
 * Sub-page content data for the 3 project detail pages (Phase 1).
 * Each page has a unique shape but shares building blocks — hero, intro,
 * numbered cards, gallery, video, credits, project-nav.
 */

export type ProjectCard = {
  num: string;
  label: string;
  heading: string; // may include a single <br /> — rendered as literal newline
  body: string[]; // paragraphs
  tags?: string[];
  metrics?: { value: string; label: string }[];
  variant: "cream" | "sand" | "orange" | "white" | "outcome";
  layout: "standard" | "split" | "process";
  image?: string; // required for split variant
};

/** Determines which layout renderer /works/[slug] uses. Each project can be
 *  showcased with a different structure per anh 2026-07-07. */
export type ProjectLayout = "classic" | "chapter" | "split" | "case-study";

export type Chapter = {
  num: string;
  eyebrow: string; // e.g. "01 · Dusk"
  title: string; // Anton huge headline for the chapter (may include <br />)
  body: string[];
  image: string;
};

export type Responsibility = {
  num: string;
  title: string;
  body: string;
  highlight?: boolean;
};

export type Testimonial = {
  eyebrow: string;
  quote: string;
  attribution: string;
};

export type SubPageContent = {
  slug: string;
  title: string;
  layout: ProjectLayout;
  meta: string; // hero meta overlay text
  location: string;
  year: string;
  serviceLabel: string;
  heroTitle: string; // multi-line uses <br />
  heroDesc: string;
  heroImage: string;
  heroImage2?: string; // NFQ: 2-image hero pair

  introEyebrow: string;
  introSlogan: string; // multi-line uses <br />
  introEm: string; // small italic subtitle
  introFoot: string;

  cards: ProjectCard[];

  // Chapter layout — Half Moon
  chapters?: Chapter[];

  // Case-study layout — Mer
  headline?: string; // 1-line summary above metric bar
  keyMetrics?: { value: string; label: string }[];
  brief?: { eyebrow: string; heading: string; body: string; image: string };
  answer?: { eyebrow: string; heading: string; body: string; image: string };
  responsibilities?: Responsibility[];
  testimonial?: Testimonial;

  // Split layout — NFQ (uses cards + gallery images already)
  splitSummary?: string; // sticky left summary paragraph

  galleryLabel: string;
  galleryCount: number;
  galleryImages: string[];

  videoLabel: string;
  videoEmbedUrl?: string; // YouTube embed for Half Moon
  videoPlaceholder?: string; // still image for placeholder

  credits: { role: string; name: string }[];
  watermark: string; // Anton huge behind credits

  prev: { slug: string; title: string; meta: string };
  next: { slug: string; title: string; meta: string };
};

export const SUB_PAGES: Record<string, SubPageContent> = {
  "bia-hoi-night": {
    slug: "bia-hoi-night",
    title: "Bia Hơi Night — 2PAT",
    layout: "chapter",
    meta: "Hồ Tràm · 2024 · Corporate Event",
    location: "Hồ Tràm",
    year: "2024",
    serviceLabel: "Event Production",
    heroTitle: "BIA HƠI<br />NIGHT",
    heroDesc:
      "A corporate night on the Hồ Tràm coast, staged as a Vietnamese street beer garden with fire performance and lô tô under the stars.",
    heroImage: "/portfolio-ref/page-04.png",

    introEyebrow: "/ THE PREMISE",
    introSlogan: "corporate night,<br />street soul.",
    introEm: "— nhậu vibe. lô tô sound. fire above the sand.",
    introFoot: "Hồ Tràm · 2024 · Beachside corporate night",

    cards: [],
    chapters: [
      {
        num: "01",
        eyebrow: "01 · Prelude",
        title: "welcome,<br />mở tiệc.",
        body: [
          "Guests arrive at dusk. The corporate crowd steps out of shuttle buses into something that doesn't look like a corporate event — it looks like a Vietnamese street market by the sea. Low plastic stools. Fresh bia hơi. Grilled skewers on charcoal.",
          "2PAT worked with local contractors in Hồ Tràm to build the entire scene on the beach — hội chợ stalls, lantern-lit paths, and a stage tucked behind the food trucks — so the arrival itself was the first surprise.",
        ],
        image: "/portfolio-ref/page-04.png",
      },
      {
        num: "02",
        eyebrow: "02 · Nhậu",
        title: "hội chợ<br />bên biển.",
        body: [
          "The hội chợ opens: skill games, wooden stalls with prizes, food from ten Vietnamese street vendors, and cold bia hơi poured directly at the counter. The crowd loosens up. Corporate hierarchy dissolves over shared plates of nem nướng.",
          "Every stall was staffed by local vendors, coordinated by 2PAT — no imported catering, no white-tablecloth pretense. Just Vietnamese street food, done properly, for a corporate audience that would remember it.",
        ],
        image: "/portfolio-ref/page-05.png",
      },
      {
        num: "03",
        eyebrow: "03 · Fire",
        title: "múa lửa<br />trên cát.",
        body: [
          "As the sun sinks past the horizon, fire performers move onto the beach. Traditional Vietnamese street fire performance — not a Cirque du Soleil pastiche, but the real thing you'd find at a night market in Hà Nội or an old street corner in Chợ Lớn.",
          "The choreography is calibrated to the tide, the wind, and a soundtrack of drums layered over ambient waves. The crowd stops chewing and starts recording.",
        ],
        image: "/portfolio-ref/page-06.png",
      },
      {
        num: "04",
        eyebrow: "04 · Lô tô",
        title: "gió hát,<br />trăng cười.",
        body: [
          "The night closes with hát lô tô — the traditional Vietnamese lottery-song performance — under the moon. Numbers called with rhyming humor. Prizes handed out. A closing act that could only happen in Vietnam.",
          "By the time the last coach rolls out, the corporate briefing is done, the shared meal is finished, and the guests have taken home a night that reads as culture, not a company outing.",
        ],
        image: "/portfolio-ref/page-07.png",
      },
    ],

    galleryLabel: "/ THE NIGHT",
    galleryCount: 8,
    galleryImages: [
      "/portfolio-ref/page-04.png",
      "/portfolio-ref/page-05.png",
      "/portfolio-ref/page-06.png",
      "/portfolio-ref/page-07.png",
      "/portfolio-ref/page-08.png",
      "/portfolio-ref/page-09.png",
      "/portfolio-ref/page-10.png",
      "/portfolio-ref/page-11.png",
    ],

    videoLabel: "/ RECAP FILM",
    videoPlaceholder: "/portfolio-ref/page-04.png",

    credits: [
      { role: "Concept & Direction", name: "2PAT Creative" },
      { role: "Event Production", name: "2PAT + Hồ Tràm partners" },
      { role: "Décor & Build", name: "Local Hồ Tràm contractors" },
      { role: "Fire Performance", name: "Street fire artists" },
      { role: "Hát Lô Tô", name: "Traditional lô tô troupe" },
      { role: "Food Vendors", name: "10 Vietnamese street kitchens" },
      { role: "Media Production", name: "2PAT Media" },
      { role: "Year", name: "2024" },
    ],
    watermark: "BIA HƠI",

    prev: {
      slug: "mer-minishow",
      title: "mer minishow",
      meta: "Show · HCMC · 2025",
    },
    next: {
      slug: "gatsby-dinh-doc-lap",
      title: "gatsby dinh độc lập",
      meta: "Event · HCMC · 2024",
    },
  },

  "gatsby-dinh-doc-lap": {
    slug: "gatsby-dinh-doc-lap",
    title: "Gatsby Dinh Độc Lập — 2PAT",
    layout: "case-study",
    meta: "HCMC · 2024 · Corporate Event",
    location: "Dinh Độc Lập, HCMC",
    year: "2024",
    serviceLabel: "Event Production",
    heroTitle: "GATSBY<br />DINH ĐỘC LẬP",
    heroDesc:
      "A 1920s Gatsby-themed corporate night held at Dinh Độc Lập — art deco translated into a Vietnamese national landmark.",
    heroImage: "/portfolio-ref/page-15.png",

    introEyebrow: "/ THE PREMISE",
    introSlogan: "art deco,<br />national landmark.",
    introEm: "— gatsby-era immersion, translated in situ.",
    introFoot: "HCMC · 2024 · Corporate night at a landmark",

    cards: [],

    headline: "art deco meets a national landmark.",
    keyMetrics: [
      { value: "300", label: "guests" },
      { value: "1", label: "gatsby night" },
      { value: "12h", label: "install window" },
      { value: "1920s", label: "period fidelity" },
    ],
    brief: {
      eyebrow: "/ THE BRIEF",
      heading: "a gatsby night,<br />at a landmark.",
      body:
        "A corporate client wanted the world of The Great Gatsby dropped into Dinh Độc Lập — Vietnam's most historically loaded venue. Full 1920s art deco immersion, but reverent to the palace's own architectural voice. One night. Three hundred guests. Zero anachronism.",
      image: "/portfolio-ref/page-15.png",
    },
    answer: {
      eyebrow: "/ THE ANSWER",
      heading: "translated,<br />in situ.",
      body:
        "2PAT read the palace's colonial art deco geometry and matched the Gatsby period to what was already in the building — champagne coupes at the marble stair, jazz quartet under the mid-century chandeliers, black-tie fashion echoing the palace's original 1960s state-dinner era.",
      image: "/portfolio-ref/page-10.png",
    },
    responsibilities: [
      {
        num: "01",
        title: "Concept",
        body:
          "Art deco narrative anchored to Dinh Độc Lập's existing architecture — no pastiche, no imported set pieces that fought the venue.",
      },
      {
        num: "02",
        title: "Timeline",
        body:
          "12-hour install window before doors, tight rehearsal schedule around the palace's public-access constraints. Every hour costed and cued.",
        highlight: true,
      },
      {
        num: "03",
        title: "Décor",
        body:
          "Custom art deco set design, gold-and-black palette calibrated to the venue's marble and wood tones.",
      },
      {
        num: "04",
        title: "Fashion",
        body:
          "Curated dress code guidance for guests, staff wardrobe designed to match the era without upstaging.",
      },
      {
        num: "05",
        title: "F&B",
        body:
          "Champagne bar, canapé menu, and jazz-age cocktails — full menu programming with the venue's catering partner.",
      },
      {
        num: "06",
        title: "Program",
        body:
          "Run of show including jazz quartet, charleston choreography interludes, and a keynote moment staged on the main marble stair.",
      },
    ],
    testimonial: {
      eyebrow: "/ VOICES",
      quote:
        "we wanted gatsby, but we didn't want a costume party. 2pat gave us gatsby that belonged inside dinh độc lập — not against it.",
      attribution: "Client · Corporate Event Lead",
    },

    galleryLabel: "/ THE NIGHT",
    galleryCount: 8,
    galleryImages: [
      "/portfolio-ref/page-15.png",
      "/portfolio-ref/page-10.png",
      "/portfolio-ref/page-11.png",
      "/portfolio-ref/page-12.png",
      "/portfolio-ref/page-05.png",
      "/portfolio-ref/page-06.png",
      "/portfolio-ref/page-07.png",
      "/portfolio-ref/page-13.png",
    ],

    videoLabel: "/ RECAP FILM",
    videoPlaceholder: "/portfolio-ref/page-15.png",

    credits: [
      { role: "Concept & Direction", name: "2PAT Creative" },
      { role: "Timeline & Production", name: "2PAT Event Team" },
      { role: "Décor Design", name: "2PAT & partners" },
      { role: "Fabrication", name: "Independent contractors" },
      { role: "F&B Programming", name: "2PAT + venue catering" },
      { role: "Jazz Quartet", name: "Live musicians" },
      { role: "Photography", name: "2PAT Media" },
      { role: "Videography", name: "2PAT Media" },
      { role: "Venue", name: "Dinh Độc Lập, HCMC" },
      { role: "Year", name: "2024" },
    ],
    watermark: "GATSBY",

    prev: {
      slug: "bia-hoi-night",
      title: "bia hơi night",
      meta: "Event · Hồ Tràm · 2024",
    },
    next: {
      slug: "half-moon-jungle-party",
      title: "half moon & jungle",
      meta: "Event · Phan Thiết · 2025",
    },
  },

  "gradion-summit": {
    slug: "gradion-summit",
    title: "Gradion Summit — 2PAT",
    layout: "split",
    splitSummary:
      "Full-event media coverage for Gradion Summit — every session, keynote, and hallway moment captured, cut, and delivered as a single editorial voice.",
    meta: "2024 · Media Production",
    location: "HCMC",
    year: "2024",
    serviceLabel: "Media Production",
    heroTitle: "GRADION<br />SUMMIT",
    heroDesc:
      "Full media coverage for Gradion Summit — end-to-end capture and delivery across sessions, keynotes, and program tracks.",
    heroImage: "/portfolio-ref/page-03.png",

    introEyebrow: "/ THE PREMISE",
    introSlogan: "full event,<br />one voice.",
    introEm: "— covered, cut, delivered.",
    introFoot: "2024 · Full-event media coverage",

    cards: [
      {
        num: "01",
        label: "/ OVERVIEW",
        heading: "a summit,<br />end-to-end.",
        body: [
          "Gradion Summit brought together a program of sessions and keynotes over multiple days. 2PAT owned the complete media layer — from pre-event photography and speaker portraits through session filming, real-time editing, and the delivery of a long-form recap.",
          "The brief was straightforward: one editorial voice across every touchpoint. The result was a media package that could carry the brand's Summit story for a full year of downstream content.",
        ],
        tags: ["Full coverage", "Multi-format", "Editorial voice", "Long-form recap"],
        variant: "cream",
        layout: "standard",
      },
      {
        num: "02",
        label: "/ APPROACH",
        heading: "embedded crew,<br />parallel edit.",
        body: [
          "The crew was embedded on-site for the entire program, not brought in after the fact. Filming, photography, and rough cuts ran in parallel — so daily recaps went out inside 24 hours and the long-form recap was mostly assembled before the last session ended.",
          "Portrait sets, session B-roll, keynote coverage, and candid documentary footage all moved through the same edit register, so nothing felt bolted on.",
        ],
        tags: ["Embedded crew", "Parallel edit", "24hr turnaround", "Portrait sets"],
        variant: "sand",
        layout: "split",
        image: "/portfolio-ref/page-14.png",
      },
      {
        num: "03",
        label: "/ COVERAGE",
        heading: "everything,<br />on delivery.",
        body: [
          "Across the program the crew shipped a long-form recap, daily highlight cuts, a curated speaker portrait set, and a session photo archive deep enough to fuel a full year of brand comms.",
        ],
        metrics: [
          { value: "Full program", label: "session-by-session coverage" },
          { value: "1 film", label: "long-form recap" },
          { value: "300+ stills", label: "curated photo set" },
        ],
        variant: "outcome",
        layout: "split",
        image: "/portfolio-ref/page-11.png",
      },
    ],

    galleryLabel: "/ THE COVERAGE",
    galleryCount: 15,
    galleryImages: [
      "/portfolio-ref/page-03.png",
      "/portfolio-ref/page-04.png",
      "/portfolio-ref/page-05.png",
      "/portfolio-ref/page-06.png",
      "/portfolio-ref/page-07.png",
      "/portfolio-ref/page-08.png",
      "/portfolio-ref/page-09.png",
      "/portfolio-ref/page-10.png",
      "/portfolio-ref/page-11.png",
      "/portfolio-ref/page-12.png",
      "/portfolio-ref/page-13.png",
      "/portfolio-ref/page-14.png",
      "/portfolio-ref/page-15.png",
      "/portfolio-ref/page-04.png",
      "/portfolio-ref/page-06.png",
    ],

    videoLabel: "/ RECAP FILM",
    videoPlaceholder: "/portfolio-ref/page-03.png",

    credits: [
      { role: "Creative Direction", name: "2PAT Creative" },
      { role: "Script", name: "2PAT Media" },
      { role: "Direction & Filming", name: "2PAT Media" },
      { role: "Photography", name: "2PAT Media" },
      { role: "Post-Production", name: "2PAT Media" },
      { role: "Color Grade", name: "2PAT in-house" },
      { role: "Client", name: "Gradion" },
      { role: "Year", name: "2024" },
    ],
    watermark: "GRADION",

    prev: {
      slug: "nfq-summit-asia-2025",
      title: "nfq summit asia 2025",
      meta: "Media · HCMC · 2025",
    },
    next: {
      slug: "mer-minishow",
      title: "mer minishow",
      meta: "Show · HCMC · 2025",
    },
  },

  "half-moon-jungle-party": {
    slug: "half-moon-jungle-party",
    title: "Half Moon & Jungle Party — 2PAT",
    layout: "chapter",
    meta: "Phan Thiết · 2025 · Event Production",
    location: "Phan Thiết",
    year: "2025",
    serviceLabel: "Event Production",
    heroTitle: "HALF MOON<br />& JUNGLE",
    heroDesc:
      "A Vietnamese reimagining of Thailand's Full Moon Party, staged on the Phan Thiết coast in 2025.",
    heroImage: "/portfolio-ref/page-06.png",

    introEyebrow: "/ THE PREMISE",
    introSlogan: "a beach festival,<br />reimagined for vietnam.",
    introEm: "— anchored to the land, tuned to the world.",
    introFoot: "Phan Thiết · 2025 · multi-night festival",

    cards: [
      {
        num: "01",
        label: "/ OVERVIEW",
        heading: "a journey back<br />to nature.",
        body: [
          "Half Moon & Jungle Party is a beachscape festival staged on the Phan Thiết coast — a Vietnamese reimagining of Thailand's iconic Full Moon Party. Across multiple nights, the event blends UV-lit jungle motifs, fire performance, and immersive audio under an open sky.",
          "2PAT owned the concept end-to-end: from creative direction and stage design to fire & sand programming, sound engineering, and the documentary recap that captured the arc as a single visual artifact.",
        ],
        tags: ["Multi-night festival", "UV stage", "Fire & sand", "Documentary recap"],
        variant: "cream",
        layout: "standard",
      },
      {
        num: "02",
        label: "/ INSPIRATION",
        heading: "a vietnamese<br />full moon.",
        body: [
          "The seed was Thailand's iconic Full Moon Party — its hypnotic UV palette, beach-fire energy, and global dance vocabulary. We grounded it in Phan Thiết's Cham architectural motifs, sand-carved sculptures, and coastal craft traditions, threaded together with local driftwood and the warmth of regional materials.",
          "Every reference was filtered through one question: what would a Vietnamese Full Moon Party feel like — at this shoreline, with these materials, for this audience?",
        ],
        tags: ["Cham motifs", "UV palette", "Coastal craft", "Driftwood"],
        variant: "sand",
        layout: "split",
        image: "/portfolio-ref/page-07.png",
      },
      {
        num: "03",
        label: "/ STORY CONCEPT",
        heading: "dusk to dawn,<br />one arc.",
        body: [
          "The night opens at dusk with low frequencies, mimicking the slow awakening of a tropical forest at the shoreline. As the moon rises, bioluminescent palms ignite in waves, and fire performers trace the line between sea and stage. By midnight, the rhythm crests under the glow of a half-moon centerpiece — a moment of collective release.",
          "The arc ends at dawn with embers settling into the sand: a soft return to nature, like the morning after a dream. Every set design, music cue, and lighting transition served this single narrative spine.",
        ],
        tags: ["Dusk → dawn", "Fire ritual", "Half-moon centerpiece", "Bioluminescent"],
        variant: "orange",
        layout: "split",
        image: "/portfolio-ref/page-06.png",
      },
      {
        num: "04",
        label: "/ PROCESS",
        heading: "from coast<br />to camera.",
        body: [],
        variant: "white",
        layout: "process",
      },
      {
        num: "05",
        label: "/ OUTCOME",
        heading: "a sold-out<br />signature event.",
        body: [
          "Half Moon & Jungle Party launched to a sold-out crowd, captured press across Vietnamese lifestyle media, and the documentary recap became a year-round brand artifact — establishing a season-over-season identity that 2PAT continues to evolve.",
        ],
        metrics: [
          { value: "Sold-out", label: "Across all nights" },
          { value: "Press wave", label: "National lifestyle media" },
          { value: "Recap film", label: "Year-round brand asset" },
        ],
        variant: "outcome",
        layout: "split",
        image: "/portfolio-ref/page-14.png",
      },
    ],

    chapters: [
      {
        num: "01",
        eyebrow: "01 · Dusk",
        title: "the coast<br />awakens.",
        body: [
          "The night opens at dusk with low frequencies, mimicking the slow awakening of a tropical forest at the shoreline. Fires are lit, palms glow soft under UV, and the first bodies find the sand.",
          "The stage sits calibrated to the wind. The setlist starts warm. Everything before this moment — recce, licensing, build, rehearsal — was to earn the right to press play.",
        ],
        image: "/portfolio-ref/page-06.png",
      },
      {
        num: "02",
        eyebrow: "02 · Rise",
        title: "moonlight<br />finds the tide.",
        body: [
          "As the moon rises, bioluminescent palms ignite in waves. Fire performers trace the line between sea and stage. The soundscape opens up — layered synth over a slow bass pulse — and the crowd starts to move as a single body.",
          "This is where UV palette, Cham motifs, and coastal materials cohere into a single visual identity. Not a Full Moon Party imitation — a Vietnamese one.",
        ],
        image: "/portfolio-ref/page-07.png",
      },
      {
        num: "03",
        eyebrow: "03 · Crest",
        title: "the half-moon<br />ignites.",
        body: [
          "By midnight the rhythm crests. The half-moon centerpiece — the visual anchor of the entire concept — lights up above the stage. Fire choreography peaks. Every cue lands where it was rehearsed.",
          "This is the moment the whole production was built for: a collective release, a shared breath, and a room that will remember it for years.",
        ],
        image: "/portfolio-ref/page-08.png",
      },
      {
        num: "04",
        eyebrow: "04 · Dawn",
        title: "embers, then<br />the morning.",
        body: [
          "The arc ends at dawn with embers settling into the sand: a soft return to nature, like the morning after a dream. The last performers hand the room back to the coast.",
          "Meanwhile, the media crew is still working — the recap film that would carry this night beyond its audience for the next twelve months was already being cut in parallel.",
        ],
        image: "/portfolio-ref/page-10.png",
      },
    ],

    galleryLabel: "/ CAPTURED MOMENTS",
    galleryCount: 8,
    galleryImages: [
      "/portfolio-ref/page-06.png",
      "/portfolio-ref/page-07.png",
      "/portfolio-ref/page-08.png",
      "/portfolio-ref/page-09.png",
      "/portfolio-ref/page-10.png",
      "/portfolio-ref/page-11.png",
      "/portfolio-ref/page-12.png",
      "/portfolio-ref/page-13.png",
    ],

    videoLabel: "/ RECAP FILM",
    videoEmbedUrl: "https://www.youtube.com/embed/zlo7fbcmMuE?rel=0",

    credits: [
      { role: "Concept & Direction", name: "2PAT Creative" },
      { role: "Event Production", name: "2PAT Event Team" },
      { role: "Stage Design", name: "2PAT & partners" },
      { role: "Sound & Lighting", name: "Independent contractors" },
      { role: "Media Production", name: "2PAT Media" },
      { role: "Photography", name: "2PAT in-house" },
      { role: "Performers", name: "Local fire & movement artists" },
      { role: "Year", name: "2025" },
    ],
    watermark: "HALF MOON",

    prev: {
      slug: "gatsby-dinh-doc-lap",
      title: "gatsby dinh độc lập",
      meta: "Event · HCMC · 2024",
    },
    next: {
      slug: "nfq-summit-asia-2025",
      title: "nfq summit asia 2025",
      meta: "Media · HCMC · 2025",
    },
  },

  "nfq-summit-asia-2025": {
    slug: "nfq-summit-asia-2025",
    title: "NFQ Summit Asia 2025 — 2PAT",
    layout: "split",
    splitSummary:
      "Seven days. One embedded crew. Every session, hallway moment, and field trip captured and turned into a single editorial voice — recap film, daily highlight cuts, and a curated photo set that carried the brand for a full year.",
    meta: "HCMC · 2025 · Media Production",
    location: "HCMC",
    year: "2025",
    serviceLabel: "Media Production",
    heroTitle: "NFQ SUMMIT<br />ASIA 2025",
    heroDesc:
      "A seven-day summit in Ho Chi Minh City, captured frame by frame by 2PAT Media.",
    heroImage: "/portfolio-ref/page-14.png",
    heroImage2: "/portfolio-ref/page-13.png",

    introEyebrow: "/ THE PREMISE",
    introSlogan: "seven days,<br />one editorial arc.",
    introEm: "— scripted. shot. cut. delivered.",
    introFoot: "HCMC · 2025 · 7-day media coverage",

    cards: [
      {
        num: "01",
        label: "/ OVERVIEW",
        heading: "a summit,<br />captured in motion.",
        body: [
          "NFQ Summit Asia 2025 was a seven-day gathering in Ho Chi Minh City blending workshop sessions, cultural exchange, and nature exploration. 2PAT owned end-to-end media coverage — script to post — translating every session, hallway moment, and field trip into a single cinematic arc.",
          "The brief: build one editorial voice across a week of unrelated programming. The deliverables: a long-form recap, daily highlight cuts, and a curated photo set deep enough to carry the brand for a full year.",
        ],
        tags: ["7-day coverage", "Documentary", "Multi-format", "Long-form recap"],
        variant: "cream",
        layout: "standard",
      },
      {
        num: "02",
        label: "/ APPROACH",
        heading: "a single voice<br />across the week.",
        body: [
          "We embedded a small media crew on-site for the full program — working in parallel to the schedule, not after it. Script-driven highlight reels, candid documentary footage, branded portrait sets, and rapid-turnaround daily recaps all moved through the same editorial register.",
          "The result felt of-a-piece, not stitched together — one voice carrying seven days of unrelated programming into a single story.",
        ],
        tags: ["Embedded crew", "Daily recap", "Portrait sets", "One voice"],
        variant: "sand",
        layout: "split",
        image: "/portfolio-ref/page-12.png",
      },
      {
        num: "03",
        label: "/ COVERAGE",
        heading: "the summit,<br />in one cinematic arc.",
        body: [
          "Across seven days the crew shipped a long-form recap, a series of daily highlight cuts, and a curated photo set spanning every program track — from workshop sessions to riverside dinners.",
        ],
        metrics: [
          { value: "7 days", label: "full editorial coverage" },
          { value: "1 film", label: "long-form recap" },
          { value: "400+ stills", label: "curated photo set" },
        ],
        variant: "outcome",
        layout: "split",
        image: "/portfolio-ref/page-11.png",
      },
    ],

    galleryLabel: "/ THE WEEK IN FRAMES",
    galleryCount: 15,
    galleryImages: [
      "/portfolio-ref/page-04.png",
      "/portfolio-ref/page-05.png",
      "/portfolio-ref/page-06.png",
      "/portfolio-ref/page-07.png",
      "/portfolio-ref/page-08.png",
      "/portfolio-ref/page-09.png",
      "/portfolio-ref/page-11.png",
      "/portfolio-ref/page-12.png",
      "/portfolio-ref/page-13.png",
      "/portfolio-ref/page-14.png",
      "/portfolio-ref/page-15.png",
      "/portfolio-ref/page-03.png",
      "/portfolio-ref/page-04.png",
      "/portfolio-ref/page-06.png",
      "/portfolio-ref/page-08.png",
    ],

    videoLabel: "/ RECAP FILM",
    videoPlaceholder: "/portfolio-ref/page-14.png",

    credits: [
      { role: "Creative Direction", name: "2PAT Creative" },
      { role: "Script", name: "2PAT Media" },
      { role: "Direction & Filming", name: "2PAT Media" },
      { role: "Photography", name: "2PAT Media" },
      { role: "Post-Production", name: "2PAT Media" },
      { role: "Color Grade", name: "2PAT in-house" },
      { role: "Client", name: "NFQ" },
      { role: "Year", name: "2025" },
    ],
    watermark: "NFQ SUMMIT",

    prev: {
      slug: "half-moon-jungle-party",
      title: "half moon & jungle",
      meta: "Event · Phan Thiết · 2025",
    },
    next: {
      slug: "gradion-summit",
      title: "gradion summit",
      meta: "Media · 2024",
    },
  },

  "mer-minishow": {
    slug: "mer-minishow",
    title: "Mer Minishow — 2PAT",
    layout: "case-study",
    headline: "one night. full-stack producer. zero re-takes.",
    keyMetrics: [
      { value: "1", label: "night live" },
      { value: "14", label: "songs licensed" },
      { value: "90", label: "min set, no breaks" },
      { value: "S/O", label: "intimate venue" },
    ],
    brief: {
      eyebrow: "/ THE BRIEF",
      heading: "a portfolio night,<br />done right.",
      body:
        "Teacher Malvin wanted a proper stage — not a recital. A curated setlist of originals and covers, fully licensed, with staging, lighting, and capture that would carry the performance beyond the room. One night only.",
      image: "/portfolio-ref/page-09.png",
    },
    answer: {
      eyebrow: "/ THE ANSWER",
      heading: "we owned<br />the whole thing.",
      body:
        "2PAT served as full-stack producer — concept, licensing, venue, stage, sound, lighting, media. Six roles, one team, one night. Every song cleared before doors opened. Every cue rehearsed before the audience arrived.",
      image: "/portfolio-ref/page-08.png",
    },
    responsibilities: [
      { num: "01", title: "Concept", body: "Narrative shape, audience tone, and the 90-minute arc — built around Malvin's personal repertoire." },
      { num: "02", title: "Licensing", body: "Music rights for every song on the setlist. Venue permits, performance licenses, public-show paperwork — cleared before doors opened.", highlight: true },
      { num: "03", title: "Venue", body: "Scouting, acoustic check, contract, and night-of coordination — sourcing the right room for an intimate format." },
      { num: "04", title: "Stage", body: "Set design, lighting plot, build — calibrated to the venue's lines and the show's narrative beats." },
      { num: "05", title: "Sound", body: "Engineering, FOH mix, monitors, line check — every cue rehearsed and timed before the audience walked in." },
      { num: "06", title: "Media", body: "Filming, photography, and the recap edit — turning a one-night live moment into a year-round portfolio asset." },
    ],
    testimonial: {
      eyebrow: "/ VOICES",
      quote:
        "every performer needs a producer who treats the night like it's their own. 2pat held the licenses, the lights, the timing — i held the mic.",
      attribution: "Teacher Malvin · Performer & Creative Lead",
    },
    meta: "HCMC · 2025 · Show Production",
    location: "HCMC",
    year: "2025",
    serviceLabel: "Show Production",
    heroTitle: "MER<br />MINISHOW",
    heroDesc:
      "A one-night music show led by teacher Malvin — fully produced end-to-end by 2PAT, song to silence.",
    heroImage: "/portfolio-ref/page-08.png",

    introEyebrow: "/ THE PREMISE",
    introSlogan: "one night,<br />end to end.",
    introEm: "— produced by 2pat, song to silence.",
    introFoot: "HCMC · 2025 · 90-min concert",

    cards: [
      {
        num: "01",
        label: "/ OVERVIEW",
        heading: "a single night,<br />a full season<br />of work.",
        body: [
          "Mer Minishow was a one-night music event led by teacher Malvin — staged as an intimate concert with original performances and a curated cover list. Every song on the setlist required full licensing clearance, every cue had to land cleanly the first time.",
          "2PAT served as full-stack producer: concept and narrative, legal and licensing, venue and logistics, stage and sound, and on-night execution. One brief: deliver a real show, not a recital.",
        ],
        tags: ["One-night show", "Original + covers", "Full-stack producer", "Intimate concert"],
        variant: "cream",
        layout: "standard",
      },
      {
        num: "02",
        label: "/ STORY",
        heading: "from idea<br />to encore.",
        body: [
          "The concept started as a portfolio night — a chance for Malvin to perform a personal repertoire with proper licensing, staging, and capture, not a casual recital.",
          "We translated that intent into a 90-minute set design, secured rights for every song on the list, sourced an intimate venue with the right acoustic, and built a media plan that would carry the night beyond its audience.",
        ],
        tags: ["Set design", "Venue scouting", "Licensing", "Media plan"],
        variant: "sand",
        layout: "split",
        image: "/portfolio-ref/page-09.png",
      },
      {
        num: "03",
        label: "/ OUTCOME",
        heading: "a clean run,<br />on the night<br />that mattered.",
        body: [
          "One night. Zero re-takes. A fully cleared setlist, an audience that filled the room, and a recap film that turned a live moment into a year-round portfolio asset for Malvin.",
        ],
        metrics: [
          { value: "1 night", label: "live concert" },
          { value: "14 songs", label: "fully licensed" },
          { value: "90-min", label: "set, no breaks" },
          { value: "Sold-out", label: "intimate venue" },
        ],
        variant: "outcome",
        layout: "split",
        image: "/portfolio-ref/page-08.png",
      },
    ],

    galleryLabel: "/ THE NIGHT (8)",
    galleryCount: 8,
    galleryImages: [
      "/portfolio-ref/page-08.png",
      "/portfolio-ref/page-09.png",
      "/portfolio-ref/page-07.png",
      "/portfolio-ref/page-10.png",
      "/portfolio-ref/page-11.png",
      "/portfolio-ref/page-12.png",
      "/portfolio-ref/page-13.png",
      "/portfolio-ref/page-14.png",
    ],

    videoLabel: "/ RECAP FILM",
    videoPlaceholder: "/portfolio-ref/page-08.png",

    credits: [
      { role: "Executive Producer", name: "2PAT" },
      { role: "Concept & Narrative", name: "2PAT Creative" },
      { role: "Licensing & Legal", name: "2PAT" },
      { role: "Venue Coordination", name: "2PAT" },
      { role: "Stage Design", name: "2PAT & partners" },
      { role: "Sound Engineering", name: "Independent contractor" },
      { role: "Lighting", name: "Independent contractor" },
      { role: "Photography", name: "2PAT Media" },
      { role: "Videography", name: "2PAT Media" },
      { role: "Performer & Creative Lead", name: "Teacher Malvin" },
      { role: "Year", name: "2025" },
      { role: "Venue", name: "HCMC" },
    ],
    watermark: "MER",

    prev: {
      slug: "gradion-summit",
      title: "gradion summit",
      meta: "Media · 2024",
    },
    next: {
      slug: "bia-hoi-night",
      title: "bia hơi night",
      meta: "Event · Hồ Tràm · 2024",
    },
  },
};

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Site & brief",
    body:
      "Coastal recce in Phan Thiết, audience scoping, and licensing groundwork — every constraint mapped before a single sketch was drawn.",
  },
  {
    num: "02",
    title: "Concept & design",
    body:
      "UV palette, Cham-inspired sand sculpture, the half-moon centerpiece — narrative arc translated into stage, lighting, and material choices.",
  },
  {
    num: "03",
    title: "Build & rehearsal",
    body:
      "On-site rig, sound check, fire choreography, and full cue programming across multiple nights — calibrated to the coast's wind and tide.",
  },
  {
    num: "04",
    title: "Show & recap",
    body:
      "Run-of-show across every night, real-time recovery on edge cases, and parallel documentary capture for the recap film.",
  },
];
