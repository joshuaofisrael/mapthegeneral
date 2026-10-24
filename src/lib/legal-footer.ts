import { LEGAL_NAV } from "../data/site";

/** Exact page-level note for officeholder, election, result, and data templates. */
export const INFORMATIONAL_NOTE =
  "Informational, not advice. Compiled from public sources and AI-assisted; verify with official sources.";

/** English labels. Locale pages link to the English legal URLs, as they do for privacy. */
export function staticLegalNavHtml(): string {
  return LEGAL_NAV.map((item) => {
    const href = item.href.endsWith("/") ? item.href : `${item.href}/`;
    return `<a href="${href}">${item.label}</a>`;
  }).join(" · ");
}

/** Links plus the page-level note, for a static document footer. */
export function legalFooterSuffix(): string {
  return `<nav aria-label="Legal">${staticLegalNavHtml()}</nav><br>${INFORMATIONAL_NOTE}`;
}

/** Static document footer. The copyright line is not included; it belongs on the legal pages only. */
export function withLegalFooter(innerHtml = ""): string {
  const note = innerHtml.trim();
  const suffix = legalFooterSuffix();
  return `<footer class="wrap">${note ? `${note} ${suffix}` : suffix}</footer>`;
}
