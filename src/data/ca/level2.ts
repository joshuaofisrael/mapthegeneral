import { alphaRegions, CURRENT_CANADA, regionBySlug } from "./places";
import type { CaLang } from "./types";
import districtsJson from "./districts.json";
import divisionsJson from "./divisions.json";

export type DistrictMp = {
  id: string;
  /** Path tail printed on the House current-members search page, such as name(id). */
  profile: string;
  honorificEn: string;
  honorificFr: string;
  first: string;
  last: string;
  partyEn: string;
  partyFr: string;
  /** YYYY-MM-DD from the House FromDateTime element. */
  from: string;
};

export type District = {
  fed: string;
  slug: string;
  region: string;
  nameEn: string;
  nameFr: string;
  /**
   * True when ED_NAMEE and CF_NOMF in the Elections Canada boundary file store the
   * name, a comma, and the name again. On the longest rows the repeated copy is cut
   * off at 100 bytes. The text before the comma matches the House name.
   */
  repeats: boolean;
  mp: DistrictMp | null;
};

export type CensusDivision = {
  code: string;
  slug: string;
  region: string;
  nameEn: string;
  nameFr: string;
};

export const DISTRICTS = districtsJson as District[];
export const DIVISIONS = divisionsJson as CensusDivision[];

const PARTY_KEY = {
  Liberal: "liberal",
  Conservative: "conservative",
  "Bloc Québécois": "bloc",
  NDP: "ndp",
  "Green Party": "green",
} as const;

function assertLevel2(): void {
  if (DISTRICTS.length !== 343) throw new Error(`Expected 343 federal electoral districts, found ${DISTRICTS.length}`);
  if (DIVISIONS.length !== 293) throw new Error(`Expected 293 census divisions, found ${DIVISIONS.length}`);
  const seenFed = new Set<string>();
  const seenCode = new Set<string>();
  const seenDistrictSlug = new Set<string>();
  const seenDivisionSlug = new Set<string>();
  const byRegion = new Map<string, { liberal: number; conservative: number; bloc: number; ndp: number; green: number; vacant: number }>();
  for (const region of alphaRegions("en")) {
    byRegion.set(region.slug, { liberal: 0, conservative: 0, bloc: 0, ndp: 0, green: 0, vacant: 0 });
  }
  for (const district of DISTRICTS) {
    if (seenFed.has(district.fed)) throw new Error(`Duplicate FED ${district.fed}`);
    seenFed.add(district.fed);
    const slugKey = `${district.region}/${district.slug}`;
    if (seenDistrictSlug.has(slugKey)) throw new Error(`Duplicate district slug ${slugKey}`);
    seenDistrictSlug.add(slugKey);
    const bucket = byRegion.get(district.region);
    const region = regionBySlug(district.region);
    if (!bucket || !region) throw new Error(`District ${district.fed} has unknown region ${district.region}`);
    if (!district.mp) {
      bucket.vacant += 1;
      continue;
    }
    const key = PARTY_KEY[district.mp.partyEn as keyof typeof PARTY_KEY];
    if (!key) throw new Error(`Unexpected caucus ${district.mp.partyEn} for ${district.fed}`);
    bucket[key] += 1;
  }
  for (const region of alphaRegions("en")) {
    const got = byRegion.get(region.slug);
    if (!got) throw new Error(`Missing district tally for ${region.slug}`);
    const expected = region.current;
    if (
      got.liberal !== expected.liberal ||
      got.conservative !== expected.conservative ||
      got.bloc !== expected.bloc ||
      got.ndp !== expected.ndp ||
      got.green !== expected.green ||
      got.vacant !== expected.vacant
    ) {
      throw new Error(`${region.nameEn} members do not match the 17 October 2026 standings: ${JSON.stringify(got)}`);
    }
  }
  const canada = [...byRegion.values()].reduce(
    (total, row) => ({
      liberal: total.liberal + row.liberal,
      conservative: total.conservative + row.conservative,
      bloc: total.bloc + row.bloc,
      ndp: total.ndp + row.ndp,
      green: total.green + row.green,
      vacant: total.vacant + row.vacant,
    }),
    { liberal: 0, conservative: 0, bloc: 0, ndp: 0, green: 0, vacant: 0 },
  );
  if (
    canada.liberal !== CURRENT_CANADA.liberal ||
    canada.conservative !== CURRENT_CANADA.conservative ||
    canada.bloc !== CURRENT_CANADA.bloc ||
    canada.ndp !== CURRENT_CANADA.ndp ||
    canada.green !== CURRENT_CANADA.green ||
    canada.vacant !== CURRENT_CANADA.vacant
  ) {
    throw new Error(`Member file does not match House standings: ${JSON.stringify(canada)}`);
  }
  for (const division of DIVISIONS) {
    if (seenCode.has(division.code)) throw new Error(`Duplicate SGC code ${division.code}`);
    seenCode.add(division.code);
    const slugKey = `${division.region}/${division.slug}`;
    if (seenDivisionSlug.has(slugKey)) throw new Error(`Duplicate division slug ${slugKey}`);
    seenDivisionSlug.add(slugKey);
    if (!regionBySlug(division.region)) throw new Error(`Division ${division.code} has unknown region ${division.region}`);
  }
}

assertLevel2();

function collator(lang: CaLang): Intl.Collator {
  return new Intl.Collator(lang === "fr" ? "fr-CA" : "en-CA");
}

export function districtName(district: District, lang: CaLang): string {
  return lang === "fr" ? district.nameFr : district.nameEn;
}

export function divisionName(division: CensusDivision, lang: CaLang): string {
  return lang === "fr" ? division.nameFr : division.nameEn;
}

export function districtsIn(region: string, lang: CaLang): District[] {
  const compare = collator(lang);
  return DISTRICTS.filter((district) => district.region === region).sort((a, b) =>
    compare.compare(districtName(a, lang), districtName(b, lang)),
  );
}

export function divisionsIn(region: string, lang: CaLang): CensusDivision[] {
  const compare = collator(lang);
  return DIVISIONS.filter((division) => division.region === region).sort((a, b) =>
    compare.compare(divisionName(a, lang), divisionName(b, lang)),
  );
}

export function districtNeighbors(district: District, lang: CaLang): { prev?: District; next?: District } {
  const list = districtsIn(district.region, lang);
  const index = list.findIndex((item) => item.slug === district.slug);
  return { prev: list[index - 1], next: list[index + 1] };
}

export function divisionNeighbors(
  division: CensusDivision,
  lang: CaLang,
): { prev?: CensusDivision; next?: CensusDivision } {
  const list = divisionsIn(division.region, lang);
  const index = list.findIndex((item) => item.slug === division.slug);
  return { prev: list[index - 1], next: list[index + 1] };
}
