import type { SourceRef } from "./types";

const READ = "2026-10-17";
const READ_LEVEL2 = "2026-10-18";
const READ_LEVEL3 = "2026-10-19";
const READ_MUNI = "2026-10-24";

export const SOURCES: SourceRef[] = [
  {
    id: "cea-56-1",
    name: "Canada Elections Act, section 56.1 (S.C. 2000, c. 9)",
    url: "https://laws-lois.justice.gc.ca/eng/acts/e-2.01/section-56.1.html",
    readOn: READ,
  },
  {
    id: "ec-briefing",
    name: "Elections Canada, Delivering the Election – Overview of Elections Canada and the Federal Electoral System, Briefing Book (May 2025)",
    url: "https://www.elections.ca/content.aspx?dir=oec&document=p2&lang=e&section=abo",
    readOn: READ,
  },
  {
    id: "ec-table7",
    name: "Elections Canada, forty-fifth general election 2025, Official Voting Results, table 7, Distribution of seats by political affiliation and gender",
    url: "https://www.elections.ca/res/rep/off/ovrGE45/62/table7E.html",
    readOn: READ,
  },
  {
    id: "ec-parties",
    name: "Elections Canada, Registered Political Parties and Parties Eligible for Registration",
    url: "https://www.elections.ca/content.aspx?section=pol&dir=par&document=index&lang=e",
    readOn: READ,
  },
  {
    id: "ec-home",
    name: "Elections Canada",
    url: "https://www.elections.ca/",
    readOn: READ,
  },
  {
    id: "hoc-standings",
    name: "House of Commons of Canada, Party Standings in the House of Commons",
    url: "https://www.ourcommons.ca/members/en/party-standings",
    readOn: READ,
  },
  {
    id: "hoc-standings-fr",
    name: "Chambre des communes du Canada, Position des partis à la Chambre des communes",
    url: "https://www.ourcommons.ca/members/fr/party-standings",
    readOn: READ,
  },
  {
    id: "statcan-daily",
    name: "Statistics Canada, The Daily, Canada’s population estimates, second quarter 2026, released 2026-09-23",
    url: "https://www150.statcan.gc.ca/n1/daily-quotidien/260923/dq260923b-eng.htm",
    readOn: READ,
  },
  {
    id: "statcan-17100009",
    name: "Statistics Canada, table 17-10-0009-01, Population estimates, quarterly, release date 2026-09-23",
    url: "https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1710000901",
    readOn: READ,
  },
  {
    id: "pm",
    name: "Prime Minister of Canada",
    url: "https://www.pm.gc.ca/en",
    readOn: READ,
  },
  {
    id: "gg",
    name: "Governor General of Canada, Governor General",
    url: "https://www.gg.ca/en/governor-general",
    readOn: READ,
  },
  {
    id: "senate-about",
    name: "Government of Canada, About the Senate",
    url: "https://www.canada.ca/en/campaign/independent-advisory-board-for-senate-appointments/about-the-senate.html",
    readOn: READ,
  },
  {
    id: "qc-call",
    name: "Élections Québec, 2026 provincial election: polling day is October 5, press release of 27 August 2026",
    url: "https://www.electionsquebec.qc.ca/en/pressreleases/2026-provincial-election-polling-day-is-october-5/",
    readOn: READ,
  },
  {
    id: "qc-assembly",
    name: "Assemblée nationale du Québec, Composition de l’Assemblée nationale, notice dated mercredi 14 octobre 2026",
    url: "https://www.assnat.qc.ca/fr/actualites-salle-presse/nouvelle/Actualite-67363.html",
    readOn: READ,
  },
  {
    id: "bc-2026",
    name: "Elections BC, 2026 Provincial Election",
    url: "https://elections.bc.ca/2026-provincial-election/",
    readOn: "2026-10-25",
  },
  {
    id: "ab-next",
    name: "Elections Alberta, Alberta’s Next Provincial General Election",
    url: "https://www.elections.ab.ca/elections/albertas-next-election/",
    readOn: READ,
  },
  {
    id: "mb-voting",
    name: "Elections Manitoba, Voting",
    url: "https://www.electionsmanitoba.ca/en/Voting",
    readOn: READ,
  },
  {
    id: "sk-faq",
    name: "Elections Saskatchewan, FAQs",
    url: "https://www.elections.sk.ca/what-we-do/faqs/",
    readOn: READ,
  },
  {
    id: "pei-elections",
    name: "Elections PEI, Provincial Elections",
    url: "https://www.electionspei.ca/provincial-elections",
    readOn: READ,
  },
  {
    id: "nwt-about",
    name: "Elections NWT, About Elections NWT",
    url: "https://www.electionsnwt.ca/en/about-elections-nwt",
    readOn: READ,
  },
  {
    id: "nl-writ",
    name: "Government of Newfoundland and Labrador, Election Writs Issued for Newfoundland and Labrador’s Provincial General Election, news release of 15 September 2025",
    url: "https://www.gov.nl.ca/releases/2025/elections/0915n03/",
    readOn: READ,
  },
  {
    id: "on-act",
    name: "Election Act, R.S.O. 1990, c. E.6, consolidated text on ontario.ca",
    url: "https://www.ontario.ca/laws/statute/90e06",
    readOn: READ,
  },
  {
    id: "on-premier",
    name: "ontario.ca, Reference lists of government officials, ministries and electoral districts, ministers list",
    url: "https://www.ontario.ca/document/ontario-government-terminology/reference-lists-government-officials-ministries-and",
    readOn: READ,
  },
  {
    id: "ec-fed-2023",
    name: "Elections Canada, Federal Electoral Districts - Canada 2023, Open Government Portal record 18bf3ea7-1940-46ec-af52-9ba3f77ed708, boundary file ED_CF (record modified 2026-09-17)",
    url: "https://open.canada.ca/data/en/dataset/18bf3ea7-1940-46ec-af52-9ba3f77ed708",
    readOn: READ_LEVEL2,
  },
  {
    id: "hoc-constituencies",
    name: "House of Commons of Canada, open data, list of current constituencies (XML)",
    url: "https://www.ourcommons.ca/Members/en/constituencies/XML",
    readOn: READ_LEVEL2,
  },
  {
    id: "hoc-members",
    name: "House of Commons of Canada, open data, current members of Parliament (XML)",
    url: "https://www.ourcommons.ca/Members/en/search/XML",
    readOn: READ_LEVEL2,
  },
  {
    id: "hoc-member-search",
    name: "House of Commons of Canada, current members search page (profile links)",
    url: "https://www.ourcommons.ca/Members/en/search",
    readOn: READ_LEVEL2,
  },
  {
    id: "hoc-open-data",
    name: "House of Commons of Canada, Open Data",
    url: "https://www.ourcommons.ca/en/open-data",
    readOn: READ_LEVEL2,
  },
  {
    id: "sgc-2021-en",
    name: "Statistics Canada, Standard Geographical Classification (SGC) 2021, structure file, English",
    url: "https://www.statcan.gc.ca/eng/statistical-programs/document/sgc-cgt-2021-structure-eng.csv",
    readOn: READ_LEVEL2,
  },
  {
    id: "sgc-2021-fr",
    name: "Statistique Canada, Classification géographique type (CGT) 2021, fichier de structure, français",
    url: "https://www.statcan.gc.ca/fra/programmes-statistiques/document/sgc-cgt-2021-structure-fra.csv",
    readOn: READ_LEVEL2,
  },
  {
    id: "statcan-licence",
    name: "Statistics Canada Open Licence",
    url: "https://www.statcan.gc.ca/en/reference/licence",
    readOn: READ_LEVEL2,
  },
  {
    id: "ogl-canada",
    name: "Open Government Licence – Canada, version 2.0",
    url: "https://open.canada.ca/en/open-government-licence-canada",
    readOn: READ_LEVEL2,
  },
  {
    id: "cea-328",
    name: "Canada Elections Act, section 328, prohibition on transmitting election survey results on polling day",
    url: "https://laws-lois.justice.gc.ca/eng/acts/e-2.01/section-328.html",
    readOn: READ_LEVEL2,
  },
  {
    id: "bc-233-1",
    name: "Election Act, R.S.B.C. 1996, c. 106, section 233.1, prohibition against transmitting new poll results on final voting day",
    url: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96106_10.1",
    readOn: READ_LEVEL2,
  },
  {
    id: "pipeda",
    name: "Personal Information Protection and Electronic Documents Act (S.C. 2000, c. 5)",
    url: "https://laws-lois.justice.gc.ca/eng/acts/P-8.6/",
    readOn: READ_LEVEL2,
  },
  {
    id: "sgc-csd-dict",
    name: "Statistics Canada, Dictionary, Census of Population, 2021, table 1.5, Census subdivision types by province and territory",
    url: "https://www12.statcan.gc.ca/census-recensement/2021/ref/dict/tab/index-eng.cfm?ID=t1_5",
    readOn: READ_LEVEL3,
  },
  {
    id: "sgc-csd-def",
    name: "Statistics Canada, Dictionary, Census of Population, 2021, definition of census subdivision (CSD)",
    url: "https://www12.statcan.gc.ca/census-recensement/2021/ref/dict/az/definition-eng.cfm?ID=geo012",
    readOn: READ_LEVEL3,
  },
  {
    id: "csd-boundary-2021",
    name: "Statistics Canada, 2021 Census digital boundary file, census subdivision attribute table (CSDUID, CSDNAME, CSDTYPE), reference date 2021",
    url: "https://geo.statcan.gc.ca/geo_wa/rest/services/2021/Digital_boundary_files/MapServer/9",
    readOn: READ_LEVEL3,
  },
  {
    id: "on-mpp",
    name: "Legislative Assembly of Ontario, Current MPPs",
    url: "https://www.ola.org/en/members/current",
    readOn: READ_LEVEL3,
  },
  {
    id: "on-mea",
    name: "Municipal Elections Act, 1996, S.O. 1996, c. 32, Sched., consolidated text on ontario.ca (currency date 14 October 2026)",
    url: "https://www.ontario.ca/laws/statute/96m32",
    readOn: READ_LEVEL3,
  },
  {
    id: "qc-deputes",
    name: "Assemblée nationale du Québec, Députés en fonction",
    url: "https://www.assnat.qc.ca/fr/deputes/index.html",
    readOn: READ_LEVEL3,
  },
  {
    id: "qc-circonscriptions-2026",
    name: "Élections Québec, Liste des circonscriptions 2026 (CSV), linked from La carte électorale : délimitation finale",
    url: "https://www.electionsquebec.qc.ca/cartes-electorales/revision-de-la-carte-electorale-du-quebec/la-carte-electorale-delimitation-finale/",
    readOn: READ_LEVEL3,
  },
  {
    id: "qc-muni-act",
    name: "Loi sur les élections et les référendums dans les municipalités, RLRQ, c. E-2.2, articles 1 à 3",
    url: "https://www.legisquebec.gouv.qc.ca/fr/document/lc/E-2.2",
    readOn: READ_LEVEL3,
  },
  {
    id: "bc-ed-codes",
    name: "Elections BC, Electoral District Codes, 2023 Electoral Boundaries Redistribution",
    url: "https://elections.bc.ca/docs/2023-electoral-district-names-codes.pdf",
    readOn: READ_LEVEL3,
  },
  {
    id: "bc-leg-find",
    name: "Legislative Assembly of British Columbia, Find MLA by Constituency",
    url: "https://www.leg.bc.ca/members/find-mla-by-constituency",
    readOn: READ_LEVEL3,
  },
  {
    id: "bc-lga-52",
    name: "Local Government Act, R.S.B.C. 2015, c. 1, section 52, general local elections every 4 years (Act current to 20 October 2026)",
    url: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/r15001_03#section52",
    readOn: READ_MUNI,
  },
  {
    id: "bc-van-toc",
    name: "Vancouver Charter, table of contents, Part I, section 9, General local election (section text not read)",
    url: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/vanch_00",
    readOn: READ_MUNI,
  },
  {
    id: "bc-local-governments",
    name: "Province of British Columbia, Local governments",
    url: "https://www2.gov.bc.ca/gov/content/governments/local-governments",
    readOn: READ_MUNI,
  },
  {
    id: "ab-officials",
    name: "Alberta.ca, Find a municipal official",
    url: "https://www.alberta.ca/find-a-municipal-official",
    readOn: READ_MUNI,
  },
  {
    id: "ab-ogl",
    name: "Open Government Licence – Alberta",
    url: "https://open.alberta.ca/licence",
    readOn: READ_MUNI,
  },
  {
    id: "mb-muni-elections",
    name: "Manitoba Municipal and Northern Relations, Municipal Elections 2026",
    url: "https://www.gov.mb.ca/mr/mfas/elections.html",
    readOn: READ_MUNI,
  },
  {
    id: "mb-election-faq",
    name: "Manitoba Municipal and Northern Relations, Municipal election FAQ",
    url: "https://www.gov.mb.ca/mr/mfas/election_faq.html",
    readOn: READ_MUNI,
  },
  {
    id: "sk-muni-dates",
    name: "Government of Saskatchewan, Election dates and workshops for municipalities",
    url: "https://www.saskatchewan.ca/government/municipal-administration/elections/election-dates-and-workshops-for-municipalities",
    readOn: READ_MUNI,
  },
  {
    id: "sk-muni-directory",
    name: "Government of Saskatchewan, Municipal directory",
    url: "https://www.saskatchewan.ca/government/municipal-administration/municipal-directory",
    readOn: READ_MUNI,
  },
  {
    id: "ns-mea",
    name: "Municipal Elections Act, R.S.N.S. 1989, c. 300, sections 2 and 10, office consolidation on nslegislature.ca",
    url: "https://nslegislature.ca/sites/default/files/legc/statutes%20HTML/municipal%20elections.htm",
    readOn: READ_MUNI,
  },
  {
    id: "ns-muni-elections",
    name: "Government of Nova Scotia, Municipal elections",
    url: "https://novascotia.ca/municipal-elections/",
    readOn: READ_MUNI,
  },
  {
    id: "nb-local-process",
    name: "Government of New Brunswick, The local government general election process",
    url: "https://www.gnb.ca/en/topic/family-home-community/communty-local-gov/local-resource-manual/local-election-process.html",
    readOn: READ_MUNI,
  },
  {
    id: "nb-mea",
    name: "Municipal Elections Act, R.S.N.B. 1973, c. M-21.01, section 3 (consolidation current to 13 December 2023)",
    url: "https://laws.gnb.ca/en/document/cs/M-21.01",
    readOn: READ_MUNI,
  },
  {
    id: "nl-2025-date",
    name: "Government of Newfoundland and Labrador, Public advisory: New date for municipal general election 2025, news release of 1 November 2024",
    url: "https://www.gov.nl.ca/releases/2024/mpa/1101n05/",
    readOn: READ_MUNI,
  },
  {
    id: "pei-mga",
    name: "Municipal Government Act, R.S.P.E.I. 1988, c. M-12.1, sections 32 and 37",
    url: "https://www.princeedwardisland.ca/sites/default/files/legislation/m-12.1-municipal_government_act.pdf",
    readOn: READ_MUNI,
  },
  {
    id: "pei-candidates",
    name: "Government of Prince Edward Island, Candidate information for municipal elections",
    url: "https://www.princeedwardisland.ca/en/information/housing-and-communities/candidate-information-for-municipal-elections",
    readOn: READ_MUNI,
  },
  {
    id: "nwt-elections-home",
    name: "Elections NWT, home page",
    url: "https://www.electionsnwt.ca/en",
    readOn: READ_MUNI,
  },
  {
    id: "nu-muni",
    name: "Elections Nunavut, About municipal council elections",
    url: "https://www.elections.nu.ca/en/municipal-elections/municipal-council/about-municipal-council-elections",
    readOn: READ_MUNI,
  },
  {
    id: "ab-mla",
    name: "Legislative Assembly of Alberta, Members of the Legislative Assembly",
    url: "https://www.assembly.ab.ca/members/members-of-the-legislative-assembly",
    readOn: READ_LEVEL3,
  },
  {
    id: "ab-laea",
    name: "Local Authorities Election Act, R.S.A. 2000, c. L-21, sections 10 to 12 (consolidation current to 18 December 2025)",
    url: "https://kings-printer.alberta.ca/serve_pdf.cfm?file=L21.pdf&type=Acts",
    readOn: READ_LEVEL3,
  },
  {
    id: "ab-muni-next",
    name: "Alberta.ca, Municipal elections – Overview",
    url: "https://www.alberta.ca/municipal-elections-overview",
    readOn: READ_MUNI,
  },
  {
    id: "mb-mla",
    name: "Legislative Assembly of Manitoba, MLA Alphabetical Listing",
    url: "https://www.gov.mb.ca/legislature/members/mla_list_alphabetical.html",
    readOn: READ_LEVEL3,
  },
  {
    id: "sk-mla",
    name: "Legislative Assembly of Saskatchewan, Members of the Legislative Assembly",
    url: "https://www.legassembly.sk.ca/mlas/",
    readOn: READ_LEVEL3,
  },
  {
    id: "ns-mla",
    name: "Nova Scotia Legislature, MLAs, 65th Assembly",
    url: "https://nslegislature.ca/members/profiles",
    readOn: READ_LEVEL3,
  },
  {
    id: "pei-mla",
    name: "Legislative Assembly of Prince Edward Island, Members",
    url: "https://www.assembly.pe.ca/members",
    readOn: READ_LEVEL3,
  },
  {
    id: "nu-mla",
    name: "Legislative Assembly of Nunavut, Members of the Legislative Assembly",
    url: "https://www.assembly.nu.ca/members/mla",
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
