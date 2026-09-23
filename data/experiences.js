/**
 * GROQ + fetch for published Experience documents.
 */
import { sanityClient } from './sanityClient.js';
import { urlForImage } from './sanityImage.js';
import { mapGallery, sortCollectionItems } from './collectionHelpers.js';

export const EXPERIENCES_QUERY = `*[_type == "experience" && defined(slug.current)] | order(coalesce(displayPriority, 9999) asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  heroImage{ hotspot, crop, asset->{ _id, url, metadata { dimensions } } },
  gallery[]{ hotspot, crop, asset->{ _id, url, metadata { dimensions } } },
  destination->{ name, country, region },
  shortDescription,
  fullDescription,
  experienceType,
  duration,
  location,
  highlights,
  inclusions,
  featured,
  displayPriority,
  enquiryStatus
}`;

export async function fetchSanityExperiences() {
  const rows = await sanityClient.fetch(EXPERIENCES_QUERY);
  return (Array.isArray(rows) ? rows : []).map(mapSanityExperience).filter(Boolean);
}

export function mapSanityExperience(doc) {
  if (!doc?.slug || !doc?.name) return null;
  const media = mapGallery(doc, urlForImage);
  const destinationName = doc.destination?.name || '';
  const place = [
    destinationName,
    doc.location,
    doc.destination?.region,
    doc.destination?.country
  ].filter(Boolean);
  // Prefer destination + location without duplicating
  const uniquePlace = [...new Set(place)].join(' · ');

  const metaParts = [
    destinationName || doc.location || null,
    doc.duration || null,
    doc.experienceType || null
  ].filter(Boolean);

  return {
    kind: 'experience',
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    ...media,
    place: uniquePlace,
    meta: metaParts.join(' · '),
    destination: destinationName,
    experienceType: doc.experienceType || '',
    duration: doc.duration || '',
    location: doc.location || '',
    shortIntro: doc.shortDescription || '',
    description: doc.fullDescription || '',
    highlights: (doc.highlights || []).filter(Boolean),
    inclusions: (doc.inclusions || []).filter(Boolean),
    featured: Boolean(doc.featured),
    displayPriority: doc.displayPriority ?? null,
    enquiryStatus: doc.enquiryStatus || ''
  };
}

let cached = null;

/** Published experiences only. Empty array on success with no docs — no mock fallback. */
export async function getExperiences() {
  if (cached) return cached;
  cached = await fetchSanityExperiences();
  return cached;
}

export async function getCollectionExperiences() {
  return sortCollectionItems(await getExperiences());
}

export async function getExperienceBySlug(slug) {
  const all = await getExperiences();
  return all.find(item => item.slug === slug);
}
