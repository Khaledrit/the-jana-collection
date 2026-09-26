import {defineArrayMember, defineField, defineType} from 'sanity'

const enquiryStatusList = [
  {title: 'Available', value: 'Available'},
  {title: 'On Request', value: 'On Request'},
  {title: 'Enquire', value: 'Enquire'},
]

const sizeUnitList = [
  {title: 'm²', value: 'm²'},
  {title: 'ft²', value: 'ft²'},
]

export const luxuryHotel = defineType({
  name: 'luxuryHotel',
  title: 'Luxury Hotel',
  type: 'document',
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'media', title: 'Media'},
    {name: 'editorial', title: 'Editorial'},
    {name: 'signatureStays', title: 'Signature Stays'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'basics',
      description: 'Hotel or resort name as shown on the website.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basics',
      description: 'URL-safe identifier. Click Generate from the name.',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      group: 'basics',
      description: 'Country shown on the card and modal (for example Maldives).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'basics',
      description: 'More specific place (for example Raa Atoll or Petite Anse, Mahé).',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'basics',
      description: 'Short line shown under the location on the card.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'basics',
      description: 'Enable this to highlight the hotel in featured collections.',
      initialValue: false,
    }),
    defineField({
      name: 'displayPriority',
      title: 'Display priority',
      type: 'number',
      group: 'basics',
      description: 'Lower numbers appear first in the collection. Example: 1 appears before 2.',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'enquiryStatus',
      title: 'Enquiry status',
      type: 'string',
      group: 'basics',
      description: 'Availability label shown for enquiries.',
      options: {list: enquiryStatusList, layout: 'dropdown'},
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'media',
      description:
        'Primary image used on the hotel card and presentation. Optional until authorised imagery is uploaded.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      description: 'Additional images shown in the gallery. Drag to reorder.',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      group: 'editorial',
      description: 'Concise editorial summary.',
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full description',
      type: 'text',
      rows: 6,
      group: 'editorial',
      description: 'Main editorial copy shown in the hotel modal.',
    }),
    defineField({
      name: 'perfectFor',
      title: 'Perfect for',
      type: 'array',
      group: 'editorial',
      description: 'Guest profiles this stay suits. Press Enter after each.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'whyJanaLovesIt',
      title: 'Why JANA loves it',
      type: 'text',
      rows: 4,
      group: 'editorial',
    }),
    defineField({
      name: 'janaHighlight',
      title: 'JANA highlight',
      type: 'text',
      rows: 3,
      group: 'editorial',
    }),
    defineField({
      name: 'experienceWithJana',
      title: 'Experience with JANA',
      type: 'text',
      rows: 3,
      group: 'editorial',
      description: 'Closing enquiry copy for how JANA can curate the stay.',
    }),
    defineField({
      name: 'signatureStays',
      title: 'Signature stays',
      type: 'array',
      group: 'signatureStays',
      description:
        'Nested villa/residence options shown inside the hotel modal — not separate hotel cards.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'signatureStay',
          title: 'Signature stay',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'bedrooms',
              title: 'Bedrooms',
              type: 'number',
              validation: (Rule) => Rule.min(0).integer(),
            }),
            defineField({
              name: 'maxGuests',
              title: 'Max guests',
              type: 'number',
              validation: (Rule) => Rule.min(0).integer(),
            }),
            defineField({
              name: 'size',
              title: 'Size',
              type: 'number',
              description: 'Numeric size only. Choose the unit below.',
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: 'sizeUnit',
              title: 'Size unit',
              type: 'string',
              options: {list: sizeUnitList, layout: 'dropdown'},
            }),
            defineField({
              name: 'features',
              title: 'Features',
              type: 'array',
              of: [{type: 'string'}],
              options: {layout: 'tags'},
              description: 'Optional feature tags when stated in the source.',
            }),
          ],
          preview: {
            select: {title: 'name', bedrooms: 'bedrooms', size: 'size', sizeUnit: 'sizeUnit'},
            prepare({title, bedrooms, size, sizeUnit}) {
              const parts = [
                bedrooms != null ? `${bedrooms} bed` : null,
                size != null ? `${size}${sizeUnit ? ` ${sizeUnit}` : ''}` : null,
              ].filter(Boolean)
              return {
                title: title || 'Signature stay',
                subtitle: parts.join(' · ') || undefined,
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      location: 'location',
      country: 'country',
      media: 'heroImage',
    },
    prepare({title, location, country, media}) {
      return {
        title: title || 'Luxury hotel',
        subtitle: [location, country].filter(Boolean).join(' · ') || undefined,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display priority',
      name: 'displayPriorityAsc',
      by: [
        {field: 'displayPriority', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
})
