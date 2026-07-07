import {defineField, defineType} from 'sanity'

/** Singleton doc for global site settings (title, contact, socials). */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Site title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'tagline', title: 'Tagline', type: 'string'}),
    defineField({name: 'description', title: 'Meta description', type: 'text', rows: 2}),
    defineField({name: 'contactEmail', title: 'Contact email', type: 'string'}),
    defineField({name: 'contactPhone', title: 'Contact phone', type: 'string'}),
    defineField({name: 'address', title: 'Address', type: 'string'}),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', type: 'string'},
            {name: 'url', type: 'url'},
          ],
        },
      ],
    }),
  ],
})
