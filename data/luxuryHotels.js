/**
 * GROQ + fetch for published Luxury Hotel documents (The Collection).
 */
import { sanityClient } from './sanityClient.js';
import { objectPositionFromHotspot, urlForImage } from './sanityImage.js';
import { mapGallery, sortCollectionItems } from './collectionHelpers.js';

const HOTEL_CARD_WIDTH = 900;
const HOTEL_CARD_HEIGHT = 1125; // 4:5 — matches villa card media

export const LUXURY_HOTELS_QUERY = `*[_type == "luxuryHotel" && defined(slug.current)] | order(coalesce(displayPriority, 9999) asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  country,
  location,
  tagline,
  heroImage{ hotspot, crop, asset->{ _id, url, metadata { dimensions } } },
  gallery[]{ hotspot, crop, asset->{ _id, url, metadata { dimensions } } },
  shortDescription,
  fullDescription,
  perfectFor,
  whyJanaLovesIt,
  janaHighlight,
  experienceWithJana,
  signatureStays[]{
    name,
    description,
    bedrooms,
    maxGuests,
    size,
    sizeUnit,
    features
  },
  featured,
  displayPriority,
  enquiryStatus,
  seoTitle,
  seoDescription
}`;

export async function fetchSanityLuxuryHotels() {
  const rows = await sanityClient.fetch(LUXURY_HOTELS_QUERY);
  return (Array.isArray(rows) ? rows : []).map(mapSanityLuxuryHotel).filter(Boolean);
}

export function mapSanityLuxuryHotel(doc) {
  if (!doc?.slug || !doc?.name) return null;
  const media = mapGallery(doc, urlForImage);
  const cardImage = doc.heroImage
    ? urlForImage(doc.heroImage, {
        width: HOTEL_CARD_WIDTH,
        height: HOTEL_CARD_HEIGHT,
        quality: 84
      })
    : '';

  const placeParts = [doc.location, doc.country].filter(Boolean);
  const place =
    placeParts.length === 2 && placeParts[0].toLowerCase() === placeParts[1].toLowerCase()
      ? placeParts[1]
      : placeParts.join(' · ');

  const signatureStays = (doc.signatureStays || [])
    .filter(stay => stay?.name)
    .map(stay => {
      const sizeLabel =
        stay.size != null && stay.sizeUnit
          ? `${stay.size} ${stay.sizeUnit}`
          : stay.size != null
            ? String(stay.size)
            : '';
      return {
        name: stay.name,
        description: stay.description || '',
        bedrooms: stay.bedrooms ?? null,
        maxGuests: stay.maxGuests ?? null,
        size: stay.size ?? null,
        sizeUnit: stay.sizeUnit || '',
        sizeLabel,
        features: (stay.features || []).filter(Boolean)
      };
    });

  return {
    kind: 'hotel',
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    country: doc.country || '',
    location: doc.location || '',
    place,
    tagline: doc.tagline || '',
    meta: doc.tagline || '',
    ...media,
    cardImage: cardImage || media.heroImage || '',
    heroObjectPosition: objectPositionFromHotspot(doc.heroImage),
    shortIntro: doc.shortDescription || '',
    description: doc.fullDescription || doc.shortDescription || '',
    perfectFor: (doc.perfectFor || []).filter(Boolean),
    whyJanaLovesIt: doc.whyJanaLovesIt || '',
    janaHighlight: doc.janaHighlight || '',
    experienceWithJana: doc.experienceWithJana || '',
    signatureStays,
    featured: Boolean(doc.featured),
    displayPriority: doc.displayPriority ?? null,
    enquiryStatus: doc.enquiryStatus || '',
    seoTitle: doc.seoTitle || '',
    seoDescription: doc.seoDescription || ''
  };
}

let cached = null;

/** Published luxury hotels only. Empty array on success with no docs — no mock fallback. */
export async function getLuxuryHotels() {
  if (cached) return cached;
  cached = await fetchSanityLuxuryHotels();
  return cached;
}

export async function getCollectionLuxuryHotels() {
  return sortCollectionItems(await getLuxuryHotels());
}

export async function getLuxuryHotelBySlug(slug) {
  const all = await getLuxuryHotels();
  return all.find(item => item.slug === slug);
}
