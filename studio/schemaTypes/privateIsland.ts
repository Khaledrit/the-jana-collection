import {defineField, defineType} from 'sanity'

const enquiryStatusList = [
  {title: 'Available', value: 'Available'},
  {title: 'On Request', value: 'On Request'},
  {title: 'Enquire', value: 'Enquire'},
]

export const privateIsland = defineType({
  name: 'privateIsland',
  title: 'Private Island',
  type: 'document',
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'media', title: 'Media'},
    {name: 'capacity', title: 'Capacity'},
    {name: 'details', title: 'Details'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'basics',
      description: 'Island or residence name as shown on the website.',
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
      description: 'Country name as shown in filters, for example Maldives or Seychelles.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locationAtoll',
      title: 'Location / Atoll',
      type: 'string',
      group: 'basics',
      description: 'Atoll, island group or more specific location when known.',
    }),
    defineField({
      name: 'parentResort',
      title: 'Parent resort / property',
      type: 'string',
      group: 'basics',
      description:
        'Resort or property brand when this entry sits within a larger resort, for example Waldorf Astoria Maldives Ithaafushi.',
    }),
    defineField({
      name: 'experienceType',
      title: 'Experience type',
      type: 'string',
      group: 'basics',
      description:
        'For example Entire Private Island, Standalone Overwater Private Residence, or Four-Bedroom Residence.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'basics',
      description: 'Enable this to highlight the island in featured collections.',
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
        'Primary image used on the private island card and presentation. Optional until licensed imagery is uploaded.',
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
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      group: 'capacity',
      description:
        'Bedroom count when a specific residence configuration is stated. Leave blank for whole-island or multi-configuration entries.',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'maxGuests',
      title: 'Maximum guests',
      type: 'number',
      group: 'capacity',
      description: 'Maximum guests when confirmed for this entry. Leave blank when unknown.',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'residenceSize',
      title: 'Residence size',
      type: 'number',
      group: 'capacity',
      description: 'Size as a number only when a specific figure is known. Choose the unit below.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'residenceSizeUnit',
      title: 'Residence size unit',
      type: 'string',
      group: 'capacity',
      options: {
        list: [
          {title: 'm²', value: 'm²'},
          {title: 'ft²', value: 'ft²'},
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      group: 'details',
      rows: 3,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full description',
      type: 'text',
      group: 'details',
      rows: 8,
    }),
    defineField({
      name: 'perfectFor',
      title: 'Perfect for',
      type: 'array',
      group: 'details',
      description: 'Traveller profiles this stay suits. Press Enter after each.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'janaHighlight',
      title: 'JANA highlight',
      type: 'text',
      group: 'details',
      rows: 3,
      description: 'Short editorial highlight shown in the presentation.',
    }),
    defineField({
      name: 'features',
      title: 'Features / services',
      type: 'array',
      group: 'details',
      description: 'Notable features or services. Press Enter after each.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
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
      group: 'seo',
      rows: 3,
    }),
  ],
  orderings: [
    {
      title: 'Display priority',
      name: 'displayPriorityAsc',
      by: [
        {field: 'displayPriority', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
    {
      title: 'Country',
      name: 'countryAsc',
      by: [
        {field: 'country', direction: 'asc'},
        {field: 'name', direction: 'asc'},
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'heroImage',
      country: 'country',
      locationAtoll: 'locationAtoll',
      parentResort: 'parentResort',
      experienceType: 'experienceType',
      featured: 'featured',
    },
    prepare({title, media, country, locationAtoll, parentResort, experienceType, featured}) {
      const place = [country, locationAtoll].filter(Boolean).join(' · ')
      const parts = [parentResort || experienceType, place].filter(Boolean)
      return {
        title: featured && title ? `${title} ★` : title || 'Untitled private island',
        subtitle: parts.length ? parts.join(' · ') : undefined,
        media,
      }
    },
  },
})
