import Link from "@/components/AnchorLink";
import { SpainFrame } from "@/components/SpainFrame";
import { sourceById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { spainHome } from "@/lib/routes";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${spainHome(lang)}elections/`;
  return pageMetadata({
    title: lang === "es" ? "Elecciones en España: generales, 29 de noviembre de 2026" : "Elections in Spain: general election, 29 November 2026",
    description:
      lang === "es"
        ? "Elecciones en España. La elección general a Cortes Generales está convocada para el domingo 29 de noviembre de 2026."
        : "Elections in Spain. The general election for the Cortes Generales is called for Sunday 29 November 2026.",
    path,
    lang,
    alternatePath: `${spainHome(lang === "es" ? "en" : "es")}elections/`,
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${spainHome(lang)}elections/`;
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
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        es
          ? "Esta entrega publica la elección a Cortes Generales convocada para el 29 de noviembre de 2026. No es un calendario de todas las elecciones autonómicas futuras."
          : "This release publishes the general election called for 29 November 2026. It is not a calendar of every future regional election."
      }
      officeHref={jec.url}
      officeLabel="Junta Electoral Central"
      sources={[jec, sourceById("rd-806-2026")]}
    >
      <ul className="space-y-3">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}cortes-generales-2026/`}>
            {es ? "Cortes Generales, 29 de noviembre de 2026" : "Cortes Generales, 29 November 2026"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">Real Decreto 806/2026.</p>
        </li>
      </ul>
    </SpainFrame>
  );
}
