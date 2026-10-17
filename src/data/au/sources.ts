export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this page was read. */
  readOn: string;
};

const READ = "2026-10-17";

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
];

export function sourceById(id: string): SourceRef {
  const found = SOURCES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing Australia source ${id}`);
  return found;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map(sourceById);
}
