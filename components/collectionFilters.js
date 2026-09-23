/**
 * Collection filters for Private Jets and Yachts.
 * Reuses the Private Villas filter visual system (villa-filters CSS).
 * Options are derived from published Sanity-mapped items.
 */

export function createEmptyJetFilters() {
  return {
    aircraftType: '',
    manufacturer: '',
    passengers: null,
    range: null
  };
}

export function createEmptyYachtFilters() {
  return {
    marina: '',
    yachtType: '',
    length: null,
    guests: null,
    cabins: null,
    builder: ''
  };
}

export function jetFiltersAreActive(filters) {
  return Boolean(
    filters.aircraftType
    || filters.manufacturer
    || filters.passengers != null
    || filters.range != null
  );
}

export function yachtFiltersAreActive(filters) {
  return Boolean(
    filters.marina
    || filters.yachtType
    || filters.length != null
    || filters.guests != null
    || filters.cabins != null
    || filters.builder
  );
}

export function getJetFilterOptions(items) {
  const aircraftTypes = uniqueSorted(items.map(item => item.aircraftType).filter(Boolean));
  const manufacturers = uniqueSorted(items.map(item => item.manufacturer).filter(Boolean));
  const maxPassengers = Math.max(0, ...items.map(item => item.passengerCapacity || 0));
  const maxRange = Math.max(0, ...items.map(item => item.range || 0));
  return {
    aircraftTypes,
    manufacturers,
    passengerSteps: buildMinSteps(maxPassengers, [4, 6, 8, 10, 12, 14, 16, 19]),
    rangeSteps: buildMinSteps(maxRange, [1500, 2000, 3000, 4000, 5000, 6000])
  };
}

export function getYachtFilterOptions(items) {
  const marinas = uniqueSorted(items.map(item => item.marina).filter(Boolean));
  const yachtTypes = uniqueSorted(items.map(item => item.yachtType).filter(Boolean));
  const builders = uniqueSorted(items.map(item => item.builder).filter(Boolean));
  const maxLength = Math.max(0, ...items.map(item => item.lengthFt || item.length || 0));
  const maxGuests = Math.max(0, ...items.map(item => item.maxGuests || 0));
  const maxCabins = Math.max(0, ...items.map(item => item.cabins || 0));
  return {
    marinas,
    yachtTypes,
    builders,
    lengthSteps: buildMinSteps(maxLength, [60, 70, 80, 100, 120, 140, 160]),
    guestSteps: buildMinSteps(maxGuests, [10, 20, 30, 50, 80, 100]),
    cabinSteps: buildMinSteps(maxCabins, [2, 3, 4, 5, 6])
  };
}

export function filterJets(items, filters) {
  return items.filter(item => {
    if (filters.aircraftType && item.aircraftType !== filters.aircraftType) return false;
    if (filters.manufacturer && item.manufacturer !== filters.manufacturer) return false;
    if (filters.passengers != null && (item.passengerCapacity ?? 0) < filters.passengers) return false;
    if (filters.range != null && (item.range ?? 0) < filters.range) return false;
    return true;
  });
}

export function filterYachts(items, filters) {
  return items.filter(item => {
    if (filters.marina && item.marina !== filters.marina) return false;
    if (filters.yachtType && item.yachtType !== filters.yachtType) return false;
    if (filters.builder && item.builder !== filters.builder) return false;
    if (filters.length != null && (item.lengthFt ?? item.length ?? 0) < filters.length) return false;
    if (filters.guests != null && (item.maxGuests ?? 0) < filters.guests) return false;
    if (filters.cabins != null && (item.cabins ?? 0) < filters.cabins) return false;
    return true;
  });
}

export function renderJetFilters(options, filters, { esc, pick }) {
  return renderCollectionFilters({
    kind: 'jet',
    filters,
    active: jetFiltersAreActive(filters),
    activeCount: countJetActive(filters),
    ariaLabel: pick('Aircraft filters', 'تصفية الطائرات'),
    showLabel: pick('Show aircraft', 'عرض الطائرات'),
    esc,
    pick,
    desktopControls: `
      ${renderSelectFilter('aircraftType', pick('Aircraft type', 'نوع الطائرة'), options.aircraftTypes, filters.aircraftType, pick, esc)}
      ${renderSelectFilter('manufacturer', pick('Manufacturer', 'الشركة المصنّعة'), options.manufacturers, filters.manufacturer, pick, esc)}
      ${renderMinFilter('passengers', pick('Passengers', 'الركاب'), options.passengerSteps, filters.passengers, pick, esc)}
      ${renderMinFilter('range', pick('Range', 'المدى'), options.rangeSteps, filters.range, pick, esc, ' nm')}
    `,
    sheetBody: `
      ${renderSheetSelect('aircraftType', pick('Aircraft type', 'نوع الطائرة'), options.aircraftTypes, filters.aircraftType, pick, esc)}
      ${renderSheetSelect('manufacturer', pick('Manufacturer', 'الشركة المصنّعة'), options.manufacturers, filters.manufacturer, pick, esc)}
      ${renderSheetMin('passengers', pick('Passengers', 'الركاب'), options.passengerSteps, filters.passengers, pick, esc)}
      ${renderSheetMin('range', pick('Range', 'المدى'), options.rangeSteps, filters.range, pick, esc, ' nm')}
    `
  });
}

