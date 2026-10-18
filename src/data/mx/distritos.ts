import raw from "./distritos.json";

export type Deputy = {
  id: string;
  name: string;
  entidadPrinted: string;
  seatPrinted: string;
};

export type District = {
  entityCode: string;
  entitySlug: string;
  number: number;
  cabeceraLocalidad: string;
  cabeceraMunicipio: string;
  indigena: boolean;
  indigenaPct: string | null;
  circunscripcion: 1 | 2 | 3 | 4 | 5;
  deputy: Deputy;
};

export const DIRECTORY_PRINTED_DATE = raw.directoryPrintedDate;
export const DISTRICTS = raw.districts as District[];

/** Counts printed in the INE/CG526/2026 table and matched to the October 2026 shapefile. */
const EXPECTED_BY_CODE: Record<string, number> = {
  "01": 3,
  "02": 9,
  "03": 2,
  "04": 2,
  "05": 8,
  "06": 2,
  "07": 13,
  "08": 9,
  "09": 22,
  "10": 4,
  "11": 15,
  "12": 8,
  "13": 7,
  "14": 20,
  "15": 40,
  "16": 11,
  "17": 5,
  "18": 3,
  "19": 14,
  "20": 10,
  "21": 16,
  "22": 6,
  "23": 4,
  "24": 7,
  "25": 7,
  "26": 7,
  "27": 6,
  "28": 8,
  "29": 3,
  "30": 19,
  "31": 6,
  "32": 4,
};

const seen = new Set<string>();
const counts: Record<string, number> = {};
for (const district of DISTRICTS) {
  const key = `${district.entityCode}-${district.number}`;
  if (
    seen.has(key) ||
    !district.deputy.name ||
    !district.cabeceraLocalidad ||
    ![1, 2, 3, 4, 5].includes(district.circunscripcion)
  ) {
    throw new Error(`Mexico district row failed: ${key}`);
  }
  seen.add(key);
  counts[district.entityCode] = (counts[district.entityCode] ?? 0) + 1;
}
if (DISTRICTS.length !== 300 || JSON.stringify(counts) !== JSON.stringify(EXPECTED_BY_CODE)) {
  throw new Error("Mexico federal district checksum failed");
}

export function padDistrict(number: number): string {
  return String(number).padStart(2, "0");
}

export function districtSlug(number: number): string {
  return `distrito-${padDistrict(number)}`;
}

export function districtsByEntity(entitySlug: string): District[] {
  return DISTRICTS.filter((district) => district.entitySlug === entitySlug).sort((a, b) => a.number - b.number);
}

export function districtNeighbors(district: District): { prev?: District; next?: District } {
  const rows = districtsByEntity(district.entitySlug);
  const index = rows.findIndex((row) => row.number === district.number);
  return {
    prev: index > 0 ? rows[index - 1] : undefined,
    next: index >= 0 && index < rows.length - 1 ? rows[index + 1] : undefined,
  };
}
