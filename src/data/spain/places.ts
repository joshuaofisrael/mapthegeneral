import type { Community, Province } from "./types";

/**
 * Population figures are the annex of Real Decreto 1117/2025 (BOE-A-2025-25362),
 * Padrón municipal at 1 January 2025. Congress seats are the annex of Real Decreto
 * 806/2026 (BOE-A-2026-20742). INE province codes are the codes printed beside
 * those province names on INE table 2917.
 */
export const PROVINCES: Province[] = [
  { slug: "albacete", decreeName: "Albacete", ineCode: "02", communitySlug: "castilla-la-mancha", population: 390406, capital: "Albacete", capitalPopulation: 175400, congressSeats: 4, provincialSenators: 4 },
  { slug: "alicante", decreeName: "Alicante/Alacant", ineCode: "03", communitySlug: "comunidad-valenciana", population: 2030037, capital: "Alicante/Alacant", capitalPopulation: 366221, congressSeats: 12, provincialSenators: 4 },
  { slug: "almeria", decreeName: "Almería", ineCode: "04", communitySlug: "andalucia", population: 773577, capital: "Almería", capitalPopulation: 205468, congressSeats: 6, provincialSenators: 4 },
  { slug: "araba", decreeName: "Araba/Álava", ineCode: "01", communitySlug: "pais-vasco", population: 342161, capital: "Vitoria-Gasteiz", capitalPopulation: 260699, congressSeats: 4, provincialSenators: 4 },
  { slug: "asturias", decreeName: "Asturias", ineCode: "33", communitySlug: "asturias", population: 1013529, capital: "Oviedo", capitalPopulation: 223968, congressSeats: 7, provincialSenators: 4 },
  { slug: "avila", decreeName: "Ávila", ineCode: "05", communitySlug: "castilla-y-leon", population: 159887, capital: "Ávila", capitalPopulation: 59107, congressSeats: 3, provincialSenators: 4, cylProcuradores: 7 },
  { slug: "badajoz", decreeName: "Badajoz", ineCode: "06", communitySlug: "extremadura", population: 663886, capital: "Badajoz", capitalPopulation: 150209, congressSeats: 5, provincialSenators: 4 },
  {
    slug: "illes-balears",
    decreeName: "Balears (Illes)",
    ineCode: "07",
    communitySlug: "illes-balears",
    population: 1237480,
    capital: "Palma",
    capitalPopulation: 434786,
    congressSeats: 8,
    provincialSenators: null,
    islands: [
      { name: "Mallorca", population: 960270, senators: 3, regionalDeputies: 33 },
      { name: "Menorca", population: 101794, senators: 1, regionalDeputies: 13 },
      { name: "Ibiza", population: 163755, senators: 1, regionalDeputies: 12 },
      { name: "Formentera", population: 11661, senators: 1, regionalDeputies: 1 },
    ],
  },
  { slug: "barcelona", decreeName: "Barcelona", ineCode: "08", communitySlug: "cataluna", population: 5983325, capital: "Barcelona", capitalPopulation: 1731649, congressSeats: 32, provincialSenators: 4 },
  { slug: "bizkaia", decreeName: "Bizkaia", ineCode: "48", communitySlug: "pais-vasco", population: 1166816, capital: "Bilbao", capitalPopulation: 351124, congressSeats: 8, provincialSenators: 4 },
  { slug: "burgos", decreeName: "Burgos", ineCode: "09", communitySlug: "castilla-y-leon", population: 361556, capital: "Burgos", capitalPopulation: 177402, congressSeats: 4, provincialSenators: 4, cylProcuradores: 11 },
  { slug: "caceres", decreeName: "Cáceres", ineCode: "10", communitySlug: "extremadura", population: 387752, capital: "Cáceres", capitalPopulation: 96651, congressSeats: 4, provincialSenators: 4 },
  { slug: "cadiz", decreeName: "Cádiz", ineCode: "11", communitySlug: "andalucia", population: 1257041, capital: "Cádiz", capitalPopulation: 109950, congressSeats: 8, provincialSenators: 4 },
  { slug: "cantabria", decreeName: "Cantabria", ineCode: "39", communitySlug: "cantabria", population: 593964, capital: "Santander", capitalPopulation: 175425, congressSeats: 5, provincialSenators: 4 },
  { slug: "castellon", decreeName: "Castellón/Castelló", ineCode: "12", communitySlug: "comunidad-valenciana", population: 627173, capital: "Castelló de la Plana/Castellón de la Plana", capitalPopulation: 183711, congressSeats: 5, provincialSenators: 4 },
  { slug: "ciudad-real", decreeName: "Ciudad Real", ineCode: "13", communitySlug: "castilla-la-mancha", population: 494407, capital: "Ciudad Real", capitalPopulation: 76217, congressSeats: 5, provincialSenators: 4 },
  { slug: "cordoba", decreeName: "Córdoba", ineCode: "14", communitySlug: "andalucia", population: 772153, capital: "Córdoba", capitalPopulation: 323262, congressSeats: 6, provincialSenators: 4 },
  { slug: "a-coruna", decreeName: "Coruña (A)", ineCode: "15", communitySlug: "galicia", population: 1135612, capital: "Coruña, A", capitalPopulation: 251543, congressSeats: 8, provincialSenators: 4 },
  { slug: "cuenca", decreeName: "Cuenca", ineCode: "16", communitySlug: "castilla-la-mancha", population: 198216, capital: "Cuenca", capitalPopulation: 53600, congressSeats: 3, provincialSenators: 4 },
  { slug: "gipuzkoa", decreeName: "Gipuzkoa", ineCode: "20", communitySlug: "pais-vasco", population: 733365, capital: "Donostia/San Sebastián", capitalPopulation: 189866, congressSeats: 6, provincialSenators: 4 },
  { slug: "girona", decreeName: "Girona", ineCode: "17", communitySlug: "cataluna", population: 832026, capital: "Girona", capitalPopulation: 108666, congressSeats: 6, provincialSenators: 4 },
  { slug: "granada", decreeName: "Granada", ineCode: "18", communitySlug: "andalucia", population: 942618, capital: "Granada", capitalPopulation: 233975, congressSeats: 7, provincialSenators: 4 },
  { slug: "guadalajara", decreeName: "Guadalajara", ineCode: "19", communitySlug: "castilla-la-mancha", population: 285390, capital: "Guadalajara", capitalPopulation: 92834, congressSeats: 3, provincialSenators: 4 },
  { slug: "huelva", decreeName: "Huelva", ineCode: "21", communitySlug: "andalucia", population: 535703, capital: "Huelva", capitalPopulation: 143215, congressSeats: 5, provincialSenators: 4 },
  { slug: "huesca", decreeName: "Huesca", ineCode: "22", communitySlug: "aragon", population: 230624, capital: "Huesca", capitalPopulation: 55454, congressSeats: 3, provincialSenators: 4 },
  { slug: "jaen", decreeName: "Jaén", ineCode: "23", communitySlug: "andalucia", population: 617604, capital: "Jaén", capitalPopulation: 112235, congressSeats: 5, provincialSenators: 4 },
  { slug: "leon", decreeName: "León", ineCode: "24", communitySlug: "castilla-y-leon", population: 446771, capital: "León", capitalPopulation: 123446, congressSeats: 4, provincialSenators: 4, cylProcuradores: 13 },
  { slug: "lleida", decreeName: "Lleida", ineCode: "25", communitySlug: "cataluna", population: 456106, capital: "Lleida", capitalPopulation: 146266, congressSeats: 4, provincialSenators: 4 },
  { slug: "lugo", decreeName: "Lugo", ineCode: "27", communitySlug: "galicia", population: 325759, capital: "Lugo", capitalPopulation: 100143, congressSeats: 4, provincialSenators: 4 },
  { slug: "madrid", decreeName: "Madrid", ineCode: "28", communitySlug: "madrid", population: 7137031, capital: "Madrid", capitalPopulation: 3506730, congressSeats: 38, provincialSenators: 4 },
  { slug: "malaga", decreeName: "Málaga", ineCode: "29", communitySlug: "andalucia", population: 1791092, capital: "Málaga", capitalPopulation: 599063, congressSeats: 11, provincialSenators: 4 },
  { slug: "murcia", decreeName: "Murcia", ineCode: "30", communitySlug: "murcia", population: 1589138, capital: "Murcia", capitalPopulation: 479405, congressSeats: 10, provincialSenators: 4 },
  { slug: "navarra", decreeName: "Navarra", ineCode: "31", communitySlug: "navarra", population: 683500, capital: "Pamplona/Iruña", capitalPopulation: 209094, congressSeats: 5, provincialSenators: 4 },
  { slug: "ourense", decreeName: "Ourense", ineCode: "32", communitySlug: "galicia", population: 305573, capital: "Ourense", capitalPopulation: 105769, congressSeats: 4, provincialSenators: 4 },
  { slug: "palencia", decreeName: "Palencia", ineCode: "34", communitySlug: "castilla-y-leon", population: 158687, capital: "Palencia", capitalPopulation: 77466, congressSeats: 3, provincialSenators: 4, cylProcuradores: 7 },
  {
    slug: "las-palmas",
    decreeName: "Palmas (Las)",
    ineCode: "35",
    communitySlug: "canarias",
    population: 1167555,
    capital: "Palmas de Gran Canaria, Las",
    capitalPopulation: 381868,
    congressSeats: 8,
    provincialSenators: null,
    islands: [
      { name: "Gran Canaria", population: 870608, senators: 3 },
      { name: "Fuerteventura", population: 129541, senators: 1 },
      { name: "Lanzarote", population: 167406, senators: 1 },
    ],
  },
  { slug: "pontevedra", decreeName: "Pontevedra", ineCode: "36", communitySlug: "galicia", population: 946225, capital: "Pontevedra", capitalPopulation: 83316, congressSeats: 7, provincialSenators: 4 },
  { slug: "la-rioja", decreeName: "Rioja (La)", ineCode: "26", communitySlug: "la-rioja", population: 327286, capital: "Logroño", capitalPopulation: 152150, congressSeats: 4, provincialSenators: 4 },
  { slug: "salamanca", decreeName: "Salamanca", ineCode: "37", communitySlug: "castilla-y-leon", population: 328779, capital: "Salamanca", capitalPopulation: 146110, congressSeats: 4, provincialSenators: 4, cylProcuradores: 10 },
  {
    slug: "santa-cruz-de-tenerife",
    decreeName: "Santa Cruz de Tenerife",
    ineCode: "38",
    communitySlug: "canarias",
    population: 1082421,
    capital: "Santa Cruz de Tenerife",
    capitalPopulation: 211957,
    congressSeats: 7,
    provincialSenators: null,
    islands: [
      { name: "Tenerife", population: 961745, senators: 3 },
      { name: "Palma, La", population: 86194, senators: 1 },
      { name: "Gomera, La", population: 22442, senators: 1 },
      { name: "Hierro, El", population: 12040, senators: 1 },
    ],
  },
  { slug: "segovia", decreeName: "Segovia", ineCode: "40", communitySlug: "castilla-y-leon", population: 158470, capital: "Segovia", capitalPopulation: 52375, congressSeats: 3, provincialSenators: 4, cylProcuradores: 7 },
  { slug: "sevilla", decreeName: "Sevilla", ineCode: "41", communitySlug: "andalucia", population: 1976624, capital: "Sevilla", capitalPopulation: 689423, congressSeats: 12, provincialSenators: 4 },
  { slug: "soria", decreeName: "Soria", ineCode: "42", communitySlug: "castilla-y-leon", population: 90234, capital: "Soria", capitalPopulation: 41025, congressSeats: 2, provincialSenators: 4, cylProcuradores: 5 },
  { slug: "tarragona", decreeName: "Tarragona", ineCode: "43", communitySlug: "cataluna", population: 874808, capital: "Tarragona", capitalPopulation: 143649, congressSeats: 6, provincialSenators: 4 },
  { slug: "teruel", decreeName: "Teruel", ineCode: "44", communitySlug: "aragon", population: 136197, capital: "Teruel", capitalPopulation: 36655, congressSeats: 3, provincialSenators: 4 },
  { slug: "toledo", decreeName: "Toledo", ineCode: "45", communitySlug: "castilla-la-mancha", population: 750815, capital: "Toledo", capitalPopulation: 87216, congressSeats: 6, provincialSenators: 4 },
  { slug: "valencia", decreeName: "Valencia/València", ineCode: "46", communitySlug: "comunidad-valenciana", population: 2758633, capital: "València", capitalPopulation: 840792, congressSeats: 16, provincialSenators: 4 },
  { slug: "valladolid", decreeName: "Valladolid", ineCode: "47", communitySlug: "castilla-y-leon", population: 528841, capital: "Valladolid", capitalPopulation: 302614, congressSeats: 5, provincialSenators: 4, cylProcuradores: 15 },
  { slug: "zamora", decreeName: "Zamora", ineCode: "49", communitySlug: "castilla-y-leon", population: 165275, capital: "Zamora", capitalPopulation: 59815, congressSeats: 3, provincialSenators: 4, cylProcuradores: 7 },
  { slug: "zaragoza", decreeName: "Zaragoza", ineCode: "50", communitySlug: "aragon", population: 991991, capital: "Zaragoza", capitalPopulation: 693091, congressSeats: 7, provincialSenators: 4 },
];

