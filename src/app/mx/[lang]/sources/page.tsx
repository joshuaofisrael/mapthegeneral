import { MexicoFrame } from "@/app/mx/_components/Frame";
import { SOURCES, sourceById } from "@/data/mx/sources";
import { mexicoHome } from "@/data/mx/paths";
import { ui } from "@/data/mx/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${mexicoHome(lang)}sources/`;
  return pageMetadata({
    title: lang === "es" ? "Fuentes" : "Sources",
    description:
      lang === "es"
        ? "Fuentes oficiales de las páginas de México: INE, INEGI, Diario Oficial, Cámara de Diputados y Presidencia, con la fecha de lectura de cada ficha."
        : "Official sources for the Mexico pages: INE, INEGI, the Official Journal, the Chamber of Deputies, and the presidency, each with the date it was read.",
    path,
    lang,
    alternatePath: `${mexicoHome(lang === "es" ? "en" : "es")}sources/`,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${mexicoHome(lang)}sources/`;
  const es = lang === "es";
  const ine = sourceById("ine-2027");
  return (
    <MexicoFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.mexico, path: "/mx/" },
        { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
        { name: copy.sources, path },
      ]}
      title={es ? "Fuentes de las páginas de México" : "Sources for the Mexico pages"}
      lede={
        es
          ? "La fecha junto a cada ficha es el día de la lectura. No se usan prensa ni Wikipedia como fuente de un hecho."
          : "The date next to each item is the day it was read. News reports and Wikipedia are not used as the source of a fact."
      }
      officeHref={ine.url}
      officeLabel="Instituto Nacional Electoral"
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          {es
            ? "Lo que no está en estas fuentes no se inventa. Siguen abiertas las lagunas de nombres de gobernantes en ejercicio, listas de candidaturas de 2027, escrutinio y municipios. Los distritos federales y las circunscripciones de esta entrega sí tienen página."
            : "What is not in these sources is not invented. Gaps for sitting executive names, 2027 candidacy lists, the count, and municipalities stay open. The federal districts and constituencies in this release do have pages."}
        </p>
        <h2>{es ? "Licencias y créditos" : "Licences and attribution"}</h2>
        <p>
          {es
            ? "Fuente: INEGI, Catálogo Único de Claves Geoestadísticas (Censo de Población y Vivienda 2020), consultado el 17 de octubre de 2026. La población y las claves de entidad se usan conforme a los "
            : "Fuente: INEGI, Catálogo Único de Claves Geoestadísticas (Censo de Población y Vivienda 2020), consulted 17 October 2026. Population and entidad codes are used under the "}
          <a href="https://www.inegi.org.mx/contenidos/inegi/doc/terminos_info.pdf">
            {es ? "Términos de Libre Uso de la Información del INEGI" : "Términos de Libre Uso de la Información del INEGI"}
          </a>
          {es
            ? ", leídos el 18 de octubre de 2026. Esos términos piden citar al INEGI como autor y la fuente de extracción. Esta página no presenta la cifra como un producto del INEGI distinto del que se cita, ni como una postura oficial del Instituto."
            : ", read on 18 October 2026. Those terms require credit to INEGI as author and the source of extraction. This page does not present the figure as an INEGI product other than the one cited, or as an official position of the Institute."}
        </p>
        <p>
          {es
            ? "Los nombres de cabecera se copian del anexo 3 del acuerdo INE/CG875/2022, leído en el repositorio documental del INE el 18 de octubre de 2026. Esa ficha y los PDF del descriptivo no imprimen una licencia de reutilización. No se reproduce el anexo, ni mapas, ni imágenes. Del shapefile de distritos federales con vigencia al 1 de octubre de 2026 solo se usa la clave de entidad y el número de distrito, para comprobar que el distrito está en la cartografía vigente. Los campos sin rótulo de cabecera no se publican."
            : "Cabecera names are copied from annex 3 of agreement INE/CG875/2022, read in the INE documentary repository on 18 October 2026. That record and the descriptivo PDFs do not print a reuse licence. The annex, the maps, and the images are not reproduced. From the federal-district shapefile in force from 1 October 2026, only the entidad code and the district number are used, to check that the district is in the current cartography. Fields that are not labelled as a cabecera are not published."}
        </p>
        <p>
          {es
            ? "Los nombres de diputadas y diputados se copian del listado público de la Cámara de Diputados, en el carácter de cargo público que esa página imprime: nombre, entidad y distrito o circunscripción. No se copian teléfono, domicilio ni correo. La página leída no imprime una licencia. No se copian los logotipos de los grupos parlamentarios. El grupo no se nombra porque en esa página es una imagen sin rótulo de texto."
            : "Names of deputies are copied from the public directory of the Chamber of Deputies, in the public office that page prints: name, entidad, and district or constituency. Phone numbers, addresses, and email are not copied. The page that was read does not print a licence. Parliamentary-group logos are not copied. The group is not named because on that page it is an image without a text label."}
        </p>
        <p>
          {es
            ? "Los acuerdos del Diario Oficial de la Federación se citan por su URL. El texto leído del acuerdo INE/CG526/2026 no incluye una licencia de reutilización. El artículo 213, párrafo 2, de la Ley General de Instituciones y Procedimientos Electorales prohíbe publicar resultados de encuestas o sondeos de opinión durante los tres días previos a la elección y hasta la hora de cierre de las casillas. La siguiente jornada federal citada es el 6 de junio de 2027, así que esa veda no está en vigor. Estas páginas no publican encuestas, proyecciones ni escrutinio."
            : "Official Journal agreements are cited by URL. The text read of agreement INE/CG526/2026 does not include a reuse licence. Article 213, paragraph 2, of the General Law of Electoral Institutions and Procedures prohibits publishing poll or survey results during the three days before the election and until polling stations close. The next federal polling day cited is 6 June 2027, so that blackout is not in force. These pages publish no polls, projections, or count."}
        </p>
        <p>
          {es
            ? "Los hechos se resumen con palabras propias y con cita de cada página. No se reproducen imágenes, logotipos ni emblemas. Map the General no está afiliado a ninguna de estas instituciones ni cuenta con su aval."
            : "Facts are reported in our own words with a citation to each page. No images, logos or emblems are reproduced. Map the General is not affiliated with any of these bodies, and they do not endorse it."}
        </p>
      </div>
    </MexicoFrame>
  );
}
