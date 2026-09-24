/**
 * GROQ + fetch for published Yacht documents.
 */
import { sanityClient } from './sanityClient.js';
import { objectPositionFromHotspot, urlForImage } from './sanityImage.js';
import { mapGallery, sortCollectionItems } from './collectionHelpers.js';

/** Yacht card media matches Private Jet landscape treatment (3:2 CDN crop). */
const YACHT_CARD_WIDTH = 1200;
const YACHT_CARD_HEIGHT = 800; // 3:2

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
  region,
  countries,
  cruisingArea,
  yearBuilt,
  yearRefit,
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
  const cardImage = doc.heroImage
    ? urlForImage(doc.heroImage, {
        width: YACHT_CARD_WIDTH,
        height: YACHT_CARD_HEIGHT,
        quality: 84
      })
    : '';
  const lengthLabel =
    doc.length != null && doc.lengthUnit
      ? `${doc.length} ${doc.lengthUnit}`
      : doc.length != null
        ? String(doc.length)
        : '';
  const length = doc.length != null ? Number(doc.length) : null;
  const lengthUnit = doc.lengthUnit || '';
  /** Normalize to feet for minimum-length filters when unit is metres. */
  const lengthFt =
    length == null
      ? null
      : lengthUnit === 'm'
        ? length * 3.28084
        : length;

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
    /** Landscape card URL (3:2 CDN crop with hotspot when set). Modal still uses heroImage/gallery. */
    cardImage: cardImage || media.heroImage || '',
    heroObjectPosition: objectPositionFromHotspot(doc.heroImage),
    place: doc.builder || doc.yachtType || '',
    meta: metaParts.join(' · '),
    priceLabel: formatYachtPrice(doc),
    builder: doc.builder || '',
    yachtType: doc.yachtType || '',
    length,
    lengthUnit,
    lengthFt,
    lengthLabel,
    cabins: doc.cabins ?? null,
    maxGuests: doc.maxGuests ?? null,
    crew: doc.crew ?? null,
    marina: doc.marina || '',
    region: doc.region || '',
    countries: normalizeCountries(doc.countries),
    cruisingArea: doc.cruisingArea || '',
    yearBuilt: doc.yearBuilt ?? null,
    yearRefit: doc.yearRefit ?? null,
    locationLabel: formatYachtLocationLabel(doc),
    cardLocation: formatYachtCardLocation(doc),
    countriesLabel: normalizeCountries(doc.countries).join(' · '),
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

function normalizeCountries(value) {
  if (Array.isArray(value)) return value.map(c => String(c || '').trim()).filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [value.trim()];
  return [];
}

/** Card line: home marina and/or countries — never invents a location. */
function formatYachtCardLocation(doc) {
  const countries = normalizeCountries(doc.countries);
  const countryLine = countries.join(' · ');
  if (doc.marina && countryLine) return `${doc.marina} · ${countryLine}`;
  if (doc.marina) return doc.marina;
  return countryLine;
}

/** Modal summary line kept for compatibility; prefer discrete stats. */
function formatYachtLocationLabel(doc) {
  return formatYachtCardLocation(doc);
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
  const period =
    doc.pricingPeriod === 'day' ? 'day'
    : doc.pricingPeriod === 'week' ? 'week'
    : 'hour';
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