const INFOELECTORAL = "infoelectoral-procesos";
const BOE_BALEARS = "boe-balears-2023";
const BOE_CYL = "boe-cyl-2026";
const RD_LOCAL = "rd-207-2023";

export const COMMUNITIES: Community[] = [
  {
    slug: "andalucia",
    officialName: "Andalucía",
    kind: "community",
    parliamentName: "Parlamento de Andalucía",
    parliamentUrl: "https://www.parlamentodeandalucia.es/",
    governmentUrl: "https://www.juntadeandalucia.es/",
    lastElection: {
      iso: "2026-05-17",
      instrument: "Decreto 2/2026, de 23 de marzo",
      publication: "BOJA núm. 5, de 24 de marzo de 2026",
      sourceId: INFOELECTORAL,
      officeEs: "Parlamento de Andalucía",
      officeEn: "Parliament of Andalusia",
    },
  },
  {
    slug: "aragon",
    officialName: "Aragón",
    kind: "community",
    parliamentName: "Cortes de Aragón",
    parliamentUrl: "https://www.cortesaragon.es/",
    governmentUrl: "https://www.aragon.es/",
    lastElection: {
      iso: "2026-02-08",
      instrument: "Decreto de 15 de diciembre de 2025",
      publication: "BOA núm. 242, de 16 de diciembre de 2025",
      sourceId: INFOELECTORAL,
      officeEs: "Cortes de Aragón",
      officeEn: "Cortes of Aragon",
    },
  },
  {
    slug: "asturias",
    officialName: "Principado de Asturias",
    kind: "community",
    parliamentName: "Junta General del Principado de Asturias",
    parliamentUrl: "https://www.jgpa.es/",
    governmentUrl: "https://www.asturias.es/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Decreto de 3 de abril de 2023",
      publication: "BOE núm. 80, de 4 de abril de 2023",
      sourceId: INFOELECTORAL,
      officeEs: "Junta General del Principado de Asturias",
      officeEn: "General Junta of the Principality of Asturias",
    },
  },
  {
    slug: "illes-balears",
    officialName: "Illes Balears",
    kind: "community",
    parliamentName: "Parlamento de las Illes Balears",
    parliamentUrl: "https://www.parlamentib.es/",
    governmentUrl: "https://www.caib.es/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Decreto 2/2023, de 3 de abril, de la Presidenta de las Illes Balears",
      publication: "BOE núm. 80, de 4 de abril de 2023",
      sourceId: BOE_BALEARS,
      officeEs: "Parlamento de las Illes Balears",
      officeEn: "Parliament of the Balearic Islands",
    },
    chamberSize: 59,
    chamberSizeNoteEs:
      "El decreto fija 33 diputados en Mallorca, 13 en Menorca, 12 en Ibiza y 1 en Formentera.",
    chamberSizeNoteEn:
      "The decree sets 33 deputies in Mallorca, 13 in Menorca, 12 in Ibiza and 1 in Formentera.",
  },
  {
    slug: "canarias",
    officialName: "Canarias",
    kind: "community",
    parliamentName: "Parlamento de Canarias",
    parliamentUrl: "https://www.parcan.es/",
    governmentUrl: "https://www.gobiernodecanarias.org/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Decreto de 3 de abril de 2023",
      publication: "BOE núm. 80, de 4 de abril de 2023",
      sourceId: INFOELECTORAL,
      officeEs: "Parlamento de Canarias",
      officeEn: "Parliament of the Canary Islands",
    },
  },
  {
    slug: "cantabria",
    officialName: "Cantabria",
    kind: "community",
    parliamentName: "Parlamento de Cantabria",
    parliamentUrl: "https://www.parlamento-cantabria.es/",
    governmentUrl: "https://www.cantabria.es/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Decreto de 3 de abril de 2023",
      publication: "BOE núm. 80, de 4 de abril de 2023",
      sourceId: INFOELECTORAL,
      officeEs: "Parlamento de Cantabria",
      officeEn: "Parliament of Cantabria",
    },
  },
  {
    slug: "castilla-la-mancha",
    officialName: "Castilla-La Mancha",
    kind: "community",
    parliamentName: "Cortes de Castilla-La Mancha",
    parliamentUrl: "https://www.cortesclm.es/",
    governmentUrl: "https://www.castillalamancha.es/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Decreto de 3 de abril de 2023",
      publication: "BOE núm. 80, de 4 de abril de 2023",
      sourceId: INFOELECTORAL,
      officeEs: "Cortes de Castilla-La Mancha",
      officeEn: "Cortes of Castilla-La Mancha",
    },
  },
  {
    slug: "castilla-y-leon",
    officialName: "Castilla y León",
    kind: "community",
    parliamentName: "Cortes de Castilla y León",
    parliamentUrl: "https://www.ccyl.es/",
    governmentUrl: "https://www.jcyl.es/",
    lastElection: {
      iso: "2026-03-15",
      instrument: "Decreto 1/2026, de 19 de enero, del Presidente de la Junta de Castilla y León",
      publication: "BOE núm. 18, de 20 de enero de 2026",
      sourceId: BOE_CYL,
      officeEs: "Cortes de Castilla y León",
      officeEn: "Cortes of Castile and León",
    },
    chamberSize: 82,
    chamberSizeNoteEs:
      "El decreto dice que las Cortes las integran ochenta y dos Procuradores/as, con este reparto: Ávila 7, Burgos 11, León 13, Palencia 7, Salamanca 10, Segovia 7, Soria 5, Valladolid 15 y Zamora 7.",
    chamberSizeNoteEn:
      "The decree says the Cortes are made up of 82 procuradores, allocated as Ávila 7, Burgos 11, León 13, Palencia 7, Salamanca 10, Segovia 7, Soria 5, Valladolid 15 and Zamora 7.",
  },
  {
    slug: "cataluna",
    officialName: "Cataluña",
    kind: "community",
    parliamentName: "Parlamento de Cataluña",
    parliamentUrl: "https://www.parlament.cat/",
    governmentUrl: "https://govern.cat/",
    lastElection: {
      iso: "2024-05-12",
      instrument: "Decreto 60/2024, de 18 de marzo",
      publication: "DOGC núm. 9125, de 19 de marzo de 2024",
      sourceId: INFOELECTORAL,
      officeEs: "Parlamento de Cataluña",
      officeEn: "Parliament of Catalonia",
    },
  },
  {
    slug: "extremadura",
    officialName: "Extremadura",
    kind: "community",
    parliamentName: "Asamblea de Extremadura",
    parliamentUrl: "https://www.asambleaex.es/",
    governmentUrl: "https://www.juntaex.es/",
    lastElection: {
      iso: "2025-12-21",
      instrument: "Decreto 8/2025, de 27 de octubre, de la Presidenta",
      publication: "DOE núm. 207, de 28 de octubre de 2025",
      sourceId: INFOELECTORAL,
      officeEs: "Asamblea de Extremadura",
      officeEn: "Assembly of Extremadura",
    },
  },
  {
    slug: "galicia",
    officialName: "Galicia",
    kind: "community",
    parliamentName: "Parlamento de Galicia",
    parliamentUrl: "https://www.parlamentodegalicia.gal/",
    governmentUrl: "https://www.xunta.gal/",
    lastElection: {
      iso: "2024-02-18",
      instrument: "Decreto 150/2023, de 26 de diciembre",
      publication: "DOG núm. 243, de 26 de diciembre de 2023",
      sourceId: INFOELECTORAL,
      officeEs: "Parlamento de Galicia",
      officeEn: "Parliament of Galicia",
    },
  },
  {
    slug: "madrid",
    officialName: "Comunidad de Madrid",
    kind: "community",
    parliamentName: "Asamblea de Madrid",
    parliamentUrl: "https://www.asambleamadrid.es/",
    governmentUrl: "https://www.comunidad.madrid/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Decreto de 3 de abril de 2023",
      publication: "BOE núm. 80, de 4 de abril de 2023",
      sourceId: INFOELECTORAL,
      officeEs: "Asamblea de Madrid",
      officeEn: "Assembly of Madrid",
    },
  },
  {
    slug: "murcia",
    officialName: "Región de Murcia",
    kind: "community",
    parliamentName: "Asamblea Regional de Murcia",
    parliamentUrl: "https://www.asambleamurcia.es/",
    governmentUrl: "https://www.carm.es/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Decreto de 3 de abril de 2023",
      publication: "BOE núm. 80, de 4 de abril de 2023",
      sourceId: INFOELECTORAL,
      officeEs: "Asamblea Regional de Murcia",
      officeEn: "Regional Assembly of Murcia",
    },
  },
  {
    slug: "navarra",
    officialName: "Comunidad Foral de Navarra",
    kind: "community",
    parliamentName: "Parlamento de Navarra",
    parliamentUrl: "https://parlamento.navarra.es/",
    governmentUrl: "https://www.navarra.es/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Decreto Foral 3/2023, de 3 de abril",
      publication: "BOE núm. 79, de 4 de abril de 2023",
      sourceId: INFOELECTORAL,
      officeEs: "Parlamento de Navarra",
      officeEn: "Parliament of Navarre",
    },
  },
  {
    slug: "pais-vasco",
    officialName: "País Vasco",
    kind: "community",
    parliamentName: "Parlamento Vasco",
    parliamentUrl: "https://www.legebiltzarra.eus/",
    governmentUrl: "https://www.euskadi.eus/",
    lastElection: {
      iso: "2024-04-21",
      instrument: "Decreto 7/2024, de 26 de febrero",
      publication: "BOPV núm. 42, de 27 de febrero de 2024",
      sourceId: INFOELECTORAL,
      officeEs: "Parlamento Vasco",
      officeEn: "Basque Parliament",
    },
  },
  {
    slug: "la-rioja",
    officialName: "La Rioja",
    kind: "community",
    parliamentName: "Parlamento de La Rioja",
    parliamentUrl: "https://www.parlamento-larioja.org/",
    governmentUrl: "https://www.larioja.org/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Decreto de 3 de abril de 2023",
      publication: "BOE núm. 80, de 4 de abril de 2023",
      sourceId: INFOELECTORAL,
      officeEs: "Parlamento de La Rioja",
      officeEn: "Parliament of La Rioja",
    },
  },
  {
    slug: "comunidad-valenciana",
    officialName: "Comunidad Valenciana",
    kind: "community",
    parliamentName: "Cortes Valencianas",
    parliamentUrl: "https://www.cortsvalencianes.es/",
    governmentUrl: "https://www.gva.es/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Decreto de 3 de abril de 2023",
      publication: "BOE núm. 80, de 4 de abril de 2023",
      sourceId: INFOELECTORAL,
      officeEs: "Cortes Valencianas",
      officeEn: "Valencian Cortes",
    },
  },
  {
    slug: "ceuta",
    officialName: "Ceuta",
    kind: "city",
    parliamentName: "Asamblea de Ceuta",
    parliamentUrl: "https://www.ceuta.es/",
    governmentUrl: "https://www.ceuta.es/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Real Decreto 207/2023, de 3 de abril",
      publication: "BOE-A-2023-8458",
      sourceId: RD_LOCAL,
      officeEs: "Asamblea de Ceuta",
      officeEn: "Assembly of Ceuta",
    },
  },
  {
    slug: "melilla",
    officialName: "Melilla",
    kind: "city",
    parliamentName: "Asamblea de Melilla",
    parliamentUrl: "https://www.melilla.es/",
    governmentUrl: "https://www.melilla.es/",
    lastElection: {
      iso: "2023-05-28",
      instrument: "Real Decreto 207/2023, de 3 de abril",
      publication: "BOE-A-2023-8458",
      sourceId: RD_LOCAL,
      officeEs: "Asamblea de Melilla",
      officeEn: "Assembly of Melilla",
    },
  },
];

