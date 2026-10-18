import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { contactMailto, SITE } from "@/data/site";
import { ELECTION_WINDOWS } from "@/data/election-law";
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
        eyebrow={`Last updated ${SITE.lastUpdated}`}
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
          Email: <a href={contactMailto()}>{SITE.email}</a> · <Link href="/contact/">Contact form</Link>
        </p>
        <p>
          {SITE.brandNote} The publisher is responsible for the content of this site. {SITE.name} is
          not run by, paid for by, or acting for any party, candidate, campaign, third-party campaigner
          or government. It carries no paid advertising and no electoral advertising.
        </p>
        <h2>What this site does not publish</h2>
        <ul>
          <li>No opinion polls, voting-intention figures, seat projections or exit polls for any country.</li>
          <li>No results or partial counts before polls close; results come only from the official election body.</li>
          <li>No campaign material and no calls to vote for or against anyone.</li>
        </ul>
        <h2>Election-law windows this site follows</h2>
        <p>
          The dates below come from each country’s election law. While a window is open, the
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
        <p>
          Live result trackers open no earlier than the close of polls and read only the official
          results service named for each election.
        </p>
        <h2>Related pages</h2>
        <p>
          <Link href="/privacy/">Privacy</Link> · <Link href="/disclaimer/">Disclaimer</Link> ·{" "}
          <Link href="/terms/">Terms</Link> · <Link href="/about/">About</Link>
        </p>
      </div>
    </div>
  );
}
