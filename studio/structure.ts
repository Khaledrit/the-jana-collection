import type {StructureResolver} from 'sanity/structure'
import {CheckmarkCircleIcon} from '@sanity/icons/CheckmarkCircle'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {HomeIcon} from '@sanity/icons/Home'
import {TagIcon} from '@sanity/icons/Tag'

/**
 * Simple JANA CMS navigation for non-technical editors.
 * Schema _type names are unchanged; only sidebar labels/order differ.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('JANA Luxury Collection CMS')
    .items([
      S.listItem()
        .title('Properties')
        .icon(HomeIcon)
        .child(
          S.documentTypeList('property')
            .title('Properties')
            .defaultOrdering([
              {field: 'displayPriority', direction: 'asc'},
              {field: 'name', direction: 'asc'},
            ]),
        ),
      S.listItem()
        .title('Destinations')
        .icon(EarthGlobeIcon)
        .child(S.documentTypeList('destination').title('Destinations')),
      S.listItem()
        .title('Amenities')
        .icon(CheckmarkCircleIcon)
        .child(
          S.documentTypeList('amenity')
            .title('Amenities')
            .defaultOrdering([
              {field: 'displayPriority', direction: 'asc'},
              {field: 'name', direction: 'asc'},
            ]),
        ),
      S.listItem()
        .title('Property Types')
        .icon(TagIcon)
        .child(S.documentTypeList('propertyType').title('Property Types')),
    ])
