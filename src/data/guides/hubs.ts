import type { Guide } from "./copy";

function t(text: string, href?: string) {
  return href ? { text, href } : { text };
}

const IE_HOW = "https://www.electoralcommission.ie/how-to-vote/";
const IE_GE = "https://www.electoralcommission.ie/general-elections/";
const IE_ELIG = "https://www.electoralcommission.ie/voter-eligibility/";
const IE_REG = "https://www.electoralcommission.ie/register-to-vote/";
const IE_ACCESS = "https://www.electoralcommission.ie/accessible-voting/";
const IE_ADS = "https://www.electoralcommission.ie/regulation-of-political-advertising/";
const IE_MOR = "https://www.electoralcommission.ie/latest-news-and-research/election-broadcast-moratorium-removal-welcomed/";
const VOTER = "https://www.voter.ie/";

const NO_STORTING = "https://www.valg.no/om-valg/valgene-i-norge/stortingsvalg/";
const NO_LAW = "https://valgmedarbeiderportalen.valg.no/artikler/regelverksendringer-ny-valglov";

const SE_NEXT = "https://val.se/english/future-elections/2026-elections---the-riksdag-and-regional-and-municipal-councils";
const SE_VOTE = "https://val.se/english/the-swedish-electoral-system/the-right-to-vote-and-voting-cards";
const SE_SEATS = "https://val.se/english/the-swedish-electoral-system/distribution-of-seats";
const SE_2026 = "https://www.val.se/download/18.7faaad3f1a0b0c300e4282/1789822515986/beslutsprotokoll-resultat-riksdagen-2026.pdf";

