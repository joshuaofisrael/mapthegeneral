export type SourceRef = {
  id: string;
  name: string;
  url: string;
  /** ISO date this page was read. */
  readOn: string;
};

const READ = "2026-10-17";
const READ_LEVEL2 = "2026-10-18";
const READ_LEVEL3 = "2026-10-19";

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
  {
    id: "members-constituencies",
    name: "UK Parliament Members API, constituency search (current constituencies and current representation)",
    url: "https://members-api.parliament.uk/api/Location/Constituency/Search?skip=0&take=20",
    readOn: READ_LEVEL2,
  },
  {
    id: "ons-pcon-2024",
    name: "data.gov.uk, Westminster Parliamentary Constituencies (July 2024) Names and Codes in the UK (V2). The page prints Licence: Not set.",
    url: "https://www.data.gov.uk/dataset/90293fcf-9268-4a1a-be3d-d4a20d314604/westminster-parliamentary-constituencies-july-2024-names-and-codes-in-the-uk-v2",
    readOn: READ_LEVEL2,
  },
  {
    id: "ons-geog-licences",
    name: "Office for National Statistics, Geography licences (lookup products under the Open Government Licence v3.0)",
    url: "https://www.ons.gov.uk/methodology/geography/licences",
    readOn: READ_LEVEL2,
  },
  {
    id: "commons-by-elections",
    name: "UK Parliament election results, by-elections in the 59th Parliament",
    url: "https://electionresults.parliament.uk/parliament-periods/59/by-elections",
    readOn: READ_LEVEL3,
  },
  {
    id: "sp-open-data",
    name: "Scottish Parliament Open Data API (members, constituencies, regions, parties, member parties, and current election statuses)",
    url: "https://data.parliament.scot/api/ApiList",
    readOn: READ_LEVEL2,
  },
  {
    id: "sp-copyright",
    name: "Scottish Parliament, copyright and the Scottish Parliament Copyright Licence",
    url: "https://www.parliament.scot/about/copyright",
    readOn: READ_LEVEL2,
  },
  {
    id: "senedd-open-data",
    name: "Senedd, Open data (datasets for re-use under the Open Government Licence)",
    url: "https://senedd.wales/help/open-data/",
    readOn: READ_LEVEL2,
  },
  {
    id: "senedd-members",
    name: "Senedd meeting-information service, GetCouncillorsByWard",
    url: "http://business.senedd.wales/mgwebservice.asmx/GetCouncillorsByWard",
    readOn: READ_LEVEL2,
  },
  {
    id: "senedd-find",
    name: "Senedd, Find a Member of the Senedd",
    url: "https://senedd.wales/find-a-member-of-the-senedd/",
    readOn: READ_LEVEL2,
  },
  {
    id: "ni-members",
    name: "Northern Ireland Assembly Open Data, GetAllCurrentMembers_JSON",
    url: "http://data.niassembly.gov.uk/members.asmx/GetAllCurrentMembers_JSON",
    readOn: READ_LEVEL2,
  },
  {
    id: "ni-ogl",
    name: "Northern Ireland Assembly Open Data, licence statement",
    url: "http://data.niassembly.gov.uk/",
    readOn: READ_LEVEL2,
  },
  {
    id: "ogl-v3",
    name: "The National Archives, Open Government Licence v3.0",
    url: "https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/",
    readOn: READ_LEVEL2,
  },
  {
    id: "rpa-66a",
    name: "Representation of the People Act 1983, section 66A (prohibition on publication of exit polls)",
    url: "https://www.legislation.gov.uk/ukpga/1983/2/section/66A",
    readOn: READ_LEVEL3,
  },
  {
    id: "govuk-election-cycles",
    name: "GOV.UK, Local authority, combined authority, and county combined authority election cycles in England (updated 22 July 2025)",
    url: "https://www.gov.uk/government/publications/election-timetable-in-england/election-timetable-in-england",
    readOn: READ_LEVEL3,
  },
  {
    id: "govuk-devolution-factsheets",
    name: "GOV.UK, English devolution: Area factsheets (published 10 July 2025)",
    url: "https://www.gov.uk/government/publications/english-devolution-area-factsheets/english-devolution-area-factsheets",
    readOn: READ_LEVEL3,
  },
  {
    id: "ons-lad-apr-2025",
    name: "ONS Open Geography Portal, Local Authority Districts (April 2025) Names and Codes in the UK (V2)",
    url: "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/LAD_APR_2025_UK_NC_v2/FeatureServer/0/query?where=1%3D1&outFields=LAD25CD,LAD25NM,LAD25NMW&returnGeometry=false&f=json",
    readOn: READ_LEVEL3,
  },
  {
    id: "ons-cty-dec-2025",
    name: "ONS Open Geography Portal, Counties (December 2025) Names and Codes in England",
    url: "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/CTY_DEC_2025_EN_NC/FeatureServer/0/query?where=1%3D1&outFields=CTY25CD,CTY25NM&returnGeometry=false&f=json",
    readOn: READ_LEVEL3,
  },
  {
    id: "ons-cauth-may-2025",
    name: "ONS Open Geography Portal, Combined Authorities (May 2025) Names and Codes in England",
    url: "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/CAUTH_MAY_2025_EN_NC/FeatureServer/0/query?where=1%3D1&outFields=CAUTH25CD,CAUTH25NM&returnGeometry=false&f=json",
    readOn: READ_LEVEL3,
  },
  {
    id: "ons-rgn-dec-2025",
    name: "ONS Open Geography Portal, Regions (December 2025) Names and Codes in England",
    url: "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/RGN_DEC_2025_EN_NC/FeatureServer/0/query?where=1%3D1&outFields=RGN25CD,RGN25NM,RGN25NMW&returnGeometry=false&f=json",
    readOn: READ_LEVEL3,
  },
  {
    id: "ons-lad-rgn-2025",
    name: "ONS Open Geography Portal, LAD25_RGN25_EN_LU_v2 (local authority district to region lookup)",
    url: "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/LAD25_RGN25_EN_LU_v2/FeatureServer/0/query?where=1%3D1&outFields=LAD25CD,RGN25CD,RGN25NM&returnGeometry=false&f=json",
    readOn: READ_LEVEL3,
  },
  {
    id: "ons-lad-cauth-2025",
    name: "ONS Open Geography Portal, LAD25_CAUTH25_EN_LU (local authority district to combined authority lookup)",
    url: "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/LAD25_CAUTH25_EN_LU/FeatureServer/0/query?where=1%3D1&outFields=LAD25CD,CAUTH25CD,CAUTH25NM&returnGeometry=false&f=json",
    readOn: READ_LEVEL3,
  },
  {
    id: "ons-lad-ctyua-2025",
    name: "ONS Open Geography Portal, LAD25_CTYUA25_UK_LU_v2 (local authority district to county and unitary authority lookup)",
    url: "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/LAD25_CTYUA25_UK_LU_v2/FeatureServer/0/query?where=1%3D1&outFields=LAD25CD,CTYUA25CD,CTYUA25NM&returnGeometry=false&f=json",
    readOn: READ_LEVEL3,
  },
  {
    id: "ons-wd-pcon-2025",
    name: "ONS Open Geography Portal, WD25_PCON24_LAD25_CTYUA25_UK_LU (ward to Westminster constituency to local authority lookup)",
    url: "https://services1.arcgis.com/ESMARspQHYMw9BZ9/arcgis/rest/services/WD25_PCON24_LAD25_CTYUA25_UK_LU/FeatureServer/0/query?where=1%3D1&outFields=LAD25CD,PCON24CD,CTYUA25CD&returnGeometry=false&returnCountOnly=true&f=json",
    readOn: READ_LEVEL3,
  },
  {
    id: "dpa-2018-s1",
    name: "Data Protection Act 2018, section 1",
    url: "https://www.legislation.gov.uk/ukpga/2018/12/section/1",
    readOn: READ_LEVEL3,
  },
  {
    id: "ico-principles",
    name: "Information Commissioner’s Office, A guide to the data protection principles (Article 5 of the UK GDPR)",
    url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-principles/a-guide-to-the-data-protection-principles/",
    readOn: READ_LEVEL3,
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
