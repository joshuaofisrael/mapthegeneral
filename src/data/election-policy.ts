/**
 * Separate from the statutory `rules` on each election window:
 * the official body's data-release time, and this site's stricter editorial hold.
 * Times use the election's IANA zone so daylight saving stays in the offset.
 */
export type PolicyCitation = { label: string; url: string };

export type OfficialRelease = {
  at: string;
  note: string;
  citation: PolicyCitation;
};

export type EditorialHold = {
  startsAt: string;
  holdUntil: string;
  note: string;
};

export type ReleasePolicy = {
  timeZone: string;
  officialRelease: OfficialRelease;
  editorial: EditorialHold;
  /** Clock time is not enough. Missing or false confirmation stays closed. */
  requiresEndOfVotingConfirmation?: boolean;
};

const ACMA = "https://www.acma.gov.au/election-and-referendum-blackout-periods";

function policy(
  timeZone: string,
  at: string,
  startsAt: string,
  officialNote: string,
  citation: PolicyCitation,
  editorialNote: string,
  extra?: Pick<ReleasePolicy, "requiresEndOfVotingConfirmation">,
): ReleasePolicy {
  return {
    timeZone,
    officialRelease: { at, note: officialNote, citation },
    editorial: { startsAt, holdUntil: at, note: editorialNote },
    ...extra,
  };
}

const editorialCount =
  "This site’s own policy is to show no count before the official release time, and to publish no poll, quick count, or exit poll. A missing confirmation, a failed feed, or an announced polling extension does not open the page.";

