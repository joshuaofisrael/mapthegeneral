import type { Lang } from "./paths";

const EN = {
  home: "Home",
  mexico: "Mexico",
  elections: "Elections",
  parties: "Parties",
  results: "Results",
  faq: "FAQ",
  sources: "Sources",
  entities: "Entidades federativas",
  population: "Population",
  inegiCode: "INEGI code",
  municipalities: "Rows in the municipal catalog",
  sourcesHeading: "Sources",
  gap: "Gap",
  readOn: "Read on",
  parent: "Parent pages",
  alphaNearby: "Previous and next names in the alphabetical index",
  nextElection: "Next federal election",
  lastElection: "Last federal election cited",
  unofficial: "Unofficial information. Confirm with your official election office.",
  candidateGap:
    "This release has no candidate pages. The INE page for the 2026-2027 process, read on 17 October 2026, does not publish proclaimed lists. This page does not name candidates.",
  officeholderGap:
    "The name of the person who holds the gubernatura, the Jefatura de Gobierno, or a presidencia municipal is not copied here. No official list of those officeholders was read for this release.",
  municipalityGap:
    "Municipality and alcaldía pages are not in this release. The count below is the number of rows the INEGI municipal catalog returned for this entidad on 17 October 2026.",
  districtGap:
    "Pages for federal single-member districts and for the five plurinominal constituencies are not in this release.",
  postcodeGap:
    "A postcode search is not wired up. This release does not include an official postcode file. Five-digit queries are not matched to an entidad or a municipality.",
  resultsGap:
    "There is no 6 June 2027 count to copy. This page does not assign seats and it does not call a race. The 2 June 2024 count is not reprinted here either.",
  nextLocalGap:
    "Where the INE page does not print a gubernatura for this entidad, this page does not forecast one.",
};

const ES = {
  home: "Inicio",
  mexico: "México",
  elections: "Elecciones",
  parties: "Partidos",
  results: "Resultados",
  faq: "Preguntas frecuentes",
  sources: "Fuentes",
  entities: "Entidades federativas",
  population: "Población",
  inegiCode: "Clave INEGI",
  municipalities: "Filas del catálogo municipal",
  sourcesHeading: "Fuentes",
  gap: "Laguna",
  readOn: "Lectura",
  parent: "Páginas superiores",
  alphaNearby: "Nombre anterior y siguiente en el índice alfabético",
  nextElection: "Próxima elección federal",
  lastElection: "Última elección federal citada",
  unofficial: "Información no oficial. Confírmela con su oficina electoral oficial.",
  candidateGap:
    "Esta entrega no tiene páginas de candidaturas. La página del INE del proceso 2026-2027, leída el 17 de octubre de 2026, no publica listas proclamadas. Esta página no nombra candidaturas.",
  officeholderGap:
    "No se copia aquí el nombre de quien ejerce la gubernatura, la Jefatura de Gobierno o una presidencia municipal. Para esta entrega no se leyó una lista oficial de esas personas.",
  municipalityGap:
    "Las páginas de municipios y alcaldías no están en esta entrega. La cifra de abajo es el número de filas que el catálogo municipal del INEGI devolvió para esta entidad el 17 de octubre de 2026.",
  districtGap:
    "Esta entrega no publica páginas de distritos federales uninominales ni de las cinco circunscripciones plurinominales.",
  postcodeGap:
    "La búsqueda por código postal no está conectada. Esta entrega no incorpora un fichero oficial de códigos postales. Una consulta de cinco cifras no se empareja con una entidad ni con un municipio.",
  resultsGap:
    "No hay un escrutinio del 6 de junio de 2027 que copiar. Esta página no asigna escaños ni canta una elección. Tampoco reproduce el escrutinio del 2 de junio de 2024.",
  nextLocalGap:
    "Cuando la página del INE no imprime una gubernatura para esta entidad, esta página no anticipa una.",
};

export function ui(lang: Lang) {
  return lang === "es" ? ES : EN;
}
