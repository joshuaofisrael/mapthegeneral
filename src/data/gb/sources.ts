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
    id: "dacop-s4",
    name: "Dissolution and Calling of Parliament Act 2022, section 4",
    url: "https://www.legislation.gov.uk/ukpga/2022/11/section/4",
    readOn: READ,
  },
  {
    id: "ec-schedule",
    name: "Electoral Commission, The electoral system, scheduled elections April 2025 to March 2030 (corporate plan page, last updated 9 April 2025)",
    url: "https://www.electoralcommission.org.uk/about-us/our-plans-priorities-and-spending/corporate-plan-2025/6-2029/30/electoral-system",
    readOn: READ,
  },
  {
    id: "ec-2026-dates",
    name: "Electoral Commission, Key dates for voters in 2026",
    url: "https://www.electoralcommission.org.uk/voting-and-elections/key-dates-voters-2026",
    readOn: READ,
  },
  {
    id: "ge2024-results",
    name: "UK Parliament, Results for the UK general election on 4 July 2024, by party",
    url: "https://electionresults.parliament.uk/general-elections/6",
    readOn: READ,
  },
  {
    id: "members-api",
    name: "UK Parliament Members API, current House of Commons (House=1, IsCurrentMember=true)",
    url: "https://members-api.parliament.uk/api/Members/Search?House=1&IsCurrentMember=true",
    readOn: READ,
  },
  {
    id: "govuk-pm",
    name: "GOV.UK, Prime Minister",
    url: "https://www.gov.uk/government/ministers/prime-minister",
    readOn: READ,
  },
  {
    id: "govuk-burnham",
    name: "GOV.UK, The Rt Hon Andy Burnham MP",
    url: "https://www.gov.uk/government/people/andy-burnham",
    readOn: READ,
  },
  {
    id: "govuk-starmer",
    name: "GOV.UK, The Rt Hon Sir Keir Starmer KCB KC MP",
    url: "https://www.gov.uk/government/people/keir-starmer",
    readOn: READ,
  },
  {
    id: "govuk-devolution",
    name: "GOV.UK, Devolution: Guidance for civil servants (last updated 28 November 2025)",
    url: "https://www.gov.uk/guidance/devolution-of-powers-to-scotland-wales-and-northern-ireland",
    readOn: READ,
  },
  {
    id: "gov-scot-swinney",
    name: "gov.scot, John Swinney MSP",
    url: "https://www.gov.scot/about/who-runs-government/cabinet-and-ministers/people/john-swinney-msp/",
    readOn: READ,
  },
  {
    id: "gov-wales-fm",
    name: "GOV.WALES, Rt Hon Rhun ap Iorwerth MS, First Minister of Wales",
    url: "https://www.gov.wales/rhun-ap-iorwerth-ms",
    readOn: READ,
  },
  {
    id: "executive-office-ni",
    name: "The Executive Office, Executive Office Ministers",
    url: "https://www.executiveoffice-ni.gov.uk/articles/executive-office-ministers",
    readOn: READ,
  },
  {
    id: "ons-mid-2024",
    name: "Office for National Statistics, Population estimates for the UK, England, Wales, Scotland and Northern Ireland: mid-2024 (release 26 September 2025)",
    url: "https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/bulletins/annualmidyearpopulationestimates/mid2024",
    readOn: READ,
  },
];

export function sourceById(id: string): SourceRef {
  const found = SOURCES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing source ${id}`);
  return found;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map(sourceById);
}