export const CITIES = [
  { slug: "ceuta", decreeName: "Ceuta", ineCode: "51", population: 83595, congressSeats: 1, senators: 2 },
  { slug: "melilla", decreeName: "Melilla", ineCode: "52", population: 86780, congressSeats: 1, senators: 2 },
] as const;

export function communityBySlug(slug: string): Community | undefined {
  return COMMUNITIES.find((item) => item.slug === slug);
}

export function provinceBySlug(slug: string): Province | undefined {
  return PROVINCES.find((item) => item.slug === slug);
}

export function provincesIn(communitySlug: string): Province[] {
  return PROVINCES.filter((item) => item.communitySlug === communitySlug).sort((a, b) =>
    a.decreeName.localeCompare(b.decreeName, "es"),
  );
}

export function populationOfCommunity(slug: string): number {
  const city = CITIES.find((item) => item.slug === slug);
  if (city) return city.population;
  return provincesIn(slug).reduce((sum, item) => sum + item.population, 0);
}

export function congressSeatsOfCommunity(slug: string): number {
  const city = CITIES.find((item) => item.slug === slug);
  if (city) return city.congressSeats;
  return provincesIn(slug).reduce((sum, item) => sum + item.congressSeats, 0);
}

export const CONGRESS_SEAT_TOTAL = PROVINCES.reduce((sum, item) => sum + item.congressSeats, 0) +
  CITIES.reduce((sum, item) => sum + item.congressSeats, 0);

