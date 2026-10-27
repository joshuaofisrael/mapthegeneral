/**
 * Election-night pages for contests whose polling day is inside the 60-day
 * window, plus Israel on 27 October 2026 while that night is still current.
 * Counts use trackerOpen(): nothing before polls close or during a blackout.
 * Feeds are /il-live/<id>/results.json, the same prefix as the Israel worker.
 */
import { ELECTION_WINDOWS, trackerOpen } from "./election-law";

export const NIGHT_WINDOW_MS = 18 * 60 * 60 * 1000;
export const NIGHT_POLL_MS = 60_000;
const RAW_REPO = "https://raw.githubusercontent.com/joshuaofisrael/mapthegeneral/il-live-data";

export type NightLink = { href: string; label: string; lang?: string };

export type NightCopy = {
  heading: string;
  countdown: string;
  countdownNote: string;
  awaiting: string;
  preliminary: string;
  final: string;
  note: string;
  updated: string;
  fetched: string;
  tzLabel: string;
  stale: string;
  staleEmpty: string;
  colName: string;
  colVotes: string;
  colShare: string;
  units: string;
  noscript: string;
  sourceLabel: string;
};

export type NightDef = {
  id: string;
  timeZone: string;
  title: string;
  detail: string;
  links: NightLink[];
  sourceHref: string;
  /** Static SEO pages and the Spain route. Israel already has its own board. */
  pages: Record<string, NightCopy>;
};

const enUnits = "days|hours|min|sec";

function copy(partial: NightCopy): NightCopy {
  return partial;
}