export const ieEn: Guide = {
  kicker: "Practical guide",
  title: "How elections in Ireland work",
  intro:
    "This section is drawn from Electoral Commission pages read on 23 October 2026. It describes those pages. It is not a direction to vote in any way, and it does not name candidates.",
  blocks: [
    {
      heading: "Levels of government",
      paragraphs: [
        [
          t("The Commission’s "),
          t("how-to-vote page", IE_HOW),
          t(" says proportional representation with the single transferable vote is used for general elections, local elections, European elections, presidential elections and mayoral elections. The same page says a referendum does not use that system."),
        ],
        [
          t("The "),
          t("voter-eligibility page", IE_ELIG),
          t(" describes a separate, limited electorate for Seanad elections: graduates of named universities, members of the Dáil, outgoing members of the Seanad, and members of a county or city council. This site does not list those people."),
        ],
      ],
    },
    {
      heading: "Who can vote in a Dáil election",
      paragraphs: [
        [
          t("The "),
          t("general-elections page", IE_GE),
          t(" says a voter must be an Irish or British citizen, resident in Ireland, aged 18 or over on election day, and registered to vote. The "),
          t("eligibility page", IE_ELIG),
          t(" states the same three conditions for a general election."),
        ],
        [
          t("The eligibility page gives different franchises for local elections, European Parliament elections, referendums and presidential elections. Those pages should be read for the election in question. This guide does not merge them into one rule."),
        ],
      ],
    },
    {
      heading: "Registration",
      paragraphs: [
        [
          t("The Commission says the register can be checked or updated at "),
          t("voter.ie", VOTER),
          t(", or by asking the local authority. The "),
          t("accessible-voting page", IE_ACCESS),
          t(" says the Electoral Reform Act 2022 introduced a rolling register, so details can be updated through the year except in the immediate run-up to an electoral event. A cutoff counted in days was not copied, because a page stating that number was not read for this release."),
        ],
      ],
    },
    {
      heading: "How to vote",
      paragraphs: [
        [
          t("The how-to-vote page says the voter marks 1, then 2, 3 and so on, for as many or as few candidates as they wish, and that the first preference has to be 1 or the ballot is not counted. It says the ballot lists names in alphabetical order, with party emblems and photographs. This site does not reproduce those names or photographs."),
        ],
        [
          t("The general-elections page says a polling information card is sent to the registered address and is not required at the station. It says the voter should bring identification, and it gives examples: a passport, a driving licence, a public services card, or an employee or student identity card with a photograph. It also says other forms are acceptable and points to a full list."),
        ],
        [
          t("The "),
          t("register-to-vote page", IE_REG),
          t(" lists postal voting for members of An Garda Síochána, members of the Defence Forces, Irish diplomats serving abroad and their spouses or partners, people who cannot vote in person because of illness or disability, electors whose occupation is likely to keep them from the station, full-time students registered at home and living elsewhere in the State, anonymous electors and members of a household whose safety would be at risk if the register published the address, and prisoners. The accessible-voting page says a Dáil postal application must be received two days after dissolution. It also describes a special voters’ list for voting in a hospital or nursing home."),
        ],
      ],
    },
  ],
  electionsHeading: "Elections",
  elections: [
    {
      name: "Next Dáil general election",
      detail:
        "No polling day was printed on the pages read. The general-elections page says a general election has to take place at least every five years, and that after the Dáil is dissolved an election has to be held within 30 days.",
      href: "/ie/en/elections/next-dail/",
    },
    {
      name: "Most recent Dáil general election",
      detail: "Friday 29 November 2024, as the general-elections page states. This site does not republish the count.",
    },
  ],
  glossaryHeading: "Glossary",
  glossary: [
    { term: "Dáil", text: "The lower house. A general election chooses its members, called TDs on the Commission’s page." },
    { term: "PR-STV", text: "Proportional representation with the single transferable vote, the system the how-to-vote page describes for the elections listed above." },
    { term: "Register of Electors", text: "The list a person must be on before they can vote. The Commission points to voter.ie." },
    { term: "Polling Day Order", text: "The general-elections page says the Minister for Housing, Local Government and Heritage sets this order. It sets the date and the opening hours." },
  ],
  faqHeading: "Questions",
  faq: [
    {
      q: "Does this site name candidates or show their photographs?",
      a: "No. The how-to-vote page says the official ballot does. These pages do not copy that.",
    },
    {
      q: "Does this site publish opinion polls or a live count?",
      a: "No.",
    },
    {
      q: "Is there a broadcast moratorium on this website?",
      a: "The Commission’s news item of 1 November 2024 says the broadcast moratorium was removed ahead of that year’s general election. The item is about radio and television. Current broadcaster guidelines were not re-read. This site is not a broadcaster.",
    },
  ],
  sourcesHeading: "Official pages",
  sources: [
    { label: "Electoral Commission, how to vote", href: IE_HOW },
    { label: "Electoral Commission, general elections", href: IE_GE },
    { label: "Electoral Commission, voter eligibility", href: IE_ELIG },
    { label: "Electoral Commission, register to vote", href: IE_REG },
    { label: "Electoral Commission, accessible voting", href: IE_ACCESS },
    { label: "Electoral Commission, political advertising", href: IE_ADS },
    { label: "Electoral Commission, broadcast moratorium news item, 1 November 2024", href: IE_MOR },
    { label: "voter.ie", href: VOTER },
  ],
};

