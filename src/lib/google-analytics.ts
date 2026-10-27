/**
 * Google Analytics 4 for mapthegeneral.com.
 * The measurement ID is public. gtag.js is not in the HTML.
 * public/consent.js loads it only after the visitor clicks Accept.
 * The measurement id string has to stay in each HTML page for scripts/check-ga.ts.
 */
import { htmlHead } from "./adsense";

export const GA_MEASUREMENT_ID = "G-ZFR5N4M7PY";

/** localStorage key that remembers the visitor's analytics choice ("granted" or "denied"). */
export const CONSENT_STORAGE_KEY = "mtg-analytics-consent";

/** Window property consent.js reads. Must match public/consent.js. */
export const GA_WINDOW_ID = "__mtgGaId";

export const GA_ID_SCRIPT = `<script data-ga-loader="1">window.${GA_WINDOW_ID}=${JSON.stringify(GA_MEASUREMENT_ID)};</script>`;

export const GA_CONSENT_SCRIPT = `<script data-ga-loader="1" defer src="/consent.js"></script>`;

/** Head tags for static documents, including noindex redirect stubs. */
export const GA_HEAD_TAGS = `${GA_ID_SCRIPT}\n${GA_CONSENT_SCRIPT}`;

const CONSENT_SRC_RE = /<script\b[^>]*\bsrc=["']\/consent\.js["'][^>]*>/i;

export function htmlHasGaLoader(html: string): boolean {
  return html.includes(GA_MEASUREMENT_ID) && CONSENT_SRC_RE.test(html);
}

/**
 * Insert the measurement id and consent.js before </head> when they are missing.
 * Redirect stubs are included. Files with no head (the Google verification token) are left alone.
 * Does not add or remove AdSense tags.
 */
export function ensureGaHead(html: string): string {
  if (htmlHead(html) === null) return html;
  if (htmlHasGaLoader(html)) return html;
  const stripped = html
    .replace(/<script\b[^>]*\bdata-ga-loader=["']1["'][^>]*>[\s\S]*?<\/script>\s*/gi, "")
    .replace(/<script\b[^>]*>\s*window\.__mtgGaId=[\s\S]*?<\/script>\s*/gi, "")
    .replace(/<script\b[^>]*\bsrc=["']\/consent\.js["'][^>]*>\s*<\/script>\s*/gi, "");
  return stripped.replace(/<\/head>/i, `${GA_HEAD_TAGS}\n</head>`);
}