export const PADRON_POPULATION_TOTAL =
  PROVINCES.reduce((sum, item) => sum + item.population, 0) +
  CITIES.reduce((sum, item) => sum + item.population, 0);

/** Alphabetical index used for “nearby” links. Not a map of shared borders. */
export function alphaProvinces(): Province[] {
  return [...PROVINCES].sort((a, b) => a.decreeName.localeCompare(b.decreeName, "es"));
}

export function alphaNeighbors(slug: string): { prev?: Province; next?: Province } {
  const list = alphaProvinces();
  const index = list.findIndex((item) => item.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  };
}

export function alphaCommunities(): Community[] {
  return [...COMMUNITIES].sort((a, b) => a.officialName.localeCompare(b.officialName, "es"));
}

export function alphaCommunityNeighbors(slug: string): { prev?: Community; next?: Community } {
  const list = alphaCommunities();
  const index = list.findIndex((item) => item.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index < list.length - 1 ? list[index + 1] : undefined,
  };
}

if (PROVINCES.length !== 50) {
  throw new Error(`Expected 50 provinces, found ${PROVINCES.length}`);
}
if (COMMUNITIES.length !== 19) {
  throw new Error(`Expected 19 communities and cities, found ${COMMUNITIES.length}`);
}
if (CONGRESS_SEAT_TOTAL !== 350) {
  throw new Error(`Congress annex sums to ${CONGRESS_SEAT_TOTAL}, not 350`);
}
