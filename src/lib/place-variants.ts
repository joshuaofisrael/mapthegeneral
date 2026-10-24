/**
 * URL spellings for an official place name.
 *
 * Variants come from the official name and official alternative names only:
 * Saint/St./St, Mount/Mt./Mt, Fort/Ft./Ft, Centre/Center, Harbour/Harbor,
 * accents removed, and the accented spelling when the page slug already
 * dropped it. A slash in an official name is an alternative name.
 */

const TOKEN_SWAPS: Array<[RegExp, string]> = [
  [/\bSaint\b/gi, "St."],
  [/\bSaint\b/gi, "St"],
  [/\bSt\./gi, "Saint"],
  [/\bSt\./gi, "St"],
  [/\bSt(?!\.)\b/gi, "Saint"],
  [/\bSt(?!\.)\b/gi, "St."],
  [/\bMount\b/gi, "Mt."],
  [/\bMount\b/gi, "Mt"],
  [/\bMt\./gi, "Mount"],
  [/\bMt\./gi, "Mt"],
  [/\bMt(?!\.)\b/gi, "Mount"],
  [/\bMt(?!\.)\b/gi, "Mt."],
  [/\bFort\b/gi, "Ft."],
  [/\bFort\b/gi, "Ft"],
  [/\bFt\./gi, "Fort"],
  [/\bFt\./gi, "Ft"],
  [/\bFt(?!\.)\b/gi, "Fort"],
  [/\bFt(?!\.)\b/gi, "Ft."],
  [/\bCentre\b/gi, "Center"],
  [/\bCenter\b/gi, "Centre"],
  [/\bHarbour\b/gi, "Harbor"],
  [/\bHarbor\b/gi, "Harbour"],
];

function applyTokenSwaps(name: string): string[] {
  const forms: string[] = [];
  for (const [pattern, replacement] of TOKEN_SWAPS) {
    pattern.lastIndex = 0;
    if (!pattern.test(name)) continue;
    pattern.lastIndex = 0;
    forms.push(name.replace(pattern, replacement));
  }
  return forms;
}

/** Accent-free slug. Apostrophes and periods are removed before hyphenation. */
export function foldSlug(value: string): string {
  const norm = value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
  return norm.replace(/ /g, "-");
}

/** Same hyphenation, keeping letters with accents. */
export function accentSlug(value: string): string {
  const norm = value
    .normalize("NFC")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/\./g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ");
  return norm.replace(/ /g, "-");
}

export function safePlaceSlug(slug: string): boolean {
  if (slug.length < 2 || slug.length > 120) return false;
  if (slug.includes("..") || slug.includes("/") || slug.includes("\\")) return false;
  return /^[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*$/u.test(slug);
}

function officialForms(names: readonly string[]): Set<string> {
  const forms = new Set<string>();
  for (const name of names) {
    const clean = name.trim();
    if (!clean) continue;
    forms.add(clean);
    if (clean.includes("/")) {
      for (const part of clean.split("/")) {
        const piece = part.trim();
        if (piece) forms.add(piece);
      }
    }
  }
  return forms;
}

/** Slugs a reader might type. The page's own slug is included and filtered by the caller. */
export function variantSlugs(names: readonly string[]): string[] {
  const forms = officialForms(names);
  const expanded = new Set<string>(forms);
  for (const form of forms) {
    for (const swapped of applyTokenSwaps(form)) expanded.add(swapped);
  }
  for (const form of [...expanded]) {
    for (const swapped of applyTokenSwaps(form)) expanded.add(swapped);
  }
  const slugs = new Set<string>();
  for (const form of expanded) {
    for (const slug of [foldSlug(form), accentSlug(form)]) {
      if (safePlaceSlug(slug)) slugs.add(slug);
    }
  }
  return [...slugs];
}
