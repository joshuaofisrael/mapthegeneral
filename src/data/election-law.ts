/**
 * Election-law windows for Map the General.
 *
 * Each window is a period set by a country's election law during which this
 * site must not publish something (opinion polls, campaign-style content,
 * results or exit polls). Pages read this table on the client and show a
 * neutral notice; anything marked with `data-election-gate="<id>"` is hidden
 * while its window is open. `scripts/check-election-law.ts` validates the
 * table at build time and fails the build on poll figures or premature
 * tracker returns.
 *
 * Times carry their own UTC offset. Citations are official legal texts.
 * Matrix with the full audit: docs/election-law.md.
 */

export type GateKind = "poll-ban" | "silence" | "results-embargo";

export type Citation = { label: string; url: string };

export type LawRule = {
  kind: GateKind;
  start: string;
  end: string;
  citation: Citation;
  en: string;
  local?: string;
};

export type ElectionWindow = {
  id: string;
  /** First path segment on this site, e.g. "pl" for /pl/... */
  country: string;
  /** Local-language path segment, e.g. "pl" in /pl/pl/... */
  localLang?: string;
  election: { en: string; local?: string };
  pollingDay: string;
  /** Earliest instant a live tracker may show any vote count. */
  trackerOpensAt: string;
  /** Official results service the tracker may read, and nothing else. */
  officialResults: Citation;
  /**
   * Calling instruments read for this window. Set once the date, place and
   * office are confirmed from those pages. A window without it is not confirmed.
   */
  verified?: { readOn: string; sources: Citation[] };
  rules: LawRule[];
};

