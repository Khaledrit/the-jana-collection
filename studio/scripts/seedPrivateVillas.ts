/**
 * Idempotent seed for Private Villas (property documents) from the JANA PDF
 * "Private Villas & Residences — Known Properties Only".
 *
 * Also ensures required Destination / Property Type / Amenity references exist.
 * Does not delete unrelated properties (e.g. Chalet Blanchot).
 * Leaves heroImage / gallery empty until authorised imagery is uploaded.
 *
 * Usage (from studio/):
 *   npm run seed:private-villas
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function isBlank(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  return false
}

type DestinationSeed = {
  slug: string
  name: string
  country: string
  region: string
  displayPriority: number
  shortDescription: string
}

type PropertySeed = {
  slug: string
  name: string
  destinationSlug: string
  propertyTypeSlug: string
  displayPriority: number
  enquiryStatus: 'Available' | 'On Request' | 'Enquire'
  featured?: boolean
  bedrooms?: number
  bathrooms?: number
  maxGuests?: number
  propertySize?: number
  propertySizeUnit?: 'm²' | 'ft²'
  pricingPeriod: 'night' | 'week' | 'stay' | 'on request'
  shortDescription: string
  fullDescription: string
  locationDescription?: string
  amenitySlugs?: string[]
  services?: string[]
  seoTitle?: string
  seoDescription?: string
  needsReconfirmation?: boolean
}

const DESTINATIONS: DestinationSeed[] = [
  {
    slug: 'courchevel',
    name: 'Courchevel',
    country: 'France',
    region: 'French Alps',
    displayPriority: 10,
    shortDescription: 'Courchevel 1850 and the surrounding Alpine resorts of the French Alps.',
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    displayPriority: 20,
    shortDescription: 'Dubai — private residences, resort villas and coastal retreats.',
  },
  {
    slug: 'porto-heli',
    name: 'Porto Heli',
    country: 'Greece',
    region: 'Peloponnese',
    displayPriority: 30,
    shortDescription: 'Porto Heli on the Greek Peloponnese, overlooking the Aegean.',
  },
  {
    slug: 'marrakech',
    name: 'Marrakech',
    country: 'Morocco',
    region: 'Morocco',
    displayPriority: 40,
    shortDescription: 'Marrakech and the surrounding palm and olive landscapes of Morocco.',
  },
]

const PROPERTY_TYPES: {slug: string; name: string; displayPriority: number}[] = [
  {slug: 'chalet', name: 'Chalet', displayPriority: 1},
  {slug: 'villa', name: 'Villa', displayPriority: 2},
  {slug: 'residence', name: 'Residence', displayPriority: 3},
  {slug: 'estate', name: 'Estate', displayPriority: 4},
]

/** Amenities referenced by the PDF-backed villas (subset of the full amenity catalogue). */
const AMENITIES_NEEDED: {slug: string; name: string; displayPriority: number}[] = [
  {slug: 'private-pool', name: 'Private Pool', displayPriority: 1},
  {slug: 'indoor-pool', name: 'Indoor Pool', displayPriority: 2},
  {slug: 'spa', name: 'Spa', displayPriority: 7},
  {slug: 'gym', name: 'Gym', displayPriority: 8},
  {slug: 'hammam', name: 'Hammam', displayPriority: 6},
  {slug: 'cinema-room', name: 'Cinema Room', displayPriority: 9},
  {slug: 'games-room', name: 'Games Room', displayPriority: 10},
  {slug: 'mountain-view', name: 'Mountain View', displayPriority: 17},
  {slug: 'garden', name: 'Garden', displayPriority: 19},
  {slug: 'sea-view', name: 'Sea View', displayPriority: 16},
]

