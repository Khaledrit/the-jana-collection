/**
 * Property data access layer.
 * Prefers published Sanity Property documents (API, published perspective).
 * Falls back to mockProperties only when the Sanity request fails —
 * not when Sanity successfully returns an empty list.
 */
import { mockProperties } from './mockProperties.js';
import { fetchSanityProperties } from './sanityProperties.js';

let cachedProperties = null;
let cacheSource = null;

/** @returns {Promise<Array>} */
export async function getProperties() {
  if (cachedProperties) return cachedProperties;

  try {
    const fromSanity = await fetchSanityProperties();
    cachedProperties = fromSanity;
    cacheSource = 'sanity';
    return cachedProperties;
  } catch (error) {
    console.warn('[properties] Sanity fetch failed; using mock fallback.', error);
    cachedProperties = mockProperties;
    cacheSource = 'mock';
    return cachedProperties;
  }
}

/** @returns {Promise<object | undefined>} */
export async function getPropertyBySlug(slug) {
  const all = await getProperties();
  return all.find(property => property.slug === slug);
}

/**
 * Collection order: displayPriority ascending (missing last),
 * then featured, then name.
 */
export async function getCollectionProperties() {
  const all = await getProperties();
  return [...all].sort((a, b) => {
    const pa = a.displayPriority ?? 9999;
    const pb = b.displayPriority ?? 9999;
    if (pa !== pb) return pa - pb;
    if (Number(b.featured) !== Number(a.featured)) {
      return Number(b.featured) - Number(a.featured);
    }
    return String(a.name || '').localeCompare(String(b.name || ''));
  });
}

/** Related properties excluding the current slug. */
export async function getRelatedProperties(slug, limit = 3) {
  const all = await getCollectionProperties();
  return all.filter(property => property.slug !== slug).slice(0, limit);
}

/** Test helper / debugging. */
export function getPropertyDataSource() {
  return cacheSource;
}
