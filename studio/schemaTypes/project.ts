import {defineArrayMember, defineField, defineType} from 'sanity'

const SERVICE_OPTIONS = [
  {title: 'Event Planning', value: 'event'},
  {title: 'Media Production', value: 'media'},
  {title: 'Branding & Content', value: 'branding'},
  {title: 'Show Production', value: 'show'},
]

const LAYOUT_OPTIONS = [
  {title: 'Classic (numbered cards)', value: 'classic'},
  {title: 'Chapter (narrative arc)', value: 'chapter'},
  {title: 'Split editorial (sticky info + scrolling)', value: 'split'},
  {title: 'Case study (metrics-forward)', value: 'case-study'},
  {title: 'Photo essay (full-bleed photojournalism)', value: 'photo-essay'},
  {title: 'Editorial spread (magazine article)', value: 'editorial-spread'},
  {title: 'Session timeline (conference program)', value: 'session-timeline'},
]

const MOSAIC_OPTIONS = [
  {title: 'Standard (1×1)', value: 'standard'},
  {title: 'Tall (1 col, 2 rows)', value: 'tall'},
  {title: 'Wide (2 cols, 1 row)', value: 'wide'},
  {title: 'Big (2 cols, 2 rows)', value: 'big'},
]

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    {name: 'summary', title: 'Summary', default: true},
    {name: 'hero', title: 'Hero + Intro'},
    {name: 'cards', title: 'Cards'},
    {name: 'chapters', title: 'Chapters', hidden: ({parent}) => parent?.layout !== 'chapter' && parent?.layout !== 'photo-essay'},
    {name: 'caseStudy', title: 'Case study fields', hidden: ({parent}) => parent?.layout !== 'case-study' && parent?.layout !== 'editorial-spread'},
    {name: 'split', title: 'Split summary', hidden: ({parent}) => parent?.layout !== 'split'},
    {name: 'sessions', title: 'Sessions', hidden: ({parent}) => parent?.layout !== 'session-timeline'},
    {name: 'media', title: 'Gallery + Video'},
    {name: 'credits', title: 'Credits + Nav'},
  ],

  // ─── Summary ───────────────────────────────────────
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'summary',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'summary',
      options: {source: 'title', maxLength: 96},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      group: 'summary',
      options: {list: SERVICE_OPTIONS, layout: 'radio'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'serviceLabel',
      title: 'Service label (shown on cards)',
      type: 'string',
      group: 'summary',
      description: 'Free-text label, e.g. "TikTok Branding" — may differ from the service key',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'summary',
      validation: (r) => r.required(),
    }),
    defineField({name: 'location', title: 'Location', type: 'string', group: 'summary'}),
    defineField({
      name: 'meta',
      title: 'Meta line',
      description: 'One-line meta, e.g. "Phan Thiết · 2025 · Multi-night festival"',
      type: 'string',
      group: 'summary',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'brief',
      title: 'Brief summary (used in mosaics + archive)',
      type: 'text',
      rows: 4,
      group: 'summary',
    }),
    defineField({
      name: 'mosaic',
      title: 'Mosaic size (landing + archive)',
      type: 'string',
      group: 'summary',
      options: {list: MOSAIC_OPTIONS, layout: 'radio'},
      initialValue: 'standard',
    }),
    defineField({
      name: 'hasSubPage',
      title: 'Has dedicated sub-page?',
      description: 'When off, project cards link to # placeholder',
      type: 'boolean',
      group: 'summary',
      initialValue: false,
    }),
    defineField({
      name: 'layout',
      title: 'Sub-page layout',
      type: 'string',
      group: 'summary',
      options: {list: LAYOUT_OPTIONS, layout: 'dropdown'},
      hidden: ({parent}) => !parent?.hasSubPage,
      initialValue: 'classic',
    }),

    // ─── Hero + Intro ─────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Hero title (HTML — use <br /> for line break)',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDesc',
      title: 'Hero description',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroImage2',
      title: 'Hero image 2 (for 2-image pair)',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
    }),
    defineField({name: 'introEyebrow', title: 'Intro eyebrow', type: 'string', group: 'hero'}),
    defineField({
      name: 'introSlogan',
      title: 'Intro slogan (HTML — use <br /> for line break)',
      type: 'string',
      group: 'hero',
    }),
    defineField({name: 'introEm', title: 'Intro em (italic subtitle)', type: 'string', group: 'hero'}),
    defineField({name: 'introFoot', title: 'Intro foot line', type: 'string', group: 'hero'}),

    // ─── Cards ────────────────────────────────────────
    defineField({
      name: 'cards',
      title: 'Numbered cards',
      type: 'array',
      group: 'cards',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'card',
          fields: [
            {name: 'num', type: 'string', validation: (r) => r.required()},
            {name: 'label', type: 'string', validation: (r) => r.required()},
            {name: 'heading', title: 'Heading (HTML)', type: 'string'},
            {name: 'body', title: 'Body paragraphs', type: 'array', of: [{type: 'text'}]},
            {name: 'tags', type: 'array', of: [{type: 'string'}]},
            {
              name: 'metrics',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    {name: 'value', type: 'string'},
                    {name: 'label', type: 'string'},
                  ],
                }),
              ],
            },
            {
              name: 'variant',
              type: 'string',
              options: {
                list: ['cream', 'sand', 'orange', 'white', 'outcome'],
                layout: 'radio',
              },
            },
            {
              name: 'layout',
              title: 'Card layout',
              type: 'string',
              options: {list: ['standard', 'split', 'process'], layout: 'radio'},
            },
            {name: 'image', type: 'image', options: {hotspot: true}},
          ],
          preview: {select: {title: 'label', subtitle: 'num'}},
        }),
      ],
    }),

    // ─── Chapters (photo-essay + chapter layouts) ─────
    defineField({
      name: 'chapters',
      title: 'Chapters',
      type: 'array',
      group: 'chapters',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'chapter',
          fields: [
            {name: 'num', type: 'string', validation: (r) => r.required()},
            {name: 'eyebrow', type: 'string', validation: (r) => r.required()},
            {name: 'title', title: 'Title (HTML)', type: 'string', validation: (r) => r.required()},
            {name: 'body', title: 'Body paragraphs', type: 'array', of: [{type: 'text'}]},
            {name: 'image', type: 'image', options: {hotspot: true}, validation: (r) => r.required()},
          ],
          preview: {select: {title: 'eyebrow', subtitle: 'title'}},
        }),
      ],
    }),

    // ─── Case-study + editorial-spread fields ─────────
    defineField({name: 'headline', title: 'At-a-glance headline', type: 'string', group: 'caseStudy'}),
    defineField({
      name: 'keyMetrics',
      title: 'Key metrics',
      type: 'array',
      group: 'caseStudy',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'value', type: 'string'},
            {name: 'label', type: 'string'},
          ],
        }),
      ],
    }),
    defineField({
      name: 'brief_block',
      title: 'Brief block',
      type: 'object',
      group: 'caseStudy',
      fields: [
        {name: 'eyebrow', type: 'string'},
        {name: 'heading', title: 'Heading (HTML)', type: 'string'},
        {name: 'body', type: 'text', rows: 4},
        {name: 'image', type: 'image', options: {hotspot: true}},
      ],
    }),
    defineField({
      name: 'answer_block',
      title: 'Answer block',
      type: 'object',
      group: 'caseStudy',
      fields: [
        {name: 'eyebrow', type: 'string'},
        {name: 'heading', title: 'Heading (HTML)', type: 'string'},
        {name: 'body', type: 'text', rows: 4},
        {name: 'image', type: 'image', options: {hotspot: true}},
      ],
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities (6-cell grid)',
      type: 'array',
      group: 'caseStudy',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'num', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'body', type: 'text', rows: 3},
            {name: 'highlight', type: 'boolean', initialValue: false},
          ],
          preview: {select: {title: 'title', subtitle: 'num'}},
        }),
      ],
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      group: 'caseStudy',
      fields: [
        {name: 'eyebrow', type: 'string'},
        {name: 'quote', type: 'text', rows: 3},
        {name: 'attribution', type: 'string'},
      ],
    }),

    // ─── Split ────────────────────────────────────────
    defineField({
      name: 'splitSummary',
      title: 'Split summary (sticky left panel)',
      type: 'text',
      rows: 3,
      group: 'split',
    }),

    // ─── Sessions ─────────────────────────────────────
    defineField({
      name: 'sessions',
      title: 'Sessions',
      type: 'array',
      group: 'sessions',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'day', type: 'string', validation: (r) => r.required()},
            {name: 'time', type: 'string', validation: (r) => r.required()},
            {name: 'title', type: 'string', validation: (r) => r.required()},
            {name: 'speaker', type: 'string'},
            {name: 'note', type: 'text', rows: 2},
            {name: 'image', type: 'image', options: {hotspot: true}},
          ],
          preview: {select: {title: 'title', subtitle: 'time'}},
        }),
      ],
    }),

    // ─── Media ────────────────────────────────────────
    defineField({name: 'galleryLabel', title: 'Gallery label', type: 'string', group: 'media'}),
    defineField({
      name: 'galleryImages',
      title: 'Gallery images',
      type: 'array',
      group: 'media',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
    defineField({name: 'videoLabel', title: 'Video label', type: 'string', group: 'media'}),
    defineField({
      name: 'videoEmbedUrl',
      title: 'Video embed URL (e.g. YouTube embed)',
      type: 'url',
      group: 'media',
    }),
    defineField({
      name: 'videoPlaceholder',
      title: 'Video placeholder image',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
    }),

    // ─── Credits + Nav ────────────────────────────────
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      group: 'credits',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'role', type: 'string', validation: (r) => r.required()},
            {name: 'name', type: 'string', validation: (r) => r.required()},
          ],
          preview: {select: {title: 'role', subtitle: 'name'}},
        }),
      ],
    }),
    defineField({name: 'watermark', title: 'Credits watermark (Anton huge)', type: 'string', group: 'credits'}),
    defineField({
      name: 'prev',
      title: 'Previous project (nav)',
      type: 'reference',
      to: [{type: 'project'}],
      group: 'credits',
    }),
    defineField({
      name: 'next',
      title: 'Next project (nav)',
      type: 'reference',
      to: [{type: 'project'}],
      group: 'credits',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'meta', media: 'heroImage'},
  },
  orderings: [
    {
      title: 'Year (descending)',
      name: 'yearDesc',
      by: [{field: 'year', direction: 'desc'}],
    },
  ],
})
