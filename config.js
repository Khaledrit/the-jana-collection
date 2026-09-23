/**
 * Central brand configuration for Private Luxury Holidays.
 * Clear brandByline (or set to "") later to remove “by JANA Travel” site-wide.
 */
export const BRAND = {
  brandName: "Private Luxury Holidays",
  brandByline: "by JANA Travel",
  brandNameAr: "عطلات فاخرة خاصة",
  brandBylineAr: "من جنى ترافل",
  /** Parent / licensing entity — keep where legal ownership language is required. */
  parentName: "Jana Travel",
  parentNameAr: "جنى ترافل"
};

export const OWNER_CONFIG = {
  whatsappNumber: "+971501771927",
  contactEmail: "",
  contactPhone: "",
  socialLinks: {}
};

/** Display name for the active language. */
export function brandName(isArabic = false) {
  return isArabic ? BRAND.brandNameAr : BRAND.brandName;
}

/** Optional byline; returns empty string when removed. */
export function brandByline(isArabic = false) {
  if (!BRAND.brandByline) return "";
  return isArabic ? (BRAND.brandBylineAr || BRAND.brandByline) : BRAND.brandByline;
}

/** “Name” or “Name — byline” for titles / metadata. */
export function brandTitle(isArabic = false) {
  const name = brandName(isArabic);
  const by = brandByline(isArabic);
  return by ? `${name} — ${by}` : name;
}
