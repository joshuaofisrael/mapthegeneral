import Link from "@/components/AnchorLink";
import { JsonLd } from "@/components/JsonLd";
import { ResultsTemplate } from "@/components/ResultsTemplate";
import { SpainFrame } from "@/components/SpainFrame";
import { ES_2026_RESULTS, ES_TRACKER_OPENS_AT } from "@/data/results/es-2026-generales";
import { sourceById, sourcesById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { faqJsonLd } from "@/lib/format";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { spainHome } from "@/lib/routes";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${spainHome(lang)}results/`;
  return pageMetadata({
    title:
      lang === "es"
        ? "Resultados elecciones generales 2026 en directo"
        : "Spain election results live: 29 November 2026 general election",
    description:
      lang === "es"
        ? "Resultados de las elecciones generales 2026 en directo: escrutinio del 29 de noviembre copiado del Ministerio del Interior, con hora de lectura. No oficial."
        : "Spain election results live: 29 November 2026 general election count, copied from the Ministry of the Interior with read times. Unofficial; no winner called.",
    path,
    lang,
    alternatePath: `${spainHome(lang === "es" ? "en" : "es")}results/`,
  });
}

const FAQ = {
  en: [
    {
      question: "When will Spain election results be published?",
      answer:
        "Polling day is Sunday 29 November 2026. This page shows no count before polls close in the Canary Islands, at 21:00 peninsular time. Figures are then copied from the Ministry of the Interior's results service, with the time each was read.",
    },
    {
      question: "How many seats are needed for a majority in the Congress of Deputies?",
      answer:
        "The Congress has 350 deputies under article 162 of the electoral law (LOREG). An absolute majority is 176 seats. This site copies seat numbers from the official source and does not calculate them.",
    },
    {
      question: "Are these official Spain election results?",
      answer:
        "No. Map the General is unofficial. The official source is the Ministerio del Interior (Infoelectoral). Election-night figures are provisional until the official count (escrutinio) is complete.",
    },
  ],
  es: [
    {
      question: "¿Cuándo se publican los resultados de las elecciones generales?",
      answer:
        "La votación es el domingo 29 de noviembre de 2026. Esta página no muestra escrutinio antes del cierre de los colegios en Canarias, a las 21:00 hora peninsular. Después copia las cifras del servicio de resultados del Ministerio del Interior, con la hora de lectura de cada una.",
    },
    {
      question: "¿Cuántos escaños hacen falta para la mayoría absoluta en el Congreso?",
      answer:
        "El Congreso tiene 350 diputados según el artículo 162 de la LOREG. La mayoría absoluta es de 176 escaños. Esta web copia los escaños de la fuente oficial y no los calcula.",
    },
    {
      question: "¿Son resultados oficiales?",
      answer:
        "No. Map the General no es una web oficial. La fuente oficial es el Ministerio del Interior (Infoelectoral). Las cifras de la noche electoral son provisionales hasta que termina el escrutinio oficial.",
    },
  ],
} as const;

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${spainHome(lang)}results/`;
  const es = lang === "es";
  const info = sourceById("infoelectoral-home");
  const faq = FAQ[es ? "es" : "en"];
  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: copy.results, path },
      ]}
      eyebrow={es ? "Resultados en directo · 29 de noviembre de 2026" : "Live results · 29 November 2026"}
      title={es ? "Resultados de las elecciones generales 2026 en directo" : "Spain election results live: general election, 29 November 2026"}
      lede={
        es
          ? "Esta página copiará el escrutinio oficial del Ministerio del Interior cuando empiece, con la hora de lectura. No atribuye escaños y no declara una mayoría."
          : "This page will copy the Ministry of the Interior's official count once it starts, with the time each figure was read. It does not assign seats and it does not declare a majority."
      }
      officeHref={info.url}
      officeLabel="Infoelectoral, Ministerio del Interior"
      sources={sourcesById(["infoelectoral-home", "rd-806-2026", "jec-generales-2026"])}
    >
      <JsonLd data={faqJsonLd([...faq])} />
      <ResultsTemplate data={ES_2026_RESULTS} lang={lang === "es" ? "es" : "en"} timeZone="Europe/Madrid" opensAt={ES_TRACKER_OPENS_AT} />
      <section className="rounded-xl border border-line bg-paper-card p-5 text-sm leading-6">
        <h2 className="font-serif text-xl font-semibold">{es ? "Preguntas frecuentes" : "Spain election results: questions"}</h2>
        <dl className="mt-3 space-y-3">
          {faq.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-1">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
      <p className="text-sm">
        <a className="text-navy underline" href={info.url} rel="noopener noreferrer">
          Infoelectoral
        </a>
        {" · "}
        <Link className="text-navy underline" href={`${spainHome(lang)}elections/cortes-generales-2026/`}>
          {es ? "La convocatoria" : "The calling decree"}
        </Link>
        {" · "}
        <Link className="text-navy underline" href="/results/">
          {es ? "Resultados de otras elecciones" : "All election results"}
        </Link>
      </p>
    </SpainFrame>
  );
}
