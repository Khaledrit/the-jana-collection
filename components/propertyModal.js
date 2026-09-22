/**
 * Property Modal markup — receives selected property data dynamically.
 * Concept: PropertyCard → selectedProperty → PropertyModal
 * No hardcoded per-villa modals; ready for Sanity document fields later.
 */
export function renderPropertyModalShell() {
  return `<div class="property-modal" id="propertyModal" hidden aria-hidden="true">
    <div class="property-modal__backdrop" data-modal-close tabindex="-1"></div>
    <div class="property-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="propertyModalTitle" tabindex="-1">
      <button type="button" class="property-modal__close" data-modal-close aria-label="Close property details">✕</button>
      <div class="property-modal__content" id="propertyModalContent"></div>
    </div>
  </div>`;
}

export function renderPropertyModalContent(property, ctx) {
  const { esc, pick, whatsappHref } = ctx;
  const gallery = property.gallery?.length ? property.gallery : [property.heroImage];
  const place = [property.destination, property.region, property.country].filter(Boolean).join(' · ');
  const price = formatDetailPrice(property, pick);
  const stats = [
    property.bedrooms != null ? [`${property.bedrooms}`, pick('Bedrooms', 'غرف النوم')] : null,
    property.bathrooms != null ? [`${property.bathrooms}`, pick('Bathrooms', 'الحمامات')] : null,
    property.maxGuests != null ? [`${property.maxGuests}`, pick('Guests', 'الضيوف')] : null,
    property.size ? [property.size, pick('Size', 'المساحة')] : null
  ].filter(Boolean);

  return `
    <div class="property-modal__gallery" data-gallery>
      <div class="property-modal__slides">
        ${gallery.map((src, index) => `
          <figure class="property-modal__slide${index === 0 ? ' is-active' : ''}" data-slide-index="${index}">
            <img src="${esc(src)}" alt="${esc(property.name)} — ${pick('image', 'صورة')} ${index + 1}" width="1400" height="900">
          </figure>`).join('')}
      </div>
      ${gallery.length > 1 ? `
        <button type="button" class="property-modal__nav property-modal__nav--prev" data-gallery-prev aria-label="${pick('Previous image', 'الصورة السابقة')}">←</button>
        <button type="button" class="property-modal__nav property-modal__nav--next" data-gallery-next aria-label="${pick('Next image', 'الصورة التالية')}">→</button>
        <div class="property-modal__count" data-gallery-count>1 / ${gallery.length}</div>
      ` : ''}
    </div>

    <div class="property-modal__body">
      <div class="eyebrow">${pick('Private residence', 'إقامة خاصة')}</div>
      <h2 id="propertyModalTitle">${esc(property.name)}</h2>
      <p class="property-modal__place">${esc(place)}</p>
      ${price ? `<p class="property-modal__price">${esc(price)}</p>` : ''}

      <div class="property-modal__stats">
        ${stats.map(([value, label]) => `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('')}
      </div>

      <p class="property-modal__intro">${esc(property.shortIntro)}</p>
      <p class="property-modal__description">${esc(property.description)}</p>

      <div class="property-modal__columns">
        <div>
          <h3>${pick('Amenities', 'المرافق')}</h3>
          <ul>${(property.amenities || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul>
        </div>
        <div>
          <h3>${pick('Services', 'الخدمات')}</h3>
          <ul>${(property.services || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul>
        </div>
      </div>

      <div class="property-modal__location">
        <h3>${pick('Location', 'الموقع')}</h3>
        <p>${esc(property.locationNote)}</p>
      </div>

      <div class="property-modal__actions">
        <a class="button dark" href="${whatsappHref(property.name)}" target="_blank" rel="noopener">${pick('Enquire about this residence →', 'استفسروا عن هذه الإقامة ←')}</a>
      </div>
    </div>`;
}

function formatDetailPrice(property, pick) {
  if (property.pricingPeriod === 'on request' || (property.startingPrice == null && property.enquiryStatus === 'On Request')) {
    return pick('On request', 'عند الطلب');
  }
  if (property.startingPrice == null || !property.currency) return '';
  const amount = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: property.currency,
    maximumFractionDigits: 0
  }).format(property.startingPrice);
  const period = property.pricingPeriod === 'night'
    ? pick('night', 'ليلة')
    : property.pricingPeriod === 'stay'
      ? pick('stay', 'إقامة')
      : pick('week', 'أسبوع');
  return `${pick('From', 'من')} ${amount} / ${period}`;
}
