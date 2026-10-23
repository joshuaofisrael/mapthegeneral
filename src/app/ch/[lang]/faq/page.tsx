import { JsonLd } from "@/components/JsonLd";
import { ChFrame } from "../../frame";
import { asChLang } from "../../lang";
import { chMetadata } from "../../meta";
import { chHome } from "../../../../../data/ch/search";
import { sourceById, sourcesById } from "../../../../../data/ch/sources";
import type { ChLang } from "../../../../../data/ch/types";
import { ui } from "../../../../../data/ch/ui";
import { faqJsonLd } from "@/lib/format";

const FAQ: Record<ChLang, { question: string; answer: string }[]> = {
  de: [
    {
      question: "Wann sind die nächsten Nationalratswahlen?",
      answer: "Die Medienmitteilung des Bundesrates vom 27. August 2025 nennt die Nationalratswahlen vom 24. Oktober 2027.",
    },
    {
      question: "Wie viele Sitze hat der Nationalrat?",
      answer: "Artikel 149 der Bundesverfassung setzt 200 Sitze. Artikel 1 der Verordnung vom 27. August 2025 verteilt diese 200 Sitze auf die Kantone. Die Summe ist 200.",
    },
    {
      question: "Wie viele Sitze hat der Ständerat?",
      answer:
        "Artikel 150 setzt 46 Sitze. Sechs Kantone wählen eine Person, die übrigen zwei. Die Wahl regelt der Kanton, nicht das Bundesrecht der Nationalratswahl.",
    },
    {
      question: "Gibt es schon Kandidaturen für 2027?",
      answer: "Am 17. Oktober 2026 lag keine amtliche Liste vor, die diese Seiten abdrucken. Es werden keine Namen eingesetzt.",
    },
    {
      question: "Ruft diese Website ein Ergebnis aus?",
      answer: "Nein. Die Ergebnisseite druckt die Mandatstabelle des BFS für 2023 und sagt, dass es für 2027 noch kein Ergebnis gibt.",
    },
  ],
  fr: [
    {
      question: "Quand a lieu la prochaine élection du Conseil national ?",
      answer: "Le communiqué du Conseil fédéral du 27 août 2025 nomme l’élection du Conseil national du 24 octobre 2027.",
    },
    {
      question: "Combien de sièges compte le Conseil national ?",
      answer:
        "L’article 149 de la Constitution fédérale fixe 200 sièges. L’article 1 de l’ordonnance du 27 août 2025 répartit ces 200 sièges entre les cantons. Le total est 200.",
    },
    {
      question: "Combien de sièges compte le Conseil des États ?",
      answer:
        "L’article 150 fixe 46 sièges. Six cantons élisent une personne, les autres deux. Le canton règle l’élection, pas le droit fédéral de l’élection du Conseil national.",
    },
    {
      question: "Y a-t-il déjà des candidatures pour 2027 ?",
      answer: "Le 17 octobre 2026, aucune liste officielle n’était disponible pour être reproduite. Aucun nom n’est ajouté.",
    },
    {
      question: "Ce site proclame-t-il un résultat ?",
      answer: "Non. La page des résultats imprime le tableau des mandats de l’OFS pour 2023 et dit qu’il n’y a pas encore de résultat pour 2027.",
    },
  ],
  it: [
    {
      question: "Quando si svolge la prossima elezione del Consiglio nazionale?",
      answer: "Il comunicato del Consiglio federale del 27 agosto 2025 indica l’elezione del Consiglio nazionale del 24 ottobre 2027.",
    },
    {
      question: "Quanti seggi ha il Consiglio nazionale?",
      answer:
        "L’articolo 149 della Costituzione federale fissa 200 seggi. L’articolo 1 dell’ordinanza del 27 agosto 2025 ripartisce questi 200 seggi fra i cantoni. La somma è 200.",
    },
    {
      question: "Quanti seggi ha il Consiglio degli Stati?",
      answer:
        "L’articolo 150 fissa 46 seggi. Sei cantoni eleggono una persona, gli altri due. L’elezione la regola il cantone, non il diritto federale dell’elezione del Consiglio nazionale.",
    },
    {
      question: "Ci sono già candidature per il 2027?",
      answer: "Il 17 ottobre 2026 non c’era una lista ufficiale da riprodurre. Non si inseriscono nomi.",
    },
    {
      question: "Questo sito proclama un risultato?",
      answer: "No. La pagina dei risultati stampa la tabella dei mandati dell’UST per il 2023 e dice che per il 2027 non c’è ancora un risultato.",
    },
  ],
  en: [
    {
      question: "When is the next National Council election?",
      answer: "The Federal Council release of 27 August 2025 names the National Council election of 24 October 2027.",
    },
    {
      question: "How many seats does the National Council have?",
      answer:
        "Article 149 of the Federal Constitution sets 200 seats. Article 1 of the ordinance of 27 August 2025 allocates those 200 seats among the cantons. The total is 200.",
    },
    {
      question: "How many seats does the Council of States have?",
      answer:
        "Article 150 sets 46 seats. Six cantons elect one person and the others elect two. The canton regulates that election, not the federal law of the National Council election.",
    },
    {
      question: "Are there candidacies for 2027 yet?",
      answer: "On 17 October 2026 no official list was available to reprint. No names are added.",
    },
    {
      question: "Does this site call a result?",
      answer: "No. The results page prints the BFS mandate table for 2023 and says there is no result yet for 2027.",
    },
  ],
};

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "fr" }, { lang: "it" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  return chMetadata({
    title:
      lang === "fr"
        ? "Questions fréquentes, Suisse"
        : lang === "it"
          ? "Domande frequenti, Svizzera"
          : lang === "en"
            ? "Switzerland FAQ"
            : copy.faq,
    description:
      lang === "de"
        ? "Kurze Antworten zur Nationalratswahl vom 24. Oktober 2027, gebunden an Verfassung, Verordnung und Bundesrat."
        : lang === "fr"
          ? "Réponses courtes sur l’élection du Conseil national du 24 octobre 2027, liées à la Constitution, à l’ordonnance et au Conseil fédéral."
          : lang === "it"
            ? "Risposte brevi sull’elezione del Consiglio nazionale del 24 ottobre 2027, legate a Costituzione, ordinanza e Consiglio federale."
            : "Short answers on the National Council election of 24 October 2027, tied to the Constitution, the ordinance, and the Federal Council.",
    path: `${chHome(lang)}faq/`,
    lang,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  const path = `${chHome(lang)}faq/`;
  const items = FAQ[lang];
  const office = sourceById("bk-nationalrat");
  return (
    <ChFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.switzerland, path: "/ch/" },
        { name: copy.switzerland, path: chHome(lang) },
        { name: copy.faq, path },
      ]}
      title={copy.faq}
      lede={
        lang === "de"
          ? "Kurze Antworten. Jede hängt an einer Quelle der Quellenseite."
          : lang === "fr"
            ? "Réponses courtes. Chacune est liée à une source de la page des sources."
            : lang === "it"
              ? "Risposte brevi. Ciascuna è legata a una fonte della pagina delle fonti."
              : "Short answers. Each one is tied to a source on the sources page."
      }
      officeHref={office.url}
      sources={sourcesById(["bv-1999", "sr-161-12", "admin-20250827", "bk-nationalrat", "wahlen-nr-2023"])}
    >
      <JsonLd data={faqJsonLd(items)} />
      <dl className="space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-serif text-xl font-semibold">{item.question}</dt>
            <dd className="mt-2 text-sm leading-6 text-ink-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </ChFrame>
  );
}
