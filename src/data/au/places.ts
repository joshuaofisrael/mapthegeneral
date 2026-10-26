/**
 * Figures are copied from sources read on 17 October 2026.
 * Population strings are the ABS March 2026 table, which prints thousands to one decimal.
 * Federal division counts are the AEC entitlement determination of 23 July 2026.
 * House seat rows are the AEC tally room final results for 3 May 2025.
 */

export type HouseCell = { party: string; seats: number };

export type Jurisdiction = {
  slug: string;
  officialName: string;
  kind: "state" | "territory";
  /** ABS table text, in thousands, one decimal. */
  populationThousands: string;
  federalDivisions: number;
  /** Parties with a non-zero cell in this state column of the final House table. */
  house2025: HouseCell[];
  /** The tally room’s “Liberal/National Coalition” cell for this state. */
  coalition2025: number;
  paragraphs: string[];
  gaps: string[];
  officeHref: string;
  officeLabel: string;
  sourceIds: string[];
};

export const HOUSE_SUMMARY: { party: string; seats: number; previous: number }[] = [
  { party: "Australian Labor Party", seats: 94, previous: 77 },
  { party: "Liberal/National Coalition", seats: 43, previous: 58 },
  { party: "The Greens", seats: 1, previous: 4 },
  { party: "Centre Alliance", seats: 1, previous: 1 },
  { party: "Katter's Australian Party (KAP)", seats: 1, previous: 1 },
  { party: "Independent", seats: 10, previous: 10 },
];

export const HOUSE_DETAIL: { party: string; byState: number[]; national: number; previous: number | null }[] = [
  { party: "Australian Labor Party", byState: [28, 27, 12, 11, 7, 4, 3, 2], national: 94, previous: 77 },
  { party: "Liberal/National Coalition", byState: [12, 9, 16, 4, 2, 0, 0, 0], national: 43, previous: 58 },
  { party: "Liberal", byState: [6, 6, 0, 4, 2, 0, 0, 0], national: 18, previous: 27 },
  { party: "Liberal National Party of Queensland", byState: [0, 0, 16, 0, 0, 0, 0, 0], national: 16, previous: 21 },
  { party: "The Nationals", byState: [6, 3, 0, 0, 0, 0, 0, 0], national: 9, previous: 10 },
  { party: "Country Liberal Party (NT)", byState: [0, 0, 0, 0, 0, 0, 0, 0], national: 0, previous: 0 },
  { party: "The Greens", byState: [0, 0, 1, 0, 0, 0, 0, 0], national: 1, previous: 4 },
  { party: "Centre Alliance", byState: [0, 0, 0, 0, 1, 0, 0, 0], national: 1, previous: 1 },
  { party: "Katter's Australian Party (KAP)", byState: [0, 0, 1, 0, 0, 0, 0, 0], national: 1, previous: 1 },
  { party: "Independent", byState: [6, 2, 0, 1, 0, 1, 0, 0], national: 10, previous: 10 },
];

export const STATE_COLUMNS = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const;

export const FEDERAL_DIVISIONS = [46, 38, 30, 16, 10, 5, 3, 2] as const;

export const ERP_NATIONAL_PERSONS = 27921150;

