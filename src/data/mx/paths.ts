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
