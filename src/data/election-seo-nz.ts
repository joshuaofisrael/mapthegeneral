/**
 * New Zealand general election, 7 November 2026.
 * Facts are limited to the Election Service Plan and the Electoral Act
 * read on 27 October 2026. No party names and no survey figures.
 */
import type { ElectionSeoProfile } from "./election-seo";

const PLAN = "https://elections.nz/assets/2026-General-Election/EC0131_Election_Service_Plan_A4.pdf";
const ACT = "https://www.legislation.govt.nz/act/public/1993/87/en/latest/";
const RESULTS = "https://electionresults.govt.nz/";
const VOTE = "https://vote.nz/";
const LISTS = "https://elections.nz/media-and-news/2026/candidate-and-party-lists-released";
const PDF = "https://vote.nz/assets/pagecomponent-file-files/Party-lists-for-the-2026-General-Election.pdf";
const BOOK = "https://elections.nz/assets/Handbooks/Candidate-Handbook-2026-General-Election.pdf";
const DATES = "https://elections.nz/media-and-news/2026/key-dates-for-2026-general-election";
const PATH = "/nz/en/elections/general-2026/";
const OPENS = "2026-11-07T19:00:00+13:00";

function night(copy: {
  countdown: string;
  countdownNote: string;
  units: string[];
  awaiting: string;
  fallback: string;
  preliminary: string;
  finalLabel: string;
  updated: string;
  fetched: string;
  source: string;
  name: string;
  votes: string;
  share: string;
  officialLabel: string;
}): string {
  const config = {
    id: "nz-2026-11-07",
    opens: OPENS,
    feed: "/live/nz-2026-11-07.json",
    official: RESULTS,
    timeZone: "Pacific/Auckland",
    ...copy,
  };
  const json = JSON.stringify(config).replace(/</g, "\\u003c");
  return `<script type="application/json" id="night-config">${json}</script>
<div id="night-board"><p><a href="${RESULTS}">electionresults.govt.nz</a></p></div>
<script src="/live/night.js" defer></script>`;
}

const NIGHT = night({
  countdown: "The close of voting is in",
  countdownNote:
    "Until 7:00 pm New Zealand daylight time on 7 November 2026 this page shows no vote count. After that it reads only a same-origin file filled from the results service named in the Election Service Plan.",
  units: ["days", "hours", "min", "sec"],
  awaiting: "The opening time has passed. The file still has no Commission rows. This page tries again on its own.",
  fallback: "The results file did not load. The count is on the results service named by the Electoral Commission.",
  preliminary: "Preliminary official count",
  finalLabel: "Official results",
  updated: "Updated",
  fetched: "Fetched",
  source: "Source: Electoral Commission results service. Not a forecast.",
  name: "Party or candidate",
  votes: "Votes",
  share: "Share",
  officialLabel: "electionresults.govt.nz",
});

