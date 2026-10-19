import Link from "@/components/AnchorLink";
import { GbFrame } from "@/app/gb/_components/GbFrame";
import { gbLang } from "@/app/gb/_components/lang";
import { gbMetadata } from "@/data/gb/seo";
import { sourceById, sourcesById } from "@/data/gb/sources";

export function generateStaticParams() {
  return [{ lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  return gbMetadata({
    title: "Elections in the United Kingdom",
    description:
      "Elections listed for the United Kingdom pages. The UK Parliament date in the Electoral Commission schedule is no later than 15 August 2029.",
    path: "/gb/en/elections/",
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  const commission = sourceById("ec-schedule");
  return (
    <GbFrame
      path="/gb/en/elections/"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "United Kingdom", path: "/gb/en/" },
        { name: "Elections", path: "/gb/en/elections/" },
      ]}
      title="Elections"
      lede="This release publishes the UK Parliament election in the Electoral Commission schedule. It is not a calendar of every local poll."
      officeHref={commission.url}
      officeLabel="Electoral Commission"
      sources={sourcesById(["ec-schedule", "ec-2026-dates", "dacop-s4"])}
    >
      <ul className="space-y-4">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href="/gb/en/elections/general-election/">
            UK Parliament, no later than 15 August 2029
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            Electoral Commission schedule, and section 4 of the Dissolution and Calling of Parliament Act 2022.
          </p>
        </li>
        <li>
          <p className="font-serif text-xl font-semibold">Thursday 7 May 2026</p>
          <p className="mt-1 text-sm text-ink-muted">
            The Electoral Commission key-dates page says this timetable is for elections on Thursday 7 May 2026, including
            local government elections, Scottish Parliament elections, Senedd Cymru elections and mayoral elections in
            England.
          </p>
        </li>
        <li>
          <p className="font-serif text-xl font-semibold">May 2027</p>
          <p className="mt-1 text-sm text-ink-muted">
            The corporate-plan table lists English local government, local mayoral elections, Scottish council elections,
            Welsh local government, the Northern Ireland Assembly and Northern Ireland local government. It does not print
            a day.
          </p>
        </li>
      </ul>
      <p className="text-sm">
        <Link className="text-navy underline" href="/gb/en/england/">
          England
        </Link>
        {" · "}
        <Link className="text-navy underline" href="/gb/en/scotland/">
          Scotland
        </Link>
        {" · "}
        <Link className="text-navy underline" href="/gb/en/wales/">
          Wales
        </Link>
        {" · "}
        <Link className="text-navy underline" href="/gb/en/northern-ireland/">
          Northern Ireland
        </Link>
      </p>
    </GbFrame>
  );
}
