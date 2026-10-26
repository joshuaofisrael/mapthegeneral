import { CANTONS } from "./cantons";
import { DISTRICTS, SOLE_DISTRICT_NAME } from "./districts";
import raw from "./communes.json";

export type Commune = {
  canton: string;
  /** Empty when the canton has no district page (a single register entry). */
  districtSlug: string;
  districtBfs: string;
  districtName: string;
  slug: string;
  bfs: string;
  name: string;
  shortName: string;
  validFrom: string;
};

/**
 * Political municipalities (type 11) current on 1 January 2026, from
 * 20260101_GDEHist_GDE.txt joined to 20260101_GDEHist_BEZ.txt.
 * Order follows the brief: ZH, BE, VD, AG, SG, then GE, LU, TI, VS,
 * then the next cantons by 2024 permanent resident population,
 * then Zug and the remaining cantons in that same population order.
 * The file has one row for every political municipality current on 1 January 2026.
 */
export const COMMUNES = raw as Commune[];

export const COMMUNE_CANTONS = [
  "ZH",
  "BE",
  "VD",
  "AG",
  "SG",
  "GE",
  "LU",
  "TI",
  "VS",
  "FR",
  "BL",
  "TG",
  "SO",
  "GR",
  "BS",
  "NE",
  "SZ",
  "ZG",
  "SH",
  "JU",
  "AR",
  "NW",
  "GL",
  "OW",
  "UR",
  "AI",
] as const;

export function communeCantonPublished(abbr: string): boolean {
  return (COMMUNE_CANTONS as readonly string[]).includes(abbr);
}

export function communesForParent(canton: string, districtSlug: string): Commune[] {
  return COMMUNES.filter((item) => item.canton === canton && item.districtSlug === districtSlug).sort((a, b) =>
    a.name.localeCompare(b.name, "de"),
  );
}

function assertCommunes(): void {
  const seen = new Set<string>();
  const bfs = new Set<string>();
  const byCanton = new Map<string, number>();
  for (const item of COMMUNES) {
    if (!communeCantonPublished(item.canton)) throw new Error(`Unexpected canton ${item.canton}`);
    const key = `${item.canton}/${item.districtSlug}/${item.slug}`;
    if (seen.has(key) || item.slug === "communes" || item.slug === "index" || !item.slug) throw new Error(key);
    seen.add(key);
    if (bfs.has(item.bfs)) throw new Error(`Duplicate BFS ${item.bfs}`);
    bfs.add(item.bfs);
    byCanton.set(item.canton, (byCanton.get(item.canton) ?? 0) + 1);
  }
  const expected = COMMUNE_CANTONS.reduce((sum, abbr) => {
    const canton = CANTONS.find((item) => item.abbr === abbr);
    return sum + (canton?.municipalities ?? 0);
  }, 0);
  if (COMMUNES.length !== expected) throw new Error(`Expected ${expected} communes, got ${COMMUNES.length}`);
  for (const abbr of COMMUNE_CANTONS) {
    const canton = CANTONS.find((item) => item.abbr === abbr);
    if (!canton || byCanton.get(abbr) !== canton.municipalities) {
      throw new Error(`${abbr} communes ${byCanton.get(abbr)} != ${canton?.municipalities}`);
    }
  }
  for (const district of DISTRICTS) {
    const count = communesForParent(district.canton, district.slug).length;
    if (communeCantonPublished(district.canton)) {
      if (count !== district.municipalities) throw new Error(`${district.canton}/${district.slug} ${count}`);
    } else if (count !== 0) {
      throw new Error(`${district.canton} should be unpublished`);
    }
  }
  for (const [abbr, name] of Object.entries(SOLE_DISTRICT_NAME)) {
    const count = communesForParent(abbr, "").length;
    const canton = CANTONS.find((item) => item.abbr === abbr);
    if (communeCantonPublished(abbr)) {
      if (count !== canton?.municipalities) throw new Error(`${abbr} sole ${count}`);
      const sample = COMMUNES.find((item) => item.canton === abbr);
      if (sample?.districtName !== name) throw new Error(`${abbr} district name`);
    } else if (count !== 0) {
      throw new Error(`${abbr} sole should be unpublished`);
    }
  }
}

assertCommunes();
