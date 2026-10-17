export const CH_LANGS = ["de", "fr", "it", "en"] as const;

export type ChLang = (typeof CH_LANGS)[number];

export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this source was read. */
  readOn: string;
};

export type Canton = {
  slug: string;
  abbr: string;
  /** Name in the BFS historized canton file, version 1.2.0, file dated 20260101. */
  officialName: string;
  /** Name as Art. 1 of the Federal Constitution prints it (German text, status 1 January 2024). */
  article1Name: string;
  /** Name as the 27 August 2025 seat ordinance prints it. */
  ordinanceName: string;
  /** Permanent resident population at the end of 2024, Federal Council ascertainment. */
  population2024: number;
  /** National Council seats for the renewal to the 53rd legislative period. */
  nationalCouncil2027: number;
  /**
   * Previous seats only where the 27 August 2025 Federal Council release states the change.
   * Other cantons are left unset rather than inferred.
   */
  previousNationalCouncil?: number;
  /** Council of States seats under Art. 150 of the Federal Constitution. */
  councilOfStates: 1 | 2;
  /** Political municipalities current on 1 January 2026 in the BFS historized register. */
  municipalities: number;
  /** Distinct district names in that register for those municipalities. */
  districtNames: number;
};
