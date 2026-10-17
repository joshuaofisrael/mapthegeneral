import type { SeatRow } from "./types";

/** Seat table of press release 29/25. Second-vote shares are the rounded figures that release prints. */
export const BUNDESTAG_2025_SEATS: SeatRow[] = [
  {
    shortName: "CDU",
    fullName: "Christlich Demokratische Union Deutschlands",
    seats: 164,
    constituencySeats: 128,
    secondVoteShare: "22,6 %",
  },
  {
    shortName: "AfD",
    fullName: "Alternative für Deutschland",
    seats: 152,
    constituencySeats: 42,
    secondVoteShare: "20,8 %",
  },
  {
    shortName: "SPD",
    fullName: "Sozialdemokratische Partei Deutschlands",
    seats: 120,
    constituencySeats: 44,
    secondVoteShare: "16,4 %",
  },
  {
    shortName: "GRÜNE",
    fullName: "BÜNDNIS 90/DIE GRÜNEN",
    seats: 85,
    constituencySeats: 12,
    secondVoteShare: "11,6 %",
  },
  {
    shortName: "DIE LINKE",
    fullName: "Die Linke",
    seats: 64,
    constituencySeats: 6,
    secondVoteShare: "8,8 %",
  },
  {
    shortName: "CSU",
    fullName: "Christlich-Soziale Union in Bayern e.V.",
    seats: 44,
    constituencySeats: 44,
    secondVoteShare: "6,0 %",
  },
  {
    shortName: "SSW",
    fullName: "Südschleswigscher Wählerverband",
    seats: 1,
    constituencySeats: null,
    secondVoteShare: "0,2 %",
  },
];

export const BUNDESTAG_SEAT_TOTAL = 630;

const sum = BUNDESTAG_2025_SEATS.reduce((total, row) => total + row.seats, 0);
if (sum !== BUNDESTAG_SEAT_TOTAL) {
  throw new Error(`Bundestag seat rows add up to ${sum}, not ${BUNDESTAG_SEAT_TOTAL}`);
}

/** Population at 31 December 2025 in the Destatis quarterly nationality table, Stand 16 June 2026. */
export const POPULATION_2025_12_31 = 83_467_117;

/**
 * Destatis, Verwaltungsgliederung, Gebietsstand 30.09.2026.
 * Gemeinden: footnote 3, excluding uninhabited gemeindefreie Gebiete, including Städte.
 * Kreise: kreisfreie Städte plus Landkreise.
 */
export const MUNICIPALITY_COUNT_2026_09_30 = 10_749;
export const KREIS_COUNT_2026_09_30 = 401;
