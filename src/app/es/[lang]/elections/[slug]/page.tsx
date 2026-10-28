import Link from "@/components/AnchorLink";
import { NightMount } from "@/components/NightMount";
import { EditorialPreview } from "@/components/EditorialPreview";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { SeatTable } from "@/components/SeatTable";
import { SpainFrame } from "@/components/SpainFrame";
import { JsonLd } from "@/components/JsonLd";
import { SITE, absoluteUrl } from "@/data/site";
import { sourceById, sourcesById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { spainHome } from "@/lib/routes";

const SLUG = "cortes-generales-2026";

export function generateStaticParams() {
  return [
    { lang: "es", slug: SLUG },
    { lang: "en", slug: SLUG },
  ];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== SLUG) return {};
  const path = `${spainHome(lang)}elections/${SLUG}/`;
  return pageMetadata({
    title:
      lang === "es"
        ? "Elecciones generales, 29 de noviembre de 2026"
        : "Spain general election, 29 November 2026",
    description:
      lang === "es"
        ? "Elecciones a Cortes Generales, domingo 29 de noviembre de 2026, Real Decreto 806/2026. Información no oficial."
        : "Spain general election, Sunday 29 November 2026, called by Royal Decree 806/2026. Unofficial information.",
    path,
    lang,
    alternatePath: `${spainHome(lang === "es" ? "en" : "es")}elections/${SLUG}/`,
  });
}