const PROPERTIES: PropertySeed[] = [
  {
    slug: 'chalet-ormello',
    name: 'Les Airelles — Chalet Ormello',
    destinationSlug: 'courchevel',
    propertyTypeSlug: 'chalet',
    displayPriority: 1,
    enquiryStatus: 'On Request',
    featured: true,
    bedrooms: 9,
    maxGuests: 15,
    propertySize: 1000,
    propertySizeUnit: 'm²',
    pricingPeriod: 'on request',
    shortDescription:
      'A spectacular private chalet just steps from the slopes and Les Airelles Palace, combining the privacy of an Alpine residence with full Palace-level service.',
    fullDescription:
      'Your Private Palace in the French Alps. Chalet Ormello offers approximately 1,000 sqm across five floors, with two master suites and seven additional rooms, accommodating up to 15 guests. The chalet includes an indoor pool, private spa, fitness room, hammam, treatment room, cinema, games room, private bar and professional kitchen. A dedicated chalet manager, chef, butler team, housekeeping, concierge, valet skiers and resort transfers create a fully serviced private-home experience. For guests who want Courchevel 1850 to feel like their own private Alpine palace.',
    locationDescription: 'Courchevel 1850, French Alps — just steps from the slopes and Les Airelles Palace.',
    amenitySlugs: ['indoor-pool', 'spa', 'gym', 'hammam', 'cinema-room', 'games-room'],
    services: [
      'Chalet manager',
      'Private Chef',
      'Butler',
      'Housekeeping',
      'Concierge',
      'Valet skiers',
      'Resort transfers',
    ],
    seoTitle: 'Chalet Ormello, Courchevel 1850 | Private Luxury Holidays',
    seoDescription:
      'Enquire about Chalet Ormello in Courchevel 1850 — a private Alpine chalet with Palace-level service, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'les-chalets-des-airelles',
    name: 'Les Chalets des Airelles',
    destinationSlug: 'courchevel',
    propertyTypeSlug: 'chalet',
    displayPriority: 2,
    enquiryStatus: 'On Request',
    featured: true,
    // Bedroom count intentionally blank — PDF states 19 keys / five suites, not a single bedroom figure.
    pricingPeriod: 'on request',
    shortDescription:
      'A private complex of three luxury chalets near Les Airelles Palace, designed for families and groups who want exceptional privacy without giving up the services of a Palace hotel.',
    fullDescription:
      'Three Chalets. One Private Alpine World. The three chalets offer 19 keys including five suites and can be linked internally, allowing guests to move between the chalets without going outside. Facilities include an indoor pool, wellness area, cinema, children’s playroom and panoramic mountain views. When fully privatised, the experience includes a dedicated hotel team, tailored meals, chauffeur transfers within Courchevel 1850 and access to the wider Airelles dining and activity programme. A rare solution for very large VIP families who want to stay together in Courchevel.',
    locationDescription: 'Courchevel 1850, French Alps — near Les Airelles Palace.',
    amenitySlugs: ['indoor-pool', 'spa', 'cinema-room', 'mountain-view'],
    services: [
      'Dedicated hotel team',
      'Private Chef',
      'Tailored meals',
      'Chauffeur',
      'Concierge',
    ],
    seoTitle: 'Les Chalets des Airelles, Courchevel 1850 | Private Luxury Holidays',
    seoDescription:
      'Enquire about Les Chalets des Airelles in Courchevel 1850 — three linked private chalets with Palace services, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'bvlgari-villa-dubai',
    name: 'The Bvlgari Villa — Bvlgari Resort Dubai',
    destinationSlug: 'dubai',
    propertyTypeSlug: 'villa',
    displayPriority: 3,
    enquiryStatus: 'On Request',
    featured: true,
    // Specs kept conservative — PDF requires reconfirmation of current villa specifications.
    pricingPeriod: 'on request',
    needsReconfirmation: true,
    shortDescription:
      'A highly private resort villa on Jumeira Bay Island, designed for travellers who want a discreet Dubai residence with the services, dining and lifestyle of Bvlgari Resort Dubai.',
    fullDescription:
      'Your Private Address on Jumeira Bay. The Bvlgari Villa is a flagship private-villa experience with expansive indoor-outdoor living, private pool, garden and exceptional privacy within the resort setting. JANA can layer the stay with private chauffeur service, yacht charter, private dining, shopping assistance, helicopter experiences and VIP airport handling. Dubai luxury with the feeling of a private home rather than a hotel stay. Current villa specifications should be reconfirmed with the property before any proposal is finalised.',
    locationDescription: 'Jumeira Bay Island, Dubai, United Arab Emirates.',
    amenitySlugs: ['private-pool', 'garden'],
    services: [
      'Concierge',
      'Chauffeur',
      'Private dining',
      'Yacht charter coordination',
      'VIP airport handling',
    ],
    seoTitle: 'The Bvlgari Villa, Dubai | Private Luxury Holidays',
    seoDescription:
      'Enquire about The Bvlgari Villa at Bvlgari Resort Dubai — a private resort residence on Jumeira Bay, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'one-and-only-royal-mirage-private-villa',
    name: 'One&Only Royal Mirage — Private Villa',
    destinationSlug: 'dubai',
    propertyTypeSlug: 'villa',
    displayPriority: 4,
    enquiryStatus: 'On Request',
    featured: true,
    // Bedroom/capacity blank — PDF does not state exact figures; reconfirm before publication.
    pricingPeriod: 'on request',
    needsReconfirmation: true,
    shortDescription:
      'A refined beachfront villa experience combining the privacy of a residence with the gardens, beach and service of One&Only Royal Mirage.',
    fullDescription:
      'A Private Arabian Retreat by the Sea. A secluded multi-bedroom villa with private pool, garden and dedicated service, suited to guests who value privacy while remaining close to Dubai Marina, Palm Jumeirah and the city. The villa can become the base for a fully curated Dubai itinerary including dining, yacht charter, desert experiences, chauffeur service and private city access. A softer, more residential side of Dubai luxury, directly by the sea. Current villa specifications should be reconfirmed with the property before any proposal is finalised.',
    locationDescription: 'One&Only Royal Mirage, Dubai — beachfront, near Dubai Marina and Palm Jumeirah.',
    amenitySlugs: ['private-pool', 'garden', 'beach-access'],
    services: [
      'Dedicated villa service',
      'Housekeeping',
      'Concierge',
      'Chauffeur',
      'Yacht charter coordination',
    ],
    seoTitle: 'One&Only Royal Mirage Private Villa, Dubai | Private Luxury Holidays',
    seoDescription:
      'Enquire about a private beachfront villa at One&Only Royal Mirage, Dubai, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'amanzoe-private-villas',
    name: 'Amanzoe Private Villas',
    destinationSlug: 'porto-heli',
    propertyTypeSlug: 'villa',
    displayPriority: 5,
    enquiryStatus: 'On Request',
    featured: true,
    // One collection card for the Amanzoe villa programme — options from 1–9 bedrooms.
    // Signature options (Villa 20; Six-Bedroom Villa) described editorially, not as separate cards.
    pricingPeriod: 'on request',
    shortDescription:
      'Surrounded by olive groves and overlooking the Aegean, Amanzoe offers private villas ranging from one to nine bedrooms, each designed as a secluded Mediterranean home.',
    fullDescription:
      'Your Private Acropolis Above the Aegean. Amanzoe’s private villas range from one to nine bedrooms. Signature options include Villa 20 — the collection’s extraordinary nine-bedroom villa arranged across six levels, with 11 swimming pools, a private spa and panoramic Aegean views — and the Six-Bedroom Villa, a substantial private residence with generous indoor-outdoor living, study, gym and a 24-metre private swimming pool. Every Amanzoe villa includes a private pool and is served by a discreet team including a private chef and Villa Host. Guests also have access to Amanzoe, its spa and Beach Club. For guests who want the scale of a private estate with the calm, design and service language of Aman.',
    locationDescription: 'Porto Heli, Greece — olive groves overlooking the Aegean.',
    amenitySlugs: ['private-pool', 'spa', 'gym', 'sea-view'],
    services: [
      'Private Chef',
      'Villa Host',
      'Housekeeping',
      'Concierge',
      'Spa access',
      'Beach Club access',
    ],
    seoTitle: 'Amanzoe Private Villas, Porto Heli | Private Luxury Holidays',
    seoDescription:
      'Enquire about Amanzoe private villas in Porto Heli, Greece — from intimate residences to Villa 20, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'amanjena-private-villas',
    name: 'Amanjena Private Villas',
    destinationSlug: 'marrakech',
    propertyTypeSlug: 'villa',
    displayPriority: 6,
    enquiryStatus: 'On Request',
    featured: true,
    // Range of three- to six-bedroom villas — no single forced bedroom count on the main card.
    pricingPeriod: 'on request',
    shortDescription:
      'Set among olive groves and palms just outside Marrakech, Amanjena offers an elegant private-villa environment inspired by Moorish architecture and the calm of an Aman retreat.',
    fullDescription:
      'Your Private Moroccan Sanctuary. Amanjena’s private residences range from three to six bedrooms and include private gardens, swimming pools and staff accommodation, supporting a highly serviced residential stay. JANA can combine the villa with private dining, Atlas Mountains journeys, desert experiences, golf, spa, private guides and chauffeur-driven Marrakech itineraries. A private palace-style base for experiencing Marrakech at your own pace.',
    locationDescription: 'Just outside Marrakech, Morocco — among olive groves and palms.',
    amenitySlugs: ['private-pool', 'garden', 'spa'],
    services: [
      'Staff accommodation',
      'Private Chef',
      'Housekeeping',
      'Concierge',
      'Chauffeur',
      'Private guides',
    ],
    seoTitle: 'Amanjena Private Villas, Marrakech | Private Luxury Holidays',
    seoDescription:
      'Enquire about Amanjena private villas near Marrakech — three- to six-bedroom residences arranged through Private Luxury Holidays.',
  },
]

