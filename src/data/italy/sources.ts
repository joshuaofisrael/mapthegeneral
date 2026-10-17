import type { SourceRef } from "./types";

const READ = "2026-10-17";

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
];

export function sourceById(id: string): SourceRef {
  const found = SOURCES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing source ${id}`);
  return found;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map(sourceById);
}
