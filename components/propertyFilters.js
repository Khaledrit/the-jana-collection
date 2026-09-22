/**
 * Property collection filters — field-driven so mock data can later swap to Sanity.
 * Operates on: destination, propertyType, bedrooms, maxGuests, amenities.
 */

export function createEmptyFilters() {
  return {
    destination: '',
    propertyType: '',
    bedrooms: null,
    guests: null,
    amenities: []
  };
}

export function filtersAreActive(filters) {
  return Boolean(
    filters.destination
    || filters.propertyType
    || filters.bedrooms != null
    || filters.guests != null
    || (filters.amenities && filters.amenities.length)
  );
}

/** Derive option lists from the current property collection. */
export function getFilterOptions(properties) {
  const destinations = uniqueSorted(properties.map(p => p.destination).filter(Boolean));
  const propertyTypes = uniqueSorted(properties.map(p => p.propertyType).filter(Boolean));
  const amenities = uniqueSorted(properties.flatMap(p => p.amenities || []));

  const maxBeds = Math.max(0, ...properties.map(p => p.bedrooms || 0));
  const maxGuests = Math.max(0, ...properties.map(p => p.maxGuests || 0));

  const bedroomSteps = [4, 5, 6, 8, 10].filter(n => n <= maxBeds);
  if (maxBeds >= 4 && !bedroomSteps.includes(maxBeds) && maxBeds > (bedroomSteps.at(-1) || 0)) {
    bedroomSteps.push(maxBeds);
  }

  const guestSteps = [6, 8, 10, 12].filter(n => n <= maxGuests);
  if (maxGuests >= 6 && !guestSteps.includes(maxGuests) && maxGuests > (guestSteps.at(-1) || 0)) {
    guestSteps.push(maxGuests);
  }

  return { destinations, propertyTypes, amenities, bedroomSteps, guestSteps };
}

/** Apply all active filters with AND logic. Bedrooms/guests are minimums. */
export function filterProperties(properties, filters) {
  return properties.filter(property => {
    if (filters.destination && property.destination !== filters.destination) return false;
    if (filters.propertyType && property.propertyType !== filters.propertyType) return false;
    if (filters.bedrooms != null && (property.bedrooms ?? 0) < filters.bedrooms) return false;
    if (filters.guests != null && (property.maxGuests ?? 0) < filters.guests) return false;
    if (filters.amenities?.length) {
      const list = property.amenities || [];
      if (!filters.amenities.every(item => list.includes(item))) return false;
    }
    return true;
  });
}

export function renderPropertyFilters(options, filters, { esc, pick }) {
  const active = filtersAreActive(filters);
  const clearLabel = pick('Clear filters', 'مسح التصفية');
  const allLabel = pick('All', 'الكل');
  const filtersLabel = pick('Filters', 'تصفية');

  return `
  <div class="villa-filters" data-villa-filters>
    <div class="villa-filters__desktop" aria-label="${pick('Residence filters', 'تصفية الإقامات')}">
      <div class="villa-filters__intro" aria-hidden="true">
        ${filterIconSvg()}
        <span>${esc(filtersLabel)}</span>
      </div>
      <div class="villa-filters__controls">
        ${renderSelectFilter('destination', pick('Destination', 'الوجهة'), options.destinations, filters.destination, allLabel, esc, pick)}
        ${renderSelectFilter('propertyType', pick('Property type', 'نوع الإقامة'), options.propertyTypes, filters.propertyType, allLabel, esc, pick)}
        ${renderMinFilter('bedrooms', pick('Bedrooms', 'غرف النوم'), options.bedroomSteps, filters.bedrooms, allLabel, esc, pick)}
        ${renderMinFilter('guests', pick('Guests', 'الضيوف'), options.guestSteps, filters.guests, allLabel, esc, pick)}
        ${renderAmenitiesFilter(options.amenities, filters.amenities, pick, esc)}
      </div>
      <button type="button" class="villa-filters__clear${active ? ' is-visible' : ''}" data-filter-clear ${active ? '' : 'hidden'}>${esc(clearLabel)}</button>
    </div>

    <div class="villa-filters__mobile-bar">
      <button type="button" class="villa-filters__mobile-trigger" data-filter-sheet-open aria-haspopup="dialog">
        ${filterIconSvg()}
        <span>${esc(filtersLabel)}</span>
        ${active ? `<span class="villa-filters__mobile-count">${countActive(filters)}</span>` : ''}
      </button>
      <button type="button" class="villa-filters__clear villa-filters__clear--mobile${active ? ' is-visible' : ''}" data-filter-clear ${active ? '' : 'hidden'}>${esc(clearLabel)}</button>
    </div>

    <div class="villa-filters__sheet" data-filter-sheet hidden aria-hidden="true">
      <div class="villa-filters__sheet-backdrop" data-filter-sheet-close tabindex="-1"></div>
      <div class="villa-filters__sheet-panel" role="dialog" aria-modal="true" aria-label="${esc(filtersLabel)}">
        <div class="villa-filters__sheet-head">
          <h3>${esc(filtersLabel)}</h3>
          <button type="button" class="villa-filters__sheet-close" data-filter-sheet-close aria-label="${pick('Close filters', 'إغلاق التصفية')}">✕</button>
        </div>
        <div class="villa-filters__sheet-body">
          ${renderSheetSelect('destination', pick('Destination', 'الوجهة'), options.destinations, filters.destination, allLabel, esc)}
          ${renderSheetSelect('propertyType', pick('Property type', 'نوع الإقامة'), options.propertyTypes, filters.propertyType, allLabel, esc)}
          ${renderSheetMin('bedrooms', pick('Bedrooms', 'غرف النوم'), options.bedroomSteps, filters.bedrooms, allLabel, esc, pick)}
          ${renderSheetMin('guests', pick('Guests', 'الضيوف'), options.guestSteps, filters.guests, allLabel, esc, pick)}
          ${renderSheetAmenities(options.amenities, filters.amenities, pick, esc)}
        </div>
        <div class="villa-filters__sheet-actions">
          <button type="button" class="text-link" data-filter-clear>${esc(clearLabel)}</button>
          <button type="button" class="button dark" data-filter-sheet-close>${pick('Show residences', 'عرض الإقامات')}</button>
        </div>
      </div>
    </div>
  </div>`;
}

