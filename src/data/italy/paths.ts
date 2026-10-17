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

export function otherLang(lang: ItLang): ItLang {
  return lang === "it" ? "en" : "it";
}
