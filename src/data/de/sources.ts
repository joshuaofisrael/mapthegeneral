import type { SourceRef } from "./types";

const READ = "2026-10-17";

export const SOURCES: SourceRef[] = [
  {
    id: "bwl-2029",
    name: "Die Bundeswahlleiterin, Wahl zum 22. Deutschen Bundestag 2029",
    url: "https://www.bundeswahlleiterin.de/bundestagswahlen/2029.html",
    readOn: READ,
  },
  {
    id: "bwl-2025-result",
    name: "Die Bundeswahlleiterin, Pressemitteilung Nr. 29/25 vom 14. März 2025, Bundestagswahl 2025: Endgültiges Ergebnis",
    url: "https://www.bundeswahlleiterin.de/info/presse/mitteilungen/bundestagswahl-2025/29_25_endgueltiges-ergebnis.html",
    readOn: READ,
  },
  {
    id: "bwl-home",
    name: "Die Bundeswahlleiterin",
    url: "https://www.bundeswahlleiterin.de/",
    readOn: READ,
  },
  {
    id: "bwahlg-1",
    name: "Bundeswahlgesetz § 1, Zusammensetzung des Deutschen Bundestages und Wahlrechtsgrundsätze",
    url: "https://www.gesetze-im-internet.de/bwahlg/__1.html",
    readOn: READ,
  },
  {
    id: "gg-39",
    name: "Grundgesetz für die Bundesrepublik Deutschland, Artikel 39",
    url: "https://www.gesetze-im-internet.de/gg/art_39.html",
    readOn: READ,
  },
  {
    id: "bundesrat-landtag",
    name: "Bundesrat, Termine der Landtagswahlen, Stand 21.09.2026",
    url: "https://www.bundesrat.de/DE/termine/wahl-termine/wahl-termine.html",
    readOn: READ,
  },
  {
    id: "bundestag-termine",
    name: "Deutscher Bundestag, Wahltermine in Deutschland",
    url: "https://www.bundestag.de/parlament/wahlen/wahltermine",
    readOn: READ,
  },
  {
    id: "bundeskanzler",
    name: "Bundesregierung, Friedrich Merz: Bundeskanzler",
    url: "https://www.bundesregierung.de/breg-de/bundesregierung/bundeskabinett/friedrich-merz-2342660",
    readOn: READ,
  },
  {
    id: "bundespraesident",
    name: "Der Bundespräsident, Startseite",
    url: "https://www.bundespraesident.de/DE/startseite/startseite_node.html",
    readOn: READ,
  },
  {
    id: "destatis-pop",
    name: "Statistisches Bundesamt, Bevölkerung nach Nationalität und Geschlecht (Quartalszahlen), Stand 16. Juni 2026",
    url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Bevoelkerungsstand/Tabellen/zensus-geschlecht-staatsangehoerigkeit-2025.html",
    readOn: READ,
  },
  {
    id: "destatis-gv",
    name: "Statistisches Bundesamt, Verwaltungsgliederung am 30.09.2026 (3. Quartal), Erscheinungsmonat August 2026, GV-ISys",
    url: "https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/Administrativ/Archiv/Verwaltungsgliederung/Verwalt3QAktuell.html",
    readOn: READ,
  },
  {
    id: "bundesregierung",
    name: "Die Bundesregierung",
    url: "https://www.bundesregierung.de/",
    readOn: READ,
  },
];

export function sourceById(id: string): SourceRef {
  const found = SOURCES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing source ${id}`);
  return found;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map(sourceById);
}