export function renderYachtFilters(options, filters, { esc, pick }) {
  return renderCollectionFilters({
    kind: 'yacht',
    filters,
    active: yachtFiltersAreActive(filters),
    activeCount: countYachtActive(filters),
    ariaLabel: pick('Yacht filters', 'تصفية اليخوت'),
    showLabel: pick('Show yachts', 'عرض اليخوت'),
    esc,
    pick,
    desktopControls: `
      ${renderSelectFilter('marina', pick('Marina', 'المرسى'), options.marinas, filters.marina, pick, esc)}
      ${renderSelectFilter('yachtType', pick('Yacht type', 'نوع اليخت'), options.yachtTypes, filters.yachtType, pick, esc)}
      ${renderSelectFilter('builder', pick('Builder', 'الصانع'), options.builders, filters.builder, pick, esc)}
      ${renderMinFilter('length', pick('Length', 'الطول'), options.lengthSteps, filters.length, pick, esc, ' ft')}
      ${renderMinFilter('guests', pick('Guests', 'الضيوف'), options.guestSteps, filters.guests, pick, esc)}
      ${renderMinFilter('cabins', pick('Cabins', 'الكبائن'), options.cabinSteps, filters.cabins, pick, esc)}
    `,
    sheetBody: `
      ${renderSheetSelect('marina', pick('Marina', 'المرسى'), options.marinas, filters.marina, pick, esc)}
      ${renderSheetSelect('yachtType', pick('Yacht type', 'نوع اليخت'), options.yachtTypes, filters.yachtType, pick, esc)}
      ${renderSheetSelect('builder', pick('Builder', 'الصانع'), options.builders, filters.builder, pick, esc)}
      ${renderSheetMin('length', pick('Length', 'الطول'), options.lengthSteps, filters.length, pick, esc, ' ft')}
      ${renderSheetMin('guests', pick('Guests', 'الضيوف'), options.guestSteps, filters.guests, pick, esc)}
      ${renderSheetMin('cabins', pick('Cabins', 'الكبائن'), options.cabinSteps, filters.cabins, pick, esc)}
    `
  });
}

export function formatJetFilterTriggerLabel(key, filters, pick) {
  if (key === 'aircraftType') {
    return filters.aircraftType
      ? `${pick('Aircraft type', 'نوع الطائرة')}: ${filters.aircraftType}`
      : pick('Aircraft type', 'نوع الطائرة');
  }
  if (key === 'manufacturer') {
    return filters.manufacturer
      ? `${pick('Manufacturer', 'الشركة المصنّعة')}: ${filters.manufacturer}`
      : pick('Manufacturer', 'الشركة المصنّعة');
  }
  if (key === 'passengers') {
    return filters.passengers != null
      ? `${pick('Passengers', 'الركاب')}: ${filters.passengers}+`
      : pick('Passengers', 'الركاب');
  }
  if (key === 'range') {
    return filters.range != null
      ? `${pick('Range', 'المدى')}: ${filters.range}+ nm`
      : pick('Range', 'المدى');
  }
  return '';
}

export function formatYachtFilterTriggerLabel(key, filters, pick) {
  if (key === 'marina') {
    return filters.marina
      ? `${pick('Marina', 'المرسى')}: ${filters.marina}`
      : pick('Marina', 'المرسى');
  }
  if (key === 'yachtType') {
    return filters.yachtType
      ? `${pick('Yacht type', 'نوع اليخت')}: ${filters.yachtType}`
      : pick('Yacht type', 'نوع اليخت');
  }
  if (key === 'builder') {
    return filters.builder
      ? `${pick('Builder', 'الصانع')}: ${filters.builder}`
      : pick('Builder', 'الصانع');
  }
  if (key === 'length') {
    return filters.length != null
      ? `${pick('Length', 'الطول')}: ${filters.length}+ ft`
      : pick('Length', 'الطول');
  }
  if (key === 'guests') {
    return filters.guests != null
      ? `${pick('Guests', 'الضيوف')}: ${filters.guests}+`
      : pick('Guests', 'الضيوف');
  }
  if (key === 'cabins') {
    return filters.cabins != null
      ? `${pick('Cabins', 'الكبائن')}: ${filters.cabins}+`
      : pick('Cabins', 'الكبائن');
  }
  return '';
}

