/**
 * Luxury hotel card — same visual system as Private Villas / Jets / Yachts.
 * Card shows only: name · location · country · tagline.
 */
export function renderHotelCard(hotel, { esc }) {
  const imageSrc = hotel.cardImage || hotel.heroImage;
  const objectPosition = hotel.heroObjectPosition || '';
  const imgStyle = objectPosition ? ` style="object-position:${esc(objectPosition)}"` : '';
  const media = imageSrc
    ? `<img src="${esc(imageSrc)}" alt="${esc(hotel.name)}" loading="lazy" width="900" height="1125"${imgStyle}>`
    : `<div class="jana-property-card__placeholder" aria-hidden="true"><span>${esc(hotel.name)}</span></div>`;

  return `<button type="button" class="jana-property-card" data-collection-kind="hotel" data-collection-slug="${esc(hotel.slug)}" aria-haspopup="dialog">
    <div class="jana-property-card__media">${media}</div>
    <div class="jana-property-card__body">
      <h3 class="jana-property-card__name">${esc(hotel.name)}</h3>
      ${hotel.place ? `<p class="jana-property-card__place">${esc(hotel.place)}</p>` : ''}
      ${hotel.tagline ? `<p class="jana-property-card__meta">${esc(hotel.tagline)}</p>` : ''}
    </div>
  </button>`;
}

export function renderHotelCardList(hotels, helpers) {
  return hotels.map(hotel => renderHotelCard(hotel, helpers)).join('');
}