export function formatFilterTriggerLabel(key, filters, pick) {
  if (key === 'destination') {
    return filters.destination
      ? `${pick('Destination', 'الوجهة')}: ${filters.destination}`
      : pick('Destination', 'الوجهة');
  }
  if (key === 'propertyType') {
    return filters.propertyType
      ? `${pick('Property type', 'نوع الإقامة')}: ${filters.propertyType}`
      : pick('Property type', 'نوع الإقامة');
  }
  if (key === 'bedrooms') {
    return filters.bedrooms != null
      ? `${pick('Bedrooms', 'غرف النوم')}: ${filters.bedrooms}+`
      : pick('Bedrooms', 'غرف النوم');
  }
  if (key === 'guests') {
    return filters.guests != null
      ? `${pick('Guests', 'الضيوف')}: ${filters.guests}+`
      : pick('Guests', 'الضيوف');
  }
  if (key === 'amenities') {
    const n = filters.amenities?.length || 0;
    return n
      ? `${pick('Amenities', 'المرافق')} · ${n} ${pick('selected', 'محدد')}`
      : pick('Amenities', 'المرافق');
  }
  return '';
}

function filterIconSvg() {
  return `<svg class="villa-filters__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h9M17 7h3M4 12h5M13 12h7M4 17h11M19 17h1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="15.5" cy="7" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10.5" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.5" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
}

export function renderFilterEmptyState({ esc, pick }) {
  return `<div class="villa-filters__empty" data-filter-empty>
    <p>${esc(pick('No residences match your current selection.', 'لا توجد إقامات تطابق اختياركم الحالي.'))}</p>
    <button type="button" class="text-link" data-filter-clear>${esc(pick('Clear filters', 'مسح التصفية'))}</button>
  </div>`;
}

function countActive(filters) {
  let n = 0;
  if (filters.destination) n += 1;
  if (filters.propertyType) n += 1;
  if (filters.bedrooms != null) n += 1;
  if (filters.guests != null) n += 1;
  if (filters.amenities?.length) n += 1;
  return n;
}

function renderSelectFilter(key, label, values, selected, allLabel, esc, pick) {
  const isActive = Boolean(selected);
  const name = isActive ? `${label}: ${selected}` : label;
  return `<div class="villa-filter${isActive ? ' is-active' : ''}" data-filter-group="${esc(key)}">
    <div class="villa-filter__chip">
      <button type="button" class="villa-filter__trigger" data-filter-trigger aria-expanded="false">
        <span class="villa-filter__name">${esc(name)}</span>
        <span class="villa-filter__chevron" aria-hidden="true"></span>
      </button>
      ${isActive ? `<button type="button" class="villa-filter__remove" data-filter-clear-one="${esc(key)}" aria-label="${esc(pick('Clear', 'مسح'))}">×</button>` : ''}
    </div>
    <div class="villa-filter__menu" data-filter-menu hidden>
      <button type="button" class="villa-filter__option${!selected ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="">${esc(allLabel)}</button>
      ${values.map(value => `
        <button type="button" class="villa-filter__option${selected === value ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="${esc(value)}">${esc(value)}</button>
      `).join('')}
    </div>
  </div>`;
}

function renderMinFilter(key, label, steps, selected, allLabel, esc, pick) {
  const isActive = selected != null;
  const name = isActive ? `${label}: ${selected}+` : label;
  return `<div class="villa-filter${isActive ? ' is-active' : ''}" data-filter-group="${esc(key)}">
    <div class="villa-filter__chip">
      <button type="button" class="villa-filter__trigger" data-filter-trigger aria-expanded="false">
        <span class="villa-filter__name">${esc(name)}</span>
        <span class="villa-filter__chevron" aria-hidden="true"></span>
      </button>
      ${isActive ? `<button type="button" class="villa-filter__remove" data-filter-clear-one="${esc(key)}" aria-label="${esc(pick('Clear', 'مسح'))}">×</button>` : ''}
    </div>
    <div class="villa-filter__menu" data-filter-menu hidden>
      <button type="button" class="villa-filter__option${selected == null ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="">${esc(allLabel)}</button>
      ${steps.map(step => `
        <button type="button" class="villa-filter__option${selected === step ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="${step}">${step}+</button>
      `).join('')}
    </div>
  </div>`;
}

function renderAmenitiesFilter(amenities, selected, pick, esc) {
  const selectedSet = new Set(selected || []);
  const isActive = selectedSet.size > 0;
  const name = isActive
    ? `${pick('Amenities', 'المرافق')} · ${selectedSet.size} ${pick('selected', 'محدد')}`
    : pick('Amenities', 'المرافق');
  return `<div class="villa-filter villa-filter--amenities${isActive ? ' is-active' : ''}" data-filter-group="amenities">
    <div class="villa-filter__chip">
      <button type="button" class="villa-filter__trigger" data-filter-trigger aria-expanded="false">
        <span class="villa-filter__name">${esc(name)}</span>
        <span class="villa-filter__chevron" aria-hidden="true"></span>
      </button>
      ${isActive ? `<button type="button" class="villa-filter__remove" data-filter-clear-one="amenities" aria-label="${esc(pick('Clear', 'مسح'))}">×</button>` : ''}
    </div>
    <div class="villa-filter__menu villa-filter__menu--wide" data-filter-menu hidden>
      ${amenities.map(item => `
        <label class="villa-filter__check">
          <input type="checkbox" data-filter-amenity value="${esc(item)}" ${selectedSet.has(item) ? 'checked' : ''}>
          <span>${esc(item)}</span>
        </label>
      `).join('')}
    </div>
  </div>`;
}

function renderSheetSelect(key, label, values, selected, allLabel, esc) {
  return `<fieldset class="villa-filters__sheet-group">
    <legend>${esc(label)}</legend>
    <div class="villa-filters__sheet-options">
      <button type="button" class="villa-filter__option${!selected ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="">${esc(allLabel)}</button>
      ${values.map(value => `
        <button type="button" class="villa-filter__option${selected === value ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="${esc(value)}">${esc(value)}</button>
      `).join('')}
    </div>
  </fieldset>`;
}

function renderSheetMin(key, label, steps, selected, allLabel, esc, pick) {
  return `<fieldset class="villa-filters__sheet-group">
    <legend>${esc(label)}</legend>
    <div class="villa-filters__sheet-options">
      <button type="button" class="villa-filter__option${selected == null ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="">${esc(allLabel)}</button>
      ${steps.map(step => `
        <button type="button" class="villa-filter__option${selected === step ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="${step}">${step}+</button>
      `).join('')}
    </div>
  </fieldset>`;
}

function renderSheetAmenities(amenities, selected, pick, esc) {
  const selectedSet = new Set(selected || []);
  return `<fieldset class="villa-filters__sheet-group">
    <legend>${esc(pick('Amenities', 'المرافق'))}</legend>
    <div class="villa-filters__sheet-options villa-filters__sheet-options--checks">
      ${amenities.map(item => `
        <label class="villa-filter__check">
          <input type="checkbox" data-filter-amenity value="${esc(item)}" ${selectedSet.has(item) ? 'checked' : ''}>
          <span>${esc(item)}</span>
        </label>
      `).join('')}
    </div>
  </fieldset>`;
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}
