/**
 * Official Sanity client for browser / GitHub Pages (read-only API).
 * No write tokens — published documents only (useCdn: false for fresh reads).
 */
import { createClient } from 'https://cdn.jsdelivr.net/npm/@sanity/client@6.28.0/+esm';
import { SANITY_CONFIG } from './sanityConfig.js';

export const sanityClient = createClient({
  projectId: SANITY_CONFIG.projectId,
  dataset: SANITY_CONFIG.dataset,
  apiVersion: SANITY_CONFIG.apiVersion,
  useCdn: SANITY_CONFIG.useCdn,
  perspective: 'published'
});
