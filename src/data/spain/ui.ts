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
  municipalities: "Municipalities",
  municipality: "Municipality",
  ineMunicipalityCode: "INE municipality code",
  readOn: "Read on",
  populationSeries:
    "The figure is the Total for period 2025 in INE table 29005 (the Total column, not a sex breakdown). The table heading calls the series the official figures of the annual revision of the municipal register at 1 January of each year. Inside this province, those 2025 totals add up to the provincial figure in the annex of Royal Decree 1117/2025.",
  populationSeriesCity:
    "The figure is the Total for period 2025 in INE table 29005. The table heading calls the series the official figures of the annual revision of the municipal register at 1 January of each year. It equals the figure for this city in the annex of Royal Decree 1117/2025.",
  localElection:
    "Royal Decree 207/2023 called local elections, and the elections to the Assemblies of Ceuta and Melilla, for Sunday, 28 May 2023. Article 42.3 of the consolidated Organic Law 5/1985 (read on 17 October 2026) says those elections are held on the fourth Sunday of May of the corresponding year, and that the four-year mandates end the day before the next elections. Counting four years from the 2023 polling day, the corresponding year is 2027, and the month the article names is May. No calling decree for 2027 was read on 17 October 2026, so this page does not print a calendar day.",
  mayorGap:
    "The other people on the council, and any municipal candidacy, are not on this page. The mayors file has one row for the mayor, not the full council.",
  mayorOnChild:
    "The mayor of each municipality is printed on that municipality’s page, from the ministry’s 2023 mayors file. This page does not repeat those names.",
  candidateGap:
    "Proclaimed candidate lists are not on this page. The Central Electoral Board’s 2026 calendar sets presentation of candidacies for 21–26 October, proclamation for 2 November, and publication of the proclaimed lists in the Official State Gazette for 3 November. The candidacies section read on 17 October 2026 publishes forms and representative lists, not proclaimed Congress or Senate lists.",
  governmentGap:
    "The name of the president, the parties in the government, and the seat totals of the current chamber are not copied here unless a decree read for this page printed them. They are published by the parliament and the government linked below.",
  nextElectionGap:
    "No later calling decree for this chamber was read on 17 October 2026. This page does not forecast the next polling day.",
  postcodeGap:
    "A postcode search is not wired up. No official postcode-to-municipality file was added. Grupo Correos distributes the postal-code database, and the Centro Nacional de Información Geográfica says that database is distributed by Correos. Five-digit queries are not matched to a municipality.",
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
  municipalities: "Municipios",
  municipality: "Municipio",
  ineMunicipalityCode: "Código INE de municipio",
  readOn: "Lectura",
  populationSeries:
    "La cifra es el Total del periodo 2025 en la tabla 29005 del INE (la columna Total, no un desglose por sexo). El encabezado de la tabla llama a la serie cifras oficiales de la revisión anual del Padrón municipal a 1 de enero de cada año. Dentro de esta provincia, esos totales de 2025 suman la cifra provincial del anexo del Real Decreto 1117/2025.",
  populationSeriesCity:
    "La cifra es el Total del periodo 2025 en la tabla 29005 del INE. El encabezado de la tabla llama a la serie cifras oficiales de la revisión anual del Padrón municipal a 1 de enero de cada año. Coincide con la cifra de esta ciudad en el anexo del Real Decreto 1117/2025.",
  localElection:
    "El Real Decreto 207/2023 convocó elecciones locales, y elecciones a las Asambleas de Ceuta y Melilla, para el domingo 28 de mayo de 2023. El artículo 42.3 de la Ley Orgánica 5/1985, en el texto consolidado leído el 17 de octubre de 2026, dice que esas elecciones se celebran el cuarto domingo de mayo del año que corresponda y que los mandatos, de cuatro años, terminan el día anterior al de las siguientes elecciones. Contados cuatro años desde la votación de 2023, el año que corresponde es 2027, y el mes que el artículo nombra es mayo. El 17 de octubre de 2026 no se había leído un decreto de convocatoria de 2027, así que esta página no imprime un día de calendario.",
  mayorGap:
    "Las demás personas del pleno, y cualquier candidatura municipal, no están en esta página. La ficha de alcaldes tiene una fila para la alcaldía, no el pleno completo.",
  mayorOnChild:
    "La alcaldía de cada municipio está en la página de ese municipio, tomada de la ficha de alcaldes de 2023 del ministerio. Esta página no repite esos nombres.",
  candidateGap:
    "Esta página no reproduce candidaturas proclamadas. El calendario de la Junta Electoral Central para 2026 fija la presentación de candidaturas del 21 al 26 de octubre, la proclamación el 2 de noviembre y la publicación en el Boletín Oficial del Estado de las candidaturas proclamadas el 3 de noviembre. El apartado de candidaturas leído el 17 de octubre de 2026 publica modelos e impresos y listas de representantes, no las listas proclamadas al Congreso o al Senado.",
  governmentGap:
    "El nombre de quien preside el gobierno, los partidos que lo forman y el número de escaños de la cámara actual no se copian aquí salvo cuando un decreto leído para esta página los imprime. Los publican el parlamento y el gobierno enlazados debajo.",
  nextElectionGap:
    "El 17 de octubre de 2026 no se había leído un decreto de convocatoria posterior para esta cámara. Esta página no anticipa la fecha de la siguiente votación.",
  postcodeGap:
    "La búsqueda por código postal no está conectada. No se ha añadido un fichero oficial de código postal a municipio. El Grupo Correos distribuye la base de códigos postales, y el Centro Nacional de Información Geográfica indica que esa base la distribuye Correos. Una consulta de cinco cifras no se empareja con un municipio.",
  unofficial: "Información no oficial. Confírmela con su oficina electoral oficial.",
};

export function ui(lang: Lang) {
  return lang === "es" ? ES : EN;
}