const BODY = `<h2>What is being elected</h2>
<p>The <a href="${PLAN}">Election Service Plan</a> and the <a href="${DATES}">key-dates release</a> say the 2026 General Election will be held on Saturday 7 November. The <a href="${BOOK}">Candidate Handbook</a> titles it Te Pōtitanga ā-Motu 2026 and names the publisher Electoral Commission Te Kaitiaki Take Kōwhiri. It is a parliamentary general election under the Electoral Act 1993. This page does not describe how a party vote or an electorate vote should be cast.</p>
<h2>How to vote</h2>
<p>The plan says voting on election day, Saturday 7 November, is from 9am to 7pm, including telephone dictation voting. It says more than 2,300 voting places will be open that day. Advance voting is from Monday 26 October until Friday 6 November, and the days and hours of those places vary. Locations are at <a href="${VOTE}">vote.nz</a> or on the freephone 0800 36 76 56. Those opening hours were not copied, because the plan does not print one set of advance hours.</p>
<p>The plan says overseas voting runs from Wednesday 21 October until 7pm on Saturday 7 November, New Zealand time, for voters enrolled by midnight on Sunday 25 October, New Zealand time. That enrolment time has passed. This page does not say a person can still enrol.</p>
<p>The plan says a Whare pōti Māori provides voting services in te reo Māori and English, and that anyone can vote at one. The Māori Electoral Option is the choice of the Māori roll or the general roll. The plan says the Commission will produce material in English, te reo Māori, and 29 other languages. No te reo page was opened on 27 October 2026, so this page is not a translation.</p>
<h2>Parties seeking the party vote</h2>
<p>The <a href="${LISTS}">9 October 2026 release</a> lists 17 registered parties seeking the party vote, in alphabetical order. Each name links to the <a href="${PDF}">party-list file</a>, which prints list candidates in list order. Electorate candidates are on <a href="${VOTE}">vote.nz</a> by electorate. The handbook says electorate names are alphabetical by surname on the right-hand side of the ballot paper, and that parties contesting only the party vote are listed alphabetically on the left after the parties that also contest an electorate. This page does not rebuild that paper and does not say which name to mark.</p>
<p><a href="${ACT}">Section 197(1)(g)</a> bars publishing a party name on polling day before the close of the poll. Section 197(2A) is a defence when the name was placed on a website before polling day, the site is not pushed that day to people who did not choose to open it, and the site is not advertised that day. These names were placed on 27 October 2026.</p>
{{candidates}}
<h2>Earlier official results</h2>
<p>The results index, read on 27 October 2026, lists general elections on 14 October 2023, 17 October 2020, 23 September 2017, 20 September 2014, 26 November 2011 and 8 November 2008. Those totals are not copied here. <a href="${RESULTS}">electionresults.govt.nz</a>. The key-dates release says official results of this election are declared on 27 November 2026.</p>
<h2>Election night</h2>
<p>No count is shown here before 7:00 pm New Zealand daylight time on 7 November 2026. The plan says preliminary results are released progressively from 7pm that day on electionresults.govt.nz. After that hour this page reads only a same-origin file. If the file is missing, the link is that service. This page has no forecast.</p>
${NIGHT}`;

