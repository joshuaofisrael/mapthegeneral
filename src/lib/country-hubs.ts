import {
  compareCountryNames,
  NATIVE_COUNTRY_NAMES,
  type CountryHubLink,
} from "@/data/country-nav";
import { registryCountries } from "@/lib/country-registry";

/** Spain is a handwritten hub, not a registry JSON file. */
const SPAIN = { code: "es", href: "/es/" };

let cached: CountryHubLink[] | null = null;

/** Every covered country hub, alphabetical by native name. */
export function countryHubs(): CountryHubLink[] {
  if (cached) return cached;
  const seen = new Set<string>();
  const cards = registryCountries().map((card) => ({ code: card.code, href: card.href, fallback: card.name }));
  if (!cards.some((card) => card.code === SPAIN.code)) cards.push({ ...SPAIN, fallback: "España" });

  const hubs = cards
    .filter((card) => {
      if (seen.has(card.code)) return false;
      seen.add(card.code);
      return true;
    })
    .map((card) => {
      const native = NATIVE_COUNTRY_NAMES[card.code];
      const href = card.href.endsWith("/") ? card.href : `${card.href}/`;
      return {
        code: card.code,
        href,
        name: native?.name ?? card.fallback,
        lang: native?.lang ?? "en",
        dir: native?.dir,
      };
    })
    .sort((a, b) => compareCountryNames(a.name, b.name) || a.code.localeCompare(b.code));

  cached = hubs;
  return hubs;
}
