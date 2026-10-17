import { JsonLd } from "@/components/JsonLd";
import { GermanyFrame } from "@/app/de/frame";
import { sourceById, sourcesById } from "@/data/de/sources";
import { ui } from "@/data/de/ui";
import { dePageMetadata } from "@/data/de/seo";
import { faqJsonLd } from "@/lib/format";
import {
  DE_LANGS,
  faqPath,
  germanyChooser,
  germanyHome,
  otherLang,
} from "@/data/de/paths";
import type { DeLang } from "@/data/de/types";
import { notFound } from "next/navigation";

function asDeLang(value: string): DeLang {
  if (value !== "de" && value !== "en") notFound();
  return value;
}

const FAQ = {
  de: [
    {
      question: "Wann ist die nächste Bundestagswahl?",
      answer:
        "Ein Tag ist nicht festgesetzt. Die Bundeswahlleiterin setzt den Rahmen auf den 26. Januar 2029 bis zum 25. März 2029. Der Tag muss ein Sonntag oder ein gesetzlicher Feiertag sein.",
    },
    {
      question: "Wie viele Abgeordnete hat der Bundestag?",
      answer:
        "§ 1 Absatz 1 des Bundeswahlgesetzes sagt 630. Die Pressemitteilung zum endgültigen Ergebnis 2025 nennt dieselbe Zahl.",
    },
    {
      question: "Wer ist Bundeskanzler?",
      answer:
        "Die Seite der Bundesregierung sagt, Friedrich Merz sei Bundeskanzler, seit dem 6. Mai 2025. Das ist der Stand der am 17. Oktober 2026 gelesenen Seite.",
    },
    {
      question: "Gibt es schon Bewerbungen für 2029?",
      answer:
        "Auf den am 17. Oktober 2026 gelesenen Seiten nicht. Die Bundeswahlleiterin nennt den 26. November 2027 als frühesten Zeitpunkt für die Wahlen der Bewerberinnen und Bewerber.",
    },
    {
      question: "Welche Landtagswahlen nennt der Bundesrat für 2027?",
      answer:
        "Stand 21. September 2026: Saarland und Schleswig-Holstein am 18. April, Nordrhein-Westfalen am 25. April, Bremen am 30. Mai, Niedersachsen am 26. September.",
    },
    {
      question: "Ist das eine amtliche Website?",
      answer:
        "Nein. Es ist keine amtliche Information von Joshua Israel Ventures LLC. Bitte bei der Bundeswahlleiterin oder der Wahlbehörde des Landes prüfen.",
    },
  ],
  en: [
    {
      question: "When is the next Bundestag election?",
      answer:
        "No day is set. The Federal Returning Officer places the window from 26 January 2029 to 25 March 2029. The day must be a Sunday or a statutory public holiday.",
    },
    {
      question: "How many members does the Bundestag have?",
      answer:
        "Section 1(1) of the Federal Elections Act says 630. The press release on the final 2025 result uses the same number.",
    },
    {
      question: "Who is the Federal Chancellor?",
      answer:
        "The Federal Government’s page says Friedrich Merz is Federal Chancellor, since 6 May 2025. That is the page read on 17 October 2026.",
    },
    {
      question: "Are there candidacies for 2029 yet?",
      answer:
        "Not on the pages read on 17 October 2026. The Federal Returning Officer names 26 November 2027 as the earliest date for elections of the candidates.",
    },
    {
      question: "Which Land elections does the Bundesrat list for 2027?",
      answer:
        "As of 21 September 2026: Saarland and Schleswig-Holstein on 18 April, North Rhine-Westphalia on 25 April, Bremen on 30 May, and Lower Saxony on 26 September.",
    },
    {
      question: "Is this an official website?",
      answer:
        "No. It is unofficial information from Joshua Israel Ventures LLC. Confirm it with the Federal Returning Officer or the Land election authority.",
    },
  ],
};

export function generateStaticParams() {
  return DE_LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asDeLang((await params).lang);
  const path = faqPath(lang);
  return dePageMetadata({
    title: lang === "de" ? "Fragen" : "FAQ",
    description:
      lang === "de"
        ? "Kurze Antworten zur Bundestagswahl 2029 und zum Ergebnis von 2025, gebunden an die gelesenen amtlichen Seiten."
        : "Short answers on the 2029 Bundestag election and the 2025 result, tied to the official pages that were read.",
    path,
    lang,
    alternatePath: faqPath(otherLang(lang)),
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asDeLang((await params).lang);
  const copy = ui(lang);
  const de = lang === "de";
  const path = faqPath(lang);
  const items = FAQ[lang];
  const office = sourceById("bwl-2029");
  return (
    <GermanyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.germany, path: germanyChooser() },
        { name: de ? "Deutschland" : "Germany", path: germanyHome(lang) },
        { name: copy.faq, path },
      ]}
      title={copy.faq}
      lede={
        de
          ? "Kurze Antworten. Jede hängt an einer Quelle auf der Quellenseite."
          : "Short answers. Each one hangs on a source listed on the sources page."
      }
      officeHref={office.url}
      officeLabel="Die Bundeswahlleiterin"
      sources={sourcesById(["bwl-2029", "bwahlg-1", "bwl-2025-result", "bundeskanzler", "bundesrat-landtag"])}
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
    </GermanyFrame>
  );
}
