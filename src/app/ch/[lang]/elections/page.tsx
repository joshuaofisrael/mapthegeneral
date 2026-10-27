import Link from "@/components/AnchorLink";
import { ChFrame } from "../../frame";
import { asChLang } from "../../lang";
import { chMetadata } from "../../meta";
import { ELECTION_SLUG, chHome, electionPath } from "../../../../../data/ch/search";
import { sourceById, sourcesById } from "../../../../../data/ch/sources";
import { ui } from "../../../../../data/ch/ui";

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "fr" }, { lang: "it" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  return chMetadata({
    title: copy.elections,
    description:
      lang === "de"
        ? "Wahlen in der Schweiz. Volksabstimmung vom 29. November 2026 und Nationalratswahl vom 24. Oktober 2027."
        : lang === "fr"
          ? "Élections en Suisse. Votation populaire du 29 novembre 2026 et élection du Conseil national du 24 octobre 2027."
          : lang === "it"
            ? "Elezioni in Svizzera. Votazione popolare del 29 novembre 2026 ed elezione del Consiglio nazionale del 24 ottobre 2027."
            : "Elections in Switzerland. Federal popular vote of 29 November 2026 and National Council election of 24 October 2027.",
    path: `${chHome(lang)}elections/`,
    lang,
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  const path = `${chHome(lang)}elections/`;
  const office = sourceById("bk-nationalrat");
  return (
    <ChFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.switzerland, path: "/ch/" },
        { name: copy.switzerland, path: chHome(lang) },
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        lang === "de"
          ? "Diese Ausgabe veröffentlicht die Nationalratswahl vom 24. Oktober 2027. Sie ist kein Kalender aller späteren kantonalen Wahlen."
          : lang === "fr"
            ? "Cette édition publie l’élection du Conseil national du 24 octobre 2027. Ce n’est pas un calendrier de toutes les élections cantonales ultérieures."
            : lang === "it"
              ? "Questa edizione pubblica l’elezione del Consiglio nazionale del 24 ottobre 2027. Non è un calendario di tutte le elezioni cantonali successive."
              : "This release publishes the National Council election of 24 October 2027. It is not a calendar of every later cantonal election."
      }
      officeHref={office.url}
      sources={sourcesById(["admin-20250827", "sr-161-12", "bk-nationalrat"])}
    >
      <ul className="space-y-3">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={electionPath(lang)}>
            {lang === "de"
              ? "Nationalrat, 24. Oktober 2027"
              : lang === "fr"
                ? "Conseil national, 24 octobre 2027"
                : lang === "it"
                  ? "Consiglio nazionale, 24 ottobre 2027"
                  : "National Council, 24 October 2027"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {ELECTION_SLUG}. {lang === "de" ? "Verordnung vom 27. August 2025, SR 161.12." : "SR 161.12."}
          </p>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}volksabstimmung-2026-11-29/`}>
            {lang === "de"
              ? "Volksabstimmung, 29. November 2026"
              : lang === "fr"
                ? "Votation populaire, 29 novembre 2026"
                : lang === "it"
                  ? "Votazione popolare, 29 novembre 2026"
                  : "Federal popular vote, 29 November 2026"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {lang === "de"
              ? "Vier Vorlagen. Kreisschreiben des Bundesrates vom 3. September 2026."
              : lang === "fr"
                ? "Quatre objets. Circulaire du Conseil fédéral du 3 septembre 2026."
                : lang === "it"
                  ? "Quattro oggetti. Circolare del Consiglio federale del 3 settembre 2026."
                  : "Four proposals. Federal Council circular of 3 September 2026."}
          </p>
        </li>
      </ul>
    </ChFrame>
  );
}
