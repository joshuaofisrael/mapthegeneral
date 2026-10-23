import type { SourceRef } from "@/data/spain/types";
import { pageMetadata } from "@/lib/metadata";

export type HubCode = "ie" | "no" | "se";
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
