import type { Region } from "./types";

/**
 * Population is the Totale column of the età 999 row in POSAS_2025_it_Regioni.csv
 * (resident population at 1 January 2025). Comune counts and unit types are counted
 * from ISTAT Elenco-comuni-italiani.xlsx, sheet «CODICI al 21_02_2026» (7,894 rows).
 * 2022 seat figures are the assignment decrees in Gazzetta Ufficiale n. 169 of
 * 21 July 2022. They use the 2011 census and are not the allocation for a later election.
 */
export const REGIONS: Region[] = [
  { code: "01", slug: "piemonte", istatName: "Piemonte", article131Name: "Piemonte", statute: "ordinary", population: 4251868, comuni: 1180, senateSeats2022: 14, chamberSeats2022: 29, units: [{ type: "1", count: 7 }, { type: "3", count: 1 }] },
  { code: "02", slug: "valle-d-aosta-vallee-d-aoste", istatName: "Valle d'Aosta/Vallée d'Aoste", article131Name: "Valle d'Aosta", article116Name: "Valle d'Aosta/Vallée d'Aoste", statute: "special", population: 122532, comuni: 74, senateSeats2022: 1, chamberSeats2022: 1, units: [{ type: "1", count: 1 }] },
  { code: "03", slug: "lombardia", istatName: "Lombardia", article131Name: "Lombardia", statute: "ordinary", population: 10033918, comuni: 1501, senateSeats2022: 31, chamberSeats2022: 64, units: [{ type: "1", count: 11 }, { type: "3", count: 1 }] },
  { code: "04", slug: "trentino-alto-adige-sudtirol", istatName: "Trentino-Alto Adige/Südtirol", article131Name: "Trentino-Alto Adige", article116Name: "Trentino-Alto Adige/Südtirol", statute: "special", population: 1086252, comuni: 282, senateSeats2022: 6, chamberSeats2022: 7, units: [{ type: "2", count: 2 }] },
  { code: "05", slug: "veneto", istatName: "Veneto", article131Name: "Veneto", statute: "ordinary", population: 4853472, comuni: 559, senateSeats2022: 16, chamberSeats2022: 32, units: [{ type: "1", count: 6 }, { type: "3", count: 1 }] },
  { code: "06", slug: "friuli-venezia-giulia", istatName: "Friuli-Venezia Giulia", article131Name: "Friuli-Venezia Giulia", article116Name: "Friuli Venezia Giulia", statute: "special", population: 1193284, comuni: 215, senateSeats2022: 4, chamberSeats2022: 8, units: [{ type: "5", count: 4 }] },
  { code: "07", slug: "liguria", istatName: "Liguria", article131Name: "Liguria", statute: "ordinary", population: 1510143, comuni: 234, senateSeats2022: 5, chamberSeats2022: 10, units: [{ type: "1", count: 3 }, { type: "3", count: 1 }] },
  { code: "08", slug: "emilia-romagna", istatName: "Emilia-Romagna", article131Name: "Emilia-Romagna", statute: "ordinary", population: 4461998, comuni: 330, senateSeats2022: 14, chamberSeats2022: 29, units: [{ type: "1", count: 8 }, { type: "3", count: 1 }] },
  { code: "09", slug: "toscana", istatName: "Toscana", article131Name: "Toscana", statute: "ordinary", population: 3657716, comuni: 273, senateSeats2022: 12, chamberSeats2022: 24, units: [{ type: "1", count: 9 }, { type: "3", count: 1 }] },
  { code: "10", slug: "umbria", istatName: "Umbria", article131Name: "Umbria", statute: "ordinary", population: 851473, comuni: 92, senateSeats2022: 3, chamberSeats2022: 6, units: [{ type: "1", count: 2 }] },
  { code: "11", slug: "marche", istatName: "Marche", article131Name: "Marche", statute: "ordinary", population: 1480545, comuni: 225, senateSeats2022: 5, chamberSeats2022: 10, units: [{ type: "1", count: 5 }] },
  { code: "12", slug: "lazio", istatName: "Lazio", article131Name: "Lazio", statute: "ordinary", population: 5709178, comuni: 378, senateSeats2022: 18, chamberSeats2022: 36, units: [{ type: "1", count: 4 }, { type: "3", count: 1 }] },
  { code: "13", slug: "abruzzo", istatName: "Abruzzo", article131Name: "Abruzzi", statute: "ordinary", population: 1269118, comuni: 305, senateSeats2022: 4, chamberSeats2022: 9, units: [{ type: "1", count: 4 }] },
  { code: "14", slug: "molise", istatName: "Molise", article131Name: "Molise", statute: "ordinary", population: 287814, comuni: 136, senateSeats2022: 2, chamberSeats2022: 2, units: [{ type: "1", count: 2 }] },
  { code: "15", slug: "campania", istatName: "Campania", article131Name: "Campania", statute: "ordinary", population: 5582337, comuni: 550, senateSeats2022: 18, chamberSeats2022: 38, units: [{ type: "1", count: 4 }, { type: "3", count: 1 }] },
  { code: "16", slug: "puglia", istatName: "Puglia", article131Name: "Puglia", statute: "ordinary", population: 3877395, comuni: 257, senateSeats2022: 13, chamberSeats2022: 27, units: [{ type: "1", count: 5 }, { type: "3", count: 1 }] },
  { code: "17", slug: "basilicata", istatName: "Basilicata", article131Name: "Basilicata", statute: "ordinary", population: 530004, comuni: 131, senateSeats2022: 3, chamberSeats2022: 4, units: [{ type: "1", count: 2 }] },
  { code: "18", slug: "calabria", istatName: "Calabria", article131Name: "Calabria", statute: "ordinary", population: 1834646, comuni: 404, senateSeats2022: 6, chamberSeats2022: 13, units: [{ type: "1", count: 4 }, { type: "3", count: 1 }] },
  { code: "19", slug: "sicilia", istatName: "Sicilia", article131Name: "Sicilia", article116Name: "Sicilia", statute: "special", population: 4787390, comuni: 391, senateSeats2022: 16, chamberSeats2022: 32, units: [{ type: "4", count: 6 }, { type: "3", count: 3 }] },
  { code: "20", slug: "sardegna", istatName: "Sardegna", article131Name: "Sardegna", article116Name: "Sardegna", statute: "special", population: 1562381, comuni: 377, senateSeats2022: 5, chamberSeats2022: 11, units: [{ type: "1", count: 6 }, { type: "3", count: 2 }] },
];

