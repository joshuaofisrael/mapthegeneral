import type { Land } from "./types";

/**
 * Names, next-election cells, and turnus are copied from the Bundesrat table
 * "Termine der Landtagswahlen", Stand 21.09.2026.
 * Parliament and government URLs are the linked offices. This release does not
 * copy officeholders from those sites.
 */
export const LANDS: Land[] = [
  {
    slug: "baden-wuerttemberg",
    name: "Baden-Württemberg",
    chamber: "landtag",
    parliamentUrl: "https://www.landtag-bw.de/",
    governmentUrl: "https://www.baden-wuerttemberg.de/",
    nextLabel: "voraussichtlich Frühjahr 2031",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
  {
    slug: "bayern",
    name: "Bayern",
    chamber: "landtag",
    parliamentUrl: "https://www.bayern.landtag.de/",
    governmentUrl: "https://www.bayern.de/",
    nextLabel: "voraussichtlich Herbst 2028",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
  {
    slug: "berlin",
    name: "Berlin",
    chamber: "abgeordnetenhaus",
    parliamentUrl: "https://www.parlament-berlin.de/",
    governmentUrl: "https://www.berlin.de/",
    nextLabel: "voraussichtlich Herbst 2031",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
  {
    slug: "brandenburg",
    name: "Brandenburg",
    chamber: "landtag",
    parliamentUrl: "https://www.landtag.brandenburg.de/",
    governmentUrl: "https://www.brandenburg.de/",
    nextLabel: "voraussichtlich Herbst 2029",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
  {
    slug: "bremen",
    name: "Bremen",
    chamber: "buergerschaft",
    parliamentUrl: "https://www.bremische-buergerschaft.de/",
    governmentUrl: "https://www.bremen.de/",
    nextLabel: "30. Mai 2027",
    turnus: "4 Jahre",
    nextIsDate: true,
  },
  {
    slug: "hamburg",
    name: "Hamburg",
    chamber: "buergerschaft",
    parliamentUrl: "https://www.hamburgische-buergerschaft.de/",
    governmentUrl: "https://www.hamburg.de/",
    nextLabel: "voraussichtlich Frühjahr 2030",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
  {
    slug: "hessen",
    name: "Hessen",
    chamber: "landtag",
    parliamentUrl: "https://hessischer-landtag.de/",
    governmentUrl: "https://www.hessen.de/",
    nextLabel: "voraussichtlich Herbst 2028",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
  {
    slug: "mecklenburg-vorpommern",
    name: "Mecklenburg-Vorpommern",
    chamber: "landtag",
    parliamentUrl: "https://www.landtag-mv.de/",
    governmentUrl: "https://www.regierung-mv.de/",
    nextLabel: "voraussichtlich Herbst 2031",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
  {
    slug: "niedersachsen",
    name: "Niedersachsen",
    chamber: "landtag",
    parliamentUrl: "https://www.landtag-niedersachsen.de/",
    governmentUrl: "https://www.niedersachsen.de/",
    nextLabel: "26. September 2027",
    turnus: "5 Jahre",
    nextIsDate: true,
  },
  {
    slug: "nordrhein-westfalen",
    name: "Nordrhein-Westfalen",
    chamber: "landtag",
    parliamentUrl: "https://www.landtag.nrw.de/",
    governmentUrl: "https://www.land.nrw/",
    nextLabel: "25. April 2027",
    turnus: "5 Jahre",
    nextIsDate: true,
  },
  {
    slug: "rheinland-pfalz",
    name: "Rheinland-Pfalz",
    chamber: "landtag",
    parliamentUrl: "https://www.landtag.rlp.de/",
    governmentUrl: "https://www.rlp.de/",
    nextLabel: "voraussichtlich Frühjahr 2031",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
  {
    slug: "saarland",
    name: "Saarland",
    chamber: "landtag",
    parliamentUrl: "https://www.landtag-saar.de/",
    governmentUrl: "https://www.saarland.de/",
    nextLabel: "18. April 2027",
    turnus: "5 Jahre",
    nextIsDate: true,
  },
  {
    slug: "sachsen",
    name: "Sachsen",
    chamber: "landtag",
    parliamentUrl: "https://www.landtag.sachsen.de/",
    governmentUrl: "https://www.sachsen.de/",
    nextLabel: "voraussichtlich Herbst 2029",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
  {
    slug: "sachsen-anhalt",
    name: "Sachsen-Anhalt",
    chamber: "landtag",
    parliamentUrl: "https://www.landtag.sachsen-anhalt.de/",
    governmentUrl: "https://www.sachsen-anhalt.de/",
    nextLabel: "voraussichtlich Herbst 2031",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
  {
    slug: "schleswig-holstein",
    name: "Schleswig-Holstein",
    chamber: "landtag",
    parliamentUrl: "https://www.landtag.ltsh.de/",
    governmentUrl: "https://www.schleswig-holstein.de/",
    nextLabel: "18. April 2027",
    turnus: "5 Jahre",
    nextIsDate: true,
  },
  {
    slug: "thueringen",
    name: "Thüringen",
    chamber: "landtag",
    parliamentUrl: "https://www.thueringer-landtag.de/",
    governmentUrl: "https://www.thueringen.de/",
    nextLabel: "voraussichtlich Herbst 2029",
    turnus: "5 Jahre",
    nextIsDate: false,
  },
];

const bySlug = new Map(LANDS.map((land) => [land.slug, land]));

export function landBySlug(slug: string): Land | undefined {
  return bySlug.get(slug);
}

export function alphaLands(): Land[] {
  return [...LANDS].sort((a, b) => a.name.localeCompare(b.name, "de"));
}

export function landNeighbors(slug: string): { prev?: Land; next?: Land } {
  const list = alphaLands();
  const index = list.findIndex((land) => land.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  };
}
