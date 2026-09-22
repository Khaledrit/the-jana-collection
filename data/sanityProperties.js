/**
 * GROQ query + fetch for published Property documents.
 * Uses the official Sanity client (API, published perspective, no CDN).
 */
import { sanityClient } from './sanityClient.js';
import { urlForImage } from './sanityImage.js';

export const PROPERTIES_QUERY = `*[_type == "property" && defined(slug.current)] | order(coalesce(displayPriority, 9999) asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  heroImage{
    hotspot,
    crop,
    asset->{
      _id,
      url,
      metadata { dimensions }
    }
  },
  gallery[]{
    hotspot,
    crop,
    asset->{
      _id,
      url,
      metadata { dimensions }
    }
  },
  destination->{
    name,
    country,
    region
  },
  "propertyType": propertyType->name,
  bedrooms,
  bathrooms,
  maxGuests,
  propertySize,
  propertySizeUnit,
  startingPrice,
  currency,
  pricingPeriod,
  shortDescription,
  fullDescription,
  "amenities": amenities[]->name,
  services,
  locationDescription,
  featured,
  displayPriority,
  enquiryStatus
}`;

export async function fetchSanityProperties() {
  const rows = await sanityClient.fetch(PROPERTIES_QUERY);
  return (Array.isArray(rows) ? rows : []).map(mapSanityProperty).filter(Boolean);
}

/** Map a Sanity Property document into the existing UI property shape. */
export function mapSanityProperty(doc) {
  if (!doc?.slug || !doc?.name) return null;

  const heroImage = urlForImage(doc.heroImage, { width: 1600, quality: 84 });
  const gallery = (doc.gallery || [])
    .map(image => urlForImage(image, { width: 1400, quality: 84 }))
    .filter(Boolean);

  const size =
    doc.propertySize != null && doc.propertySizeUnit
      ? `${doc.propertySize} ${doc.propertySizeUnit}`
      : doc.propertySize != null
        ? String(doc.propertySize)
        : null;

  return {
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    heroImage: heroImage || '',
    gallery: gallery.length ? gallery : (heroImage ? [heroImage] : []),
    destination: doc.destination?.name || '',
    region: doc.destination?.region || '',
    country: doc.destination?.country || '',
    propertyType: doc.propertyType || '',
    bedrooms: doc.bedrooms ?? null,
    bathrooms: doc.bathrooms ?? null,
    maxGuests: doc.maxGuests ?? null,
    size,
    startingPrice: doc.startingPrice ?? null,
    currency: doc.currency || '',
    pricingPeriod: doc.pricingPeriod || 'week',
    featured: Boolean(doc.featured),
    displayPriority: doc.displayPriority ?? null,
    enquiryStatus: doc.enquiryStatus || '',
    shortIntro: doc.shortDescription || '',
    description: doc.fullDescription || '',
    amenities: (doc.amenities || []).filter(Boolean),
    services: (doc.services || []).filter(Boolean),
    locationNote: doc.locationDescription || ''
  };
}
