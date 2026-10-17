import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type CountryCard = {
  code: string;
  href: string;
  name: string;
  summary: string;
  links: { href: string; label: string }[];
};

/** JSON files dropped in this directory. Each country agent adds one file. */
export function countryCards(): CountryCard[] {
  const dir = join(process.cwd(), "src/data/countries");
  return readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => JSON.parse(readFileSync(join(dir, name), "utf8")) as CountryCard);
}
