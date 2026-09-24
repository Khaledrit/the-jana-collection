/**
 * GROQ + fetch for published Private Island documents.
 */
import { sanityClient } from './sanityClient.js';
import { objectPositionFromHotspot, urlForImage } from './sanityImage.js';
import { mapGallery, sortCollectionItems } from './collectionHelpers.js';

/** Private island cards match villa portrait treatment (4:5 CDN crop). */
const ISLAND_CARD_WIDTH = 900;
const ISLAND_CARD_HEIGHT = 1125; // 4:5

export const PRIVATE_ISLANDS_QUERY = `*[_type == "privateIsland" && defined(slug.current)] | order(coalesce(displayPriority, 9999) asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  country,
  locationAtoll,
  parentResort,
  heroImage{ hotspot, crop, asset->{ _id, url, metadata { dimensions } } },
  gallery[]{ hotspot, crop, asset->{ _id, url, metadata { dimensions } } },
  shortDescription,
  fullDescription,
  experienceType,
  bedrooms,
  maxGuests,
  residenceSize,
  residenceSizeUnit,
  perfectFor,
  janaHighlight,
  features,
  featured,
  displayPriority,
  enquiryStatus
}`;

export async function fetchSanityPrivateIslands() {
  const rows = await sanityClient.fetch(PRIVATE_ISLANDS_QUERY);
  return (Array.isArray(rows) ? rows : []).map(mapSanityPrivateIsland).filter(Boolean);
}

export function mapSanityPrivateIsland(doc) {
  if (!doc?.slug || !doc?.name) return null;
  const media = mapGallery(doc, urlForImage);
  const cardImage = doc.heroImage
    ? urlForImage(doc.heroImage, {
        width: ISLAND_CARD_WIDTH,
        height: ISLAND_CARD_HEIGHT,
        quality: 84
      })
    : '';

  const metaParts = [
    doc.experienceType || null,
    doc.bedrooms != null ? `${doc.bedrooms} Bedroom${doc.bedrooms === 1 ? '' : 's'}` : null,
    doc.maxGuests != null ? `Up to ${doc.maxGuests} Guests` : null
  ].filter(Boolean);

  const sizeLabel =
    doc.residenceSize != null && doc.residenceSizeUnit
      ? `${formatSize(doc.residenceSize)} ${doc.residenceSizeUnit}`
      : doc.residenceSize != null
        ? String(doc.residenceSize)
        : '';

  return {
    kind: 'island',
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    ...media,
    cardImage: cardImage || media.heroImage || '',
    heroObjectPosition: objectPositionFromHotspot(doc.heroImage),
    place: doc.parentResort || '',
    meta: metaParts.join(' · '),
    country: doc.country || '',
    locationAtoll: doc.locationAtoll || '',
    parentResort: doc.parentResort || '',
    experienceType: doc.experienceType || '',
    bedrooms: doc.bedrooms ?? null,
    maxGuests: doc.maxGuests ?? null,
    residenceSize: doc.residenceSize ?? null,
    residenceSizeUnit: doc.residenceSizeUnit || '',
    residenceSizeLabel: sizeLabel,
    cardLocation: formatIslandCardLocation(doc),
    shortIntro: doc.shortDescription || '',
    description: doc.fullDescription || '',
    perfectFor: (doc.perfectFor || []).filter(Boolean),
    janaHighlight: doc.janaHighlight || '',
    features: (doc.features || []).filter(Boolean),
    featured: Boolean(doc.featured),
    displayPriority: doc.displayPriority ?? null,
    enquiryStatus: doc.enquiryStatus || ''
  };
}

function formatIslandCardLocation(doc) {
  const country = (doc.country || '').trim();
  const location = (doc.locationAtoll || '').trim();
  if (country && location) return `${country} · ${location}`;
  return country || location;
}

function formatSize(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return String(value);
  return new Intl.NumberFormat('en-GB').format(n);
}

let cached = null;

/** Published private islands only. Empty array on success with no docs — no mock fallback. */
export async function getPrivateIslands() {
  if (cached) return cached;
  cached = await fetchSanityPrivateIslands();
  return cached;
}

export async function getCollectionPrivateIslands() {
  return sortCollectionItems(await getPrivateIslands());
}

export async function getPrivateIslandBySlug(slug) {
  const all = await getPrivateIslands();
  return all.find(item => item.slug === slug);
}
