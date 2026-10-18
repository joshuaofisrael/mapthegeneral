import { CIRCUNSCRIPCIONES } from "@/data/mx/circunscripciones";
import { DISTRICTS, padDistrict } from "@/data/mx/distritos";
import { alphaEntities, ENTITIES, entityBySlug } from "@/data/mx/entities";
import {
  circunscripcionesPath,
  districtPath,
  districtsIndexPath,
  electionPath,
  entityPath,
  mexicoHome,
  type Lang,
} from "@/data/mx/paths";

export const countryCard = {
  code: "mx",
  name: "Mexico",
  path: "/mx/",
  summary:
    "Federal midterm on Sunday, 6 June 2027: 500 seats in the Cámara de Diputados, and local elections in the 32 entidades federativas, including 17 gubernaturas on the INE page. This release has the national page, the 32 entidades, the 300 federal single-member districts with the sitting deputy and the cabecera, and the five plurinominal constituencies, in Spanish and English. Municipality pages are not in this release.",
  links: [
    { href: "/mx/en/", label: "English" },
    { href: "/mx/es/", label: "Español" },
    { href: "/mx/en/elections/diputaciones-federales-2027/", label: "6 June 2027" },
  ],
};

type IndexEntry = {
  path: string;
  lang: Lang | "en-only";
  title: string;
  kind: string;
  text: string;
};

function languageEntries(lang: Lang): IndexEntry[] {
  const home = mexicoHome(lang);
  const es = lang === "es";
  const fixed: IndexEntry[] = [
    {
      path: home,
      lang,
      title: es ? "México" : "Mexico",
      kind: "country",
      text: "México Mexico Estados Unidos Mexicanos INE 6 junio 2027",
    },
    {
      path: `${home}elections/`,
      lang,
      title: es ? "Elecciones" : "Elections",
      kind: "elections",
      text: "elecciones elections 2027 2024",
    },
    {
      path: electionPath(lang),
      lang,
      title: es ? "Diputaciones federales, 6 de junio de 2027" : "Federal deputies, 6 June 2027",
      kind: "election",
      text: "500 diputaciones 300 mayoría relativa 200 representación proporcional INE/CG480/2026",
    },
    {
      path: `${home}parties/`,
      lang,
      title: es ? "Partidos políticos nacionales" : "National political parties",
      kind: "parties",
      text: "PAN PRI PVEM PT Movimiento Ciudadano morena PAZ SOMOS",
    },
    {
      path: `${home}results/`,
      lang,
      title: es ? "Resultados" : "Results",
      kind: "results",
      text: "resultados escrutinio 2027 2024",
    },
    {
      path: `${home}faq/`,
      lang,
      title: es ? "Preguntas frecuentes" : "FAQ",
      kind: "faq",
      text: "faq preguntas 6 junio 2027",
    },
    {
      path: `${home}sources/`,
      lang,
      title: es ? "Fuentes" : "Sources",
      kind: "sources",
      text: "fuentes INE INEGI Presidencia Cámara DOF",
    },
    {
      path: districtsIndexPath(lang),
      lang,
      title: es ? "Distritos electorales federales" : "Federal electoral districts",
      kind: "districts",
      text: "300 distritos electorales federales uninominales cabecera INE",
    },
    {
      path: circunscripcionesPath(lang),
      lang,
      title: es ? "Circunscripciones plurinominales" : "Plurinominal constituencies",
      kind: "constituencies",
      text: `cinco circunscripciones ${CIRCUNSCRIPCIONES.map((item) => item.sede).join(" ")}`,
    },
  ];
  const entities = alphaEntities().map((entity) => ({
    path: entityPath(lang, entity.slug),
    lang,
    title: entity.name,
    kind: "entity",
    text: `${entity.name} ${entity.ine.heading} ${entity.code} ${entity.abbr}`,
  }));
  const districts = DISTRICTS.map((district) => {
    const entity = entityBySlug(district.entitySlug);
    const number = padDistrict(district.number);
    return {
      path: districtPath(lang, district.entitySlug, district.number),
      lang,
      title: es ? `Distrito ${number}, ${entity?.name ?? district.entitySlug}` : `District ${number}, ${entity?.name ?? district.entitySlug}`,
      kind: "district",
      text: `${entity?.name ?? ""} ${number} ${district.cabeceraLocalidad} ${district.cabeceraMunicipio} ${district.deputy.name} circunscripcion ${district.circunscripcion}`,
    };
  });
  return [...fixed, ...entities, ...districts];
}

export function indexEntries(): IndexEntry[] {
  return [
    {
      path: "/mx/",
      lang: "en-only",
      title: "Mexico",
      kind: "country",
      text: "México Mexico elecciones 6 junio 2027",
    },
    ...languageEntries("en"),
    ...languageEntries("es"),
  ];
}

export const ENTITY_COUNT = ENTITIES.length;
