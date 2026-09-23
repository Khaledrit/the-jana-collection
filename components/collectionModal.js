/**
 * Collection modal content for jets, yachts and experiences.
 * Reuses the Private Villas modal shell / visual system.
 */

const KIND_COPY = {
  jet: {
    eyebrowEn: 'Private aviation',
    eyebrowAr: 'طيران خاص',
    ctaEn: 'Enquire about this jet →',
    ctaAr: 'استفسروا عن هذه الطائرة ←'
  },
  yacht: {
    eyebrowEn: 'Private yacht',
    eyebrowAr: 'يخت خاص',
    ctaEn: 'Enquire about this yacht →',
    ctaAr: 'استفسروا عن هذا اليخت ←'
  },
  experience: {
    eyebrowEn: 'Experience',
    eyebrowAr: 'تجربة',
    ctaEn: 'Enquire about this experience →',
    ctaAr: 'استفسروا عن هذه التجربة ←'
  }
};

export function renderCollectionModalContent(item, ctx, kind) {
  const { esc, pick, whatsappHref } = ctx;
  const copy = KIND_COPY[kind] || KIND_COPY.experience;
  const gallery = (item.gallery || []).filter(Boolean);
  if (item.heroImage && !gallery.includes(item.heroImage)) gallery.unshift(item.heroImage);
  const stats = buildStats(item, kind, pick);
  const columns = buildColumns(item, kind, pick, esc);

  const galleryBlock = gallery.length
    ? `<div class="property-modal__gallery" data-gallery>
      <div class="property-modal__slides">
        ${gallery.map((src, index) => `
          <figure class="property-modal__slide${index === 0 ? ' is-active' : ''}" data-slide-index="${index}">
            <img src="${esc(src)}" alt="${esc(item.name)} — ${pick('image', 'صورة')} ${index + 1}" width="1400" height="900">
          </figure>`).join('')}
      </div>
      ${gallery.length > 1 ? `
        <button type="button" class="property-modal__nav property-modal__nav--prev" data-gallery-prev aria-label="${pick('Previous image', 'الصورة السابقة')}">←</button>
        <button type="button" class="property-modal__nav property-modal__nav--next" data-gallery-next aria-label="${pick('Next image', 'الصورة التالية')}">→</button>
        <div class="property-modal__count" data-gallery-count>1 / ${gallery.length}</div>
      ` : ''}
    </div>`
    : `<div class="property-modal__gallery property-modal__gallery--empty" aria-hidden="true">
      <div class="property-modal__placeholder"><span>${esc(item.name)}</span></div>
    </div>`;

  return `
    ${galleryBlock}

    <div class="property-modal__body">
      <div class="eyebrow">${pick(copy.eyebrowEn, copy.eyebrowAr)}</div>
      <h2 id="propertyModalTitle">${esc(item.name)}</h2>
      ${item.place ? `<p class="property-modal__place">${esc(item.place)}</p>` : ''}

      ${stats.length ? `<div class="property-modal__stats">
        ${stats.map(([value, label]) => `<div><strong>${esc(value)}</strong><span>${esc(label)}</span></div>`).join('')}
      </div>` : ''}

      ${item.shortIntro ? `<p class="property-modal__intro">${esc(item.shortIntro)}</p>` : ''}
      ${item.description ? `<p class="property-modal__description">${esc(item.description)}</p>` : ''}

      ${columns}

      <div class="property-modal__actions">
        <a class="button dark" href="${whatsappHref(item.name)}" target="_blank" rel="noopener">${pick(copy.ctaEn, copy.ctaAr)}</a>
      </div>
    </div>`;
}

function buildStats(item, kind, pick) {
  if (kind === 'jet') {
    return [
      item.passengerCapacity != null ? [`${item.passengerCapacity}`, pick('Passengers', 'الركاب')] : null,
      item.aircraftType ? [item.aircraftType, pick('Type', 'النوع')] : null,
      item.rangeLabel ? [item.rangeLabel, pick('Range', 'المدى')] : null,
      item.homeBase ? [item.homeBase, pick('Base', 'القاعدة')] : null
    ].filter(Boolean);
  }
  if (kind === 'yacht') {
    return [
      item.cabins != null ? [`${item.cabins}`, pick('Cabins', 'الكبائن')] : null,
      item.maxGuests != null ? [`${item.maxGuests}`, pick('Guests', 'الضيوف')] : null,
      item.crew != null ? [`${item.crew}`, pick('Crew', 'الطاقم')] : null,
      item.lengthLabel ? [item.lengthLabel, pick('Length', 'الطول')] : null
    ].filter(Boolean);
  }
  return [
    item.duration ? [item.duration, pick('Duration', 'المدة')] : null,
    item.experienceType ? [item.experienceType, pick('Type', 'النوع')] : null,
    item.destination ? [item.destination, pick('Destination', 'الوجهة')] : null
  ].filter(Boolean);
}

function buildColumns(item, kind, pick, esc) {
  let leftTitle;
  let rightTitle;
  let leftItems;
  let rightItems;

  if (kind === 'jet') {
    leftTitle = pick('Features', 'المميزات');
    rightTitle = pick('Services', 'الخدمات');
    leftItems = item.features || [];
    rightItems = item.services || [];
  } else if (kind === 'yacht') {
    leftTitle = pick('Amenities', 'المرافق');
    rightTitle = pick('Services', 'الخدمات');
    leftItems = item.amenities || [];
    rightItems = item.services || [];
  } else {
    leftTitle = pick('Highlights', 'أبرز ما فيها');
    rightTitle = pick('Inclusions', 'ما يشمله');
    leftItems = item.highlights || [];
    rightItems = item.inclusions || [];
  }

  if (!leftItems.length && !rightItems.length) return '';

  return `<div class="property-modal__columns">
    <div>
      <h3>${leftTitle}</h3>
      <ul>${leftItems.map(entry => `<li>${esc(entry)}</li>`).join('') || `<li>${pick('Details on request', 'التفاصيل عند الطلب')}</li>`}</ul>
    </div>
    <div>
      <h3>${rightTitle}</h3>
      <ul>${rightItems.map(entry => `<li>${esc(entry)}</li>`).join('') || `<li>${pick('Details on request', 'التفاصيل عند الطلب')}</li>`}</ul>
    </div>
  </div>`;
}
