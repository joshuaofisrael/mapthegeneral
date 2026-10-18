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
  rules: LawRule[];
};

export const ELECTION_WINDOWS: ElectionWindow[] = [
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
    id: "fr-2027-presidentielle-t1",
    country: "fr",
    localLang: "fr",
    election: {
      en: "Presidential election, first round (date as printed on service-public.fr page F1939; check the convening decree)",
      local: "élection présidentielle, premier tour (date imprimée sur la fiche F1939 ; vérifier le décret de convocation)",
    },
    pollingDay: "2027-04-18",
    trackerOpensAt: "2027-04-18T20:00:00+02:00",
    officialResults: { label: "Ministère de l’Intérieur, résultats des élections", url: "https://www.resultats-elections.interieur.gouv.fr/" },
    rules: [
      {
        kind: "poll-ban",
        start: "2027-04-17T00:00:00+02:00",
        end: "2027-04-18T20:00:00+02:00",
        citation: {
          label: "Loi n° 77-808 du 19 juillet 1977, article 11",
          url: "https://www.legifrance.gouv.fr/loda/article_lc/LEGIARTI000032454547",
        },
        en: "Law 77-808, article 11: for a presidential election, no election poll may be published, broadcast or commented on from 00:00 on the Saturday before the vote until the last polling station in metropolitan France closes. This site prints no polls in that window.",
        local:
          "Article 11 de la loi n° 77-808 : pour l’élection présidentielle, aucun sondage électoral ne peut être publié, diffusé ou commenté à compter du samedi précédant le scrutin à zéro heure et jusqu’à la fermeture du dernier bureau de vote en métropole. Ce site ne publie aucun sondage pendant cette période.",
      },
      {
        kind: "results-embargo",
        start: "2027-04-17T00:00:00+02:00",
        end: "2027-04-18T20:00:00+02:00",
        citation: {
          label: "Code électoral, articles L49 et L52-2",
          url: "https://www.legifrance.gouv.fr/codes/texte_lc/LEGITEXT000006070239/",
        },
        en: "Electoral Code articles L49 and L52-2: no campaign messages from midnight on the day before the vote, and no results, partial or final, before the last polling station in metropolitan France closes.",
        local:
          "Code électoral, articles L49 et L52-2 : aucun message de propagande à partir de la veille du scrutin à zéro heure, et aucun résultat, partiel ou définitif, avant la fermeture du dernier bureau de vote en métropole.",
      },
    ],
  },
  {
    id: "kr-2027-04-07",
    country: "kr",
    localLang: "ko",
    election: { en: "By-elections, 7 April 2027", local: "2027년 4월 7일 재·보궐선거" },
    pollingDay: "2027-04-07",
    trackerOpensAt: "2027-04-07T20:00:00+09:00",
    officialResults: { label: "중앙선거관리위원회 선거통계시스템", url: "https://info.nec.go.kr/" },
    rules: [
      {
        kind: "poll-ban",
        start: "2027-04-01T00:00:00+09:00",
        end: "2027-04-07T20:00:00+09:00",
        citation: {
          label: "공직선거법 제108조 제1항",
          url: "https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B3%B5%EC%A7%81%EC%84%A0%EA%B1%B0%EB%B2%95",
        },
        en: "Public Official Election Act article 108(1) forbids publishing or quoting polls on party support or likely winners from six days before polling day until voting ends. This site prints no polls for these by-elections until 20:00 on 7 April 2027.",
        local:
          "공직선거법 제108조제1항은 선거일 전 6일부터 투표마감시각까지 정당 지지도나 당선인을 예상하게 하는 여론조사의 결과를 공표하거나 인용하여 보도하는 것을 금지합니다. 이 사이트는 2027년 4월 7일 20시까지 이 선거에 관한 여론조사를 싣지 않습니다.",
      },
    ],
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
