/**
 * Reusable Property Card — receives a property data object.
 * Opens the property modal via data-property-slug (no page navigation).
 */
export function renderPropertyCard(property, { esc }) {
  const price = formatPrice(property);
  const meta = [
    property.maxGuests != null ? `${property.maxGuests} Guests` : null,
    property.bedrooms != null ? `${property.bedrooms} Bedrooms` : null,
    property.bathrooms != null ? `${property.bathrooms} Bathrooms` : null
  ].filter(Boolean).join(' · ');

  const place = [property.destination, property.region, property.country].filter(Boolean).join(' · ');
  const media = property.heroImage
    ? `<img src="${esc(property.heroImage)}" alt="${esc(property.name)}" loading="lazy" width="900" height="700">`
    : `<div class="jana-property-card__placeholder" aria-hidden="true"><span>${esc(property.name)}</span></div>`;

  return `<button type="button" class="jana-property-card" data-property-slug="${esc(property.slug)}" aria-haspopup="dialog">
    <div class="jana-property-card__media">
      ${media}
    </div>
    <div class="jana-property-card__body">
      <h3 class="jana-property-card__name">${esc(property.name)}</h3>
      <p class="jana-property-card__place">${esc(place)}</p>
      ${meta ? `<p class="jana-property-card__meta">${esc(meta)}</p>` : ''}
      ${price ? `<p class="jana-property-card__price">${esc(price)}</p>` : ''}
    </div>
  </button>`;
}

export function renderPropertyCardList(properties, helpers) {
  return properties.map(property => renderPropertyCard(property, helpers)).join('');
}

function formatPrice(property) {
  if (property.pricingPeriod === 'on request' || (property.startingPrice == null && property.enquiryStatus === 'On Request')) {
    return 'On request';
  }
  if (property.startingPrice == null || !property.currency) return '';
  const amount = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0
  }).format(property.startingPrice);
  const period =
    property.pricingPeriod === 'night' ? 'night'
    : property.pricingPeriod === 'stay' ? 'stay'
    : 'week';
  return `From ${amount} / ${period}`;
}
