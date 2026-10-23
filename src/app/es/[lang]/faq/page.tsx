import { JsonLd } from "@/components/JsonLd";
import { SpainFrame } from "@/components/SpainFrame";
import { sourceById, sourcesById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { faqJsonLd } from "@/lib/format";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { spainHome } from "@/lib/routes";

const FAQ = {
  es: [
    {
      question: "¿Cuándo son las elecciones generales?",
      answer:
        "El Real Decreto 806/2026 convoca elecciones al Congreso y al Senado para el domingo 29 de noviembre de 2026.",
    },
    {
      question: "¿Cuántos diputados se eligen?",
      answer:
        "El artículo 162 de la LOREG fija 350 diputados. El anexo del Real Decreto 806/2026 reparte ese número por circunscripción. La suma del anexo es 350.",
    },
    {
      question: "¿Ya hay candidaturas oficiales?",
      answer:
        "En la lectura del 17 de octubre de 2026, no. El calendario de la Junta Electoral Central sitúa la proclamación el 2 de noviembre de 2026 y la publicación en el BOE el 3 de noviembre de 2026.",
    },
    {
      question: "¿Esta web da resultados?",
      answer:
        "No hay escrutinio que mostrar. La página de resultados no proclama ganadores ni inventa votos.",
    },
    {
      question: "¿Es una web oficial?",
      answer:
        "No. Es información no oficial de este sitio. Hay que confirmarla con la oficina electoral oficial.",
    },
    {
      question: "¿De dónde sale la población de un municipio?",
      answer:
        "De la columna Total del periodo 2025 en la tabla 29005 del INE, «Cifras oficiales del padrón por municipio». El encabezado describe la serie como la revisión anual del Padrón a 1 de enero de cada año. Sumada por provincia, coincide con el anexo del Real Decreto 1117/2025. Seis códigos de esa tabla tienen el Total de 2025 vacío y no tienen página.",
    },
    {
      question: "¿Quién es el alcalde?",
      answer:
        "Este sitio no publica los nombres de alcaldes ni concejales. La fuente oficial de los cargos locales actuales es la Consulta de Cargos Representativos Locales del Ministerio de Política Territorial y Memoria Democrática (concejales.redsara.es/consulta).",
    },
    {
      question: "¿Cuándo son las próximas elecciones municipales?",
      answer:
        "El Real Decreto 207/2023 convocó las últimas elecciones locales para el domingo 28 de mayo de 2023. El artículo 42.3 de la LOREG las sitúa en el cuarto domingo de mayo y fija mandatos de cuatro años, así que el año que corresponde es 2027 y el mes es mayo. El 17 de octubre de 2026 no se había leído el decreto de convocatoria de 2027, y las páginas no imprimen un día de calendario.",
    },
  ],
  en: [
    {
      question: "When is the general election?",
      answer:
        "Royal Decree 806/2026 calls elections to Congress and the Senate for Sunday, 29 November 2026.",
    },
    {
      question: "How many deputies are elected?",
      answer:
        "Article 162 of the electoral law sets 350 deputies. The annex of Royal Decree 806/2026 allocates that number by constituency. The annex adds up to 350.",
    },
    {
      question: "Are there official candidacies yet?",
      answer:
        "Not in the reading of 17 October 2026. The Central Electoral Board’s calendar places proclamation on 2 November 2026 and publication in the BOE on 3 November 2026.",
    },
    {
      question: "Does this site report results?",
      answer: "There is no count to show. The results page does not declare a winner and does not invent votes.",
    },
    {
      question: "Is this an official website?",
      answer:
        "No. It is unofficial information on this site. Confirm it with the official election office.",
    },
    {
      question: "Where does a municipality’s population come from?",
      answer:
        "From the Total column for period 2025 in INE table 29005, “Cifras oficiales del padrón por municipio”. The heading describes the series as the annual revision of the municipal register at 1 January of each year. Summed by province, it matches the annex of Royal Decree 1117/2025. Six codes in that table have an empty 2025 Total and have no page.",
    },
    {
      question: "Who is the mayor?",
      answer:
        "This site does not list the names of mayors or councillors. The official source for current local officeholders is the Consulta de Cargos Representativos Locales of the Ministerio de Política Territorial y Memoria Democrática (concejales.redsara.es/consulta).",
    },
    {
      question: "When are the next municipal elections?",
      answer:
        "Royal Decree 207/2023 called the last local elections for Sunday, 28 May 2023. Article 42.3 of the electoral law places them on the fourth Sunday of May and sets a four-year mandate, so the corresponding year is 2027 and the month is May. No 2027 calling decree had been read on 17 October 2026, and the pages do not print a calendar day.",
    },
  ],
};

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${spainHome(lang)}faq/`;
  return pageMetadata({
    title: lang === "es" ? "Preguntas frecuentes, España" : "Spain FAQ",
    description:
      lang === "es"
        ? "Preguntas sobre la elección del 29 de noviembre de 2026, con respuestas tomadas de los decretos y de la Junta Electoral Central."
        : "Questions about the 29 November 2026 election, answered from the decrees and the Central Electoral Board.",
    path,
    lang,
    alternatePath: `${spainHome(lang === "es" ? "en" : "es")}faq/`,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${spainHome(lang)}faq/`;
  const es = lang === "es";
  const items = FAQ[lang];
  const jec = sourceById("jec-generales-2026");
  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: copy.faq, path },
      ]}
      title={copy.faq}
      lede={es ? "Respuestas cortas, cada una atada a una fuente de la página de fuentes." : "Short answers, each tied to a source on the sources page."}
      officeHref={jec.url}
      officeLabel="Junta Electoral Central"
      sources={sourcesById([
        "rd-806-2026",
        "loreg-jec",
        "loreg-boe",
        "jec-calendario",
        "jec-generales-2026",
        "rd-207-2023",
        "rd-1117-2025",
        "ine-29005",
        "mpt-alcaldes-2023",
      ])}
    >
      <JsonLd data={faqJsonLd(items)} />
      <dl className="space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-serif text-xl font-semibold">{item.question}</dt>
            <dd className="mt-2 text-sm leading-6 text-ink-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </SpainFrame>
  );
}
