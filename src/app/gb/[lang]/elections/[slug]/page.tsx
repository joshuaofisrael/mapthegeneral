import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { GbFrame } from "@/app/gb/_components/GbFrame";
import { gbLang } from "@/app/gb/_components/lang";
import { gbMetadata } from "@/data/gb/seo";
import { sourceById, sourcesById } from "@/data/gb/sources";

const SLUG = "general-election";

export function generateStaticParams() {
  return [{ lang: "en", slug: SLUG }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  gbLang(lang);
  if (slug !== SLUG) return {};
  return gbMetadata({
    title: "UK Parliament, no later than 15 August 2029",
    description:
      "The next UK Parliament election is listed by the Electoral Commission as no later than 15 August 2029. Section 4 of the Dissolution and Calling of Parliament Act 2022 sets automatic dissolution. Unofficial information.",
    path: "/gb/en/elections/general-election/",
  });
}

export default async function GeneralElectionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  gbLang(lang);
  if (slug !== SLUG) notFound();
  const commission = sourceById("ec-schedule");
  return (
    <GbFrame
      path="/gb/en/elections/general-election/"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "United Kingdom", path: "/gb/" },
        { name: "United Kingdom", path: "/gb/en/" },
        { name: "Elections", path: "/gb/en/elections/" },
        { name: "No later than 15 August 2029", path: "/gb/en/elections/general-election/" },
      ]}
      eyebrow="UK Parliament"
      title="UK Parliament, no later than 15 August 2029"
      lede="No source read for this page fixes a polling day. The date below is the latest date printed by the Electoral Commission."
      officeHref={commission.url}
      officeLabel="Electoral Commission"
      sources={sourcesById(["dacop-s4", "ec-schedule", "ge2024-results", "govuk-pm"])}
    >
      <section className="prose-legal">
        <h2>What the statute says</h2>
        <p>
          Section 4 of the Dissolution and Calling of Parliament Act 2022 says: “If it has not been dissolved earlier, a
          Parliament dissolves at the beginning of the day that is the fifth anniversary of the day on which it first
          met.” The section does not name a calendar day.
        </p>
        <h2>What the Electoral Commission prints</h2>
        <p>
          The corporate-plan page “The electoral system”, first published 21 March 2025 and last updated 9 April 2025,
          has a table headed “Scheduled elections in the period April 2025 to March 2030”. The last row is “No later than
          15 August 2029” and “UK Parliament”.
        </p>
        <GapNote
          label="Gap"
          text="This page does not calculate 15 August 2029 from a first-meeting date. The first-meeting date was not in section 4 or in the Electoral Commission table read on 17 October 2026."
        />
        <h2>Last general election</h2>
        <p>
          The UK Parliament election-results site publishes “Results for the UK general election on 4 July 2024”. Those
          figures are on the <Link href="/gb/en/results/">results page</Link>. They are the published count of an election
          already held. They are not a forecast.
        </p>
        <h2>Candidacies</h2>
        <GapNote
          label="Gap"
          text="No candidate list for a UK Parliament election after 4 July 2024 was read on 17 October 2026. This page does not name prospective candidates."
        />
      </section>
    </GbFrame>
  );
}
