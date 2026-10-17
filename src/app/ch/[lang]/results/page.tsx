import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { ChFrame } from "../../frame";
import { asChLang } from "../../lang";
import { chMetadata } from "../../meta";
import { NATIONAL_COUNCIL_2023, NATIONAL_COUNCIL_2023_MANDATES } from "../../../../../data/ch/results2023";
import { chHome, electionPath } from "../../../../../data/ch/search";
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
    title: copy.results,
    description:
      lang === "de"
        ? "Mandate des Nationalrats 2023, wie sie das BFS druckt. Für den 24. Oktober 2027 gibt es kein Ergebnis. Diese Seite ruft keine Wahl aus."
        : lang === "fr"
          ? "Mandats du Conseil national 2023 tels que l’OFS les imprime. Il n’y a pas de résultat pour le 24 octobre 2027. Cette page ne proclame pas d’élection."
          : lang === "it"
            ? "Mandati del Consiglio nazionale 2023 come li stampa l’UST. Non c’è un risultato per il 24 ottobre 2027. Questa pagina non proclama un’elezione."
            : "National Council mandates for 2023 as the BFS prints them. There is no result for 24 October 2027. This page does not call an election.",
    path: `${chHome(lang)}results/`,
    lang,
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  const path = `${chHome(lang)}results/`;
  const office = sourceById("wahlen-nr-2023");
  return (
    <ChFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.switzerland, path: "/ch/" },
        { name: copy.switzerland, path: chHome(lang) },
        { name: copy.results, path },
      ]}
      eyebrow={lang === "de" ? "Kein Ergebnis 2027" : lang === "fr" ? "Pas de résultat 2027" : lang === "it" ? "Nessun risultato 2027" : "No 2027 result"}
      title={copy.results}
      lede={
        lang === "de"
          ? "Die Tabelle ist die Mandatsspalte der BFS-Seite zu den Nationalratswahlen 2023. Sie ist kein Aufruf einer späteren Wahl."
          : lang === "fr"
            ? "Le tableau est la colonne des mandats de la page OFS sur l’élection du Conseil national de 2023. Ce n’est pas la proclamation d’une élection ultérieure."
            : lang === "it"
              ? "La tabella è la colonna dei mandati della pagina UST sull’elezione del Consiglio nazionale del 2023. Non è la proclamazione di un’elezione successiva."
              : "The table is the mandate column of the BFS page on the 2023 National Council election. It is not a call of a later election."
      }
      officeHref={office.url}
      sources={sourcesById(["wahlen-nr-2023", "bfs-nr-2023-table", "admin-20250827", "parlament-2023"])}
    >
      <GapNote
        label={copy.gap}
        text={
          lang === "de"
            ? "Am 17. Oktober 2026 gibt es kein Ergebnis der Nationalratswahlen vom 24. Oktober 2027. Diese Seite wird es nicht ausrufen."
            : lang === "fr"
              ? "Le 17 octobre 2026, il n’y a pas de résultat de l’élection du Conseil national du 24 octobre 2027. Cette page ne la proclamera pas."
              : lang === "it"
                ? "Il 17 ottobre 2026 non c’è un risultato dell’elezione del Consiglio nazionale del 24 ottobre 2027. Questa pagina non la proclamerà."
                : "On 17 October 2026 there is no result of the National Council election of 24 October 2027. This page will not call it."
        }
      />
      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {lang === "de" ? "Nationalrat 2023, Mandate" : lang === "fr" ? "Conseil national 2023, mandats" : lang === "it" ? "Consiglio nazionale 2023, mandati" : "National Council 2023, mandates"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          {lang === "de"
            ? `Parteinamen, Mandate, Veränderung der Mandate und Stimmenanteil so, wie sie die BFS-Seite druckt. Die Mandatsspalte summiert sich auf ${NATIONAL_COUNCIL_2023_MANDATES}. Die herunterladbare Tabelle des BFS vom 30. November 2023 bezeichnet die Zahlen als offizielle provisorische Ergebnisse. Die Seite weist darauf hin, dass die Veränderung der Mitte wegen der Fusion von CVP und BDP zur Partei «Die Mitte» im Jahr 2021 positiv ausfällt.`
            : lang === "fr"
              ? `Noms de parti, mandats, variation des mandats et part des voix tels que la page de l’OFS les imprime. La colonne des mandats totalise ${NATIONAL_COUNCIL_2023_MANDATES}. Le tableau téléchargeable de l’OFS du 30 novembre 2023 qualifie les chiffres de résultats officiels provisoires. La page signale que la variation du Centre est positive à cause de la fusion du PDC et du PBD dans le parti «Die Mitte» en 2021.`
              : lang === "it"
                ? `Nomi di partito, mandati, variazione dei mandati e quota di voti come li stampa la pagina dell’UST. La colonna dei mandati somma ${NATIONAL_COUNCIL_2023_MANDATES}. La tabella scaricabile dell’UST del 30 novembre 2023 chiama le cifre risultati ufficiali provvisori. La pagina segnala che la variazione del Centro è positiva per la fusione di PPD e PBD nel partito «Die Mitte» nel 2021.`
                : `Party names, mandates, change in mandates, and vote share as the BFS page prints them. The mandate column adds up to ${NATIONAL_COUNCIL_2023_MANDATES}. The BFS downloadable table of 30 November 2023 calls the figures official provisional results. The page notes that the change for the Centre is positive because of the 2021 merger of the CVP and the BDP into the party “Die Mitte”.`}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="fact-table">
            <thead>
              <tr>
                <th scope="col">{copy.parties}</th>
                <th scope="col">{lang === "de" ? "Mandate" : lang === "fr" ? "Mandats" : lang === "it" ? "Mandati" : "Mandates"}</th>
                <th scope="col">{lang === "de" ? "Veränderung" : lang === "fr" ? "Variation" : lang === "it" ? "Variazione" : "Change"}</th>
                <th scope="col">{lang === "de" ? "Stimmen %" : lang === "fr" ? "Voix %" : lang === "it" ? "Voti %" : "Votes %"}</th>
              </tr>
            </thead>
            <tbody>
              {NATIONAL_COUNCIL_2023.map((row) => (
                <tr key={row.party}>
                  <td>{row.party}</td>
                  <td>{row.mandates}</td>
                  <td>{row.mandateChange}</td>
                  <td>{row.voteShare}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <GapNote
        label={copy.gap}
        text={
          lang === "de"
            ? "Die Ständeratswahl von 2023 wird hier nicht nach Sitzen und Personen abgedruckt. Die Seite des Parlaments verlinkt die Ergebnisse."
            : lang === "fr"
              ? "L’élection du Conseil des États de 2023 n’est pas reproduite ici par sièges et par personnes. La page du Parlement renvoie aux résultats."
              : lang === "it"
                ? "L’elezione del Consiglio degli Stati del 2023 non è riprodotta qui per seggi e persone. La pagina del Parlamento rinvia ai risultati."
                : "The 2023 Council of States election is not reprinted here by seats and by person. The parliament page links the results."
        }
      />
      <p className="text-sm">
        <a className="text-navy underline" href={office.url} rel="noopener noreferrer">
          wahlen.admin.ch
        </a>
        {" · "}
        <Link className="text-navy underline" href={electionPath(lang)}>
          {copy.nextElection}
        </Link>
      </p>
    </ChFrame>
  );
}
