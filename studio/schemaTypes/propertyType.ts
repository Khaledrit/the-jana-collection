import {defineField, defineType} from 'sanity'

export const propertyType = defineType({
  name: 'propertyType',
  title: 'Property Type',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
    }),
    defineField({
      name: 'displayPriority',
      title: 'Display priority',
      type: 'number',
      description: 'Lower numbers appear first.',
      validation: (Rule) => Rule.min(0).integer(),
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
      subtitle: 'displayPriority',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle:
          typeof subtitle === 'number' ? `Priority ${subtitle}` : undefined,
      }
    },
  },
})
