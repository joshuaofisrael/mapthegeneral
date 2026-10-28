/**
 * Election-night pages for contests whose polling day is inside the 60-day
 * window, plus Israel on 27 October 2026 while that night is still current.
 * Counts use trackerOpen(): nothing before polls close or during a blackout.
 * Feeds are /il-live/<id>/results.json, the same prefix as the Israel worker.
 */
import { ELECTION_WINDOWS, trackerOpen } from "./election-law";
import { nzFreezeActive, NZ_WINDOW_ID } from "./nz-freeze";

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
    id: "nz-2026-11-07",
    timeZone: "Pacific/Auckland",
    title: "New Zealand · general election · 7 November 2026",
    detail: "No count before 19:00 New Zealand daylight time. No party names on this card.",
    sourceHref: "https://electionresults.govt.nz/",
    links: [{ href: "/nz/en/elections/general-election/", label: "General election", lang: "en" }],
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
    id: "tw-2026-local",
    timeZone: "Asia/Taipei",
    title: "Taiwan · local elections · 28 November 2026",
    detail:
      "No count before 00:00 on 29 November 2026, Taiwan time. The Commission’s report did not print a closing hour.",
    sourceHref: "https://www.cec.gov.tw/",
    links: [
      { href: "/tw/zh/elections/difang-gongzhi-2026/#results", label: "地方公職人員選舉", lang: "zh" },
      { href: "/tw/en/elections/local-2026/#results", label: "Local elections", lang: "en" },
    ],
    pages: {
      zh: copy({
        heading: "開票",
        countdown: "得票最早可於",
        countdownNote:
          "台灣時間2026年11月29日0時之前，這一節不顯示得票。那個時刻是投票日的次日開始，不是委員會印出的閉所時間。",
        awaiting: "等待中央選舉委員會公布的第一筆得票。這一節會自行更新。",
        preliminary: "初步，出自中央選舉委員會",
        final: "確定結果，出自中央選舉委員會",
        note: "數字只從委員會抄錄。這一節不做推估，也不指出當選人。",
        updated: "最後更新 {time}",
        fetched: "最後讀取 {time}",
        tzLabel: "台灣時間",
        stale: "最新更新未能載入。顯示上次收到的得票。",
        staleEmpty: "最新更新未能載入。",
        colName: "名稱",
        colVotes: "得票",
        colShare: "占比",
        units: "日|小時|分|秒",
        noscript: "台灣時間2026年11月29日0時之前不顯示得票。",
        sourceLabel: "中央選舉委員會",
      }),
      en: copy({
        heading: "Election night",
        countdown: "A count no sooner than",
        countdownNote:
          "No count is shown here before 00:00 on 29 November 2026, Taiwan time. That instant is the start of the next calendar day. It is not a closing hour the Commission printed.",
        awaiting: "Waiting for the first Central Election Commission count. This page updates automatically.",
        preliminary: "Provisional, from the Central Election Commission",
        final: "Final results, from the Central Election Commission",
        note: "Figures are copied from the Commission. This page makes no forecast and does not name a winner.",
        updated: "Last updated {time}",
        fetched: "Last fetched {time}",
        tzLabel: "Taiwan time",
        stale: "The latest update could not be loaded. Showing the last count received.",
        staleEmpty: "The latest update could not be loaded.",
        colName: "Name",
        colVotes: "Votes",
        colShare: "Share",
        units: enUnits,
        noscript: "No count is shown before 00:00 on 29 November 2026, Taiwan time.",
        sourceLabel: "Central Election Commission",
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
  {
    id: "ee-2027-03-07",
    timeZone: "Europe/Tallinn",
    title: "Estonia · Riigikogu · 7 March 2027",
    detail: "No count before 20:15 Eastern European Time. No poll and no projection.",
    sourceHref: "https://www.valimised.ee/",
    links: [
      { href: "/ee/et/elections/riigikogu-2027/", label: "Riigikogu valimised, 7. märts 2027", lang: "et" },
      { href: "/ee/en/elections/riigikogu-2027/", label: "Riigikogu election, 7 March 2027", lang: "en" },
    ],
    pages: {
      et: copy({
        heading: "Ametlikud tulemused",
        countdown: "Hääli mitte enne",
        countdownNote:
          "See osa ei näita hääli enne kella 20.15 Ida-Euroopa aja järgi 7. märtsil 2027. See ei näita küsitlust ega prognoosi.",
        awaiting: "Kell on 20.15. Ootame esimest arvu valimisteenistuselt. See osa uueneb ise.",
        preliminary: "Esialgne, Riigi valimisteenistuselt",
        final: "Lõplik tulemus, Riigi valimisteenistuselt",
        note: "Arv siin on valimisteenistuselt. See ei ole prognoos. See sait ei avalda küsitlust ega prognoosi.",
        updated: "Uuendatud {time}",
        fetched: "Loetud {time}",
        tzLabel: "Ida-Euroopa aeg",
        stale: "Viimast uuendust ei saanud laadida. Näidatakse viimati saabunud hääli.",
        staleEmpty: "Viimast uuendust ei saanud laadida.",
        colName: "Nimi",
        colVotes: "Hääled",
        colShare: "Osa",
        units: "päeva|tundi|min|s",
        noscript: "Hääli ei näidata enne kella 20.15 Ida-Euroopa aja järgi 7. märtsil 2027.",
        sourceLabel: "Riigi valimisteenistus",
      }),
      en: copy({
        heading: "Official results",
        countdown: "A count no sooner than",
        countdownNote:
          "No count is shown here before 20:15 Eastern European Time on 7 March 2027. This section shows no poll and no projection.",
        awaiting: "20:15 has passed. Waiting for the first figure from the electoral service. This page updates automatically.",
        preliminary: "Preliminary, from the National Electoral Service",
        final: "Final results, from the National Electoral Service",
        note: "A figure here is from the electoral service. It is not a projection. This site publishes no poll and no projection.",
        updated: "Last updated {time}",
        fetched: "Last fetched {time}",
        tzLabel: "Eastern European Time",
        stale: "The latest update could not be loaded. Showing the last count received.",
        staleEmpty: "The latest update could not be loaded.",
        colName: "Name",
        colVotes: "Votes",
        colShare: "Share",
        units: enUnits,
        noscript: "No count is shown before 20:15 Eastern European Time on 7 March 2027.",
        sourceLabel: "National Electoral Service",
      }),
    },
  },
  {
    id: "nl-2027-03-17",
    timeZone: "Europe/Amsterdam",
    title: "Netherlands · Provincial States and water boards · 17 March 2027",
    detail: "No count before 21:00 Central European Time. No poll and no projection.",
    sourceHref: "https://www.verkiezingsuitslagen.nl/",
    links: [
      { href: "/nl/nl/elections/provinciale-staten-2027/", label: "Provinciale Staten en waterschappen, 17 maart 2027", lang: "nl" },
      { href: "/nl/en/elections/provincial-2027/", label: "Provincial States and water boards, 17 March 2027", lang: "en" },
    ],
    pages: {
      nl: copy({
        heading: "Officiële uitslag",
        countdown: "Stemmen niet voor",
        countdownNote:
          "Dit deel toont geen stemmen voor 21:00 Midden-Europese tijd op 17 maart 2027. Het toont geen peiling en geen projectie.",
        awaiting: "Het is 21:00. We wachten op het eerste getal van de Kiesraad. Dit deel ververst zelf.",
        preliminary: "Voorlopig, van de Kiesraad",
        final: "Vastgestelde uitslag, van de Kiesraad",
        note: "Een getal hier komt van de Kiesraad. Het is geen projectie. Deze site publiceert geen peiling en geen projectie.",
        updated: "Bijgewerkt {time}",
        fetched: "Gelezen {time}",
        tzLabel: "Midden-Europese tijd",
        stale: "De laatste versie kon niet worden geladen. De laatst ontvangen stemmen blijven staan.",
        staleEmpty: "De laatste versie kon niet worden geladen.",
        colName: "Naam",
        colVotes: "Stemmen",
        colShare: "Deel",
        units: "dagen|uur|min|s",
        noscript: "Geen stemmen voor 21:00 Midden-Europese tijd op 17 maart 2027.",
        sourceLabel: "Kiesraad",
      }),
      en: copy({
        heading: "Official results",
        countdown: "A count no sooner than",
        countdownNote:
          "No count is shown here before 21:00 Central European Time on 17 March 2027. This section shows no poll and no projection.",
        awaiting: "21:00 has passed. Waiting for the first Kiesraad figure. This page updates automatically.",
        preliminary: "Preliminary, from the Kiesraad",
        final: "Final results, from the Kiesraad",
        note: "A figure here is from the Kiesraad. It is not a projection. This site publishes no poll and no projection.",
        updated: "Last updated {time}",
        fetched: "Last fetched {time}",
        tzLabel: "Central European Time",
        stale: "The latest update could not be loaded. Showing the last count received.",
        staleEmpty: "The latest update could not be loaded.",
        colName: "Name",
        colVotes: "Votes",
        colShare: "Share",
        units: enUnits,
        noscript: "No count is shown before 21:00 Central European Time on 17 March 2027.",
        sourceLabel: "Kiesraad",
      }),
    },
  },
  {
    id: "fi-2027-04-18",
    timeZone: "Europe/Helsinki",
    title: "Finland · parliamentary election · 18 April 2027",
    detail: "No count before 20:00 Eastern European Summer Time. No poll and no projection.",
    sourceHref: "https://tulospalvelu.vaalit.fi/",
    links: [
      { href: "/fi/fi/elections/eduskunta-2027/", label: "Eduskuntavaalit, 18. huhtikuuta 2027", lang: "fi" },
      { href: "/fi/sv/elections/riksdagsval-2027/", label: "Riksdagsval, 18 april 2027", lang: "sv" },
      { href: "/fi/en/elections/parliamentary-2027/", label: "Parliamentary election, 18 April 2027", lang: "en" },
    ],
    pages: {
      fi: copy({
        heading: "Virallinen tulos",
        countdown: "Ääniä ei ennen",
        countdownNote:
          "Tämä osa ei näytä ääniä ennen kello 20.00 Itä-Euroopan kesäaikaa 18. huhtikuuta 2027. Se ei näytä kyselyä eikä ennustetta.",
        awaiting: "Kello on 20.00. Odotamme ensimmäistä lukua tulospalvelusta. Tämä osa päivittyy itse.",
        preliminary: "Alustava, oikeusministeriön tulospalvelusta",
        final: "Vahvistettu tulos, oikeusministeriön tulospalvelusta",
        note: "Luku tässä on tulospalvelusta. Se ei ole ennuste. Tämä sivusto ei julkaise kyselyä eikä ennustetta.",
        updated: "Päivitetty {time}",
        fetched: "Luettu {time}",
        tzLabel: "Itä-Euroopan kesäaika",
        stale: "Viimeisintä päivitystä ei saatu ladattua. Näytetään viimeksi saadut äänet.",
        staleEmpty: "Viimeisintä päivitystä ei saatu ladattua.",
        colName: "Nimi",
        colVotes: "Äänet",
        colShare: "Osuus",
        units: "päivää|tuntia|min|s",
        noscript: "Ääniä ei näytetä ennen kello 20.00 Itä-Euroopan kesäaikaa 18. huhtikuuta 2027.",
        sourceLabel: "Oikeusministeriö",
      }),
      en: copy({
        heading: "Official results",
        countdown: "A count no sooner than",
        countdownNote:
          "No count is shown here before 20:00 Eastern European Summer Time on 18 April 2027. This section shows no poll and no projection.",
        awaiting: "20:00 has passed. Waiting for the first figure from the results service. This page updates automatically.",
        preliminary: "Preliminary, from the Ministry of Justice results service",
        final: "Final results, from the Ministry of Justice results service",
        note: "A figure here is from the results service. It is not a projection. This site publishes no poll and no projection.",
        updated: "Last updated {time}",
        fetched: "Last fetched {time}",
        tzLabel: "Eastern European Summer Time",
        stale: "The latest update could not be loaded. Showing the last count received.",
        staleEmpty: "The latest update could not be loaded.",
        colName: "Name",
        colVotes: "Votes",
        colShare: "Share",
        units: enUnits,
        noscript: "No count is shown before 20:00 Eastern European Summer Time on 18 April 2027.",
        sourceLabel: "Ministry of Justice",
      }),
      sv: copy({
        heading: "Officiellt resultat",
        countdown: "Inga röster före",
        countdownNote:
          "Detta avsnitt visar inga röster före klockan 20.00 östeuropeisk sommartid den 18 april 2027. Det visar ingen mätning och ingen projektion.",
        awaiting: "Klockan är 20.00. Vi väntar på den första siffran från resultattjänsten. Detta avsnitt uppdateras av sig självt.",
        preliminary: "Preliminärt, från justitieministeriets resultattjänst",
        final: "Fastställt resultat, från justitieministeriets resultattjänst",
        note: "En siffra här är från resultattjänsten. Den är inte en projektion. Denna webbplats publicerar ingen mätning och ingen projektion.",
        updated: "Uppdaterad {time}",
        fetched: "Läst {time}",
        tzLabel: "Östeuropeisk sommartid",
        stale: "Den senaste uppdateringen kunde inte laddas. Visar de senast mottagna rösterna.",
        staleEmpty: "Den senaste uppdateringen kunde inte laddas.",
        colName: "Namn",
        colVotes: "Röster",
        colShare: "Andel",
        units: "dagar|timmar|min|s",
        noscript: "Inga röster visas före klockan 20.00 östeuropeisk sommartid den 18 april 2027.",
        sourceLabel: "Justitieministeriet",
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

function promoted(id: string, now: number): boolean {
  return !(id === NZ_WINDOW_ID && nzFreezeActive(now));
}

/** Latest contest still inside its night window, otherwise the next one to open. */
export function activeNight(now: number): NightDef | null {
  const sorted = [...NIGHT_ELECTIONS].sort((a, b) => Date.parse(nightOpensAt(a.id)) - Date.parse(nightOpensAt(b.id)));
  const inNight = sorted.filter((item) => {
    if (!promoted(item.id, now)) return false;
    const open = Date.parse(nightOpensAt(item.id));
    return now >= open && now < open + NIGHT_WINDOW_MS;
  });
  if (inNight.length) return inNight[inNight.length - 1];
  return sorted.find((item) => promoted(item.id, now) && Date.parse(nightOpensAt(item.id)) > now) ?? null;
}

export function otherNights(now: number, currentId: string): NightDef[] {
  return NIGHT_ELECTIONS.filter((item) => {
    if (item.id === currentId || !promoted(item.id, now)) return false;
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
