import powiatRows from "./powiaty.json";
import sejmRows from "./sejm-okregi.json";
import senatRows from "./senat-okregi.json";
import tercStats from "./terc-stats.json";
import type { Lang } from "./types";

export type PowiatKind = "powiat" | "miasto na prawach powiatu" | "miasto stołeczne, na prawach powiatu";

export type Powiat = {
  woj: string;
  pow: string;
  code: string;
  /** TERC field NAZWA, copied as printed. */
  name: string;
  /** TERC field NAZWA_DOD, copied as printed. */
  kind: PowiatKind;
  stanNa: string;
  slug: string;
  voivodeshipSlug: string;
};

export type SejmMember = {
  id: number;
  name: string;
  clubId: string;
  clubName: string;
};

export type SejmOkreg = {
  num: number;
  /** Sejm API field districtName. */
  districtName: string;
  /** Sejm API field voivodeship. */
  voivodeship: string;
  voivodeshipSlug: string;
  /** Annex 1, „Liczba posłów wybieranych w okręgu wyborczym wynosi”. */
  seats: number;
  /** Annex 1, „Siedziba Okręgowej Komisji Wyborczej”, as printed in capitals. */
  okw: string;
  members: SejmMember[];
};

export type SenatAlsoPrinted = {
  name: string;
  note: string;
};

export type SenatOkreg = {
  num: number;
  /** Area cell on senat.gov.pl/sklad/okregi-wyborcze, copied as printed. */
  area: string;
  /** Senator cell on that page, copied as printed. */
  senator: string;
  voivodeshipSlug: string;
  /** A further row the same table prints for this number. */
  alsoPrinted?: SenatAlsoPrinted;
};

export type TercVoivodeshipStat = {
  land: number;
  city: number;
  gmina: number;
};

const POWIATS = powiatRows as Powiat[];
const SEJM = sejmRows as SejmOkreg[];
const SENAT = senatRows as SenatOkreg[];

if (POWIATS.length !== 380) throw new Error(`Expected 380 powiats, got ${POWIATS.length}`);
if (SEJM.length !== 41) throw new Error(`Expected 41 Sejm okręgi, got ${SEJM.length}`);
if (SENAT.length !== 100) throw new Error(`Expected 100 Senate okręgi, got ${SENAT.length}`);

const sejmSeats = SEJM.reduce((sum, item) => sum + item.seats, 0);
const sejmMembers = SEJM.reduce((sum, item) => sum + item.members.length, 0);
if (sejmSeats !== 460 || sejmMembers !== 460) {
  throw new Error(`Sejm check failed: annex ${sejmSeats}, active members ${sejmMembers}`);
}

export const TERC_FILE = tercStats.file;
export const TERC_CATALOG_DATE = tercStats.catalogDate;
export const TERC_READ_ON = tercStats.readOn;
export const TERC_STATS = tercStats.byVoivodeship as Record<string, TercVoivodeshipStat>;

export function isCityPowiat(kind: string): boolean {
  return kind.includes("prawach powiatu");
}

export function powiatHeading(powiat: Powiat): string {
  return powiat.kind === "powiat" ? `powiat ${powiat.name}` : powiat.name;
}

export function powiatsIn(voivodeshipSlug: string): Powiat[] {
  return POWIATS.filter((item) => item.voivodeshipSlug === voivodeshipSlug).sort((a, b) =>
    powiatHeading(a).localeCompare(powiatHeading(b), "pl"),
  );
}

export function allPowiats(): Powiat[] {
  return POWIATS;
}

export function powiatBySlug(voivodeshipSlug: string, slug: string): Powiat | undefined {
  return POWIATS.find((item) => item.voivodeshipSlug === voivodeshipSlug && item.slug === slug);
}

export function powiatNeighbors(powiat: Powiat): { prev?: Powiat; next?: Powiat } {
  const list = powiatsIn(powiat.voivodeshipSlug);
  const index = list.findIndex((item) => item.code === powiat.code);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function allSejmOkregi(): SejmOkreg[] {
  return SEJM;
}

export function sejmIn(voivodeshipSlug: string): SejmOkreg[] {
  return SEJM.filter((item) => item.voivodeshipSlug === voivodeshipSlug);
}

export function allSenatOkregi(): SenatOkreg[] {
  return SENAT;
}

export function senatIn(voivodeshipSlug: string): SenatOkreg[] {
  return SENAT.filter((item) => item.voivodeshipSlug === voivodeshipSlug);
}

export function powiatPath(lang: Lang, voivodeshipSlug: string, slug: string): string {
  return `/pl/${lang}/${voivodeshipSlug}/${slug}/`;
}

export function sejmOkregPath(lang: Lang, num: number): string {
  return `/pl/${lang}/sejm/${num}/`;
}

export function senatOkregPath(lang: Lang, num: number): string {
  return `/pl/${lang}/senat/${num}/`;
}

export function powiatIndexPath(lang: Lang): string {
  return `/pl/${lang}/powiaty/`;
}

export function sejmIndexPath(lang: Lang): string {
  return `/pl/${lang}/sejm/`;
}

export function senatIndexPath(lang: Lang): string {
  return `/pl/${lang}/senat/`;
}

export function mpPageUrl(id: number): string {
  return `https://www.sejm.gov.pl/sejm10.nsf/posel.xsp?id=${id}`;
}
