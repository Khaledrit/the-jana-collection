/**
 * GROQ + fetch for published Private Jet documents.
 */
import { sanityClient } from './sanityClient.js';
import { urlForImage } from './sanityImage.js';
import { mapGallery, sortCollectionItems } from './collectionHelpers.js';

export const PRIVATE_JETS_QUERY = `*[_type == "privateJet" && defined(slug.current)] | order(coalesce(displayPriority, 9999) asc, name asc) {
  _id,
  name,
  "slug": slug.current,
  heroImage{ hotspot, crop, asset->{ _id, url, metadata { dimensions } } },
  gallery[]{ hotspot, crop, asset->{ _id, url, metadata { dimensions } } },
  shortDescription,
  fullDescription,
  aircraftType,
  manufacturer,
  passengerCapacity,
  range,
  rangeUnit,
  homeBase,
  features,
  services,
  featured,
  displayPriority,
  enquiryStatus
}`;

export async function fetchSanityPrivateJets() {
  const rows = await sanityClient.fetch(PRIVATE_JETS_QUERY);
  return (Array.isArray(rows) ? rows : []).map(mapSanityPrivateJet).filter(Boolean);
}

export function mapSanityPrivateJet(doc) {
  if (!doc?.slug || !doc?.name) return null;
  const media = mapGallery(doc, urlForImage);
  const rangeLabel =
    doc.range != null && doc.rangeUnit
      ? `${doc.range} ${doc.rangeUnit}`
      : doc.range != null
        ? String(doc.range)
        : '';

  const metaParts = [
    doc.passengerCapacity != null ? `${doc.passengerCapacity} Passengers` : null,
    doc.aircraftType || null,
    rangeLabel || null
  ].filter(Boolean);

  return {
    kind: 'jet',
    id: doc._id,
    name: doc.name,
    slug: doc.slug,
    ...media,
    place: [doc.manufacturer, doc.homeBase].filter(Boolean).join(' · '),
    meta: metaParts.join(' · '),
    aircraftType: doc.aircraftType || '',
    manufacturer: doc.manufacturer || '',
    passengerCapacity: doc.passengerCapacity ?? null,
    rangeLabel,
    homeBase: doc.homeBase || '',
    shortIntro: doc.shortDescription || '',
    description: doc.fullDescription || '',
    features: (doc.features || []).filter(Boolean),
    services: (doc.services || []).filter(Boolean),
    featured: Boolean(doc.featured),
    displayPriority: doc.displayPriority ?? null,
    enquiryStatus: doc.enquiryStatus || ''
  };
}

let cached = null;

/** Published jets only. Empty array on success with no docs — no mock fallback. */
export async function getPrivateJets() {
  if (cached) return cached;
  cached = await fetchSanityPrivateJets();
  return cached;
}

export async function getCollectionPrivateJets() {
  return sortCollectionItems(await getPrivateJets());
}

export async function getPrivateJetBySlug(slug) {
  const all = await getPrivateJets();
  return all.find(item => item.slug === slug);
}
