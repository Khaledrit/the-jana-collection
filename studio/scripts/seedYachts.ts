/**
 * Idempotent seed for Yacht documents (production dataset).
 *
 * Yacht names and objective specifications referenced from the public
 * Seven Yachts Dubai fleet listing (https://sevenyachts.com/regions/dubai/)
 * as factual reference only. Descriptions are original Private Luxury Holidays copy.
 * No Seven Yachts images or marketing text are imported.
 *
 * Usage (from studio/):
 *   npm run seed:yachts
 *
 * Safe to re-run: deterministic ids (yacht-<slug>), fills blank fields only
 * on existing docs, preserves heroImage/gallery, never deletes unrelated docs.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

type YachtSeed = {
  slug: string
  name: string
  builder: string
  yachtType?: string
  length: number
  lengthUnit: 'ft' | 'm'
  maxGuests: number
  cabins?: number
  marina: string
  cruisingArea: string
  displayPriority: number
  enquiryStatus: 'Available' | 'On Request' | 'Enquire'
  startingPrice?: number
  currency?: string
  pricingPeriod: 'hour' | 'day' | 'on request'
  minimumBookingHours?: number
  shortDescription: string
  fullDescription: string
  amenities?: string[]
  services: string[]
}

const YACHTS: YachtSeed[] = [
  {
    slug: "spectre",
    name: "Spectre",
    builder: "Azimut",
    yachtType: "Motor Yacht",
    length: 100,
    lengthUnit: "ft",
    maxGuests: 40,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 1,
    enquiryStatus: "On Request",
    startingPrice: 6500,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A 100 ft Azimut suited to polished day charters along the Dubai coastline, with space for a larger private gathering.",
    fullDescription: "Spectre may be arranged on request through our private yacht service for considered day charters from Dubai Harbour. Her length and guest capacity suit celebrations, corporate afternoons and unhurried coastal hours. Routing, crew and timings are confirmed with authorised charter partners; we do not claim ownership or guaranteed availability.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "morrigan",
    name: "Morrigan",
    builder: "Galeon",
    yachtType: "Motor Yacht",
    length: 70,
    lengthUnit: "ft",
    maxGuests: 12,
    cabins: 2,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 2,
    enquiryStatus: "On Request",
    startingPrice: 2500,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A compact Galeon for smaller private parties seeking a quieter Dubai day on the water.",
    fullDescription: "Morrigan is typically considered when a closer, more intimate charter is preferred. Available to arrange on request through our private yacht service, she suits couples and small groups who value composure over scale. All rates and berthing details are reconfirmed for each enquiry.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "reno",
    name: "Reno",
    builder: "Sky Walker",
    yachtType: "Motor Yacht",
    length: 62,
    lengthUnit: "ft",
    maxGuests: 25,
    cabins: 3,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 3,
    enquiryStatus: "On Request",
    startingPrice: 1350,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "An accessible Sky Walker day boat for straightforward Dubai harbour and coastline hours.",
    fullDescription: "Reno offers a practical entry point for private day charter when schedule and simplicity matter. Through Private Luxury Holidays, this yacht may be requested via partner operators; guest numbers, marina and minimum hours are verified before any proposal.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "apex",
    name: "Apex",
    builder: "Sky Walker",
    yachtType: "Motor Yacht",
    length: 63,
    lengthUnit: "ft",
    maxGuests: 25,
    cabins: 3,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 4,
    enquiryStatus: "On Request",
    startingPrice: 1700,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A Sky Walker day charter option with a balanced cabin and deck layout for mid-size groups.",
    fullDescription: "Apex is often assessed for Dubai Harbour charters where a mid-size party needs clear deck space without moving to a larger yacht. Availability and final configuration remain subject to confirmation with authorised partners.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "my-serenity",
    name: "My Serenity",
    builder: "Sunseeker",
    yachtType: "Motor Yacht",
    length: 70,
    lengthUnit: "ft",
    maxGuests: 20,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 5,
    enquiryStatus: "On Request",
    startingPrice: 2500,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A Sunseeker day yacht for composed coastal hours with a refined cabin arrangement.",
    fullDescription: "My Serenity suits travellers who prefer a familiar Sunseeker character for Dubai day charter. She may be arranged on request through our private yacht service, with marina, guest capacity and minimum booking confirmed case by case.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "infinity",
    name: "Infinity",
    builder: "Skywalker",
    yachtType: "Motor Yacht",
    length: 60,
    lengthUnit: "ft",
    maxGuests: 45,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 6,
    enquiryStatus: "On Request",
    startingPrice: 4000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A 60 ft Skywalker arranged for larger day groups seeking open deck presence in Dubai.",
    fullDescription: "Infinity is considered when guest count is the priority on a shorter length. Private Luxury Holidays coordinates the enquiry with charter specialists; nothing is assumed until berth, crew and timings are confirmed.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "haigan",
    name: "Haigan",
    builder: "Harwal Marine",
    yachtType: "Motor Yacht",
    length: 90,
    lengthUnit: "ft",
    maxGuests: 20,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 7,
    enquiryStatus: "On Request",
    startingPrice: 4000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 4,
    shortDescription: "A 90 ft Harwal Marine yacht for considered Dubai day charters with a steadier minimum booking.",
    fullDescription: "Haigan may be requested for private coastal hours from Dubai Harbour. Her length suits mid-to-larger parties who want a quieter presence on the water. Rates and a four-hour minimum are typical reference points; final terms are confirmed on enquiry.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "aarna",
    name: "Aarna",
    builder: "Sunseeker",
    yachtType: "Motor Yacht",
    length: 90,
    lengthUnit: "ft",
    maxGuests: 20,
    cabins: 4,
    marina: "Marsa Al Arab",
    cruisingArea: "Dubai coastline",
    displayPriority: 8,
    enquiryStatus: "On Request",
    startingPrice: 4000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A Sunseeker based at Marsa Al Arab for private day charter with a different Dubai marina setting.",
    fullDescription: "Aarna is available to arrange on request through our private yacht service, departing from Marsa Al Arab. She suits travellers who want a Sunseeker day charter with a considered guest capacity. Availability and routing are confirmed with authorised partners.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "jude",
    name: "Jude",
    builder: "Sunseeker",
    yachtType: "Motor Yacht",
    length: 73,
    lengthUnit: "ft",
    maxGuests: 27,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 9,
    enquiryStatus: "On Request",
    startingPrice: 5750,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A Sunseeker day yacht with capacity for a lively private group along the Dubai coast.",
    fullDescription: "Jude is often selected when a mid-length Sunseeker is needed for celebrations or shared coastal hours. We present her as requestable through our yacht service, not as owned inventory, and confirm every detail before travel.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "bella-iii",
    name: "Bella III",
    builder: "Ferretti",
    yachtType: "Motor Yacht",
    length: 78,
    lengthUnit: "ft",
    maxGuests: 20,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 10,
    enquiryStatus: "On Request",
    startingPrice: 5750,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A Ferretti day charter with a composed Italian motor-yacht character for Dubai waters.",
    fullDescription: "Bella III may be arranged for private day enquiries from Dubai Harbour. Her cabins and guest capacity suit refined gatherings that still want room to move. Charter partners confirm configuration, crew and timing for each brief.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "carmen",
    name: "Carmen",
    builder: "Custom",
    yachtType: "Motor Yacht",
    length: 140,
    lengthUnit: "ft",
    maxGuests: 100,
    cabins: 3,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 11,
    enquiryStatus: "On Request",
    startingPrice: 6000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A substantial custom yacht for large private gatherings and spacious Dubai day charters.",
    fullDescription: "Carmen is considered when guest volume defines the day. Available on request through our private yacht service, she suits corporate afternoons and larger celebrations subject to confirmation of berth, crew and minimum hours.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "straga",
    name: "Straga",
    builder: "Pershing",
    yachtType: "Motor Yacht",
    length: 82,
    lengthUnit: "ft",
    maxGuests: 15,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 12,
    enquiryStatus: "On Request",
    startingPrice: 6500,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A Pershing day yacht for travellers who prefer a sporting, design-led motor profile.",
    fullDescription: "Straga may be requested for private Dubai Harbour charters where a more distinctive hull character is desired. Guest capacity is intentionally tighter; we match the brief carefully and confirm availability with authorised operators.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "diva",
    name: "Diva",
    builder: "Riva",
    yachtType: "Motor Yacht",
    length: 88,
    lengthUnit: "ft",
    maxGuests: 18,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 13,
    enquiryStatus: "On Request",
    startingPrice: 7200,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "An 88 ft Riva for understated day charter with a refined motor-yacht presence.",
    fullDescription: "Diva suits private travellers seeking a Riva day on Dubai waters without excess spectacle. Through Private Luxury Holidays, access is arranged on request; rates and marina details are reconfirmed for each enquiry.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "san-lorenzo-sx88",
    name: "San Lorenzo SX88",
    builder: "San Lorenzo",
    yachtType: "Motor Yacht",
    length: 88,
    lengthUnit: "ft",
    maxGuests: 12,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 14,
    enquiryStatus: "On Request",
    startingPrice: 7500,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A San Lorenzo SX88 for smaller, design-conscious private parties on Dubai day charter.",
    fullDescription: "The San Lorenzo SX88 is typically assessed when cabin quality and a quieter guest count matter more than maximum capacity. She may be arranged through our private yacht service subject to partner confirmation.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "dolce-vita",
    name: "Dolce Vita",
    builder: "Numarine",
    yachtType: "Motor Yacht",
    length: 105,
    lengthUnit: "ft",
    maxGuests: 20,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 15,
    enquiryStatus: "On Request",
    startingPrice: 7900,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A Numarine yacht for composed Dubai coastal hours with a clear cabin and guest balance.",
    fullDescription: "Dolce Vita is available to arrange on request for private day charter from Dubai Harbour. She suits groups who want length and cabins without moving into the largest class. All proposals remain subject to confirmation.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "bella-viiii",
    name: "Bella VIIII",
    builder: "Ferretti",
    yachtType: "Motor Yacht",
    length: 86,
    lengthUnit: "ft",
    maxGuests: 15,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 16,
    enquiryStatus: "On Request",
    startingPrice: 8500,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A Ferretti day yacht with a restrained guest capacity and a polished motor-yacht feel.",
    fullDescription: "Bella VIIII may be requested when a Ferretti day charter is preferred for a smaller private party. We coordinate the brief with authorised partners and do not claim ownership or guaranteed access.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "khalili",
    name: "Khalili",
    builder: "Nedship",
    yachtType: "Motor Yacht",
    length: 107,
    lengthUnit: "ft",
    maxGuests: 30,
    cabins: 4,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 17,
    enquiryStatus: "On Request",
    startingPrice: 8600,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A Nedship yacht suited to mid-to-larger Dubai day gatherings with a clear coastal presence.",
    fullDescription: "Khalili is considered for private enquiries that need more length and guest capacity than a compact day boat. Arranged on request through our yacht service, with marina and minimum hours confirmed before any commitment.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "lamborghini",
    name: "Lamborghini",
    builder: "Lamborghini",
    yachtType: "Motor Yacht",
    length: 63,
    lengthUnit: "ft",
    maxGuests: 10,
    cabins: 2,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 18,
    enquiryStatus: "On Request",
    startingPrice: 10000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 4,
    shortDescription: "A Lamborghini day craft for smaller parties seeking a distinctive, design-led Dubai charter.",
    fullDescription: "This Lamborghini yacht is typically requested for intimate private hours rather than large gatherings. Availability, a four-hour minimum and final rates are confirmed with charter partners for each enquiry.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "stardom",
    name: "Stardom",
    builder: "Custom",
    yachtType: "Motor Yacht",
    length: 141,
    lengthUnit: "ft",
    maxGuests: 100,
    cabins: 5,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 19,
    enquiryStatus: "On Request",
    startingPrice: 10750,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A long custom yacht for substantial private gatherings and expansive Dubai day charters.",
    fullDescription: "Stardom suits briefs defined by scale—larger celebrations or corporate days that need generous guest capacity. Private Luxury Holidays can arrange an enquiry on request; confirmation rests with the operating partner.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "lucien",
    name: "Lucien",
    builder: "Sunseeker",
    yachtType: "Motor Yacht",
    length: 131,
    lengthUnit: "ft",
    maxGuests: 40,
    cabins: 7,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 20,
    enquiryStatus: "On Request",
    startingPrice: 14300,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 4,
    shortDescription: "A long Sunseeker for larger private parties and more expansive Dubai coastal hours.",
    fullDescription: "Lucien is often assessed when length, cabins and guest capacity must work together. She may be arranged through our private yacht service from Dubai Harbour, subject to a confirmed minimum booking and partner availability.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "saffuriya",
    name: "Saffuriya",
    builder: "Peri Yachts",
    yachtType: "Motor Yacht",
    length: 123,
    lengthUnit: "ft",
    maxGuests: 30,
    cabins: 5,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 21,
    enquiryStatus: "On Request",
    startingPrice: 15000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 4,
    shortDescription: "A Peri Yachts day charter with strong length and cabin provision for considered Dubai gatherings.",
    fullDescription: "Saffuriya may be requested for private coastal hours when a longer yacht and multiple cabins are preferred. Rates and marina details are treated as reference points until confirmed for your dates.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "encore",
    name: "Encore",
    builder: "Sunseeker",
    yachtType: "Motor Yacht",
    length: 141,
    lengthUnit: "ft",
    maxGuests: 50,
    cabins: 5,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 22,
    enquiryStatus: "On Request",
    startingPrice: 15000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A large Sunseeker for high-capacity Dubai day charter with a substantial private presence.",
    fullDescription: "Encore is considered when guest numbers and length are central to the brief. Available to arrange on request through our yacht service; we do not operate the vessel and confirm every element with authorised partners.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "thunder",
    name: "Thunder",
    builder: "Oceanfast",
    yachtType: "Motor Yacht",
    length: 164,
    lengthUnit: "ft",
    maxGuests: 35,
    cabins: 6,
    marina: "Marsa Al Arab",
    cruisingArea: "Dubai coastline",
    displayPriority: 23,
    enquiryStatus: "On Request",
    startingPrice: 15500,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A long Oceanfast yacht based at Marsa Al Arab for private Dubai coastline charters.",
    fullDescription: "Thunder may be arranged on request from Marsa Al Arab when a longer yacht and larger private party are required. Routing, crew and minimum hours are confirmed case by case through our private yacht service.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "santorini",
    name: "Santorini",
    builder: "Logos",
    yachtType: "Motor Yacht",
    length: 115,
    lengthUnit: "ft",
    maxGuests: 65,
    cabins: 5,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 24,
    enquiryStatus: "On Request",
    startingPrice: 17000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 4,
    shortDescription: "A Logos yacht with generous guest capacity for lively Dubai day gatherings.",
    fullDescription: "Santorini suits private charters where guest volume is the priority. She may be requested through Private Luxury Holidays; availability and a four-hour minimum are verified before any proposal.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "ak-royalty",
    name: "Ak Royalty",
    builder: "Palmer Johnson",
    yachtType: "Motor Yacht",
    length: 150,
    lengthUnit: "ft",
    maxGuests: 35,
    cabins: 5,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 25,
    enquiryStatus: "On Request",
    startingPrice: 17000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 4,
    shortDescription: "A Palmer Johnson for considered Dubai day charter with length and cabin depth.",
    fullDescription: "Ak Royalty is often selected when a longer motor yacht and a refined guest capacity are needed together. Arranged on request via authorised partners; we make no ownership or exclusivity claims.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "sky-fall",
    name: "Sky Fall",
    builder: "Benetti",
    yachtType: "Motor Yacht",
    length: 164,
    lengthUnit: "ft",
    maxGuests: 50,
    cabins: 6,
    marina: "JA Marina",
    cruisingArea: "Dubai coastline",
    displayPriority: 26,
    enquiryStatus: "On Request",
    startingPrice: 17200,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 4,
    shortDescription: "A Benetti based at JA Marina for substantial private Dubai day charters.",
    fullDescription: "Sky Fall may be arranged on request from JA Marina when length and guest capacity define the day. Private Luxury Holidays coordinates the enquiry; final rates, crew and timings remain subject to confirmation.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "sensation",
    name: "Sensation",
    builder: "Sensation Yachts",
    yachtType: "Motor Yacht",
    length: 164,
    lengthUnit: "ft",
    maxGuests: 25,
    cabins: 5,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 27,
    enquiryStatus: "On Request",
    startingPrice: 18000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 6,
    shortDescription: "A long Sensation Yachts charter with a higher minimum booking for considered Dubai days.",
    fullDescription: "Sensation is typically assessed for private parties that need length and cabins with a longer minimum on the water. Available through our yacht service on request; six-hour minima and rates are confirmed for each enquiry.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "onda",
    name: "Onda",
    builder: "Custom",
    yachtType: "Motor Yacht",
    length: 105,
    lengthUnit: "ft",
    maxGuests: 100,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 28,
    enquiryStatus: "On Request",
    startingPrice: 20000,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A custom yacht arranged for very large private gatherings on Dubai day charter.",
    fullDescription: "Onda is considered when guest capacity is the primary requirement. Cabin configuration was not listed as a verified figure on the public reference used for this collection and is left blank. Access is arranged on request through authorised partners.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "behike",
    name: "Behike",
    builder: "CRN Ancona",
    yachtType: "Motor Yacht",
    length: 140,
    lengthUnit: "ft",
    maxGuests: 50,
    cabins: 5,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 29,
    enquiryStatus: "On Request",
    startingPrice: 21500,
    currency: "AED",
    pricingPeriod: "hour",
    minimumBookingHours: 3,
    shortDescription: "A CRN Ancona for high-capacity Dubai day charter with a substantial motor-yacht presence.",
    fullDescription: "Behike may be requested for private coastal hours when a longer yacht and larger party are required. Rates shown as reference are confirmed on enquiry; Private Luxury Holidays does not own or operate the vessel.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "grace",
    name: "Grace",
    builder: "Australian Yacht Builders",
    yachtType: "Motor Yacht",
    length: 196,
    lengthUnit: "ft",
    maxGuests: 60,
    cabins: 6,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 30,
    enquiryStatus: "On Request",
    pricingPeriod: "on request",
    minimumBookingHours: 24,
    shortDescription: "A long Australian-built yacht for substantial private programmes, with pricing confirmed on request.",
    fullDescription: "Grace is presented for private enquiry when length and guest capacity are paramount. Public reference pricing is POA, with an overnight-style minimum noted on the source. We arrange access on request through authorised partners and confirm every term before travel.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  },
  {
    slug: "benetti-56",
    name: "Benetti 56",
    builder: "Benetti",
    yachtType: "Motor Yacht",
    length: 200,
    lengthUnit: "ft",
    maxGuests: 50,
    cabins: 6,
    marina: "Dubai Harbour",
    cruisingArea: "Dubai coastline",
    displayPriority: 31,
    enquiryStatus: "On Request",
    pricingPeriod: "on request",
    minimumBookingHours: 24,
    shortDescription: "A 200 ft Benetti for the most expansive private Dubai charter briefs, priced on request.",
    fullDescription: "Benetti 56 may be arranged on request for private programmes that need flagship length and guest capacity. Pricing is POA on the public reference, with a 24-hour minimum noted. Private Luxury Holidays coordinates the enquiry without claiming ownership or guaranteed availability.",
    services: ["Day charter enquiry", "Crewed yacht arrangement", "Marina and timing coordination"],
  }
]

function deterministicId(slug: string): string {
  return `yacht-${slug}`
}

type ExistingYacht = {
  _id: string
  name?: string
  slug?: string
  builder?: string
  yachtType?: string
  length?: number
  lengthUnit?: string
  maxGuests?: number
  cabins?: number
  crew?: number
  marina?: string
  cruisingArea?: string
  displayPriority?: number
  enquiryStatus?: string
  startingPrice?: number
  currency?: string
  pricingPeriod?: string
  minimumBookingHours?: number
  shortDescription?: string
  fullDescription?: string
  amenities?: string[]
  services?: string[]
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
    `*[_type == "yacht"]{
      _id,
      name,
      "slug": slug.current,
      builder,
      yachtType,
      length,
      lengthUnit,
      maxGuests,
      cabins,
      crew,
      marina,
      cruisingArea,
      displayPriority,
      enquiryStatus,
      startingPrice,
      currency,
      pricingPeriod,
      minimumBookingHours,
      shortDescription,
      fullDescription,
      amenities,
      services,
      heroImage,
      gallery
    }`,
  )) as ExistingYacht[]

  const bySlug = new Map<string, ExistingYacht[]>()
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

  for (const item of YACHTS) {
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
      if (isBlank(preferred.builder)) patch.builder = item.builder
      if (isBlank(preferred.yachtType) && item.yachtType) patch.yachtType = item.yachtType
      if (isBlank(preferred.length)) patch.length = item.length
      if (isBlank(preferred.lengthUnit)) patch.lengthUnit = item.lengthUnit
      if (isBlank(preferred.maxGuests)) patch.maxGuests = item.maxGuests
      if (isBlank(preferred.cabins) && item.cabins != null) patch.cabins = item.cabins
      if (isBlank(preferred.marina)) patch.marina = item.marina
      if (isBlank(preferred.cruisingArea)) patch.cruisingArea = item.cruisingArea
      if (isBlank(preferred.displayPriority)) patch.displayPriority = item.displayPriority
      if (isBlank(preferred.enquiryStatus)) patch.enquiryStatus = item.enquiryStatus
      if (isBlank(preferred.startingPrice) && item.startingPrice != null) {
        patch.startingPrice = item.startingPrice
      }
      if (isBlank(preferred.currency) && item.currency) patch.currency = item.currency
      if (isBlank(preferred.pricingPeriod)) patch.pricingPeriod = item.pricingPeriod
      if (isBlank(preferred.minimumBookingHours) && item.minimumBookingHours != null) {
        patch.minimumBookingHours = item.minimumBookingHours
      }
      if (isBlank(preferred.shortDescription)) patch.shortDescription = item.shortDescription
      if (isBlank(preferred.fullDescription)) patch.fullDescription = item.fullDescription
      if (isBlank(preferred.services)) patch.services = item.services
      if (isBlank(preferred.amenities) && item.amenities) patch.amenities = item.amenities
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
      _type: 'yacht',
      name: item.name,
      slug: {_type: 'slug', current: item.slug},
      featured: false,
      displayPriority: item.displayPriority,
      enquiryStatus: item.enquiryStatus,
      builder: item.builder,
      length: item.length,
      lengthUnit: item.lengthUnit,
      maxGuests: item.maxGuests,
      marina: item.marina,
      cruisingArea: item.cruisingArea,
      pricingPeriod: item.pricingPeriod,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
      services: item.services,
      seoTitle: `${item.name} | Private Luxury Holidays`,
      seoDescription: item.shortDescription,
    }
    if (item.yachtType) doc.yachtType = item.yachtType
    if (item.cabins != null) doc.cabins = item.cabins
    if (item.startingPrice != null) doc.startingPrice = item.startingPrice
    if (item.currency) doc.currency = item.currency
    if (item.minimumBookingHours != null) doc.minimumBookingHours = item.minimumBookingHours
    if (item.amenities) doc.amenities = item.amenities

    await client.createOrReplace(doc)
    created.push(`${item.name} (${id})`)
    missingImages.push(item.name)
  }

  const after = (await client.fetch(`count(*[_type == "yacht"])`)) as number
  const seeded = (await client.fetch(
    `count(*[_type == "yacht" && string::startsWith(_id, "yacht-")])`,
  )) as number

  console.log('\n=== Yacht seed summary ===')
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
  console.log(`\nYacht documents in dataset: ${after} (seeded yacht-* ids: ${seeded})`)
  console.log(`\nYachts needing licensed imagery (${missingImages.length}):`)
  missingImages.forEach((name) => console.log(`  - ${name}`))
  console.log('\nNote: heroImage left empty deliberately. Upload licensed photos in Studio.')
  console.log('Crew left blank — not listed on public reference pages.')
  console.log('Amenities left blank — not verified as structured lists on the source.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
