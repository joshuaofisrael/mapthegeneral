import rows from "./gminy.json";
import type { Lang } from "./types";

export type Gmina = {
  code: string;
  rodz: string;
  name: string;
  /** TERC field NAZWA_DOD, copied as printed. */
  kind: string;
  stanNa: string;
  slug: string;
  woj: string;
  pow: string;
  gmi: string;
  voivodeshipSlug: string;
  powiatSlug: string;
  powiatCode: string;
  /** PKW column „Wybierany organ”, or null when the file has no row. */
  office: string | null;
  /** PKW column „Wybrany kandydat”, or null when the cell is empty or the row is absent. */
  elected: string | null;
  /** PKW column „Komitet zgłaszający kandydata”, or null when the cell is empty or the row is absent. */
  committee: string | null;
  /** Sum of „Liczba mandatów” in the PKW gmina-council okręg file, or null when that file has no row. */
  seats: number | null;
  /** Senate okręg whose area sentence names this powiat as a whole unit. */
  senat: number | null;
  /** The Senate table splits this city and does not assign the whole gmina. */
  senatSplit: boolean;
  /** Set only when annex 1 gives the voivodeship a single Sejm okręg. */
  sejm: number | null;
};

const GMINY = rows as Gmina[];

if (GMINY.length !== 2479) throw new Error(`Expected 2479 gminas, got ${GMINY.length}`);

const byParent = new Map<string, Gmina[]>();
for (const item of GMINY) {
  const key = `${item.voivodeshipSlug}/${item.powiatSlug}`;
  const list = byParent.get(key);
  if (list) list.push(item);
  else byParent.set(key, [item]);
}
for (const list of byParent.values()) {
  list.sort((a, b) => a.name.localeCompare(b.name, "pl") || a.kind.localeCompare(b.kind, "pl"));
}

export function allGminy(): Gmina[] {
  return GMINY;
}

export function gminasIn(voivodeshipSlug: string, powiatSlug: string): Gmina[] {
  return byParent.get(`${voivodeshipSlug}/${powiatSlug}`) ?? [];
}

export function gminaPath(lang: Lang, gmina: Gmina): string {
  return `/pl/${lang}/${gmina.voivodeshipSlug}/${gmina.powiatSlug}/${gmina.slug}/`;
}

export function gminaIndexPath(lang: Lang): string {
  return `/pl/${lang}/gminy/`;
}

export function powiatGminaIndexPath(lang: Lang, voivodeshipSlug: string, powiatSlug: string): string {
  return `/pl/${lang}/${voivodeshipSlug}/${powiatSlug}/gminy/`;
}

export function gminaNeighbors(gmina: Gmina): { prev?: Gmina; next?: Gmina } {
  const list = gminasIn(gmina.voivodeshipSlug, gmina.powiatSlug);
  const index = list.findIndex((item) => item.code === gmina.code);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}
