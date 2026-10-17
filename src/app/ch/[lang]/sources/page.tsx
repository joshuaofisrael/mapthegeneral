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
        <h2>
          {lang === "de"
            ? "Nutzungsbedingungen und Quellenangabe"
            : lang === "fr"
              ? "Conditions d’utilisation et indication de la source"
              : lang === "it"
                ? "Condizioni d’uso e indicazione della fonte"
                : "Terms of use and attribution"}
        </h2>
        <p>
          {lang === "de"
            ? "Erlasse, Verordnungen, Mitteilungen und Entscheide von Behörden sind nach Artikel 5 des Urheberrechtsgesetzes nicht geschützt. Daten des Bundesamtes für Statistik: Quelle BFS, genutzt nach den Nutzungsbedingungen «Freie Nutzung. Quellenangabe ist Pflicht.» ("
            : lang === "fr"
              ? "Les actes législatifs, ordonnances, communiqués et décisions des autorités ne sont pas protégés selon l’article 5 de la loi sur le droit d’auteur. Données de l’Office fédéral de la statistique : source OFS, utilisées selon les conditions « Utilisation libre. Obligation d’indiquer la source. » ("
              : lang === "it"
                ? "Atti normativi, ordinanze, comunicati e decisioni delle autorità non sono protetti secondo l’articolo 5 della legge sul diritto d’autore. Dati dell’Ufficio federale di statistica: fonte UST, usati secondo le condizioni «Libera utilizzazione. Indicazione della fonte obbligatoria.» ("
                : "Enactments, ordinances, announcements and decisions of authorities are not protected under article 5 of the Copyright Act. Federal Statistical Office data: source FSO, used under the terms “Open use. Must provide the source.” ("}
          <a href="https://www.bfs.admin.ch/bfs/en/home/fso/swiss-federal-statistical-office/terms-of-use.html">
            {lang === "de" ? "BFS-Nutzungsbedingungen" : lang === "fr" ? "conditions d’utilisation de l’OFS" : lang === "it" ? "condizioni d’uso dell’UST" : "FSO terms of use"}
          </a>
          {lang === "de"
            ? "). Bilder, Logos und Wappen werden nicht übernommen."
            : lang === "fr"
              ? "). Aucune image, aucun logo ni aucune armoirie n’est reproduit."
              : lang === "it"
                ? "). Non sono riprodotti immagini, loghi o stemmi."
                : "). No images, logos or coats of arms are reproduced."}
        </p>
      </div>
    </ChFrame>
  );
}