export const JURISDICTIONS: Jurisdiction[] = [
  {
    slug: "new-south-wales",
    officialName: "New South Wales",
    kind: "state",
    populationThousands: "8670.1",
    federalDivisions: 46,
    coalition2025: 12,
    house2025: [
      { party: "Australian Labor Party", seats: 28 },
      { party: "Liberal", seats: 6 },
      { party: "The Nationals", seats: 6 },
      { party: "Independent", seats: 6 },
    ],
    officeHref: "https://elections.nsw.gov.au/elections/state-elections/2027-nsw-state-election",
    officeLabel: "NSW Electoral Commission",
    sourceIds: ["nswec-2027", "nswec-vtr-2023", "nswec-past", "nswec-lg-results", "nswec-lg-how", "nswec-copyright", "olg-councillor", "geoscape-lga-2026", "abs-lga-2025", "abs-lga-map", "aec-entitlement-2026", "aec-tally-house-2025", "abs-erp-2026-03"],
    paragraphs: [
      "The NSW Electoral Commission page for the 2027 NSW State election prints Saturday, 13 March 2027, and calls it the election of the 59th Parliament of NSW.",
      "That page says New South Wales is divided into 93 state electoral districts. At that election, voters in each district elect one person to the Legislative Assembly, and voters also elect 21 of the 42 members of the Legislative Council. It says voting is compulsory and that Australians aged 18 and over are required to enrol and vote.",
      "The same page refers to the 2023 NSW State election. The passage read on 17 October 2026 does not print a calendar day for that election. The Commission’s virtual tally room for that election, read on 19 October 2026, is headed Saturday 25 March 2023.",
      "The Commission’s past-results page, read on 19 October 2026, lists three current local by-elections: Cobar Shire Council on 28 November 2026, City of Coffs Harbour Council on 12 December 2026, and Hunter’s Hill Council (South Ward) on 12 December 2026, each for one councillor. No candidate list is printed.",
    ],
    gaps: [
      "The name of the Premier was not on the pages read.",
      "No candidate list for 13 March 2027 was on the page read.",
      "A current mayor was not published on a central page whose licence permits copying. Not published centrally. The NSW Electoral Commission says local government elections are held on the second Saturday in September every four years, and its results page prints 14 September 2024. The how-it-works page does not print the next calendar day. This page does not calculate one. The Office of Local Government states a month for the next ordinary election. Its copyright notice reserves all rights, so that month is not copied.",
    ],
  },
  {
    slug: "victoria",
    officialName: "Victoria",
    kind: "state",
    populationThousands: "7154.2",
    federalDivisions: 38,
    coalition2025: 9,
    house2025: [
      { party: "Australian Labor Party", seats: 27 },
      { party: "Liberal", seats: 6 },
      { party: "The Nationals", seats: 3 },
      { party: "Independent", seats: 2 },
    ],
    officeHref: "https://www.vec.vic.gov.au/voting/types-of-elections/state-elections",
    officeLabel: "Victorian Electoral Commission",
    sourceIds: ["vec-state", "vic-parliament-2026", "vec-2022-report", "vec-councils", "vec-local", "vec-2024-councils", "vec-lg-report-2024", "geoscape-lga-2026", "abs-lga-2025", "abs-lga-map", "aec-entitlement-2026", "aec-tally-house-2025", "abs-erp-2026-03"],
    paragraphs: [
      "The Victorian Electoral Commission says state elections are held on the last Saturday in November every 4 years, and that this date is set by the Electoral Act 2002 (Vic). It says the next state election is on Saturday 28 November 2026.",
      "The Commission says the Legislative Assembly has 88 members, one for each district, and the Legislative Council has 40 members, five for each region. It says a person must enrol and vote if they are 18 or older, an Australian citizen, and have lived in Victoria for longer than a month.",
      "The Commission’s 2026 timeline prints: writs and the close of rolls on 3 November 2026 (rolls until 8 pm); nominations until 12 noon on 9 November 2026; early voting from 18 November 2026; election day 28 November 2026; return of the writs on 19 December 2026.",
      "The Parliament of Victoria page prints the same election day, Saturday, 28 November 2026, and says Victorians will elect the members for Victoria’s 61st Parliament. It says there are 88 Legislative Assembly electorates and eight Legislative Council regions with five members each. It prints writs on Tuesday 3 November, nominations opening Wednesday 4 November and closing Monday 9 November, early voting from Wednesday 18 November, and writs returned by Saturday 19 December. It says the current parliament expires on 3 November 2026.",
      "The Victorian Electoral Commission’s report to Parliament on the 2022 state election says the general election was held on 26 November 2022, and that a supplementary election for Narracan District was held on 28 January 2023.",
    ],
    gaps: [
      "The name of the Premier was not on the pages read.",
      "Nominations for 28 November 2026, on the Parliament of Victoria timeline, open on Wednesday 4 November 2026. On 19 October 2026 that day has not arrived. No candidate list was read, and none is printed here.",
      "The Victorian Electoral Commission’s report to Parliament says the 2024 local government general elections were held on 26 October 2024, and that the next local government elections are in October 2028. It does not print a calendar day for 2028. This page does not calculate one. The report says no election was held for Moira Shire Council, and that its next general election will be held in October 2028. Current mayors were not on the council index read on 19 October 2026. Not published centrally.",
    ],
  },
  {
    slug: "queensland",
    officialName: "Queensland",
    kind: "state",
    populationThousands: "5739.5",
    federalDivisions: 30,
    coalition2025: 16,
    house2025: [
      { party: "Australian Labor Party", seats: 12 },
      { party: "Liberal National Party of Queensland", seats: 16 },
      { party: "The Greens", seats: 1 },
      { party: "Katter's Australian Party (KAP)", seats: 1 },
    ],
    officeHref: "https://www.ecq.qld.gov.au/_resource/documents/pdf/about-us/publications/strategic-plans/Strategic-Plan-2025-2029.pdf",
    officeLabel: "Electoral Commission of Queensland",
    sourceIds: ["ecq-plan", "ecq-boundaries", "ecq-2024", "qld-const-19b", "qld-lgea-s23", "qld-lga-boundaries", "abs-sed-2025", "abs-lga-2025", "abs-lga-map", "aec-entitlement-2026", "aec-tally-house-2025", "abs-erp-2026-03"],
    paragraphs: [
      "The Electoral Commission of Queensland boundaries page, read on 24 October 2026, says Queensland is currently divided into 93 state electorates, and that there are 77 local government areas.",
      "The Commission’s 2024 state general election page says the election was held on Saturday 26 October 2024, and that all results have been declared. It says polling places were open from 8am to 6pm. Elected candidates were not copied. A copyright page for the Commission was not retrieved that day, because a direct request returned HTTP 403.",
      "The Constitution of Queensland 2001, section 19B, says the normal polling day for an ordinary general election is the last Saturday in October in the fourth calendar year after the calendar year of the last ordinary general election, unless polling is postponed under that section. The Strategic Plan 2025–2029 places a state general election in October 2028 and local government elections in March 2028. The plan does not print a calendar day. This page does not calculate those Saturdays.",
      "The Local Government Electoral Act 2011 (Qld) section 23 says a quadrennial election must be held in, and every fourth year after, 2012, on the last Saturday in March, unless a regulation fixes a different Saturday for a particular year. The calendar day of the last quadrennial election was not in the sources read.",
      "The Queensland Government local government area boundaries dataset, licensed CC BY 4.0 and read on 24 October 2026, names 78 areas. Those names are used on the local pages, with the matching ABS code. The count is not reduced to the Commission’s figure of 77.",
      "The Australian Electoral Commission’s 23 July 2026 determination says Queensland keeps 30 House of Representatives electorates at the next federal election, and that a redistribution of those federal electorates was expected to commence in the weeks after that determination. Redistributed names and boundaries were not read.",
    ],
    gaps: [
      "The name of the Premier was not on the pages read.",
      "The elected member for each Legislative Assembly district was not copied. The Gazette notice is linked from the Commission’s 2024 election page. A reuse licence for that notice was not confirmed.",
      "No candidate list for the next state election or the next council election was read.",
      "Current mayors and councillors were not copied. The department’s local government directory lists council officers, and a copyright licence for that directory was not retrieved on 24 October 2026.",
      "Which House division or state district a local area falls in was not in the boundaries dataset. It is not guessed from a boundary.",
    ],
  },
  {
    slug: "western-australia",
    officialName: "Western Australia",
    kind: "state",
    populationThousands: "3096.2",
    federalDivisions: 16,
    coalition2025: 4,
    house2025: [
      { party: "Australian Labor Party", seats: 11 },
      { party: "Liberal", seats: 4 },
      { party: "Independent", seats: 1 },
    ],
    officeHref: "https://www.elections.wa.gov.au/elections/state",
    officeLabel: "Western Australian Electoral Commission",
    sourceIds: ["waec-state", "waec-lgx-2026", "waec-copyright", "wa-dlg-elections", "geoscape-lga-2026", "abs-sed-2025", "abs-lga-2025", "abs-lga-map", "aec-entitlement-2026", "aec-tally-house-2025", "abs-erp-2026-03"],
    paragraphs: [
      "The Western Australian Electoral Commission state-elections page says the last WA State Election was held on Saturday 8 March 2025.",
      "The ABS ASGS 2025 State Electoral Division extract, read on 24 October 2026, names 59 divisions for Western Australia, excluding two special-purpose codes that are not districts. Those 59 names are listed below. The Commission’s district list was not copied.",
      "The Commission’s page titled “2026 December Local Government Extraordinary Elections”, read on 19 October 2026, says those elections will take place on Thursday 3 December as postal elections. It prints nominations opening on 13 October 2026 and closing at 4:00pm on 20 October, and says enrolment closed on 7 October for these elections. The copyright notice does not grant a licence to reproduce the list of local governments. That list is not copied. No candidate list, poll, or count is printed.",
    ],
    gaps: [
      "That page does not print the next state polling day. This page does not forecast one.",
      "The name of the Premier, the size of the Legislative Assembly and the Legislative Council, and the Commission’s own district list were not copied. The copyright notice requires prior written permission before reproducing the Commission’s material, apart from fair dealing. The 59 names below are the ABS statistical names, not a copy of that list.",
      "Current mayors are not published centrally under a reuse licence. Legal names below are the Geoscape August 2026 names, not a copy of the Commission’s roll. The Government of Western Australia local-government elections page prints a next ordinary election day. Its terms allow personal and non-commercial use only, so the day is not copied.",
    ],
  },
  {
    slug: "south-australia",
    officialName: "South Australia",
    kind: "state",
    populationThousands: "1916.8",
    federalDivisions: 10,
    coalition2025: 2,
    house2025: [
      { party: "Australian Labor Party", seats: 7 },
      { party: "Liberal", seats: 2 },
      { party: "Centre Alliance", seats: 1 },
    ],
    officeHref: "https://www.ecsa.sa.gov.au/",
    officeLabel: "Electoral Commission of South Australia",
    sourceIds: ["ecsa-home", "ecsa-lc-2026", "ecsa-ha-2026", "ecsa-council-2027", "ecsa-copyright", "sa-electorates-2026", "geoscape-lga-2026", "abs-sed-2025", "abs-lga-2025", "abs-lga-map", "aec-entitlement-2026", "aec-tally-house-2025", "abs-erp-2026-03"],
    paragraphs: [
      "The Electoral Commission of South Australia home page is titled “South Australian Elections 2026” and links to a 2026 state election page. The home page, as read, does not print a polling day.",
      "The Commission’s 2026 Legislative Council results page says that, following the final distribution of preferences conducted at 11am on Monday 4 May 2026, 11 candidates were declared elected. This page does not reprint those names. The polling day of the election is not in that passage.",
      "The Commission’s notice of House of Assembly results, read on 19 October 2026, says the House of Assembly elections were held on Saturday, 21 March 2026. The notice points to a Government Gazette for the votes of the two unexcluded candidates. That table is not copied here.",
      "The Commission says the next periodic local government council elections will be held in April 2027, moved from November 2026. Close of voting is printed as 5pm on Wednesday 7 April 2027.",
      "The Government of South Australia dataset “State Electorates 2026”, licensed CC BY 4.0 and read on 24 October 2026, contains 47 districts determined by the Electoral Districts Boundaries Commission. The names are stored in capitals. They match the 47 ABS ASGS 2025 State Electoral Division names, which are the names used on the district pages.",
    ],
    gaps: [
      "Elected members were not on the House of Assembly notice page itself. They are not copied from the Gazette.",
      "The name of the Premier was not on the pages read.",
      "The next state polling day after 2026 was not read.",
      "Current mayors were not published centrally on the pages read. The calendar day of the last periodic council election was not on the Commission pages read on 26 October 2026. The ABS name Grant is not in the Geoscape August 2026 table. Southern Limestone Coast Council is in that table and is not given a page, because this release does not treat it as the same area.",
    ],
  },
  {
    slug: "tasmania",
    officialName: "Tasmania",
    kind: "state",
    populationThousands: "580.7",
    federalDivisions: 5,
    coalition2025: 0,
    house2025: [
      { party: "Australian Labor Party", seats: 4 },
      { party: "Independent", seats: 1 },
    ],
    officeHref: "https://www.tec.tas.gov.au/house-of-assembly/elections-2025/",
    officeLabel: "Tasmanian Electoral Commission",
    sourceIds: ["tec-2025", "tec-hoa-2025", "tec-lg-2026", "geoscape-lga-2026", "abs-lga-2025", "abs-lga-map", "aec-entitlement-2026", "aec-tally-house-2025", "abs-erp-2026-03"],
    paragraphs: [
      "The Tasmanian Electoral Commission says a general election for the House of Assembly was held on Saturday 19 July 2025, and that polling closed at 6 pm that day.",
      "The Commission says Tasmania has five divisions: Bass, Braddon, Clark, Franklin and Lyons. It says seven members will be elected to represent each division for a term of up to four years, and that voting is compulsory.",
      "The same page says that, due to recent changes to legislation, Parliament is increasing in size from 25 to 35 members in the House of Assembly, with seven members to be elected from each of the five divisions. The amending Act was not read for this page.",
      "The Australian Electoral Commission’s determination notes that Tasmania is guaranteed a minimum of five members of the House of Representatives under section 24 of the Constitution, and determines five electorates for the next federal election.",
    ],
    gaps: [
      "The Commission’s page does not print the next House of Assembly polling day. It says the term is up to four years. This page does not turn that into a calendar day.",
      "The names of members elected on 19 July 2025, and the name of the Premier, were not copied. A copyright licence page for the Commission was not found on 19 October 2026.",
      "The Commission’s 2026 local government elections page, read on 26 October 2026, prints close of poll at 2 pm on Tuesday 27 October. That time has not arrived. No candidate list, return rate, or count is printed. Council legal names on the local pages are the Geoscape August 2026 names. They were not copied from the Commission.",
    ],
  },
  {
    slug: "australian-capital-territory",
    officialName: "Australian Capital Territory",
    kind: "territory",
    populationThousands: "489.7",
    federalDivisions: 3,
    coalition2025: 0,
    house2025: [{ party: "Australian Labor Party", seats: 3 }],
    officeHref: "https://www.elections.act.gov.au/elections",
    officeLabel: "Elections ACT",
    sourceIds: ["elections-act", "abs-sed-2025", "abs-lga-2025", "abs-lga-map", "geoscape-lga-2026", "aec-entitlement-2026", "aec-tally-house-2025", "abs-erp-2026-03", "abs-non-abs"],
    paragraphs: [
      "The Elections ACT elections page says the next ACT Legislative Assembly election will be held in October 2028. It does not print a calendar day.",
      "The ABS ASGS 2025 State Electoral Division extract, read on 24 October 2026, names five electorates: Brindabella, Ginninderra, Kurrajong, Murrumbidgee and Yerrabi. Two special-purpose codes are not electorates and have no page. Elections ACT returned HTTP 403 on 24 October 2026, so its roll was not copied.",
      "A link on that page is labelled “11th Legislative Assembly (2024-2028)”. The page read does not print the 2024 polling day.",
      "The ABS Non ABS Structures unit summary prints 3 Local Government Area codes for the ACT. Those codes are statistical areas, not a statement that the Territory has three elected councils. No separate municipal government was described on the pages read.",
    ],
    gaps: [
      "The name of the Chief Minister, the number of members elected for each electorate, and a calendar day for the next election were not on the pages read. Elections ACT returned HTTP 403 on 24 October 2026, so members were not copied.",
      "No candidate list was read.",
      "The only spatial Local Government Area kept from the 2025 ABS extract, after dropping two non-spatial special purpose codes, is Unincorporated ACT. It is not described as an elected council. The Geoscape August 2026 state tables read for this release do not include an Australian Capital Territory local government area table.",
    ],
  },
  {
    slug: "northern-territory",
    officialName: "Northern Territory",
    kind: "territory",
    populationThousands: "268.9",
    federalDivisions: 2,
    coalition2025: 0,
    house2025: [{ party: "Australian Labor Party", seats: 2 }],
    officeHref: "https://www.aec.gov.au/media/2026/07-23.htm",
    officeLabel: "Australian Electoral Commission",
    sourceIds: ["aec-entitlement-2026", "aec-tally-house-2025", "abs-erp-2026-03", "abs-non-abs", "abs-sed-2025", "abs-lga-2025", "abs-lga-map", "geoscape-lga-2026"],
    paragraphs: [
      "No Northern Territory Electoral Commission page was read on 17 October 2026. A direct request on 24 October 2026 returned HTTP 403. This page does not print a territory election date.",
      "The ABS ASGS 2025 State Electoral Division extract, read on 24 October 2026, names 25 divisions for the Northern Territory, excluding two special-purpose codes that are not divisions. Those 25 names are listed below. The Commission’s roll was not copied.",
      "The ABS 2025 Local Government Area extract lists spatial areas for the Northern Territory, including Unincorporated NT. The explanatory page says East Arnhem was split to create Groote Archipelago, with code changes. Current mayors were not published centrally.",
    ],
    gaps: [
      "The last and next Legislative Assembly elections, the size of the Assembly, the Commission’s own division list, and the name of the Chief Minister were not read. The 25 names below are the ABS statistical names.",
      "No candidate list was read.",
      "Last and next council election days were not read. A direct request to the Northern Territory Electoral Commission on 26 October 2026 returned HTTP 403. Legal names on the local pages are the Geoscape August 2026 names.",
    ],
  },
];

