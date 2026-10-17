import raw from "./entities.json";

export type IneLocal = {
  heading: string;
  gubernatura?: number;
  dipMr?: number;
  dipRp?: number;
  presidencias?: number;
  sindicaturas?: number;
  regidurias?: number;
  alcaldias?: number;
  concejales?: number;
  cuartoOrden?: number;
};

export type Entity = {
  slug: string;
  code: string;
  name: string;
  abbr: string;
  population: number;
  municipalities: number;
  ine: IneLocal;
};

export const ENTITIES: Entity[] = raw;

export const POPULATION_SUM = ENTITIES.reduce((sum, entity) => sum + entity.population, 0);
export const MUNICIPALITY_CATALOG_COUNT = ENTITIES.reduce((sum, entity) => sum + entity.municipalities, 0);

if (ENTITIES.length !== 32 || POPULATION_SUM !== 126_014_024 || MUNICIPALITY_CATALOG_COUNT !== 2478) {
  throw new Error("INEGI entity catalog failed its checksum");
}

export function entityBySlug(slug: string): Entity | undefined {
  return ENTITIES.find((entity) => entity.slug === slug);
}

export function alphaEntities(): Entity[] {
  return [...ENTITIES].sort((a, b) => a.name.localeCompare(b.name, "es"));
}

export function entityNeighbors(slug: string): { prev?: Entity; next?: Entity } {
  const ordered = alphaEntities();
  const index = ordered.findIndex((entity) => entity.slug === slug);
  return {
    prev: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined,
  };
}

export function gubernaturaEntities(): Entity[] {
  return alphaEntities().filter((entity) => entity.ine.gubernatura === 1);
}
