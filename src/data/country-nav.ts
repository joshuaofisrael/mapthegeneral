/**
 * Country hubs in the site header and footer.
 * Labels are endonyms already used on each country's own-language pages.
 * English-only hubs keep the English name published on that hub.
 * No flag images.
 */

export type CountryHubLink = {
  code: string;
  href: string;
  /** Native name, used as the visible label and the sort key. */
  name: string;
  /** BCP 47 language of `name`, for pronunciation. */
  lang: string;
  dir?: "rtl";
};

/** Page languages that appear as the second URL segment. Same set as the html-lang stamp. */
export const PAGE_LANGS = ["en", "es", "fr", "de", "it", "pl", "pt", "he", "sr", "bg"] as const;
export type PageLang = (typeof PAGE_LANGS)[number];

const PAGE_LANG_SET = new Set<string>(PAGE_LANGS);

/** Second path segment, when it is a page language. Other routes stay English. */
export function languageFromPath(pathname: string): PageLang {
  const parts = pathname.split("/").filter(Boolean);
  const candidate = parts.length >= 2 ? parts[1] : "";
  return PAGE_LANG_SET.has(candidate) ? (candidate as PageLang) : "en";
}

const COUNTRIES_LABEL: Record<PageLang, string> = {
  en: "Countries",
  es: "Países",
  fr: "Pays",
  de: "Länder",
  it: "Paesi",
  pl: "Kraje",
  pt: "Países",
  he: "מדינות",
  sr: "Zemlje",
  bg: "Държави",
};

export function countriesLabel(lang: PageLang): string {
  return COUNTRIES_LABEL[lang];
}

/**
 * Endonyms from each country's own pages: España, Italia, Polska, México,
 * Brasil, ישראל, Srbija, and Schweiz (the name on the German pages; the
 * chooser also prints Suisse and Svizzera). Norge and Sverige are the
 * Bokmål and Swedish short names. Taiwan uses 臺灣, the form on the
 * Commission’s Chinese pages. Australia, Canada, Ireland and the
 * United Kingdom and New Zealand are published in English only.
 */
export const NATIVE_COUNTRY_NAMES: Record<string, { name: string; lang: string; dir?: "rtl" }> = {
  au: { name: "Australia", lang: "en" },
  bg: { name: "България", lang: "bg" },
  br: { name: "Brasil", lang: "pt" },
  ca: { name: "Canada", lang: "en" },
  ch: { name: "Schweiz", lang: "de" },
  es: { name: "España", lang: "es" },
  gb: { name: "United Kingdom", lang: "en" },
  ie: { name: "Ireland", lang: "en" },
  il: { name: "ישראל", lang: "he", dir: "rtl" },
  it: { name: "Italia", lang: "it" },
  mx: { name: "México", lang: "es" },
  no: { name: "Norge", lang: "nb" },
  nz: { name: "New Zealand", lang: "en" },
  pl: { name: "Polska", lang: "pl" },
  rs: { name: "Srbija", lang: "sr" },
  se: { name: "Sverige", lang: "sv" },
  tw: { name: "臺灣", lang: "zh-Hant" },
};

/** Alphabetical by native name. Accents share a base letter; Hebrew follows Latin. */
export function compareCountryNames(a: string, b: string): number {
  return a.localeCompare(b, "en", { sensitivity: "base" }) || a.localeCompare(b, "en");
}

export function withSlash(path: string): string {
  if (!path || path === "/") return "/";
  return path.endsWith("/") ? path : `${path}/`;
}

export function pathWithinHub(pathname: string, href: string): boolean {
  const current = withSlash(pathname);
  const hub = withSlash(href);
  return current === hub || current.startsWith(hub);
}
