import {defineField, defineType} from 'sanity'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      description: 'Machine key: event | media | branding | show',
      validation: (rule) =>
        rule.required().custom((v) =>
          ['event', 'media', 'branding', 'show'].includes(v as string)
            ? true
            : 'Must be one of: event, media, branding, show',
        ),
    }),
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'number',
      title: 'Number',
      type: 'string',
      description: 'Display number, e.g. "01"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Meta items',
      description: 'Bullet list shown when the service accordion is open',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'number'}},
})
