import type { Affiliation, CurrentStanding } from "./types";

export type Region = {
  slug: string;
  /** Name printed on the English House of Commons party-standings page. */
  nameEn: string;
  /** Name printed on the French House of Commons party-standings page. */
  nameFr: string;
  kind: "province" | "territory";
  /** Geography label printed in The Daily of 23 September 2026. */
  dailyLabel: string;
  population: number;
  commonsSeats: number;
  senateSeats: number;
  /** Party standings table read on 17 October 2026. */
  current: CurrentStanding;
  /**
   * Sum of the Male, Female, Another Gender, and Unknown columns in Elections Canada
   * table 7 for the forty-fifth general election. The Canada row is checked separately.
   */
  results2025: Affiliation;
  sourceIds: string[];
};

const SHARED = ["statcan-daily", "statcan-17100009", "hoc-standings", "hoc-standings-fr", "ec-table7", "senate-about"] as const;

export const REGIONS: Region[] = [
  {
    slug: "alberta",
    nameEn: "Alberta",
    nameFr: "Alberta",
    kind: "province",
    dailyLabel: "Alta.",
    population: 5_101_050,
    commonsSeats: 37,
    senateSeats: 6,
    current: { liberal: 3, conservative: 33, bloc: 0, ndp: 1, green: 0, vacant: 0 },
    results2025: { liberal: 2, conservative: 34, bloc: 0, ndp: 1, green: 0 },
    sourceIds: [...SHARED, "ab-next"],
  },
  {
    slug: "british-columbia",
    nameEn: "British Columbia",
    nameFr: "Colombie-Britannique",
    kind: "province",
    dailyLabel: "B.C.",
    population: 5_710_598,
    commonsSeats: 43,
    senateSeats: 6,
    current: { liberal: 20, conservative: 19, bloc: 0, ndp: 3, green: 1, vacant: 0 },
    results2025: { liberal: 20, conservative: 19, bloc: 0, ndp: 3, green: 1 },
    sourceIds: [...SHARED, "bc-2026"],
  },
  {
    slug: "manitoba",
    nameEn: "Manitoba",
    nameFr: "Manitoba",
    kind: "province",
    dailyLabel: "Man.",
    population: 1_517_379,
    commonsSeats: 14,
    senateSeats: 6,
    current: { liberal: 6, conservative: 7, bloc: 0, ndp: 1, green: 0, vacant: 0 },
    results2025: { liberal: 6, conservative: 7, bloc: 0, ndp: 1, green: 0 },
    sourceIds: [...SHARED, "mb-voting"],
  },
  {
    slug: "new-brunswick",
    nameEn: "New Brunswick",
    nameFr: "Nouveau-Brunswick",
    kind: "province",
    dailyLabel: "N.B.",
    population: 883_522,
    commonsSeats: 10,
    senateSeats: 10,
    current: { liberal: 6, conservative: 4, bloc: 0, ndp: 0, green: 0, vacant: 0 },
    results2025: { liberal: 6, conservative: 4, bloc: 0, ndp: 0, green: 0 },
    sourceIds: [...SHARED],
  },
  {
    slug: "newfoundland-and-labrador",
    nameEn: "Newfoundland and Labrador",
    nameFr: "Terre-Neuve-et-Labrador",
    kind: "province",
    dailyLabel: "N.L.",
    population: 552_462,
    commonsSeats: 7,
    senateSeats: 6,
    current: { liberal: 4, conservative: 3, bloc: 0, ndp: 0, green: 0, vacant: 0 },
    results2025: { liberal: 4, conservative: 3, bloc: 0, ndp: 0, green: 0 },
    sourceIds: [...SHARED, "nl-writ"],
  },
  {
    slug: "northwest-territories",
    nameEn: "Northwest Territories",
    nameFr: "Territoires du Nord-Ouest",
    kind: "territory",
    dailyLabel: "N.W.T.",
    population: 45_904,
    commonsSeats: 1,
    senateSeats: 1,
    current: { liberal: 1, conservative: 0, bloc: 0, ndp: 0, green: 0, vacant: 0 },
    results2025: { liberal: 1, conservative: 0, bloc: 0, ndp: 0, green: 0 },
    sourceIds: [...SHARED, "nwt-about"],
  },
  {
    slug: "nova-scotia",
    nameEn: "Nova Scotia",
    nameFr: "Nouvelle-Écosse",
    kind: "province",
    dailyLabel: "N.S.",
    population: 1_103_419,
    commonsSeats: 11,
    senateSeats: 10,
    current: { liberal: 11, conservative: 0, bloc: 0, ndp: 0, green: 0, vacant: 0 },
    results2025: { liberal: 10, conservative: 1, bloc: 0, ndp: 0, green: 0 },
    sourceIds: [...SHARED],
  },
  {
    slug: "nunavut",
    nameEn: "Nunavut",
    nameFr: "Nunavut",
    kind: "territory",
    dailyLabel: "Nvt.",
    population: 43_091,
    commonsSeats: 1,
    senateSeats: 1,
    current: { liberal: 1, conservative: 0, bloc: 0, ndp: 0, green: 0, vacant: 0 },
    results2025: { liberal: 0, conservative: 0, bloc: 0, ndp: 1, green: 0 },
    sourceIds: [...SHARED],
  },
  {
    slug: "ontario",
    nameEn: "Ontario",
    nameFr: "Ontario",
    kind: "province",
    dailyLabel: "Ont.",
    population: 16_262_121,
    commonsSeats: 122,
    senateSeats: 24,
    current: { liberal: 71, conservative: 49, bloc: 0, ndp: 0, green: 0, vacant: 2 },
    results2025: { liberal: 70, conservative: 52, bloc: 0, ndp: 0, green: 0 },
    sourceIds: [...SHARED, "on-act", "on-premier"],
  },
  {
    slug: "prince-edward-island",
    nameEn: "Prince Edward Island",
    nameFr: "Île-du-Prince-Édouard",
    kind: "province",
    dailyLabel: "P.E.I.",
    population: 182_989,
    commonsSeats: 4,
    senateSeats: 4,
    current: { liberal: 4, conservative: 0, bloc: 0, ndp: 0, green: 0, vacant: 0 },
    results2025: { liberal: 4, conservative: 0, bloc: 0, ndp: 0, green: 0 },
    sourceIds: [...SHARED, "pei-elections"],
  },
  {
    slug: "quebec",
    nameEn: "Quebec",
    nameFr: "Québec",
    kind: "province",
    dailyLabel: "Que.",
    population: 9_067_114,
    commonsSeats: 78,
    senateSeats: 24,
    current: { liberal: 44, conservative: 10, bloc: 21, ndp: 0, green: 0, vacant: 3 },
    results2025: { liberal: 44, conservative: 11, bloc: 22, ndp: 1, green: 0 },
    sourceIds: [...SHARED, "qc-call", "qc-assembly"],
  },
  {
    slug: "saskatchewan",
    nameEn: "Saskatchewan",
    nameFr: "Saskatchewan",
    kind: "province",
    dailyLabel: "Sask.",
    population: 1_278_402,
    commonsSeats: 14,
    senateSeats: 6,
    current: { liberal: 1, conservative: 12, bloc: 0, ndp: 0, green: 0, vacant: 1 },
    results2025: { liberal: 1, conservative: 13, bloc: 0, ndp: 0, green: 0 },
    sourceIds: [...SHARED, "sk-faq"],
  },
  {
    slug: "yukon",
    nameEn: "Yukon",
    nameFr: "Yukon",
    kind: "territory",
    dailyLabel: "Y.T.",
    population: 50_356,
    commonsSeats: 1,
    senateSeats: 1,
    current: { liberal: 1, conservative: 0, bloc: 0, ndp: 0, green: 0, vacant: 0 },
    results2025: { liberal: 1, conservative: 0, bloc: 0, ndp: 0, green: 0 },
    sourceIds: [...SHARED],
  },
];

