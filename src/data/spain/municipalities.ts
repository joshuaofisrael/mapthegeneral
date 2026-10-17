import raw from "./municipalities.json";
import { CITIES, PADRON_POPULATION_TOTAL, PROVINCES } from "./places";

export type Municipality = {
  code: string;
  /** Name exactly as printed in INE table 29005, after the five-digit code. */
  name: string;
  slug: string;
  population: number;
  provinceSlug: string;
  communitySlug: string;
};

export type EmptyMunicipalityTotal = {
  code: string;
  name: string;
  provinceSlug: string;
};

type FileShape = {
  table: string;
  period: string;
  sex: string;
  rows: [string, string, number][];
  emptyTotal: [string, string][];
};

const data = raw as FileShape;

/** Lowercase ASCII slug. Diacritics are stripped; every other run of symbols becomes one hyphen. */
export function municipalitySlug(name: string): string {
  const folded = name.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();
  return folded.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

const EXPECTED_EMPTY = [
  "12066 Gatova",
  "15026 Cesuras",
  "15063 Oza dos Ríos",
  "17122 Palmerola",
  "36011 Cerdedo",
  "36012 Cotobade",
];

function build(): { pages: Municipality[]; cities: Municipality[]; empty: EmptyMunicipalityTotal[] } {
  if (data.table !== "29005" || data.period !== "2025" || data.sex !== "Total") {
    throw new Error("municipalities.json is not the 2025 Total column of INE table 29005");
  }
  const provinceByCode = new Map<string, (typeof PROVINCES)[number]>(
    PROVINCES.map((province) => [province.ineCode, province]),
  );
  const cityByCode = new Map<string, (typeof CITIES)[number]>(CITIES.map((city) => [city.ineCode, city]));
  const pages: Municipality[] = [];
  const cities: Municipality[] = [];
  const seen = new Set<string>();

  for (const [code, name, population] of data.rows) {
    if (!/^\d{5}$/.test(code)) throw new Error(`Bad municipality code ${code}`);
    if (!Number.isInteger(population) || population < 0) throw new Error(`Bad population ${code}`);
    if (seen.has(code)) throw new Error(`Duplicate code ${code}`);
    seen.add(code);
    const slug = municipalitySlug(name);
    if (!slug) throw new Error(`Empty slug for ${code} ${name}`);
    const provinceCode = code.slice(0, 2);
    const province = provinceByCode.get(provinceCode);
    const city = cityByCode.get(provinceCode);
    const record = {
      code,
      name,
      slug,
      population,
      provinceSlug: province?.slug ?? city?.slug ?? "",
      communitySlug: province?.communitySlug ?? city?.slug ?? "",
    };
    if (province) pages.push(record);
    else if (city) cities.push(record);
    else throw new Error(`Municipality ${code} has no province or city`);
  }

  const empty: EmptyMunicipalityTotal[] = data.emptyTotal.map(([code, name]) => {
    const province = provinceByCode.get(code.slice(0, 2));
    if (!province) throw new Error(`Empty-total code ${code} has no province`);
    return { code, name, provinceSlug: province.slug };
  });

  const slugs = new Map<string, string>();
  for (const item of pages) {
    const key = `${item.provinceSlug}/${item.slug}`;
    const previous = slugs.get(key);
    if (previous) throw new Error(`Slug collision ${key}: ${previous} vs ${item.code}`);
    slugs.set(key, item.code);
  }

  if (pages.length !== 8130) throw new Error(`Expected 8130 municipality pages, got ${pages.length}`);
  if (cities.length !== 2) throw new Error(`Expected Ceuta and Melilla rows, got ${cities.length}`);

  const emptyKey = empty
    .map((item) => `${item.code} ${item.name}`)
    .sort()
    .join("|");
  if (emptyKey !== [...EXPECTED_EMPTY].sort().join("|")) {
    throw new Error(`Empty 2025 totals changed: ${emptyKey}`);
  }

  for (const province of PROVINCES) {
    const sum = pages
      .filter((item) => item.provinceSlug === province.slug)
      .reduce((total, item) => total + item.population, 0);
    if (sum !== province.population) {
      throw new Error(`${province.decreeName}: table 29005 sums to ${sum}, annex prints ${province.population}`);
    }
  }
  for (const city of CITIES) {
    const row = cities.find((item) => item.communitySlug === city.slug);
    if (!row || row.population !== city.population || row.name !== city.decreeName) {
      throw new Error(`City row mismatch for ${city.decreeName}`);
    }
  }
  const total = [...pages, ...cities].reduce((sum, item) => sum + item.population, 0);
  if (total !== PADRON_POPULATION_TOTAL) {
    throw new Error(`Table 29005 sums to ${total}; the annex sums to ${PADRON_POPULATION_TOTAL}`);
  }

  const madrid = pages.find((item) => item.code === "28079");
  if (!madrid || madrid.name !== "Madrid" || madrid.population !== 3506730 || madrid.slug !== "madrid") {
    throw new Error("Madrid row in table 29005 failed the fixed check");
  }
  const alicante = pages.find((item) => item.code === "03014");
  if (!alicante || alicante.name !== "Alacant/Alicante" || alicante.population !== 366221) {
    throw new Error("Alacant/Alicante row in table 29005 failed the fixed check");
  }
  const cruilles = pages.find((item) => item.code === "17901");
  if (!cruilles || cruilles.slug !== "cruilles-monells-i-sant-sadurni-de-l-heura") {
    throw new Error(`Unexpected slug for 17901: ${cruilles?.slug}`);
  }

  pages.sort((a, b) => a.code.localeCompare(b.code));
  return { pages, cities, empty };
}

const built = build();

const pagesByProvince = new Map<string, Municipality[]>();
for (const item of built.pages) {
  const list = pagesByProvince.get(item.provinceSlug);
  if (list) list.push(item);
  else pagesByProvince.set(item.provinceSlug, [item]);
}
for (const list of pagesByProvince.values()) {
  list.sort((a, b) => a.name.localeCompare(b.name, "es") || a.code.localeCompare(b.code));
}

const pageByKey = new Map(built.pages.map((item) => [`${item.provinceSlug}/${item.slug}`, item]));

const uniqueCapitalPopulationCodes = new Set<string>();
for (const province of PROVINCES) {
  const matches = (pagesByProvince.get(province.slug) ?? []).filter(
    (item) => item.population === province.capitalPopulation,
  );
  if (matches.length === 1) uniqueCapitalPopulationCodes.add(matches[0].code);
}

const emptyByProvince = new Map<string, EmptyMunicipalityTotal[]>();
for (const item of [...built.empty].sort((a, b) => a.code.localeCompare(b.code))) {
  const list = emptyByProvince.get(item.provinceSlug);
  if (list) list.push(item);
  else emptyByProvince.set(item.provinceSlug, [item]);
}

export const MUNICIPALITY_PAGE_COUNT = built.pages.length;
export const EMPTY_MUNICIPALITY_TOTAL_COUNT = built.empty.length;

export function municipalitiesIn(provinceSlug: string): Municipality[] {
  return pagesByProvince.get(provinceSlug) ?? [];
}

export function municipalityBySlug(provinceSlug: string, slug: string): Municipality | undefined {
  return pageByKey.get(`${provinceSlug}/${slug}`);
}

/** True when this is the only municipality in its province whose population equals the annex capital figure. */
export function isOnlyMunicipalityWithCapitalPopulation(code: string): boolean {
  return uniqueCapitalPopulationCodes.has(code);
}

export function municipalityNeighbors(municipality: Municipality): { prev?: Municipality; next?: Municipality } {
  const list = municipalitiesIn(municipality.provinceSlug);
  const index = list.findIndex((item) => item.code === municipality.code);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function emptyTotalsIn(provinceSlug: string): EmptyMunicipalityTotal[] {
  return emptyByProvince.get(provinceSlug) ?? [];
}

export function autonomousCityMunicipality(slug: string): Municipality | undefined {
  return built.cities.find((item) => item.communitySlug === slug);
}

export function pageMunicipalities(): Municipality[] {
  return built.pages;
}
