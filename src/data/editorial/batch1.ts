import type { EditorialPreview } from "./model";

const UPDATED_SOURCES = "Sources for this preview";

/**
 * English homepage and English-only country hubs.
 * Later batches add the other languages and the dated election pages.
 */
export const BATCH1: EditorialPreview[] = [
  {
    path: "/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: UPDATED_SOURCES,
    paragraphs: [
      "What is at stake on this homepage is a map of offices, not a verdict. Map the General is an unofficial, independent guide to elections in the countries it covers. It is not an election authority, it is not affiliated with a government or a party, and it does not tell a reader how to vote. Each country card opens that country’s guide. The list of upcoming and recent elections opens the page for that vote. A polling day stays on the list when it falls inside 60 days, or for 14 days after the vote, and the New South Wales state election of 13 March 2027 is listed early because the page for it is already published. The United States midterm pages are on the sibling site Map the Midterms, not here.",
      "How these pages are made is the same on every country. A sentence is printed when an official page printed it, and the guide names the date that page was read. A figure, a date, or a name that was not on a source read for this release is left out rather than guessed. Search runs in the browser against a file shipped with the site. There are no accounts. Where a country has municipality pages, those documents are separate and do not carry this preview. Ireland, Norway, Sweden, Brazil, Serbia and Israel are national hubs. They do not have a municipality layer in this release.",
      "The history of the release starts with Spain. Royal Decree 806/2026, of 5 October, dissolves the Congress of Deputies and the Senate and calls a general election for Sunday 29 November 2026. Article 162 of the electoral law sets 350 deputies, and the decree’s annex allocates that number. The decree’s article 3.2, citing article 165, elects four senators in each provincial constituency, with the island constituencies and Ceuta and Melilla on the terms the decree prints. Other countries were added from official pages read in October 2026. Past results appear only where an official count was read. A page that says a count was not copied means that gap is intentional.",
      "Parties are treated the same way on every hub. A party’s programme is the text that party publishes. This homepage does not rewrite a programme, does not rank a list, and does not copy a slate. Where an official register or an official count names a party and a seat total, that naming stays on the country page that read it. The public record of a party, for these pages, is that official name and that official total, not a paraphrase of a manifesto. Readers who want a party’s own statement should use the party’s site or the parliamentary page linked from the country guide.",
      "This site prints no voting-intention figure and no exit sample, in any country and on any day. It publishes no seat forecast from a survey. The Israel results pages, after polls close, may show an unofficial seat allocation calculated from partial official vote totals, labelled as not final and not an official seat allocation. That rule is stricter than a single blackout. The election-law table still records the dated windows the editors follow: Israel until the polls close on 27 October 2026, Italy from 31 October 2026 for the Chieti by-election, Spain’s five-day rule before 29 November 2026, and the other rows in that table. When a rule is doubtful, the page still prints no such figure. The about page states the editorial method. A correction goes through the contact page. Who operates the site is stated only on the legal notice.",
    ],
    citations: [
      { label: "Real Decreto 806/2026 (BOE-A-2026-20742)", href: "https://www.boe.es/eli/es/rd/2026/10/05/806" },
      {
        label: "Junta Electoral Central, Ley Orgánica del Régimen Electoral General, articles 161 to 166",
        href: "https://www.juntaelectoralcentral.es/cs/jec/loreg/contenido?idContenido=2741281&idLeyJunta=1&idLeyModificacion=2740214&p=1379061423059&paux=1379061423059&template=Loreg%2FJEC_Contenido",
      },
    ],
  },
  {
    path: "/au/en/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: UPDATED_SOURCES,
    paragraphs: [
      "What is at stake in Australia, on the pages read for this hub, is more than one office. The Australian Electoral Commission’s release of 23 July 2026 says the next federal election is due between August 2027 and May 2028. No writ read on 17 October 2026 names that polling day. Before then, two state general elections already have dates the commissions print: Victoria on Saturday 28 November 2026, for the 61st Parliament, and New South Wales on Saturday 13 March 2027, for the 59th Parliament. A state election chooses that state’s assembly, and in both of these cases a portion of the upper house as well. It does not choose the federal House.",
      "How the federal system works, in the Commission’s timetable, is that a full federal election is held about once every three years on a date set by the Governor-General on the request of the Government. The Commission says it does not set that date. The timetable says the House of Representatives expires three years after its first meeting and can be dissolved earlier, citing section 28 of the Constitution. The 23 July 2026 release says the first sitting of the 48th Parliament was Tuesday 22 July 2025. This hub does not turn that sitting day into an expiry date or a polling day. The same release says the House stays at 150 seats.",
      "The history this hub prints is the official count already held, not a guess about the next one. The last federal election page on the Commission’s site is Saturday 3 May 2025, with results at the return of the writs on 12 June 2025. The tally room’s final House table, read for this release, records the Australian Labor Party on 94 seats, previously 77; the Liberal/National Coalition on 43 seats, previously 58; the Greens on 1 seat, previously 4; Centre Alliance on 1; Katter’s Australian Party on 1; and independents on 10, previously 10. Those are House seats after that election. They are not a forecast, and they are not the state chambers.",
      "Victoria’s own history, on the Victorian Electoral Commission’s report to Parliament, is a general election on 26 November 2022 and a supplementary election for Narracan District on 28 January 2023. The Commission says state elections are held on the last Saturday in November every four years. The Legislative Assembly has 88 members, one for each district, and the Legislative Council has 40 members, five for each of eight regions. New South Wales, on the NSW Electoral Commission’s 2027 page, is divided into 93 districts. Voters in each district elect one Legislative Assembly member, and voters also elect 21 of the 42 Legislative Council members. The Commission’s virtual tally room for the previous state election is headed Saturday 25 March 2023. This hub does not copy a seat table from that tally room.",
      "The parties named above are the parties and groupings the official tables print. A programme is the text a party publishes itself. This preview does not rewrite one, does not say which party should form a government, and does not name a Premier, because the Premier’s name was not on the pages read. Candidate lists for 28 November 2026 and 13 March 2027 were not on the pages read on 27 October 2026, so none is invented here. The Australian Communications and Media Authority describes a television and radio blackout that does not cover this website. Even so, this site prints no voting-intention figure for Australia. Confirm any enrolment or date with the commission linked below.",
    ],
    citations: [
      { label: "Australian Electoral Commission, entitlement determination, 23 July 2026", href: "https://www.aec.gov.au/media/2026/07-23.htm" },
      { label: "Australian Electoral Commission, 2025 federal election", href: "https://www.aec.gov.au/Elections/federal_elections/2025/" },
      { label: "AEC tally room, House of Representatives, 2025", href: "https://results.aec.gov.au/31496/Website/HouseDefault-31496.htm" },
      { label: "Victorian Electoral Commission, state elections", href: "https://www.vec.vic.gov.au/voting/types-of-elections/state-elections" },
      { label: "NSW Electoral Commission, 2027 state election", href: "https://elections.nsw.gov.au/elections/state-elections/2027-nsw-state-election" },
    ],
  },
  {
    path: "/br/en/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: UPDATED_SOURCES,
    paragraphs: [
      "What was at stake in Brazil’s 2026 general election, on the Tribunal Superior Eleitoral results service, was a set of offices in two rounds. The first round was on 4 October 2026 and included President, Governor, Senator, and federal and state deputies. The national second round, on 25 October 2026, was for President. This hub covers the presidential race only. State races are not repeated here. The election has been held. The figures below are the official count, not a projection and not a sample of voters.",
      "How the presidential vote works, as the TSE files record it, is that a candidate needs more than half of the valid votes to be elected in the first round. In the first-round national file, no presidential candidate passed that line, and the two leading candidates are marked for a runoff. The second round is between those two. The second-round national file was generated by the TSE at 23:26 Brasília time on 25 October 2026, with 100 percent of 499,248 polling sections counted. Percentages below are of valid votes, which is how that file presents them. This site does not use a press tally.",
      "The second-round result in that file is Luiz Inácio Lula da Silva with 64,256,232 votes, 51.79 percent of valid votes, marked elected by the TSE, and Flávio Bolsonaro with 59,826,041 votes, 48.21 percent. The same file records an electorate of 158,745,502, votes cast of 128,236,074 (80.78 percent), abstentions of 30,509,005, valid votes of 124,082,273, and blank votes of 1,430,496. Those are the TSE’s figures. This page does not add a winner’s speech or a reading of what the result means for a programme.",
      "The first round, in the TSE national file, records votes cast of 125,275,835 (78.92 percent) and valid votes of 119,300,788. Among candidates above 2 percent of valid votes, the file shows Flávio Bolsonaro at 47.03 percent (56,104,503 votes), Luiz Inácio Lula da Silva at 45.16 percent (53,879,538 votes), Augusto Cury at 2.89 percent, Renan Santos at 2.24 percent, and Ronaldo Caiado at 2.18 percent. Other candidates were under 2 percent each and remain in the TSE file. Vote totals for those three smaller shares were not copied onto this hub.",
      "The public record of the contenders is the names and totals the TSE printed. A party programme is that party’s own text. This preview does not attach a programme to a candidate, does not describe a coalition’s platform, and does not rank anyone beyond the order of the official count. The TSE is the source for a correction of a figure. This site publishes no voting-intention figure for a later election and no running commentary on the count. Municipality pages are not part of this hub.",
    ],
    citations: [
      { label: "Tribunal Superior Eleitoral, official results service", href: "https://resultados.tse.jus.br/oficial/app/index.html" },
      {
        label: "TSE, second-round national file, generated 25 October 2026",
        href: "https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-c0001-e006258-u.json",
      },
      {
        label: "TSE, first-round national file",
        href: "https://resultados.tse.jus.br/oficial/ele2026/6257/dados/br/br-c0001-e006257-u.json",
      },
    ],
  },
  {
    path: "/gb/en/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: UPDATED_SOURCES,
    paragraphs: [
      "What is at stake in the United Kingdom, on the pages this hub uses, is the House of Commons at the next general election, and the devolved and local offices the commissions describe on their own pages. The Electoral Commission’s schedule says the next general election is no later than 15 August 2029. It does not name a polling day. This preview does not invent one. GOV.UK says a voter cannot vote online in any election. For some elections in England, Scotland and Wales, photo identification is required in person. Northern Ireland’s rules differ. Those are administrative facts, not advice on whom to support.",
      "How a general election works, in the Commission’s account of the system, is a vote for a Member of Parliament in a constituency. The House of Commons has 650 seats in the Members API total read on 17 October 2026. Section 66A of the Representation of the People Act 1983 limits publication, before the close of the poll, of how people said they had voted. This site publishes no such report and no United Kingdom tracker. The population figure this hub uses is the Office for National Statistics mid-2024 total of 69,281,400, an increase the bulletin describes from the year before. Population is not a seat count.",
      "The history printed here is the UK Parliament results page for 4 July 2024. That page’s list of parties with constituencies won, which it says does not include independents or the Speaker, records Labour 411, Conservative 121, Liberal Democrat 72, Scottish National Party 9, Sinn Féin 7, Reform UK 5, Democratic Unionist Party 5, Green Party 4, Plaid Cymru 4, Social Democratic and Labour Party 2, Alliance 1, Ulster Unionist Party 1, and Traditional Unionist Voice 1. Those won-constituencies sum to 643, not 650. This hub does not fill the difference. The same page records an electorate of 48,224,212, valid votes of 28,809,340, and invalid votes of 116,253. Vote shares on that page are official results of that election. They are not reprinted in this preview.",
      "A later public record is the House of Commons Members API, counted on 17 October 2026 from latestParty.name. The API totalResults figure was 650. The count was Labour 361, Conservative 118, Liberal Democrat 71, Labour (Co-op) 43, Independent 11, Reform UK 8, Scottish National Party 8, Sinn Féin 7, Green Party 5, Democratic Unionist Party 5, Plaid Cymru 4, Your Party 2, Social Democratic and Labour Party 2, Traditional Unionist Voice 1, Alliance 1, Speaker 1, Restore Britain 1, and Ulster Unionist Party 1. Labour and Labour (Co-op) are not added together. The difference from July 2024 is a change in who sits, as the API reported it. It is not a new general election.",
      "Those names are the parties the official pages print. A manifesto is the party’s own document. This preview does not summarise one, does not say what a party intends in the next Parliament, and does not endorse a whip. Sinn Féin’s seats are in the results and in the API; this page does not describe that party’s approach to taking seats, because that approach was not the text being copied. Readers who want a party’s stated programme should read the party. Readers who want the count should read the Parliament pages linked below. This site will not call a future election before the official return.",
    ],
    citations: [
      { label: "UK Parliament, results of the 4 July 2024 general election", href: "https://electionresults.parliament.uk/general-elections/6" },
      {
        label: "UK Parliament Members API, current House of Commons",
        href: "https://members-api.parliament.uk/api/Members/Search?House=1&IsCurrentMember=true",
      },
      { label: "Representation of the People Act 1983, section 66A", href: "https://www.legislation.gov.uk/ukpga/1983/2/section/66A" },
      {
        label: "Dissolution and Calling of Parliament Act 2022, section 4",
        href: "https://www.legislation.gov.uk/ukpga/2022/11/section/4",
      },
      {
        label: "Electoral Commission, scheduled elections in the corporate plan",
        href: "https://www.electoralcommission.org.uk/about-us/our-plans-priorities-and-spending/corporate-plan-2025/6-2029/30/electoral-system",
      },
      { label: "GOV.UK, How to vote", href: "https://www.gov.uk/how-to-vote" },
    ],
  },
];
