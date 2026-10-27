import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LegalCopyrightNotice } from "@/components/LegalCopyrightNotice";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/legal-entity";
import { ELECTION_WINDOWS } from "@/data/election-law";
import { RELEASE_POLICIES } from "@/data/election-policy";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Legal notice (aviso legal, note legali, nota prawna)",
  description: `Publisher details for ${SITE.name}: ${SITE.legalName}, ${SITE.location}, USA. Election-law notices and the dates this site holds back polls and results.`,
  path: "/imprint",
});

const KIND_LABEL = {
  "poll-ban": "Poll ban",
  silence: "Election silence",
  "results-embargo": "No results before polls close",
} as const;

function fmt(iso: string): string {
  return iso.replace("T", " ").replace(/:00([+-]\d\d:\d\d)$/, " (UTC$1)");
}

export default function ImprintPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Legal notice", path: "/imprint" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Legal notice" }]} />
      <PageHeader
        eyebrow="Last updated 27 October 2026"
        title="Legal notice"
        lede="Aviso legal · Note legali · Nota prawna · Publisher details"
      />
      <div className="prose-legal">
        <h2>Publisher</h2>
        <p>
          {SITE.legalName}, {SITE.entityType} (Florida Division of Corporations document number{" "}
          {SITE.sunbizDocumentNumber}, {SITE.sunbizStatus}).
          <br />
          {SITE.location}, United States.
          <br />
          <Link href="/contact/">Contact form</Link>
        </p>
        <p>
          {SITE.brandNote} The publisher is responsible for the content of this site. {SITE.name} is
          not run by, paid for by, or acting for any party, candidate, campaign, third-party campaigner
          or government. It may show Google display advertisements. It does not sell electoral
          advertising. See the <Link href="/advertising/">advertising disclosure</Link>.
        </p>
        <h2>What this site does not publish</h2>
        <ul>
          <li>
            No opinion polls or voting-intention figures. After 22:00 Israel time on 27 October 2026, the Israel
            results pages may show television channels&apos; published seat samples in a section marked unofficial.
            Official results come only from the election authority.
          </li>
          <li>
            No results or partial counts before polls close and before any later editorial hold. Counts, when shown,
            come from the official election body. On the Israel results pages, seats are an unofficial allocation
            calculated from partial official vote totals. That allocation is not final and is not an official seat
            allocation.
          </li>
          <li>No campaign material and no calls to vote for or against anyone.</li>
        </ul>
        <h2>Statutory restrictions</h2>
        <p>
          These dates come from election law that applies to publication on this site. While a window is open, the
          country’s pages show a notice and hold back the material named.
        </p>
        <ul>
          {ELECTION_WINDOWS.flatMap((item) =>
            item.rules.map((rule) => (
              <li key={`${item.id}-${rule.kind}`}>
                <strong>{item.election.en}</strong>: {KIND_LABEL[rule.kind]}, {fmt(rule.start)} to {fmt(rule.end)}.{" "}
                <a href={rule.citation.url} rel="noopener noreferrer">
                  {rule.citation.label}
                </a>
              </li>
            )),
          )}
        </ul>
        <h2>Official data-release times</h2>
        <p>A tracker does not open before the official release time for that election.</p>
        <ul>
          {ELECTION_WINDOWS.map((item) => {
            const policy = RELEASE_POLICIES[item.id];
            if (!policy) return null;
            return (
              <li key={`${item.id}-release`}>
                <strong>{item.election.en}</strong>: {fmt(policy.officialRelease.at)} ({policy.timeZone}).{" "}
                {policy.officialRelease.note}{" "}
                <a href={policy.officialRelease.citation.url} rel="noopener noreferrer">
                  {policy.officialRelease.citation.label}
                </a>
              </li>
            );
          })}
        </ul>
        <h2>Editorial policy</h2>
        <p>
          These holds are this site’s own and are separate from the statute. They can be stricter. The Victorian and
          New South Wales holds are not the Broadcasting Services Act advertising blackout. The{" "}
          <a href="https://www.acma.gov.au/election-and-referendum-blackout-periods" rel="noopener noreferrer">
            ACMA
          </a>{" "}
          says that blackout applies to broadcasters only. A missing end-of-voting confirmation, a failed or stale
          feed, or an announced polling extension does not publish a count.
        </p>
        <ul>
          {ELECTION_WINDOWS.map((item) => {
            const policy = RELEASE_POLICIES[item.id];
            if (!policy) return null;
            return (
              <li key={`${item.id}-editorial`}>
                <strong>{item.election.en}</strong>: {fmt(policy.editorial.startsAt)} to {fmt(policy.editorial.holdUntil)}.{" "}
                {policy.editorial.note}
              </li>
            );
          })}
        </ul>
        <p>
          Live result trackers open no earlier than the later of the statutory window, the official release time, and
          the editorial hold. They read only the official results service named for each election.
        </p>
        <h2>Related pages</h2>
        <p>
          <Link href="/privacy/">Privacy</Link> · <Link href="/disclaimer/">Disclaimer</Link> ·{" "}
          <Link href="/terms/">Terms</Link> · <Link href="/copyright/">Copyright</Link> ·{" "}
          <Link href="/advertising/">Advertising</Link> ·           <Link href="/about/">About</Link>
        </p>
      </div>
      <LegalCopyrightNotice />
    </div>
  );
}
