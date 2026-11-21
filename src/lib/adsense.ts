/**
 * Shared HTML document helpers.
 * mapthegeneral.com no longer participates in Google AdSense.
 * Do not emit an ad loader, an ad slot, or an account meta tag from this module.
 */
const HEAD_RE = /<head\b[^>]*>([\s\S]*?)<\/head>/i;
const REFRESH_RE = /http-equiv\s*=\s*["']refresh["']/i;

export function isRedirectStub(html: string): boolean {
  return REFRESH_RE.test(html);
}

/** Real documents have a head. Verification tokens and other non-pages do not. */
export function htmlHead(html: string): string | null {
  const match = html.match(HEAD_RE);
  return match ? match[1] : null;
}
