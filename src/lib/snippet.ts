import { SITE } from "@/data/site";

/** Code-point limit for meta descriptions. Matches the search-snippet rule. */
export const DESCRIPTION_LIMIT = 160;

/** The root layout and static shells append this to the title field. */
export const TITLE_SUFFIX = ` · ${SITE.name}`;

/** Room left for the title field so the rendered `<title>` stays near 60 characters. */
export const TITLE_FIELD_LIMIT = 60 - [...TITLE_SUFFIX].length;

export function snippetLength(value: string): number {
  return [...value].length;
}

export function withinDescription(value: string): boolean {
  return snippetLength(value) <= DESCRIPTION_LIMIT;
}

/** First candidate that fits. Later candidates are shorter fallbacks. */
export function fitDescription(label: string, candidates: readonly string[]): string {
  for (const candidate of candidates) {
    if (withinDescription(candidate)) return candidate;
  }
  const first = candidates[0] ?? "";
  throw new Error(
    `${label} description is ${snippetLength(first)} characters; nothing fits in ${DESCRIPTION_LIMIT}.`,
  );
}

/**
 * Place plus election context when the rendered title stays within 60 characters.
 * Otherwise the place name alone.
 */
export function fitMetaTitle(place: string, context: string): string {
  const withContext = `${place} — ${context}`;
  if (snippetLength(withContext) <= TITLE_FIELD_LIMIT) return withContext;
  return place;
}
