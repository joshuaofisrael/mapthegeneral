import type { SourceRef } from "./types";

const READ = "2026-10-17";

export const SOURCES: SourceRef[] = [
  {
    id: "bv-1999",
    name: "Bundesverfassung der Schweizerischen Eidgenossenschaft vom 18. April 1999 (Stand am 1. Januar 2024), Art. 1, 4, 148, 149, 150, 174, 175 und 176",
    url: "https://www.fedlex.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1999/404/20240101/de/pdf-a/fedlex-data-admin-ch-eli-cc-1999-404-20240101-de-pdf-a-4.pdf",
    readOn: READ,
  },
  {
    id: "bbl-2025-2545",
    name: "Bundesratsbeschluss über die Erwahrung der Zahlen der ständigen Wohnbevölkerung Ende 2024 vom 27. August 2025 (BBl 2025 2545)",
    url: "https://www.fedlex.admin.ch/eli/fga/2025/2545/de",
    readOn: READ,
  },
  {
    id: "sr-161-12",
    name: "Verordnung vom 27. August 2025 über die Sitzverteilung bei der Gesamterneuerung des Nationalrates (SR 161.12, AS 2025 541), Text auf LexFind",
    url: "https://www.lexfind.ch/tolv/257640/de",
    readOn: READ,
  },
  {
    id: "admin-20250827",
    name: "Der Bundesrat, Medienmitteilung «Nationalratswahlen 2027: Änderung bei der Sitzverteilung auf die Kantone», 27. August 2025",
    url: "https://www.admin.ch/de/newnsb/vSue6NEwJdNUFXHNhHUUs",
    readOn: READ,
  },
  {
    id: "bbl-2022-2547",
    name: "Kreisschreiben des Bundesrates an die Kantonsregierungen über die Gesamterneuerungswahl des Nationalrates vom 22. Oktober 2023 (BBl 2022 2547)",
    url: "https://www.fedlex.admin.ch/eli/fga/2022/2547/de",
    readOn: READ,
  },
  {
    id: "parlament-2023",
    name: "Schweizer Parlament, Wahlen 2023",
    url: "https://www.parlament.ch/de/ratsbetrieb/wahlen/wahlen-2023",
    readOn: READ,
  },
  {
    id: "wahlen-nr-2023",
    name: "Bundesamt für Statistik, Ergebnisse Parteien im Überblick: Schweiz, Nationalrat 2023",
    url: "https://www.wahlen.admin.ch/de/2023/ch/23-table-results-national-council-election/",
    readOn: READ,
  },
  {
    id: "bfs-nr-2023-table",
    name: "Bundesamt für Statistik, Nationalratswahlen 2023: Mandate, gewählte Frauen und Männer, Parteistärke (sd-t-17.02-NRW2023-parteien), veröffentlicht am 30. November 2023, bezeichnet als offizielle provisorische Ergebnisse",
    url: "https://www.bfs.admin.ch/asset/de/28845352",
    readOn: READ,
  },
  {
    id: "bundesrat-mitglieder",
    name: "Der Bundesrat, Die sieben Mitglieder des Bundesrates",
    url: "https://www.admin.ch/de/bundesrat-mitglieder",
    readOn: READ,
  },
  {
    id: "praesidialjahr-2026",
    name: "Der Bundesrat, Präsidialjahr 2026",
    url: "https://www.admin.ch/de/bundespraesidium-2026",
    readOn: READ,
  },
  {
    id: "bk-nationalrat",
    name: "Bundeskanzlei, Nationalratswahlen",
    url: "https://www.bk.admin.ch/de/nationalratswahlen",
    readOn: READ,
  },
  {
    id: "agvch",
    name: "Bundesamt für Statistik, Amtliches Gemeindeverzeichnis der Schweiz, Applikation der Schweizer Gemeinden, Gemeindestand 01.01.2026",
    url: "https://www.agvchapp.bfs.admin.ch/de/state/results?SnapshotDate=01.01.2026",
    readOn: READ,
  },
  {
    id: "agvch-hist",
    name: "Bundesamt für Statistik, historisiertes Gemeindeverzeichnis, TXT-Fassung eCH-0071 Version 1.2.0, Dateien 20260101_GDEHist_KT, _BEZ und _GDE",
    url: "https://www.agvchapp.bfs.admin.ch/file/txt/dz-b-00.04-hgv-01.zip",
    readOn: "2026-10-26",
  },
  {
    id: "bfs-agvch-page",
    name: "Bundesamt für Statistik, Amtliches Gemeindeverzeichnis der Schweiz",
    url: "https://www.bfs.admin.ch/bfs/de/home/grundlagen/agvch.html",
    readOn: READ,
  },
  {
    id: "opendata-hgv",
    name: "opendata.swiss, Swiss official commune’s historicized list, Bundesamt für Statistik, Kennzeichen «Open use»",
    url: "https://opendata.swiss/en/dataset/historisiertes-gemeindeverzeichnis-der-schweiz",
    readOn: "2026-10-26",
  },
  {
    id: "ge-muni-2025",
    name: "République et canton de Genève, Elections municipales 2025 - dates importantes",
    url: "https://www.ge.ch/document/elections-municipales-2025-dates-importantes",
    readOn: "2026-10-25",
  },
  {
    id: "ge-notice-20250323",
    name: "République et canton de Genève, notice explicative, élection des conseils municipaux et premier tour des conseils administratifs du 23 mars 2025",
    url: "https://www.ge.ch/elections/20250323/doc/notice-explicative.pdf",
    readOn: "2026-10-25",
  },
  {
    id: "lu-kom-2024",
    name: "Kanton Luzern, Kommunalwahlen 2024",
    url: "https://wahlen.lu.ch/Kommunalwahlen_2024",
    readOn: "2026-10-25",
  },
  {
    id: "ti-archivio",
    name: "Repubblica e Cantone Ticino, Cancelleria dello Stato, Archivio delle elezioni",
    url: "https://www4.ti.ch/generale/diritti-politici/elezioni/archivio-delle-elezioni/archivio",
    readOn: "2026-10-25",
  },
  {
    id: "vs-ace-2024",
    name: "Conseil d’État du canton du Valais, arrêté du 27 mars 2024 concernant l’élection des autorités communales pour la législature 2025-2028",
    url: "https://www.vs.ch/documents/23115743/33074598/ACE+-+Elections+communales+2024.pdf/537eaa4f-250d-af36-b859-0e779fc914f1",
    readOn: "2026-10-25",
  },
  {
    id: "vs-presidents",
    name: "Canton du Valais, présidents et vice-présidents des communes",
    url: "https://www.vs.ch/web/communes/president-vice-president",
    readOn: "2026-10-25",
  },
  {
    id: "zg-erneuerung",
    name: "Kanton Zug, Termine Gesamterneuerungswahlen im Kanton Zug",
    url: "https://zg.ch/de/staat-politik/wahlen-und-abstimmungen/allgemeines-wahlen-und-abstimmungen/termine-gesamterneuerungswahlen",
    readOn: "2026-10-26",
  },
  {
    id: "ju-elections",
    name: "République et Canton du Jura, Elections communales",
    url: "https://www.jura.ch/fr/Autorites/Administration/DFI/COM/Elections-communales/Elections-communales.html",
    readOn: "2026-10-26",
  },
  {
    id: "ar-wahlen",
    name: "Kanton Appenzell Ausserrhoden, Wahlen / Abstimmungen",
    url: "https://ar.ch/verwaltung/kantonskanzlei/rechtsdienst/politische-rechte/wahlen-abstimmungen/",
    readOn: "2026-10-26",
  },
  {
    id: "parlament-members",
    name: "Parlamentsdienste der Bundesversammlung, Bern, Webservice councillors/basicdetails, aktuelle Ratsmitglieder, heruntergeladen am 18. Oktober 2026. Keine amtliche Veröffentlichung",
    url: "http://ws-old.parlament.ch/councillors/basicdetails?format=json",
    readOn: "2026-10-18",
  },
  {
    id: "parlament-opendata",
    name: "Parlamentsdienste, Open Data / Webservices, Verwendungszwecke und Auflagen",
    url: "https://www.parlament.ch/de/%C3%BCber-das-parlament/fakten-und-zahlen/open-data-web-services",
    readOn: "2026-10-18",
  },
  {
    id: "admin-votes",
    name: "Der Bundesrat, Die Volksabstimmungen, Volksabstimmung vom 29. November 2026",
    url: "https://www.admin.ch/gov/de/start/dokumentation/abstimmungen.html",
    readOn: "2026-10-18",
  },
  {
    id: "dsg",
    name: "Bundesgesetz vom 25. September 2020 über den Datenschutz (DSG, SR 235.1), Stand 7. Juli 2025",
    url: "https://www.fedlex.admin.ch/eli/cc/2022/491/de",
    readOn: "2026-10-18",
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
