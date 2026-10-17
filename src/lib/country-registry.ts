import tr from "../../data/countries/tr.json";

export type RegistrySitemap = { name: string; prefix: string };

export type CountryCard = {
  code: string;
  nameEn: string;
  href: string;
  summaryEn: string;
  languages: { code: string; label: string; href: string }[];
  highlight?: { label: string; href: string };
  sitemaps: RegistrySitemap[];
  llmsLine: string;
};

/** One entry per file in data/countries/. Keep every country's entry when merging. */
export const COUNTRY_CARDS: CountryCard[] = [tr];

export function countryCards(): CountryCard[] {
  return COUNTRY_CARDS;
}

export function registryLanguageCodes(): string[] {
  const codes = new Set<string>();
  for (const card of COUNTRY_CARDS) {
    for (const language of card.languages) codes.add(language.code);
  }
  return [...codes].filter((code) => code !== "en").sort();
}
