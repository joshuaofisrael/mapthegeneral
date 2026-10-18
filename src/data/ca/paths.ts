import type { CaLang } from "./types";

export function canadaHome(lang: CaLang): string {
  return `/ca/${lang}/`;
}

export function regionPath(lang: CaLang, slug: string): string {
  return `/ca/${lang}/${slug}/`;
}

export function electionPath(lang: CaLang): string {
  return `/ca/${lang}/elections/federal-2029/`;
}

export function districtIndexPath(lang: CaLang): string {
  return `/ca/${lang}/districts/`;
}

export function divisionIndexPath(lang: CaLang): string {
  return `/ca/${lang}/divisions/`;
}

export function districtPath(lang: CaLang, region: string, slug: string): string {
  return `/ca/${lang}/${region}/districts/${slug}/`;
}

export function divisionPath(lang: CaLang, region: string, slug: string): string {
  return `/ca/${lang}/${region}/divisions/${slug}/`;
}

export function otherLangPath(path: string, lang: CaLang): string {
  return path.replace(/\/ca\/(en|fr)\//, `/ca/${lang}/`);
}
