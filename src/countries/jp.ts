import { japanEntries } from "../../data/jp/paths";
import { PREFECTURES } from "../../data/jp/places";

/** Registry entry for Japan. Shared indexes import this file and keep every other country entry. */
export const japanCountry = {
  id: "jp",
  href: "/jp/",
  label: "Japan",
  nativeLabel: "日本",
  summary: `289 House single-member districts, 11 proportional blocks, 45 House of Councillors districts, and ${PREFECTURES.length} prefectures, in Japanese and English. Member lists read on 18 October 2026. No polling day for the next national election was proclaimed in the sources read.`,
  languages: [
    { href: "/jp/ja/", label: "日本語" },
    { href: "/jp/en/", label: "English" },
    { href: "/jp/en/elections/kokusei-next/", label: "Next national election" },
  ],
} as const;

export { japanEntries };
