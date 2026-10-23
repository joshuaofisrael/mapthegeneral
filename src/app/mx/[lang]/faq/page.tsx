import { JsonLd } from "@/components/JsonLd";
import { MexicoFrame } from "@/app/mx/_components/Frame";
import { sourceById } from "@/data/mx/sources";
import { ui } from "@/data/mx/ui";
import { mexicoHome } from "@/data/mx/paths";
import { faqJsonLd } from "@/lib/format";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

const FAQ = {
  es: [
    {
      question: "¿Cuándo es la próxima elección federal?",
      answer:
        "La página del INE del Proceso Electoral Federal 2026-2027 fija la jornada electoral el 6 de junio de 2027.",
    },
    {
      question: "¿Cuántas diputaciones se eligen?",
      answer:
        "Esa página imprime 500 diputaciones: 300 de mayoría relativa y 200 de representación proporcional. No lista senadurías para 2027.",
    },
    {
      question: "¿Hay páginas de municipios?",
      answer:
        "Sí. El catálogo mgem del INEGI, leído el 19 de octubre de 2026, tiene 2,478 filas, con las 16 alcaldías de la Ciudad de México. Cada fila está enlazada desde su entidad. Esas páginas no nombran a quien preside el ayuntamiento o la alcaldía.",
    },
    {
      question: "¿Dónde están los distritos federales?",
      answer:
        "Hay una página por cada uno de los 300 distritos uninominales, enlazada desde su entidad. La cabecera sale del descriptivo del acuerdo INE/CG875/2022 y el nombre de la diputación, del listado de la Cámara leído el 18 de octubre de 2026. Las cinco circunscripciones están en una página aparte.",
    },
    {
      question: "¿Hay candidaturas en esta web?",
      answer:
        "No. La lectura del 17 de octubre de 2026 no encontró listas proclamadas para el 6 de junio de 2027, y esta entrega no tiene fichas de candidaturas.",
    },
    {
      question: "¿Esta web da resultados?",
      answer:
        "No hay escrutinio de 2027 que mostrar. La página de resultados no canta la elección ni inventa votos. Tampoco reproduce el escrutinio de 2024.",
    },
    {
      question: "¿Es una web oficial?",
      answer:
        "No. Es información no oficial de este sitio. Hay que confirmarla con el Instituto Nacional Electoral.",
    },
  ],
  en: [
    {
      question: "When is the next federal election?",
      answer: "The INE page for the 2026-2027 federal electoral process sets polling day on 6 June 2027.",
    },
    {
      question: "How many deputies are elected?",
      answer:
        "That page prints 500 deputies: 300 by relative majority and 200 by proportional representation. It does not list Senate seats for 2027.",
    },
    {
      question: "Are there municipality pages?",
      answer:
        "Yes. The INEGI mgem catalog, read on 19 October 2026, has 2,478 rows, including the 16 alcaldías of Mexico City. Each row is linked from its entidad. Those pages do not name the person who holds the ayuntamiento or the alcaldía.",
    },
    {
      question: "Where are the federal districts?",
      answer:
        "There is a page for each of the 300 single-member districts, linked from its entidad. The cabecera comes from the descriptivo of agreement INE/CG875/2022, and the deputy’s name from the Chamber directory read on 18 October 2026. The five constituencies are on a separate page.",
    },
    {
      question: "Are there candidacies on this site?",
      answer:
        "No. The reading of 17 October 2026 did not find proclaimed lists for 6 June 2027, and this release has no candidate profiles.",
    },
    {
      question: "Does this site report results?",
      answer:
        "There is no 2027 count to show. The results page does not call the election and does not invent votes. It also does not reprint the 2024 count.",
    },
    {
      question: "Is this an official website?",
      answer:
        "No. It is unofficial information on this site. Confirm it with the National Electoral Institute.",
    },
  ],
};

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${mexicoHome(lang)}faq/`;
  return pageMetadata({
    title: lang === "es" ? "Preguntas frecuentes, México" : "Mexico FAQ",
    description:
      lang === "es"
        ? "Preguntas sobre la elección federal del 6 de junio de 2027, con respuestas tomadas de la página del INE."
        : "Questions about the federal election of 6 June 2027, answered from the INE page.",
    path,
    lang,
    alternatePath: `${mexicoHome(lang === "es" ? "en" : "es")}faq/`,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${mexicoHome(lang)}faq/`;
  const es = lang === "es";
  const items = FAQ[lang];
  const ine = sourceById("ine-2027");
  return (
    <MexicoFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.mexico, path: "/mx/" },
        { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
        { name: copy.faq, path },
      ]}
      title={copy.faq}
      lede={
        es
          ? "Respuestas cortas. La página de la elección cita el texto de donde salen."
          : "Short answers. The election page cites the text they come from."
      }
      officeHref={ine.url}
      officeLabel="Instituto Nacional Electoral"
      sources={[ine]}
    >
      <JsonLd data={faqJsonLd(items)} />
      <dl className="space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-serif text-xl font-semibold">{item.question}</dt>
            <dd className="mt-2 text-sm leading-6">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </MexicoFrame>
  );
}
