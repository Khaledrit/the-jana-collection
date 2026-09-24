/**
 * Idempotent seed for Private Island documents (production dataset).
 *
 * Content sourced from the JANA Private Island Collection handover PDF
 * (Maldives + Seychelles). No resort images are imported.
 *
 * Ocean Sounds and The Sanctuary are seeded as residence cards under
 * Felicite Island / Six Senses Zil Pasyon — not as separate islands.
 *
 * Usage (from studio/):
 *   npm run seed:private-islands
 *
 * Safe to re-run: deterministic ids (privateIsland-<slug>), fills blank
 * fields only on existing docs, preserves heroImage/gallery, never
 * deletes unrelated docs (villas, jets, yachts, experiences).
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

type IslandSeed = {
  slug: string
  name: string
  country: string
  locationAtoll?: string
  parentResort?: string
  experienceType?: string
  bedrooms?: number
  maxGuests?: number
  residenceSize?: number
  residenceSizeUnit?: 'm²' | 'ft²'
  displayPriority: number
  featured?: boolean
  enquiryStatus: 'Available' | 'On Request' | 'Enquire'
  shortDescription: string
  fullDescription: string
  perfectFor?: string[]
  janaHighlight?: string
  features?: string[]
}

const PRIVATE_ISLANDS: IslandSeed[] = [
  {
    slug: 'ithaafushi-the-private-island',
    name: 'Ithaafushi — The Private Island',
    country: 'Maldives',
    locationAtoll: 'South Malé Atoll',
    parentResort: 'Waldorf Astoria Maldives Ithaafushi',
    experienceType: 'Entire Private Island',
    residenceSize: 32000,
    residenceSizeUnit: 'm²',
    displayPriority: 1,
    featured: true,
    enquiryStatus: 'On Request',
    shortDescription: 'Your own private island in the Maldives.',
    fullDescription:
      'Spanning approximately 32,000 square metres, Ithaafushi — The Private Island offers an extraordinary level of exclusivity for families, private groups and special celebrations. The island combines a four-bedroom residence, a three-bedroom beach villa and a two-bedroom overwater villa, allowing guests to stay together while maintaining exceptional privacy. A dedicated team supports a highly personalised stay, while private wellness, entertainment, pools and beaches create a complete island-within-an-island experience. Access is by private yacht, making arrival part of the experience itself.',
    perfectFor: ['VIP Families', 'Multi-Generational Travel', 'Private Celebrations', 'Exclusive Escapes'],
    janaHighlight: 'An exceptional choice when a private villa simply is not private enough.',
    features: [
      'Four-bedroom residence',
      'Three-bedroom beach villa',
      'Two-bedroom overwater villa',
      'Dedicated private team',
      'Private wellness and entertainment',
      'Private pools and beaches',
      'Private yacht access',
    ],
  },
  {
    slug: 'soneva-secret',
    name: 'Soneva Secret',
    country: 'Maldives',
    locationAtoll: 'Haa Dhaalu Atoll',
    experienceType: 'Remote Island',
    displayPriority: 2,
    enquiryStatus: 'On Request',
    shortDescription: 'Remote. Intimate. Almost impossibly private.',
    fullDescription:
      'Hidden in the remote Haa Dhaalu Atoll, Soneva Secret is an exceptionally intimate Maldivian retreat with just 13 villas. Its limited scale creates an atmosphere closer to a private hideaway than a conventional resort. For even greater seclusion, the Sea Lofts sit away from the island and are reached by boat, surrounded by uninterrupted ocean. Selected villas offer remarkable space, private pools and a strong sense of isolation. For the highest level of exclusivity, the resort may also be considered for full private-island use, subject to availability and arrangement.',
    perfectFor: ['Privacy Seekers', 'Families', 'Couples', 'Exclusive Groups'],
    janaHighlight: 'For travellers who genuinely want to disappear from the world.',
    features: [
      'Intimate 13-villa island',
      'Boat-access Sea Lofts',
      'Selected villas with private pools',
      'Potential full island buyout subject to availability',
    ],
  },
  {
    slug: 'the-private-reserve-gili-lankanfushi',
    name: 'The Private Reserve',
    country: 'Maldives',
    locationAtoll: 'Gili Lankanfushi',
    parentResort: 'Gili Lankanfushi Maldives',
    experienceType: 'Standalone Overwater Private Residence',
    residenceSize: 1700,
    residenceSizeUnit: 'm²',
    displayPriority: 3,
    enquiryStatus: 'On Request',
    shortDescription: 'A private residence floating in the middle of the lagoon.',
    fullDescription:
      'Standing completely separate from the main island, The Private Reserve is an extraordinary standalone overwater residence of approximately 1,700 square metres. Reached by boat, the multi-level retreat combines expansive decks, an infinity pool, private spa facilities, gym, cinema, bar and a waterslide directly into the Indian Ocean. Guests enjoy their own dedicated boat for transfers between the residence and the main island. The result feels less like a resort villa and more like a self-contained private home surrounded by lagoon, sky and ocean.',
    perfectFor: ['Families', 'Groups of Friends', 'VIP Guests', 'Special Celebrations'],
    janaHighlight:
      'The freedom of a private island while remaining completely surrounded by the ocean.',
    features: [
      'Standalone overwater residence',
      'Infinity pool and expansive decks',
      'Private spa facilities',
      'Gym, cinema and bar',
      'Waterslide into the ocean',
      'Dedicated boat transfers',
    ],
  },
  {
    slug: 'velaa-private-island',
    name: 'Velaa Private Island',
    country: 'Maldives',
    locationAtoll: 'Noonu Atoll',
    experienceType: 'Private Residences',
    bedrooms: 4,
    residenceSize: 1324,
    residenceSizeUnit: 'm²',
    displayPriority: 4,
    enquiryStatus: 'On Request',
    shortDescription: 'An island designed around privacy, space and personal freedom.',
    fullDescription:
      'Velaa Private Island offers an intimate approach to Maldivian luxury, with secluded pool villas and expansive private residences. Its four-bedroom Private Residences offer approximately 1,324 square metres of space for families and larger parties, while the Romantic Residence sits alone in the lagoon and is accessible by boat for exceptional seclusion. The island combines private living with personalised service, dining, wellness and recreation. For special groups and celebrations, exclusive island arrangements may also be possible, subject to the resort\'s terms and availability.',
    perfectFor: ['Ultra-Luxury Families', 'Couples', 'VIP Groups', 'Island Buyouts'],
    janaHighlight: 'From an ultra-private residence for two to a complete island experience.',
    features: [
      'Four-bedroom Private Residences',
      'Romantic Residence in the lagoon',
      'Personalised dining and wellness',
      'Exclusive island arrangements subject to availability',
    ],
  },
  {
    slug: 'soneva-jani-island-reserve',
    name: 'Soneva Jani — Island Reserve',
    country: 'Maldives',
    locationAtoll: 'Noonu Atoll',
    parentResort: 'Soneva Jani',
    experienceType: 'Ultra-Spacious Private Island Residence',
    bedrooms: 3,
    residenceSize: 1796,
    residenceSizeUnit: 'm²',
    displayPriority: 5,
    enquiryStatus: 'On Request',
    shortDescription: 'A private island home made for extraordinary family escapes.',
    fullDescription:
      'Within Soneva Jani, the Signature Villas and Island Reserves offer an expansive expression of privacy for families and groups. The Three-Bedroom Island Reserve with Slide offers approximately 1,796 square metres of space, hidden within tropical gardens beside the beach. Generous indoor and outdoor living areas create the feeling of a private home while retaining access to Soneva Jani\'s dining, wellness and island experiences. It is particularly well suited to multi-generational families who value space, freedom and time together.',
    perfectFor: ['Families', 'Multi-Generational Travel', 'Longer Stays', 'Private Celebrations'],
    janaHighlight: 'A remarkable private home with the experiences of a world-class island resort.',
    features: [
      'Three-Bedroom Island Reserve with Slide',
      'Beachside tropical gardens',
      'Generous indoor and outdoor living',
      'Access to Soneva Jani dining and wellness',
    ],
  },
  {
    slug: 'north-island',
    name: 'North Island',
    country: 'Seychelles',
    locationAtoll: 'North Island',
    experienceType: 'Ultra-Exclusive Private Island',
    displayPriority: 6,
    featured: true,
    enquiryStatus: 'On Request',
    shortDescription: 'An extraordinary island where privacy comes naturally.',
    fullDescription:
      'North Island is one of Seychelles\' most exclusive private-island retreats, surrounded by white-sand beaches, granite formations and lush tropical landscapes. With only 11 private villas, the island is deliberately intimate and offers an exceptional sense of space. Villa North Island occupies a particularly secluded position and is designed for guests seeking an elevated level of privacy. Days can be shaped around the guest, from private beach moments and ocean activities to wellness, nature and personalised dining.',
    perfectFor: ['Honeymoons', 'VIP Couples', 'Privacy Seekers', 'Special Celebrations'],
    janaHighlight: 'Seychelles at its most private, natural and intimate.',
    features: [
      'Intimate 11-villa private island',
      'Villa North Island for elevated privacy',
      'White-sand beaches and granite landscapes',
      'Personalised dining, wellness and nature',
    ],
  },
  {
    slug: 'felicite-island-six-senses-zil-pasyon',
    name: 'Felicite Island',
    country: 'Seychelles',
    locationAtoll: 'Felicite Island',
    parentResort: 'Six Senses Zil Pasyon',
    experienceType: 'Private Island',
    displayPriority: 7,
    enquiryStatus: 'On Request',
    shortDescription: 'A dramatic private-island escape shaped by nature.',
    fullDescription:
      'Set on the private island of Felicite, Six Senses Zil Pasyon blends dramatic granite landscapes with contemporary villas, tropical forest and secluded beaches. For the JANA Private Island Collection, two exceptional four-bedroom residences stand out for families and private groups: Ocean Sounds and The Sanctuary. Both combine private pools, expansive living spaces, panoramic ocean settings and a dedicated service team, creating a highly personalised private-island stay.',
    perfectFor: ['VIP Families', 'Private Groups', 'Celebrations', 'Wellness Travellers'],
    janaHighlight: 'Two exceptional residences offering a more private way to experience Felicite Island.',
    features: [
      'Private island setting',
      'Four-bedroom residences including Ocean Sounds and The Sanctuary',
      'Dedicated private service',
      'Granite landscapes, forest and secluded beaches',
    ],
  },
  {
    slug: 'ocean-sounds-felicite-island',
    name: 'Ocean Sounds — Four-Bedroom Residence',
    country: 'Seychelles',
    locationAtoll: 'Felicite Island',
    parentResort: 'Six Senses Zil Pasyon · Felicite Island',
    experienceType: 'Four-Bedroom Residence',
    bedrooms: 4,
    maxGuests: 10,
    residenceSize: 1416,
    residenceSizeUnit: 'm²',
    displayPriority: 8,
    enquiryStatus: 'On Request',
    shortDescription: 'A spectacular private residence at the pinnacle of Felicite Island.',
    fullDescription:
      'Perched high above the island, Ocean Sounds is an extraordinary 1,416 sqm four-bedroom residence with panoramic ocean views. Designed across two levels, it combines four ensuite bedrooms with expansive indoor and outdoor living areas, a gourmet kitchen, private wine cellar and bar, and a dramatic pool terrace. The upper-level master suite has its own private plunge pool, while the main terrace features a large infinity pool. A dedicated GEM, private chef, service host and housekeeper support a highly personalised stay. This residence belongs to Felicite Island / Six Senses Zil Pasyon and is presented as a featured private residence within that island resort — not as a separate private island.',
    perfectFor: ['VIP Families', 'Private Groups', 'Celebrations'],
    janaHighlight:
      'Architecture, art and panoramic ocean views in one of Felicite Island\'s most impressive private residences.',
    features: [
      'Four ensuite bedrooms',
      'Gourmet kitchen, wine cellar and bar',
      'Master suite plunge pool',
      'Main terrace infinity pool',
      'Dedicated GEM, private chef, service host and housekeeper',
    ],
  },
  {
    slug: 'the-sanctuary-felicite-island',
    name: 'The Sanctuary — Four-Bedroom Residence',
    country: 'Seychelles',
    locationAtoll: 'Felicite Island',
    parentResort: 'Six Senses Zil Pasyon · Felicite Island',
    experienceType: 'Four-Bedroom Residence',
    bedrooms: 4,
    maxGuests: 10,
    residenceSize: 979,
    residenceSizeUnit: 'm²',
    displayPriority: 9,
    enquiryStatus: 'On Request',
    shortDescription: 'A secluded sanctuary hidden within the wild beauty of Felicite Island.',
    fullDescription:
      'Set high among dramatic granite boulders and tropical vegetation, The Sanctuary is a 979 sqm four-bedroom residence designed for privacy and connection with nature. Four ensuite bedrooms are arranged across two levels, with the master suite occupying the upper floor and featuring floor-to-ceiling glass, exceptional ocean views and its own private pool. Expansive living spaces open onto a terrace and larger infinity-edge pool, while a gourmet kitchen supports personalised private dining. Guests are cared for by a dedicated GEM, private chef, service host and housekeeper. This residence belongs to Felicite Island / Six Senses Zil Pasyon and is presented as a featured private residence within that island resort — not as a separate private island.',
    perfectFor: ['Families', 'VIP Groups', 'Privacy Seekers'],
    janaHighlight:
      'A private residence almost hidden within the granite landscape, ideal for families and VIP groups seeking seclusion.',
    features: [
      'Four ensuite bedrooms',
      'Upper-floor master suite with private pool',
      'Infinity-edge pool terrace',
      'Gourmet kitchen for private dining',
      'Dedicated GEM, private chef, service host and housekeeper',
    ],
  },
  {
    slug: 'fregate-island-private',
    name: 'Fregate Island Private',
    country: 'Seychelles',
    locationAtoll: 'Fregate Island',
    experienceType: 'Private Island Sanctuary',
    displayPriority: 10,
    enquiryStatus: 'Enquire',
    shortDescription: 'One island. Extraordinary nature. Exceptional privacy.',
    fullDescription:
      'Fregate Island is one of Seychelles\' best-known private-island sanctuaries, celebrated for pristine beaches, tropical forest and conservation. Its private-residence concept has historically focused on generous space, seclusion and a strong connection to nature rather than a conventional hotel experience. The island\'s appeal lies in freedom: secluded beaches, personalised dining, wildlife encounters and a slower rhythm of travel. Current operating status, reopening dates and accommodation details should be confirmed before publishing or selling — these details are not stated as current fact in this collection.',
    perfectFor: ['Ultra-Private Escapes', 'Families', 'Couples', 'Nature & Conservation'],
    janaHighlight: 'Privacy measured in beaches, forests and an entire island around you.',
    features: [
      'Private-island sanctuary setting',
      'Nature and conservation focus',
      'Secluded beaches and personalised dining',
      'Operating status and accommodation details require current confirmation',
    ],
  },
  {
    slug: 'desroches-island',
    name: 'Desroches Island',
    country: 'Seychelles',
    locationAtoll: 'Desroches Island',
    parentResort: 'Four Seasons Resort Seychelles at Desroches Island',
    experienceType: 'Remote Island',
    displayPriority: 11,
    enquiryStatus: 'On Request',
    shortDescription: 'Your own piece of paradise on a remote coral island.',
    fullDescription:
      'Far from Mahé, Desroches Island offers a remote coral-island experience surrounded by long white-sand beaches and clear Indian Ocean waters. Four Seasons brings its signature service to an island where guests can explore by bicycle, discover quiet stretches of beach and enjoy a genuine sense of escape. Larger private villas and residences are especially appealing for families and groups seeking pools, generous living areas and direct access to the island\'s natural surroundings. It is particularly well suited to longer and multi-generational stays.',
    perfectFor: ['Families', 'Multi-Generational Travel', 'Longer Stays', 'Beach Lovers'],
    janaHighlight: 'A private-island lifestyle with the comfort and service of Four Seasons.',
    features: [
      'Remote coral-island setting',
      'Private pool villas and residences',
      'Beach exploration by bicycle',
      'Four Seasons service',
    ],
  },
  {
    slug: 'platte-island',
    name: 'Platte Island',
    country: 'Seychelles',
    locationAtoll: 'Platte Island',
    parentResort: 'Waldorf Astoria Seychelles Platte Island',
    experienceType: 'Remote Island',
    displayPriority: 12,
    enquiryStatus: 'On Request',
    shortDescription: 'A new generation of remote island luxury in Seychelles.',
    fullDescription:
      'Set on remote Platte Island, Waldorf Astoria Seychelles Platte Island offers an all-villa escape surrounded by the Indian Ocean. Spacious villas with private pools create a strong sense of privacy for couples and families, while larger multi-bedroom options provide a more residential experience for private groups. The island experience combines contemporary luxury with nature, marine discovery, wellness and personalised dining. Its remote setting makes the journey itself part of the feeling of escape.',
    perfectFor: ['Couples', 'Families', 'VIP Travellers', 'Ocean & Nature Lovers'],
    janaHighlight: 'Contemporary private-island luxury in a remarkable Indian Ocean setting.',
    features: [
      'All-villa remote island',
      'Private pool villas',
      'Multi-bedroom villa options',
      'Marine discovery, wellness and personalised dining',
    ],
  },
]

function deterministicId(slug: string) {
  return `privateIsland-${slug}`
}

type ExistingIsland = {
  _id: string
  name?: string
  slug?: string
  country?: string
  locationAtoll?: string
  parentResort?: string
  experienceType?: string
  bedrooms?: number
  maxGuests?: number
  residenceSize?: number
  residenceSizeUnit?: string
  displayPriority?: number
  featured?: boolean
  enquiryStatus?: string
  shortDescription?: string
  fullDescription?: string
  perfectFor?: string[]
  janaHighlight?: string
  features?: string[]
  heroImage?: unknown
  gallery?: unknown
}

function isBlank(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  return false
}

async function main() {
  const existing = (await client.fetch(
    `*[_type == "privateIsland"]{
      _id,
      name,
      "slug": slug.current,
      country,
      locationAtoll,
      parentResort,
      experienceType,
      bedrooms,
      maxGuests,
      residenceSize,
      residenceSizeUnit,
      displayPriority,
      featured,
      enquiryStatus,
      shortDescription,
      fullDescription,
      perfectFor,
      janaHighlight,
      features,
      heroImage,
      gallery
    }`,
  )) as ExistingIsland[]

  const bySlug = new Map<string, ExistingIsland[]>()
  for (const doc of existing) {
    if (!doc.slug) continue
    const list = bySlug.get(doc.slug) || []
    list.push(doc)
    bySlug.set(doc.slug, list)
  }

  const created: string[] = []
  const updated: string[] = []
  const unchanged: string[] = []
  const duplicateWarnings: string[] = []
  const missingImages: string[] = []

  for (const item of PRIVATE_ISLANDS) {
    const id = deterministicId(item.slug)
    const matches = bySlug.get(item.slug) || []

    if (matches.length > 1) {
      duplicateWarnings.push(
        `slug "${item.slug}" has ${matches.length} documents: ${matches.map((m) => m._id).join(', ')}`,
      )
    }

    const preferred = matches.find((m) => m._id === id) || matches[0] || null

    if (preferred) {
      const patch: Record<string, unknown> = {}
      if (isBlank(preferred.name)) patch.name = item.name
      if (isBlank(preferred.country)) patch.country = item.country
      if (isBlank(preferred.locationAtoll) && item.locationAtoll) patch.locationAtoll = item.locationAtoll
      if (isBlank(preferred.parentResort) && item.parentResort) patch.parentResort = item.parentResort
      if (isBlank(preferred.experienceType) && item.experienceType) {
        patch.experienceType = item.experienceType
      }
      if (isBlank(preferred.bedrooms) && item.bedrooms != null) patch.bedrooms = item.bedrooms
      if (isBlank(preferred.maxGuests) && item.maxGuests != null) patch.maxGuests = item.maxGuests
      if (isBlank(preferred.residenceSize) && item.residenceSize != null) {
        patch.residenceSize = item.residenceSize
      }
      if (isBlank(preferred.residenceSizeUnit) && item.residenceSizeUnit) {
        patch.residenceSizeUnit = item.residenceSizeUnit
      }
      if (isBlank(preferred.displayPriority)) patch.displayPriority = item.displayPriority
      if (isBlank(preferred.featured) && item.featured != null) patch.featured = item.featured
      if (isBlank(preferred.enquiryStatus)) patch.enquiryStatus = item.enquiryStatus
      if (isBlank(preferred.shortDescription)) patch.shortDescription = item.shortDescription
      if (isBlank(preferred.fullDescription)) patch.fullDescription = item.fullDescription
      if (isBlank(preferred.perfectFor) && item.perfectFor) patch.perfectFor = item.perfectFor
      if (isBlank(preferred.janaHighlight) && item.janaHighlight) {
        patch.janaHighlight = item.janaHighlight
      }
      if (isBlank(preferred.features) && item.features) patch.features = item.features
      if (!preferred.slug) patch.slug = {_type: 'slug', current: item.slug}

      if (Object.keys(patch).length) {
        await client.patch(preferred._id).set(patch).commit()
        updated.push(`${item.name} (${preferred._id})`)
      } else {
        unchanged.push(`${item.name} (${preferred._id})`)
      }
      if (isBlank(preferred.heroImage)) missingImages.push(item.name)
      continue
    }

    const doc: Record<string, unknown> = {
      _id: id,
      _type: 'privateIsland',
      name: item.name,
      slug: {_type: 'slug', current: item.slug},
      country: item.country,
      featured: Boolean(item.featured),
      displayPriority: item.displayPriority,
      enquiryStatus: item.enquiryStatus,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
      seoTitle: `${item.name} | Private Luxury Holidays`,
      seoDescription: item.shortDescription,
    }
    if (item.locationAtoll) doc.locationAtoll = item.locationAtoll
    if (item.parentResort) doc.parentResort = item.parentResort
    if (item.experienceType) doc.experienceType = item.experienceType
    if (item.bedrooms != null) doc.bedrooms = item.bedrooms
    if (item.maxGuests != null) doc.maxGuests = item.maxGuests
    if (item.residenceSize != null) doc.residenceSize = item.residenceSize
    if (item.residenceSizeUnit) doc.residenceSizeUnit = item.residenceSizeUnit
    if (item.perfectFor) doc.perfectFor = item.perfectFor
    if (item.janaHighlight) doc.janaHighlight = item.janaHighlight
    if (item.features) doc.features = item.features

    await client.createOrReplace(doc)
    created.push(`${item.name} (${id})`)
    missingImages.push(item.name)
  }

  const after = (await client.fetch(`count(*[_type == "privateIsland"])`)) as number
  const seeded = (await client.fetch(
    `count(*[_type == "privateIsland" && string::startsWith(_id, "privateIsland-")])`,
  )) as number

  console.log('\n=== Private Island seed summary ===')
  console.log(`Created:   ${created.length}`)
  created.forEach((line) => console.log(`  + ${line}`))
  console.log(`Updated:   ${updated.length}`)
  updated.forEach((line) => console.log(`  ~ ${line}`))
  console.log(`Unchanged: ${unchanged.length}`)
  unchanged.forEach((line) => console.log(`  = ${line}`))
  if (duplicateWarnings.length) {
    console.log('Duplicate slugs:')
    duplicateWarnings.forEach((line) => console.log(`  ! ${line}`))
  }
  console.log(
    `\nPrivate Island documents in dataset: ${after} (seeded privateIsland-* ids: ${seeded})`,
  )
  console.log(`\nIslands needing licensed imagery (${missingImages.length}):`)
  missingImages.forEach((name) => console.log(`  - ${name}`))
  console.log('\nNote: heroImage left empty deliberately. Upload licensed photos in Studio.')
  console.log(
    'Ocean Sounds and The Sanctuary are residence cards under Felicite Island / Six Senses Zil Pasyon.',
  )
  console.log(
    'Fregate Island Private: operating status and accommodation details require current verification.',
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
