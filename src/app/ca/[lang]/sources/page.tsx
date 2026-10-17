import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { asCaLang } from "@/data/ca/lang";
import { canadaHome } from "@/data/ca/paths";
import { caMetadata } from "@/data/ca/seo";
import { SOURCES, sourceById } from "@/data/ca/sources";
import { ui } from "@/data/ca/ui";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  return caMetadata({
    title: lang === "fr" ? "Sources" : "Sources",
    description:
      lang === "fr"
        ? "Sources officielles lues le 17 octobre 2026 pour les pages du Canada."
        : "Official sources read on 17 October 2026 for the Canada pages.",
    path: `${canadaHome(lang)}sources/`,
    lang,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = `${canadaHome(lang)}sources/`;
  const office = sourceById("ec-home");
  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path: canadaHome(lang) },
        { name: copy.sources, path },
      ]}
      title={copy.sources}
      lede={
        fr
          ? "Chaque page du Canada ne cite que les sources utilisées pour ses phrases. La liste complète lue pour cette livraison est ici. La date de lecture est le 17 octobre 2026."
          : "Each Canada page cites only the sources used for its sentences. The full list read for this release is here. The read date is 17 October 2026."
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={SOURCES}
    >
      <p className="text-sm text-ink-muted">
        {fr
          ? `${SOURCES.length} sources. Les pages de municipalités et de circonscriptions ne sont pas dans cette livraison.`
          : `${SOURCES.length} sources. Municipality and electoral-district pages are not in this release.`}
      </p>
    </CanadaFrame>
  );
}
