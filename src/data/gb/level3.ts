import rawJson from "./level3.json";
import { NATION_NAME, WESTMINSTER, type NationSlug } from "./level2";

export type Council = {
  code: string;
  name: string;
  welshName: string | null;
  slug: string;
  nation: NationSlug;
  kind: "lad" | "county";
  file: string;
  classLabel: string;
  cycleId: string;
  timetable: string;
  nextText: string;
  show2026Day: boolean;
  nameNote: string | null;
  regionCode: string | null;
  regionName: string | null;
  regionWelsh: string | null;
  countyCode: string | null;
  countyName: string | null;
  countySlug: string | null;
  cauthCode: string | null;
  cauthName: string | null;
  cauthMayoral: boolean;
  cauthSlug: string | null;
  pcon: string[];
  splitWard: boolean;
  regionCodes?: string[];
};

export type MayorBody = {
  code: string | null;
  name: string;
  slug: string;
  page: "ca" | "gla";
  factsheetName: string;
  factsheetClass: string;
  lastText: string;
  nextText: string;
  timetable: string;
  headingNote: string | null;
  lgr: boolean;
  constituents: string | null;
  extraCountyCode: string | null;
  memberCodes: string[];
  pcon: string[];
  voteNote: string;
  lgrText: string | null;
};

export type OmittedAuthority = {
  code: string;
  name: string;
  reason: string;
};

type Level3File = {
  readOn: string;
  councils: Council[];
  mayors: MayorBody[];
  omittedAuthorities: OmittedAuthority[];
};

const data = rawJson as Level3File;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

assert(data.readOn === "2026-10-19", "level3 readOn");
assert(data.omittedAuthorities.length === 2, "omitted authorities");
assert(data.mayors.length === 14, "mayor pages");
assert(data.mayors.filter((item) => item.page === "gla").length === 1, "gla");

const lads = data.councils.filter((item) => item.kind === "lad");
const counties = data.councils.filter((item) => item.kind === "county");
assert(lads.length === 361, "lad count");
assert(counties.length === 21, "county count");

const prefixes: Record<string, number> = {};
for (const council of lads) prefixes[council.code.slice(0, 3)] = (prefixes[council.code.slice(0, 3)] ?? 0) + 1;
assert(prefixes.E06 === 63, "unitaries");
assert(prefixes.E07 === 164, "districts");
assert(prefixes.E08 === 36, "metropolitan districts");
assert(prefixes.E09 === 33, "london and city");
assert(prefixes.S12 === 32, "scottish councils");
assert(prefixes.W06 === 22, "welsh councils");
assert(prefixes.N09 === 11, "ni councils");
assert(lads.filter((item) => item.nation === "wales" && item.welshName).length === 22, "welsh names");

const gss = new Set(WESTMINSTER.map((seat) => seat.gss));
const seen = new Set<string>();
for (const council of lads) {
  assert(council.pcon.length > 0, council.name);
  for (const code of council.pcon) {
    assert(gss.has(code), `${council.name} ${code}`);
    seen.add(code);
  }
}
assert(seen.size === 650, "westminster coverage");

const ladSlugs = new Set<string>();
for (const council of lads) {
  assert(!ladSlugs.has(council.slug), council.slug);
  ladSlugs.add(council.slug);
}

export const LEVEL3_READ_ON = data.readOn;
export const COUNCILS = data.councils;
export const MAYORS = data.mayors;
export const OMITTED_AUTHORITIES = data.omittedAuthorities;
export const LADS = lads;
export const COUNTIES = counties;

export const COUNCILS_HUB = "/gb/en/councils/";
export const COUNTIES_INDEX = "/gb/en/england/counties/";
export const MAYORS_INDEX = "/gb/en/england/combined-authorities/";
export const GLA_PATH = "/gb/en/england/greater-london-authority/";

export function nationCouncilsIndex(nation: NationSlug): string {
  return `/gb/en/${nation}/councils/`;
}

export function councilPath(council: Council): string {
  if (council.kind === "county") return `/gb/en/england/counties/${council.slug}/`;
  return `/gb/en/${council.nation}/councils/${council.slug}/`;
}

export function mayorPath(mayor: MayorBody): string {
  if (mayor.page === "gla") return GLA_PATH;
  return `/gb/en/england/combined-authorities/${mayor.slug}/`;
}

export function councilsIn(nation: NationSlug): Council[] {
  return LADS.filter((council) => council.nation === nation).sort((a, b) => a.name.localeCompare(b.name, "en"));
}

export function districtsInCounty(countyCode: string): Council[] {
  return LADS.filter((council) => council.countyCode === countyCode).sort((a, b) => a.name.localeCompare(b.name, "en"));
}

export function councilByCode(code: string): Council | undefined {
  return COUNCILS.find((council) => council.code === code);
}

const byGss = new Map(WESTMINSTER.map((seat) => [seat.gss, seat]));

export function constituenciesFor(codes: string[]) {
  return codes
    .map((code) => byGss.get(code))
    .filter((seat): seat is NonNullable<typeof seat> => Boolean(seat))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
}

export type Level3SearchRow = {
  path: string;
  title: string;
  kind: string;
  text: string;
};

export function gbLevel3SearchEntries(): Level3SearchRow[] {
  const rows: Level3SearchRow[] = [
    {
      path: COUNCILS_HUB,
      title: "Principal councils",
      kind: "index",
      text: "principal councils county district unitary London borough Scottish Welsh Northern Ireland mayor",
    },
    {
      path: COUNTIES_INDEX,
      title: "English county councils",
      kind: "index",
      text: "county councils England",
    },
    {
      path: MAYORS_INDEX,
      title: "Directly elected mayors",
      kind: "index",
      text: "combined authority mayor Mayor of London London Assembly",
    },
  ];
  for (const nation of ["england", "scotland", "wales", "northern-ireland"] as const) {
    rows.push({
      path: nationCouncilsIndex(nation),
      title: `Councils in ${NATION_NAME[nation]}`,
      kind: "index",
      text: `${NATION_NAME[nation]} councils local authority`,
    });
  }
  for (const council of COUNCILS) {
    rows.push({
      path: councilPath(council),
      title: council.name,
      kind: council.kind === "county" ? "county" : "council",
      text: `${council.name} ${council.welshName ?? ""} ${council.code} ${council.classLabel} ${NATION_NAME[council.nation]} ${council.regionName ?? ""}`,
    });
  }
  for (const mayor of MAYORS) {
    rows.push({
      path: mayorPath(mayor),
      title: mayor.name,
      kind: "mayor",
      text: `${mayor.name} ${mayor.factsheetName} ${mayor.code ?? ""} mayor`,
    });
  }
  return rows;
}
