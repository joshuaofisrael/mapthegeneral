import { JURISDICTIONS } from "@/data/au/places";

export type CountryCard = {
  code: string;
  name: string;
  href: string;
  blurb: string;
  links: { href: string; label: string }[];
};

export type RegistryEntry = {
  path: string;
  lang: "en" | "en-only";
  title: string;
  kind: string;
  text: string;
};

export function auHome(): string {
  return "/au/en/";
}

export function jurisdictionPath(slug: string): string {
  return `/au/en/${slug}/`;
}

export const AU_COUNTRY: CountryCard = {
  code: "au",
  name: "Australia",
  href: "/au/",
  blurb:
    "The Australian Electoral Commission says the next federal election is due between August 2027 and May 2028. No polling day was named in the sources read on 17 October 2026. This release has the national page and eight state and territory pages, in English. The Victorian Electoral Commission prints a state election on Saturday 28 November 2026.",
  links: [
    { href: "/au/en/", label: "English" },
    { href: "/au/en/elections/federal-next/", label: "Next federal election" },
    { href: "/au/en/victoria/", label: "Victoria, 28 November 2026" },
  ],
};

const FIXED: RegistryEntry[] = [
  { path: "/au/", lang: "en-only", title: "Australia", kind: "country", text: "Australia English federal election" },
  { path: "/au/en/", lang: "en", title: "Australia", kind: "country", text: "Australia Commonwealth House Senate Albanese" },
  { path: "/au/en/elections/", lang: "en", title: "Elections in Australia", kind: "elections", text: "elections federal Victoria New South Wales" },
  {
    path: "/au/en/elections/federal-next/",
    lang: "en",
    title: "Next federal election",
    kind: "election",
    text: "federal election August 2027 May 2028 Australian Electoral Commission 150",
  },
  { path: "/au/en/results/", lang: "en", title: "Results", kind: "results", text: "3 May 2025 House of Representatives tally room" },
  { path: "/au/en/sources/", lang: "en", title: "Sources", kind: "sources", text: "AEC ABS electoral commission" },
  { path: "/au/en/faq/", lang: "en", title: "FAQ", kind: "faq", text: "faq federal election Victoria" },
];

export const AU_INDEX_ENTRIES: RegistryEntry[] = [
  ...FIXED,
  ...JURISDICTIONS.map((item) => ({
    path: jurisdictionPath(item.slug),
    lang: "en" as const,
    title: item.officialName,
    kind: item.kind,
    text: `${item.officialName} ${item.federalDivisions} electorates`,
  })),
];