export const noEn: Guide = {
  kicker: "Practical guide",
  title: "How a Storting election works",
  intro:
    "This section is drawn from the Valgdirektoratet page “Stortingsval”, published 21 May 2026, and from the Directorate’s note on the new election act. The Storting page says the next election is in September 2029. The same page still describes a voting calendar that names 2025. Those 2025 dates are not repeated here as the 2029 timetable.",
  blocks: [
    {
      heading: "Levels and the voting system",
      paragraphs: [
        [
          t("The "),
          t("Storting page", NO_STORTING),
          t(" says 169 representatives are elected: 150 district seats across 19 constituencies, and 19 adjustment seats, one for each constituency. District seats are allocated by dividing each list’s votes by 1.4, then 3, 5, 7 and so on. The Directorate calculates adjustment seats by treating the whole country as one constituency and using the same method."),
        ],
        [
          t("The page says only registered parties that stand in every constituency and receive at least four per cent of the votes can receive adjustment seats. It calls that line the threshold. Lists that do not reach it can still receive district seats."),
        ],
      ],
    },
    {
      heading: "Who can vote, and the gap for 2029",
      paragraphs: [
        [
          t("On the page read, the franchise is stated as Norwegian citizenship, having turned 18 by the end of 2025, and being registered in the National Population Register as resident in Norway. The page does not print a separate age cutoff for September 2029. This guide does not invent one."),
        ],
        [
          t("The page also describes a population-register date (it names 30 June), early voting, advance voting, voting at missions abroad, and postal voting from abroad for people who cannot reach a voting place. The dates in that walk-through, including 1 July, 11 August and Monday 8 September, are the dates printed for the election the page is describing. They are not stated there as the September 2029 calendar, so they are not listed on this site as 2029 rules."),
        ],
      ],
    },
    {
      heading: "At the voting place",
      paragraphs: [
        [
          t("The page says voters must show identification. It says every municipality is to accept a passport, a national ID card or a driving licence, including a digital one, and that the document must show the name, date of birth and a photograph. It says an expired document can still be used if it meets those points. It also says the municipality may accept another official document, as a judgment by the person receiving the vote."),
        ],
      ],
    },
    {
      heading: "Publication of results",
      paragraphs: [
        [
          t("The Directorate’s "),
          t("note on the new election act", NO_LAW),
          t(" says the updated section 21-8 does not allow results to be published before 21:00 on election day. It says the same rule covers forecasts based on surveys carried out on election day or the day before. The note is the Directorate’s summary. The statute text on Lovdata was not opened for this release, so this site does not cite a Lovdata URL. This site publishes no such forecasts and no count."),
        ],
      ],
    },
  ],
  electionsHeading: "Elections",
  elections: [
    {
      name: "Storting election, September 2029",
      detail: "The Directorate page says the next election is in September 2029. It does not name the day.",
      href: "/no/en/elections/storting-2029/",
    },
  ],
  glossaryHeading: "Glossary",
  glossary: [
    { term: "Storting", text: "The national parliament. The page says 169 representatives are elected." },
    { term: "District seat", text: "One of the 150 seats filled inside a constituency, on the page’s account." },
    { term: "Adjustment seat", text: "One of 19 seats, one per constituency, limited to registered parties that stand everywhere and reach four per cent." },
    { term: "Electoral roll", text: "The manntal. The Directorate prepares it and the municipalities use it when a person votes." },
  ],
  faqHeading: "Questions",
  faq: [
    {
      q: "Is Monday 8 September the 2029 polling day?",
      a: "The page names Monday 8 September inside a walk-through that also names 2025. The only future election it states is September 2029, with no day. This site does not treat 8 September 2029 as the polling day.",
    },
    {
      q: "Does this site name candidates?",
      a: "No.",
    },
    {
      q: "Does this site publish survey forecasts or a live count?",
      a: "No. The Directorate’s note on section 21-8 is linked above. No tracker is published for Norway.",
    },
  ],
  sourcesHeading: "Official pages",
  sources: [
    { label: "Valgdirektoratet, Stortingsval, published 21 May 2026", href: NO_STORTING },
    { label: "Valgdirektoratet, changes in the new election act, including section 21-8", href: NO_LAW },
  ],
};