function sum(pick: (region: Region) => number): number {
  return REGIONS.reduce((total, region) => total + pick(region), 0);
}

if (REGIONS.length !== 20) throw new Error(`Expected 20 regions, got ${REGIONS.length}`);
if (sum((region) => region.population) !== 58943464) {
  throw new Error(`Regional population sums to ${sum((region) => region.population)}`);
}
if (sum((region) => region.comuni) !== 7894) throw new Error("Comune count is not 7894");
if (sum((region) => region.senateSeats2022) !== 196) throw new Error("2022 Senate seats do not sum to 196");
if (sum((region) => region.chamberSeats2022) !== 392) throw new Error("2022 Chamber seats do not sum to 392");

const slugs = new Set<string>();
for (const region of REGIONS) {
  if (slugs.has(region.slug)) throw new Error(`Duplicate slug ${region.slug}`);
  slugs.add(region.slug);
}

export const POPULATION_2025 = 58943464;
export const COMUNE_COUNT = 7894;
export const UNIT_COUNT = 110;

export function regionBySlug(slug: string): Region | undefined {
  return REGIONS.find((region) => region.slug === slug);
}

export function alphaRegions(): Region[] {
  return [...REGIONS].sort((a, b) => a.istatName.localeCompare(b.istatName, "it"));
}

export function regionNeighbors(slug: string): { prev?: Region; next?: Region } {
  const list = alphaRegions();
  const index = list.findIndex((region) => region.slug === slug);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}
