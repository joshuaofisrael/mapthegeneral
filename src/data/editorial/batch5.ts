import type { EditorialPreview } from "./model";

const S = "Sources for this preview";
const PLAN = "https://elections.nz/assets/2026-General-Election/EC0131_Election_Service_Plan_A4.pdf";
const DATES = "https://elections.nz/media-and-news/2026/key-dates-for-2026-general-election";
const LISTS = "https://elections.nz/media-and-news/2026/candidate-and-party-lists-released";
const PDF = "https://vote.nz/assets/pagecomponent-file-files/Party-lists-for-the-2026-General-Election.pdf";
const XLSX = "https://elections.nz/assets/pagecomponent-file-files/Electorate-Candidates-2026.xlsx";
const ACT = "https://www.legislation.govt.nz/act/public/1993/87/en/latest/";
const RESULTS = "https://www.electionresults.govt.nz/";
const BOOK = "https://elections.nz/assets/Handbooks/Candidate-Handbook-2026-General-Election.pdf";

export const BATCH5: EditorialPreview[] = [
  {
    path: "/nz/en/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: S,
    paragraphs: [
      "What is being elected in New Zealand is a new House of Representatives. The Electoral Commission’s Election Service Plan, and the key-dates release that followed the Prime Minister’s announcement, both say the general election is on Saturday 7 November 2026. The Candidate Handbook, published in December 2025, titles that election Te Pōtitanga ā-Motu 2026 and names the publisher Electoral Commission Te Kaitiaki Take Kōwhiri. This hub uses that title. It is not a te reo Māori translation of the guide. The plan says the Commission produces enrolling and voting material in English, te reo Māori, and other languages, and that a Whare pōti Māori offers voting services in te reo Māori and English. Anyone may vote at one. The Māori Electoral Option is the choice of the Māori roll or the general roll.",
      "How the day runs, in the plan, is voting places open from 9am to 7pm on 7 November, including telephone dictation voting. Advance voting runs from Monday 26 October until Friday 6 November, and the days and hours of those places vary, so this hub does not invent one national set of advance hours. Overseas voting, in the same plan, runs from 21 October until 7pm on election day, New Zealand time, for voters enrolled by midnight on 25 October, New Zealand time. That enrolment time has passed. This hub does not say a person can still enrol. Locations are on vote.nz or the freephone printed in the plan.",
      "Who is seeking the party vote is a list of seventeen registered parties, in the alphabetical order of the Commission’s 9 October 2026 release. The election page links each name to the Chief Electoral Officer’s party-list file. That file, not this hub, prints the list candidates in list order. Electorate candidates are the rows of the Commission’s Electorate Candidates 2026 spreadsheet, and the election page lists every row. The handbook says their names are alphabetical by surname on the right-hand side of the ballot paper, and that parties contesting only the party vote are listed alphabetically on the left after the parties that also contest an electorate. This hub does not rebuild that paper and does not say which name to mark.",
      "The history this hub will state as dates, and not as a copied count, is on the results index read on 27 October 2026: 14 October 2023, 17 October 2020, 23 September 2017, 20 September 2014, 26 November 2011 and 8 November 2008. Those archive totals were not opened row by row, so they are not reprinted. The plan says preliminary results of this election are released progressively from 7pm on 7 November at electionresults.govt.nz, and the key-dates release says official results are declared on 27 November. No count is shown here before 7pm New Zealand daylight time on election day.",
      "Section 197 of the Electoral Act bars a public-opinion inquiry of people who have voted, and a public-opinion inquiry on polling day, before the close of the poll. It also bars publishing a party name on polling day before the close, with a defence in subsection 2A when the name was placed on a website before polling day, the site is not pushed that day to people who did not choose to open it, and the site is not advertised that day. The party names were placed on 27 October 2026 and the electorate candidate names on 28 October 2026. This site prints no survey figure on any day and no forecast. A correction of a date, an hour, or a name should be checked against the Commission.",
    ],
    citations: [
      { label: "Electoral Commission, Election Service Plan", href: PLAN },
      { label: "Electoral Commission, key dates, 21 January 2026", href: DATES },
      { label: "Electoral Commission, candidate and party lists, 9 October 2026", href: LISTS },
      { label: "Candidate Handbook, 2026 General Election", href: BOOK },
      { label: "electionresults.govt.nz", href: RESULTS },
    ],
  },
  {
    path: "/nz/en/elections/general-election/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: S,
    paragraphs: [
      "What is being voted on Saturday 7 November 2026 is a parliamentary general election. The Election Service Plan and the key-dates release agree on that Saturday. Voting places are open from 9am to 7pm, including telephone dictation. Advance voting is from 26 October to 6 November, with hours that vary by place. Overseas voting runs until 7pm New Zealand time on election day for people enrolled by midnight on 25 October. This page does not extend that enrolment deadline and does not describe the marks a voter makes on the paper. The handbook is the place for the layout of the two sides of the ballot.",
      "The Commission’s 9 October 2026 release says seventeen registered parties lodged a party list and are seeking the party vote, and it prints them in alphabetical order. This page repeats that order and links every name to the party-list file authorised by the Chief Electoral Officer. List seats, the file says, are filled from that list after any list candidate who has won an electorate seat is removed. Candidates who stand in an electorate are in the Commission’s Electorate Candidates 2026 spreadsheet, and this page lists every row in that file’s order within each electorate. The handbook’s ballot-paper order is alphabetical by surname. The spreadsheet follows that order, with Mc sorted as Mac. This page does not pretend either file is a photograph of the paper.",
      "The Māori title on this page is the handbook’s title, Te Pōtitanga ā-Motu 2026. The same page names the Commission Te Kaitiaki Take Kōwhiri. The plan’s phrase for a voting place that works in te reo Māori and English is Whare pōti Māori. Those are the phrases that were read. They are not a translation of this guide, and no hreflang is offered for a Māori page that was not written. Readers who want the Commission’s own te reo material should open elections.nz and vote.nz.",
      "Earlier general elections stay on the results index as dates: 14 October 2023, 17 October 2020, 23 September 2017, 20 September 2014, 26 November 2011 and 8 November 2008. Their totals are not on this page. A past share is not a guide to November. Preliminary results of this election, the plan says, come out progressively from 7pm on 7 November. Official results, the key-dates release says, are declared on 27 November. The results section here stays empty of counts until that 7pm opening, and then only from the Commission’s results service. There is no forecast beside it.",
      "The election-day rule this page follows is section 197. It bars the inquiries described there, before the close of the poll, and it bars a party name published on polling day, subject to the website defence in subsection 2A. The party names were placed here on 27 October 2026 and the electorate candidate names on 28 October 2026. The page does not tell a reader which party or candidate to support, and it does not rank the names. Promoting this site on polling day would sit outside that defence, so the names are here for people who open the page themselves. A wrong name or a wrong hour should be checked against the release, the spreadsheet, and the plan.",
    ],
    citations: [
      { label: "Electoral Commission, key dates, 21 January 2026", href: DATES },
      { label: "Electoral Commission, candidate and party lists, 9 October 2026", href: LISTS },
      { label: "Chief Electoral Officer, party lists for 2026", href: PDF },
      { label: "Electoral Commission, Electorate Candidates 2026", href: XLSX },
      { label: "Candidate Handbook, 2026 General Election", href: BOOK },
      { label: "Electoral Act 1993", href: ACT },
      { label: "electionresults.govt.nz", href: RESULTS },
    ],
  },
];