export default async function ElectionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== SLUG) notFound();
  const copy = ui(lang);
  const path = `${spainHome(lang)}elections/${SLUG}/`;
  const es = lang === "es";
  const jec = sourceById("jec-generales-2026");
  const faq = es
    ? [
        ["¿Cuándo son las elecciones generales en España?", "El domingo 29 de noviembre de 2026, según el artículo 2 del Real Decreto 806/2026."],
        ["¿Qué cámaras se eligen?", "El Congreso de los Diputados y el Senado, las Cortes Generales."],
        ["¿Cuándo es la campaña?", "Desde las cero horas del viernes 13 de noviembre hasta las veinticuatro horas del viernes 27 de noviembre de 2026, según el artículo 4."],
        ["¿A qué hora se vota?", "El artículo 84 de la LOREG abre la votación a las nueve y la mantiene hasta las veinte horas, hora local. En Canarias el cierre es una hora después en hora peninsular, las 21:00."],
        ["¿Cuándo se constituyen las Cámaras?", "El 23 de diciembre de 2026, a las diez horas, según el artículo 5."],
        ["¿Publica este sitio sondeos?", "No. Este sitio no publica sondeos ni proyecciones."],
      ]
    : [
        ["When is the general election in Spain?", "Sunday 29 November 2026, under article 2 of Royal Decree 806/2026."],
        ["Which chambers are elected?", "The Congress of Deputies and the Senate, the Cortes Generales."],
        ["When is the campaign?", "From midnight at the start of Friday 13 November until 24:00 on Friday 27 November 2026, under article 4."],
        ["What are the voting hours?", "LOREG article 84 opens voting at 09:00 and keeps it open until 20:00 local time. In the Canary Islands that close is an hour later in peninsular time, 21:00."],
        ["When do the chambers sit for the first time?", "On 23 December 2026 at 10:00, under article 5."],
        ["Does this site publish election surveys?", "No. This site does not publish election surveys or projections."],
      ];
  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: copy.elections, path: `${spainHome(lang)}elections/` },
        { name: es ? "29 de noviembre de 2026" : "29 November 2026", path },
      ]}
      eyebrow="BOE-A-2026-20742"
      title={es ? "Elecciones generales a Cortes Generales de España, 29 de noviembre de 2026" : "Spain general election, Cortes Generales, 29 November 2026"}
      lede={
        es
          ? "Real Decreto 806/2026, de 5 de octubre, de disolución del Congreso de los Diputados y del Senado y de convocatoria de elecciones."
          : "Royal Decree 806/2026, of 5 October, dissolving the Congress of Deputies and the Senate and calling elections."
      }
      officeHref={jec.url}
      officeLabel="Junta Electoral Central"
      sources={sourcesById(["rd-806-2026", "loreg-boe", "loreg-jec", "jec-generales-2026", "jec-calendario", "jec-candidaturas", "congreso", "senado", "infoelectoral-procesos"])}
    >
      <EditorialPreview path={path} />
      <NightMount id="es-2026-generales" lang={lang} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Event",
          name: es ? "Elecciones generales a Cortes Generales de España, 29 de noviembre de 2026" : "Spain general election, Cortes Generales, 29 November 2026",
          description: es
            ? "Elecciones a Cortes Generales, domingo 29 de noviembre de 2026, Real Decreto 806/2026. Información no oficial."
            : "Spain general election, Sunday 29 November 2026, called by Royal Decree 806/2026. Unofficial information.",
          startDate: "2026-11-29T09:00:00+01:00",
          endDate: "2026-11-29T21:00:00+01:00",
          eventStatus: "https://schema.org/EventScheduled",
          eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
          image: [`${SITE.url}/images/og/es.webp`],
          location: { "@type": "Country", name: es ? "España" : "Spain", address: { "@type": "PostalAddress", addressCountry: "ES" } },
          organizer: { "@type": "Organization", name: "Junta Electoral Central", url: "https://www.juntaelectoralcentral.es/" },
          url: absoluteUrl(path),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: lang,
          mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
        }}
      />
      <section className="prose-legal">
        <h2>{es ? "Qué dice el decreto" : "What the decree says"}</h2>
        <ul>
          <li>{es ? "Artículo 1. Quedan disueltos el Congreso y el Senado elegidos el 23 de julio de 2023." : "Article 1. The Congress and the Senate elected on 23 July 2023 are dissolved."}</li>
          <li>{es ? "Artículo 2. Las elecciones a ambas Cámaras se celebrarán el domingo 29 de noviembre de 2026." : "Article 2. Elections to both chambers will be held on Sunday, 29 November 2026."}</li>
          <li>{es ? "Artículo 3. Los diputados de cada circunscripción son los del anexo. Los senadores son cuatro por circunscripción provincial; tres en Gran Canaria, Mallorca y Tenerife; uno en Ibiza, Formentera, Menorca, Fuerteventura, La Gomera, El Hierro, Lanzarote y La Palma; dos en Ceuta y dos en Melilla." : "Article 3. Deputies for each constituency are those in the annex. Senators are four for each provincial constituency; three in Gran Canaria, Mallorca and Tenerife; one in Ibiza, Formentera, Menorca, Fuerteventura, La Gomera, El Hierro, Lanzarote and La Palma; two in Ceuta and two in Melilla."}</li>
          <li>{es ? "Artículo 4. La campaña empieza a las cero horas del viernes 13 de noviembre y termina a las veinticuatro horas del viernes 27 de noviembre." : "Article 4. The campaign starts at midnight at the beginning of Friday 13 November and ends at 24:00 on Friday 27 November."}</li>
          <li>{es ? "Artículo 5. Las Cámaras se reúnen en sesión constitutiva el 23 de diciembre, a las diez horas." : "Article 5. The chambers meet in constitutive session on 23 December at 10:00."}</li>
        </ul>
        <p>
          <a href="https://www.boe.es/eli/es/rd/2026/10/05/806" rel="noopener noreferrer">
            {es ? "Texto en el BOE" : "Text in the BOE"}
          </a>
        </p>
      </section>
      <section className="prose-legal">
        <h2>{es ? "Cortes disueltas" : "The dissolved Cortes"}</h2>
        <p>
          {es
            ? "El artículo 1 disuelve el Congreso y el Senado elegidos el 23 de julio de 2023. El archivo de ese proceso está en Infoelectoral. Esta página no copia un total de votos."
            : "Article 1 dissolves the Congress and the Senate elected on 23 July 2023. The archive of that election is Infoelectoral. This page does not copy a vote total."}{" "}
          <a href="https://infoelectoral.interior.gob.es/es/elecciones-celebradas/procesos-electorales/" rel="noopener noreferrer">
            Infoelectoral
          </a>
        </p>
      </section>
      <section className="prose-legal">
        <h2>{es ? "Cómo se vota" : "How to vote"}</h2>
        <p>
          {es
            ? "El artículo 84 de la Ley Orgánica del Régimen Electoral General dispone que la votación comienza a las nueve horas y continúa hasta las veinte horas, hora local. El decreto convoca las elecciones para el domingo 29 de noviembre de 2026 y las sujeta a esa ley. El cierre en Canarias es una hora más tarde en hora peninsular."
            : "Article 84 of the Organic Law on the General Electoral System says voting starts at 09:00 and continues until 20:00 local time. The decree calls the elections for Sunday 29 November 2026 and subjects them to that law. The close in the Canary Islands is one hour later in peninsular time."}{" "}
          <a href="https://www.boe.es/eli/es/lo/1985/06/19/5/con" rel="noopener noreferrer">
            LOREG
          </a>
        </p>
        <p>
          {es
            ? "El calendario de la Junta Electoral Central y el censo se consultan en las páginas oficiales. Esta página no copia el censo ni un manual de mesa."
            : "The Central Electoral Board calendar and the electoral register are on the official pages. This page does not copy the register or a polling-station manual."}{" "}
          <a href="https://www.juntaelectoralcentral.es/cs/jec/documentos/eg2026_calendario.pdf" rel="noopener noreferrer">
            {es ? "Calendario" : "Calendar"}
          </a>
        </p>
      </section>
      <section className="prose-legal">
        <h2>{es ? "Fechas" : "Key dates"}</h2>
        <ul>
          <li>{es ? "5 de octubre de 2026: fecha del real decreto. Publicado en el BOE del 6 de octubre." : "5 October 2026: date of the royal decree. Published in the BOE of 6 October."}</li>
          <li>{es ? "Viernes 13 de noviembre de 2026, 00:00, a viernes 27 de noviembre, 24:00: campaña." : "Friday 13 November 2026, 00:00, to Friday 27 November, 24:00: campaign."}</li>
          <li>{es ? "Domingo 29 de noviembre de 2026: votación, de 09:00 a 20:00 hora local." : "Sunday 29 November 2026: voting, from 09:00 to 20:00 local time."}</li>
          <li>{es ? "23 de diciembre de 2026, 10:00: sesiones constitutivas." : "23 December 2026, 10:00: constitutive sittings."}</li>
        </ul>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-semibold">{es ? "Preguntas" : "Questions"}</h2>
        <dl className="mt-4 space-y-4">
          {faq.map(([q, a]) => (
            <div key={q}>
              <dt className="font-semibold">{q}</dt>
              <dd className="mt-1 text-sm leading-6 text-ink-muted">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-semibold">{es ? "Diputados del anexo" : "Deputies in the annex"}</h2>
        <div className="mt-4">
          <SeatTable lang={lang} />
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{es ? "Candidaturas" : "Candidacies"}</h2>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <p className="text-sm">
          <Link className="text-navy underline" href={`${spainHome(lang)}candidates/`}>
            {copy.candidates}
          </Link>
        </p>
      </section>
      <p className="text-sm">
        <Link className="text-navy underline" href={`${spainHome(lang)}results/`}>
          {copy.results}
        </Link>
      </p>
    </SpainFrame>
  );
}
