export type Lang = "es" | "en";

export const ELECTION_SLUG = "diputaciones-federales-2027";

export function mexicoHome(lang: Lang): string {
  return `/mx/${lang}/`;
}

export function entityPath(lang: Lang, slug: string): string {
  return `/mx/${lang}/${slug}/`;
}

export function electionPath(lang: Lang): string {
  return `${mexicoHome(lang)}elections/${ELECTION_SLUG}/`;
}

export function districtsIndexPath(lang: Lang): string {
  return `${mexicoHome(lang)}distritos/`;
}

export function circunscripcionesPath(lang: Lang): string {
  return `${mexicoHome(lang)}circunscripciones/`;
}

export function districtPath(lang: Lang, entitySlug: string, number: number): string {
  const slug = `distrito-${String(number).padStart(2, "0")}`;
  return `${entityPath(lang, entitySlug)}${slug}/`;
}
