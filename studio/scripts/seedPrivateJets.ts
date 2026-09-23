/**
 * Idempotent seed for Private Jet documents (production dataset).
 *
 * Aircraft models referenced from the public FlyBitLux fleet listing
 * (https://flybitlux.com/fleet/) as factual model names only.
 * Descriptions are original Private Luxury Holidays copy.
 * No FlyBitLux images or marketing text are imported.
 *
 * Usage (from studio/):
 *   npm run seed:jets
 *
 * Safe to re-run: deterministic ids (privateJet-<slug>), fills blank fields only
 * on existing docs, migrates legacy path-scoped ids (privateJet.<slug>) to public
 * hyphen ids (required for unauthenticated frontend queries), never touches
 * villas/yachts/experiences.
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

type JetSeed = {
  slug: string
  name: string
  manufacturer: string
  aircraftType: string
  passengerCapacity?: number
  range?: number
  rangeUnit?: 'nm' | 'km' | 'mi'
  displayPriority: number
  enquiryStatus: 'Available' | 'On Request' | 'Enquire'
  shortDescription: string
  fullDescription: string
  features: string[]
  services: string[]
}

const JETS: JetSeed[] = [
  {
    slug: "citation-cj3",
    name: "Citation CJ3",
    manufacturer: "Cessna",
    aircraftType: "Light Jet",
    passengerCapacity: 9,
    range: 2040,
    rangeUnit: "nm",
    displayPriority: 1,
    enquiryStatus: "On Request",
    shortDescription: "Designed for effortless regional travel, the Citation CJ3 combines a refined cabin with the flexibility to reach smaller airports closer to the final destination.",
    fullDescription: "The Citation CJ3 is a light jet suited to private travellers who value pace and access. Its cabin is arranged for quiet, efficient journeys, and its field performance often opens airports nearer to villas, coasts and city centres than larger aircraft can use. Through our private aviation service, availability and routing are confirmed with authorised operators for each enquiry.",
    features: ["Regional access", "Efficient short-to-medium sectors", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "citation-excel",
    name: "Citation Excel",
    manufacturer: "Cessna",
    aircraftType: "Midsize Jet",
    passengerCapacity: 8,
    range: 1850,
    rangeUnit: "nm",
    displayPriority: 2,
    enquiryStatus: "On Request",
    shortDescription: "A versatile midsize cabin for regional and medium-haul journeys, with space that feels considered rather than crowded.",
    fullDescription: "The Citation Excel offers a practical midsize interior for couples, small families and executive groups. It suits itineraries that need more cabin room than a light jet without moving into a heavy aircraft. We arrange enquiries through qualified partners; aircraft, timings and routing remain subject to confirmation.",
    features: ["Stand-up cabin comfort", "Medium-haul flexibility", "Group seating"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "citation-latitude",
    name: "Citation Latitude",
    manufacturer: "Cessna",
    aircraftType: "Super Midsize Jet",
    passengerCapacity: 9,
    range: 2850,
    rangeUnit: "nm",
    displayPriority: 3,
    enquiryStatus: "On Request",
    shortDescription: "A super-midsize cabin with the composure for longer sectors and a quieter sense of arrival.",
    fullDescription: "The Citation Latitude sits between midsize agility and heavy-jet presence. It is often considered when travellers want a stand-up cabin feel and range for multi-country days without committing to an ultra-long-range platform. Options are assessed against your route, party and luggage, then confirmed by an authorised provider.",
    features: ["Extended range", "Composed cabin", "Continental capability"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "citation-ultra",
    name: "Citation Ultra",
    manufacturer: "Cessna",
    aircraftType: "Light Jet",
    passengerCapacity: 8,
    range: 1960,
    rangeUnit: "nm",
    displayPriority: 4,
    enquiryStatus: "On Request",
    shortDescription: "A light jet for short-to-medium hops where schedule and simplicity matter most.",
    fullDescription: "The Citation Ultra remains a familiar choice for discreet regional travel. Its cabin supports efficient seating for smaller parties, and its operating profile suits day returns and sequential city connections. We present it as a requestable type through our aviation service, not as owned inventory.",
    features: ["Regional access", "Efficient short-to-medium sectors", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "citation-vii",
    name: "Citation VII",
    manufacturer: "Cessna",
    aircraftType: "Midsize Jet",
    passengerCapacity: 8,
    range: 2200,
    rangeUnit: "nm",
    displayPriority: 5,
    enquiryStatus: "On Request",
    shortDescription: "A midsize jet with a settled cabin character, suited to composed regional and continental travel.",
    fullDescription: "The Citation VII offers a midsize cabin for travellers who prefer a quieter, established platform for business or leisure legs. It works well when comfort and predictability matter more than headline range. Availability, configuration and routing are confirmed case by case.",
    features: ["Stand-up cabin comfort", "Medium-haul flexibility", "Group seating"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "citation-bravo",
    name: "Citation Bravo",
    manufacturer: "Cessna",
    aircraftType: "Light Jet",
    passengerCapacity: 7,
    range: 1500,
    rangeUnit: "nm",
    displayPriority: 6,
    enquiryStatus: "On Request",
    shortDescription: "A compact light jet for private travellers who prioritise schedule control on shorter sectors.",
    fullDescription: "The Citation Bravo is typically considered for regional journeys where a light cabin and flexible timing are the priority. It suits smaller parties travelling between cities or to secondary airports. We coordinate the enquiry with authorised operators and confirm every element before travel.",
    features: ["Regional access", "Efficient short-to-medium sectors", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "challenger-300",
    name: "Challenger 300",
    manufacturer: "Bombardier",
    aircraftType: "Super Midsize Jet",
    passengerCapacity: 9,
    range: 3100,
    rangeUnit: "nm",
    displayPriority: 7,
    enquiryStatus: "On Request",
    shortDescription: "A super-midsize cabin known for composure on medium-haul routes and a calm working environment in flight.",
    fullDescription: "The Challenger 300 is frequently requested for continental journeys that need more space and range than a light jet. Its cabin supports conversation, rest and light work without excess. Through Private Luxury Holidays, this type may be requested via partner operators subject to confirmation.",
    features: ["Extended range", "Composed cabin", "Continental capability"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "challenger-350",
    name: "Challenger 350",
    manufacturer: "Bombardier",
    aircraftType: "Super Midsize Jet",
    passengerCapacity: 10,
    range: 3200,
    rangeUnit: "nm",
    displayPriority: 8,
    enquiryStatus: "On Request",
    shortDescription: "An evolution of the Challenger midsize line, balanced for range, cabin comfort and group travel.",
    fullDescription: "The Challenger 350 suits parties who need a composed cabin for longer day sectors or overnight legs. It is often selected when luggage volume and seating comfort matter alongside schedule control. We do not operate the aircraft; we coordinate the brief with qualified aviation partners.",
    features: ["Extended range", "Composed cabin", "Continental capability"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "challenger-604",
    name: "Challenger 604",
    manufacturer: "Bombardier",
    aircraftType: "Heavy Jet",
    passengerCapacity: 12,
    range: 4000,
    rangeUnit: "nm",
    displayPriority: 9,
    enquiryStatus: "On Request",
    shortDescription: "A heavy jet cabin for longer journeys, with room for larger parties to travel together.",
    fullDescription: "The Challenger 604 provides a heavy-cabin environment for transcontinental or multi-stop private travel. It is considered when group size, baggage and cabin division matter. Aircraft access and exact configuration are confirmed by authorised operators for each enquiry.",
    features: ["Spacious cabin", "Longer sectors", "Larger party travel"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "challenger-605",
    name: "Challenger 605",
    manufacturer: "Bombardier",
    aircraftType: "Heavy Jet",
    passengerCapacity: 12,
    range: 4000,
    rangeUnit: "nm",
    displayPriority: 10,
    enquiryStatus: "On Request",
    shortDescription: "A refined heavy-cabin Challenger for long-range private journeys with a settled onboard atmosphere.",
    fullDescription: "The Challenger 605 continues the heavy Challenger cabin tradition with a focus on comfort over distance. It suits families and groups who prefer to keep the party together on longer sectors. Availability is arranged on request through our private aviation service.",
    features: ["Spacious cabin", "Longer sectors", "Larger party travel"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "falcon-20",
    name: "Falcon 20",
    manufacturer: "Dassault",
    aircraftType: "Midsize Jet",
    range: 1800,
    rangeUnit: "nm",
    displayPriority: 11,
    enquiryStatus: "On Request",
    shortDescription: "A classic midsize Falcon profile for travellers who value a quieter, established cabin character.",
    fullDescription: "The Falcon 20 remains part of many private fleets for regional and medium-haul missions. Its cabin scale suits smaller groups seeking a European-style midsize experience. Specifications and availability vary by airframe; we confirm details with operators before proposing a flight.",
    features: ["Stand-up cabin comfort", "Medium-haul flexibility", "Group seating"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "falcon-2000",
    name: "Falcon 2000",
    manufacturer: "Dassault",
    aircraftType: "Heavy Jet",
    passengerCapacity: 10,
    range: 3350,
    rangeUnit: "nm",
    displayPriority: 12,
    enquiryStatus: "On Request",
    shortDescription: "A wide, composed Falcon cabin for medium-to-long private journeys.",
    fullDescription: "The Falcon 2000 is often chosen when travellers want a heavy-cabin feel without immediately moving to ultra-long-range types. It supports comfortable seating for larger parties on continental routes. We present it as a requestable model through authorised partners.",
    features: ["Spacious cabin", "Longer sectors", "Larger party travel"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "falcon-7x",
    name: "Falcon 7X",
    manufacturer: "Dassault",
    aircraftType: "Ultra Long Range",
    passengerCapacity: 14,
    range: 5950,
    rangeUnit: "nm",
    displayPriority: 13,
    enquiryStatus: "On Request",
    shortDescription: "A three-engine ultra-long-range Falcon for intercontinental private travel with a calm, partitioned cabin.",
    fullDescription: "The Falcon 7X is considered for long-haul private journeys where range and cabin zoning matter. Its layout can support rest, conversation and dining on extended sectors. Routing, crew and aircraft confirmation are handled through qualified operators; we do not claim ownership or guaranteed access.",
    features: ["Intercontinental range", "Rest-capable cabin", "Long-sector composure"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "falcon-8x",
    name: "Falcon 8X",
    manufacturer: "Dassault",
    aircraftType: "Ultra Long Range",
    passengerCapacity: 14,
    range: 6450,
    rangeUnit: "nm",
    displayPriority: 14,
    enquiryStatus: "On Request",
    shortDescription: "An extended ultra-long-range Falcon for the furthest private itineraries, with a spacious cabin for arrival in composure.",
    fullDescription: "The Falcon 8X suits travellers planning distant sectors who still want a refined cabin environment. It is typically assessed against passenger count, baggage and preferred arrival airports. Every proposal remains subject to operator confirmation.",
    features: ["Intercontinental range", "Rest-capable cabin", "Long-sector composure"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "falcon-900",
    name: "Falcon 900",
    manufacturer: "Dassault",
    aircraftType: "Heavy Jet",
    passengerCapacity: 14,
    range: 4750,
    rangeUnit: "nm",
    displayPriority: 15,
    enquiryStatus: "On Request",
    shortDescription: "A tri-jet Falcon cabin suited to long continental and intercontinental private travel.",
    fullDescription: "The Falcon 900 offers a heavy cabin with the flexibility many private travellers associate with the Falcon family. It is often requested for multi-city or longer leisure legs. We coordinate enquiries without asserting fleet ownership.",
    features: ["Spacious cabin", "Longer sectors", "Larger party travel"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "global-6000",
    name: "Global 6000",
    manufacturer: "Bombardier",
    aircraftType: "Ultra Long Range",
    passengerCapacity: 19,
    range: 6000,
    rangeUnit: "nm",
    displayPriority: 16,
    enquiryStatus: "On Request",
    shortDescription: "An ultra-long-range Global cabin for distant private journeys and larger travelling parties.",
    fullDescription: "The Global 6000 is considered when range, cabin volume and group comfort are central to the brief. It supports longer sectors with space to rest and work. Access is arranged through authorised aviation partners for each confirmed enquiry.",
    features: ["Intercontinental range", "Rest-capable cabin", "Long-sector composure"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "global-express",
    name: "Global Express",
    manufacturer: "Bombardier",
    aircraftType: "Ultra Long Range",
    passengerCapacity: 14,
    range: 6000,
    rangeUnit: "nm",
    displayPriority: 17,
    enquiryStatus: "On Request",
    shortDescription: "A long-range Global cabin with the presence for intercontinental private travel.",
    fullDescription: "The Global Express platform underpins many long-range private journeys. It suits parties who need cabin space and range in one aircraft. Exact series, configuration and availability are verified with operators before travel.",
    features: ["Intercontinental range", "Rest-capable cabin", "Long-sector composure"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "gulfstream-g280",
    name: "Gulfstream G280",
    manufacturer: "Gulfstream",
    aircraftType: "Super Midsize Jet",
    passengerCapacity: 10,
    range: 3600,
    rangeUnit: "nm",
    displayPriority: 18,
    enquiryStatus: "On Request",
    shortDescription: "A super-midsize Gulfstream for efficient medium-haul travel with a composed cabin feel.",
    fullDescription: "The Gulfstream G280 is frequently assessed for regional and continental private travel when travellers want Gulfstream cabin character without an ultra-long-range footprint. We arrange options through qualified partners based on route and party size.",
    features: ["Extended range", "Composed cabin", "Continental capability"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "gulfstream-g450",
    name: "Gulfstream G450",
    manufacturer: "Gulfstream",
    aircraftType: "Heavy Jet",
    passengerCapacity: 16,
    range: 4350,
    rangeUnit: "nm",
    displayPriority: 19,
    enquiryStatus: "On Request",
    shortDescription: "A heavy Gulfstream cabin for long private journeys with a familiar, settled interior character.",
    fullDescription: "The Gulfstream G450 remains a strong choice for transcontinental private travel. Its cabin supports larger parties with room to move and rest. Aircraft, crew and timings are confirmed by authorised operators; nothing is assumed until agreed.",
    features: ["Spacious cabin", "Longer sectors", "Larger party travel"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "gulfstream-g550",
    name: "Gulfstream G550",
    manufacturer: "Gulfstream",
    aircraftType: "Ultra Long Range",
    passengerCapacity: 19,
    range: 6750,
    rangeUnit: "nm",
    displayPriority: 20,
    enquiryStatus: "On Request",
    shortDescription: "An ultra-long-range Gulfstream for distant destinations, with a cabin arranged for extended travel.",
    fullDescription: "The Gulfstream G550 is often requested for intercontinental private itineraries. It balances range with a cabin that can be shaped for rest and conversation. We present it as available on request through our aviation service, subject to confirmation.",
    features: ["Intercontinental range", "Rest-capable cabin", "Long-sector composure"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "gulfstream-g650",
    name: "Gulfstream G650",
    manufacturer: "Gulfstream",
    aircraftType: "Ultra Long Range",
    passengerCapacity: 19,
    range: 7000,
    rangeUnit: "nm",
    displayPriority: 21,
    enquiryStatus: "On Request",
    shortDescription: "A flagship ultra-long-range Gulfstream for the most distant private journeys.",
    fullDescription: "The Gulfstream G650 is considered when travellers need maximum range and a spacious cabin for long sectors. Configuration and availability vary widely by airframe. Private Luxury Holidays coordinates the enquiry with authorised partners and confirms every detail before travel.",
    features: ["Intercontinental range", "Rest-capable cabin", "Long-sector composure"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "gulfstream-giv-sp",
    name: "Gulfstream GIV-SP",
    manufacturer: "Gulfstream",
    aircraftType: "Heavy Jet",
    passengerCapacity: 14,
    range: 4220,
    rangeUnit: "nm",
    displayPriority: 22,
    enquiryStatus: "On Request",
    shortDescription: "A proven heavy Gulfstream for long private sectors with a spacious, established cabin.",
    fullDescription: "The Gulfstream GIV-SP continues to serve private travellers who need heavy-cabin comfort on longer routes. It suits groups who prefer a known platform and generous interior volume. Access is arranged case by case through qualified operators.",
    features: ["Spacious cabin", "Longer sectors", "Larger party travel"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "hawker-1000",
    name: "Hawker 1000",
    manufacturer: "Hawker",
    aircraftType: "Midsize Jet",
    passengerCapacity: 8,
    range: 3098,
    rangeUnit: "nm",
    displayPriority: 23,
    enquiryStatus: "On Request",
    shortDescription: "A midsize Hawker cabin for composed regional and medium-haul private travel.",
    fullDescription: "The Hawker 1000 offers a midsize interior suited to travellers who favour a quieter, established cabin. It is often considered for continental legs where seating comfort matters. Availability and specifications are confirmed with operators for each enquiry.",
    features: ["Stand-up cabin comfort", "Medium-haul flexibility", "Group seating"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "hawker-4000",
    name: "Hawker 4000",
    manufacturer: "Hawker",
    aircraftType: "Super Midsize Jet",
    passengerCapacity: 8,
    range: 3280,
    rangeUnit: "nm",
    displayPriority: 24,
    enquiryStatus: "On Request",
    shortDescription: "A super-midsize Hawker for medium-to-long private journeys with a calm cabin atmosphere.",
    fullDescription: "The Hawker 4000 sits in the super-midsize category, useful when parties need more cabin and range than a light jet. We coordinate requests through authorised aviation partners without claiming owned inventory.",
    features: ["Extended range", "Composed cabin", "Continental capability"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "hawker-400xp",
    name: "Hawker 400XP",
    manufacturer: "Hawker",
    aircraftType: "Light Jet",
    passengerCapacity: 7,
    range: 1350,
    rangeUnit: "nm",
    displayPriority: 25,
    enquiryStatus: "On Request",
    shortDescription: "A light jet for efficient short-to-medium hops with a practical private cabin.",
    fullDescription: "The Hawker 400XP is typically requested for regional private travel where timing and simplicity come first. It suits smaller parties moving between cities or secondary airports. Routing and aircraft confirmation remain with the operating partner.",
    features: ["Regional access", "Efficient short-to-medium sectors", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "hawker-800xp",
    name: "Hawker 800XP",
    manufacturer: "Hawker",
    aircraftType: "Midsize Jet",
    passengerCapacity: 8,
    range: 2540,
    rangeUnit: "nm",
    displayPriority: 26,
    enquiryStatus: "On Request",
    shortDescription: "A midsize Hawker cabin for regional and continental private journeys.",
    fullDescription: "The Hawker 800XP remains a familiar midsize choice for private travellers. Its cabin supports comfortable seating for modest group sizes on medium sectors. We arrange enquiries through qualified brokers and operators.",
    features: ["Stand-up cabin comfort", "Medium-haul flexibility", "Group seating"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "king-air-350",
    name: "King Air 350",
    manufacturer: "Beechcraft",
    aircraftType: "Turboprop",
    passengerCapacity: 11,
    range: 1800,
    rangeUnit: "nm",
    displayPriority: 27,
    enquiryStatus: "On Request",
    shortDescription: "A spacious turboprop for regional access, often reaching airports closer to the final stay.",
    fullDescription: "The King Air 350 is valued for private regional travel where runway length or airport choice matters. Its cabin can seat larger parties than many light jets while retaining turboprop flexibility. Availability is confirmed through authorised operators for each brief.",
    features: ["Short-field access", "Regional flexibility", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "king-air-90",
    name: "King Air 90",
    manufacturer: "Beechcraft",
    aircraftType: "Turboprop",
    passengerCapacity: 7,
    range: 1321,
    rangeUnit: "nm",
    displayPriority: 28,
    enquiryStatus: "On Request",
    shortDescription: "A classic King Air turboprop for short regional hops and access-led private travel.",
    fullDescription: "The King Air 90 suits travellers who need practical regional connectivity with a private cabin. It is often considered for shorter sectors and airfields that larger jets cannot use efficiently. We present it as a requestable type, subject to confirmation.",
    features: ["Short-field access", "Regional flexibility", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "learjet-35",
    name: "Learjet 35",
    manufacturer: "Bombardier",
    aircraftType: "Light Jet",
    passengerCapacity: 8,
    range: 2056,
    rangeUnit: "nm",
    displayPriority: 29,
    enquiryStatus: "On Request",
    shortDescription: "A light Learjet for pace-focused regional travel with a compact private cabin.",
    fullDescription: "The Learjet 35 is typically assessed for efficient short-to-medium private sectors. Its cabin suits smaller parties who prioritise schedule over interior volume. Aircraft and routing are confirmed by authorised operators.",
    features: ["Regional access", "Efficient short-to-medium sectors", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "learjet-40xr",
    name: "Learjet 40XR",
    manufacturer: "Bombardier",
    aircraftType: "Light Jet",
    range: 1991,
    rangeUnit: "nm",
    displayPriority: 30,
    enquiryStatus: "On Request",
    shortDescription: "A light Learjet cabin arranged for efficient regional private journeys.",
    fullDescription: "The Learjet 40XR offers a light-jet profile for travellers seeking timely regional connections. Exact passenger capacity and configuration vary by airframe; we leave unsupported numbers blank and confirm details with the operator before proposing a flight.",
    features: ["Regional access", "Efficient short-to-medium sectors", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "learjet-45",
    name: "Learjet 45",
    manufacturer: "Bombardier",
    aircraftType: "Light Jet",
    passengerCapacity: 8,
    range: 1971,
    rangeUnit: "nm",
    displayPriority: 31,
    enquiryStatus: "On Request",
    shortDescription: "A light-to-midsize Learjet for composed regional travel with a practical cabin layout.",
    fullDescription: "The Learjet 45 is often considered when travellers want Learjet performance with a usable cabin for small groups. It suits sequential city days and leisure connections. Access is arranged on request through our private aviation service.",
    features: ["Regional access", "Efficient short-to-medium sectors", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "learjet-60xr",
    name: "Learjet 60XR",
    manufacturer: "Bombardier",
    aircraftType: "Midsize Jet",
    displayPriority: 32,
    enquiryStatus: "On Request",
    shortDescription: "A midsize Learjet for medium-haul private travel with a more spacious cabin than lighter Learjets.",
    fullDescription: "The Learjet 60XR sits in the midsize category for parties needing more cabin room on regional and continental legs. Detailed specifications for this type were not confidently available from the public reference page used for this collection; fields are left blank where unverified. We confirm all facts with operators before travel.",
    features: ["Stand-up cabin comfort", "Medium-haul flexibility", "Group seating"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "legacy-450",
    name: "Legacy 450",
    manufacturer: "Embraer",
    aircraftType: "Midsize Jet",
    passengerCapacity: 7,
    range: 2904,
    rangeUnit: "nm",
    displayPriority: 33,
    enquiryStatus: "On Request",
    shortDescription: "An Embraer midsize cabin with a contemporary feel for medium-haul private journeys.",
    fullDescription: "The Legacy 450 is often requested for continental private travel when travellers want a modern midsize interior. It suits couples and small groups who value cabin height and composure. Availability is confirmed through authorised partners.",
    features: ["Stand-up cabin comfort", "Medium-haul flexibility", "Group seating"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "legacy-600",
    name: "Legacy 600",
    manufacturer: "Embraer",
    aircraftType: "Heavy Jet",
    passengerCapacity: 13,
    range: 3400,
    rangeUnit: "nm",
    displayPriority: 34,
    enquiryStatus: "On Request",
    shortDescription: "A heavy Embraer cabin for longer private sectors and larger travelling parties.",
    fullDescription: "The Legacy 600 provides heavy-cabin space for groups who prefer to travel together on longer routes. It is assessed against passenger count, baggage and preferred airports. We coordinate the enquiry without claiming ownership of the aircraft.",
    features: ["Spacious cabin", "Longer sectors", "Larger party travel"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "legacy-650",
    name: "Legacy 650",
    manufacturer: "Embraer",
    aircraftType: "Heavy Jet",
    passengerCapacity: 13,
    range: 3900,
    rangeUnit: "nm",
    displayPriority: 35,
    enquiryStatus: "On Request",
    shortDescription: "An extended Legacy heavy cabin for longer-range private travel with room to settle.",
    fullDescription: "The Legacy 650 builds on the Legacy heavy-cabin idea for parties needing more range and interior volume. It is typically considered for multi-country or longer leisure itineraries. Confirmation rests with the operating partner.",
    features: ["Spacious cabin", "Longer sectors", "Larger party travel"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "phenom-300",
    name: "Phenom 300",
    manufacturer: "Embraer",
    aircraftType: "Light Jet",
    passengerCapacity: 9,
    range: 2010,
    rangeUnit: "nm",
    displayPriority: 36,
    enquiryStatus: "On Request",
    shortDescription: "A popular light jet for regional private travel, balancing cabin comfort with efficient access.",
    fullDescription: "The Phenom 300 is frequently chosen for short-to-medium private sectors. Its cabin suits smaller parties who want a contemporary light-jet experience. Through Private Luxury Holidays, this type may be requested subject to operator confirmation.",
    features: ["Regional access", "Efficient short-to-medium sectors", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "pilatus-pc-12",
    name: "Pilatus PC-12",
    manufacturer: "Pilatus",
    aircraftType: "Turboprop",
    passengerCapacity: 9,
    range: 1800,
    rangeUnit: "nm",
    displayPriority: 37,
    enquiryStatus: "On Request",
    shortDescription: "A single-engine turboprop prized for access to shorter runways and discreet regional arrival.",
    fullDescription: "The Pilatus PC-12 is valued when the journey ends closer to a villa, resort or secondary airfield. Its cabin supports flexible seating for private parties, and its field performance often shapes the itinerary as much as cabin size. We arrange access through qualified operators.",
    features: ["Short-field access", "Regional flexibility", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "piaggio-avanti-ii",
    name: "Piaggio Avanti II",
    manufacturer: "Piaggio",
    aircraftType: "Turboprop",
    range: 1500,
    rangeUnit: "nm",
    displayPriority: 38,
    enquiryStatus: "On Request",
    shortDescription: "A distinctive twin-turboprop cabin for efficient regional private travel.",
    fullDescription: "The Piaggio Avanti II offers a unique cabin profile for travellers seeking turboprop efficiency with a private, stand-up interior feel on regional routes. Exact passenger figures vary by configuration; we confirm details with operators and leave unverified numbers blank.",
    features: ["Short-field access", "Regional flexibility", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "praetor-600",
    name: "Praetor 600",
    manufacturer: "Embraer",
    aircraftType: "Super Midsize Jet",
    passengerCapacity: 12,
    range: 4018,
    rangeUnit: "nm",
    displayPriority: 39,
    enquiryStatus: "On Request",
    shortDescription: "A super-midsize Embraer cabin for longer private journeys with a refined onboard atmosphere.",
    fullDescription: "The Praetor 600 is often assessed for medium-to-long private sectors when travellers want super-midsize range and cabin comfort. It suits groups who need more space than a light jet without moving to a VIP airliner. Availability is arranged on request.",
    features: ["Extended range", "Composed cabin", "Continental capability"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "tbm-930",
    name: "TBM 930",
    manufacturer: "Daher",
    aircraftType: "Turboprop",
    range: 1730,
    rangeUnit: "nm",
    displayPriority: 40,
    enquiryStatus: "On Request",
    shortDescription: "A high-performance single-engine turboprop for swift regional private hops.",
    fullDescription: "The TBM 930 suits travellers who prioritise speed and access on shorter private sectors. Its cabin is compact and purposeful. Passenger capacity depends on configuration; we confirm specifics with the operator rather than inventing figures.",
    features: ["Short-field access", "Regional flexibility", "Private cabin"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "boeing-bbj",
    name: "Boeing BBJ",
    manufacturer: "Boeing",
    aircraftType: "VIP Airliner",
    passengerCapacity: 19,
    range: 6000,
    rangeUnit: "nm",
    displayPriority: 41,
    enquiryStatus: "On Request",
    shortDescription: "A VIP airliner cabin for large parties and the most expansive private travel briefs.",
    fullDescription: "The Boeing Business Jet (BBJ) is considered when group size, cabin zoning or very long range define the journey. Interiors vary widely by completion. Private Luxury Holidays coordinates enquiries through authorised partners; we do not claim to own or operate BBJ aircraft.",
    features: ["Airliner-scale cabin", "Large party capability", "Custom interior options"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  },
  {
    slug: "airbus-acj319",
    name: "Airbus ACJ319",
    manufacturer: "Airbus",
    aircraftType: "VIP Airliner",
    displayPriority: 42,
    enquiryStatus: "On Request",
    shortDescription: "An Airbus corporate jet for large private parties seeking an airliner-scale cabin.",
    fullDescription: "The Airbus ACJ319 is typically requested for substantial groups or highly customised VIP interiors. Public detail pages used for this seed did not yield confidently verified passenger or range figures for our records; those fields remain blank. Exact aircraft and configuration are confirmed with operators before any proposal.",
    features: ["Airliner-scale cabin", "Large party capability", "Custom interior options"],
    services: ["Charter enquiry", "Multi-sector planning", "Ground transfer coordination"],
  }
]

function deterministicId(slug: string): string {
  // Hyphenated IDs stay on the public root path.
  // Dotted IDs (privateJet.slug) are path-scoped and invisible to unauthenticated queries.
  return `privateJet-${slug}`
}

function legacyPathId(slug: string): string {
  return `privateJet.${slug}`
}

type ExistingJet = {
  _id: string
  name?: string
  slug?: string
  manufacturer?: string
  aircraftType?: string
  passengerCapacity?: number
  range?: number
  rangeUnit?: string
  displayPriority?: number
  enquiryStatus?: string
  shortDescription?: string
  fullDescription?: string
  features?: string[]
  services?: string[]
  heroImage?: unknown
}

function isBlank(value: unknown): boolean {
  if (value == null) return true
  if (typeof value === 'string' && value.trim() === '') return true
  if (Array.isArray(value) && value.length === 0) return true
  return false
}

async function main() {
  const existing = (await client.fetch(
    `*[_type == "privateJet"]{
      _id,
      name,
      "slug": slug.current,
      manufacturer,
      aircraftType,
      passengerCapacity,
      range,
      rangeUnit,
      displayPriority,
      enquiryStatus,
      shortDescription,
      fullDescription,
      features,
      services,
      heroImage
    }`,
  )) as ExistingJet[]

  const byId = new Map(existing.map((doc) => [doc._id, doc]))
  const bySlug = new Map<string, ExistingJet[]>()
  for (const doc of existing) {
    if (!doc.slug) continue
    const list = bySlug.get(doc.slug) || []
    list.push(doc)
    bySlug.set(doc.slug, list)
  }

  const created: string[] = []
  const updated: string[] = []
  const unchanged: string[] = []
  const migrated: string[] = []
  const deletedLegacy: string[] = []
  const duplicateWarnings: string[] = []
  const missingImages: string[] = []

  for (const item of JETS) {
    const id = deterministicId(item.slug)
    const legacyId = legacyPathId(item.slug)
    const matches = bySlug.get(item.slug) || []
    const publicDoc = byId.get(id) || matches.find((m) => m._id === id) || null
    const legacyDoc = byId.get(legacyId) || matches.find((m) => m._id === legacyId) || null

    if (matches.filter((m) => m._id !== legacyId).length > 1) {
      duplicateWarnings.push(
        `slug "${item.slug}" has ${matches.length} documents: ${matches.map((m) => m._id).join(', ')}`,
      )
    }

    // Migrate path-scoped IDs (privateJet.*) to public root IDs (privateJet-*).
    if (!publicDoc && legacyDoc) {
      const doc: Record<string, unknown> = {
        _id: id,
        _type: 'privateJet',
        name: legacyDoc.name || item.name,
        slug: {_type: 'slug', current: item.slug},
        featured: false,
        displayPriority: legacyDoc.displayPriority ?? item.displayPriority,
        enquiryStatus: legacyDoc.enquiryStatus || item.enquiryStatus,
        manufacturer: legacyDoc.manufacturer || item.manufacturer,
        aircraftType: legacyDoc.aircraftType || item.aircraftType,
        shortDescription: legacyDoc.shortDescription || item.shortDescription,
        fullDescription: legacyDoc.fullDescription || item.fullDescription,
        features: !isBlank(legacyDoc.features) ? legacyDoc.features : item.features,
        services: !isBlank(legacyDoc.services) ? legacyDoc.services : item.services,
        seoTitle: `${item.name} | Private Luxury Holidays`,
        seoDescription: legacyDoc.shortDescription || item.shortDescription,
      }
      const pax = legacyDoc.passengerCapacity ?? item.passengerCapacity
      const range = legacyDoc.range ?? item.range
      const rangeUnit = legacyDoc.rangeUnit || item.rangeUnit
      if (pax != null) doc.passengerCapacity = pax
      if (range != null) doc.range = range
      if (rangeUnit) doc.rangeUnit = rangeUnit
      if (legacyDoc.heroImage) doc.heroImage = legacyDoc.heroImage

      await client.createOrReplace(doc)
      await client.delete(legacyId)
      migrated.push(`${item.name}: ${legacyId} → ${id}`)
      deletedLegacy.push(legacyId)
      if (isBlank(legacyDoc.heroImage)) missingImages.push(item.name)
      continue
    }

    if (publicDoc) {
      const patch: Record<string, unknown> = {}
      // Preserve manually edited content: only fill blank fields.
      if (isBlank(publicDoc.name)) patch.name = item.name
      if (isBlank(publicDoc.manufacturer)) patch.manufacturer = item.manufacturer
      if (isBlank(publicDoc.aircraftType)) patch.aircraftType = item.aircraftType
      if (isBlank(publicDoc.passengerCapacity) && item.passengerCapacity != null) {
        patch.passengerCapacity = item.passengerCapacity
      }
      if (isBlank(publicDoc.range) && item.range != null) patch.range = item.range
      if (isBlank(publicDoc.rangeUnit) && item.rangeUnit) patch.rangeUnit = item.rangeUnit
      if (isBlank(publicDoc.displayPriority)) patch.displayPriority = item.displayPriority
      if (isBlank(publicDoc.enquiryStatus)) patch.enquiryStatus = item.enquiryStatus
      if (isBlank(publicDoc.shortDescription)) patch.shortDescription = item.shortDescription
      if (isBlank(publicDoc.fullDescription)) patch.fullDescription = item.fullDescription
      if (isBlank(publicDoc.features)) patch.features = item.features
      if (isBlank(publicDoc.services)) patch.services = item.services
      if (!publicDoc.slug) patch.slug = {_type: 'slug', current: item.slug}

      if (Object.keys(patch).length) {
        await client.patch(publicDoc._id).set(patch).commit()
        updated.push(`${item.name} (${publicDoc._id})`)
      } else {
        unchanged.push(`${item.name} (${publicDoc._id})`)
      }
      if (isBlank(publicDoc.heroImage)) missingImages.push(item.name)

      // Clean up leftover path-scoped duplicate if both exist.
      if (legacyDoc) {
        await client.delete(legacyId)
        deletedLegacy.push(legacyId)
      }
      continue
    }

    const doc: Record<string, unknown> = {
      _id: id,
      _type: 'privateJet',
      name: item.name,
      slug: {_type: 'slug', current: item.slug},
      featured: false,
      displayPriority: item.displayPriority,
      enquiryStatus: item.enquiryStatus,
      manufacturer: item.manufacturer,
      aircraftType: item.aircraftType,
      shortDescription: item.shortDescription,
      fullDescription: item.fullDescription,
      features: item.features,
      services: item.services,
      seoTitle: `${item.name} | Private Luxury Holidays`,
      seoDescription: item.shortDescription,
    }
    if (item.passengerCapacity != null) doc.passengerCapacity = item.passengerCapacity
    if (item.range != null) doc.range = item.range
    if (item.rangeUnit) doc.rangeUnit = item.rangeUnit

    await client.createOrReplace(doc)
    created.push(`${item.name} (${id})`)
    missingImages.push(item.name)
  }

  const after = (await client.fetch(`count(*[_type == "privateJet"])`)) as number
  const publicCount = (await client.fetch(
    `count(*[_type == "privateJet" && !string::startsWith(_id, "privateJet.")])`,
  )) as number

  console.log('\n=== Private Jet seed summary ===')
  console.log(`Created:   ${created.length}`)
  created.forEach((line) => console.log(`  + ${line}`))
  console.log(`Migrated:  ${migrated.length}`)
  migrated.forEach((line) => console.log(`  → ${line}`))
  console.log(`Updated:   ${updated.length}`)
  updated.forEach((line) => console.log(`  ~ ${line}`))
  console.log(`Unchanged: ${unchanged.length}`)
  unchanged.forEach((line) => console.log(`  = ${line}`))
  if (deletedLegacy.length) {
    console.log(`\nDeleted legacy path-scoped IDs (not publicly queryable): ${deletedLegacy.length}`)
    deletedLegacy.forEach((line) => console.log(`  x ${line}`))
  }
  if (duplicateWarnings.length) {
    console.log('Duplicate slugs:')
    duplicateWarnings.forEach((line) => console.log(`  ! ${line}`))
  }
  console.log(`\nPrivate Jet documents in dataset: ${after} (public-path IDs: ${publicCount})`)
  console.log(`\nAircraft needing licensed imagery (${missingImages.length}):`)
  missingImages.forEach((name) => console.log(`  - ${name}`))
  console.log('\nNote: heroImage left empty deliberately. Upload licensed photos in Studio.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
