import rows from "./provinces.json";
import type { Province } from "./types";

export const PROVINCES: Province[] = rows;

export const POPULATION_TOTAL = 86_092_168;
export const DEPUTY_TOTAL = 600;

const populationSum = PROVINCES.reduce((sum, province) => sum + province.population, 0);
const deputySum = PROVINCES.reduce((sum, province) => sum + province.deputies2023, 0);
const slugs = new Set(PROVINCES.map((province) => province.slug));

if (PROVINCES.length !== 81) throw new Error(`Expected 81 provinces, found ${PROVINCES.length}`);
if (slugs.size !== 81) throw new Error("Province slugs are not unique");
if (populationSum !== POPULATION_TOTAL) {
  throw new Error(`Province populations sum to ${populationSum}, not ${POPULATION_TOTAL}`);
}
if (deputySum !== DEPUTY_TOTAL) throw new Error(`2023 deputies sum to ${deputySum}, not ${DEPUTY_TOTAL}`);
if (PROVINCES.filter((province) => province.metropolitan).length !== 30) {
  throw new Error("Expected 30 metropolitan provinces named in Law 6360 article 1");
}

export function alphaProvinces(): Province[] {
  return [...PROVINCES].sort((a, b) => a.name.localeCompare(b.name, "tr"));
}

export function provinceBySlug(slug: string): Province | undefined {
  return PROVINCES.find((province) => province.slug === slug);
}

export function provinceNeighbors(slug: string): { prev?: Province; next?: Province } {
  const ordered = alphaProvinces();
  const index = ordered.findIndex((province) => province.slug === slug);
  if (index < 0) return {};
  return { prev: ordered[index - 1], next: ordered[index + 1] };
}

/** Law 2839 article 4 bands. This is the statute’s rule, not a copied YSK annex. */
export function constituencyBand(deputies: number): 1 | 2 | 3 {
  if (deputies >= 36) return 3;
  if (deputies >= 19) return 2;
  return 1;
}
