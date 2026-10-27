/**
 * Original previews for the homepage, country hubs, and dated election pages.
 * The body is the editorial text. The byline and the Last updated line are
 * rendered beside it and are not counted in the 300–600 word body.
 * No survey figure is stored here. A percent sign is not used.
 */

export type EditorialCitation = { label: string; href: string };

export type EditorialPreview = {
  path: string;
  lang: string;
  dir?: "rtl" | "ltr";
  heading: string;
  /** Native-language date line. English pages omit it. */
  updatedLocal?: string;
  sourcesHeading: string;
  paragraphs: string[];
  citations: EditorialCitation[];
};

export const EDITORIAL_BYLINE = "Map the General Editorial Team";
export const EDITORIAL_UPDATED = "Last updated: 27 October 2026.";

/** CJK characters have no spaces, so each one counts as a word. Spaced languages stay on whitespace tokens. */
export function editorialWords(item: EditorialPreview): number {
  const text = item.paragraphs.join(" ").trim();
  const cjk = text.match(/[\u3400-\u9FFF\uF900-\uFAFF]/g)?.length ?? 0;
  const rest = text.replace(/[\u3400-\u9FFF\uF900-\uFAFF]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return cjk + rest;
}

export function editorialPlain(item: EditorialPreview): string {
  return [
    item.heading,
    item.updatedLocal ?? "",
    EDITORIAL_UPDATED,
    EDITORIAL_BYLINE,
    ...item.paragraphs,
    item.sourcesHeading,
    ...item.citations.map((cite) => `${cite.label} ${cite.href}`),
  ].join("\n");
}
