import type { SourceRef } from "@/data/spain/types";
import { pageMetadata } from "@/lib/metadata";

export type HubCode = "ie" | "no" | "se" | "br" | "rs" | "il";
export type HubKind = "chooser" | "national" | "elections" | "election" | "faq" | "sources";

type Hub = {
  code: HubCode;
  name: string;
  officeLabel: string;
  officeHref: string;
  electionSlug: string;
  electionName: string;
  sources: SourceRef[];
  blurb: string;
};

const READ = "2026-10-23";
const READ_NEW = "2026-10-26";

export const HUBS: Record<HubCode, Hub> = {
  ie: {
    code: "ie",
    name: "Ireland",
    officeLabel: "Electoral Commission",
    officeHref: "https://www.electoralcommission.ie/general-elections/",
    electionSlug: "next-dail",
    electionName: "Next Dáil election",
    blurb:
      "National hub in English. The Electoral Commission says the most recent Dáil election was Friday 29 November 2024, and that a general election has to take place at least every five years. No next polling day was printed on the pages read on 23 October 2026. No municipality pages and no candidate names.",
    sources: [
      { id: "ie-how", name: "Electoral Commission, how to vote", url: "https://www.electoralcommission.ie/how-to-vote/", readOn: READ },
      { id: "ie-ge", name: "Electoral Commission, general elections", url: "https://www.electoralcommission.ie/general-elections/", readOn: READ },
      { id: "ie-elig", name: "Electoral Commission, voter eligibility", url: "https://www.electoralcommission.ie/voter-eligibility/", readOn: READ },
      { id: "ie-reg", name: "Electoral Commission, register to vote", url: "https://www.electoralcommission.ie/register-to-vote/", readOn: READ },
      { id: "ie-access", name: "Electoral Commission, accessible voting", url: "https://www.electoralcommission.ie/accessible-voting/", readOn: READ },
      {
        id: "ie-ads",
        name: "Electoral Commission, regulation of political advertising",
        url: "https://www.electoralcommission.ie/regulation-of-political-advertising/",
        readOn: READ,
      },
      {
        id: "ie-mor",
        name: "Electoral Commission, news item on the broadcast moratorium, 1 November 2024",
        url: "https://www.electoralcommission.ie/latest-news-and-research/election-broadcast-moratorium-removal-welcomed/",
        readOn: READ,
      },
      { id: "ie-voter", name: "voter.ie", url: "https://www.voter.ie/", readOn: READ },
    ],
  },
  no: {
    code: "no",
    name: "Norway",
    officeLabel: "Valgdirektoratet",
    officeHref: "https://www.valg.no/om-valg/valgene-i-norge/stortingsvalg/",
    electionSlug: "storting-2029",
    electionName: "Storting election, September 2029",
    blurb:
      "National hub in English. The Valgdirektoratet page published 21 May 2026 says the next Storting election is in September 2029. It does not name the day. No municipality pages and no candidate names.",
    sources: [
      {
        id: "no-storting",
        name: "Valgdirektoratet, Stortingsval, published 21 May 2026",
        url: "https://www.valg.no/om-valg/valgene-i-norge/stortingsvalg/",
        readOn: READ,
      },
      {
        id: "no-law",
        name: "Valgdirektoratet, changes in the new election act",
        url: "https://valgmedarbeiderportalen.valg.no/artikler/regelverksendringer-ny-valglov",
        readOn: READ,
      },
    ],
  },
  se: {
    code: "se",
    name: "Sweden",
    officeLabel: "Valmyndigheten",
    officeHref: "https://val.se/english/future-elections/2026-elections---the-riksdag-and-regional-and-municipal-councils",
    electionSlug: "riksdag-2030",
    electionName: "Elections of 8 September 2030",
    blurb:
      "National hub in English. Valmyndigheten’s page published 16 October 2026 says the next Riksdag, regional and municipal elections are on Sunday 8 September 2030. No municipality pages, no candidate names and no 2026 party figures.",
    sources: [
      {
        id: "se-next",
        name: "Valmyndigheten, future elections, published 16 October 2026",
        url: "https://val.se/english/future-elections/2026-elections---the-riksdag-and-regional-and-municipal-councils",
        readOn: READ,
      },
      {
        id: "se-vote",
        name: "Valmyndigheten, the right to vote and voting cards",
        url: "https://val.se/english/the-swedish-electoral-system/the-right-to-vote-and-voting-cards",
        readOn: READ,
      },
      {
        id: "se-seats",
        name: "Valmyndigheten, distribution of seats",
        url: "https://val.se/english/the-swedish-electoral-system/distribution-of-seats",
        readOn: READ,
      },
      {
        id: "se-2026",
        name: "Valmyndigheten, Riksdag result protocol, 13 September 2026",
        url: "https://www.val.se/download/18.7faaad3f1a0b0c300e4282/1789822515986/beslutsprotokoll-resultat-riksdagen-2026.pdf",
        readOn: READ,
      },
    ],
  },
  br: {
    code: "br",
    name: "Brazil",
    officeLabel: "Tribunal Superior Eleitoral (TSE)",
    officeHref: "https://resultados.tse.jus.br/oficial/app/index.html",
    electionSlug: "general-2026",
    electionName: "General election, 4 and 25 October 2026",
    blurb:
      "National hub in English. The Tribunal Superior Eleitoral (TSE) results service records the first round of the 2026 general election on 4 October and the presidential runoff on 25 October 2026, with 100% of polling sections counted. Presidential figures only, from the TSE. No municipality pages.",
    sources: [
      { id: "br-tse", name: "TSE, official results service (Resultados)", url: "https://resultados.tse.jus.br/oficial/app/index.html", readOn: READ_NEW },
      { id: "br-r2", name: "TSE, President, second round 25 October 2026, national totals (data file)", url: "https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-c0001-e006258-u.json", readOn: READ_NEW },
      { id: "br-r1", name: "TSE, President, first round 4 October 2026, national totals (data file)", url: "https://resultados.tse.jus.br/oficial/ele2026/6257/dados/br/br-c0001-e006257-u.json", readOn: READ_NEW },
      { id: "br-home", name: "Tribunal Superior Eleitoral", url: "https://www.tse.jus.br/", readOn: READ_NEW },
    ],
  },
  rs: {
    code: "rs",
    name: "Serbia",
    officeLabel: "Republic Electoral Commission (RIK)",
    officeHref: "https://www.rik.parlament.gov.rs/542645/rezultati/",
    electionSlug: "national-assembly-2026",
    electionName: "National Assembly election, 25 October 2026",
    blurb:
      "National hub in English. The Republic Electoral Commission (RIK) is publishing preliminary results of the National Assembly election held on 25 October 2026. Figures here are RIK’s preliminary count, not the final result. No municipality pages.",
    sources: [
      { id: "rs-res", name: "RIK, election results (Rezultati izbora), Parlamentarni 2026", url: "https://www.rik.parlament.gov.rs/542645/rezultati/", readOn: READ_NEW },
      { id: "rs-about", name: "RIK, about National Assembly elections", url: "https://www.rik.parlament.gov.rs/tekst/77/o-izborima-za-narodne-poslanike.php", readOn: READ_NEW },
      { id: "rs-home", name: "Republička izborna komisija", url: "https://www.rik.parlament.gov.rs/", readOn: READ_NEW },
    ],
  },
  il: {
    code: "il",
    name: "Israel",
    officeLabel: "Central Elections Committee",
    officeHref: "https://www.bechirot.gov.il/home/",
    electionSlug: "knesset-2026",
    electionName: "Election to the 26th Knesset, 27 October 2026",
    blurb:
      "National hub in English. The Central Elections Committee set the election to the 26th Knesset for Tuesday 27 October 2026. Neutral facts only: no polls, no forecasts and no results until the Committee publishes them. No municipality pages.",
    sources: [
      { id: "il-cec", name: "Central Elections Committee (bechirot.gov.il)", url: "https://www.bechirot.gov.il/home/", readOn: READ_NEW },
      { id: "il-date", name: "Central Elections Committee, the date of the 26th Knesset election", url: "https://www.gov.il/en/pages/knesset26-date", readOn: READ_NEW },
      { id: "il-dept", name: "Central Elections Committee on gov.il", url: "https://www.gov.il/en/departments/central-elections-committee", readOn: READ_NEW },
      { id: "il-about", name: "Central Elections Committee, elections in Israel (threshold and seat distribution)", url: "https://www.gov.il/en/pages/election-about-info", readOn: READ_NEW },
    ],
  },
};