export const ELECTION_WINDOWS: ElectionWindow[] = [
  {
    id: "il-2026-knesset",
    country: "il",
    localLang: "he",
    election: { en: "Election to the 26th Knesset, 27 October 2026", local: "הבחירות לכנסת ה-26, 27 באוקטובר 2026" },
    pollingDay: "2026-10-27",
    trackerOpensAt: "2026-10-27T22:00:00+02:00",
    officialResults: { label: "Central Elections Committee for the 26th Knesset, results", url: "https://cdn-votes26.bechirot.gov.il/" },
    verified: {
      readOn: "2026-10-26",
      sources: [
        { label: "Central Elections Committee, candidate lists for the 26th Knesset", url: "https://www.gov.il/he/pages/candidates-lists-26" },
        { label: "Elections (Modes of Propaganda) Law 5719-1959, s. 16E", url: "https://www.nevo.co.il/law_html/law00/90696.htm" },
      ],
    },
    rules: [
      {
        kind: "poll-ban",
        start: "2026-10-23T23:59:00+03:00",
        end: "2026-10-27T22:00:00+02:00",
        citation: { label: "Elections (Modes of Propaganda) Law 5719-1959, s. 16E(h)", url: "https://www.nevo.co.il/law_html/law00/90696.htm" },
        en: "Israeli law bars publishing new election poll results from the end of the Friday before polling day until polls close (Elections (Modes of Propaganda) Law, s. 16E(h)). This site publishes no polls or exit polls at any time and shows only Central Elections Committee counts after polls close at 22:00 Israel time on 27 October 2026.",
        local: "החוק אוסר לפרסם תוצאות סקרי בחירות חדשים מתום יום שישי שלפני הבחירות ועד סגירת הקלפיות (חוק הבחירות (דרכי תעמולה), סעיף 16ה(ח)). אתר זה אינו מפרסם סקרים או מדגמים בשום שלב, ויציג רק נתוני ועדת הבחירות המרכזית לאחר סגירת הקלפיות ב-22:00, 27 באוקטובר 2026.",
      },
    ],
  },
  {
    id: "ca-bc-2026",
    country: "ca",
    localLang: "fr",
    election: {
      en: "British Columbia provincial general election, 24 October 2026",
      local: "élection générale provinciale de la Colombie-Britannique, 24 octobre 2026",
    },
    pollingDay: "2026-10-24",
    trackerOpensAt: "2026-10-24T20:00:00-07:00",
    officialResults: {
      label: "Elections BC, 2026 provincial election event night reporting",
      url: "https://www.results.elections.bc.ca/",
    },
    rules: [
      {
        kind: "poll-ban",
        start: "2026-10-24T00:00:00-07:00",
        end: "2026-10-24T20:00:00-07:00",
        citation: {
          label: "Election Act (British Columbia), RSBC 1996, c. 106, section 233.1",
          url: "https://www.bclaws.gov.bc.ca/civix/document/id/consol26/consol26/96106_11",
        },
        en: "Election Act section 233.1 forbids publishing, broadcasting or transmitting new election opinion survey results in an electoral district on general voting day before all voting stations there close. This site prints no polls for this election, and shows no counts until voting closes at 20:00 Pacific time on 24 October 2026.",
        local:
          "L’article 233.1 de l’Election Act interdit de publier, de diffuser ou de transmettre, le jour du scrutin général et avant la fermeture de tous les bureaux de vote d’une circonscription, des résultats de sondages électoraux non encore rendus publics. Ce site ne publie aucun sondage sur cette élection et n’affiche aucun résultat avant la fermeture des bureaux de vote à 20 h, heure du Pacifique, le 24 octobre 2026.",
      },
      {
        kind: "silence",
        start: "2026-10-24T00:00:00-07:00",
        end: "2026-10-24T20:00:00-07:00",
        citation: {
          label: "Election Act (British Columbia), RSBC 1996, c. 106, section 233",
          url: "https://www.bclaws.gov.bc.ca/civix/document/id/consol26/consol26/96106_11",
        },
        en: "Election Act section 233 forbids publishing, broadcasting or transmitting election advertising on general voting day before all voting stations close. This site carries no election advertising and publishes no new content about this election until voting closes.",
        local:
          "L’article 233 de l’Election Act interdit de publier, de diffuser ou de transmettre de la publicité électorale le jour du scrutin général avant la fermeture de tous les bureaux de vote. Ce site ne diffuse aucune publicité électorale et ne publie aucun nouveau contenu sur cette élection avant la fermeture des bureaux de vote.",
      },
    ],
  },
  {
    id: "it-2026-chieti",
    country: "it",
    localLang: "it",
    election: {
      en: "Chamber of Deputies by-election, single-member constituency 01-Chieti (Abruzzo), 15–16 November 2026",
      local: "elezione suppletiva della Camera, collegio uninominale 01-Chieti (Abruzzo), 15–16 novembre 2026",
    },
    pollingDay: "2026-11-15",
    trackerOpensAt: "2026-11-16T15:00:00+01:00",
    officialResults: { label: "Ministero dell’Interno, Eligendo", url: "https://elezioni.interno.gov.it/" },
    verified: {
      readOn: "2026-10-26",
      sources: [
        {
          label: "Decreto del Presidente della Repubblica 25 settembre 2026, Gazzetta Ufficiale Serie Generale n. 224 del 26 settembre 2026 (26A05139)",
          url: "https://www.gazzettaufficiale.it/eli/id/2026/09/26/26A05139/sg",
        },
        {
          label: "Ministero dell’Interno, Dipartimento per gli affari interni e territoriali, Speciale elezioni",
          url: "https://dait.interno.gov.it/elezioni/speciale-elezioni",
        },
        {
          label: "Prefettura di Chieti, elezione suppletiva della Camera dei deputati, 15-16 novembre 2026",
          url: "https://prefettura.interno.gov.it/it/prefetture/chieti/comunicazioni/elezione-suppletiva-camera-deputati-15-16-novembre-2026",
        },
        { label: "Ministero dell’Interno, Eligendo", url: "https://elezioni.interno.gov.it/" },
      ],
    },
    rules: [
      {
        kind: "poll-ban",
        start: "2026-10-31T00:00:00+01:00",
        end: "2026-11-16T15:00:00+01:00",
        citation: {
          label: "Legge 22 febbraio 2000, n. 28, articolo 8",
          url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:2000-02-22;28",
        },
        en: "Law 28/2000, article 8, forbids publishing opinion-poll results in the 15 days before the vote. This site prints no polls for this election until voting ends at 15:00 on 16 November 2026.",
        local:
          "L’articolo 8 della legge 28/2000 vieta di rendere pubblici i risultati di sondaggi nei quindici giorni precedenti il voto. Questo sito non pubblica sondaggi su questa elezione fino alla chiusura dei seggi, alle 15:00 del 16 novembre 2026.",
      },
      {
        kind: "silence",
        start: "2026-11-14T00:00:00+01:00",
        end: "2026-11-16T15:00:00+01:00",
        citation: {
          label: "Legge 4 aprile 1956, n. 212, articolo 9",
          url: "https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:legge:1956-04-04;212",
        },
        en: "Law 212/1956, article 9, forbids electoral propaganda on the day before and the days of the vote. This site publishes no new content about this election until voting ends.",
        local:
          "L’articolo 9 della legge 212/1956 vieta la propaganda elettorale il giorno precedente e i giorni del voto. Questo sito non pubblica nuovi contenuti su questa elezione fino alla chiusura dei seggi.",
      },
    ],
  },
  {
    id: "pl-2026-senat-20",
    country: "pl",
    localLang: "pl",
    election: {
      en: "Senate by-election in constituency no. 20, 22 November 2026",
      local: "wybory uzupełniające do Senatu w okręgu wyborczym nr 20, 22 listopada 2026 r.",
    },
    pollingDay: "2026-11-22",
    trackerOpensAt: "2026-11-22T21:00:00+01:00",
    officialResults: { label: "Państwowa Komisja Wyborcza", url: "https://wybory.gov.pl/" },
    rules: [
      {
        kind: "silence",
        start: "2026-11-21T00:00:00+01:00",
        end: "2026-11-22T21:00:00+01:00",
        citation: {
          label: "Kodeks wyborczy, art. 107 § 1 i art. 115 § 1",
          url: "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20110210112",
        },
        en: "Electoral Code articles 107 and 115: election silence runs from 24 hours before polling day until voting ends. No campaigning, no poll results and no exit polls may be published. This site shows no polls, projections or results for this by-election until voting ends at 21:00 on 22 November 2026.",
        local:
          "Kodeks wyborczy, art. 107 i 115: cisza wyborcza trwa od 24 godzin przed dniem głosowania do zakończenia głosowania. Zakazana jest agitacja oraz podawanie wyników sondaży, w tym sondaży z dnia głosowania. Ten serwis nie pokazuje sondaży, prognoz ani wyników tych wyborów do zakończenia głosowania o 21:00 22 listopada 2026 r.",
      },
    ],
  },
  {
    id: "au-vic-2026",
    country: "au",
    election: { en: "Victorian state election, 28 November 2026" },
    pollingDay: "2026-11-28",
    trackerOpensAt: "2026-11-28T18:00:00+11:00",
    officialResults: { label: "Victorian Electoral Commission results", url: "https://www.vec.vic.gov.au/results" },
    rules: [
      {
        kind: "results-embargo",
        start: "2026-11-25T00:00:00+11:00",
        end: "2026-11-28T18:00:00+11:00",
        citation: {
          label: "Broadcasting Services Act 1992, Schedule 2, clause 3A (electoral advertising blackout for broadcasters)",
          url: "https://www.legislation.gov.au/C2004A04401/latest/text",
        },
        en: "Broadcasters may not carry electoral advertisements from midnight on the Wednesday before polling day until polls close (Broadcasting Services Act 1992, Schedule 2, clause 3A). This site carries no electoral advertising at any time and shows no counts until polls close at 18:00 on 28 November 2026.",
      },
    ],
  },
  {
    id: "au-nsw-2027",
    country: "au",
    election: { en: "New South Wales state election, 13 March 2027" },
    pollingDay: "2027-03-13",
    trackerOpensAt: "2027-03-13T18:00:00+11:00",
    officialResults: {
      label: "NSW Electoral Commission, 2027 NSW State election",
      url: "https://elections.nsw.gov.au/elections/state-elections/2027-nsw-state-election",
    },
    verified: {
      readOn: "2026-10-27",
      sources: [
        {
          label: "NSW Electoral Commission, 2027 NSW State election",
          url: "https://elections.nsw.gov.au/elections/state-elections/2027-nsw-state-election",
        },
        {
          label: "Constitution Act 1902 (NSW), section 24A",
          url: "https://legislation.nsw.gov.au/view/html/inforce/current/act-1902-032#sec.24A",
        },
      ],
    },
    rules: [
      {
        kind: "results-embargo",
        start: "2027-03-10T00:00:00+11:00",
        end: "2027-03-13T18:00:00+11:00",
        citation: {
          label: "Broadcasting Services Act 1992, Schedule 2, clause 3A (electoral advertising blackout for broadcasters)",
          url: "https://www.legislation.gov.au/C2004A04401/latest/text",
        },
        en: "Broadcasters may not carry electoral advertisements from midnight on the Wednesday before polling day until polls close (Broadcasting Services Act 1992, Schedule 2, clause 3A). This site carries no electoral advertising at any time and shows no counts until polls close at 18:00 on 13 March 2027.",
      },
    ],
  },
  {
    id: "es-2026-generales",
    country: "es",
    localLang: "es",
    election: {
      en: "General election (Cortes Generales), 29 November 2026",
      local: "elecciones generales a Cortes Generales, 29 de noviembre de 2026",
    },
    pollingDay: "2026-11-29",
    trackerOpensAt: "2026-11-29T21:00:00+01:00",
    officialResults: { label: "Ministerio del Interior, resultados electorales", url: "https://www.infoelectoral.interior.gob.es/" },
    verified: {
      readOn: "2026-10-27",
      sources: [
        {
          label: "Real Decreto 806/2026 (BOE-A-2026-20742), texto",
          url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742",
        },
        { label: "Real Decreto 806/2026, ELI", url: "https://www.boe.es/eli/es/rd/2026/10/05/806" },
      ],
    },
    rules: [
      {
        kind: "poll-ban",
        start: "2026-11-24T00:00:00+01:00",
        end: "2026-11-29T21:00:00+01:00",
        citation: {
          label: "Ley Orgánica 5/1985 del Régimen Electoral General, artículo 69.7",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672",
        },
        en: "LOREG article 69.7 forbids publishing election polls during the five days before the vote. This site prints no polls for this election from 24 November until polls close in the Canary Islands (21:00 peninsular time) on 29 November 2026.",
        local:
          "El artículo 69.7 de la LOREG prohíbe publicar sondeos electorales durante los cinco días anteriores a la votación. Este sitio no publica sondeos de estas elecciones desde el 24 de noviembre hasta el cierre de los colegios en Canarias (21:00 hora peninsular) del 29 de noviembre de 2026.",
      },
      {
        kind: "silence",
        start: "2026-11-28T00:00:00+01:00",
        end: "2026-11-29T21:00:00+01:00",
        citation: {
          label: "Ley Orgánica 5/1985 del Régimen Electoral General, artículos 51 y 53",
          url: "https://www.boe.es/buscar/act.php?id=BOE-A-1985-11672",
        },
        en: "LOREG articles 51 and 53: the campaign ends at midnight before the day of reflection, and no campaign propaganda may be spread after that. This site publishes no new content about this election until polls close.",
        local:
          "Artículos 51 y 53 de la LOREG: la campaña termina a las cero horas del día anterior a la votación (jornada de reflexión) y después no puede difundirse propaganda. Este sitio no publica contenido nuevo sobre estas elecciones hasta el cierre de los colegios.",
      },
    ],
  },
  {
    id: "ch-2026-11-29",
    country: "ch",
    election: { en: "Federal popular vote, 29 November 2026" },
    pollingDay: "2026-11-29",
    trackerOpensAt: "2026-11-29T12:00:00+01:00",
    officialResults: { label: "Bundesamt für Statistik, Abstimmungen", url: "https://www.bfs.admin.ch/bfs/de/home/statistiken/politik/abstimmungen.html" },
    rules: [],
  },
  {
    id: "ie-2026-seanad",
    country: "ie",
    election: { en: "Seanad Éireann bye-election, Cultural and Educational Panel, 6 November 2026" },
    pollingDay: "2026-11-06",
    trackerOpensAt: "2026-11-06T11:00:00+00:00",
    officialResults: { label: "Houses of the Oireachtas, elections", url: "https://www.oireachtas.ie/en/elections/" },
    verified: {
      readOn: "2026-10-27",
      sources: [
        {
          label: "Department of Housing, Local Government and Heritage, Polling Day Order for the Seanad bye-election",
          url: "https://www.gov.ie/en/department-of-housing-local-government-and-heritage/press-releases/polling-day-order-for-seanad-bye-election-made-by-minister-browne/",
        },
        { label: "Houses of the Oireachtas, elections", url: "https://www.oireachtas.ie/en/elections/" },
      ],
    },
    rules: [],
  },
  {
    id: "mx-2027-federal",
    country: "mx",
    localLang: "es",
    election: { en: "Federal election, 6 June 2027", local: "elección federal, 6 de junio de 2027" },
    pollingDay: "2027-06-06",
    trackerOpensAt: "2027-06-06T18:00:00-07:00",
    officialResults: { label: "Instituto Nacional Electoral, PREP y cómputos", url: "https://www.ine.mx/" },
    rules: [
      {
        kind: "poll-ban",
        start: "2027-06-03T00:00:00-06:00",
        end: "2027-06-06T18:00:00-07:00",
        citation: {
          label: "Ley General de Instituciones y Procedimientos Electorales, artículo 251, párrafo 6",
          url: "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGIPE.pdf",
        },
        en: "LGIPE article 251(6) forbids publishing poll results from three days before the election until the official close of polls in the westernmost time zone. This site prints no polls for this election in that window.",
        local:
          "El artículo 251, párrafo 6, de la LGIPE prohíbe publicar resultados de encuestas desde tres días antes de la elección y hasta el cierre oficial de las casillas en el huso horario más occidental. Este sitio no publica encuestas de esta elección en ese periodo.",
      },
    ],
  },
];

