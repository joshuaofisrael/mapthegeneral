import constituenciesJson from "./constituencies.json";
import localsJson from "./locals.json";
import { regionBySlug } from "./places";

export type LocalOffice = {
  address: string;
  postcode: string;
  host: string;
};

export type PersonCell = {
  name: string;
  party: string;
};

export type HeadCell = PersonCell & {
  district: string;
};

export type VacancyCell = {
  pollingDay: string;
  reason: string;
  reasonOn: string;
  confirmedOn: string;
  person: string;
  party: string;
};

export type LocalUnit = {
  slug: string;
  name: string;
  kind: "si" | "gun" | "gu";
  region: string;
  bookParent: string;
  inBook: boolean;
  offices: LocalOffice[];
  head: HeadCell | null;
  vacancy: VacancyCell | null;
};

export type ConstituencyMember = PersonCell & {
  origNm: string;
  url: string;
};

export type Constituency = {
  code: string;
  cityCode: string;
  name: string;
  city: string;
  region: string;
  slug: string;
  member: ConstituencyMember | null;
  bye2026: PersonCell | null;
  vacancy: VacancyCell | null;
};

const localsFile = localsJson as { adminSi: string[]; units: LocalUnit[] };
const constituencyFile = constituenciesJson as Constituency[];

export const ADMIN_SI = localsFile.adminSi;
// Law No. 20161 abolished Incheon Jung-gu and Dong-gu on 1 July 2026. Section 7-5
// (31 December 2025) still prints them, so they stay in the book count but get no page.
const ABOLISHED_2026 = new Set(["incheon/jung-gu", "incheon/dong-gu"]);
const ALL_UNITS: LocalUnit[] = localsFile.units;
export const ABOLISHED_UNITS: LocalUnit[] = ALL_UNITS.filter((unit) => ABOLISHED_2026.has(`${unit.region}/${unit.slug}`));
export const LOCAL_UNITS: LocalUnit[] = ALL_UNITS.filter((unit) => !ABOLISHED_2026.has(`${unit.region}/${unit.slug}`));
export const INCHEON_LAW_URL =
  "https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EC%9D%B8%EC%B2%9C%EA%B4%91%EC%97%AD%EC%8B%9C%EC%A0%9C%EB%AC%BC%ED%8F%AC%EA%B5%AC%E3%86%8D%EC%98%81%EC%A2%85%EA%B5%AC%EB%B0%8F%EA%B2%80%EB%8B%A8%EA%B5%AC%EC%84%A4%EC%B9%98%EB%93%B1%EC%97%90%EA%B4%80%ED%95%9C%EB%B2%95%EB%A5%A0";
export const INCHEON_REFORM_URL = "https://www.incheon.go.kr/IC01070101";
export const CONSTITUENCIES: Constituency[] = constituencyFile;

export const BOOK_LOCAL_COUNT = ALL_UNITS.filter((unit) => unit.inBook).length;
export const ROSTER_ONLY_COUNT = ALL_UNITS.filter((unit) => !unit.inBook).length;

function byKoreanName<T extends { name: string }>(rows: T[]): T[] {
  return [...rows].sort((a, b) => a.name.localeCompare(b.name, "ko"));
}

export function unitsInRegion(region: string): LocalUnit[] {
  return byKoreanName(LOCAL_UNITS.filter((unit) => unit.region === region));
}

export function constituenciesInRegion(region: string): Constituency[] {
  return byKoreanName(CONSTITUENCIES.filter((row) => row.region === region));
}

export function unitBySlug(region: string, slug: string): LocalUnit | undefined {
  return LOCAL_UNITS.find((unit) => unit.region === region && unit.slug === slug);
}

export function constituencyBySlug(slug: string): Constituency | undefined {
  return CONSTITUENCIES.find((row) => row.slug === slug);
}

export function localNeighbors(unit: LocalUnit): { prev: LocalUnit | null; next: LocalUnit | null } {
  const list = unitsInRegion(unit.region);
  const index = list.findIndex((item) => item.slug === unit.slug);
  return { prev: list[index - 1] ?? null, next: list[index + 1] ?? null };
}

export function constituencyNeighbors(row: Constituency): { prev: Constituency | null; next: Constituency | null } {
  const list = constituenciesInRegion(row.region);
  const index = list.findIndex((item) => item.slug === row.slug);
  return { prev: list[index - 1] ?? null, next: list[index + 1] ?? null };
}

export function districtListUrl(cityCode: string): string {
  return `https://info.nec.go.kr/bizcommon/selectbox/selectbox_getSggCityCodeJson.json?electionId=0020240410&electionCode=2&cityCode=${cityCode}`;
}

function assertLevel2(): void {
  if (BOOK_LOCAL_COUNT !== 226) throw new Error(`book locals ${BOOK_LOCAL_COUNT}`);
  if (ROSTER_ONLY_COUNT !== 3) throw new Error(`roster-only ${ROSTER_ONLY_COUNT}`);
  if (ABOLISHED_UNITS.length !== 2) throw new Error(`abolished ${ABOLISHED_UNITS.length}`);
  if (CONSTITUENCIES.length !== 254) throw new Error(`constituencies ${CONSTITUENCIES.length}`);
  if (ADMIN_SI.join(",") !== "제주시,서귀포시") throw new Error("admin si");
  for (const unit of LOCAL_UNITS) {
    if (!regionBySlug(unit.region)) throw new Error(`region ${unit.region}`);
  }
  for (const row of CONSTITUENCIES) {
    if (!regionBySlug(row.region)) throw new Error(`region ${row.region}`);
  }
}

assertLevel2();
