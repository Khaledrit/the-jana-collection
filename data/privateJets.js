/**
 * GROQ + fetch for published Private Jet documents.
 */
import { sanityClient } from './sanityClient.js';
import { objectPositionFromHotspot, urlForImage } from './sanityImage.js';
import { mapGallery, sortCollectionItems } from './collectionHelpers.js';

/** Jet card media is landscape — request CDN crop at this ratio so hotspot/crop apply. */
const JET_CARD_WIDTH = 1200;
const JET_CARD_HEIGHT = 800; // 3:2

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
  const cardImage = doc.heroImage
    ? urlForImage(doc.heroImage, {
        width: JET_CARD_WIDTH,
        height: JET_CARD_HEIGHT,
        quality: 84
      })
    : '';
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
    /** Landscape card URL (3:2 CDN crop with hotspot when set). Modal still uses heroImage/gallery. */
    cardImage: cardImage || media.heroImage || '',
    heroObjectPosition: objectPositionFromHotspot(doc.heroImage),
    place: [doc.manufacturer, doc.homeBase].filter(Boolean).join(' · '),
    meta: metaParts.join(' · '),
    aircraftType: doc.aircraftType || '',
    manufacturer: doc.manufacturer || '',
    passengerCapacity: doc.passengerCapacity ?? null,
    range: doc.range ?? null,
    rangeUnit: doc.rangeUnit || '',
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
