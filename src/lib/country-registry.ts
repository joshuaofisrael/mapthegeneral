import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type CountryCard = {
  code: string;
  nameEn: string;
  nameLocal: string;
  href: string;
  summaryEn: string;
  languages: { code: string; label: string; href: string }[];
  election: { href: string; label: string };
};

/** Cards dropped in data/countries/*.json. Spain stays in the homepage markup. */
export function countryCards(): CountryCard[] {
  const dir = join(process.cwd(), "data/countries");
  let names: string[] = [];
  try {
    names = readdirSync(dir).filter((name) => name.endsWith(".json"));
  } catch {
    return [];
  }
  return names.sort().map((name) => JSON.parse(readFileSync(join(dir, name), "utf8")) as CountryCard);
}
