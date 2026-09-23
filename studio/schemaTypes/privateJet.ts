import {defineField, defineType} from 'sanity'

const enquiryStatusList = [
  {title: 'Available', value: 'Available'},
  {title: 'On Request', value: 'On Request'},
  {title: 'Enquire', value: 'Enquire'},
]

export const privateJet = defineType({
  name: 'privateJet',
  title: 'Private Jet',
  type: 'document',
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'media', title: 'Media'},
    {name: 'aircraft', title: 'Aircraft'},
    {name: 'details', title: 'Details'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'basics',
      description: 'Aircraft name as shown on the website.',
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
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'basics',
      description: 'Enable this to highlight the jet in featured collections.',
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
        'Primary image used on the jet card and presentation. Optional until licensed imagery is uploaded.',
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
      name: 'aircraftType',
      title: 'Aircraft type',
      type: 'string',
      group: 'aircraft',
      description: 'For example Light Jet, Midsize, Ultra Long Range.',
    }),
    defineField({
      name: 'manufacturer',
      title: 'Manufacturer',
      type: 'string',
      group: 'aircraft',
    }),
    defineField({
      name: 'passengerCapacity',
      title: 'Passenger capacity',
      type: 'number',
      group: 'aircraft',
      description: 'Typical passenger capacity.',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'range',
      title: 'Range',
      type: 'number',
      group: 'aircraft',
      description: 'Range as a number only. Choose the unit below.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'rangeUnit',
      title: 'Range unit',
      type: 'string',
      group: 'aircraft',
      options: {
        list: [
          {title: 'nm', value: 'nm'},
          {title: 'km', value: 'km'},
          {title: 'mi', value: 'mi'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'homeBase',
      title: 'Home base / location',
      type: 'string',
      group: 'aircraft',
      description: 'Primary base or typical operating region.',
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
      name: 'features',
      title: 'Features',
      type: 'array',
      group: 'details',
      description: 'Cabin and aircraft features. Press Enter after each.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'details',
      description: 'Optional services. Press Enter after each.',
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
  ],
  preview: {
    select: {
      title: 'name',
      media: 'heroImage',
      aircraftType: 'aircraftType',
      passengers: 'passengerCapacity',
      featured: 'featured',
    },
    prepare({title, media, aircraftType, passengers, featured}) {
      const parts = [
        aircraftType,
        passengers != null ? `${passengers} Passengers` : null,
      ].filter(Boolean)
      return {
        title: featured && title ? `${title} ★` : title || 'Untitled jet',
        subtitle: parts.length ? parts.join(' · ') : undefined,
        media,
      }
    },
  },
})
