import { JsonLd } from "@/components/JsonLd";
import { GbFrame } from "@/app/gb/_components/GbFrame";
import { gbLang } from "@/app/gb/_components/lang";
import { gbMetadata } from "@/data/gb/seo";
import { sourceById, sourcesById } from "@/data/gb/sources";
import { faqJsonLd } from "@/lib/format";

const FAQ = [
  {
    question: "When is the next UK general election?",
    answer:
      "The Electoral Commission schedule read on 17 October 2026 lists the UK Parliament at no later than 15 August 2029. Section 4 of the Dissolution and Calling of Parliament Act 2022 dissolves a Parliament on the fifth anniversary of the day it first met, if it has not been dissolved earlier. No polling day is fixed on this page.",
  },
  {
    question: "When was the last general election?",
    answer:
      "The UK Parliament election-results site publishes the results of the UK general election on 4 July 2024.",
  },
  {
    question: "Who is the Prime Minister?",
    answer:
      "GOV.UK says the current Prime Minister is The Rt Hon Andy Burnham MP, and that he became Prime Minister on 20 July 2026. The same site says Sir Keir Starmer was Prime Minister from 5 July 2024 to 20 July 2026.",
  },
  {
    question: "Does this site call results?",
    answer:
      "No. It copies the published 4 July 2024 count and it does not declare a winner of an election that has not been held.",
  },
  {
    question: "Is this an official website?",
    answer:
      "No. It is unofficial information from Joshua Israel Ventures LLC. Confirm it with the official election office.",
  },
];

export function generateStaticParams() {
  return [{ lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  return gbMetadata({
    title: "United Kingdom FAQ",
    description:
      "Questions about the UK Parliament election and the 4 July 2024 result, answered from the Electoral Commission, legislation.gov.uk, GOV.UK and the UK Parliament.",
    path: "/gb/en/faq/",
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  const commission = sourceById("ec-schedule");
  return (
    <GbFrame
      path="/gb/en/faq/"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "United Kingdom", path: "/gb/en/" },
        { name: "FAQ", path: "/gb/en/faq/" },
      ]}
      title="FAQ"
      lede="Short answers, each tied to a source on the sources page."
      officeHref={commission.url}
      officeLabel="Electoral Commission"
      sources={sourcesById(["dacop-s4", "ec-schedule", "ge2024-results", "govuk-pm", "govuk-burnham", "govuk-starmer"])}
    >
      <JsonLd data={faqJsonLd(FAQ)} />
      <dl className="space-y-6">
        {FAQ.map((item) => (
          <div key={item.question}>
            <dt className="font-serif text-xl font-semibold">{item.question}</dt>
            <dd className="mt-2 text-sm leading-6 text-ink-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </GbFrame>
  );
}
