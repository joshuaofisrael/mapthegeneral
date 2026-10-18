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
export const LOCAL_UNITS: LocalUnit[] = localsFile.units;
export const CONSTITUENCIES: Constituency[] = constituencyFile;

export const BOOK_LOCAL_COUNT = LOCAL_UNITS.filter((unit) => unit.inBook).length;
export const ROSTER_ONLY_COUNT = LOCAL_UNITS.filter((unit) => !unit.inBook).length;

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
