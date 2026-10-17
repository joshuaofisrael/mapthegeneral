import type { Canton } from "./types";

/**
 * Canton names: BFS historized register, file 20260101_GDEHist_KT.txt (eCH-0071 1.2.0).
 * Population: BBl 2025 2545, permanent resident population at the end of 2024.
 * National Council 2027 seats: ordinance of 27 August 2025 (SR 161.12), Art. 1.
 * Council of States seats: Federal Constitution Art. 150, status 1 January 2024.
 * Municipality and district counts: same historized register, rows current on 1 January 2026
 * whose type field is 11. That set has 2,110 rows, matching the BFS Gemeindestand of 01.01.2026.
 * The 41 lake rows and three other non-municipality areas are not counted.
 */
export const CANTONS: Canton[] = [
  { slug: "zh", abbr: "ZH", officialName: "Zürich", article1Name: "Zürich", ordinanceName: "Zürich", population2024: 1620020, nationalCouncil2027: 36, councilOfStates: 2, municipalities: 160, districtNames: 12 },
  { slug: "be", abbr: "BE", officialName: "Bern / Berne", article1Name: "Bern", ordinanceName: "Bern", population2024: 1071216, nationalCouncil2027: 23, previousNationalCouncil: 24, councilOfStates: 2, municipalities: 334, districtNames: 10 },
  { slug: "lu", abbr: "LU", officialName: "Luzern", article1Name: "Luzern", ordinanceName: "Luzern", population2024: 437944, nationalCouncil2027: 10, previousNationalCouncil: 9, councilOfStates: 2, municipalities: 79, districtNames: 6 },
  { slug: "ur", abbr: "UR", officialName: "Uri", article1Name: "Uri", ordinanceName: "Uri", population2024: 38275, nationalCouncil2027: 1, councilOfStates: 2, municipalities: 19, districtNames: 1 },
  { slug: "sz", abbr: "SZ", officialName: "Schwyz", article1Name: "Schwyz", ordinanceName: "Schwyz", population2024: 168931, nationalCouncil2027: 4, councilOfStates: 2, municipalities: 30, districtNames: 6 },
  { slug: "ow", abbr: "OW", officialName: "Obwalden", article1Name: "Obwalden", ordinanceName: "Obwalden", population2024: 39662, nationalCouncil2027: 1, councilOfStates: 1, municipalities: 7, districtNames: 1 },
  { slug: "nw", abbr: "NW", officialName: "Nidwalden", article1Name: "Nidwalden", ordinanceName: "Nidwalden", population2024: 45345, nationalCouncil2027: 1, councilOfStates: 1, municipalities: 11, districtNames: 1 },
  { slug: "gl", abbr: "GL", officialName: "Glarus", article1Name: "Glarus", ordinanceName: "Glarus", population2024: 42371, nationalCouncil2027: 1, councilOfStates: 2, municipalities: 3, districtNames: 1 },
  { slug: "zg", abbr: "ZG", officialName: "Zug", article1Name: "Zug", ordinanceName: "Zug", population2024: 133739, nationalCouncil2027: 3, councilOfStates: 2, municipalities: 11, districtNames: 1 },
  { slug: "fr", abbr: "FR", officialName: "Fribourg / Freiburg", article1Name: "Freiburg", ordinanceName: "Freiburg", population2024: 346674, nationalCouncil2027: 8, previousNationalCouncil: 7, councilOfStates: 2, municipalities: 119, districtNames: 7 },
  { slug: "so", abbr: "SO", officialName: "Solothurn", article1Name: "Solothurn", ordinanceName: "Solothurn", population2024: 289792, nationalCouncil2027: 6, councilOfStates: 2, municipalities: 104, districtNames: 10 },
  { slug: "bs", abbr: "BS", officialName: "Basel-Stadt", article1Name: "Basel-Stadt", ordinanceName: "Basel-Stadt", population2024: 201384, nationalCouncil2027: 4, councilOfStates: 1, municipalities: 3, districtNames: 1 },
  { slug: "bl", abbr: "BL", officialName: "Basel-Landschaft", article1Name: "Basel-Landschaft", ordinanceName: "Basel-Landschaft", population2024: 301323, nationalCouncil2027: 7, councilOfStates: 1, municipalities: 86, districtNames: 5 },
  { slug: "sh", abbr: "SH", officialName: "Schaffhausen", article1Name: "Schaffhausen", ordinanceName: "Schaffhausen", population2024: 88667, nationalCouncil2027: 2, councilOfStates: 2, municipalities: 26, districtNames: 6 },
  { slug: "ar", abbr: "AR", officialName: "Appenzell Ausserrhoden", article1Name: "Appenzell Ausserrhoden", ordinanceName: "Appenzell A. Rh.", population2024: 56705, nationalCouncil2027: 1, councilOfStates: 1, municipalities: 20, districtNames: 3 },
  { slug: "ai", abbr: "AI", officialName: "Appenzell Innerrhoden", article1Name: "Appenzell Innerrhoden", ordinanceName: "Appenzell I. Rh.", population2024: 16733, nationalCouncil2027: 1, councilOfStates: 1, municipalities: 5, districtNames: 1 },
  { slug: "sg", abbr: "SG", officialName: "St. Gallen", article1Name: "St. Gallen", ordinanceName: "St. Gallen", population2024: 540036, nationalCouncil2027: 12, councilOfStates: 2, municipalities: 75, districtNames: 8 },
  { slug: "gr", abbr: "GR", officialName: "Graubünden / Grigioni / Grischun", article1Name: "Graubünden", ordinanceName: "Graubünden", population2024: 206138, nationalCouncil2027: 4, previousNationalCouncil: 5, councilOfStates: 2, municipalities: 100, districtNames: 11 },
  { slug: "ag", abbr: "AG", officialName: "Aargau", article1Name: "Aargau", ordinanceName: "Aargau", population2024: 735808, nationalCouncil2027: 16, councilOfStates: 2, municipalities: 196, districtNames: 11 },
  { slug: "tg", abbr: "TG", officialName: "Thurgau", article1Name: "Thurgau", ordinanceName: "Thurgau", population2024: 299509, nationalCouncil2027: 6, councilOfStates: 2, municipalities: 80, districtNames: 5 },
  { slug: "ti", abbr: "TI", officialName: "Ticino", article1Name: "Tessin", ordinanceName: "Tessin", population2024: 358903, nationalCouncil2027: 8, councilOfStates: 2, municipalities: 100, districtNames: 8 },
  { slug: "vd", abbr: "VD", officialName: "Vaud", article1Name: "Waadt", ordinanceName: "Waadt", population2024: 855106, nationalCouncil2027: 19, councilOfStates: 2, municipalities: 300, districtNames: 10 },
  { slug: "vs", abbr: "VS", officialName: "Valais / Wallis", article1Name: "Wallis", ordinanceName: "Wallis", population2024: 371288, nationalCouncil2027: 8, councilOfStates: 2, municipalities: 122, districtNames: 13 },
  { slug: "ne", abbr: "NE", officialName: "Neuchâtel", article1Name: "Neuenburg", ordinanceName: "Neuenburg", population2024: 179518, nationalCouncil2027: 4, councilOfStates: 2, municipalities: 24, districtNames: 1 },
  { slug: "ge", abbr: "GE", officialName: "Genève", article1Name: "Genf", ordinanceName: "Genf", population2024: 531102, nationalCouncil2027: 12, councilOfStates: 2, municipalities: 45, districtNames: 1 },
  { slug: "ju", abbr: "JU", officialName: "Jura", article1Name: "Jura", ordinanceName: "Jura", population2024: 74840, nationalCouncil2027: 2, councilOfStates: 2, municipalities: 51, districtNames: 4 },
];

