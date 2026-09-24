/**
 * Shared collection card — same visual system as Private Villas cards.
 * kind: jet | yacht | experience
 *
 * Jet and yacht cards use a wider media ratio and hotspot-aware framing;
 * experiences keep 4:5.
 */
export function renderCollectionCard(item, { esc }, kind) {
  const isJet = kind === 'jet';
  const isYacht = kind === 'yacht';
  const useWideMedia = isJet || isYacht;
  const imageSrc = useWideMedia ? (item.cardImage || item.heroImage) : item.heroImage;
  const objectPosition = useWideMedia ? (item.heroObjectPosition || 'center center') : '';
  const imgStyle = objectPosition ? ` style="object-position:${esc(objectPosition)}"` : '';
  const imgSize = useWideMedia ? 'width="1200" height="800"' : 'width="900" height="700"';
  const media = imageSrc
    ? `<img src="${esc(imageSrc)}" alt="${esc(item.name)}" loading="lazy" ${imgSize}${imgStyle}>`
    : `<div class="jana-property-card__placeholder" aria-hidden="true"><span>${esc(item.name)}</span></div>`;
  const kindClass = isJet
    ? ' jana-property-card--jet'
    : isYacht
      ? ' jana-property-card--yacht'
      : '';
  const location = isYacht && item.cardLocation
    ? `<p class="jana-property-card__location">${esc(item.cardLocation)}</p>`
    : '';
  const price = isYacht && item.priceLabel
    ? `<p class="jana-property-card__price">${esc(item.priceLabel)}</p>`
    : '';

  return `<button type="button" class="jana-property-card${kindClass}" data-collection-kind="${esc(kind)}" data-collection-slug="${esc(item.slug)}" aria-haspopup="dialog">
    <div class="jana-property-card__media">${media}</div>
    <div class="jana-property-card__body">
      <h3 class="jana-property-card__name">${esc(item.name)}</h3>
      ${item.place ? `<p class="jana-property-card__place">${esc(item.place)}</p>` : ''}
      ${location}
      ${item.meta ? `<p class="jana-property-card__meta">${esc(item.meta)}</p>` : ''}
      ${price}
    </div>
  </button>`;
}

export function renderCollectionCardList(items, helpers, kind) {
  return items.map(item => renderCollectionCard(item, helpers, kind)).join('');
}
