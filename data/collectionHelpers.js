/**
 * Shared helpers for collection item ordering.
 */

export function sortCollectionItems(items) {
  return [...items].sort((a, b) => {
    const pa = a.displayPriority ?? 9999;
    const pb = b.displayPriority ?? 9999;
    if (pa !== pb) return pa - pb;
    if (Number(b.featured) !== Number(a.featured)) {
      return Number(b.featured) - Number(a.featured);
    }
    return String(a.name || '').localeCompare(String(b.name || ''));
  });
}

export function mapGallery(doc, urlForImage) {
  const heroImage = urlForImage(doc.heroImage, { width: 1600, quality: 84 });
  const gallery = (doc.gallery || [])
    .map(image => urlForImage(image, { width: 1400, quality: 84 }))
    .filter(Boolean);
  return {
    heroImage: heroImage || '',
    gallery: gallery.length ? gallery : (heroImage ? [heroImage] : [])
  };
}
