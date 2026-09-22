/**
 * Sanity image URL helper using the official @sanity/image-url builder.
 * Hotspot/crop are applied by the builder when present on the source.
 */
import imageUrlBuilder from 'https://cdn.jsdelivr.net/npm/@sanity/image-url@1.1.0/+esm';
import { SANITY_CONFIG } from './sanityConfig.js';

const builder = imageUrlBuilder({
  projectId: SANITY_CONFIG.projectId,
  dataset: SANITY_CONFIG.dataset
});

/**
 * @param {object|string|null|undefined} source Sanity image object or URL
 * @param {{ width?: number, height?: number, quality?: number }} [opts]
 * @returns {string}
 */
export function urlForImage(source, { width, height, quality = 84 } = {}) {
  if (!source) return '';
  if (typeof source === 'string') return withParams(source, { width, height, quality });

  try {
    let img = builder.image(source).auto('format').quality(quality);
    if (width) img = img.width(width);
    if (height) img = img.height(height).fit('crop');
    else img = img.fit('max');
    return img.url() || '';
  } catch {
    const asset = source.asset || source;
    if (asset?.url) return withParams(asset.url, { width, height, quality });
    return '';
  }
}

function withParams(rawUrl, { width, height, quality }) {
  try {
    const url = new URL(rawUrl);
    if (width) url.searchParams.set('w', String(width));
    if (height) url.searchParams.set('h', String(height));
    if (quality) url.searchParams.set('q', String(quality));
    url.searchParams.set('auto', 'format');
    if (!url.searchParams.has('fit')) url.searchParams.set('fit', height ? 'crop' : 'max');
    return url.toString();
  } catch {
    return rawUrl;
  }
}
