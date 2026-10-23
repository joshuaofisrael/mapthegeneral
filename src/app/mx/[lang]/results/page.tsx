import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { MexicoFrame } from "@/app/mx/_components/Frame";
import { mexicoHome } from "@/data/mx/paths";
import { sourceById, sourcesById } from "@/data/mx/sources";
import { ui } from "@/data/mx/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${mexicoHome(lang)}results/`;
  return pageMetadata({
    title: lang === "es" ? "Resultados de México" : "Mexico results",
    description:
      lang === "es"
        ? "Resultados de la elección del 6 de junio de 2027. No hay escrutinio que reproducir. Esta página no canta la elección."
        : "Results of the 6 June 2027 election. There is no count to reprint. This page does not call the election.",
    path,
    lang,
    alternatePath: `${mexicoHome(lang === "es" ? "en" : "es")}results/`,
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${mexicoHome(lang)}results/`;
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
        { name: copy.results, path },
      ]}
      eyebrow={es ? "Sin escrutinio de 2027" : "No 2027 count"}
      title={es ? "Resultados" : "Results"}
      lede={
        es
          ? "Esta página espera el escrutinio oficial del 6 de junio de 2027. No atribuye escaños y no declara una mayoría."
          : "This page is waiting for the official count of 6 June 2027. It does not assign seats and it does not declare a majority."
      }
      officeHref={ine.url}
      officeLabel="Instituto Nacional Electoral"
      sources={sourcesById(["ine-2027", "ine-jornada-2024", "ine-2024-plan"])}
    >
      <GapNote label={copy.gap} text={copy.resultsGap} />
      <div className="prose-legal">
        <p>
          {es
            ? "La nota del INE del 5 de junio de 2024 da por celebrada la jornada del 2 de junio de 2024. Esta página no reproduce porcentajes, votos ni constancias de mayoría de ese proceso."
            : "The INE note of 5 June 2024 treats the polling day of 2 June 2024 as having been held. This page does not reprint percentages, votes, or majority certificates from that process."}
        </p>
      </div>
      <p className="text-sm">
        <Link className="text-navy underline" href={`${mexicoHome(lang)}elections/diputaciones-federales-2027/`}>
          {es ? "La elección de 2027" : "The 2027 election"}
        </Link>
      </p>
    </MexicoFrame>
  );
}
