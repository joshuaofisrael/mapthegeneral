import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type CountryCard = {
  code: string;
  name: string;
  href: string;
  summary: string;
  links: { href: string; label: string }[];
};

/** One JSON file per country under src/data/countries/. Spain stays in its own modules. */
export function registeredCountries(): CountryCard[] {
  const dir = join(process.cwd(), "src/data/countries");
  let names: string[] = [];
  try {
    names = readdirSync(dir)
      .filter((name) => name.endsWith(".json"))
      .sort();
  } catch {
    return [];
  }
  return names.map((name) => JSON.parse(readFileSync(join(dir, name), "utf8")) as CountryCard);
}