export const NZ_ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "nz-2026-11-07",
    pollingDay: "2026-11-07",
    startDate: "2026-11-07T09:00:00+13:00",
    endDate: OPENS,
    organizerName: "Electoral Commission",
    organizerUrl: "https://elections.nz/",
    lastmod: "2026-10-27",
    candidateListId: "nz-general-2026",
    homeLinks: [
      {
        href: PATH,
        label: "New Zealand general election, 7 November 2026",
        detail:
          "Saturday 7 November 2026, voting places 9am to 7pm New Zealand time. Parties seeking the party vote are the Commission’s 9 October alphabetical list. No count on this page before 7:00 pm.",
      },
    ],
    pages: [
      {
        lang: "en",
        htmlLang: "en",
        path: PATH,
        title: "New Zealand general election, 7 November 2026 — Te Pōtitanga ā-Motu",
        description:
          "Te Pōtitanga ā-Motu, the New Zealand general election, is on Saturday 7 November 2026. Voting places 9am to 7pm. No count before 7:00 pm. Unofficial information.",
        ogDescription:
          "New Zealand general election on Saturday 7 November 2026. Electoral Commission. No count before 7:00 pm. Unofficial information.",
        ogLocale: "en_NZ",
        alternates: [
          { hreflang: "en", path: PATH },
          { hreflang: "x-default", path: PATH },
        ],
        crumbs: [
          { name: "Home", path: "/" },
          { name: "New Zealand", path: "/nz/" },
          { name: "New Zealand", path: "/nz/en/" },
          { name: "7 November 2026", path: PATH },
        ],
        eyebrow: "7 November 2026",
        h1: "General election — Te Pōtitanga ā-Motu 2026",
        lede: "Saturday 7 November 2026. The Election Service Plan says voting places are open from 9am to 7pm. The Candidate Handbook’s title is Te Pōtitanga ā-Motu 2026.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: "https://elections.nz/",
        bannerBefore: "Unofficial information. Confirm with the ",
        bannerAfter: "Electoral Commission",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/nz/en/", label: "New Zealand" },
        ],
        eventName: "New Zealand general election, 7 November 2026",
        locationName: "New Zealand",
        addressRegion: "New Zealand",
        addressCountry: "NZ",
        keyDatesHeading: "How to vote, key times and official sources",
        keyDatesIntro: "Each line below is from a page read on 27 October 2026. A time those pages did not print is not added.",
        keyDates: [
          {
            label: "Date",
            text: "The Election Service Plan says the 2026 General Election is on Saturday 7 November 2026.",
            links: [{ label: "Election Service Plan", href: PLAN }],
          },
          {
            label: "Hours",
            text: "The plan’s election-day section says voting places are open from 9am to 7pm, including telephone dictation voting.",
            links: [{ label: "The plan’s election-day section", href: PLAN }],
          },
          {
            label: "Advance",
            text: "The plan’s advance-voting section says advance voting runs from Monday 26 October until Friday 6 November, and that the days and hours vary.",
            links: [{ label: "The plan’s advance-voting section", href: PLAN }],
          },
          {
            label: "Polling day",
            text: "Electoral Act 1993, section 197 bars a public opinion poll on polling day before the close of the poll, and bars publishing a party name then. This page prints neither.",
            links: [{ label: "Electoral Act 1993, section 197", href: ACT }],
          },
          {
            label: "Results",
            text: "The plan’s results line says preliminary results are released progressively from 7pm on 7 November 2026 at electionresults.govt.nz.",
            links: [{ label: "The plan’s results line", href: PLAN }],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When is the general election?",
            text: "The Election Service Plan for 2026 says Saturday 7 November 2026.",
            links: [{ label: "Election Service Plan for 2026", href: PLAN }],
          },
          {
            question: "What are the voting hours?",
            text: "The election-day part of the plan says 9am to 7pm on Saturday 7 November. Advance hours are not one national set.",
            links: [{ label: "The election-day part of the plan", href: PLAN }],
          },
          {
            question: "Where are the candidates?",
            text: "The 9 October 2026 release lists the registered parties seeking the party vote, in alphabetical order, and each name links to the party-list file. That file is the list order of list candidates. Electorate candidates are on vote.nz by electorate. Section 197(2A) is why names placed on this page on 27 October 2026 may remain on polling day if the site is not pushed or advertised that day. This page does not say which name to mark.",
            links: [
              { label: "The 9 October 2026 release", href: LISTS },
              { label: "the party-list file", href: PDF },
            ],
          },
          {
            question: "Does this page print surveys?",
            text: "No. Section 197(1)(d) and (e) bars those polls before the close of the poll. This page prints no such figures on any day.",
            links: [{ label: "Section 197(1)(d) and (e)", href: ACT }],
          },
          {
            question: "When does the vote count appear?",
            text: "Not before 7:00 pm New Zealand daylight time on 7 November 2026, and only from the results service the plan names.",
            links: [{ label: "the results service the plan names", href: RESULTS }],
          },
        ],
        relatedHeading: "Also",
        related: [
          { href: "/nz/en/", label: "New Zealand" },
          { href: "/nz/", label: "New Zealand hub" },
        ],
        bodyHtml: BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: PLAN, label: "Electoral Commission, Election Service Plan, 2026 General Election", readOn: "2026-10-27" },
          { href: ACT, label: "Electoral Act 1993, latest consolidation, sections 3A and 197", readOn: "2026-10-27" },
          {
            href: "https://www.legislation.govt.nz/act/public/1993/87/en/2026-01-01.pdf",
            label: "Electoral Act 1993, reprint as at 1 January 2026",
            readOn: "2026-10-27",
          },
          { href: LISTS, label: "Electoral Commission, candidate and party lists released, 9 October 2026", readOn: "2026-10-27" },
          { href: PDF, label: "Chief Electoral Officer, party lists for the 2026 General Election", readOn: "2026-10-27" },
          { href: BOOK, label: "Candidate Handbook, 2026 General Election, December 2025", readOn: "2026-10-27" },
          { href: DATES, label: "Electoral Commission, key dates for the 2026 General Election", readOn: "2026-10-27" },
          { href: RESULTS, label: "electionresults.govt.nz, index of general elections", readOn: "2026-10-27" },
        ],
      },
    ],
  },
];