async function ensureDestination(seed: DestinationSeed): Promise<string> {
  const id = `destination-${seed.slug}`
  const existing = (await client.fetch(
    `*[_type == "destination" && (slug.current == $slug || _id == $id)][0]{_id, name, country, region, displayPriority, shortDescription, "slug": slug.current}`,
    {slug: seed.slug, id},
  )) as {_id: string; name?: string; country?: string; region?: string; displayPriority?: number; shortDescription?: string; slug?: string} | null

  // Also match Courchevel if already stored as courchevel-1
  const byName =
    existing ||
    ((await client.fetch(
      `*[_type == "destination" && lower(name) == $name][0]{_id, name, country, region, displayPriority, shortDescription, "slug": slug.current}`,
      {name: seed.name.toLowerCase()},
    )) as typeof existing)

  if (byName) {
    const patch: Record<string, unknown> = {}
    if (isBlank(byName.country)) patch.country = seed.country
    if (isBlank(byName.region)) patch.region = seed.region
    if (isBlank(byName.displayPriority)) patch.displayPriority = seed.displayPriority
    if (isBlank(byName.shortDescription)) patch.shortDescription = seed.shortDescription
    if (Object.keys(patch).length) {
      await client.patch(byName._id).set(patch).commit()
      console.log(`  ~ destination ${seed.name} (${byName._id})`)
    } else {
      console.log(`  = destination ${seed.name} (${byName._id})`)
    }
    return byName._id
  }

  await client.createOrReplace({
    _id: id,
    _type: 'destination',
    name: seed.name,
    slug: {_type: 'slug', current: seed.slug},
    country: seed.country,
    region: seed.region,
    displayPriority: seed.displayPriority,
    shortDescription: seed.shortDescription,
  })
  console.log(`  + destination ${seed.name} (${id})`)
  return id
}

