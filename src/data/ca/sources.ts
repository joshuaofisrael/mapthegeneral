import type { SourceRef } from "./types";

const READ = "2026-10-17";
const READ_LEVEL2 = "2026-10-18";

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
    readOn: READ,
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
];

export function sourceById(id: string): SourceRef {
  const found = SOURCES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing source ${id}`);
  return found;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map(sourceById);
}
