export type ItLang = "it" | "en";

export type SourceRef = {
  id: string;
  name: string;
  url: string;
  readOn: string;
};

export type UnitType = "1" | "2" | "3" | "4" | "5";

export type Region = {
  code: string;
  slug: string;
  /** Denominazione Regione in the ISTAT file read on 17 October 2026. */
  istatName: string;
  /** Name in article 131 of the Constitution, as printed in the Senate PDF. */
  article131Name: string;
  /** Present when article 116 prints a special-statute name. */
  article116Name?: string;
  statute: "ordinary" | "special";
  /** Totale column, età 999, POSAS_2025_it_Regioni.csv. */
  population: number;
  comuni: number;
  /** Seats in the 21 July 2022 Senate assignment decree. Not a forecast. */
  senateSeats2022: number;
  /** Sum of circoscrizione seats in the 21 July 2022 Chamber assignment decree. */
  chamberSeats2022: number;
  units: { type: UnitType; count: number }[];
};