export const RELEASE_POLICIES: Record<string, ReleasePolicy> = {
  "il-2026-knesset": policy(
    "Asia/Jerusalem",
    "2026-10-27T22:00:00+02:00",
    "2026-10-27T00:00:00+02:00",
    "Central Elections Committee vote totals may be shown after polls close at 22:00 Israel time. Seats this site calculates from partial totals are not an official allocation.",
    { label: "Central Elections Committee for the 26th Knesset, results", url: "https://cdn-votes26.bechirot.gov.il/" },
    "After 22:00 Israel time the results pages may show television channels' published seat samples in a separate section marked unofficial. Committee vote totals stay in the results block. A seat allocation this site calculates from partial Committee totals is unofficial, not final, and not an official seat allocation. A missing or stale feed shows no seats.",
  ),
  "ca-bc-2026": policy(
    "America/Vancouver",
    "2026-10-24T20:00:00-07:00",
    "2026-10-24T00:00:00-07:00",
    "Elections BC event-night reporting is the official source after voting closes at 20:00 Pacific time.",
    { label: "Elections BC, 2026 provincial election event night reporting", url: "https://www.results.elections.bc.ca/" },
    editorialCount,
  ),
  "it-2026-chieti": policy(
    "Europe/Rome",
    "2026-11-16T15:00:00+01:00",
    "2026-11-16T00:00:00+01:00",
    "Eligendo is the official source after voting ends at 15:00 on 16 November 2026.",
    { label: "Ministero dell’Interno, Eligendo", url: "https://elezioni.interno.gov.it/" },
    editorialCount,
  ),
  "pl-2026-senat-20": policy(
    "Europe/Warsaw",
    "2026-11-22T21:00:00+01:00",
    "2026-11-22T00:00:00+01:00",
    "The National Electoral Commission is the official source after voting ends at 21:00.",
    { label: "Państwowa Komisja Wyborcza", url: "https://wybory.gov.pl/" },
    editorialCount,
  ),
  "au-vic-2026": policy(
    "Australia/Melbourne",
    "2026-11-28T18:00:00+11:00",
    "2026-11-28T00:00:00+11:00",
    "Victorian Electoral Commission results may be shown after polls close at 18:00 Australian Eastern Daylight Time.",
    { label: "Victorian Electoral Commission results", url: "https://www.vec.vic.gov.au/results" },
    `This site’s own conservative editorial policy is to show no Victorian count until polls close at 18:00 Australian Eastern Daylight Time on 28 November 2026. The Broadcasting Services Act advertising blackout applies to broadcasters only (${ACMA}) and is not the source of this hold.`,
  ),
  "au-nsw-2027": policy(
    "Australia/Sydney",
    "2027-03-13T18:00:00+11:00",
    "2027-03-13T00:00:00+11:00",
    "NSW Electoral Commission pages are the official source after polls close at 18:00 Australian Eastern Daylight Time.",
    {
      label: "NSW Electoral Commission, 2027 NSW State election",
      url: "https://elections.nsw.gov.au/elections/state-elections/2027-nsw-state-election",
    },
    `This site’s own conservative editorial policy is to show no New South Wales count until polls close at 18:00 Australian Eastern Daylight Time on 13 March 2027. The Broadcasting Services Act advertising blackout applies to broadcasters only (${ACMA}) and is not the source of this hold.`,
  ),
  "es-2026-generales": policy(
    "Europe/Madrid",
    "2026-11-29T21:00:00+01:00",
    "2026-11-29T00:00:00+01:00",
    "Interior ministry results may be shown after polls close in the Canary Islands, 21:00 peninsular time.",
    { label: "Ministerio del Interior, resultados electorales", url: "https://www.infoelectoral.interior.gob.es/" },
    editorialCount,
  ),
  "ch-2026-11-29": policy(
    "Europe/Zurich",
    "2026-11-29T12:00:00+01:00",
    "2026-11-29T00:00:00+01:00",
    "The Federal Statistical Office is the official source from 12:00.",
    { label: "Bundesamt für Statistik, Abstimmungen", url: "https://www.bfs.admin.ch/bfs/de/home/statistiken/politik/abstimmungen.html" },
    editorialCount,
  ),
  "ie-2026-seanad": policy(
    "Europe/Dublin",
    "2026-11-06T11:00:00+00:00",
    "2026-11-06T00:00:00+00:00",
    "Houses of the Oireachtas results may be shown after polls close at 11:00 Ireland time.",
    { label: "Houses of the Oireachtas, elections", url: "https://www.oireachtas.ie/en/elections/" },
    editorialCount,
  ),
  "mx-2027-federal": policy(
    "America/Tijuana",
    "2027-06-06T18:00:00-07:00",
    "2027-06-06T00:00:00-07:00",
    "Polls, quick counts, and exit polls stay unpublished until 18:00 in the westernmost Mexican time zone (America/Tijuana, Baja California), not 18:00 Mexico City time.",
    { label: "Instituto Nacional Electoral", url: "https://www.ine.mx/" },
    "This site uses the westernmost Mexican time zone for every poll, quick-count, and exit-poll release. Mexico City time does not open them. A failed feed does not open them either.",
  ),
  "bg-2026-11-01": policy(
    "Europe/Sofia",
    "2026-11-01T21:00:00+02:00",
    "2026-11-01T00:00:00+02:00",
    "The latest hour article 220 allows for a queue is 21:00 Bulgaria time. The Central Election Commission’s confirmation that voting has ended is still required. The clock alone does not release a count.",
    { label: "Централна избирателна комисия, резултати", url: "https://results.cik.bg/" },
    "The 1 November page stays closed until the Central Election Commission confirms that voting has ended. A missing confirmation fails closed. An announced extension or a failed feed does not publish a count.",
    { requiresEndOfVotingConfirmation: true },
  ),
  "nz-2026-11-07": policy(
    "Pacific/Auckland",
    "2026-11-07T19:00:00+13:00",
    "2026-11-07T00:00:00+13:00",
    "electionresults.govt.nz is the official source after 19:00 New Zealand daylight time.",
    { label: "electionresults.govt.nz", url: "https://electionresults.govt.nz/" },
    "From 00:00 to 19:00 New Zealand daylight time on 7 November 2026 this site does not change New Zealand election content, does not ping IndexNow for New Zealand URLs, and does not promote those pages. Existing pages stay as they are. No count is shown before 19:00.",
  ),
  "tw-2026-local": policy(
    "Asia/Taipei",
    "2026-11-29T00:00:00+08:00",
    "2026-11-28T00:00:00+08:00",
    "The Commission’s 16 July 2026 report does not print a closing hour, so this site treats the next calendar day, 00:00 Taiwan time, as the official release.",
    { label: "Central Election Commission", url: "https://www.cec.gov.tw/" },
    editorialCount,
  ),
  "ee-2027-03-07": policy(
    "Europe/Tallinn",
    "2027-03-07T20:15:00+02:00",
    "2027-03-07T00:00:00+02:00",
    "The National Electoral Service is the official source after 20:15 Eastern European Time.",
    { label: "Riigi valimisteenistus", url: "https://www.valimised.ee/" },
    editorialCount,
  ),
  "nl-2027-03-17": policy(
    "Europe/Amsterdam",
    "2027-03-17T21:00:00+01:00",
    "2027-03-17T00:00:00+01:00",
    "The Kiesraad results service is the official source after 21:00 Central European Time.",
    { label: "Kiesraad, verkiezingsuitslagen", url: "https://www.verkiezingsuitslagen.nl/" },
    editorialCount,
  ),
  "fi-2027-04-18": policy(
    "Europe/Helsinki",
    "2027-04-18T20:00:00+03:00",
    "2027-04-18T00:00:00+03:00",
    "The Ministry of Justice results service is the official source after 20:00 Eastern European Summer Time.",
    { label: "Oikeusministeriö, tulospalvelu", url: "https://tulospalvelu.vaalit.fi/" },
    editorialCount,
  ),
};