async function ensurePropertyType(seed: {
  slug: string
  name: string
  displayPriority: number
}): Promise<string> {
  const id = `propertyType-${seed.slug}`
  const existing = (await client.fetch(
    `*[_type == "propertyType" && (slug.current == $slug || slug.current == $slugAlt || lower(name) == $name)][0]{_id, name, displayPriority, "slug": slug.current}`,
    {
      slug: seed.slug,
      slugAlt: `${seed.slug}-1`,
      name: seed.name.toLowerCase(),
    },
  )) as {_id: string; name?: string; displayPriority?: number; slug?: string} | null

  if (existing) {
    console.log(`  = propertyType ${seed.name} (${existing._id})`)
    return existing._id
  }

  await client.createOrReplace({
    _id: id,
    _type: 'propertyType',
    name: seed.name,
    slug: {_type: 'slug', current: seed.slug},
    displayPriority: seed.displayPriority,
  })
  console.log(`  + propertyType ${seed.name} (${id})`)
  return id
}

async function ensureAmenity(seed: {
  slug: string
  name: string
  displayPriority: number
}): Promise<string> {
  const id = `amenity.${seed.slug}`
  const existing = (await client.fetch(
    `*[_type == "amenity" && (slug.current == $slug || _id == $id || lower(name) == $name)][0]{_id, name, displayPriority, "slug": slug.current}`,
    {slug: seed.slug, id, name: seed.name.toLowerCase()},
  )) as {_id: string; name?: string; displayPriority?: number; slug?: string} | null

  if (existing) {
    const patch: Record<string, unknown> = {}
    if (isBlank(existing.displayPriority)) patch.displayPriority = seed.displayPriority
    if (!existing.slug) patch.slug = {_type: 'slug', current: seed.slug}
    if (Object.keys(patch).length) {
      await client.patch(existing._id).set(patch).commit()
      console.log(`  ~ amenity ${seed.name} (${existing._id})`)
    } else {
      console.log(`  = amenity ${seed.name} (${existing._id})`)
    }
    return existing._id
  }

  await client.createOrReplace({
    _id: id,
    _type: 'amenity',
    name: seed.name,
    slug: {_type: 'slug', current: seed.slug},
    displayPriority: seed.displayPriority,
  })
  console.log(`  + amenity ${seed.name} (${id})`)
  return id
}

