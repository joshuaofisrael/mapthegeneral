import raw from "./level2.json";

export type Holder = {
  familyName: string;
  givenName: string;
  /** Empty when the source file has no function column. */
  function: string;
  mandateStart: string;
  functionStart: string;
  rneCode: string;
  rneLabel: string;
  source: "rne-cd" | "rne-ma" | "rne-mai";
  sectionLabel?: string;
  regionLabel?: string;
};

export type Office = {
  kind: string;
  bodyCode: string;
  bodyName: string;
  holders: Holder[];
  lastElection: string;
  nextElection: string;
  holderGap?: string;
};

export type Deputy = {
  uid: string;
  civ: string;
  givenName: string;
  familyName: string;
  mandateStart: string;
  cause: string;
};

export type Constituency = {
  uid: string;
  libelle: string;
  slug: string;
  numero: string;
  depCode: string;
  depName: string;
  regionName: string;
  regionType: string;
  organStart: string;
  cogDepartment: boolean;
  deputy: Deputy | null;
};

type Level2File = {
  anCatalogDate: string;
  rneUpdated: string;
  departments: Record<string, Office[]>;
  constituencies: Constituency[];
};

const data = raw as Level2File;

export const AN_CATALOG_DATE = data.anCatalogDate;
export const RNE_UPDATED = data.rneUpdated;
export const CONSTITUENCIES: Constituency[] = data.constituencies;

const byDepartment = new Map<string, Constituency[]>();
for (const constituency of CONSTITUENCIES) {
  const list = byDepartment.get(constituency.depCode) ?? [];
  list.push(constituency);
  byDepartment.set(constituency.depCode, list);
}

export function officesFor(code: string): Office[] {
  return data.departments[code] ?? [];
}

export function constituenciesForDepartment(code: string): Constituency[] {
  return byDepartment.get(code) ?? [];
}

export function constituenciesOutsideDepartments(): Constituency[] {
  return CONSTITUENCIES.filter((constituency) => !constituency.cogDepartment);
}

export function holderName(holder: { givenName: string; familyName: string }): string {
  return `${holder.givenName} ${holder.familyName}`;
}
