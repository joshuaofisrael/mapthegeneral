import { DISTRICTS } from "./distritos";
import { ENTITIES, MUNICIPALITY_CATALOG_COUNT, POPULATION_SUM } from "./entities";
import raw from "./municipios.json";

export type DistrictJoin = "name" | "ambiguous" | "none";

export type Municipio = {
  code: string;
  slug: string;
  name: string;
  /** Census field pob_total. Null when the mgem row did not include it. */
  population: number | null;
  /**
   * Federal district numbers whose polygons overlap this municipality.
   * Empty unless join is "name". The join is by printed name inside the
   * entidad, not by the INE municipality number: those numbers differ
   * from the INEGI clave on much of the cartography.
   */
  districts: number[];
  join: DistrictJoin;
  /** True when the INAFED open-data file contains this clave. Names are not stored. */
  inafed: boolean;
};

export const MUNICIPIOS = raw as Municipio[];

const validDistricts = new Map<string, Set<number>>();
for (const district of DISTRICTS) {
  const set = validDistricts.get(district.entityCode) ?? new Set<number>();
  set.add(district.number);
  validDistricts.set(district.entityCode, set);
}

const slugs = new Set<string>();
let populationSum = 0;
let nullPopulation = 0;
let inafedMissing = 0;
const joinCounts = { name: 0, ambiguous: 0, none: 0 };
const countByEntity = new Map<string, number>();

for (const row of MUNICIPIOS) {
  const entityCode = row.code.slice(0, 2);
  const key = `${entityCode}/${row.slug}`;
  if (slugs.has(key) || row.slug === "municipios" || /^distrito-\d+$/.test(row.slug)) {
    throw new Error(`Bad municipality slug ${key}`);
  }
  slugs.add(key);
  countByEntity.set(entityCode, (countByEntity.get(entityCode) ?? 0) + 1);
  joinCounts[row.join] += 1;
  if (!row.inafed) inafedMissing += 1;
  if (row.population === null) nullPopulation += 1;
  else populationSum += row.population;
  if (row.join === "name") {
    const allowed = validDistricts.get(entityCode);
    if (!row.districts.length || row.districts.some((number) => !allowed?.has(number))) {
      throw new Error(`Bad districts for ${row.code}`);
    }
  } else if (row.districts.length) {
    throw new Error(`Districts stored without a name join for ${row.code}`);
  }
}

for (const entity of ENTITIES) {
  if (countByEntity.get(entity.code) !== entity.municipalities) {
    throw new Error(`Municipal catalog count mismatch for ${entity.code}`);
  }
}

if (
  MUNICIPIOS.length !== MUNICIPALITY_CATALOG_COUNT ||
  MUNICIPIOS.length !== 2478 ||
  populationSum !== POPULATION_SUM ||
  nullPopulation !== 9 ||
  inafedMissing !== 3 ||
  joinCounts.name !== 2455 ||
  joinCounts.ambiguous !== 4 ||
  joinCounts.none !== 19 ||
  countByEntity.get("09") !== 16
) {
  throw new Error("INEGI municipal catalog failed its checksum");
}

export function isAlcaldia(row: Municipio): boolean {
  return row.code.startsWith("09");
}

export function municipiosByEntitySlug(slug: string): Municipio[] {
  const entity = ENTITIES.find((item) => item.slug === slug);
  if (!entity) return [];
  return MUNICIPIOS.filter((row) => row.code.startsWith(entity.code)).sort((a, b) =>
    a.name.localeCompare(b.name, "es"),
  );
}

export function municipioNeighbors(row: Municipio): { prev?: Municipio; next?: Municipio } {
  const ordered = municipiosByEntitySlug(entitySlugFor(row));
  const index = ordered.findIndex((item) => item.code === row.code);
  return {
    prev: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

export function entitySlugFor(row: Municipio): string {
  const code = row.code.slice(0, 2);
  const entity = ENTITIES.find((item) => item.code === code);
  if (!entity) throw new Error(`No entidad for ${row.code}`);
  return entity.slug;
}
