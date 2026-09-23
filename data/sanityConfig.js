/**
 * Public Sanity project settings for the Private Luxury Holidays site.
 * Safe for the browser: project ID + dataset only (no write tokens).
 * useCdn: false so publish/unpublish changes are visible immediately.
 * perspective 'published' still excludes drafts.
 */
export const SANITY_CONFIG = {
  projectId: 'm8jragbr',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false
};

export const sanityQueryUrl = () => {
  const host = SANITY_CONFIG.useCdn
    ? `${SANITY_CONFIG.projectId}.apicdn.sanity.io`
    : `${SANITY_CONFIG.projectId}.api.sanity.io`;
  return `https://${host}/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}`;
};
