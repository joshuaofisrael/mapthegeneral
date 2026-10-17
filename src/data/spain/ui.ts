import type { Lang } from "./types";

const EN = {
  home: "Home",
  spain: "Spain",
  elections: "Elections",
  parties: "Parties",
  candidates: "Candidates",
  results: "Results",
  faq: "FAQ",
  sources: "Sources",
  communities: "Autonomous communities and cities",
  provinces: "Provinces",
  population: "Population",
  parliament: "Parliament",
  government: "Government",
  lastElection: "Latest election on the cited list",
  nextElection: "Next election",
  congress: "Congress of Deputies",
  senate: "Senate",
  seats: "Deputies",
  senators: "Senators",
  capital: "Provincial capital in the population annex",
  ineCode: "INE province code",
  sourcesHeading: "Sources",
  gap: "Gap",
  otherProvinces: "Other provinces in this community",
  alphaNearby: "Previous and next names in the alphabetical index",
  children: "Provinces",
  parent: "Parent pages",
  readOn: "Read on",
  municipalityGap:
    "Municipality pages for this province are not published in this release. The last ordinary municipal election was called for Sunday, 28 May 2023. Article 42.3 of the electoral law sets later ordinary local elections on the fourth Sunday of May of the corresponding year and sets a four-year mandate. No calling decree for a 2027 municipal election was read on 17 October 2026, so this page does not print a calendar day for it.",
  candidateGap:
    "Proclaimed candidate lists are not on this page. The Central Electoral Board’s 2026 calendar sets presentation of candidacies for 21–26 October, proclamation for 2 November, and publication of the proclaimed lists in the Official State Gazette for 3 November. The candidacies section read on 17 October 2026 publishes forms and representative lists, not proclaimed Congress or Senate lists.",
  governmentGap:
    "The name of the president, the parties in the government, and the seat totals of the current chamber are not copied here unless a decree read for this page printed them. They are published by the parliament and the government linked below.",
  nextElectionGap:
    "No later calling decree for this chamber was read on 17 October 2026. This page does not forecast the next polling day.",
  postcodeGap:
    "A postcode search is not wired up. This release did not add an official postcode-to-municipality file. Five-digit queries are not matched to a municipality.",
  unofficial: "Unofficial information. Confirm with your official election office.",
};

const ES = {
  home: "Inicio",
  spain: "España",
  elections: "Elecciones",
  parties: "Partidos",
  candidates: "Candidaturas",
  results: "Resultados",
  faq: "Preguntas frecuentes",
  sources: "Fuentes",
  communities: "Comunidades autónomas y ciudades",
  provinces: "Provincias",
  population: "Población",
  parliament: "Parlamento",
  government: "Gobierno",
  lastElection: "Última elección en la lista citada",
  nextElection: "Próxima elección",
  congress: "Congreso de los Diputados",
  senate: "Senado",
  seats: "Diputados",
  senators: "Senadores",
  capital: "Capital de provincia en el anexo de población",
  ineCode: "Código INE de provincia",
  sourcesHeading: "Fuentes",
  gap: "Laguna",
  otherProvinces: "Otras provincias de esta comunidad",
  alphaNearby: "Nombre anterior y siguiente en el índice alfabético",
  children: "Provincias",
  parent: "Páginas superiores",
  readOn: "Lectura",
  municipalityGap:
    "Las páginas de municipios de esta provincia no están publicadas en esta entrega. La última elección municipal ordinaria se convocó para el domingo 28 de mayo de 2023. El artículo 42.3 de la ley electoral sitúa las siguientes elecciones locales ordinarias en el cuarto domingo de mayo del año que corresponda y fija un mandato de cuatro años. El 17 de octubre de 2026 no se había leído un decreto de convocatoria de las municipales de 2027, así que esta página no imprime un día de calendario.",
  candidateGap:
    "Esta página no reproduce candidaturas proclamadas. El calendario de la Junta Electoral Central para 2026 fija la presentación de candidaturas del 21 al 26 de octubre, la proclamación el 2 de noviembre y la publicación en el Boletín Oficial del Estado de las candidaturas proclamadas el 3 de noviembre. El apartado de candidaturas leído el 17 de octubre de 2026 publica modelos e impresos y listas de representantes, no las listas proclamadas al Congreso o al Senado.",
  governmentGap:
    "El nombre de quien preside el gobierno, los partidos que lo forman y el número de escaños de la cámara actual no se copian aquí salvo cuando un decreto leído para esta página los imprime. Los publican el parlamento y el gobierno enlazados debajo.",
  nextElectionGap:
    "El 17 de octubre de 2026 no se había leído un decreto de convocatoria posterior para esta cámara. Esta página no anticipa la fecha de la siguiente votación.",
  postcodeGap:
    "La búsqueda por código postal no está conectada. Esta entrega no incorpora un fichero oficial de código postal a municipio. Una consulta de cinco cifras no se empareja con un municipio.",
  unofficial: "Información no oficial. Confírmela con su oficina electoral oficial.",
};

export function ui(lang: Lang) {
  return lang === "es" ? ES : EN;
}
