import type { SourceRef } from "./types";

const READ = "2026-10-17";
const READ_L2 = "2026-10-18";

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
  {
    id: "destatis-gv100",
    name: "Statistisches Bundesamt (Destatis), Gemeindeverzeichnis GV100AD, Gebietsstand 30.09.2026, Erscheinungsmonat August 2026 (GV100AD_30092026.txt, Hinweise.txt, Datensatzbeschreibung_GV100AD.pdf)",
    url: "https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/Administrativ/Archiv/GV100ADQ/GV100AD3QAktuell.html",
    readOn: READ_L2,
  },
  {
    id: "bwl-wkr-names",
    name: "Die Bundeswahlleiterin, Wahlkreisnummern und -namen bei der Wahl zum 21. Deutschen Bundestag, Stand 07.03.2024",
    url: "https://www.bundeswahlleiterin.de/dam/jcr/17e066f6-a0af-42df-a5d2-365dc87769ab/btw25_wahlkreisnamen_utf8.csv",
    readOn: READ_L2,
  },
  {
    id: "bwl-kerg2",
    name: "Die Bundeswahlleiterin, Ergebnisse nach Wahlkreisen (kerg2.csv), Status Endgültig, Stand 11.03.2025",
    url: "https://www.bundeswahlleiterin.de/dam/jcr/f49a47a1-735b-4e9b-b4e1-4c73cad2292e/btw25_kerg2.csv",
    readOn: READ_L2,
  },
  {
    id: "bwl-gewaehlte",
    name: "Die Bundeswahlleiterin, Gewählte Bewerberinnen und Bewerber, Status Endgültig, Stand 12.03.2025, mit Datensatzbeschreibung Stand 22.02.2025",
    url: "https://www.bundeswahlleiterin.de/dam/jcr/eeb02132-caeb-430a-ae1f-6cd5907f1809/btw25_gewaehlte_utf8.zip",
    readOn: READ_L2,
  },
  {
    id: "bwl-opendata",
    name: "Die Bundeswahlleiterin, Open-Data-Angebot, Abschnitt zur Zweitstimmendeckung in den Ergebnisdateien",
    url: "https://www.bundeswahlleiterin.de/bundestagswahlen/2025/ergebnisse/opendata.html",
    readOn: READ_L2,
  },
  {
    id: "bwahlg-32",
    name: "Bundeswahlgesetz § 32, Unzulässige Wahlpropaganda und Unterschriftensammlung, unzulässige Veröffentlichung von Wählerbefragungen",
    url: "https://www.gesetze-im-internet.de/bwahlg/__32.html",
    readOn: READ_L2,
  },
  {
    id: "bwahlg-49a",
    name: "Bundeswahlgesetz § 49a, Ordnungswidrigkeiten",
    url: "https://www.gesetze-im-internet.de/bwahlg/__49a.html",
    readOn: READ_L2,
  },
  {
    id: "bwl-wahltermine",
    name: "Die Bundeswahlleiterin, Künftige Wahltermine in Deutschland",
    url: "https://www.bundeswahlleiterin.de/service/wahltermine.html",
    readOn: READ_L2,
  },
  {
    id: "hessen-termine",
    name: "Hessisches Statistisches Landesamt, Termine anstehender Wahlen",
    url: "https://statistik.hessen.de/unsere-zahlen/wahlen/termine",
    readOn: READ_L2,
  },
  {
    id: "bayern-termine",
    name: "Bayerisches Landesamt für Statistik, Wahltermine",
    url: "https://www.statistik.bayern.de/wahlen/termine/",
    readOn: READ_L2,
  },
  {
    id: "dl-de-by-2-0",
    name: "Datenlizenz Deutschland – Namensnennung – Version 2.0",
    url: "https://www.govdata.de/dl-de/by-2-0",
    readOn: READ_L2,
  },
  {
    id: "bdsg-1",
    name: "Bundesdatenschutzgesetz § 1, Anwendungsbereich",
    url: "https://www.gesetze-im-internet.de/bdsg_2018/__1.html",
    readOn: READ_L2,
  },
  {
    id: "urhg-5",
    name: "Urheberrechtsgesetz § 5, Amtliche Werke",
    url: "https://www.gesetze-im-internet.de/urhg/__5.html",
    readOn: READ_L2,
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
