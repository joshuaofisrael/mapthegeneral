import { JsonLd } from "@/components/JsonLd";
import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { asCaLang } from "@/data/ca/lang";
import { canadaHome } from "@/data/ca/paths";
import { caMetadata } from "@/data/ca/seo";
import { sourceById, sourcesById } from "@/data/ca/sources";
import { ui } from "@/data/ca/ui";
import { faqJsonLd } from "@/lib/format";

const FAQ = {
  fr: [
    {
      question: "Quand a lieu la prochaine élection générale fédérale ?",
      answer:
        "Élections Canada écrit que la prochaine date fixe est le 15 octobre 2029, parce que la dernière élection générale a eu lieu le 28 avril 2025. L’article 56.1 de la Loi électorale du Canada préserve le pouvoir du gouverneur général de dissoudre le Parlement plus tôt.",
    },
    {
      question: "L’élection de 2029 est-elle convoquée ?",
      answer:
        "Non dans les sources lues le 17 octobre 2026. La date du 15 octobre 2029 est une date fixe, pas un bref.",
    },
    {
      question: "Cette page proclame-t-elle un vainqueur ?",
      answer:
        "Non. Elle recopie le tableau 7 d’Élections Canada pour le 28 avril 2025 et la position des partis de la Chambre lue le 17 octobre 2026. Elle ne déclare ni un gouvernement ni une majorité.",
    },
    {
      question: "Qui sont le premier ministre et la gouverneure générale sur les pages lues ?",
      answer:
        "La page du premier ministre est titrée « Mark Carney - Prime Minister of Canada ». La page du gouverneur général nomme Louise Arbour, assermentée le 8 juin 2026.",
    },
    {
      question: "Y a-t-il des pages de municipalités ou un code postal ?",
      answer:
        "Non dans cette livraison. Aucun jeu de données ouvert et officiel de codes postaux n’a été ajouté, et aucune liste de maires n’est copiée.",
    },
    {
      question: "Est-ce un site officiel ?",
      answer:
        "Non. C’est une information non officielle de ce site. Il faut la confirmer auprès du bureau électoral officiel.",
    },
  ],
  en: [
    {
      question: "When is the next federal general election?",
      answer:
        "Elections Canada writes that the next fixed date is 15 October 2029, because the last general election took place on 28 April 2025. Section 56.1 of the Canada Elections Act preserves the Governor General’s power to dissolve Parliament sooner.",
    },
    {
      question: "Has the 2029 election been called?",
      answer:
        "Not in the sources read on 17 October 2026. 15 October 2029 is a fixed date, not a writ.",
    },
    {
      question: "Does this site declare a winner?",
      answer:
        "No. It reprints Elections Canada table 7 for 28 April 2025 and the House standings read on 17 October 2026. It does not declare a government or a majority.",
    },
    {
      question: "Who are the Prime Minister and the Governor General on the pages that were read?",
      answer:
        "The Prime Minister’s page is titled “Mark Carney - Prime Minister of Canada”. The Governor General page names Louise Arbour, sworn in on 8 June 2026.",
    },
    {
      question: "Are there municipality pages or a postal-code search?",
      answer:
        "Not in this release. No official open postal-code dataset was added, and no list of mayors is copied.",
    },
    {
      question: "Is this an official site?",
      answer:
        "No. It is unofficial information on this site. Confirm it with the official election office.",
    },
  ],
} as const;

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  return caMetadata({
    title: lang === "fr" ? "Questions fréquentes, Canada" : "Canada FAQ",
    description:
      lang === "fr"
        ? "Questions sur la date du 15 octobre 2029, les résultats du 28 avril 2025 et le caractère non officiel de ces pages."
        : "Questions on the 15 October 2029 date, the 28 April 2025 results, and the unofficial character of these pages.",
    path: `${canadaHome(lang)}faq/`,
    lang,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const copy = ui(lang);
  const path = `${canadaHome(lang)}faq/`;
  const items = FAQ[lang];
  const office = sourceById("ec-home");
  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path: canadaHome(lang) },
        { name: copy.faq, path },
      ]}
      title={copy.faq}
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={sourcesById(["cea-56-1", "ec-briefing", "ec-table7", "hoc-standings", "pm", "gg"])}
    >
      <JsonLd data={faqJsonLd(items.map((item) => ({ question: item.question, answer: item.answer })))} />
      <div className="space-y-6">
        {items.map((item) => (
          <section key={item.question}>
            <h2 className="font-serif text-xl font-semibold">{item.question}</h2>
            <p className="mt-2 text-sm leading-6">{item.answer}</p>
          </section>
        ))}
      </div>
    </CanadaFrame>
  );
}