async function ensureExtraAmenityBeachAccess(): Promise<string> {
  return ensureAmenity({
    slug: 'beach-access',
    name: 'Beach Access',
    displayPriority: 14,
  })
}

async function main() {
  console.log('\n=== Ensuring destinations ===')
  const destinationIds = new Map<string, string>()
  for (const dest of DESTINATIONS) {
    destinationIds.set(dest.slug, await ensureDestination(dest))
  }

  console.log('\n=== Ensuring property types ===')
  const propertyTypeIds = new Map<string, string>()
  for (const type of PROPERTY_TYPES) {
    propertyTypeIds.set(type.slug, await ensurePropertyType(type))
  }

  console.log('\n=== Ensuring amenities ===')
  const amenityIds = new Map<string, string>()
  for (const amenity of AMENITIES_NEEDED) {
    amenityIds.set(amenity.slug, await ensureAmenity(amenity))
  }
  amenityIds.set('beach-access', await ensureExtraAmenityBeachAccess())

  console.log('\n=== Seeding properties ===')
  const created: string[] = []
  const updated: string[] = []
  const unchanged: string[] = []
  const reconfirm: string[] = []
  const missingImages: string[] = []

  for (const item of PROPERTIES) {
    const id = `property-${item.slug}`
    const matches = (await client.fetch(
      `*[_type == "property" && (slug.current == $slug || _id == $id)]{
        _id, name, "slug": slug.current, destination, propertyType,
        bedrooms, bathrooms, maxGuests, propertySize, propertySizeUnit,
        startingPrice, currency, pricingPeriod, enquiryStatus, featured, displayPriority,
        shortDescription, fullDescription, amenities, services, locationDescription,
        seoTitle, seoDescription, heroImage, gallery
      }`,
      {slug: item.slug, id},
    )) as Array<Record<string, unknown> & {_id: string}>

    const preferred = matches.find((m) => m._id === id) || matches[0] || null
    const destinationId = destinationIds.get(item.destinationSlug)
    const propertyTypeId = propertyTypeIds.get(item.propertyTypeSlug)
    if (!destinationId || !propertyTypeId) {
      throw new Error(`Missing destination or type for ${item.slug}`)
    }

    const amenityRefs = (item.amenitySlugs || [])
      .map((slug) => amenityIds.get(slug))
      .filter(Boolean)
      .map((amenityId) => ({
        _type: 'reference' as const,
        _ref: amenityId as string,
        _key: amenityId as string,
      }))

    if (preferred) {
      const patch: Record<string, unknown> = {}
      if (isBlank(preferred.name)) patch.name = item.name
      if (isBlank(preferred.slug)) patch.slug = {_type: 'slug', current: item.slug}
      if (isBlank(preferred.destination)) {
        patch.destination = {_type: 'reference', _ref: destinationId}
      }
      if (isBlank(preferred.propertyType)) {
        patch.propertyType = {_type: 'reference', _ref: propertyTypeId}
      }
      if (isBlank(preferred.displayPriority)) patch.displayPriority = item.displayPriority
      if (isBlank(preferred.enquiryStatus)) patch.enquiryStatus = item.enquiryStatus
      if (isBlank(preferred.featured) && item.featured != null) patch.featured = item.featured
      if (isBlank(preferred.bedrooms) && item.bedrooms != null) patch.bedrooms = item.bedrooms
      if (isBlank(preferred.bathrooms) && item.bathrooms != null) patch.bathrooms = item.bathrooms
      if (isBlank(preferred.maxGuests) && item.maxGuests != null) patch.maxGuests = item.maxGuests
      if (isBlank(preferred.propertySize) && item.propertySize != null) {
        patch.propertySize = item.propertySize
      }
      if (isBlank(preferred.propertySizeUnit) && item.propertySizeUnit) {
        patch.propertySizeUnit = item.propertySizeUnit
      }
      if (isBlank(preferred.pricingPeriod)) patch.pricingPeriod = item.pricingPeriod
      if (isBlank(preferred.shortDescription)) patch.shortDescription = item.shortDescription
      if (isBlank(preferred.fullDescription)) patch.fullDescription = item.fullDescription
      if (isBlank(preferred.locationDescription) && item.locationDescription) {
        patch.locationDescription = item.locationDescription
      }
      if (isBlank(preferred.services) && item.services) patch.services = item.services
      if (isBlank(preferred.amenities) && amenityRefs.length) patch.amenities = amenityRefs
      if (isBlank(preferred.seoTitle) && item.seoTitle) patch.seoTitle = item.seoTitle
      if (isBlank(preferred.seoDescription) && item.seoDescription) {
        patch.seoDescription = item.seoDescription
      }

      if (Object.keys(patch).length) {
        await client.patch(preferred._id).set(patch).commit()
        updated.push(`${item.name} (${preferred._id})`)
      } else {
        unchanged.push(`${item.name} (${preferred._id})`)
      }
      if (isBlank(preferred.heroImage)) missingImages.push(item.name)
      if (item.needsReconfirmation) reconfirm.push(item.name)
      continue
    }

    const doc: Record<string, unknown> = {
      _id: id,
      _type: 'property',
      name: item.name,
      slug: {_type: 'slug', current: item.slug},
      destination: {_type: 'reference', _ref: destinationId},
      propertyType: {_type: 'reference', _ref: propertyTypeId},
      featured: Boolean(item.featured),
      displayPriority: item.displayPriority,
      enquiryStatus: item.enquiryStatus,
      pricingPeriod: item.pricingPeriod,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
      seoTitle: item.seoTitle || `${item.name} | Private Luxury Holidays`,
      seoDescription: item.seoDescription || item.shortDescription,
    }
    if (item.bedrooms != null) doc.bedrooms = item.bedrooms
    if (item.bathrooms != null) doc.bathrooms = item.bathrooms
    if (item.maxGuests != null) doc.maxGuests = item.maxGuests
    if (item.propertySize != null) doc.propertySize = item.propertySize
    if (item.propertySizeUnit) doc.propertySizeUnit = item.propertySizeUnit
    if (item.locationDescription) doc.locationDescription = item.locationDescription
    if (item.services) doc.services = item.services
    if (amenityRefs.length) doc.amenities = amenityRefs

    await client.createOrReplace(doc)
    created.push(`${item.name} (${id})`)
    missingImages.push(item.name)
    if (item.needsReconfirmation) reconfirm.push(item.name)
  }

  const after = (await client.fetch(`count(*[_type == "property"])`)) as number
  const seeded = (await client.fetch(
    `count(*[_type == "property" && string::startsWith(_id, "property-")])`,
  )) as number

  console.log('\n=== Private Villa seed summary ===')
  console.log(`Created:   ${created.length}`)
  created.forEach((line) => console.log(`  + ${line}`))
  console.log(`Updated:   ${updated.length}`)
  updated.forEach((line) => console.log(`  ~ ${line}`))
  console.log(`Unchanged: ${unchanged.length}`)
  unchanged.forEach((line) => console.log(`  = ${line}`))
  console.log(`\nProperty documents in dataset: ${after} (seeded property-* ids: ${seeded})`)
  console.log(`\nProperties needing licensed imagery (${missingImages.length}):`)
  missingImages.forEach((name) => console.log(`  - ${name}`))
  if (reconfirm.length) {
    console.log('\nReconfirm specs with property/supplier before publication:')
    reconfirm.forEach((name) => console.log(`  ! ${name}`))
  }
  console.log('\nNote: heroImage left empty deliberately. Upload authorised photos in Studio.')
  console.log('Existing properties such as Chalet Blanchot were not deleted.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