export const seEn: Guide = {
  kicker: "Practical guide",
  title: "How Swedish elections work",
  intro:
    "This section is drawn from Valmyndigheten English pages read on 23 October 2026. It does not copy candidate names or the party figures from the 2026 count.",
  blocks: [
    {
      heading: "Levels of government",
      paragraphs: [
        [
          t("The "),
          t("future-elections page", SE_NEXT),
          t(", published 16 October 2026, is about elections to the Riksdag and to regional and municipal councils. The "),
          t("distribution-of-seats page", SE_SEATS),
          t(" also describes region assemblies, municipal assemblies and the European Parliament. The European Parliament franchise on the "),
          t("right-to-vote page", SE_VOTE),
          t(" was not clear enough in the text retrieved, so it is not paraphrased here."),
        ],
      ],
    },
    {
      heading: "Riksdag seats",
      paragraphs: [
        [
          t("The distribution page, published 9 September 2026, says 349 seats are distributed: 310 permanent seats and 39 adjustment seats. It says a party needs at least four per cent of the votes in Sweden, with an exception for a party that receives at least twelve per cent inside a constituency, which then takes part in the distribution in that constituency."),
        ],
        [
          t("The same page says a candidate is seated on personal votes only after a mark beside their name on at least five per cent of the party’s ballot papers in the constituency. Otherwise the order on the ballot is used. This site does not list those names. The page does not, in the text read, name the allocation formula. A formula is not added here."),
        ],
      ],
    },
    {
      heading: "Who can vote",
      paragraphs: [
        [
          t("The right-to-vote page, published 9 September 2026, says the population register is read 30 days before election day and that an entitled voter is then on the electoral roll. For the Riksdag it requires that the person is 18 no later than election day, is a Swedish citizen, and is or has been registered in the population register. The future-elections page says that Riksdag rule applies whether the person lives in Sweden or abroad."),
        ],
        [
          t("For municipal and region assemblies the right-to-vote page requires age 18 by election day and a population-register record in that municipality and region. It then includes Swedish citizens, citizens of another EU country, Iceland or Norway, and citizens of another country or stateless people who have been in the population register for at least three consecutive years before election day."),
        ],
      ],
    },
    {
      heading: "How to vote",
      paragraphs: [
        [
          t("The future-elections page says that on election day the voter uses the assigned voting location on the voting card, open from 08:00 to 20:00, and that another assigned location cannot be used that day. It says early voting is at any early-voting location in Sweden, from 18 days before election day through election day, including at least one such location in each municipality on election day. It says the list of those locations is published closer to the election. It does not print the calendar dates of that 18-day window for 2030, so this site does not calculate them."),
        ],
        [
          t("The right-to-vote page says a voting card is sent about three weeks before the election and shows which elections the person may vote in, plus the name, address and hours of the polling station. Postal voting from abroad was not described on the pages read, so it is not described here."),
        ],
      ],
    },
  ],
  electionsHeading: "Elections",
  elections: [
    {
      name: "Riksdag, regional and municipal elections, Sunday 8 September 2030",
      detail:
        "Stated on the future-elections page published 16 October 2026. The page says these elections are every four years, on the second Sunday in September. The web address still contains “2026-elections”, and some questions on the page still say 2026.",
      href: "/se/en/elections/riksdag-2030/",
    },
    {
      name: "Riksdag election of 13 September 2026",
      detail: "The authority’s result protocol records that day. This site does not copy the party figures.",
    },
  ],
  glossaryHeading: "Glossary",
  glossary: [
    { term: "Riksdag", text: "The national parliament. The distribution page says it has 349 seats." },
    { term: "Adjustment seats", text: "39 of the 349 seats, described as there to keep the result as proportional as possible." },
    { term: "Voting card", text: "The card the authority says is sent about three weeks before the election." },
    { term: "Electoral roll", text: "The list built from the population register 30 days before election day, on the right-to-vote page." },
  ],
  faqHeading: "Questions",
  faq: [
    {
      q: "Why does the official address still say 2026?",
      a: "The future-elections page read on 23 October 2026 uses an address that contains “2026-elections”. The title and the opening paragraphs, published 16 October 2026, say the next elections are on 8 September 2030. This site follows that date.",
    },
    {
      q: "Does this site publish polls, candidate names or the 2026 party shares?",
      a: "No. No poll-publication ban was found on the three English authority pages read. The election act was not read section by section, so that is not a claim that the act is silent. This site still publishes none of those figures, and it has no Sweden tracker.",
    },
  ],
  sourcesHeading: "Official pages",
  sources: [
    { label: "Valmyndigheten, future elections page, published 16 October 2026", href: SE_NEXT },
    { label: "Valmyndigheten, the right to vote and voting cards", href: SE_VOTE },
    { label: "Valmyndigheten, distribution of seats", href: SE_SEATS },
    { label: "Valmyndigheten, Riksdag result protocol for 13 September 2026", href: SE_2026 },
  ],
};

export const hubGuides: Record<string, Record<string, Guide>> = {
  ie: { en: ieEn },
  no: { en: noEn },
  se: { en: seEn },
};