export const NIGHT_ELECTIONS: NightDef[] = [
  {
    id: "il-2026-knesset",
    timeZone: "Asia/Jerusalem",
    title: "Israel · Knesset election · 27 October 2026",
    detail: "Official Central Elections Committee count from 22:00 Israel time. No polls.",
    sourceHref: "https://cdn-votes26.bechirot.gov.il/",
    links: [
      { href: "/il/he/results/", label: "תוצאות הבחירות 2026 בעברית", lang: "he" },
      { href: "/il/en/results/", label: "Results in English", lang: "en" },
    ],
    pages: {},
  },
  {
    id: "bg-2026-11-01",
    timeZone: "Europe/Sofia",
    title: "Bulgaria · presidential runoff, if held · 1 November 2026",
    detail: "No count before 21:00 Bulgaria time. The Commission’s decisions still say the second vote is possible, not that the two lists are fixed.",
    sourceHref: "https://results.cik.bg/",
    links: [
      { href: "/bg/bg/elections/prezident-2026/", label: "Президентски избор", lang: "bg" },
      { href: "/bg/en/elections/president-2026/", label: "Presidential election", lang: "en" },
    ],
    pages: {},
  },
  {
    id: "tw-2026-11-28",
    timeZone: "Asia/Taipei",
    title: "Taiwan · local elections · 28 November 2026",
    detail: "No count before 23:59 Taiwan time. The pages read on 27 October 2026 did not print the clock time when voting ends.",
    sourceHref: "https://web.cec.gov.tw/",
    links: [
      { href: "/tw/zh/elections/difang-2026/", label: "地方公職人員選舉", lang: "zh" },
      { href: "/tw/en/elections/local-2026/", label: "Local elections", lang: "en" },
    ],
    pages: {},
  },
  {
    id: "ie-2026-seanad",
    timeZone: "Europe/Dublin",
    title: "Ireland · Seanad bye-election · 6 November 2026",
    detail: "Polls close at 11:00 Ireland time. The electorate is members of the Oireachtas.",
    sourceHref: "https://www.oireachtas.ie/en/elections/",
    links: [{ href: "/ie/en/elections/seanad-2026/#results", label: "Seanad bye-election", lang: "en" }],
    pages: {
      en: copy({
        heading: "Election night",
        countdown: "Polls close in",
        countdownNote:
          "The official count appears here after polls close at 11:00 Ireland time on 6 November 2026. Until then this page shows no count.",
        awaiting:
          "Polls have closed. Waiting for the first count published by the Houses of the Oireachtas. This page updates automatically.",
        preliminary: "Provisional, from the Houses of the Oireachtas",
        final: "Final results, from the Houses of the Oireachtas",
        note: "Figures are the official count as published. This page does not call a winner and does not make a forecast.",
        updated: "Last updated {time}",
        fetched: "Last fetched {time}",
        tzLabel: "Ireland time",
        stale: "The latest update could not be loaded. Showing the last count received.",
        staleEmpty: "The latest update could not be loaded.",
        colName: "Candidate",
        colVotes: "Votes",
        colShare: "Share",
        units: enUnits,
        noscript: "A count is not shown before polls close at 11:00 Ireland time on 6 November 2026.",
        sourceLabel: "Houses of the Oireachtas, elections",
      }),
    },
  },
  {
    id: "it-2026-chieti",
    timeZone: "Europe/Rome",
    title: "Italy · Chamber by-election, Chieti · 15–16 November 2026",
    detail: "Voting ends at 15:00 on 16 November 2026. No count before then.",
    sourceHref: "https://elezioni.interno.gov.it/",
    links: [
      { href: "/it/it/elections/camera-chieti-2026/#results", label: "Suppletive di Chieti", lang: "it" },
      { href: "/it/en/elections/camera-chieti-2026/#results", label: "Chieti by-election", lang: "en" },
    ],
    pages: {
      en: copy({
        heading: "Election night",
        countdown: "Polls close in",
        countdownNote:
          "The official count appears here after voting ends at 15:00 on 16 November 2026. Until then this page shows no count. It prints no polls during the 15-day ban.",
        awaiting: "Voting has ended. Waiting for the first Eligendo count. This page updates automatically.",
        preliminary: "Provisional, from the Interior Ministry (Eligendo)",
        final: "Final results, from the Interior Ministry (Eligendo)",
        note: "Figures are the official count as published. This page does not call a winner and does not make a forecast.",
        updated: "Last updated {time}",
        fetched: "Last fetched {time}",
        tzLabel: "Central European Time",
        stale: "The latest update could not be loaded. Showing the last count received.",
        staleEmpty: "The latest update could not be loaded.",
        colName: "Candidate",
        colVotes: "Votes",
        colShare: "Share",
        units: enUnits,
        noscript: "A count is not shown before 15:00 on 16 November 2026.",
        sourceLabel: "Ministero dell’Interno, Eligendo",
      }),
      it: copy({
        heading: "Sera elettorale",
        countdown: "I seggi chiudono tra",
        countdownNote:
          "Il conteggio ufficiale compare qui dopo la chiusura dei seggi, alle 15:00 del 16 novembre 2026. Fino ad allora questa pagina non mostra cifre e non pubblica sondaggi.",
        awaiting: "I seggi sono chiusi. In attesa del primo dato di Eligendo. La pagina si aggiorna da sola.",
        preliminary: "Provvisorio, dal Ministero dell’interno (Eligendo)",
        final: "Risultato definitivo, dal Ministero dell’interno (Eligendo)",
        note: "Cifre del conteggio ufficiale. Questa pagina non proclama un eletto e non fa previsioni.",
        updated: "Aggiornato alle {time}",
        fetched: "Letto alle {time}",
        tzLabel: "ora dell’Europa centrale",
        stale: "L’ultimo aggiornamento non si è caricato. Sono mostrate le ultime cifre ricevute.",
        staleEmpty: "L’ultimo aggiornamento non si è caricato.",
        colName: "Candidato",
        colVotes: "Voti",
        colShare: "Quota",
        units: "giorni|ore|min|sec",
        noscript: "Nessun conteggio prima delle 15:00 del 16 novembre 2026.",
        sourceLabel: "Ministero dell’interno, Eligendo",
      }),
    },
  },
  {
    id: "pl-2026-senat-20",
    timeZone: "Europe/Warsaw",
    title: "Poland · Senate by-election, constituency 20 · 22 November 2026",
    detail: "Voting ends at 21:00 on 22 November 2026. Silence runs until then.",
    sourceHref: "https://wybory.gov.pl/",
    links: [
      { href: "/pl/pl/elections/senat-20-2026/#results", label: "Wybory do Senatu, okręg 20", lang: "pl" },
      { href: "/pl/en/elections/senat-20-2026/#results", label: "Senate constituency 20", lang: "en" },
    ],
    pages: {
      en: copy({
        heading: "Election night",
        countdown: "Voting ends in",
        countdownNote:
          "Nothing from a survey, and no count, is shown during election silence or before voting ends at 21:00 on 22 November 2026. The official count appears here after that.",
        awaiting: "Voting has ended. Waiting for the first National Electoral Commission count. This page updates automatically.",
        preliminary: "Provisional, from the National Electoral Commission",
        final: "Final results, from the National Electoral Commission",
        note: "Figures are the official count as published. This page does not call a winner and does not make a forecast.",
        updated: "Last updated {time}",
        fetched: "Last fetched {time}",
        tzLabel: "Central European Time",
        stale: "The latest update could not be loaded. Showing the last count received.",
        staleEmpty: "The latest update could not be loaded.",
        colName: "Candidate",
        colVotes: "Votes",
        colShare: "Share",
        units: enUnits,
        noscript: "A count is not shown before voting ends at 21:00 on 22 November 2026.",
        sourceLabel: "Państwowa Komisja Wyborcza",
      }),
      pl: copy({
        heading: "Noc wyborcza",
        countdown: "Koniec głosowania za",
        countdownNote:
          "W ciszy wyborczej i przed końcem głosowania o 21:00 22 listopada 2026 r. ta strona nie pokazuje wyników. Liczenie pojawi się tutaj po tym czasie.",
        awaiting: "Głosowanie zakończone. Czekamy na pierwsze dane Państwowej Komisji Wyborczej. Strona odświeża się sama.",
        preliminary: "Wstępne, z Państwowej Komisji Wyborczej",
        final: "Wynik ostateczny, z Państwowej Komisji Wyborczej",
        note: "Liczby są oficjalnym liczeniem. Ta strona nie wskazuje wybranego senatora i nie podaje prognozy.",
        updated: "Ostatnia aktualizacja {time}",
        fetched: "Ostatni odczyt {time}",
        tzLabel: "czasu środkowoeuropejskiego",
        stale: "Nie udało się wczytać ostatniej aktualizacji. Pokazane są ostatnie otrzymane liczby.",
        staleEmpty: "Nie udało się wczytać ostatniej aktualizacji.",
        colName: "Kandydat",
        colVotes: "Głosy",
        colShare: "Udział",
        units: "dni|godz.|min|sek",
        noscript: "Liczenie nie pojawi się przed końcem głosowania o 21:00 22 listopada 2026 r.",
        sourceLabel: "Państwowa Komisja Wyborcza",
      }),
    },
  },
  {
    id: "au-vic-2026",
    timeZone: "Australia/Melbourne",
    title: "Victoria · state election · 28 November 2026",
    detail: "Polls close at 18:00 Australian Eastern Daylight Time. No count before then.",
    sourceHref: "https://www.vec.vic.gov.au/results",
    links: [{ href: "/au/en/elections/victoria-2026/#results", label: "Victorian state election", lang: "en" }],
    pages: {
      en: copy({
        heading: "Election night",
        countdown: "Polls close in",
        countdownNote:
          "The official count appears here after polls close at 18:00 Australian Eastern Daylight Time on 28 November 2026. Until then this page shows no count.",
        awaiting: "Polls have closed. Waiting for the first Victorian Electoral Commission count. This page updates automatically.",
        preliminary: "Provisional, from the Victorian Electoral Commission",
        final: "Final results, from the Victorian Electoral Commission",
        note: "Figures are the official count as published. This page does not call a district and does not make a forecast.",
        updated: "Last updated {time}",
        fetched: "Last fetched {time}",
        tzLabel: "Australian Eastern Daylight Time",
        stale: "The latest update could not be loaded. Showing the last count received.",
        staleEmpty: "The latest update could not be loaded.",
        colName: "Name",
        colVotes: "Votes",
        colShare: "Share",
        units: enUnits,
        noscript: "A count is not shown before 18:00 Australian Eastern Daylight Time on 28 November 2026.",
        sourceLabel: "Victorian Electoral Commission results",
      }),
    },
  },
  {
    id: "es-2026-generales",
    timeZone: "Europe/Madrid",
    title: "Spain · Cortes Generales · 29 November 2026",
    detail: "Called by Real Decreto 806/2026. No count before the Canary Islands close, 21:00 peninsular time.",
    sourceHref: "https://www.infoelectoral.interior.gob.es/",
    links: [
      { href: "/es/es/elections/cortes-generales-2026/#results", label: "Elecciones generales", lang: "es" },
      { href: "/es/en/elections/cortes-generales-2026/#results", label: "General election", lang: "en" },
    ],
    pages: {
      en: copy({
        heading: "Election night",
        countdown: "Count opens in",
        countdownNote:
          "Voting in the Canary Islands closes at 21:00 peninsular time on 29 November 2026. No count is shown here before then, and no poll is shown in the five days before the vote.",
        awaiting: "Polls have closed. Waiting for the first Interior Ministry count. This page updates automatically.",
        preliminary: "Provisional, from the Interior Ministry",
        final: "Final results, from the Interior Ministry",
        note: "Figures are the official count as published. This page does not call a majority and does not make a forecast.",
        updated: "Last updated {time}",
        fetched: "Last fetched {time}",
        tzLabel: "peninsular time",
        stale: "The latest update could not be loaded. Showing the last count received.",
        staleEmpty: "The latest update could not be loaded.",
        colName: "List",
        colVotes: "Votes",
        colShare: "Share",
        units: enUnits,
        noscript: "A count is not shown before 21:00 peninsular time on 29 November 2026.",
        sourceLabel: "Ministerio del Interior, Infoelectoral",
      }),
      es: copy({
        heading: "Noche electoral",
        countdown: "El escrutinio podrá verse en",
        countdownNote:
          "Los colegios de Canarias cierran a las 21:00 hora peninsular del 29 de noviembre de 2026. Hasta entonces esta página no muestra cifras.",
        awaiting: "Los colegios han cerrado. A la espera del primer escrutinio del Ministerio del Interior. Esta página se actualiza sola.",
        preliminary: "Provisional, del Ministerio del Interior",
        final: "Resultados definitivos, del Ministerio del Interior",
        note: "Cifras del escrutinio oficial. Esta página no proclama una mayoría y no hace una previsión.",
        updated: "Actualizado a las {time}",
        fetched: "Consultado a las {time}",
        tzLabel: "hora peninsular",
        stale: "No se ha podido cargar la última actualización. Se muestran las últimas cifras recibidas.",
        staleEmpty: "No se ha podido cargar la última actualización.",
        colName: "Candidatura",
        colVotes: "Votos",
        colShare: "Porcentaje",
        units: "días|horas|min|s",
        noscript: "No se muestra un escrutinio antes de las 21:00 hora peninsular del 29 de noviembre de 2026.",
        sourceLabel: "Ministerio del Interior, Infoelectoral",
      }),
    },
  },
  {
    id: "ch-2026-11-29",
    timeZone: "Europe/Zurich",
    title: "Switzerland · federal popular vote · 29 November 2026",
    detail: "Four proposals. No count before 12:00 Central European Time.",
    sourceHref: "https://www.bfs.admin.ch/bfs/de/home/statistiken/politik/abstimmungen.html",
    links: [
      { href: "/ch/de/elections/volksabstimmung-2026-11-29/#results", label: "Volksabstimmung", lang: "de" },
      { href: "/ch/fr/elections/volksabstimmung-2026-11-29/#results", label: "Votation", lang: "fr" },
      { href: "/ch/it/elections/volksabstimmung-2026-11-29/#results", label: "Votazione", lang: "it" },
      { href: "/ch/en/elections/volksabstimmung-2026-11-29/#results", label: "Popular vote", lang: "en" },
    ],
    pages: {
      de: copy({
        heading: "Abstimmungsnacht",
        countdown: "Ein Ergebnis frühestens in",
        countdownNote:
          "Ein Ergebnis erscheint hier nicht vor 12:00 mitteleuropäischer Zeit am 29. November 2026. Bis dahin zeigt diese Seite keine Zahlen.",
        awaiting: "Warten auf die ersten Zahlen des Bundesamts für Statistik. Diese Seite aktualisiert sich von selbst.",
        preliminary: "Vorläufig, vom Bundesamt für Statistik",
        final: "Endergebnis, vom Bundesamt für Statistik",
        note: "Zahlen der amtlichen Auszählung. Diese Seite gibt keine Empfehlung und sagt nichts voraus.",
        updated: "Zuletzt aktualisiert {time}",
        fetched: "Zuletzt gelesen {time}",
        tzLabel: "mitteleuropäische Zeit",
        stale: "Die letzte Aktualisierung konnte nicht geladen werden. Angezeigt werden die zuletzt empfangenen Zahlen.",
        staleEmpty: "Die letzte Aktualisierung konnte nicht geladen werden.",
        colName: "Vorlage",
        colVotes: "Stimmen",
        colShare: "Anteil",
        units: "Tage|Stunden|Min.|Sek.",
        noscript: "Kein Ergebnis vor 12:00 mitteleuropäischer Zeit am 29. November 2026.",
        sourceLabel: "Bundesamt für Statistik, Abstimmungen",
      }),
      fr: copy({
        heading: "Soirée de votation",
        countdown: "Un résultat au plus tôt dans",
        countdownNote:
          "Aucun résultat n’est montré ici avant 12 h, heure de l’Europe centrale, le 29 novembre 2026. Jusque-là cette page ne montre aucun chiffre.",
        awaiting: "En attente des premiers chiffres de l’Office fédéral de la statistique. Cette page se met à jour seule.",
        preliminary: "Provisoire, de l’Office fédéral de la statistique",
        final: "Résultat final, de l’Office fédéral de la statistique",
        note: "Chiffres du décompte officiel. Cette page ne formule ni recommandation ni prévision.",
        updated: "Dernière mise à jour {time}",
        fetched: "Dernière lecture {time}",
        tzLabel: "heure de l’Europe centrale",
        stale: "La dernière mise à jour n’a pas pu être chargée. Les derniers chiffres reçus restent affichés.",
        staleEmpty: "La dernière mise à jour n’a pas pu être chargée.",
        colName: "Objet",
        colVotes: "Voix",
        colShare: "Part",
        units: "jours|heures|min|s",
        noscript: "Aucun résultat avant 12 h, heure de l’Europe centrale, le 29 novembre 2026.",
        sourceLabel: "Office fédéral de la statistique, votations",
      }),
      it: copy({
        heading: "Sera della votazione",
        countdown: "Un risultato non prima di",
        countdownNote:
          "Nessun risultato è mostrato qui prima delle 12:00, ora dell’Europa centrale, del 29 novembre 2026. Fino ad allora questa pagina non mostra cifre.",
        awaiting: "In attesa delle prime cifre dell’Ufficio federale di statistica. La pagina si aggiorna da sola.",
        preliminary: "Provvisorio, dall’Ufficio federale di statistica",
        final: "Risultato finale, dall’Ufficio federale di statistica",
        note: "Cifre del conteggio ufficiale. Questa pagina non formula una raccomandazione e non fa una previsione.",
        updated: "Ultimo aggiornamento {time}",
        fetched: "Ultima lettura {time}",
        tzLabel: "ora dell’Europa centrale",
        stale: "L’ultimo aggiornamento non si è caricato. Restano le ultime cifre ricevute.",
        staleEmpty: "L’ultimo aggiornamento non si è caricato.",
        colName: "Oggetto",
        colVotes: "Voti",
        colShare: "Quota",
        units: "giorni|ore|min|sec",
        noscript: "Nessun risultato prima delle 12:00, ora dell’Europa centrale, del 29 novembre 2026.",
        sourceLabel: "Ufficio federale di statistica, votazioni",
      }),
      en: copy({
        heading: "Election night",
        countdown: "A count no sooner than",
        countdownNote:
          "No count is shown here before 12:00 Central European Time on 29 November 2026. Until then this page shows no figures.",
        awaiting: "Waiting for the first Federal Statistical Office count. This page updates automatically.",
        preliminary: "Provisional, from the Federal Statistical Office",
        final: "Final results, from the Federal Statistical Office",
        note: "Figures are the official count as published. This page makes no recommendation and no forecast.",
        updated: "Last updated {time}",
        fetched: "Last fetched {time}",
        tzLabel: "Central European Time",
        stale: "The latest update could not be loaded. Showing the last count received.",
        staleEmpty: "The latest update could not be loaded.",
        colName: "Proposal",
        colVotes: "Votes",
        colShare: "Share",
        units: enUnits,
        noscript: "No count is shown before 12:00 Central European Time on 29 November 2026.",
        sourceLabel: "Federal Statistical Office, popular votes",
      }),
    },
  },
];

