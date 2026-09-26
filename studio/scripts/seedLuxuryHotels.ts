/**
 * Idempotent seed for Luxury Hotels (The Collection) from the JANA PDF
 * "The JANA Collection — Luxury Hotel Website Content".
 *
 * Creates luxuryHotel documents only. Does not touch villas, jets, yachts,
 * experiences, or private islands. Leaves heroImage / gallery empty until
 * authorised imagery is uploaded.
 *
 * Usage (from studio/):
 *   npm run seed:luxury-hotels
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

function isBlank(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  return false
}

type SignatureStaySeed = {
  name: string
  description: string
  bedrooms?: number
  maxGuests?: number
  size?: number
  sizeUnit?: 'm²' | 'ft²'
  features?: string[]
}

type HotelSeed = {
  slug: string
  name: string
  country: string
  location: string
  tagline: string
  displayPriority: number
  enquiryStatus: 'Available' | 'On Request' | 'Enquire'
  featured?: boolean
  shortDescription: string
  fullDescription: string
  perfectFor: string[]
  whyJanaLovesIt: string
  janaHighlight: string
  experienceWithJana: string
  signatureStays: SignatureStaySeed[]
  seoTitle?: string
  seoDescription?: string
}

const EXPERIENCE_WITH_JANA =
  'JANA can curate the stay around each guest - from selecting the right villa or residence to transfers, private dining, celebrations and personalised experiences.'

const HOTELS: HotelSeed[] = [
  {
    slug: 'joali-maldives',
    name: 'JOALI Maldives',
    country: 'Maldives',
    location: 'Raa Atoll',
    tagline: 'The Joy of Creative Living',
    displayPriority: 1,
    enquiryStatus: 'On Request',
    featured: true,
    shortDescription:
      'JOALI Maldives is a celebration of art, design and sophisticated island living. Its 73 private villas and residences combine striking architecture, immersive art, exceptional dining and highly personalised Jadugar butler service.',
    fullDescription:
      'JOALI Maldives is a celebration of art, design and sophisticated island living. Its 73 private villas and residences combine striking architecture, immersive art, exceptional dining and highly personalised Jadugar butler service.',
    perfectFor: ['Couples', 'Families', 'Art & Design Lovers', 'VIP Travellers'],
    whyJanaLovesIt:
      'JOALI has a distinctive personality beyond the traditional Maldivian resort. Art and creative design are woven throughout the island, while its multi-bedroom residences make it particularly attractive for luxury families and private groups.',
    janaHighlight:
      'The feeling of a private island home combined with the creative experiences and service of JOALI.',
    experienceWithJana: EXPERIENCE_WITH_JANA,
    signatureStays: [
      {
        name: 'Two Bedroom Family Beach Villa with Two Pools',
        description:
          'A spacious 940 sqm family retreat featuring two private pools - one facing the Indian Ocean and another surrounded by tropical gardens.',
        bedrooms: 2,
        size: 940,
        sizeUnit: 'm²',
        features: ['Two private pools', 'Beach villa'],
      },
      {
        name: 'Four Bedroom Beach Residence with Pool',
        description:
          'An exceptional 1,200 sqm private residence with four bedrooms, expansive living areas, infinity pool, private library, fitness room, sauna and Jacuzzi, plus Jadugar service and a private buggy with driver.',
        bedrooms: 4,
        size: 1200,
        sizeUnit: 'm²',
        features: [
          'Infinity pool',
          'Private library',
          'Fitness room',
          'Sauna',
          'Jacuzzi',
          'Jadugar service',
          'Private buggy with driver',
        ],
      },
    ],
    seoTitle: 'JOALI Maldives | The JANA Collection',
    seoDescription:
      'Enquire about JOALI Maldives in Raa Atoll — artful island living and multi-bedroom residences, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'joali-being',
    name: 'JOALI BEING',
    country: 'Maldives',
    location: 'Bodufushi Island, Raa Atoll',
    tagline: 'The Joy of Well-Living',
    displayPriority: 2,
    enquiryStatus: 'On Request',
    featured: true,
    shortDescription:
      'Located on its own secluded island, JOALI BEING is a dedicated well-living retreat where wellbeing sits at the centre of the experience. Its philosophy brings together Mind, Skin, Microbiome and Energy through personalised programmes.',
    fullDescription:
      'Located on its own secluded island, JOALI BEING is a dedicated well-living retreat where wellbeing sits at the centre of the experience. Its philosophy brings together Mind, Skin, Microbiome and Energy through personalised programmes.',
    perfectFor: ['Wellness Escapes', 'Couples', 'Families', 'Personal Reset'],
    whyJanaLovesIt:
      'JOALI BEING is not simply a luxury resort with a spa - the island itself is designed around wellbeing, combining expert guidance, nutrition-led dining, transformational spaces and private-pool island living.',
    janaHighlight:
      "Exceptional privacy combined with one of the Maldives' most complete personalised wellbeing experiences.",
    experienceWithJana: EXPERIENCE_WITH_JANA,
    signatureStays: [
      {
        name: 'Three Bedroom Wellbeing Beach Pool Residence',
        description:
          'A spectacular 1,700 sqm beachfront residence with dedicated fitness and wellbeing spaces and a 105 sqm infinity pool.',
        bedrooms: 3,
        size: 1700,
        sizeUnit: 'm²',
        features: ['Beachfront', 'Fitness and wellbeing spaces', '105 sqm infinity pool'],
      },
      {
        name: 'Four Bedroom Private Wellbeing Ocean Pool Residence',
        description:
          'An extraordinary 1,050 sqm overwater residence with four bedrooms and a 118 sqm infinity pool, designed for families and private groups seeking privacy and personalised wellbeing.',
        bedrooms: 4,
        size: 1050,
        sizeUnit: 'm²',
        features: ['Overwater', '118 sqm infinity pool', 'Personalised wellbeing'],
      },
    ],
    seoTitle: 'JOALI BEING | The JANA Collection',
    seoDescription:
      'Enquire about JOALI BEING on Bodufushi Island — a dedicated well-living retreat in the Maldives, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'waldorf-astoria-maldives-ithaafushi',
    name: 'Waldorf Astoria Maldives Ithaafushi',
    country: 'Maldives',
    location: 'South Male Atoll',
    tagline: 'A New Level of Island Luxury',
    displayPriority: 3,
    enquiryStatus: 'On Request',
    featured: true,
    shortDescription:
      "Waldorf Astoria Maldives Ithaafushi combines exceptional space, contemporary luxury and highly personalised service. Its villas rank among the Maldives' most spacious, with private pools and accommodation ranging from romantic retreats to major family residences.",
    fullDescription:
      "Waldorf Astoria Maldives Ithaafushi combines exceptional space, contemporary luxury and highly personalised service. Its villas rank among the Maldives' most spacious, with private pools and accommodation ranging from romantic retreats to major family residences.",
    perfectFor: ['VIP Families', 'Couples', 'Celebrations', 'Ultra-Luxury Escapes'],
    whyJanaLovesIt:
      'Few Maldives resorts combine this level of space, dining, privacy and variety. For the ultimate experience, Ithaafushi - The Private Island can be reserved exclusively for one group.',
    janaHighlight: 'When a private villa is not private enough - have the island.',
    experienceWithJana: EXPERIENCE_WITH_JANA,
    signatureStays: [
      {
        name: 'Three Bedroom Overwater Villa with Pool',
        description:
          'An extraordinary 1,113 sqm overwater residence with three bedrooms and exceptional space for families and groups.',
        bedrooms: 3,
        size: 1113,
        sizeUnit: 'm²',
        features: ['Overwater', 'Private pool'],
      },
      {
        name: 'Ithaafushi - The Private Island',
        description:
          'An entire private island reserved exclusively for you and your guests, with three residences accommodating up to 18 guests.',
        maxGuests: 18,
        features: ['Private island', 'Three residences'],
      },
    ],
    seoTitle: 'Waldorf Astoria Maldives Ithaafushi | The JANA Collection',
    seoDescription:
      'Enquire about Waldorf Astoria Maldives Ithaafushi — spacious island villas and exclusive private-island stays, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'waldorf-astoria-seychelles-platte-island',
    name: 'Waldorf Astoria Seychelles Platte Island',
    country: 'Seychelles',
    location: 'Platte Island',
    tagline: 'Luxury at the Edge of the World',
    displayPriority: 4,
    enquiryStatus: 'On Request',
    featured: true,
    shortDescription:
      'Far from the main islands of Seychelles, Platte Island is an extraordinary private-island sanctuary. Waldorf Astoria offers only 50 private villas, each with its own pool and direct beach access, surrounded by the Indian Ocean.',
    fullDescription:
      'Far from the main islands of Seychelles, Platte Island is an extraordinary private-island sanctuary. Waldorf Astoria offers only 50 private villas, each with its own pool and direct beach access, surrounded by the Indian Ocean.',
    perfectFor: ['Couples', 'Families', 'Nature Lovers', 'Private Island Escapes'],
    whyJanaLovesIt:
      'Platte Island feels genuinely remote. The experience combines Waldorf Astoria service with an untouched island environment and villa options suitable for couples, families and private groups.',
    janaHighlight:
      'A sophisticated private-island escape for travellers who want to feel far away from everything.',
    experienceWithJana: EXPERIENCE_WITH_JANA,
    signatureStays: [
      {
        name: 'Three Bedroom Kingfish Pool Villa',
        description:
          'A spacious private-pool villa designed for families, accommodating up to six guests.',
        bedrooms: 3,
        maxGuests: 6,
        features: ['Private pool'],
      },
      {
        name: 'Five Bedroom Eagle Ray Pool Villa',
        description:
          "The island's largest villa category, accommodating up to 10 guests and designed for private family and group escapes.",
        bedrooms: 5,
        maxGuests: 10,
        features: ['Private pool', 'Largest villa category'],
      },
    ],
    seoTitle: 'Waldorf Astoria Seychelles Platte Island | The JANA Collection',
    seoDescription:
      'Enquire about Waldorf Astoria Seychelles Platte Island — a remote private-island sanctuary, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'four-seasons-resort-seychelles',
    name: 'Four Seasons Resort Seychelles',
    country: 'Seychelles',
    location: 'Petite Anse, Mahé',
    tagline: 'Your Private Hillside Sanctuary',
    displayPriority: 5,
    enquiryStatus: 'On Request',
    featured: true,
    shortDescription:
      'Rising above the turquoise waters of Petite Anse, Four Seasons Resort Seychelles feels hidden within a tropical hillside. Its villas and residences combine private infinity pools with the comfort and service of Four Seasons.',
    fullDescription:
      'Rising above the turquoise waters of Petite Anse, Four Seasons Resort Seychelles feels hidden within a tropical hillside. Its villas and residences combine private infinity pools with the comfort and service of Four Seasons.',
    perfectFor: ['Couples', 'Families', 'Honeymoons', 'Multi-Generational Travel'],
    whyJanaLovesIt:
      'The location is spectacular. Villas sit among tropical vegetation like private tree houses overlooking Petite Anse, while larger residences create a genuine private family-home experience.',
    janaHighlight:
      "One of Seychelles' strongest choices for large VIP and multi-generational families.",
    experienceWithJana: EXPERIENCE_WITH_JANA,
    signatureStays: [
      {
        name: 'Three Bedroom Royal Suite',
        description:
          "One of the resort's most private choices, with direct beach access, three pavilions, infinity pool, private gym and exceptional Petite Anse views.",
        bedrooms: 3,
        features: [
          'Direct beach access',
          'Three pavilions',
          'Infinity pool',
          'Private gym',
          'Petite Anse views',
        ],
      },
      {
        name: 'Eight Bedroom Residence Villa',
        description:
          'Approximately 1,355 sqm across three levels, accommodating up to 16 guests with panoramic ocean views - an exceptional option for large VIP families.',
        bedrooms: 8,
        maxGuests: 16,
        size: 1355,
        sizeUnit: 'm²',
        features: ['Three levels', 'Panoramic ocean views'],
      },
    ],
    seoTitle: 'Four Seasons Resort Seychelles | The JANA Collection',
    seoDescription:
      'Enquire about Four Seasons Resort Seychelles at Petite Anse — hillside villas and large family residences, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'anantara-maia-seychelles-villas',
    name: 'Anantara Maia Seychelles Villas',
    country: 'Seychelles',
    location: 'Anse Louis, Mahé',
    tagline: 'Your Villa. Your Time. Your Seychelles.',
    displayPriority: 6,
    enquiryStatus: 'On Request',
    featured: true,
    shortDescription:
      'Hidden within 30 acres of tropical landscape, Anantara Maia offers just 30 secluded private pool villas. Each villa is supported by a dedicated Villa Host, allowing the stay to unfold around the guest rather than a fixed resort schedule.',
    fullDescription:
      'Hidden within 30 acres of tropical landscape, Anantara Maia offers just 30 secluded private pool villas. Each villa is supported by a dedicated Villa Host, allowing the stay to unfold around the guest rather than a fixed resort schedule.',
    perfectFor: ['Honeymoons', 'Couples', 'Privacy Seekers', 'Small Families'],
    whyJanaLovesIt:
      'Anantara Maia is about privacy and personalised service. With only 30 villas and private infinity pools, it is ideal for clients who prefer quiet luxury over a large resort environment.',
    janaHighlight:
      'A favourite Seychelles choice when privacy and personal service matter more than the size of the resort.',
    experienceWithJana: EXPERIENCE_WITH_JANA,
    signatureStays: [
      {
        name: 'Premier Beach Pool Villa',
        description:
          'A generous 310 sqm private villa surrounded by its own garden with direct access to Anse Louis Beach.',
        size: 310,
        sizeUnit: 'm²',
        features: ['Private garden', 'Direct beach access', 'Private pool'],
      },
      {
        name: 'Peninsula Ocean View Pool Villa',
        description:
          'A secluded 250 sqm villa at the edge of the peninsula with open Indian Ocean views and a private infinity pool.',
        size: 250,
        sizeUnit: 'm²',
        features: ['Ocean views', 'Private infinity pool'],
      },
    ],
    seoTitle: 'Anantara Maia Seychelles Villas | The JANA Collection',
    seoDescription:
      'Enquire about Anantara Maia Seychelles Villas at Anse Louis — intimate private-pool villas, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'one-and-only-reethi-rah',
    name: 'One&Only Reethi Rah',
    country: 'Maldives',
    location: 'North Male Atoll',
    tagline: 'An Icon of Maldivian Island Living',
    displayPriority: 7,
    enquiryStatus: 'On Request',
    featured: true,
    shortDescription:
      "One&Only Reethi Rah brings together expansive beaches, exceptional villas, sophisticated dining and the privacy of one of the Maldives' most established ultra-luxury islands.",
    fullDescription:
      "One&Only Reethi Rah brings together expansive beaches, exceptional villas, sophisticated dining and the privacy of one of the Maldives' most established ultra-luxury islands.",
    perfectFor: ['VIP Families', 'Couples', 'Groups', 'Celebrations'],
    whyJanaLovesIt:
      'Reethi Rah gives guests room to live. From secluded overwater villas to enormous beachfront residences, it works equally well for couples and families seeking their own private world.',
    janaHighlight:
      "Exceptional private-residence living on one of the Maldives' most iconic islands.",
    experienceWithJana: EXPERIENCE_WITH_JANA,
    signatureStays: [
      {
        name: 'Grand Residence',
        description:
          'An extraordinary 1,075 sqm three-bedroom residence with pools, private beachfront, outdoor entertaining areas and optional private-chef service.',
        bedrooms: 3,
        size: 1075,
        sizeUnit: 'm²',
        features: [
          'Private beachfront',
          'Outdoor entertaining',
          'Optional private-chef service',
        ],
      },
      {
        name: 'Grand Sunset Residence',
        description:
          "The resort's most exclusive address at 1,193 sqm, with three bedrooms, multiple pools, outdoor beach cinema and 24/7 personal host service.",
        bedrooms: 3,
        size: 1193,
        sizeUnit: 'm²',
        features: [
          'Multiple pools',
          'Outdoor beach cinema',
          '24/7 personal host service',
        ],
      },
    ],
    seoTitle: 'One&Only Reethi Rah | The JANA Collection',
    seoDescription:
      'Enquire about One&Only Reethi Rah in North Male Atoll — iconic Maldivian island living, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'one-and-only-le-saint-geran',
    name: 'One&Only Le Saint Géran',
    country: 'Mauritius',
    location: '',
    tagline: 'The Icon of Mauritius',
    displayPriority: 8,
    enquiryStatus: 'On Request',
    featured: true,
    shortDescription:
      'One&Only Le Saint Géran combines the timeless elegance of Mauritius with a new generation of exceptional private villas. Private pool villas range from two to six bedrooms for families and groups seeking a private-home experience.',
    fullDescription:
      'One&Only Le Saint Géran combines the timeless elegance of Mauritius with a new generation of exceptional private villas. Private pool villas range from two to six bedrooms for families and groups seeking a private-home experience.',
    perfectFor: ['Families', 'Couples', 'Multi-Generational Travel', 'Celebrations'],
    whyJanaLovesIt:
      'Le Saint Géran is an icon, but its private villas create an entirely different way to experience it. Private pools, kitchens, generous living spaces and dedicated hosts are particularly suited to family and longer stays.',
    janaHighlight:
      'The privacy of your own Mauritius villa with the complete One&Only experience just outside your door.',
    experienceWithJana: EXPERIENCE_WITH_JANA,
    signatureStays: [
      {
        name: 'Villa One',
        description:
          'A highly private two-bedroom beachfront villa with heated infinity pool, dedicated host, private chef and valet, plus direct beach access.',
        bedrooms: 2,
        features: [
          'Beachfront',
          'Heated infinity pool',
          'Dedicated host',
          'Private chef',
          'Valet',
          'Direct beach access',
        ],
      },
      {
        name: 'Six Bedroom Oceanfront Private Pool Villa',
        description:
          'An expansive 760 sqm private villa accommodating up to 12 guests, with private heated pool, full kitchen and extensive indoor-outdoor living.',
        bedrooms: 6,
        maxGuests: 12,
        size: 760,
        sizeUnit: 'm²',
        features: ['Oceanfront', 'Private heated pool', 'Full kitchen'],
      },
    ],
    seoTitle: 'One&Only Le Saint Géran | The JANA Collection',
    seoDescription:
      'Enquire about One&Only Le Saint Géran in Mauritius — iconic resort living with exceptional private villas, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'maradiva-villas-resort-spa',
    name: 'Maradiva Villas Resort & Spa',
    country: 'Mauritius',
    location: 'Wolmar',
    tagline: 'The Private Villa Side of Mauritius',
    displayPriority: 9,
    enquiryStatus: 'On Request',
    featured: true,
    shortDescription:
      'Maradiva offers an intimate all-villa approach to Mauritius, with private heated pools and tropical outdoor living at the heart of the experience. It is ideal for guests who prefer a villa rather than a traditional room or suite.',
    fullDescription:
      'Maradiva offers an intimate all-villa approach to Mauritius, with private heated pools and tropical outdoor living at the heart of the experience. It is ideal for guests who prefer a villa rather than a traditional room or suite.',
    perfectFor: ['Couples', 'Families', 'Honeymoons', 'Privacy Seekers'],
    whyJanaLovesIt:
      'Maradiva makes private-pool living part of the standard experience. Its low-rise villa concept creates a relaxed residential feeling that works beautifully for romantic and longer Mauritius stays.',
    janaHighlight:
      'An excellent choice for clients who want Mauritius to feel like their own private villa holiday.',
    experienceWithJana: EXPERIENCE_WITH_JANA,
    signatureStays: [
      {
        name: 'Exclusive Beachfront Pool Villa',
        description:
          'A private beachfront hideaway combining its own garden and pool with beautiful Indian Ocean views.',
        features: ['Beachfront', 'Private garden', 'Private pool', 'Ocean views'],
      },
      {
        name: 'Two Bedroom Presidential Beachfront Pool Villa',
        description:
          'An impressive 345 sqm beachfront residence with a 56 sqm heated private pool, two bedrooms, home cinema, kitchenette and dedicated 24-hour butler service.',
        bedrooms: 2,
        size: 345,
        sizeUnit: 'm²',
        features: [
          '56 sqm heated private pool',
          'Home cinema',
          'Kitchenette',
          '24-hour butler service',
        ],
      },
    ],
    seoTitle: 'Maradiva Villas Resort & Spa | The JANA Collection',
    seoDescription:
      'Enquire about Maradiva Villas Resort & Spa in Wolmar, Mauritius — intimate all-villa living, arranged through Private Luxury Holidays.',
  },
  {
    slug: 'layan-residences-by-anantara',
    name: 'Layan Residences by Anantara',
    country: 'Thailand',
    location: 'Phuket',
    tagline: 'Your Private Phuket Residence',
    displayPriority: 10,
    enquiryStatus: 'On Request',
    featured: true,
    shortDescription:
      'High above Layan Bay, 27 individually designed private residences create a very different Phuket experience. With approximately 1,100 to 2,600 sqm of space, infinity pools and panoramic Andaman Sea views, these are fully serviced private homes.',
    fullDescription:
      'High above Layan Bay, 27 individually designed private residences create a very different Phuket experience. With approximately 1,100 to 2,600 sqm of space, infinity pools and panoramic Andaman Sea views, these are fully serviced private homes.',
    perfectFor: ['VIP Families', 'Groups', 'Celebrations', 'Long Stays'],
    whyJanaLovesIt:
      'This is Phuket without compromising on privacy. Guests have their own substantial residence while retaining access to Anantara Layan, with live-in butler service and an in-residence Thai chef.',
    janaHighlight:
      'More than a hotel stay - your own fully serviced private estate overlooking the Andaman Sea.',
    experienceWithJana: EXPERIENCE_WITH_JANA,
    signatureStays: [
      {
        name: 'Six Bedroom Sea View Residence',
        description:
          'A spectacular residence of up to 2,600 sqm with infinity pool, spa treatment room, gym, theatre and private dining spaces.',
        bedrooms: 6,
        size: 2600,
        sizeUnit: 'm²',
        features: [
          'Infinity pool',
          'Spa treatment room',
          'Gym',
          'Theatre',
          'Private dining',
        ],
      },
      {
        name: "The Founder's Residence",
        description:
          "One of the collection's most exceptional private homes, offering seven bedrooms within approximately 2,600 sqm, with infinity pool, live-in butler, Thai chef, private gym, spa and theatre.",
        bedrooms: 7,
        size: 2600,
        sizeUnit: 'm²',
        features: [
          'Infinity pool',
          'Live-in butler',
          'Thai chef',
          'Private gym',
          'Spa',
          'Theatre',
        ],
      },
    ],
    seoTitle: 'Layan Residences by Anantara | The JANA Collection',
    seoDescription:
      'Enquire about Layan Residences by Anantara in Phuket — fully serviced private residences above Layan Bay, arranged through Private Luxury Holidays.',
  },
]

function mapSignatureStays(stays: SignatureStaySeed[]) {
  return stays.map((stay, index) => {
    const item: Record<string, unknown> = {
      _type: 'signatureStay',
      _key: `stay-${index + 1}-${stay.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 48)}`,
      name: stay.name,
      description: stay.description,
    }
    if (stay.bedrooms != null) item.bedrooms = stay.bedrooms
    if (stay.maxGuests != null) item.maxGuests = stay.maxGuests
    if (stay.size != null) item.size = stay.size
    if (stay.sizeUnit) item.sizeUnit = stay.sizeUnit
    if (stay.features?.length) item.features = stay.features
    return item
  })
}

async function main() {
  console.log('\n=== Seeding luxury hotels ===')
  const created: string[] = []
  const updated: string[] = []
  const unchanged: string[] = []
  const missingImages: string[] = []

  for (const item of HOTELS) {
    const id = `luxuryHotel-${item.slug}`
    const matches = (await client.fetch(
      `*[_type == "luxuryHotel" && (slug.current == $slug || _id == $id)]{
        _id, name, "slug": slug.current, country, location, tagline,
        featured, displayPriority, enquiryStatus,
        shortDescription, fullDescription, perfectFor, whyJanaLovesIt,
        janaHighlight, experienceWithJana, signatureStays,
        seoTitle, seoDescription, heroImage, gallery
      }`,
      {slug: item.slug, id},
    )) as Array<Record<string, unknown> & {_id: string}>

    const preferred = matches.find((m) => m._id === id) || matches[0] || null
    const signatureStays = mapSignatureStays(item.signatureStays)

    if (preferred) {
      const patch: Record<string, unknown> = {}
      if (isBlank(preferred.name)) patch.name = item.name
      if (isBlank(preferred.slug)) patch.slug = {_type: 'slug', current: item.slug}
      if (isBlank(preferred.country)) patch.country = item.country
      if (isBlank(preferred.location)) patch.location = item.location
      if (isBlank(preferred.tagline)) patch.tagline = item.tagline
      if (isBlank(preferred.displayPriority)) patch.displayPriority = item.displayPriority
      if (isBlank(preferred.enquiryStatus)) patch.enquiryStatus = item.enquiryStatus
      if (isBlank(preferred.featured) && item.featured != null) patch.featured = item.featured
      if (isBlank(preferred.shortDescription)) patch.shortDescription = item.shortDescription
      if (isBlank(preferred.fullDescription)) patch.fullDescription = item.fullDescription
      if (isBlank(preferred.perfectFor)) patch.perfectFor = item.perfectFor
      if (isBlank(preferred.whyJanaLovesIt)) patch.whyJanaLovesIt = item.whyJanaLovesIt
      if (isBlank(preferred.janaHighlight)) patch.janaHighlight = item.janaHighlight
      if (isBlank(preferred.experienceWithJana)) {
        patch.experienceWithJana = item.experienceWithJana
      }
      if (isBlank(preferred.signatureStays)) patch.signatureStays = signatureStays
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
      continue
    }

    await client.createOrReplace({
      _id: id,
      _type: 'luxuryHotel',
      name: item.name,
      slug: {_type: 'slug', current: item.slug},
      country: item.country,
      location: item.location,
      tagline: item.tagline,
      featured: Boolean(item.featured),
      displayPriority: item.displayPriority,
      enquiryStatus: item.enquiryStatus,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
      perfectFor: item.perfectFor,
      whyJanaLovesIt: item.whyJanaLovesIt,
      janaHighlight: item.janaHighlight,
      experienceWithJana: item.experienceWithJana,
      signatureStays,
      seoTitle: item.seoTitle || `${item.name} | The JANA Collection`,
      seoDescription: item.seoDescription || item.shortDescription,
    })
    created.push(`${item.name} (${id})`)
    missingImages.push(item.name)
  }

  const after = (await client.fetch(`count(*[_type == "luxuryHotel"])`)) as number

  console.log('\n=== Luxury Hotel seed summary ===')
  console.log(`Created:   ${created.length}`)
  created.forEach((line) => console.log(`  + ${line}`))
  console.log(`Updated:   ${updated.length}`)
  updated.forEach((line) => console.log(`  ~ ${line}`))
  console.log(`Unchanged: ${unchanged.length}`)
  unchanged.forEach((line) => console.log(`  = ${line}`))
  console.log(`\nLuxury hotel documents in dataset: ${after}`)
  console.log(`\nHotels needing licensed imagery (${missingImages.length}):`)
  missingImages.forEach((name) => console.log(`  - ${name}`))
  console.log('\nNote: heroImage left empty deliberately. Upload authorised photos in Studio.')
  console.log('Other collections (villas, jets, yachts, experiences) were not modified.')
  console.log(
    '\nCaution: Property specifications and operating details should be revalidated with the resort before final publication.',
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