export function renderCollectionFilterEmptyState(kind, { esc, pick }) {
  const message = kind === 'jet'
    ? pick('No aircraft match your current selection.', 'لا توجد طائرات تطابق اختياركم الحالي.')
    : pick('No yachts match your current selection.', 'لا توجد يخوت تطابق اختياركم الحالي.');
  return `<div class="villa-filters__empty" data-filter-empty data-collection-filter-empty="${esc(kind)}">
    <p>${esc(message)}</p>
    <button type="button" class="text-link" data-filter-clear>${esc(pick('Clear filters', 'مسح التصفية'))}</button>
  </div>`;
}

function renderCollectionFilters({
  kind,
  active,
  activeCount,
  ariaLabel,
  showLabel,
  esc,
  pick,
  desktopControls,
  sheetBody
}) {
  const clearLabel = pick('Clear filters', 'مسح التصفية');
  const filtersLabel = pick('Filters', 'تصفية');
  return `
  <div class="villa-filters" data-collection-filters="${esc(kind)}">
    <div class="villa-filters__desktop" aria-label="${esc(ariaLabel)}">
      <div class="villa-filters__intro" aria-hidden="true">
        ${filterIconSvg()}
        <span>${esc(filtersLabel)}</span>
      </div>
      <div class="villa-filters__controls">
        ${desktopControls}
      </div>
      <button type="button" class="villa-filters__clear${active ? ' is-visible' : ''}" data-filter-clear ${active ? '' : 'hidden'}>${esc(clearLabel)}</button>
    </div>

    <div class="villa-filters__mobile-bar">
      <button type="button" class="villa-filters__mobile-trigger" data-filter-sheet-open aria-haspopup="dialog">
        ${filterIconSvg()}
        <span>${esc(filtersLabel)}</span>
        ${active ? `<span class="villa-filters__mobile-count">${activeCount}</span>` : ''}
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
          ${sheetBody}
        </div>
        <div class="villa-filters__sheet-actions">
          <button type="button" class="text-link" data-filter-clear>${esc(clearLabel)}</button>
          <button type="button" class="button dark" data-filter-sheet-close>${esc(showLabel)}</button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderSelectFilter(key, label, values, selected, pick, esc) {
  if (!values.length) return '';
  const allLabel = pick('All', 'الكل');
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

function renderMinFilter(key, label, steps, selected, pick, esc, suffix = '') {
  if (!steps.length) return '';
  const allLabel = pick('All', 'الكل');
  const isActive = selected != null;
  const name = isActive ? `${label}: ${selected}+${suffix}` : label;
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
        <button type="button" class="villa-filter__option${selected === step ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="${step}">${step}+${esc(suffix)}</button>
      `).join('')}
    </div>
  </div>`;
}

function renderSheetSelect(key, label, values, selected, pick, esc) {
  if (!values.length) return '';
  const allLabel = pick('All', 'الكل');
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

function renderSheetMin(key, label, steps, selected, pick, esc, suffix = '') {
  if (!steps.length) return '';
  const allLabel = pick('All', 'الكل');
  return `<fieldset class="villa-filters__sheet-group">
    <legend>${esc(label)}</legend>
    <div class="villa-filters__sheet-options">
      <button type="button" class="villa-filter__option${selected == null ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="">${esc(allLabel)}</button>
      ${steps.map(step => `
        <button type="button" class="villa-filter__option${selected === step ? ' is-selected' : ''}" data-filter-set="${esc(key)}" data-value="${step}">${step}+${esc(suffix)}</button>
      `).join('')}
    </div>
  </fieldset>`;
}

function filterIconSvg() {
  return `<svg class="villa-filters__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 7h9M17 7h3M4 12h5M13 12h7M4 17h11M19 17h1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="15.5" cy="7" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10.5" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="17.5" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`;
}

function buildMinSteps(maxValue, preferred) {
  if (!maxValue) return [];
  const steps = preferred.filter(n => n <= maxValue);
  if (maxValue >= (preferred[0] || 0) && !steps.includes(maxValue) && maxValue > (steps.at(-1) || 0)) {
    steps.push(maxValue);
  }
  return steps;
}

function countJetActive(filters) {
  let n = 0;
  if (filters.aircraftType) n += 1;
  if (filters.manufacturer) n += 1;
  if (filters.passengers != null) n += 1;
  if (filters.range != null) n += 1;
  return n;
}

function countYachtActive(filters) {
  let n = 0;
  if (filters.marina) n += 1;
  if (filters.yachtType) n += 1;
  if (filters.builder) n += 1;
  if (filters.length != null) n += 1;
  if (filters.guests != null) n += 1;
  if (filters.cabins != null) n += 1;
  return n;
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b)));
}
