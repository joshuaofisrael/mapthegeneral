import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ItalyFrame } from "@/app/it/frame";
import { chietiByElectionPath, italyChooser, italyHome, otherLang } from "@/data/italy/paths";
import { italyMetadata } from "@/data/italy/seo";
import { sourceById, sourcesById } from "@/data/italy/sources";
import type { ItLang } from "@/data/italy/types";
import { ui } from "@/data/italy/ui";
import { faqJsonLd } from "@/lib/format";

const FAQ = {
  it: [
    {
      question: "Quando sono le prossime elezioni politiche?",
      answer:
        "Il 17 ottobre 2026 non risulta letto un decreto che fissi il giorno. L'articolo 60 dice che Camera e Senato sono eletti per cinque anni. L'ultima convocazione letta, il D.P.R. 21 luglio 2022, n. 97, fissa la votazione al 25 settembre 2022 e la prima riunione al 13 ottobre 2022.",
    },
    {
      question: "Quanti deputati e senatori si eleggono?",
      answer:
        "L'articolo 56 fissa 400 deputati, otto dei quali nella circoscrizione Estero. L'articolo 57 fissa 200 senatori elettivi, quattro dei quali nella circoscrizione Estero. La pagina della Camera sulla XIX legislatura ripete che i deputati sono 400.",
    },
    {
      question: "Questa pagina proclama un vincitore?",
      answer:
        "No. Le cifre del 2022 copiate dall'archivio Eligendo restano non ufficiali qui e non sono sommate in una maggioranza. Per la prossima elezione non c'è uno scrutinio.",
    },
    {
      question: "Quanti abitanti ci sono?",
      answer:
        "La pagina ISTAT sulla popolazione censuaria indica 58.943.464 persone al 31 dicembre 2024. La somma delle regioni nel file DEMO al 1° gennaio 2025 è la stessa. La cifra usata per i procedimenti elettorali è un altro decreto, non letto per questa consegna.",
    },
    {
      question: "È un sito ufficiale?",
      answer:
        "No. È informazione non ufficiale di questo sito. Va confermata con l'ufficio elettorale ufficiale.",
    },
  ],
  en: [
    {
      question: "When is the next general election?",
      answer:
        "On 17 October 2026 no decree setting the day had been read. Article 60 says the Chamber and the Senate are elected for five years. The last calling decree that was read, Decree of the President of the Republic no. 97 of 21 July 2022, sets polling for 25 September 2022 and the first sitting for 13 October 2022.",
    },
    {
      question: "How many deputies and senators are elected?",
      answer:
        "Article 56 sets 400 deputies, eight of them in the overseas constituency. Article 57 sets 200 elective senators, four of them in the overseas constituency. The Chamber’s page for the 19th legislature repeats that there are 400 deputies.",
    },
    {
      question: "Does this site declare a winner?",
      answer:
        "No. The 2022 figures copied from the Eligendo archive stay unofficial here and are not added up into a majority. There is no count for the next election.",
    },
    {
      question: "What is the population?",
      answer:
        "The ISTAT census-population page gives 58,943,464 people at 31 December 2024. The regions in the DEMO file at 1 January 2025 add up to the same figure. The figure used for elections is a different decree, which was not read for this release.",
    },
    {
      question: "Is this an official website?",
      answer:
        "No. It is unofficial information on this site. Confirm it with the official election office.",
    },
  ],
};

export function generateStaticParams() {
  return [{ lang: "it" }, { lang: "en" }];
}
export const dynamicParams = false;

function asLang(value: string): ItLang {
  if (value !== "it" && value !== "en") notFound();
  return value;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${italyHome(lang)}faq/`;
  return italyMetadata({
    title: lang === "it" ? "Domande frequenti, Italia" : "Italy FAQ",
    description:
      lang === "it"
        ? "Domande sulla Camera, sul Senato e sulla prossima elezione politica, con risposte prese dalla Costituzione e dai decreti letti."
        : "Questions about the Chamber, the Senate, and the next general election, answered from the Constitution and the decrees that were read.",
    path,
    lang,
    alternatePath: `${italyHome(otherLang(lang))}faq/`,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const it = lang === "it";
  const path = `${italyHome(lang)}faq/`;
  const items = FAQ[lang];
  const dait = sourceById("dait");
  return (
    <ItalyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.italy, path: italyChooser() },
        { name: it ? "Italia" : "Italy", path: italyHome(lang) },
        { name: copy.faq, path },
      ]}
      title={copy.faq}
      lede={it ? "Risposte corte, ciascuna legata a una fonte della pagina delle fonti." : "Short answers, each tied to a source on the sources page."}
      officeHref={dait.url}
      officeLabel="Dipartimento per gli Affari Interni e Territoriali"
      sources={sourcesById(["cost-titolo-i", "dpr-97-2022", "camera-chi-elegge", "istat-censimento", "eligendo-camera-2022"])}
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
      <p className="text-sm">
        <Link className="text-navy underline" href={chietiByElectionPath(lang)}>
          {it
            ? "Elezione suppletiva della Camera, collegio 01-Chieti, 15-16 novembre 2026"
            : "Chamber by-election, constituency 01-Chieti, 15–16 November 2026"}
        </Link>
      </p>
    </ItalyFrame>
  );
}
