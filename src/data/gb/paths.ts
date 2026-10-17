import { NATIONS } from "./places";

export function gbRoot(): string {
  return "/gb/";
}

export function gbHome(): string {
  return "/gb/en/";
}

export function nationPath(slug: string): string {
  return `/gb/en/${slug}/`;
}

export const GB_FIXED_PAGES = [
  { path: "/gb/", title: "United Kingdom", kind: "country", text: "United Kingdom UK general election" },
  { path: "/gb/en/", title: "United Kingdom", kind: "country", text: "United Kingdom Parliament House of Commons Andy Burnham 15 August 2029" },
  { path: "/gb/en/elections/", title: "Elections", kind: "elections", text: "elections general election 15 August 2029 May 2026 May 2027" },
  {
    path: "/gb/en/elections/general-election/",
    title: "UK Parliament, no later than 15 August 2029",
    kind: "election",
    text: "general election Dissolution and Calling of Parliament Act 2022 15 August 2029 4 July 2024",
  },
  { path: "/gb/en/parties/", title: "Parties", kind: "parties", text: "parties House of Commons Labour Conservative" },
  { path: "/gb/en/results/", title: "Results", kind: "results", text: "results 4 July 2024 general election" },
  { path: "/gb/en/faq/", title: "FAQ", kind: "faq", text: "faq general election prime minister" },
  { path: "/gb/en/sources/", title: "Sources", kind: "sources", text: "sources Electoral Commission GOV.UK ONS Parliament" },
] as const;

export function gbNationPages() {
  return NATIONS.map((nation) => ({
    path: nationPath(nation.slug),
    title: nation.name,
    kind: "nation",
    text: `${nation.name} devolved election Parliament`,
  }));
}
