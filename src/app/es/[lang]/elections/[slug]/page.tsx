import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { SeatTable } from "@/components/SeatTable";
import { SpainFrame } from "@/components/SpainFrame";
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
    title: lang === "es" ? "Cortes Generales, 29 de noviembre de 2026" : "Cortes Generales, 29 November 2026",
    description:
      lang === "es"
        ? "Convocatoria, campaña, sesiones constitutivas y reparto de diputados del Real Decreto 806/2026. Información no oficial."
        : "Calling, campaign, constitutive sittings, and deputy allocation in Royal Decree 806/2026. Unofficial information.",
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
      title={es ? "Elecciones a Cortes Generales del 29 de noviembre de 2026" : "General election of 29 November 2026"}
      lede={
        es
          ? "Real Decreto 806/2026, de 5 de octubre, de disolución del Congreso de los Diputados y del Senado y de convocatoria de elecciones."
          : "Royal Decree 806/2026, of 5 October, dissolving the Congress of Deputies and the Senate and calling elections."
      }
      officeHref={jec.url}
      officeLabel="Junta Electoral Central"
      sources={sourcesById(["rd-806-2026", "loreg-jec", "jec-generales-2026", "jec-calendario", "jec-candidaturas", "congreso", "senado"])}
    >
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