/**
 * Countries with pages but no dated window. The build check requires every
 * registry country to appear here or on a window. These notes are not a
 * tracker and they do not open one.
 */
export type StandingRule = {
  country: string;
  note: string;
  citation: Citation;
};

export const STANDING_RULES: StandingRule[] = [
  {
    country: "gb",
    note: "No dated window. Representation of the People Act 1983 section 66A forbids publishing an exit poll before the close of the poll. This site publishes no exit poll and no United Kingdom tracker until a window is added.",
    citation: {
      label: "Representation of the People Act 1983, section 66A",
      url: "https://www.legislation.gov.uk/ukpga/1983/2/section/66A",
    },
  },
  {
    country: "ie",
    note: "The Seanad Éireann bye-election of 6 November 2026 has its own dated window. No polling day was printed for the next Dáil election. Broadcaster guidelines are not a rule for this website. The Electoral Commission says Part V of the Electoral Reform Act 2022 has not been commenced. This site publishes no polls and no candidate photographs. The Seanad window has no tracker fetcher.",
    citation: {
      label: "Electoral Commission, regulation of political advertising",
      url: "https://www.electoralcommission.ie/regulation-of-political-advertising/",
    },
  },
  {
    country: "no",
    note: "No dated window. The next Storting election is stated as September 2029, with no day. The Directorate’s summary of section 21-8 forbids publication of results before 21:00 on election day, including forecasts based on surveys that day or the day before. Lovdata was not opened. This site publishes no Norway tracker.",
    citation: {
      label: "Valgdirektoratet, changes in the new election act",
      url: "https://valgmedarbeiderportalen.valg.no/artikler/regelverksendringer-ny-valglov",
    },
  },
  {
    country: "se",
    note: "No dated window for a blackout. The next ordinary elections are stated as 8 September 2030. No poll-publication ban was found on the Valmyndigheten English pages read on 23 October 2026, and the election act was not read section by section. This site publishes no polls and no Sweden tracker.",
    citation: {
      label: "Valmyndigheten, future elections, published 16 October 2026",
      url: "https://val.se/english/future-elections/2026-elections---the-riksdag-and-regional-and-municipal-councils",
    },
  },
  {
    country: "br",
    note: "No dated window open. The 2026 general election ended with the runoff on 25 October 2026. This site publishes only TSE totals and no polls.",
    citation: { label: "TSE, official results service", url: "https://resultados.tse.jus.br/oficial/app/index.html" },
  },
  {
    country: "rs",
    note: "No dated window is open for a count. Voting for the National Assembly ended at 20:00 on 25 October 2026. A presidential election has not been called; this site does not print a presidential polling day until one is published. This site publishes only RIK figures for the Assembly, labelled preliminary until RIK publishes the total report, and no polls or seat projections.",
    citation: { label: "RIK, about National Assembly elections", url: "https://www.rik.parlament.gov.rs/tekst/77/o-izborima-za-narodne-poslanike.php" },
  },
];

/** Rules that are in force at `now` for a given country path segment. */
export function activeRules(country: string, now: number): { window: ElectionWindow; rule: LawRule }[] {
  const out: { window: ElectionWindow; rule: LawRule }[] = [];
  for (const window of ELECTION_WINDOWS) {
    if (window.country !== country) continue;
    for (const rule of window.rules) {
      if (now >= Date.parse(rule.start) && now < Date.parse(rule.end)) out.push({ window, rule });
    }
  }
  return out;
}

/** True once a live tracker for `id` may show vote counts. Unknown ids stay closed. */
export function trackerOpen(id: string, now: number): boolean {
  const window = ELECTION_WINDOWS.find((item) => item.id === id);
  if (!window) return false;
  const latestRuleEnd = Math.max(...window.rules.map((rule) => Date.parse(rule.end)), 0);
  return now >= Math.max(Date.parse(window.trackerOpensAt), latestRuleEnd);
}
