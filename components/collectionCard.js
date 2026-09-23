/**
 * Shared collection card — same visual system as Private Villas cards.
 * kind: jet | yacht | experience
 */
export function renderCollectionCard(item, { esc }, kind) {
  const media = item.heroImage
    ? `<img src="${esc(item.heroImage)}" alt="${esc(item.name)}" loading="lazy" width="900" height="700">`
    : `<div class="jana-property-card__placeholder" aria-hidden="true"><span>${esc(item.name)}</span></div>`;
  return `<button type="button" class="jana-property-card" data-collection-kind="${esc(kind)}" data-collection-slug="${esc(item.slug)}" aria-haspopup="dialog">
    <div class="jana-property-card__media">${media}</div>
    <div class="jana-property-card__body">
      <h3 class="jana-property-card__name">${esc(item.name)}</h3>
      ${item.place ? `<p class="jana-property-card__place">${esc(item.place)}</p>` : ''}
      ${item.meta ? `<p class="jana-property-card__meta">${esc(item.meta)}</p>` : ''}
    </div>
  </button>`;
}

export function renderCollectionCardList(items, helpers, kind) {
  return items.map(item => renderCollectionCard(item, helpers, kind)).join('');
}
