export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this page was read. */
  readOn: string;
};

const READ = "2026-10-17";
const READ_L2 = "2026-10-18";

export const SOURCES: SourceRef[] = [
  {
    id: "aec-entitlement-2026",
    name: "Australian Electoral Commission, “House of Representatives composition unchanged for next federal election”, updated 23 July 2026",
    url: "https://www.aec.gov.au/media/2026/07-23.htm",
    readOn: READ,
  },
  {
    id: "aec-2025",
    name: "Australian Electoral Commission, 2025 federal election (Saturday 3 May 2025)",
    url: "https://www.aec.gov.au/Elections/federal_elections/2025/",
    readOn: READ,
  },
  {
    id: "aec-tally-house-2025",
    name: "Australian Electoral Commission Tally Room, 2025 federal election, House of Representatives — final results, updated Tue, 10 Jun 2025 10:49:32 AM AEST",
    url: "https://results.aec.gov.au/31496/Website/HouseDefault-31496.htm",
    readOn: READ,
  },
  {
    id: "aec-timetable",
    name: "Australian Electoral Commission, “When elections are held”",
    url: "https://www.aec.gov.au/learn/election-timetable.htm",
    readOn: READ,
  },
  {
    id: "abs-erp-2026-03",
    name: "Australian Bureau of Statistics, National, state and territory population, March 2026, released 17 September 2026",
    url: "https://www.abs.gov.au/statistics/people/population/national-state-and-territory-population/latest-release",
    readOn: READ,
  },
  {
    id: "abs-lga",
    name: "Australian Bureau of Statistics, Australian Statistical Geography Standard, Edition 3, Local Government Areas",
    url: "https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/non-abs-structures/local-government-areas",
    readOn: READ,
  },
  {
    id: "abs-non-abs",
    name: "Australian Bureau of Statistics, Australian Statistical Geography Standard, Edition 3, Non ABS Structures (unit summary last updated 22 July 2025)",
    url: "https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/non-abs-structures",
    readOn: READ,
  },
  {
    id: "pm-about",
    name: "Prime Minister of Australia, “About the Prime Minister”",
    url: "https://www.pm.gov.au/about-prime-minister",
    readOn: READ,
  },
  {
    id: "vec-state",
    name: "Victorian Electoral Commission, “State elections”",
    url: "https://www.vec.vic.gov.au/voting/types-of-elections/state-elections",
    readOn: READ,
  },
  {
    id: "vic-parliament-2026",
    name: "Parliament of Victoria, “2026 Victorian state election”",
    url: "https://www.parliament.vic.gov.au/election",
    readOn: READ,
  },
  {
    id: "nswec-2027",
    name: "NSW Electoral Commission, “2027 NSW State election”",
    url: "https://elections.nsw.gov.au/elections/state-elections/2027-nsw-state-election",
    readOn: READ,
  },
  {
    id: "waec-state",
    name: "Western Australian Electoral Commission, “State Elections”",
    url: "https://www.elections.wa.gov.au/elections/state",
    readOn: READ,
  },
  {
    id: "ecsa-home",
    name: "Electoral Commission of South Australia, home page titled “South Australian Elections 2026”",
    url: "https://www.ecsa.sa.gov.au/",
    readOn: READ,
  },
  {
    id: "ecsa-lc-2026",
    name: "Electoral Commission of South Australia, 2026 Legislative Council election results",
    url: "https://www.ecsa.sa.gov.au/elections/2026se-lc-results",
    readOn: READ,
  },
  {
    id: "tec-2025",
    name: "Tasmanian Electoral Commission, 2025 state election",
    url: "https://www.tec.tas.gov.au/house-of-assembly/elections-2025/",
    readOn: READ,
  },
  {
    id: "elections-act",
    name: "Elections ACT, “Elections”",
    url: "https://www.elections.act.gov.au/elections",
    readOn: READ,
  },
  {
    id: "ecq-plan",
    name: "Electoral Commission of Queensland, Strategic Plan 2025–2029",
    url: "https://www.ecq.qld.gov.au/_resource/documents/pdf/about-us/publications/strategic-plans/Strategic-Plan-2025-2029.pdf",
    readOn: READ,
  },
  {
    id: "auspost-postcodes",
    name: "Australia Post, “Assignment of postcodes”",
    url: "https://auspost.com.au/about-us/corporate-information/our-organisation/policies/assignment-of-postcodes",
    readOn: READ,
  },
  {
    id: "aec-profiles",
    name: "Australian Electoral Commission, “Current electorate names”",
    url: "https://www.aec.gov.au/profiles/",
    readOn: READ_L2,
  },
  {
    id: "aec-copyright",
    name: "Australian Electoral Commission, copyright notice",
    url: "https://www.aec.gov.au/footer/copyright.htm",
    readOn: READ_L2,
  },
  {
    id: "aec-2025-elected",
    name: "Australian Electoral Commission, Tally Room, 2025 federal election, House of Representatives members elected",
    url: "https://results.aec.gov.au/31496/Website/HouseMembersElected-31496.htm",
    readOn: READ_L2,
  },
  {
    id: "aec-farrer-2026",
    name: "Australian Electoral Commission, Farrer by-election, Saturday 9 May 2026",
    url: "https://www.aec.gov.au/Elections/supplementary_by_elections/2026-farrer/index.htm",
    readOn: READ_L2,
  },
  {
    id: "aec-by-elections",
    name: "Australian Electoral Commission, supplementary and by-elections",
    url: "https://www.aec.gov.au/Elections/supplementary_by_elections/",
    readOn: READ_L2,
  },
  {
    id: "aph-copyright",
    name: "Parliament of Australia, Disclaimer / Privacy / Copyright",
    url: "https://www.aph.gov.au/Help/Disclaimer_Privacy_Copyright",
    readOn: READ_L2,
  },
  {
    id: "vec-districts",
    name: "Victorian Electoral Commission, “State districts”",
    url: "https://www.vec.vic.gov.au/electoral-boundaries/state-districts",
    readOn: READ_L2,
  },
  {
    id: "vec-regions",
    name: "Victorian Electoral Commission, “State regions”",
    url: "https://www.vec.vic.gov.au/electoral-boundaries/state-regions",
    readOn: READ_L2,
  },
  {
    id: "vec-legal",
    name: "Victorian Electoral Commission, Legal",
    url: "https://www.vec.vic.gov.au/legal",
    readOn: READ_L2,
  },
  {
    id: "vec-2022-report",
    name: "Victorian Electoral Commission, Report to Parliament on the 2022 Victorian State election and 2023 Narracan District supplementary election (October 2023)",
    url: "https://www.parliament.vic.gov.au/4918e0/globalassets/tabled-paper-documents/tabled-paper-7587/vec-report-to-parliament-on-the-2022-victorian-state-election-and-2023-narracan-district-supplementary-election.pdf",
    readOn: READ_L2,
  },
  {
    id: "vec-2022-districts",
    name: "Victorian Electoral Commission, 2022 state election results by district (elected members)",
    url: "https://www.vec.vic.gov.au/results/state-election-results/2022-state-election-results/results-by-district",
    readOn: READ_L2,
  },
  {
    id: "vec-2022-regions",
    name: "Victorian Electoral Commission, 2022 state election results by region (elected members)",
    url: "https://www.vec.vic.gov.au/results/state-election-results/2022-state-election-results/results-by-region",
    readOn: READ_L2,
  },
  {
    id: "vec-by-elections",
    name: "Victorian Electoral Commission, by-election and supplementary election results",
    url: "https://www.vec.vic.gov.au/results/state-election-results/state-by-elections-timeline",
    readOn: READ_L2,
  },
  {
    id: "vec-narracan-2023",
    name: "Victorian Electoral Commission, Narracan District supplementary election results (28 January 2023)",
    url: "https://www.vec.vic.gov.au/results/state-election-results/state-by-elections-timeline/narracan-district-supplementary-election-results",
    readOn: READ_L2,
  },
  {
    id: "vec-warrandyte-2023",
    name: "Victorian Electoral Commission, Warrandyte District by-election results (26 August 2023)",
    url: "https://www.vec.vic.gov.au/results/state-election-results/state-by-elections-timeline/warrandyte-district-by-election-results/results-by-district/warrandyte-district-results",
    readOn: READ_L2,
  },
  {
    id: "vec-mulgrave-2023",
    name: "Victorian Electoral Commission, Mulgrave District by-election results (18 November 2023)",
    url: "https://www.vec.vic.gov.au/results/state-election-results/state-by-elections-timeline/mulgrave-district-by-election-results/results-by-district/mulgrave-district-by-election-results",
    readOn: READ_L2,
  },
  {
    id: "vec-prahran-2025",
    name: "Victorian Electoral Commission, Prahran District by-election results (8 February 2025)",
    url: "https://www.vec.vic.gov.au/results/state-election-results/state-by-elections-timeline/prahran-district-results/results-by-district/prahran-district-results",
    readOn: READ_L2,
  },
  {
    id: "vec-werribee-2025",
    name: "Victorian Electoral Commission, Werribee District by-election results (8 February 2025)",
    url: "https://www.vec.vic.gov.au/results/state-election-results/state-by-elections-timeline/werribee-district-results/results-by-district/werribee-district-results",
    readOn: READ_L2,
  },
  {
    id: "vec-nepean-2026",
    name: "Victorian Electoral Commission, Nepean District by-election results (2 May 2026)",
    url: "https://www.vec.vic.gov.au/results/state-election-results/state-by-elections-timeline/nepean-by-election-results/results-by-district/nepean-district-results",
    readOn: READ_L2,
  },
  {
    id: "vec-appointments",
    name: "Victorian Electoral Commission, “State by-elections, supplementary elections, re-elections and appointments”",
    url: "https://www.vec.vic.gov.au/voting/types-of-elections/state-by-elections-and-appointments",
    readOn: READ_L2,
  },
  {
    id: "pov-members",
    name: "Parliament of Victoria, Members (link only; not copied)",
    url: "https://www.parliament.vic.gov.au/members/",
    readOn: READ_L2,
  },
  {
    id: "pov-copyright",
    name: "Parliament of Victoria, Copyright",
    url: "https://www.parliament.vic.gov.au/copyright/",
    readOn: READ_L2,
  },
  {
    id: "pov-disclaimer",
    name: "Parliament of Victoria, Disclaimer",
    url: "https://www.parliament.vic.gov.au/disclaimer",
    readOn: READ_L2,
  },
  {
    id: "acma-blackout",
    name: "Australian Communications and Media Authority, “Election and referendum blackout periods”",
    url: "https://www.acma.gov.au/election-and-referendum-blackout-periods",
    readOn: READ_L2,
  },
];

export function sourceById(id: string): SourceRef {
  const found = SOURCES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing Australia source ${id}`);
  return found;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map(sourceById);
}
