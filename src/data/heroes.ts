/** AI-generated country heroes. Files live in public/images and are shared, not copied per page. */

export const HERO_WIDTH = 1280;
export const HERO_HEIGHT = 720;
export const HERO_WIDTHS = [480, 768, 1280] as const;
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export type Hero = {
  code: string;
  alt: string;
  /** Path prefix without width or extension, e.g. /images/heroes/au */
  base: string;
  og: string;
};

export const HEROES: Record<string, Hero> = {
  au: {
    code: "au",
    base: "/images/heroes/au",
    og: "/images/og/au.webp",
    alt: "The Sydney Opera House, its white shell roofs beside the harbour, with the harbour bridge beyond, in daylight. No people are in the frame.",
  },
  ca: {
    code: "ca",
    base: "/images/heroes/ca",
    og: "/images/og/ca.webp",
    alt: "Parliament Hill in Ottawa: the Centre Block and the Peace Tower above a green lawn, with Canadian flags, under a blue sky. No people are in the frame.",
  },
  ch: {
    code: "ch",
    base: "/images/heroes/ch",
    og: "/images/og/ch.webp",
    alt: "The Swiss Federal Palace in Bern, its dome and arched stone facade above a green square. No people are in the frame.",
  },
  es: {
    code: "es",
    base: "/images/heroes/es",
    og: "/images/og/es.webp",
    alt: "A red-brick plaza building with white stone trim, twin towers and a large central arch, in the manner of a Madrid plaza. No people are in the frame.",
  },
  gb: {
    code: "gb",
    base: "/images/heroes/gb",
    og: "/images/og/gb.webp",
    alt: "The Palace of Westminster and the Elizabeth Tower beside the River Thames in London, under a blue sky. No people are in the frame.",
  },
  it: {
    code: "it",
    base: "/images/heroes/it",
    og: "/images/og/it.webp",
    alt: "The Colosseum in Rome, seen across stone ruins of the Roman Forum, with the Arch of Constantine in the foreground. No people are in the frame.",
  },
  mx: {
    code: "mx",
    base: "/images/heroes/mx",
    og: "/images/og/mx.webp",
    alt: "The Angel of Independence, the victory column on Paseo de la Reforma in Mexico City, with the avenue around it. No people are in the frame.",
  },
  pl: {
    code: "pl",
    base: "/images/heroes/pl",
    og: "/images/og/pl.webp",
    alt: "Warsaw Old Town market square: colourful rebuilt townhouses around Sigismund’s Column. No people are in the frame.",
  },
};

/** Modest accent used on cards and section rules. Not a flag and not a party colour. */
export const COUNTRY_ACCENTS: Record<string, string> = {
  au: "#0b6e4f",
  ca: "#b42318",
  ch: "#c8102e",
  es: "#aa151b",
  gb: "#012169",
  it: "#007a33",
  mx: "#006847",
  pl: "#c8102e",
  ie: "#00843d",
  no: "#ba0c2f",
  se: "#006aa7",
  br: "#00843d",
  rs: "#0c4076",
  il: "#0038b8",
  tw: "#1b4f72",
};

export function countryAccent(code: string): string {
  return COUNTRY_ACCENTS[code] ?? "#1e4a73";
}

export function heroApplies(country: string, path: string): boolean {
  if (!HEROES[country]) return false;
  const parts = path.replace(/\/+$/, "").split("/").filter(Boolean);
  if (parts[0] !== country) return false;
  if (parts.length <= 2) return true;
  return parts[2] === "elections";
}

/** First path segment when it is a country that has a hero, else null. */
export function heroCodeFromPath(path: string | undefined): string | null {
  if (!path) return null;
  const segment = path.replace(/^https?:\/\/[^/]+/i, "").split("/").filter(Boolean)[0];
  if (!segment || !HEROES[segment]) return null;
  return segment;
}
