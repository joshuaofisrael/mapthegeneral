import constituencyFile from "./constituencies.json";
import districtFile from "./districts.json";
import { PROVINCES, provinceBySlug } from "./provinces";
import type { TrLang } from "./types";

export type DistrictMayor = { name: string; party: string };

export type District = {
  /** Name as printed by YSK for the ilçe belediye başkanı contest. */
  name: string;
  slug: string;
  provinceSlug: string;
  provinceName: string;
  mayor: DistrictMayor | null;
  /** Set when Liste 3 records that the 31 March 2024 contest was cancelled. */
  mayorGap?: "cancelled-31-march-2024";
};

export type Member = {
  /** Name as printed on the TBMM list. */
  name: string;
  /** Party label as printed on the TBMM list. */
  party: string;
  href: string;
  /** The 14 May 2023 elected-name list does not contain this exact string. */
  nameNote?: "tbmm-province-only";
};

export type Constituency = {
  /** secim_CEVRESI_ADI from the YSK open-data list for the 14 May 2023 election. */
  name: string;
  slug: string;
  provinceSlug: string;
  provinceName: string;
  /** Count of names in the YSK elected-member file for this çevre. */
  seats2023: number;
  members: Member[];
};

const districts = districtFile as District[];
const payload = constituencyFile as {
  constituencies: Constituency[];
  unassignedByProvince: Record<string, Member[]>;
  tbmmListed: number;
};

if (districts.length !== 973) throw new Error(`Expected 973 districts, found ${districts.length}`);
const mayorCount = districts.filter((row) => row.mayor).length;
if (mayorCount !== 970) throw new Error(`Expected 970 district mayors, found ${mayorCount}`);
const cancelled = districts.filter((row) => row.mayorGap === "cancelled-31-march-2024");
if (cancelled.length !== 3) throw new Error(`Expected 3 cancelled district contests, found ${cancelled.length}`);

const districtSlugKey = new Set<string>();
for (const district of districts) {
  if (!provinceBySlug(district.provinceSlug)) throw new Error(`Unknown province ${district.provinceSlug}`);
  const key = `${district.provinceSlug}/${district.slug}`;
  if (districtSlugKey.has(key)) throw new Error(`Duplicate district slug ${key}`);
  districtSlugKey.add(key);
}

export const DISTRICTS: District[] = districts;
export const CONSTITUENCIES: Constituency[] = payload.constituencies;
export const UNASSIGNED_BY_PROVINCE: Record<string, Member[]> = payload.unassignedByProvince;
export const TBMM_LISTED = payload.tbmmListed;

if (CONSTITUENCIES.length !== 87) throw new Error(`Expected 87 constituencies, found ${CONSTITUENCIES.length}`);
const seatSum = CONSTITUENCIES.reduce((sum, row) => sum + row.seats2023, 0);
if (seatSum !== 600) throw new Error(`2023 constituency seats sum to ${seatSum}`);
const placed = CONSTITUENCIES.reduce((sum, row) => sum + row.members.length, 0);
const unassigned = Object.values(UNASSIGNED_BY_PROVINCE).reduce((sum, rows) => sum + rows.length, 0);
if (placed + unassigned !== TBMM_LISTED) {
  throw new Error(`TBMM rows ${TBMM_LISTED} do not match placed ${placed} plus unassigned ${unassigned}`);
}

const byProvince = new Map<string, District[]>();
for (const province of PROVINCES) byProvince.set(province.slug, []);
for (const district of DISTRICTS) {
  const list = byProvince.get(district.provinceSlug);
  if (!list) throw new Error(`District province missing ${district.provinceSlug}`);
  list.push(district);
}
for (const list of byProvince.values()) {
  list.sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

const cevreByProvince = new Map<string, Constituency[]>();
for (const row of CONSTITUENCIES) {
  const list = cevreByProvince.get(row.provinceSlug) ?? [];
  list.push(row);
  cevreByProvince.set(row.provinceSlug, list);
}
for (const list of cevreByProvince.values()) {
  list.sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

export function districtsInProvince(provinceSlug: string): District[] {
  return byProvince.get(provinceSlug) ?? [];
}

export function constituenciesInProvince(provinceSlug: string): Constituency[] {
  return cevreByProvince.get(provinceSlug) ?? [];
}

export function districtBySlug(provinceSlug: string, slug: string): District | undefined {
  return districtsInProvince(provinceSlug).find((row) => row.slug === slug);
}

export function constituencyBySlug(slug: string): Constituency | undefined {
  return CONSTITUENCIES.find((row) => row.slug === slug);
}

export function districtNeighbors(district: District): { prev?: District; next?: District } {
  const list = districtsInProvince(district.provinceSlug);
  const index = list.findIndex((row) => row.slug === district.slug);
  return { prev: list[index - 1], next: list[index + 1] };
}

export function constituencyNeighbors(slug: string): { prev?: Constituency; next?: Constituency } {
  const ordered = [...CONSTITUENCIES].sort((a, b) => a.name.localeCompare(b.name, "tr"));
  const index = ordered.findIndex((row) => row.slug === slug);
  return { prev: ordered[index - 1], next: ordered[index + 1] };
}

export function districtPath(lang: TrLang, provinceSlug: string, slug: string): string {
  return `/tr/${lang}/${provinceSlug}/${slug}/`;
}

export function constituencyPath(lang: TrLang, slug: string): string {
  return `/tr/${lang}/secim-cevresi/${slug}/`;
}

export function districtIndexPath(lang: TrLang): string {
  return `/tr/${lang}/ilce/`;
}

export function constituencyIndexPath(lang: TrLang): string {
  return `/tr/${lang}/secim-cevresi/`;
}