function assertTotals(): void {
  const population = CANTONS.reduce((sum, canton) => sum + canton.population2024, 0);
  if (population !== 9051029) throw new Error(`Canton population sums to ${population}`);
  const seats = CANTONS.reduce((sum, canton) => sum + canton.nationalCouncil2027, 0);
  if (seats !== 200) throw new Error(`2027 National Council seats sum to ${seats}`);
  const states = CANTONS.reduce((sum, canton) => sum + canton.councilOfStates, 0);
  if (states !== 46) throw new Error(`Council of States seats sum to ${states}`);
  const municipalities = CANTONS.reduce((sum, canton) => sum + canton.municipalities, 0);
  if (municipalities !== 2110) throw new Error(`Municipalities sum to ${municipalities}`);
  const districts = CANTONS.reduce((sum, canton) => sum + canton.districtNames, 0);
  if (districts !== 144) throw new Error(`District names sum to ${districts}`);
  if (CANTONS.length !== 26) throw new Error(`Expected 26 cantons, got ${CANTONS.length}`);
  const slugs = new Set(CANTONS.map((canton) => canton.slug));
  if (slugs.size !== 26) throw new Error("Duplicate canton slug");
}

assertTotals();

export const POPULATION_2024 = 9051029;
export const NATIONAL_COUNCIL_SEATS = 200;
export const COUNCIL_OF_STATES_SEATS = 46;
export const MUNICIPALITY_COUNT = 2110;

export function cantonBySlug(slug: string): Canton | undefined {
  return CANTONS.find((canton) => canton.slug === slug);
}

export function alphaCantons(): Canton[] {
  return [...CANTONS].sort((a, b) => a.officialName.localeCompare(b.officialName, "de"));
}

export function cantonNeighbors(slug: string): { prev?: Canton; next?: Canton } {
  const list = alphaCantons();
  const index = list.findIndex((canton) => canton.slug === slug);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}
