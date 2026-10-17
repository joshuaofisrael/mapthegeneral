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
    readOn: READ,
  },
  {
    id: "bfs-agvch-page",
    name: "Bundesamt für Statistik, Amtliches Gemeindeverzeichnis der Schweiz",
    url: "https://www.bfs.admin.ch/bfs/de/home/grundlagen/agvch.html",
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
