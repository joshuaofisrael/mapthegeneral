import { JsonLd } from "@/components/JsonLd";
import { AuFrame } from "@/app/au/_components/AuFrame";
import { auPageMetadata } from "@/data/au/meta";
import { sourceById, sourcesById } from "@/data/au/sources";
import { faqJsonLd } from "@/lib/format";
import { auHome } from "@/countries/au";

const FAQ = [
  {
    question: "When is the next federal election?",
    answer:
      "The Australian Electoral Commission’s release of 23 July 2026 says it is due to be held between August 2027 and May 2028. The Commission says it does not set the date. No writ naming a polling day was read on 17 October 2026.",
  },
  {
    question: "When was the last federal election?",
    answer:
      "The Commission’s 2025 federal election page is headed Saturday 3 May 2025. It says the official results are those at the return of the writs on 12 June 2025.",
  },
  {
    question: "How many members are in the House of Representatives?",
    answer:
      "The 23 July 2026 determination says the House stays at 150 seats for the next federal election. The 2025 tally room’s state totals also add to 150.",
  },
  {
    question: "When is the Victorian state election?",
    answer:
      "The Victorian Electoral Commission and the Parliament of Victoria both print Saturday 28 November 2026. The Parliament’s timeline says nominations open on Wednesday 4 November 2026.",
  },
  {
    question: "Does this site call results?",
    answer:
      "No. The results page copies the Commission’s final House table for 3 May 2025 and does not declare a government. There is no count yet for the next federal election.",
  },
  {
    question: "Is this an official website?",
    answer:
      "No. It is unofficial information from Joshua Israel Ventures LLC. Confirm it with the official election office.",
  },
];

export const metadata = auPageMetadata({
  title: "FAQ",
  description:
    "Questions about Australia’s next federal election and the 3 May 2025 House results, answered from the Australian Electoral Commission and the Victorian Electoral Commission.",
  path: "/au/en/faq",
});

export default function AustraliaFaqPage() {
  const path = `${auHome()}faq/`;
  const aec = sourceById("aec-entitlement-2026");
  return (
    <AuFrame
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Australia", path: "/au/" },
        { name: "Australia", path: auHome() },
        { name: "FAQ", path },
      ]}
      title="FAQ"
      lede="Short answers, each tied to a source on the sources page."
      officeHref={aec.url}
      officeLabel="Australian Electoral Commission"
      sources={sourcesById(["aec-entitlement-2026", "aec-2025", "aec-tally-house-2025", "aec-timetable", "vec-state", "vic-parliament-2026"])}
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
    </AuFrame>
  );
}
