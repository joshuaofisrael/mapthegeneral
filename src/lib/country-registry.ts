import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type CountryCard = {
  code: string;
  name: string;
  href: string;
  summary: string;
  links: { href: string; label: string }[];
};

/** Shape used by data/countries/*.json. */
type LocalizedCard = {
  code: string;
  nameEn: string;
  nameLocal?: string;
  href: string;
  summaryEn: string;
  languages?: { code: string; label: string; href: string }[];
  election?: { href: string; label: string };
};

function readDir(dir: string): unknown[] {
  let names: string[] = [];
  try {
    names = readdirSync(join(process.cwd(), dir)).filter((name) => name.endsWith(".json"));
  } catch {
    return [];
  }
  return names.map((name) => JSON.parse(readFileSync(join(process.cwd(), dir, name), "utf8")));
}

function normalize(raw: unknown): CountryCard {
  const card = raw as Partial<CountryCard> & Partial<LocalizedCard>;
  if (card.name && card.summary !== undefined) return card as CountryCard;
  const c = card as LocalizedCard;
  return {
    code: c.code,
    name: c.nameEn,
    href: c.href,
    summary: c.summaryEn,
    links: [...(c.languages ?? []).map(({ href, label }) => ({ href, label })), ...(c.election ? [c.election] : [])],
  };
}

/** Country cards from src/countries/*.json and data/countries/*.json. Each country adds one file. */
export function registryCountries(): CountryCard[] {
  const seen = new Set<string>();
  return [...readDir("src/countries"), ...readDir("data/countries")]
    .map(normalize)
    .filter((card) => {
      if (seen.has(card.code)) return false;
      seen.add(card.code);
      return true;
    })
    .sort((a, b) => a.code.localeCompare(b.code));
}

export const countryCards = registryCountries;
