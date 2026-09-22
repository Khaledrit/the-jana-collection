/**
 * Temporary mock property records for the JANA Luxury Collection.
 * Shape mirrors the future Sanity document fields so the UI can swap sources later.
 * Images are temporary placeholders from existing project Unsplash usage.
 */
const img = (id, w = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=84`;

export const mockProperties = [
  {
    id: 'mock-chalet-example',
    name: 'Chalet Example',
    slug: 'chalet-example',
    heroImage: img('photo-1527668752968-14dc70a27c95', 2000),
    gallery: [
      img('photo-1527668752968-14dc70a27c95', 1400),
      img('photo-1600607687920-4e2a09cf159d', 1200),
      img('photo-1600607687939-ce8a6c25118c', 1200),
      img('photo-1499856871958-5b9627545d1a', 1200)
    ],
    destination: 'Courchevel',
    region: 'French Alps',
    country: 'France',
    propertyType: 'Chalet',
    bedrooms: 6,
    bathrooms: 6,
    maxGuests: 12,
    size: '780 m²',
    startingPrice: 18000,
    currency: 'EUR',
    pricingPeriod: 'week',
    featured: true,
    shortIntro: 'A quiet alpine residence above the village, shaped for long winter evenings and long views over the valley.',
    description: 'This temporary example presents how a Courchevel chalet might appear within the JANA Luxury Collection: generous living spaces, a considered bedroom arrangement, and an atmosphere that privileges privacy over spectacle. Final availability, services and access are confirmed directly with the relevant supplier for each enquiry.',
    amenities: ['Fireplace lounge', 'Private spa suite', 'Heated indoor pool', 'Ski room', 'Mountain views', 'Staff quarters'],
    services: ['Private chef on request', 'Daily housekeeping', 'Airport and resort transfers', 'Ski hosting and guiding introductions'],
    locationNote: 'Courchevel, French Alps. Positioned for discreet access to the slopes with village life a short, considered journey away.'
  },
  {
    id: 'mock-villa-mykonos',
    name: 'Villa Mykonos',
    slug: 'villa-mykonos',
    heroImage: img('photo-1533104816931-20fa691ff6ca', 2000),
    gallery: [
      img('photo-1533104816931-20fa691ff6ca', 1400),
      img('photo-1582268611958-ebfd161ef9cf', 1200),
      img('photo-1600607687920-4e2a09cf159d', 1200),
      img('photo-1510414842594-a61c69b5ae57', 1200)
    ],
    destination: 'Mykonos',
    region: 'Cyclades',
    country: 'Greece',
    propertyType: 'Villa',
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 10,
    size: '620 m²',
    startingPrice: 12000,
    currency: 'EUR',
    pricingPeriod: 'week',
    featured: true,
    shortIntro: 'Whitewashed volumes and open terraces facing the Aegean, arranged for unhurried days between sea, shade and evening light.',
    description: 'A temporary Mykonos villa example for the Collection: architectural calm, outdoor living, and enough space for a close circle of travellers. The presentation is editorial rather than inventory-led; every stay remains subject to dates, access and supplier confirmation.',
    amenities: ['Infinity pool', 'Outdoor dining terrace', 'Sea-facing suites', 'Indoor–outdoor living', 'Sunset lounge', 'Secure parking'],
    services: ['Private chef introductions', 'Concierge for boats and dining', 'Airport transfers', 'Housekeeping'],
    locationNote: 'Mykonos, Cyclades. Chosen for privacy relative to the island’s more animated coastline, with the sea always part of the composition.'
  },
  {
    id: 'mock-island-residence-maldives',
    name: 'Island Residence',
    slug: 'island-residence-maldives',
    heroImage: img('photo-1514282401047-d79a71a590e8', 2000),
    gallery: [
      img('photo-1514282401047-d79a71a590e8', 1400),
      img('photo-1540202404-a2f29016b523', 1200),
      img('photo-1573843981267-be1999ff37cd', 1200),
      img('photo-1499793983690-e29da59ef1c2', 1200)
    ],
    destination: 'Malé Atolls',
    region: 'North Malé',
    country: 'Maldives',
    propertyType: 'Island Residence',
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    size: '450 m²',
    startingPrice: 22000,
    currency: 'USD',
    pricingPeriod: 'week',
    featured: true,
    shortIntro: 'A lagoon-facing residence where morning begins with water, and the day can remain entirely within the island’s quiet perimeter.',
    description: 'This Maldives example shows how a private residence might sit within the Collection: reef and beach access, pool living, and a pace designed around rest rather than programmed activity. Transfer method, villa category and inclusions are always reconfirmed for travel dates.',
    amenities: ['Private pool', 'Beach access', 'Overwater deck', 'Outdoor dining', 'Butler pantry', 'Sunset pavilion'],
    services: ['In-villa dining', 'Marine experiences on request', 'Spa treatments arranged locally', 'Seaplane or speedboat transfer planning'],
    locationNote: 'Maldives atoll setting. Exact island and transfer arrange around the preferred villa and current flight connections.'
  },
  {
    id: 'mock-alpine-retreat-switzerland',
    name: 'Alpine Retreat',
    slug: 'alpine-retreat-switzerland',
    heroImage: img('photo-1464822759023-fed622ff2c3b', 2000),
    gallery: [
      img('photo-1464822759023-fed622ff2c3b', 1400),
      img('photo-1527668752968-14dc70a27c95', 1200),
      img('photo-1600607687939-ce8a6c25118c', 1200),
      img('photo-1499856871958-5b9627545d1a', 1200)
    ],
    destination: 'Engadin',
    region: 'Graubünden',
    country: 'Switzerland',
    propertyType: 'Chalet',
    bedrooms: 4,
    bathrooms: 4,
    maxGuests: 8,
    size: '390 m²',
    startingPrice: null,
    currency: 'CHF',
    pricingPeriod: 'week',
    featured: false,
    shortIntro: 'A precise mountain house for travellers who want alpine light, quiet mornings and evenings without spectacle.',
    description: 'A temporary Swiss alpine example: clean interiors, strong landscape presence, and a scale suited to family or friends travelling together. Pricing is intentionally omitted here to demonstrate optional fields; when published through a future CMS, starting rates can appear only when confirmed.',
    amenities: ['Panoramic lounge', 'Fireplace', 'Wellness bath', 'Boot room', 'Garden terrace', 'Garage'],
    services: ['Private driver introductions', 'Mountain guiding on request', 'Housekeeping', 'Rail and airport transfer planning'],
    locationNote: 'Engadin valley, Switzerland. A considered base for winter sport or summer walking, with logistics verified season by season.'
  }
];
