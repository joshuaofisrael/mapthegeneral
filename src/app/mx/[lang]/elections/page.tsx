import Link from "@/components/AnchorLink";
import { MexicoFrame } from "@/app/mx/_components/Frame";
import { circunscripcionesPath, districtsIndexPath, mexicoHome } from "@/data/mx/paths";
import { sourceById } from "@/data/mx/sources";
import { ui } from "@/data/mx/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${mexicoHome(lang)}elections/`;
  return pageMetadata({
    title: lang === "es" ? "Elecciones en México" : "Elections in Mexico",
    description:
      lang === "es"
        ? "Índice de elecciones en las páginas de México. La próxima elección federal citada es la del 6 de junio de 2027."
        : "Index of elections on the Mexico pages. The next federal election cited is 6 June 2027.",
    path,
    lang,
    alternatePath: `${mexicoHome(lang === "es" ? "en" : "es")}elections/`,
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${mexicoHome(lang)}elections/`;
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
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        es
          ? "Esta entrega publica la elección federal de diputaciones del 6 de junio de 2027 y señala la jornada federal del 2 de junio de 2024. No es un calendario de cada elección local pasada."
          : "This release publishes the federal deputy election of 6 June 2027 and records the federal polling day of 2 June 2024. It is not a calendar of every past local election."
      }
      officeHref={ine.url}
      officeLabel="Instituto Nacional Electoral"
      sources={[ine, sourceById("ine-2024-plan")]}
    >
      <ul className="space-y-3">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}diputaciones-federales-2027/`}>
            {es ? "Diputaciones federales, 6 de junio de 2027" : "Federal deputies, 6 June 2027"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {es ? "Página del INE del Proceso Electoral Federal 2026-2027. Acuerdo INE/CG480/2026." : "INE page for the 2026-2027 federal electoral process. Agreement INE/CG480/2026."}
          </p>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={districtsIndexPath(lang)}>
            {es ? "Distritos electorales federales" : "Federal electoral districts"}
          </Link>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={circunscripcionesPath(lang)}>
            {es ? "Circunscripciones plurinominales" : "Plurinominal constituencies"}
          </Link>
        </li>
      </ul>
    </MexicoFrame>
  );
}