export function hubHome(code: HubCode): string {
  return `/${code}/`;
}

export function hubEn(code: HubCode, rest = ""): string {
  const tail = rest.replace(/^\/+|\/+$/g, "");
  return tail ? `/${code}/en/${tail}/` : `/${code}/en/`;
}

const COPY: Record<HubCode, Record<HubKind, { title: string; description: string; lede: string; eyebrow?: string }>> = {
  ie: {
    chooser: {
      title: "Ireland — language",
      description: "Ireland on Map the General: an English guide to Dáil elections. No next polling day was printed. Unofficial information.",
      lede: "This release is an English national hub. It has no municipality pages.",
    },
    national: {
      title: "Ireland",
      description:
        "Ireland: how Dáil elections work, from the Electoral Commission. The most recent general election on its page was Friday 29 November 2024. No next polling day was printed. Unofficial information.",
      eyebrow: "Dáil · no polling day printed for the next election",
      lede: "The Electoral Commission’s general-elections page says the most recent general election was on Friday 29 November 2024. It does not print the next polling day.",
    },
    elections: {
      title: "Elections in Ireland",
      description: "Elections named for the Ireland hub. No next Dáil polling day was printed on the pages read on 23 October 2026.",
      lede: "This list is only what the Commission pages read on 23 October 2026 actually dated. It is not a calendar of every local poll.",
    },
    election: {
      title: "Next Dáil election",
      description:
        "The Electoral Commission says a Dáil general election has to take place at least every five years. No polling day for the next one was printed. Unofficial information.",
      eyebrow: "No polling day printed",
      lede: "The general-elections page, read on 23 October 2026, does not name the next polling day.",
    },
    faq: {
      title: "Ireland questions",
      description: "Short answers on the Ireland hub: registration, the ballot, polls and candidate photographs.",
      lede: "Answers below are the same points as the guide on the national page, from Commission pages read on 23 October 2026.",
    },
    sources: {
      title: "Ireland sources",
      description: "Official pages used for the Ireland hub: the Electoral Commission and voter.ie.",
      lede: "Each page in this hub cites this list. The pages were read on 23 October 2026. A reuse licence for the Commission’s text was not read, so the hub paraphrases and links.",
    },
  },
  no: {
    chooser: {
      title: "Norway — language",
      description: "Norway on Map the General: an English guide to the Storting election in September 2029. No day was named. Unofficial information.",
      lede: "This release is an English national hub. It has no municipality pages.",
    },
    national: {
      title: "Norway",
      description:
        "Norway: the Storting election the Valgdirektoratet places in September 2029, with no day named. Unofficial information.",
      eyebrow: "Storting · September 2029 · no day named",
      lede: "The Directorate page published 21 May 2026 says representatives are elected every four years in September, and that the next Storting election is in September 2029.",
    },
    elections: {
      title: "Elections in Norway",
      description: "The Storting election in September 2029, with no day named on the Directorate page read on 23 October 2026.",
      lede: "This hub lists the next Storting election only. It does not list municipal or county polling days.",
    },
    election: {
      title: "Storting election, September 2029",
      description: "Valgdirektoratet says the next Storting election is in September 2029. No day is named. Unofficial information.",
      eyebrow: "September 2029 · day not named",
      lede: "No day in September 2029 was printed on the Directorate page read on 23 October 2026.",
    },
    faq: {
      title: "Norway questions",
      description: "Short answers on the Norway hub: the 2029 date, candidates, and publication of results.",
      lede: "Answers below follow the Directorate pages read on 23 October 2026.",
    },
    sources: {
      title: "Norway sources",
      description: "Official pages used for the Norway hub: Valgdirektoratet on the Storting election and on the new election act.",
      lede: "The Storting page was published 21 May 2026. A reuse licence was not read. The statute text on Lovdata was not opened.",
    },
  },
  se: {
    chooser: {
      title: "Sweden — language",
      description: "Sweden on Map the General: an English guide to the elections Valmyndigheten dates to Sunday 8 September 2030. Unofficial information.",
      lede: "This release is an English national hub. It has no municipality pages.",
    },
    national: {
      title: "Sweden",
      description:
        "Sweden: Riksdag, regional and municipal elections on Sunday 8 September 2030, as Valmyndigheten’s page published 16 October 2026 states. Unofficial information.",
      eyebrow: "Riksdag, regions and municipalities · 8 September 2030",
      lede: "Valmyndigheten’s future-elections page, published 16 October 2026, says the next elections are on Sunday 8 September 2030.",
    },
    elections: {
      title: "Elections in Sweden",
      description: "The 8 September 2030 elections named by Valmyndigheten, and the Riksdag election of 13 September 2026 already held.",
      lede: "This hub does not copy the 2026 party figures and does not list every municipal poll.",
    },
    election: {
      title: "Elections of 8 September 2030",
      description:
        "Valmyndigheten says the next Riksdag, regional and municipal elections are on Sunday 8 September 2030. Unofficial information.",
      eyebrow: "Sunday 8 September 2030",
      lede: "The page published 16 October 2026 says these elections are held every four years, on the second Sunday in September.",
    },
    faq: {
      title: "Sweden questions",
      description: "Short answers on the Sweden hub: the 2030 date, the 2026 address, and what this site does not publish.",
      lede: "Answers below follow Valmyndigheten pages read on 23 October 2026.",
    },
    sources: {
      title: "Sweden sources",
      description: "Official pages used for the Sweden hub: Valmyndigheten on the next elections, the franchise, seats, and the 2026 protocol.",
      lede: "A reuse licence was not read. The election act was not read section by section.",
    },
  },
  br: {
    chooser: {
      title: "Brazil — language",
      description: "Brazil on Map the General: an English guide to the 2026 general election and the official TSE presidential results. Unofficial information.",
      lede: "This release is an English national hub. It has no municipality pages.",
    },
    national: {
      title: "Brazil",
      description: "Brazil 2026 general election: how it works and the official TSE presidential runoff result of 25 October 2026. Unofficial information.",
      eyebrow: "General election · 4 and 25 October 2026",
      lede: "The TSE results service records the first round on 4 October 2026 and the presidential runoff on 25 October 2026, both with 100% of polling sections counted.",
    },
    elections: {
      title: "Elections in Brazil",
      description: "The 2026 general election in Brazil: first round 4 October, presidential runoff 25 October 2026, from the TSE.",
      lede: "This hub lists the 2026 general election only. It does not list municipal or supplementary polls.",
    },
    election: {
      title: "Brazil general election 2026: results",
      description: "Official TSE presidential results: first round 4 October and runoff 25 October 2026, with 100% of sections counted. Unofficial information.",
      eyebrow: "TSE totals · 100% of sections counted",
      lede: "Figures below are copied from the TSE results service national data files read on 26 October 2026.",
    },
    faq: {
      title: "Brazil questions",
      description: "Short answers on the Brazil hub: where the results come from, the runoff, and what this site does not publish.",
      lede: "Answers below follow the TSE results service read on 26 October 2026.",
    },
    sources: {
      title: "Brazil sources",
      description: "Official pages used for the Brazil hub: the Tribunal Superior Eleitoral results service and data files.",
      lede: "Each page in this hub cites this list. The pages were read on 26 October 2026.",
    },
  },
  rs: {
    chooser: {
      title: "Serbia — language",
      description: "Serbia on Map the General: an English guide to the National Assembly election of 25 October 2026, with RIK preliminary results. Unofficial information.",
      lede: "This release is an English national hub. It has no municipality pages.",
    },
    national: {
      title: "Serbia",
      description: "Serbia National Assembly election of 25 October 2026: how it works and the preliminary results published by RIK. Unofficial information.",
      eyebrow: "National Assembly · 25 October 2026 · preliminary",
      lede: "The Republic Electoral Commission (RIK) is publishing a preliminary count of the National Assembly election held on 25 October 2026. RIK has not yet published the final result.",
    },
    elections: {
      title: "Elections in Serbia",
      description: "The National Assembly election of 25 October 2026, from the Republic Electoral Commission.",
      lede: "This hub lists the 2026 National Assembly election only. It does not list local or provincial polls.",
    },
    election: {
      title: "Serbia National Assembly election 2026: preliminary results",
      description: "Preliminary RIK results of Serbia’s 25 October 2026 National Assembly election. Not the final result. Unofficial information.",
      eyebrow: "Preliminary · RIK count in progress",
      lede: "Figures below are RIK’s preliminary results, read on 26 October 2026. They are not the final result.",
    },
    faq: {
      title: "Serbia questions",
      description: "Short answers on the Serbia hub: preliminary versus final results, seats, and what this site does not publish.",
      lede: "Answers below follow RIK pages read on 26 October 2026.",
    },
    sources: {
      title: "Serbia sources",
      description: "Official pages used for the Serbia hub: the Republic Electoral Commission (RIK) results service.",
      lede: "Each page in this hub cites this list. RIK’s website is licensed CC BY-NC-ND 3.0 Serbia; this hub paraphrases and links.",
    },
  },
  il: {
    chooser: {
      title: "Israel — language",
      description: "Israel on Map the General: an English guide to the election to the 26th Knesset on 27 October 2026. Unofficial information.",
      lede: "This release is an English national hub. It has no municipality pages.",
    },
    national: {
      title: "Israel",
      description: "Israel: the election to the 26th Knesset on Tuesday 27 October 2026, set by the Central Elections Committee. 120 seats, 3.25% threshold. Unofficial information.",
      eyebrow: "26th Knesset · Tuesday 27 October 2026",
      lede: "The Central Elections Committee set Tuesday 27 October 2026 (16 Heshvan 5787) as election day for the 26th Knesset.",
    },
    elections: {
      title: "Elections in Israel",
      description: "The election to the 26th Knesset on 27 October 2026, from the Central Elections Committee.",
      lede: "This hub lists the 26th Knesset election only. It does not list local polls.",
    },
    election: {
      title: "Israel Knesset election, 27 October 2026",
      description: "Election to the 26th Knesset on 27 October 2026: 120 seats, 3.25% threshold. Results will come from the Central Elections Committee. Unofficial information.",
      eyebrow: "Tuesday 27 October 2026 · no polls published",
      lede: "This page carries neutral facts only. It publishes no polls, no forecasts and no results. Results will come from the Central Elections Committee.",
    },
    faq: {
      title: "Israel questions",
      description: "Short answers on the Israel hub: the date, seats, threshold, and where results will come from.",
      lede: "Answers below follow Central Elections Committee and Knesset pages read on 26 October 2026.",
    },
    sources: {
      title: "Israel sources",
      description: "Official pages used for the Israel hub: the Central Elections Committee and the Knesset.",
      lede: "Each page in this hub cites this list. The pages were read on 26 October 2026.",
    },
  },
};

export function hubMetadata(code: HubCode, kind: HubKind) {
  const copy = COPY[code][kind];
  const path =
    kind === "chooser"
      ? hubHome(code)
      : kind === "national"
        ? hubEn(code)
        : kind === "elections"
          ? hubEn(code, "elections")
          : kind === "election"
            ? hubEn(code, `elections/${HUBS[code].electionSlug}`)
            : kind === "faq"
              ? hubEn(code, "faq")
              : hubEn(code, "sources");
  return pageMetadata({ title: copy.title, description: copy.description, path });
}

export function hubCopy(code: HubCode, kind: HubKind) {
  return COPY[code][kind];
}
