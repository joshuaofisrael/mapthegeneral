import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { SeatTable } from "@/components/SeatTable";
import { SpainFrame } from "@/components/SpainFrame";
import { EMPTY_MUNICIPALITY_TOTAL_COUNT, MUNICIPALITY_PAGE_COUNT } from "@/data/spain/municipalities";
import {
  CITIES,
  COMMUNITIES,
  CONGRESS_SEAT_TOTAL,
  PADRON_POPULATION_TOTAL,
  alphaCommunities,
} from "@/data/spain/places";
import { sourceById, sourcesById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { formatNumber } from "@/lib/format";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { communityPath, spainHome } from "@/lib/routes";

const jec = sourceById("jec-generales-2026");

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  return pageMetadata({
    title: lang === "es" ? "España" : "Spain",
    description:
      lang === "es"
        ? "Elecciones a Cortes Generales del 29 de noviembre de 2026: Congreso, Senado, comunidades autónomas, provincias y municipios. Información no oficial."
        : "Spanish general election of 29 November 2026: Congress, Senate, autonomous communities, provinces, and municipalities. Unofficial information.",
    path: spainHome(lang),
    lang,
    alternatePath: spainHome(lang === "es" ? "en" : "es"),
  });
}

export default async function SpainNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = spainHome(lang);
  const es = lang === "es";
  const sources = sourcesById([
    "rd-806-2026",
    "loreg-jec",
    "rd-1117-2025",
    "ine-29005",
    "jec-generales-2026",
    "jec-calendario",
    "jec-candidaturas",
    "moncloa-20261005",
    "congreso",
    "senado",
    "infoelectoral-home",
  ]);

  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path },
      ]}
      eyebrow={es ? "Elecciones generales · 29 de noviembre de 2026" : "General election · 29 November 2026"}
      title={es ? "España" : "Spain"}
      lede={
        es
          ? "El Real Decreto 806/2026 disuelve el Congreso y el Senado elegidos el 23 de julio de 2023 y convoca elecciones a ambas Cámaras para el domingo 29 de noviembre de 2026."
          : "Royal Decree 806/2026 dissolves the Congress and the Senate elected on 23 July 2023 and calls elections to both chambers for Sunday, 29 November 2026."
      }
      officeHref={jec.url}
      officeLabel="Junta Electoral Central"
      sources={sources}
    >
      <section className="prose-legal">
        <h2>{es ? "Convocatoria" : "The calling of the election"}</h2>
        <p>
          {es
            ? "El decreto es de 5 de octubre de 2026, del Presidente del Gobierno, previa deliberación del Consejo de Ministros de ese día. Dice que se dicta de acuerdo con el artículo 115 de la Constitución y con el artículo 42.1 de la Ley Orgánica 5/1985. Entró en vigor el día de su publicación en el BOE, el 6 de octubre de 2026 (núm. 248, BOE-A-2026-20742). Lo firma FELIPE R., y el Presidente del Gobierno, Pedro Sánchez Pérez-Castejón."
            : "The decree is dated 5 October 2026. It says it is issued under article 115 of the Constitution and article 42.1 of Organic Law 5/1985, on the proposal of the President of the Government, after the Council of Ministers deliberated that day. It entered into force on the day it was published in the BOE, 6 October 2026 (number 248, BOE-A-2026-20742). It is signed FELIPE R. and, as President of the Government, Pedro Sánchez Pérez-Castejón."}
        </p>
        <p>
          {es
            ? "La Moncloa publicó el 5 de octubre de 2026 una declaración institucional del presidente en la que anunciaba la convocatoria. Los datos de esta página salen del decreto, no de esa declaración."
            : "La Moncloa published an institutional statement by the President on 5 October 2026 announcing the call. The dates and seat counts on this page are taken from the decree, not from that statement."}
        </p>
        <ul>
          <li>
            {es
              ? "Campaña: quince días, desde las cero horas del viernes 13 de noviembre hasta las veinticuatro horas del viernes 27 de noviembre (artículo 4)."
              : "Campaign: fifteen days, from midnight at the start of Friday 13 November until 24:00 on Friday 27 November (article 4)."}
          </li>
          <li>
            {es
              ? "Sesiones constitutivas de las Cámaras resultantes: 23 de diciembre, a las diez horas (artículo 5)."
              : "Constitutive sittings of the resulting chambers: 23 December, at 10:00 (article 5)."}
          </li>
          <li>
            {es
              ? "Norma aplicable: la Ley Orgánica 5/1985 y su normativa de desarrollo (artículo 6)."
              : "The elections are governed by Organic Law 5/1985 and its implementing rules (article 6)."}
          </li>
        </ul>
        <p>
          <Link className="text-navy underline" href={`${path}elections/cortes-generales-2026/`}>
            {es ? "Página de esta elección" : "Page for this election"}
          </Link>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.congress}</h2>
        <div className="prose-legal">
          <p>
            {es
              ? "La versión de la LOREG en la Junta Electoral Central, vigente desde el 3 de julio de 2026, dice en el artículo 162 que el Congreso está formado por 350 diputados. Cada provincia tiene un mínimo de dos. Ceuta y Melilla eligen uno cada una. Los 248 restantes se reparten entre las provincias en proporción a la población de derecho. El artículo 162.4 dice que el decreto de convocatoria especifica el número de cada circunscripción. El anexo del Real Decreto 806/2026 es esa lista. La suma de las cifras del anexo es 350."
              : "The Central Electoral Board’s text of the electoral law, in force from 3 July 2026, says in article 162 that Congress has 350 deputies. Each province has a minimum of two. Ceuta and Melilla each elect one. The remaining 248 are distributed among the provinces in proportion to the registered population. Article 162.4 says the calling decree states the number for each constituency. The annex of Royal Decree 806/2026 is that list. The figures in the annex add up to 350."}
          </p>
          <p>
            {es
              ? `El artículo 163 describe el reparto de escaños: no se tienen en cuenta las candidaturas que no obtienen al menos el 3 por 100 de los votos válidos de la circunscripción; el resto se reparten por cocientes sucesivos (1, 2, 3, y así hasta el número de escaños). En Ceuta y Melilla, el artículo 163.2 dice que es proclamado electo el candidato con más votos. Esta página no reproduce el ejemplo numérico del artículo.`
              : "Article 163 describes the allocation: candidacies with less than 3 percent of the valid votes in the constituency are left out; the rest are allocated by successive quotients (1, 2, 3, and so on, up to the number of seats). In Ceuta and Melilla, article 163.2 says the candidate with the most votes is proclaimed elected. This page does not reprint the article’s worked example."}
          </p>
          <p>
            {es
              ? `Suma de control de esta página: ${formatNumber(CONGRESS_SEAT_TOTAL, lang)} diputados en 52 circunscripciones (50 provincias, Ceuta y Melilla).`
              : `Check sum on this page: ${formatNumber(CONGRESS_SEAT_TOTAL, lang)} deputies in 52 constituencies (50 provinces, Ceuta and Melilla).`}
          </p>
        </div>
        <div className="mt-4">
          <SeatTable lang={lang} />
        </div>
      </section>

      <section className="prose-legal">
        <h2>{copy.senate}</h2>
        <p>
          {es
            ? "El artículo 3.2 del decreto, que cita el artículo 165 de la LOREG, dice que en cada circunscripción provincial se eligen cuatro senadores; en las circunscripciones insulares, tres en Gran Canaria, Mallorca y Tenerife, y uno en Ibiza, Formentera, Menorca, Fuerteventura, La Gomera, El Hierro, Lanzarote y La Palma. Ceuta y Melilla eligen dos senadores cada una. El artículo 165.2 de la versión leída en la Junta, modificado por la Ley Orgánica 2/2026, separa Ibiza y Formentera."
            : "Article 3.2 of the decree, citing article 165 of the electoral law, says each provincial constituency elects four senators; the island constituencies elect three in Gran Canaria, Mallorca and Tenerife, and one in Ibiza, Formentera, Menorca, Fuerteventura, La Gomera, El Hierro, Lanzarote and La Palma. Ceuta and Melilla each elect two senators. Article 165.2 of the text read on the Board’s site, as amended by Organic Law 2/2026, lists Ibiza and Formentera separately."}
        </p>
        <p>
          {es
            ? "El artículo 166 dice que el elector puede votar a un máximo de tres candidatos en las circunscripciones provinciales, a dos en Gran Canaria, Mallorca, Tenerife, Ceuta y Melilla, y a uno en las demás circunscripciones insulares. Son proclamados quienes obtienen más votos hasta completar los senadores de la circunscripción."
            : "Article 166 says a voter may vote for up to three candidates in provincial constituencies, two in Gran Canaria, Mallorca, Tenerife, Ceuta and Melilla, and one in the other island constituencies. The candidates with the most votes are proclaimed until the constituency’s seats are filled."}
        </p>
        <p>
          {es
            ? "El artículo 165.4 dice que las comunidades autónomas designan además un senador y otro más por cada millón de habitantes, según el censo de población de derecho vigente en las últimas elecciones generales al Senado. Esta página no calcula esa cifra."
            : "Article 165.4 says the autonomous communities also appoint one senator plus another for each million inhabitants, using the registered population at the last general election to the Senate. This page does not calculate that figure."}
        </p>
        <GapNote
          label={copy.gap}
          text={
            es
              ? "El número actual de senadores de designación autonómica no se copia aquí. El Senado lo publica en senado.es."
              : "The current number of senators appointed by the autonomous communities is not copied here. The Senate publishes it at senado.es."
          }
        />
      </section>

      <section className="prose-legal">
        <h2>{es ? "Población" : "Population"}</h2>
        <p>
          {es
            ? `El Real Decreto 1117/2025 declara oficiales las cifras del Padrón municipal a 1 de enero de 2025. El anexo no imprime un total nacional en el texto leído. La suma de las 50 provincias y de Ceuta y Melilla en ese anexo es ${formatNumber(PADRON_POPULATION_TOTAL, lang)}.`
            : `Royal Decree 1117/2025 declares official the municipal-register figures at 1 January 2025. The annex, as read, does not print a national total. The 50 provincial figures plus Ceuta and Melilla in that annex add up to ${formatNumber(PADRON_POPULATION_TOTAL, lang)}.`}
        </p>
        <p>
          {es
            ? `La tabla 29005 del INE, «Cifras oficiales del padrón por municipio», describe la serie como las cifras de la revisión anual del Padrón a 1 de enero de cada año. El Total de 2025, sumado por provincia, coincide con cada cifra provincial de ese anexo, y con Ceuta y Melilla. Hay ${formatNumber(MUNICIPALITY_PAGE_COUNT, lang)} municipios con Total de 2025 en las 50 provincias. Cada uno tiene página, enlazada desde su provincia. Ceuta y Melilla son la página de la ciudad. ${formatNumber(EMPTY_MUNICIPALITY_TOTAL_COUNT, lang)} códigos de la tabla tienen el Total de 2025 vacío y no tienen página.`
            : `INE table 29005, “Cifras oficiales del padrón por municipio”, describes the series as the figures of the annual revision of the municipal register at 1 January of each year. The 2025 Total, summed by province, matches each provincial figure in that annex, and matches Ceuta and Melilla. ${formatNumber(MUNICIPALITY_PAGE_COUNT, lang)} municipalities in the 50 provinces have a 2025 Total. Each has a page, linked from its province. Ceuta and Melilla are the city page. ${formatNumber(EMPTY_MUNICIPALITY_TOTAL_COUNT, lang)} codes in the table have an empty 2025 Total and have no page.`}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{es ? "Candidaturas y partidos" : "Candidates and parties"}</h2>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <p className="text-sm">
          <Link className="text-navy underline" href={`${path}parties/`}>
            {copy.parties}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}candidates/`}>
            {copy.candidates}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}results/`}>
            {copy.results}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}faq/`}>
            {copy.faq}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}sources/`}>
            {copy.sources}
          </Link>
        </p>
      </section>

      <LinkGrid
        heading={copy.communities}
        items={alphaCommunities().map((community) => ({
          href: communityPath(lang, community.slug),
          title: community.officialName,
          detail: community.parliamentName,
        }))}
      />
      <p className="text-sm text-ink-muted">
        {es
          ? `${COMMUNITIES.length} páginas: 17 comunidades autónomas y las ciudades de Ceuta y Melilla. ${CITIES.length === 2 ? "Ceuta y Melilla no tienen provincia." : ""}`
          : `${COMMUNITIES.length} pages: 17 autonomous communities and the cities of Ceuta and Melilla. Ceuta and Melilla have no province.`}
      </p>
    </SpainFrame>
  );
}
