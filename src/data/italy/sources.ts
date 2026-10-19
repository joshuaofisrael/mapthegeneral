import type { SourceRef } from "./types";

const READ = "2026-10-17";
const READ_LEVEL2 = "2026-10-18";
const READ_LEVEL3 = "2026-10-19";

export const SOURCES: SourceRef[] = [
  {
    id: "cost-titolo-i",
    name: "Costituzione della Repubblica Italiana, Titolo I (articoli 55, 56, 57, 59, 60 e 61), testo sul sito del Governo",
    url: "https://www.governo.it/it/costituzione-italiana/parte-seconda-ordinamento-della-repubblica/titolo-i-il-parlamento/2852",
    readOn: READ,
  },
  {
    id: "cost-senato-pdf",
    name: "Costituzione della Repubblica Italiana, PDF del Senato (articoli 114, 116 e 131)",
    url: "https://www.senato.it/sites/default/files/media-documents/Costituzione_ITALIANO.pdf",
    readOn: READ,
  },
  {
    id: "dpr-97-2022",
    name: "Decreto del Presidente della Repubblica 21 luglio 2022, n. 97, convocazione dei comizi per le elezioni della Camera dei deputati e del Senato della Repubblica (22G00107)",
    url: "https://www.gazzettaufficiale.it/eli/id/2022/07/21/22G00107/sg",
    readOn: READ,
  },
  {
    id: "gu-169-2022",
    name: "Gazzetta Ufficiale n. 169 del 21 luglio 2022, serie generale (D.P.R. n. 96, D.P.R. n. 97 e decreti di assegnazione dei seggi)",
    url: "https://www.gazzettaufficiale.it/eli/gu/2022/07/21/169/sg/pdf",
    readOn: READ,
  },
  {
    id: "camera-chi-elegge",
    name: "Camera dei deputati, Conoscere la Camera, «Chi elegge i deputati» (XIX legislatura)",
    url: "https://conoscere.camera.it/la-camera-dei-deputati/i-deputati/chi-elegge-i-deputati",
    readOn: READ,
  },
  {
    id: "istat-codici",
    name: "ISTAT, codici statistici delle unità amministrative territoriali, aggiornamento al 21 febbraio 2026, ed elenco dei comuni italiani",
    url: "https://www.istat.it/classificazione/codici-dei-comuni-delle-province-e-delle-regioni/",
    readOn: READ,
  },
  {
    id: "istat-elenco-xlsx",
    name: "ISTAT, Elenco-comuni-italiani.xlsx, foglio «CODICI al 21_02_2026»",
    url: "https://www.istat.it/storage/codici-unita-amministrative/Elenco-comuni-italiani.xlsx",
    readOn: READ,
  },
  {
    id: "istat-censimento",
    name: "ISTAT, popolazione censuaria al 31 dicembre 2024",
    url: "https://www.istat.it/notizia/popolazione-censuaria/",
    readOn: READ,
  },
  {
    id: "demo-regioni",
    name: "ISTAT, DEMO, popolazione residente per età, sesso e stato civile al 1° gennaio 2025, file POSAS_2025_it_Regioni.csv",
    url: "https://demo.istat.it/app/?a=2025&i=POS&l=it",
    readOn: READ,
  },
  {
    id: "eligendo-camera-2022",
    name: "Ministero dell'Interno, Eligendo Archivio, Camera 25/09/2022, Area ITALIA (escl. Valle d'Aosta)",
    url: "https://elezionistorico.interno.gov.it/index.php?dtel=25%2F09%2F2022&es0=S&lev0=0&levsut0=0&ms=S&tpa=I&tpe=E&tpel=C",
    readOn: READ,
  },
  {
    id: "eligendo-home",
    name: "Ministero dell'Interno, Eligendo Archivio",
    url: "https://elezionistorico.interno.gov.it/",
    readOn: READ,
  },
  {
    id: "dait",
    name: "Dipartimento per gli Affari Interni e Territoriali, elezioni",
    url: "https://dait.interno.gov.it/elezioni",
    readOn: READ,
  },
  {
    id: "anagrafe",
    name: "Anagrafe degli amministratori locali e regionali",
    url: "https://dait.interno.gov.it/elezioni/anagrafe-amministratori",
    readOn: READ,
  },
  {
    id: "quirinale",
    name: "Presidenza della Repubblica, quirinale.it",
    url: "https://www.quirinale.it/",
    readOn: READ,
  },
  {
    id: "governo",
    name: "Governo, governo.it",
    url: "https://www.governo.it/",
    readOn: READ,
  },
  {
    id: "poste-cap",
    name: "Poste Italiane, CAP — Codice di Avviamento Postale",
    url: "https://www.poste.it/cap",
    readOn: READ,
  },
  {
    id: "poste-cap-professional",
    name: "Poste Italiane, banche dati territoriali, CAP Professional",
    url: "https://business.poste.it/professionisti-imprese/territorial-databanks.html",
    readOn: READ,
  },
  {
    id: "dlgs-177-2020",
    name: "Decreto legislativo 23 dicembre 2020, n. 177, determinazione dei collegi uninominali e plurinominali (20G00198)",
    url: "https://www.gazzettaufficiale.it/eli/id/2020/12/29/20G00198/sg",
    readOn: READ_LEVEL2,
  },
  {
    id: "collegi-xlsx",
    name: "Dipartimento per le riforme istituzionali, tavole Excel allegate al decreto legislativo n. 177/2020 (tabelle A.1, A.2, B.1 e B.2)",
    url: "https://www.riformeistituzionali.gov.it/it/i-nuovi-collegi-elettorali/",
    readOn: READ_LEVEL2,
  },
  {
    id: "anagrafe-incarica",
    name: "Ministero dell'interno, amministratori locali e regionali in carica al 24 agosto 2026 (file provinciali e metropolitani)",
    url: "https://dait.interno.gov.it/elezioni/open-data/amministratori-locali-e-regionali-in-carica",
    readOn: READ_LEVEL2,
  },
  {
    id: "camera-deputati-19",
    name: "Camera dei deputati, dati.camera.it, deputati della XIX legislatura con mandato senza endDate (interrogazione SPARQL)",
    url: "https://dati.camera.it/sparql",
    readOn: READ_LEVEL2,
  },
  {
    id: "senato-senatori-19",
    name: "Senato della Repubblica, dati.senato.it, senatori della XIX legislatura (CSV senza codice di collegio)",
    url: "https://dati.senato.it/DatiSenato/browse/composizione?legislatura=19",
    readOn: READ_LEVEL2,
  },
  {
    id: "legge-180-2026",
    name: "Legge 9 ottobre 2026, n. 180, disposizioni in materia di elezioni della Camera e del Senato (26G00201)",
    url: "https://www.normattiva.it/eli/id/2026/10/09/26G00201/ORIGINAL",
    readOn: READ_LEVEL2,
  },
  {
    id: "legge-28-2000",
    name: "Legge 22 febbraio 2000, n. 28, articolo 8, sondaggi politici ed elettorali",
    url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2000-02-22;28~art8",
    readOn: READ_LEVEL2,
  },
  {
    id: "dait-speciale",
    name: "Dipartimento per gli affari interni e territoriali, Speciale elezioni (suppletiva Camera Abruzzo e turno straordinario del 15-16 novembre 2026)",
    url: "https://dait.interno.gov.it/elezioni/speciale-elezioni",
    readOn: READ_LEVEL2,
  },
  {
    id: "istat-comuni-chunk",
    name: "ISTAT, Elenco-comuni-italiani.xlsx, foglio «CODICI al 21_02_2026», denominazione, codici e flag capoluogo di ciascun comune",
    url: "https://www.istat.it/storage/codici-unita-amministrative/Elenco-comuni-italiani.xlsx",
    readOn: READ_LEVEL3,
  },
  {
    id: "anagrafe-comuni",
    name: "Ministero dell'interno, open data degli amministratori in carica al 24 agosto 2026 (sindaciincarica.csv, maggiororgano.csv, ammcom.csv)",
    url: "https://dait.interno.gov.it/elezioni/open-data/amministratori-locali-e-regionali-in-carica",
    readOn: READ_LEVEL3,
  },
  {
    id: "collegi-comune-codes",
    name: "Dipartimento per le riforme istituzionali, tabelle A.1 e B.1 del decreto legislativo n. 177/2020, colonna del codice ISTAT del comune",
    url: "https://www.riformeistituzionali.gov.it/it/i-nuovi-collegi-elettorali/",
    readOn: READ_LEVEL3,
  },
  {
    id: "dait-speciale-19",
    name: "Dipartimento per gli affari interni e territoriali, Speciale elezioni, riletta il 19 ottobre 2026",
    url: "https://dait.interno.gov.it/elezioni/speciale-elezioni",
    readOn: READ_LEVEL3,
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
