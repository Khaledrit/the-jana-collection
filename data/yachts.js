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
  yachtType,
  length,
  lengthUnit,
  cabins,
  maxGuests,
  crew,
  cruisingArea,
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
    doc.cabins != null ? `${doc.cabins} Cabins` : null,
    doc.maxGuests != null ? `${doc.maxGuests} Guests` : null,
    lengthLabel || null
  ].filter(Boolean);

  return {
    kind: 'yacht',
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    ...media,
    place: [doc.yachtType, doc.cruisingArea].filter(Boolean).join(' · '),
    meta: metaParts.join(' · '),
    yachtType: doc.yachtType || '',
    lengthLabel,
    cabins: doc.cabins ?? null,
    maxGuests: doc.maxGuests ?? null,
    crew: doc.crew ?? null,
    cruisingArea: doc.cruisingArea || '',
    shortIntro: doc.shortDescription || '',
    description: doc.fullDescription || '',
    amenities: (doc.amenities || []).filter(Boolean),
    services: (doc.services || []).filter(Boolean),
    featured: Boolean(doc.featured),
    displayPriority: doc.displayPriority ?? null,
    enquiryStatus: doc.enquiryStatus || ''
  };
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
