export type Lang = "pl" | "en";

export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this source was read. */
  readOn: string;
};

export type Voivodeship = {
  slug: string;
  /** Nominative name, the name the electoral-code annex declines. */
  name: string;
  /** Deputies in Załącznik nr 1 to the electoral code, summed for this voivodeship. */
  sejmSeats: number;
  /** Constituencies in that annex whose text names this voivodeship. */
  sejmConstituencies: number;
};
