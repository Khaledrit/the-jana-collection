/**
 * GROQ + fetch for published Yacht documents.
 */
import { sanityClient } from './sanityClient.js';
import { urlForImage } from './sanityImage.js';
import { mapGallery, sortCollectionItems } from './collectionHelpers.js';

export const YACHTS_QUERY = `*[_type == "yacht" && defined(slug.current)] | order(coalesce(displayPriority, 9999) asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  heroImage{ hotspot, crop, asset->{ _id, url, metadata { dimensions } } },
  gallery[]{ hotspot, crop, asset->{ _id, url, metadata { dimensions } } },
  shortDescription,
  fullDescription,
  builder,
  yachtType,
  length,
  lengthUnit,
  cabins,
  maxGuests,
  crew,
  marina,
  cruisingArea,
  startingPrice,
  currency,
  pricingPeriod,
  minimumBookingHours,
  amenities,
  services,
  featured,
  displayPriority,
  enquiryStatus
}`;

export async function fetchSanityYachts() {
  const rows = await sanityClient.fetch(YACHTS_QUERY);
  return (Array.isArray(rows) ? rows : []).map(mapSanityYacht).filter(Boolean);
}

export function mapSanityYacht(doc) {
  if (!doc?.slug || !doc?.name) return null;
  const media = mapGallery(doc, urlForImage);
  const lengthLabel =
    doc.length != null && doc.lengthUnit
      ? `${doc.length} ${doc.lengthUnit}`
      : doc.length != null
        ? String(doc.length)
        : '';

  const metaParts = [
    lengthLabel || null,
    doc.maxGuests != null ? `${doc.maxGuests} Guests` : null,
    doc.cabins != null ? `${doc.cabins} Cabins` : null
  ].filter(Boolean);

  return {
    kind: 'yacht',
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    ...media,
    place: doc.builder || doc.yachtType || '',
    meta: metaParts.join(' · '),
    priceLabel: formatYachtPrice(doc),
    builder: doc.builder || '',
    yachtType: doc.yachtType || '',
    lengthLabel,
    cabins: doc.cabins ?? null,
    maxGuests: doc.maxGuests ?? null,
    crew: doc.crew ?? null,
    marina: doc.marina || '',
    cruisingArea: doc.cruisingArea || '',
    locationLabel: [doc.marina, doc.cruisingArea].filter(Boolean).join(' · '),
    startingPrice: doc.startingPrice ?? null,
    currency: doc.currency || '',
    pricingPeriod: doc.pricingPeriod || '',
    minimumBookingHours: doc.minimumBookingHours ?? null,
    minimumBookingLabel: formatMinimumBooking(doc.minimumBookingHours),
    shortIntro: doc.shortDescription || '',
    description: doc.fullDescription || '',
    amenities: (doc.amenities || []).filter(Boolean),
    services: (doc.services || []).filter(Boolean),
    featured: Boolean(doc.featured),
    displayPriority: doc.displayPriority ?? null,
    enquiryStatus: doc.enquiryStatus || ''
  };
}

function formatYachtPrice(doc) {
  if (doc.pricingPeriod === 'on request' || doc.startingPrice == null || !doc.currency) {
    if (doc.pricingPeriod === 'on request' || doc.enquiryStatus === 'On Request') {
      return doc.startingPrice == null ? 'On request' : '';
    }
    return '';
  }
  const amount = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: doc.currency,
    maximumFractionDigits: 0
  }).format(doc.startingPrice);
  const period = doc.pricingPeriod === 'day' ? 'day' : 'hour';
  return `From ${amount} / ${period}`;
}

function formatMinimumBooking(hours) {
  if (hours == null) return '';
  if (hours === 24) return 'Minimum 24 hours';
  if (hours === 1) return 'Minimum 1 hour';
  return `Minimum ${hours} hours`;
}

let cached = null;

/** Published yachts only. Empty array on success with no docs — no mock fallback. */
export async function getYachts() {
  if (cached) return cached;
  cached = await fetchSanityYachts();
  return cached;
}

export async function getCollectionYachts() {
  return sortCollectionItems(await getYachts());
}

export async function getYachtBySlug(slug) {
  const all = await getYachts();
  return all.find(item => item.slug === slug);
}
