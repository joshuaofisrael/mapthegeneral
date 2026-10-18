import raw from "./level2.json";

export type Level2Office = {
  role: string;
  surname: string;
  given: string;
  electedOn: string;
  enteredOn: string;
};

export type Level2Unit = {
  code: string;
  regionCode: string;
  regionSlug: string;
  name: string;
  type: "1" | "2" | "3" | "4" | "5";
  comuni: number;
  slug: string;
  offices: Level2Office[];
};

export type Level2Member = {
  given: string;
  surname: string;
  lista: string;
  start: string;
  tipo: string;
};

export type Level2Collegio = {
  house: "camera" | "senato";
  kind: "uninominale" | "plurinominale";
  name: string;
  slug: string;
  regionSlug: string;
  regionName: string;
  circoscrizione: string;
  circoscrizioneCode: string;
  largest: string;
  placeRows: number;
  distinctCodes: number;
  parent: string | null;
  children: string[];
  chietiByElection: boolean;
  members: Level2Member[];
};

export const UNITS = raw.units as Level2Unit[];
export const COLLEGI = raw.collegi as Level2Collegio[];
export const ANAGRAFE_NAMES_NOT_MATCHED = raw.anagrafeNamesNotMatched;
export const ESTERO_DEPUTIES = raw.esteroDeputies;

if (UNITS.length !== 110) throw new Error(`Expected 110 ISTAT units, got ${UNITS.length}`);
if (COLLEGI.filter((item) => item.house === "camera" && item.kind === "uninominale").length !== 147) {
  throw new Error("Camera uninominali are not 147");
}
if (COLLEGI.filter((item) => item.house === "camera" && item.kind === "plurinominale").length !== 49) {
  throw new Error("Camera plurinominali are not 49");
}
if (COLLEGI.filter((item) => item.house === "senato" && item.kind === "uninominale").length !== 74) {
  throw new Error("Senato uninominali are not 74");
}
if (COLLEGI.filter((item) => item.house === "senato" && item.kind === "plurinominale").length !== 26) {
  throw new Error("Senato plurinominali are not 26");
}

export function unitsInRegion(regionSlug: string): Level2Unit[] {
  return UNITS.filter((unit) => unit.regionSlug === regionSlug).sort((a, b) =>
    a.name.localeCompare(b.name, "it"),
  );
}

export function collegiInRegion(regionSlug: string): Level2Collegio[] {
  return COLLEGI.filter((item) => item.regionSlug === regionSlug).sort((a, b) =>
    a.name.localeCompare(b.name, "it"),
  );
}

export function collegioByName(house: "camera" | "senato", name: string): Level2Collegio | undefined {
  return COLLEGI.find((item) => item.house === house && item.name === name);
}
