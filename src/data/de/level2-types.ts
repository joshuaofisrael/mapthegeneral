export type KreisTypeCode = "41" | "42" | "43" | "44" | "45";

export type Kreis = {
  ags: string;
  name: string;
  /** Sitz der Kreisverwaltung, as printed on the Satzart-40 row. */
  seat: string;
  type: KreisTypeCode;
  /** Sum of Bevölkerung, insgesamt for Satzart 60 in this Kreis. Reference date 31.12.2025. */
  pop: number;
  land: string;
  slug: string;
  /**
   * A next Landrat election copied from the Hessisches Statistisches Landesamt
   * page read on 2026-10-18. date is ISO; label is the row text.
   */
  next?: { date: string; label: string };
};

export type Wahlkreis = {
  nr: number;
  name: string;
  land: string;
  slug: string;
  /** Gruppenname of the Stimme-1 row with the highest Anzahl. */
  party: string;
  partyLong: string;
  votes: number;
  /** Prozent column as printed, comma decimal, without a percent sign. */
  pct: string;
  /** False when column Gewählt is an en dash. */
  seated: boolean;
  /** Name from the Kreiswahlvorschlag row. Absent when seated is false. */
  member?: string;
};
