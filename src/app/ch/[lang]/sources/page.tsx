import { ChFrame } from "../../frame";
import { asChLang } from "../../lang";
import { chMetadata } from "../../meta";
import { chHome } from "../../../../../data/ch/search";
import { SOURCES, sourceById } from "../../../../../data/ch/sources";
import { ui } from "../../../../../data/ch/ui";

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "fr" }, { lang: "it" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  return chMetadata({
    title: copy.sources,
    description:
      lang === "de"
        ? "Amtliche Quellen der Schweiz-Seiten, gelesen am 17. Oktober 2026: Bundesverfassung, Bundesblatt, Bundesrat, Bundeskanzlei, Parlament und BFS."
        : lang === "fr"
          ? "Sources officielles des pages Suisse, lues le 17 octobre 2026 : Constitution fédérale, Feuille fédérale, Conseil fédéral, Chancellerie fédérale, Parlement et OFS."
          : lang === "it"
            ? "Fonti ufficiali delle pagine Svizzera, lette il 17 ottobre 2026: Costituzione federale, Foglio federale, Consiglio federale, Cancelleria federale, Parlamento e UST."
            : "Official sources for the Switzerland pages, read on 17 October 2026: Federal Constitution, Federal Gazette, Federal Council, Federal Chancellery, Parliament, and the BFS.",
    path: `${chHome(lang)}sources/`,
    lang,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  const path = `${chHome(lang)}sources/`;
  const office = sourceById("bk-nationalrat");
  return (
    <ChFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.switzerland, path: "/ch/" },
        { name: copy.switzerland, path: chHome(lang) },
        { name: copy.sources, path },
      ]}
      title={copy.sources}
      lede={
        lang === "de"
          ? "Jede Quelle unten wurde am 17. Oktober 2026 gelesen. Presse und Wikipedia sind keine Quelle für eine Tatsache."
          : lang === "fr"
            ? "Chaque source ci-dessous a été lue le 17 octobre 2026. La presse et Wikipédia ne sont pas la source d’un fait."
            : lang === "it"
              ? "Ogni fonte sotto è stata letta il 17 ottobre 2026. Stampa e Wikipedia non sono la fonte di un fatto."
              : "Each source below was read on 17 October 2026. News reports and Wikipedia are not the source of a fact."
      }
      officeHref={office.url}
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          {lang === "de"
            ? "Was in diesen Quellen nicht steht, wird nicht erfunden. Offene Lücken: Kandidaturen 2027, kantonale Regierungen, kantonale Wahldaten, Bezirks- und Gemeindeseiten, Postleitzahl, rätoromanische Fassung, Wortlaut von Artikel 17 des Bundesgesetzes über die politischen Rechte."
            : lang === "fr"
              ? "Ce qui n’est pas dans ces sources n’est pas inventé. Lacunes ouvertes : candidatures 2027, gouvernements cantonaux, dates d’élections cantonales, pages de districts et de communes, numéro postal, version romanche, texte de l’article 17 de la loi fédérale sur les droits politiques."
              : lang === "it"
                ? "Ciò che non sta in queste fonti non è inventato. Lacune aperte: candidature 2027, governi cantonali, date delle elezioni cantonali, pagine di distretti e comuni, numero postale, versione romancia, testo dell’articolo 17 della legge federale sui diritti politici."
                : "What is not in these sources is not invented. Open gaps: 2027 candidacies, cantonal governments, cantonal election dates, district and municipality pages, postcodes, a Romansh version, and the wording of article 17 of the Federal Act on Political Rights."}
        </p>
      </div>
    </ChFrame>
  );
}
