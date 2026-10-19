import type { ItLang } from "./types";

export const IT_LANGS: ItLang[] = ["it", "en"];

export function italyChooser(): string {
  return "/it/";
}

export function italyHome(lang: ItLang): string {
  return `/it/${lang}/`;
}

export function regionPath(lang: ItLang, slug: string): string {
  return `/it/${lang}/${slug}/`;
}

export function unitsIndexPath(lang: ItLang): string {
  return `/it/${lang}/unita/`;
}

export function unitPath(lang: ItLang, regionSlug: string, unitSlug: string): string {
  return `/it/${lang}/${regionSlug}/${unitSlug}/`;
}

export function comuniIndexPath(lang: ItLang, regionSlug: string, unitSlug: string): string {
  return `/it/${lang}/${regionSlug}/${unitSlug}/comuni/`;
}

export function comunePath(lang: ItLang, regionSlug: string, unitSlug: string, comuneSlug: string): string {
  return `/it/${lang}/${regionSlug}/${unitSlug}/${comuneSlug}/`;
}

export function collegiIndexPath(lang: ItLang): string {
  return `/it/${lang}/collegi/`;
}

export function collegioPath(lang: ItLang, house: "camera" | "senato", slug: string): string {
  return `/it/${lang}/collegi/${house}/${slug}/`;
}

export function otherLang(lang: ItLang): ItLang {
  return lang === "it" ? "en" : "it";
}