const SLUGS = new Set<string>();
for (const item of JURISDICTIONS) {
  if (SLUGS.has(item.slug)) throw new Error(`Duplicate jurisdiction ${item.slug}`);
  SLUGS.add(item.slug);
  const houseSum = item.house2025.reduce((sum, row) => sum + row.seats, 0);
  if (houseSum !== item.federalDivisions) {
    throw new Error(`${item.officialName}: 2025 House cells sum to ${houseSum}, entitlement is ${item.federalDivisions}`);
  }
}

if (JURISDICTIONS.length !== 8) throw new Error("Expected 8 states and territories");
if (FEDERAL_DIVISIONS.reduce((sum, n) => sum + n, 0) !== 150) throw new Error("Federal divisions must sum to 150");
if (HOUSE_SUMMARY.reduce((sum, row) => sum + row.seats, 0) !== 150) throw new Error("House summary must sum to 150");

const detailTotal = HOUSE_DETAIL.find((row) => row.party === "Independent");
if (!detailTotal || detailTotal.byState.reduce((sum, n) => sum + n, 0) !== 10) {
  throw new Error("Independent state cells failed the fixed check");
}

export function jurisdictionBySlug(slug: string): Jurisdiction | undefined {
  return JURISDICTIONS.find((item) => item.slug === slug);
}

export function alphaJurisdictions(): Jurisdiction[] {
  return [...JURISDICTIONS].sort((a, b) => a.officialName.localeCompare(b.officialName, "en"));
}

export function alphaNeighbors(slug: string): { prev?: Jurisdiction; next?: Jurisdiction } {
  const list = alphaJurisdictions();
  const index = list.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}
