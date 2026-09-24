import type {StructureResolver} from 'sanity/structure'
import {BoltIcon} from '@sanity/icons/Bolt'
import {CheckmarkCircleIcon} from '@sanity/icons/CheckmarkCircle'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {HomeIcon} from '@sanity/icons/Home'
import {StarIcon} from '@sanity/icons/Star'
import {TagIcon} from '@sanity/icons/Tag'
import {TransferIcon} from '@sanity/icons/Transfer'

/**
 * Simple JANA CMS navigation for non-technical editors.
 * Each collection is a separate document type with its own create form.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Private Luxury Holidays CMS')
    .items([
      S.listItem()
        .title('Private Islands')
        .icon(EarthGlobeIcon)
        .child(
          S.documentTypeList('privateIsland')
            .title('Private Islands')
            .defaultOrdering([
              {field: 'displayPriority', direction: 'asc'},
              {field: 'name', direction: 'asc'},
            ]),
        ),
      S.listItem()
        .title('Private Villas')
        .icon(HomeIcon)
        .child(
          S.documentTypeList('property')
            .title('Private Villas')
            .defaultOrdering([
              {field: 'displayPriority', direction: 'asc'},
              {field: 'name', direction: 'asc'},
            ]),
        ),
      S.listItem()
        .title('Private Jets')
        .icon(BoltIcon)
        .child(
          S.documentTypeList('privateJet')
            .title('Private Jets')
            .defaultOrdering([
              {field: 'displayPriority', direction: 'asc'},
              {field: 'name', direction: 'asc'},
            ]),
        ),
      S.listItem()
        .title('Yachts')
        .icon(TransferIcon)
        .child(
          S.documentTypeList('yacht')
            .title('Yachts')
            .defaultOrdering([
              {field: 'displayPriority', direction: 'asc'},
              {field: 'name', direction: 'asc'},
            ]),
        ),
      S.listItem()
        .title('Experiences')
        .icon(StarIcon)
        .child(
          S.documentTypeList('experience')
            .title('Experiences')
            .defaultOrdering([
              {field: 'displayPriority', direction: 'asc'},
              {field: 'name', direction: 'asc'},
            ]),
        ),
      S.divider(),
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