/** Order of the English party-standings table. */
export const HOUSE_ORDER = REGIONS.map((region) => region.slug);

export const CANADA_POPULATION = 41_798_407;
export const COMMONS_SEATS = 343;
export const SENATE_SEATS = 105;
export const RESULTS_2025_CANADA: Affiliation = {
  liberal: 169,
  conservative: 144,
  bloc: 22,
  ndp: 7,
  green: 1,
};
export const CURRENT_CANADA: CurrentStanding = {
  liberal: 173,
  conservative: 137,
  bloc: 21,
  ndp: 5,
  green: 1,
  vacant: 6,
};

function sumAffiliation(row: Affiliation): number {
  return row.liberal + row.conservative + row.bloc + row.ndp + row.green;
}

function assertCanada(): void {
  if (REGIONS.length !== 13) throw new Error(`Expected 13 regions, got ${REGIONS.length}`);
  const population = REGIONS.reduce((total, region) => total + region.population, 0);
  if (population !== CANADA_POPULATION) {
    throw new Error(`Provincial populations sum to ${population}, not ${CANADA_POPULATION}`);
  }
  const commons = REGIONS.reduce((total, region) => total + region.commonsSeats, 0);
  if (commons !== COMMONS_SEATS) throw new Error(`Commons seats sum to ${commons}`);
  const senate = REGIONS.reduce((total, region) => total + region.senateSeats, 0);
  if (senate !== SENATE_SEATS) throw new Error(`Senate seats sum to ${senate}`);
  const results = REGIONS.reduce(
    (total, region) => ({
      liberal: total.liberal + region.results2025.liberal,
      conservative: total.conservative + region.results2025.conservative,
      bloc: total.bloc + region.results2025.bloc,
      ndp: total.ndp + region.results2025.ndp,
      green: total.green + region.results2025.green,
    }),
    { liberal: 0, conservative: 0, bloc: 0, ndp: 0, green: 0 },
  );
  if (
    results.liberal !== RESULTS_2025_CANADA.liberal ||
    results.conservative !== RESULTS_2025_CANADA.conservative ||
    results.bloc !== RESULTS_2025_CANADA.bloc ||
    results.ndp !== RESULTS_2025_CANADA.ndp ||
    results.green !== RESULTS_2025_CANADA.green
  ) {
    throw new Error(`Table 7 provincial sums do not match the printed Canada row: ${JSON.stringify(results)}`);
  }
  const current = REGIONS.reduce(
    (total, region) => ({
      liberal: total.liberal + region.current.liberal,
      conservative: total.conservative + region.current.conservative,
      bloc: total.bloc + region.current.bloc,
      ndp: total.ndp + region.current.ndp,
      green: total.green + region.current.green,
      vacant: total.vacant + region.current.vacant,
    }),
    { liberal: 0, conservative: 0, bloc: 0, ndp: 0, green: 0, vacant: 0 },
  );
  if (
    current.liberal !== CURRENT_CANADA.liberal ||
    current.conservative !== CURRENT_CANADA.conservative ||
    current.bloc !== CURRENT_CANADA.bloc ||
    current.ndp !== CURRENT_CANADA.ndp ||
    current.green !== CURRENT_CANADA.green ||
    current.vacant !== CURRENT_CANADA.vacant
  ) {
    throw new Error(`House standings do not match the printed totals: ${JSON.stringify(current)}`);
  }
  for (const region of REGIONS) {
    const now = sumAffiliation(region.current) + region.current.vacant;
    const then = sumAffiliation(region.results2025);
    if (now !== region.commonsSeats || then !== region.commonsSeats) {
      throw new Error(`${region.nameEn}: standings ${now} or results ${then} do not equal ${region.commonsSeats} seats`);
    }
  }
}

assertCanada();

const bySlug = new Map(REGIONS.map((region) => [region.slug, region]));

export function regionBySlug(slug: string): Region | undefined {
  return bySlug.get(slug);
}

export function alphaRegions(lang: "en" | "fr"): Region[] {
  const collator = new Intl.Collator(lang === "fr" ? "fr-CA" : "en-CA");
  return [...REGIONS].sort((a, b) =>
    collator.compare(lang === "fr" ? a.nameFr : a.nameEn, lang === "fr" ? b.nameFr : b.nameEn),
  );
}

export function regionNeighbors(slug: string, lang: "en" | "fr"): { prev?: Region; next?: Region } {
  const list = alphaRegions(lang);
  const index = list.findIndex((region) => region.slug === slug);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function regionName(region: Region, lang: "en" | "fr"): string {
  return lang === "fr" ? region.nameFr : region.nameEn;
}
