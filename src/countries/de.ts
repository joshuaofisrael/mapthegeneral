import { alphaLands } from "../data/de/lands";
import { KREISE, WAHLKREISE } from "../data/de/level2";
import {
  bundestag2029Path,
  electionsPath,
  faqPath,
  germanyChooser,
  germanyHome,
  kreisPath,
  kreiseIndexPath,
  landPath,
  partiesPath,
  resultsPath,
  sourcesPath,
  wahlkreisPath,
  wahlkreiseIndexPath,
} from "../data/de/paths";
import type { DeLang } from "../data/de/types";

export const germanyCountry = {
  code: "de",
  name: "Germany",
  href: germanyChooser(),
  summary:
    "The Federal Returning Officer’s page for the election of the 22nd German Bundestag does not set a polling day. It places that day between 26 January 2029 and 25 March 2029. This release has the national page, the 16 Länder, 401 Kreise from the Destatis Gemeindeverzeichnis of 30 September 2026, and the 299 Bundestag constituencies, in German and English. Municipality pages are not in this release.",
  languages: [
    { label: "Deutsch", href: germanyHome("de") },
    { label: "English", href: germanyHome("en") },
  ],
  election: { label: "Bundestag 2029", href: bundestag2029Path("en") },
} as const;

type IndexEntry = {
  path: string;
  lang: string;
  title: string;
  kind: string;
  text: string;
};

function entriesFor(lang: DeLang): IndexEntry[] {
  const de = lang === "de";
  const fixed: IndexEntry[] = [
    {
      path: germanyHome(lang),
      lang,
      title: de ? "Deutschland" : "Germany",
      kind: "country",
      text: "Deutschland Germany Bundestag Bundeswahlleiterin",
    },
    {
      path: electionsPath(lang),
      lang,
      title: de ? "Wahlen" : "Elections",
      kind: "elections",
      text: "Wahlen elections Bundestag Landtag",
    },
    {
      path: bundestag2029Path(lang),
      lang,
      title: de ? "Wahl zum 22. Deutschen Bundestag 2029" : "Election of the 22nd German Bundestag, 2029",
      kind: "election",
      text: "Bundestag 2029 26. Januar 25. März Artikel 39 Grundgesetz Bundeswahlleiterin",
    },
    {
      path: partiesPath(lang),
      lang,
      title: de ? "Parteien im 21. Deutschen Bundestag" : "Parties in the 21st German Bundestag",
      kind: "parties",
      text: "CDU AfD SPD GRÜNE Die Linke CSU SSW",
    },
    {
      path: resultsPath(lang),
      lang,
      title: de ? "Endgültiges Ergebnis der Bundestagswahl 2025" : "Final result of the 2025 Bundestag election",
      kind: "results",
      text: "23. Februar 2025 endgültiges Ergebnis Bundeswahlausschuss 630",
    },
    {
      path: faqPath(lang),
      lang,
      title: de ? "Fragen" : "FAQ",
      kind: "faq",
      text: "Bundestagswahl 2029 Bundeskanzler",
    },
    {
      path: sourcesPath(lang),
      lang,
      title: de ? "Quellen" : "Sources",
      kind: "sources",
      text: "Bundeswahlleiterin Bundesrat Destatis Grundgesetz Bundeswahlgesetz",
    },
  ];
  const lands = alphaLands().map((land) => ({
    path: landPath(lang, land.slug),
    lang,
    title: land.name,
    kind: "land",
    text: `${land.name} ${land.nextLabel} ${land.turnus} Landtag`,
  }));
  const indexes: IndexEntry[] = [
    {
      path: kreiseIndexPath(lang),
      lang,
      title: de ? "Kreise und kreisfreie Städte" : "Kreise and district-free cities",
      kind: "index",
      text: "Kreise kreisfreie Städte Landkreis Stadtkreis GV100AD",
    },
    {
      path: wahlkreiseIndexPath(lang),
      lang,
      title: de ? "Bundestagswahlkreise" : "Bundestag constituencies",
      kind: "index",
      text: "Wahlkreis Bundestag 2025 Zweitstimmendeckung",
    },
  ];
  const kreise = KREISE.map((kreis) => ({
    path: kreisPath(lang, kreis.land, kreis.slug),
    lang,
    title: kreis.name,
    kind: "kreis",
    text: `${kreis.name} ${kreis.ags} ${kreis.seat} ${kreis.land}`,
  }));
  const wahlkreise = WAHLKREISE.map((wk) => ({
    path: wahlkreisPath(lang, wk.land, wk.slug),
    lang,
    title: `${String(wk.nr).padStart(3, "0")} ${wk.name}`,
    kind: "wahlkreis",
    text: `${wk.name} ${wk.nr} ${wk.party} ${wk.member ?? ""} ${wk.land}`,
  }));
  return [...fixed, ...lands, ...indexes, ...kreise, ...wahlkreise];
}

export function germanyIndexEntries(): IndexEntry[] {
  return [
    {
      path: germanyChooser(),
      lang: "en-only",
      title: "Germany",
      kind: "country",
      text: "Deutschland Germany Bundestag",
    },
    ...entriesFor("en"),
    ...entriesFor("de"),
  ];
}
