import type { DeLang } from "./types";

export const DE_LANGS: DeLang[] = ["de", "en"];

export function germanyChooser(): string {
  return "/de/";
}

export function germanyHome(lang: DeLang): string {
  return `/de/${lang}/`;
}

export function landPath(lang: DeLang, slug: string): string {
  return `/de/${lang}/${slug}/`;
}

export function kreiseIndexPath(lang: DeLang): string {
  return `${germanyHome(lang)}kreise/`;
}

export function wahlkreiseIndexPath(lang: DeLang): string {
  return `${germanyHome(lang)}wahlkreise/`;
}

export function kreisPath(lang: DeLang, land: string, slug: string): string {
  return `${landPath(lang, land)}${slug}/`;
}

export function wahlkreisPath(lang: DeLang, land: string, slug: string): string {
  return `${landPath(lang, land)}${slug}/`;
}

export function electionsPath(lang: DeLang): string {
  return `${germanyHome(lang)}elections/`;
}

export const BUNDESTAG_2029_SLUG = "bundestag-2029";

export function bundestag2029Path(lang: DeLang): string {
  return `${electionsPath(lang)}${BUNDESTAG_2029_SLUG}/`;
}

export function resultsPath(lang: DeLang): string {
  return `${germanyHome(lang)}results/`;
}

export function partiesPath(lang: DeLang): string {
  return `${germanyHome(lang)}parties/`;
}

export function faqPath(lang: DeLang): string {
  return `${germanyHome(lang)}faq/`;
}

export function sourcesPath(lang: DeLang): string {
  return `${germanyHome(lang)}sources/`;
}

export function otherLang(lang: DeLang): DeLang {
  return lang === "de" ? "en" : "de";
}
