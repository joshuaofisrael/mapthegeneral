import { japanEntries } from "../../data/jp/paths";
import { PREFECTURES } from "../../data/jp/places";

/** Registry entry for Japan. Shared indexes import this file and keep every other country entry. */
export const japanCountry = {
  id: "jp",
  href: "/jp/",
  label: "Japan",
  nativeLabel: "日本",
  summary: `House of Representatives election of 8 February 2026, House of Councillors election of 20 July 2025, and ${PREFECTURES.length} prefectures, in Japanese and English. No polling day for the next national election was proclaimed in the sources read on 17 October 2026.`,
  languages: [
    { href: "/jp/ja/", label: "日本語" },
    { href: "/jp/en/", label: "English" },
    { href: "/jp/en/elections/kokusei-next/", label: "Next national election" },
  ],
} as const;

export { japanEntries };
