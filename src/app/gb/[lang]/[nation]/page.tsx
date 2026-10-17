import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { GbFrame } from "@/app/gb/_components/GbFrame";
import { gbLang } from "@/app/gb/_components/lang";
import { nationBySlug, NATIONS, POPULATION_GROWTH } from "@/data/gb/places";
import { gbMetadata } from "@/data/gb/seo";
import { sourceById, sourcesById } from "@/data/gb/sources";

export function generateStaticParams() {
  return NATIONS.map((nation) => ({ lang: "en", nation: nation.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; nation: string }> }) {
  const { lang, nation: slug } = await params;
  gbLang(lang);
  const nation = nationBySlug(slug);
  if (!nation) return {};
  return gbMetadata({
    title: nation.name,
    description: `${nation.name}: elections and officeholders copied from official pages read on 17 October 2026. Unofficial information.`,
    path: `/gb/en/${slug}/`,
  });
}

export default async function NationPage({ params }: { params: Promise<{ lang: string; nation: string }> }) {
  const { lang, nation: slug } = await params;
  gbLang(lang);
  const nation = nationBySlug(slug);
  if (!nation) notFound();
  const growth = POPULATION_GROWTH.find((row) => row.slug === slug);
  const body = nationBody(slug);
  const office = sourceById(body.officeId);
  return (
    <GbFrame
      path={`/gb/en/${slug}/`}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "United Kingdom", path: "/gb/" },
        { name: "United Kingdom", path: "/gb/en/" },
        { name: nation.name, path: `/gb/en/${slug}/` },
      ]}
      eyebrow="Nation"
      title={nation.name}
      lede={body.lede}
      officeHref={office.url}
      officeLabel={body.officeLabel}
      sources={sourcesById(body.sourceIds)}
    >
      <section className="prose-legal">
        {body.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <h2>UK Parliament election</h2>
        <p>
          Voters in {nation.name} vote in the UK Parliament election. The Electoral Commission lists that election at no
          later than 15 August 2029.{" "}
          <Link href="/gb/en/elections/general-election/">UK Parliament page</Link>
        </p>
        <h2>Population</h2>
        <p>
          The ONS mid-2024 bulletin says population growth in the year to mid-2024 was {growth?.rate} in {nation.name}.
          The bulletin text that was read does not print a headcount for {nation.name} alone.
        </p>
        <h2>Not in this release</h2>
        <GapNote
          label="Gap"
          text="Westminster constituency pages, local-authority pages, ward pages and candidate lists are not published in this release. This page does not name MPs or councillors."
        />
      </section>
    </GbFrame>
  );
}

function nationBody(slug: string): {
  lede: string;
  officeId: string;
  officeLabel: string;
  sourceIds: string[];
  paragraphs: string[];
} {
  if (slug === "england") {
    return {
      lede: "The GOV.UK devolution guidance read for this page describes devolution to Scotland, Wales and Northern Ireland. It does not describe a devolved parliament for England.",
      officeId: "ec-schedule",
      officeLabel: "Electoral Commission",
      sourceIds: ["govuk-devolution", "ec-schedule", "ec-2026-dates", "ons-mid-2024"],
      paragraphs: [
        "GOV.UK titles the guidance “Devolution: Guidance for civil servants” and describes it as explaining devolution to Scotland, Wales and Northern Ireland. The word England does not appear in the page text that was read.",
        "The Electoral Commission schedule lists English local government in May 2025, May 2026 (including London boroughs), May 2027, May 2028 and May 2029. It lists combined-authority mayoral elections in those years except May 2027, and local mayoral elections in May 2025, May 2026, May 2027 and May 2028. It lists the Mayor of London and the London Assembly, and Police and Crime Commissioners in England and Wales, in May 2028.",
        "The key-dates page sets Thursday 7 May 2026 as polling day for the 2026 elections in its timetable, and says those include local government elections and mayoral elections in England. It also says ID is required to vote in person in elections in England. This page does not repeat the registration deadlines on that timetable.",
      ],
    };
  }
  if (slug === "scotland") {
    return {
      lede: "gov.scot says John Swinney MSP was reappointed First Minister in May 2026. The Electoral Commission set Scottish Parliament polling day on Thursday 7 May 2026.",
      officeId: "gov-scot-swinney",
      officeLabel: "gov.scot",
      sourceIds: ["gov-scot-swinney", "ec-schedule", "ec-2026-dates", "govuk-devolution", "ons-mid-2024"],
      paragraphs: [
        "The gov.scot page for John Swinney MSP says he was reappointed First Minister in May 2026, and that he was appointed First Minister in May 2024. The page does not print a seat total for the Scottish Parliament.",
        "The Electoral Commission key-dates page includes Scottish Parliament elections in the elections on Thursday 7 May 2026. It says ID is not required to vote in Scottish Parliament elections. The corporate-plan table lists Scottish council elections in May 2027 and does not print a day.",
        "This page does not copy a result of the 7 May 2026 Scottish Parliament election. No results page for that election was read on 17 October 2026.",
      ],
    };
  }
  if (slug === "wales") {
    return {
      lede: "GOV.WALES lists Rt Hon Rhun ap Iorwerth MS as First Minister of Wales. The Electoral Commission set Senedd Cymru polling day on Thursday 7 May 2026.",
      officeId: "gov-wales-fm",
      officeLabel: "GOV.WALES",
      sourceIds: ["gov-wales-fm", "ec-schedule", "ec-2026-dates", "govuk-devolution", "ons-mid-2024"],
      paragraphs: [
        "The GOV.WALES page is titled “Rt Hon Rhun ap Iorwerth MS: First Minister of Wales”. The biography that was read says he was first elected as the Member for Ynys Môn in a by-election in August 2013. That page does not print the date he became First Minister.",
        "The Electoral Commission key-dates page includes Senedd Cymru elections in the elections on Thursday 7 May 2026, and says ID is not required to vote in Senedd elections. The corporate-plan table lists Welsh local government in May 2027 and does not print a day. The GOV.WALES responsibilities list includes “Senedd electoral system”.",
        "This page does not copy a result of the 7 May 2026 Senedd Cymru election. No results page for that election was read on 17 October 2026.",
      ],
    };
  }
  return {
    lede: "The Executive Office says Michelle O’Neill MLA is the First Minister and Emma Little-Pengelly MLA is the deputy First Minister. The Electoral Commission lists the Northern Ireland Assembly in May 2027.",
    officeId: "executive-office-ni",
    officeLabel: "The Executive Office",
    sourceIds: ["executive-office-ni", "ec-schedule", "ec-2026-dates", "govuk-devolution", "ons-mid-2024"],
    paragraphs: [
      "The Executive Office page says Michelle O’Neill MLA is the First Minister and Emma Little-Pengelly MLA is the deputy First Minister. It names Aisling Reilly and Pam Cameron as the Junior Ministers. It does not print a seat total for the Assembly.",
      "The Electoral Commission corporate-plan table lists the Northern Ireland Assembly and Northern Ireland local government in May 2027. It does not print a day. The key-dates page for Thursday 7 May 2026 does not list a Northern Ireland election.",
      "This page does not copy an Assembly election result. No results page was read on 17 October 2026.",
    ],
  };
}
