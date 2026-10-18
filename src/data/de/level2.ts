import { KREIS_COUNT_2026_09_30 } from "./result";
import type { Kreis, Wahlkreis } from "./level2-types";
import kreiseJson from "./kreise.json";
import wahlkreiseJson from "./wahlkreise.json";

/**
 * Kreis rows are Satzart 40 of Destatis GV100AD, Gebietsstand 30.09.2026.
 * Population is the sum of field Bevölkerung, insgesamt on Satzart 60 rows
 * with the same five-digit Kreis key. Wahlkreis rows join the Bundeswahlleiterin
 * names file, final kerg2 first votes, and Kreiswahlvorschlag rows in the
 * elected-members file. See sources read on 2026-10-18.
 */
export const KREISE = kreiseJson as Kreis[];
export const WAHLKREISE = wahlkreiseJson as Wahlkreis[];

if (KREISE.length !== KREIS_COUNT_2026_09_30) {
  throw new Error(`Expected ${KREIS_COUNT_2026_09_30} Kreise, found ${KREISE.length}`);
}
if (WAHLKREISE.length !== 299) {
  throw new Error(`Expected 299 Wahlkreise, found ${WAHLKREISE.length}`);
}

/** Text code EF7U1 in the GV100AD dataset description bundled with the zip. */
export const KREIS_TYPE_LABEL = {
  "41": "Kreisfreie Stadt",
  "42": "Stadtkreis",
  "43": "Kreis",
  "44": "Landkreis",
  "45": "Regionalverband",
} as const;

const kreisByLand = new Map<string, Kreis[]>();
for (const kreis of KREISE) {
  const list = kreisByLand.get(kreis.land) ?? [];
  list.push(kreis);
  kreisByLand.set(kreis.land, list);
}
for (const list of kreisByLand.values()) {
  list.sort((a, b) => a.name.localeCompare(b.name, "de") || a.ags.localeCompare(b.ags));
}

const wkByLand = new Map<string, Wahlkreis[]>();
for (const wk of WAHLKREISE) {
  const list = wkByLand.get(wk.land) ?? [];
  list.push(wk);
  wkByLand.set(wk.land, list);
}
for (const list of wkByLand.values()) {
  list.sort((a, b) => a.nr - b.nr);
}

export function kreiseInLand(land: string): Kreis[] {
  return kreisByLand.get(land) ?? [];
}

export function wahlkreiseInLand(land: string): Wahlkreis[] {
  return wkByLand.get(land) ?? [];
}

export function kreisNeighbors(kreis: Kreis): { prev?: Kreis; next?: Kreis } {
  const list = kreiseInLand(kreis.land);
  const index = list.findIndex((item) => item.ags === kreis.ags);
  if (index < 0) return {};
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function wahlkreisNeighbors(wk: Wahlkreis): { prev?: Wahlkreis; next?: Wahlkreis } {
  const index = WAHLKREISE.findIndex((item) => item.nr === wk.nr);
  if (index < 0) return {};
  return {
    prev: index > 0 ? WAHLKREISE[index - 1] : undefined,
    next: index < WAHLKREISE.length - 1 ? WAHLKREISE[index + 1] : undefined,
  };
}

export function typeCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const kreis of KREISE) counts[kreis.type] = (counts[kreis.type] ?? 0) + 1;
  return counts;
}
