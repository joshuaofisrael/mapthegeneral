import { gbLevel2SearchEntries } from "./level2";
import { gbLevel3SearchEntries } from "./level3";
import { GB_FIXED_PAGES, gbNationPages } from "./paths";

export type GbIndexEntry = {
  path: string;
  lang: "en" | "en-only";
  title: string;
  kind: string;
  text: string;
};

export function gbSearchEntries(): GbIndexEntry[] {
  const fixed: GbIndexEntry[] = GB_FIXED_PAGES.map((page) => ({
    path: page.path,
    lang: page.path === "/gb/" ? "en-only" : "en",
    title: page.title,
    kind: page.kind,
    text: page.text,
  }));
  const nations: GbIndexEntry[] = gbNationPages().map((page) => ({
    ...page,
    lang: "en",
  }));
  const level2: GbIndexEntry[] = gbLevel2SearchEntries().map((page) => ({
    ...page,
    lang: "en",
  }));
  const level3: GbIndexEntry[] = gbLevel3SearchEntries().map((page) => ({
    ...page,
    lang: "en",
  }));
  return [...fixed, ...nations, ...level2, ...level3];
}