export function nightById(id: string): NightDef | undefined {
  return NIGHT_ELECTIONS.find((item) => item.id === id);
}

export function nightOpensAt(id: string): string {
  const window = ELECTION_WINDOWS.find((item) => item.id === id);
  if (!window) throw new Error(`no election window for ${id}`);
  const open = Date.parse(window.trackerOpensAt);
  const latestRule = Math.max(0, ...window.rules.map((rule) => Date.parse(rule.end)));
  if (latestRule > open) {
    throw new Error(`${id}: a blackout ends after trackerOpensAt`);
  }
  return window.trackerOpensAt;
}

export function countsVisible(id: string, now: number): boolean {
  return trackerOpen(id, now);
}

export function feedPath(id: string): string {
  return `/il-live/${id}/results.json`;
}

export function rawFeedUrl(id: string): string {
  return `${RAW_REPO}/${id}/results.json`;
}

export function snapshotPath(id: string): string {
  return `/live/${id}.json`;
}

/** Latest contest still inside its night window, otherwise the next one to open. */
export function activeNight(now: number): NightDef | null {
  const sorted = [...NIGHT_ELECTIONS].sort((a, b) => Date.parse(nightOpensAt(a.id)) - Date.parse(nightOpensAt(b.id)));
  const inNight = sorted.filter((item) => {
    const open = Date.parse(nightOpensAt(item.id));
    return now >= open && now < open + NIGHT_WINDOW_MS;
  });
  if (inNight.length) return inNight[inNight.length - 1];
  return sorted.find((item) => Date.parse(nightOpensAt(item.id)) > now) ?? null;
}

export function otherNights(now: number, currentId: string): NightDef[] {
  return NIGHT_ELECTIONS.filter((item) => {
    if (item.id === currentId) return false;
    const open = Date.parse(nightOpensAt(item.id));
    return now >= open && now < open + NIGHT_WINDOW_MS;
  });
}

export function localHm(ms: number, timeZone: string): string | null {
  if (!Number.isFinite(ms)) return null;
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      numberingSystem: "latn",
    }).formatToParts(new Date(ms));
    const hour = parts.find((part) => part.type === "hour")?.value ?? "";
    const minute = parts.find((part) => part.type === "minute")?.value ?? "";
    if (!hour || !minute) return null;
    return `${hour}:${minute}`;
  } catch {
    return null;
  }
}
