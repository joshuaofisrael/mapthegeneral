export type SourceRef = {
  id: string;
  name: string;
  url: string;
  readOn: string;
};

const READ = "2026-10-17";

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
];

export function sourceById(id: string): SourceRef {
  const found = SOURCES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing source ${id}`);
  return found;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map(sourceById);
}
