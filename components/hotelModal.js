/**
 * Luxury hotel modal — Perfect For, Why JANA Loves It, Signature Stays,
 * JANA Highlight, Experience with JANA. Reuses the shared property modal shell.
 */

export function renderHotelModalContent(hotel, ctx) {
  const { esc, pick, whatsappHref } = ctx;
  const gallery = (hotel.gallery || []).filter(Boolean);
  if (hotel.heroImage && !gallery.includes(hotel.heroImage)) gallery.unshift(hotel.heroImage);

  const objectPosition = hotel.heroObjectPosition || '';
  const imgStyle = objectPosition ? ` style="object-position:${esc(objectPosition)}"` : '';

  const galleryBlock = gallery.length
    ? `<div class="property-modal__gallery" data-gallery>
      <div class="property-modal__slides">
        ${gallery.map((src, index) => `
          <figure class="property-modal__slide${index === 0 ? ' is-active' : ''}" data-slide-index="${index}">
            <img src="${esc(src)}" alt="${esc(hotel.name)} — ${pick('image', 'صورة')} ${index + 1}" width="1400" height="900"${imgStyle}>
          </figure>`).join('')}
      </div>
      ${gallery.length > 1 ? `
        <button type="button" class="property-modal__nav property-modal__nav--prev" data-gallery-prev aria-label="${pick('Previous image', 'الصورة السابقة')}">←</button>
        <button type="button" class="property-modal__nav property-modal__nav--next" data-gallery-next aria-label="${pick('Next image', 'الصورة التالية')}">→</button>
        <div class="property-modal__count" data-gallery-count>1 / ${gallery.length}</div>
      ` : ''}
    </div>`
    : `<div class="property-modal__gallery property-modal__gallery--empty" aria-hidden="true">
      <div class="property-modal__placeholder"><span>${esc(hotel.name)}</span></div>
    </div>`;

  const perfectFor = (hotel.perfectFor || []).filter(Boolean);
  const stays = (hotel.signatureStays || []).filter(stay => stay?.name);

  return `
    ${galleryBlock}

    <div class="property-modal__body">
      <div class="eyebrow">${pick('The Collection', 'المجموعة')}</div>
      <h2 id="propertyModalTitle">${esc(hotel.name)}</h2>
      ${hotel.place ? `<p class="property-modal__place">${esc(hotel.place)}</p>` : ''}
      ${hotel.tagline ? `<p class="property-modal__tagline">${esc(hotel.tagline)}</p>` : ''}

      ${hotel.description ? `<p class="property-modal__description">${esc(hotel.description)}</p>` : ''}

      ${perfectFor.length ? `
        <div class="property-modal__section">
          <h3>${pick('Perfect for', 'مثالي لـ')}</h3>
          <p class="property-modal__perfect-for">${esc(perfectFor.join(' · '))}</p>
        </div>` : ''}

      ${hotel.whyJanaLovesIt ? `
        <div class="property-modal__section">
          <h3>${pick('Why JANA loves it', 'لماذا تحبّها جانا')}</h3>
          <p>${esc(hotel.whyJanaLovesIt)}</p>
        </div>` : ''}

      ${stays.length ? `
        <div class="property-modal__section property-modal__signature-stays">
          <h3>${pick('Signature stays', 'إقامات مميزة')}</h3>
          <ul class="signature-stay-list">
            ${stays.map(stay => renderSignatureStay(stay, esc, pick)).join('')}
          </ul>
        </div>` : ''}

      ${hotel.janaHighlight ? `
        <div class="property-modal__section property-modal__highlight">
          <h3>${pick('JANA highlight', 'لمسة جانا')}</h3>
          <p>${esc(hotel.janaHighlight)}</p>
        </div>` : ''}

      ${hotel.experienceWithJana ? `
        <div class="property-modal__section">
          <h3>${pick('Experience with JANA', 'التجربة مع جانا')}</h3>
          <p>${esc(hotel.experienceWithJana)}</p>
        </div>` : ''}

      <div class="property-modal__actions">
        <a class="button dark" href="${whatsappHref(hotel.name)}" target="_blank" rel="noopener">${pick('Enquire about this stay →', 'استفسروا عن هذه الإقامة ←')}</a>
      </div>
    </div>`;
}

function renderSignatureStay(stay, esc, pick) {
  const specs = [
    stay.bedrooms != null ? `${stay.bedrooms} ${pick('Bedrooms', 'غرف النوم')}` : null,
    stay.maxGuests != null ? `${stay.maxGuests} ${pick('Guests', 'ضيوف')}` : null,
    stay.sizeLabel || null
  ].filter(Boolean);

  const features = (stay.features || []).filter(Boolean);

  return `<li class="signature-stay">
    <h4 class="signature-stay__name">${esc(stay.name)}</h4>
    ${specs.length ? `<p class="signature-stay__specs">${esc(specs.join(' · '))}</p>` : ''}
    ${stay.description ? `<p class="signature-stay__description">${esc(stay.description)}</p>` : ''}
    ${features.length ? `<ul class="signature-stay__features">${features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
  </li>`;
}
