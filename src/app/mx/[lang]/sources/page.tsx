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
    title: lang === "es" ? "Fuentes de México" : "Mexico sources",
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
            ? "Lo que no está en estas fuentes no se inventa. Siguen abiertas las lagunas de nombres de gobernantes en ejercicio, listas de candidaturas de 2027, escrutinio, cabeceras municipales y la fecha de la elección local anterior. Los distritos federales, las circunscripciones y las filas del catálogo municipal sí tienen página."
            : "What is not in these sources is not invented. Gaps for sitting executive names, 2027 candidacy lists, the count, municipal cabeceras, and the date of the previous local election stay open. The federal districts, the constituencies, and the municipal-catalog rows do have pages."}
        </p>
        <h2>{es ? "Licencias y créditos" : "Licences and attribution"}</h2>
        <p>
          {es
            ? "Fuente: INEGI, Servicio Web del Catálogo Único, recurso mgem, leído el 19 de octubre de 2026. El metadato dice «INEGI. Censo de Población y Vivienda, 2020». Hay 2,478 filas, incluidas las 16 alcaldías de la Ciudad de México. Nueve filas no traen pob_total. El campo nom_cab aparece en 37 filas y no se copia, porque no es una lista completa de cabeceras. El uso sigue los Términos de Libre Uso ya citados. Esta entrega no presenta el catálogo como un producto distinto ni como una postura del INEGI."
            : "Fuente: INEGI, Unique Catalog web service, mgem resource, read on 19 October 2026. The metadata says “INEGI. Censo de Población y Vivienda, 2020”. There are 2,478 rows, including the 16 alcaldías of Mexico City. Nine rows do not include pob_total. The nom_cab field appears on 37 rows and is not copied, because it is not a complete cabecera list. Use follows the Términos de Libre Uso already cited. This release does not present the catalog as a different product or as a position of INEGI."}
        </p>
        <p>
          {es
            ? "Los distritos federales de cada municipio salen de una comparación hecha para esta entrega. Se toma el polígono del shapefile municipal del INE, cartografía vigente desde el 1 de octubre de 2026, cuyo nombre dentro de la misma entidad coincide con el nombre del catálogo, y se superpone a los polígonos de distrito federal de esa cartografía. Un distrito se lista cuando el solapamiento pasa de un borde compartido. 2,455 filas tienen un solo emparejamiento. Dos San Juan Mixtepec y dos San Pedro Mixtepec, en Oaxaca, están repetidos y no se emparejan. Otras 19 filas no tienen un nombre único igual en el shapefile. Esos números no son una tabla del INE ni un producto del INEGI. La cartografía no imprime una licencia de reutilización. No se publican los campos ln ni pad."
            : "The federal districts on each municipality page come from a comparison made for this release. The polygon taken from the INE municipality shapefile, cartography in force from 1 October 2026, is the one whose name inside the same entidad matches the catalog name, laid over the federal-district polygons in that cartography. A district is listed when the overlap is more than a shared boundary. 2,455 rows have a single match. Two San Juan Mixtepec and two San Pedro Mixtepec, in Oaxaca, are repeated and are not matched. Another 19 rows have no unique matching name in the shapefile. Those numbers are not an INE table and not an INEGI product. The cartography does not print a reuse licence. The ln and pad fields are not published."}
        </p>
        <p>
          {es
            ? "Instituto Nacional para el Federalismo y el Desarrollo Municipal (INAFED), conjunto «Presidentas y Presidentes municipales en gobiernos actuales», publicado en datos.gob.mx. Licencia Creative Commons Atribución 4.0 Internacional. La ficha del portal imprime la última actualización el 2 de junio de 2025, 23:03 UTC. Lectura del 19 de octubre de 2026. El archivo tiene 2,475 filas. Ningún par de fechas de inicio y fin cubre ese día, y la fecha de fin más tardía es el 31 de diciembre de 2025. Por eso no se copian nombres, partidos, domicilios, teléfonos ni correos. Las claves 24059, 25019 y 25020 del catálogo no están en el archivo."
            : "Instituto Nacional para el Federalismo y el Desarrollo Municipal (INAFED), dataset “Presidentas y Presidentes municipales en gobiernos actuales”, published on datos.gob.mx. Licence: Creative Commons Attribution 4.0 International. The portal record prints the last update as 2 June 2025, 23:03 UTC. Read on 19 October 2026. The file has 2,475 rows. No pair of start and end dates covers that day, and the latest end date is 31 December 2025. Names, parties, addresses, phone numbers, and emails are therefore not copied. Catalog codes 24059, 25019, and 25020 are not in the file."}{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0</a>.
        </p>
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
            ? "Los nombres de cabecera distrital se copian del anexo 3 del acuerdo INE/CG875/2022, leído en el repositorio documental del INE el 18 de octubre de 2026. Esa ficha y los PDF del descriptivo no imprimen una licencia de reutilización. No se reproduce el anexo, ni mapas, ni imágenes. En las páginas de distrito, del shapefile de distritos federales con vigencia al 1 de octubre de 2026 solo se usa la clave de entidad y el número de distrito, para comprobar que el distrito está en la cartografía vigente. Los campos sin rótulo de cabecera no se publican."
            : "District cabecera names are copied from annex 3 of agreement INE/CG875/2022, read in the INE documentary repository on 18 October 2026. That record and the descriptivo PDFs do not print a reuse licence. The annex, the maps, and the images are not reproduced. On the district pages, only the entidad code and the district number are taken from the federal-district shapefile in force from 1 October 2026, to check that the district is in the current cartography. Fields that are not labelled as a cabecera are not published."}
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
