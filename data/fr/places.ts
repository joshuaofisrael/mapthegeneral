import raw from "./places.json";

export type OfficialBody = {
  code: string;
  officialName: string;
};

export type RegionRecord = {
  code: string;
  slug: string;
  officialName: string;
  chefLieuCode: string;
  chefLieu: string;
  arrondissements: number | null;
  cantons: number | null;
  communes: number | null;
  populationMunicipale: number | null;
  populationTotale: number | null;
  /** False for Mayotte, which is absent from the ensemble file “France hors Mayotte”. */
  populationInEnsemble: boolean;
  bodyCodes: string[];
};

export type DepartmentRecord = {
  code: string;
  slug: string;
  officialName: string;
  regionCode: string;
  chefLieuCode: string;
  chefLieu: string;
  arrondissements: number | null;
  cantons: number | null;
  communes: number | null;
  populationMunicipale: number | null;
  populationTotale: number | null;
  bodies: OfficialBody[];
};

export type ComerRecord = {
  code: string;
  officialName: string;
};

export const REGIONS = raw.regions as RegionRecord[];
export const DEPARTMENTS = raw.departments as DepartmentRecord[];
export const COMERS = raw.comers as ComerRecord[];

export const POPULATION_MUNICIPALE_SUM = REGIONS.reduce(
  (sum, region) => sum + (region.populationMunicipale ?? 0),
  0,
);
export const POPULATION_TOTALE_SUM = REGIONS.reduce(
  (sum, region) => sum + (region.populationTotale ?? 0),
  0,
);

export function alphaRegions(): RegionRecord[] {
  return [...REGIONS].sort((a, b) => a.officialName.localeCompare(b.officialName, "fr"));
}

export function regionBySlug(slug: string): RegionRecord | undefined {
  return REGIONS.find((region) => region.slug === slug);
}

export function departmentsIn(regionCode: string): DepartmentRecord[] {
  return DEPARTMENTS.filter((department) => department.regionCode === regionCode);
}

export function regionNeighbors(slug: string): { prev?: RegionRecord; next?: RegionRecord } {
  const ordered = alphaRegions();
  const index = ordered.findIndex((region) => region.slug === slug);
  return {
    prev: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

export function bodiesInRegion(regionCode: string): OfficialBody[] {
  const seen = new Map<string, OfficialBody>();
  for (const department of departmentsIn(regionCode)) {
    for (const body of department.bodies) seen.set(body.code, body);
  }
  return [...seen.values()].sort((a, b) => a.officialName.localeCompare(b.officialName, "fr"));
}
