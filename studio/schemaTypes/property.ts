import {defineField, defineType} from 'sanity'

export const property = defineType({
  name: 'property',
  title: 'Private Villas',
  type: 'document',
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'media', title: 'Media'},
    {name: 'capacity', title: 'Capacity'},
    {name: 'pricing', title: 'Pricing'},
    {name: 'details', title: 'Details'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // —— Basics ——
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'basics',
      description: 'Residence name as shown on the website.',
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
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      group: 'basics',
      description: 'Place this residence belongs to. Country and region come from the destination.',
      to: [{type: 'destination'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property type',
      type: 'reference',
      group: 'basics',
      description: 'Villa, chalet, apartment, and so on.',
      to: [{type: 'propertyType'}],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      group: 'basics',
      description: 'Enable this to highlight the residence in featured collections.',
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

    // —— Media ——
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'media',
      description:
        'Primary image used on the residence card and property presentation. Optional until authorised imagery is uploaded.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      group: 'media',
      description: 'Additional images shown inside the property gallery. Drag to reorder.',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),

    // —— Capacity ——
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      group: 'capacity',
      description: 'Number of bedrooms.',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      group: 'capacity',
      description: 'Number of bathrooms.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'maxGuests',
      title: 'Maximum guests',
      type: 'number',
      group: 'capacity',
      description: 'Maximum number of guests the residence can sleep.',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'propertySize',
      title: 'Property size',
      type: 'number',
      group: 'capacity',
      description: 'Internal size as a number only. Choose the unit below.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'propertySizeUnit',
      title: 'Property size unit',
      type: 'string',
      group: 'capacity',
      description: 'Unit for the property size.',
      options: {
        list: [
          {title: 'm²', value: 'm²'},
          {title: 'ft²', value: 'ft²'},
        ],
        layout: 'dropdown',
      },
    }),

    // —— Pricing ——
    defineField({
      name: 'startingPrice',
      title: 'Starting price',
      type: 'number',
      group: 'pricing',
      description: 'Enter numbers only. Currency and pricing period are selected separately.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      group: 'pricing',
      description: 'Currency for the starting price.',
      options: {
        list: [
          {title: 'EUR — Euro', value: 'EUR'},
          {title: 'USD — US Dollar', value: 'USD'},
          {title: 'GBP — British Pound', value: 'GBP'},
          {title: 'AED — UAE Dirham', value: 'AED'},
          {title: 'CHF — Swiss Franc', value: 'CHF'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'pricingPeriod',
      title: 'Pricing period',
      type: 'string',
      group: 'pricing',
      description: 'How the starting price is presented on the website.',
      options: {
        list: [
          {title: 'Per Night', value: 'night'},
          {title: 'Per Week', value: 'week'},
          {title: 'Per Stay', value: 'stay'},
          // Value kept as "on request" to match the existing public site mapping.
          {title: 'On Request', value: 'on request'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'enquiryStatus',
      title: 'Enquiry status',
      type: 'string',
      group: 'pricing',
      description: 'Availability label shown for enquiries.',
      options: {
        list: [
          {title: 'Available', value: 'Available'},
          {title: 'On Request', value: 'On Request'},
          {title: 'Enquire', value: 'Enquire'},
        ],
        layout: 'dropdown',
      },
    }),

    // —— Details ——
    defineField({
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      group: 'details',
      description: 'Brief summary for cards and introductions.',
      rows: 3,
    }),
    defineField({
      name: 'fullDescription',
      title: 'Full description',
      type: 'text',
      group: 'details',
      description: 'Longer editorial description shown in the property presentation.',
      rows: 8,
    }),
    defineField({
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      group: 'details',
      description: 'Select amenities available at this residence.',
      of: [{type: 'reference', to: [{type: 'amenity'}]}],
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'details',
      description: 'Optional services (for example chef, housekeeping). Press Enter after each.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'locationDescription',
      title: 'Location description',
      type: 'text',
      group: 'details',
      description: 'Notes about the setting, access, or neighbourhood.',
      rows: 4,
    }),

    // —— SEO ——
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      description: 'Optional search title. Leave blank to use the property name.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      group: 'seo',
      description: 'Optional search description for this residence.',
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
      destinationName: 'destination.name',
      propertyTypeName: 'propertyType.name',
      bedrooms: 'bedrooms',
      featured: 'featured',
    },
    prepare({title, media, destinationName, propertyTypeName, bedrooms, featured}) {
      const parts = [
        destinationName,
        propertyTypeName,
        bedrooms != null ? `${bedrooms} Bedroom${bedrooms === 1 ? '' : 's'}` : null,
      ].filter(Boolean)

      return {
        title: featured && title ? `${title} ★` : title || 'Untitled property',
        subtitle: parts.length ? parts.join(' · ') : undefined,
        media,
      }
    },
  },
})
