export type SourceRef = {
  id: string;
  name: string;
  url: string;
  readOn: string;
};

const READ = "2026-10-17";
const READ_L2 = "2026-10-18";

export const SOURCES: SourceRef[] = [
  {
    id: "ine-2027",
    name: "Instituto Nacional Electoral, Proceso Electoral Federal 2026-2027",
    url: "https://ine.mx/voto-y-elecciones/elecciones-2027/",
    readOn: READ,
  },
  {
    id: "ine-2024-plan",
    name: "Instituto Nacional Electoral, Plan Integral y Calendario del Proceso Electoral Federal 2023-2024 (cuadros 1 a 3)",
    url: "https://centralelectoral.ine.mx/wp-content/uploads/2023/08/Documento_PIyCPEF-2023-2024_140723-1.pdf",
    readOn: READ,
  },
  {
    id: "ine-jornada-2024",
    name: "Central Electoral, INE, nota del 5 de junio de 2024 sobre la Jornada Electoral del 2 de junio",
    url: "https://centralelectoral.ine.mx/2024/06/05/al-concluir-la-jornada-electoral-del-2-de-junio-el-ine-continua-con-las-siguientes-etapas-del-proceso-electoral-federal-2023-2024/",
    readOn: READ,
  },
  {
    id: "inegi-catalogo",
    name: "INEGI, Servicio Web del Catálogo Único de Claves Geoestadísticas (mgee y mgem). Metadato: Censo de Población y Vivienda, 2020",
    url: "https://www.inegi.org.mx/servicios/catalogoUnico.html",
    readOn: READ,
  },
  {
    id: "ine-partidos",
    name: "Instituto Nacional Electoral, Partidos Políticos Nacionales",
    url: "https://ine.mx/actores-politicos/partidos-politicos-nacionales/",
    readOn: READ,
  },
  {
    id: "presidencia",
    name: "Presidencia de la República, presidenta.gob.mx",
    url: "https://www.presidenta.gob.mx/",
    readOn: READ,
  },
  {
    id: "presidencia-biografia",
    name: "Presidencia de la República, biografía de Claudia Sheinbaum Pardo",
    url: "https://www.presidenta.gob.mx/biografia",
    readOn: READ,
  },
  {
    id: "ine-cg875-2022",
    name: "Diario Oficial de la Federación, 20 de febrero de 2023, acuerdo INE/CG875/2022",
    url: "https://www.dof.gob.mx/nota_detalle.php?codigo=5680128&fecha=20/02/2023",
    readOn: READ_L2,
  },
  {
    id: "ine-cg875-anexo",
    name: "INE, repositorio documental, acuerdo INE/CG875/2022, anexo 3, descriptivos de distritos y cabeceras (noviembre de 2022)",
    url: "https://repositoriodocumental.ine.mx/xmlui/handle/123456789/147331",
    readOn: READ_L2,
  },
  {
    id: "ine-cg130-2023",
    name: "Diario Oficial de la Federación, acuerdo INE/CG130/2023, cinco circunscripciones plurinominales",
    url: "https://www.dof.gob.mx/nota_detalle_popup.php?codigo=5684199",
    readOn: READ_L2,
  },
  {
    id: "ine-cg526-2026",
    name: "Diario Oficial de la Federación, 5 de octubre de 2026, acuerdo INE/CG526/2026, marco geográfico electoral 2026-2027",
    url: "https://sidof.segob.gob.mx/notas/docFuente/5800306",
    readOn: READ_L2,
  },
  {
    id: "ine-cartografia-2026",
    name: "INE, cartografía para pautas de radio y televisión, shapefile Distritos Federales, vigencia a partir del 1 de octubre de 2026",
    url: "https://pautas.ine.mx/transparencia/mapas/",
    readOn: READ_L2,
  },
  {
    id: "camara-lxvi",
    name: "Cámara de Diputados, Listado de Diputados LXVI. La página imprime «Sábado 17 de Octubre, 2026»",
    url: "https://sitl.diputados.gob.mx/LXVI_leg/listado_diputados_gpnp.php",
    readOn: READ_L2,
  },
  {
    id: "lgipe",
    name: "Cámara de Diputados, Ley General de Instituciones y Procedimientos Electorales, artículos 213 y 214",
    url: "http://www.diputados.gob.mx/LeyesBiblio/pdf/LGIPE.pdf",
    readOn: READ_L2,
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
