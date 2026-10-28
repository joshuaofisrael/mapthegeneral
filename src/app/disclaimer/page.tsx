import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LegalCopyrightNotice } from "@/components/LegalCopyrightNotice";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/legal-entity";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: `Disclaimer for ${SITE.name}: information only, not advice. No warranty. ${SITE.legalName} operates the site.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Disclaimer", path: "/disclaimer" }])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Disclaimer" }]} />
      <PageHeader
        eyebrow="Last updated 23 October 2026"
        title="Disclaimer"
        lede={`Read this before you rely on anything on ${SITE.name}.`}
      />
      <div className="prose-legal">
        <h2>Who operates this site</h2>
        <p>
          {SITE.brandNote} Any reference to “{SITE.name},” “we,” or “us” means {SITE.legalName}, a{" "}
          {SITE.entityType}. Business address: {SITE.location}, United States.
        </p>
        <h2>Information only, not advice</h2>
        <p>
          Content is general information. It is not legal advice, not political advice, not voting
          advice, not election-administration advice, and not financial, investment, or tax advice.
          Using the site does not create a professional relationship. The site does not tell you how
          to vote, whom to support, or whether to give money.
        </p>
        <h2>Accuracy and timeliness</h2>
        <p>
          We do not guarantee that a page is accurate, complete, or current. Election rules differ by
          country and they change. A figure, a date, or a name on this site can be behind the official
          record. Check the official source named on the page, and the election authority where you
          vote, before you act. If this site and an official source differ, the official source
          controls. {SITE.officialNotUs}
        </p>
        <h2>Your own risk</h2>
        <p>
          You use this site at your own risk. To the extent allowed by law, {SITE.legalName} is not
          liable for damages from use of the site or reliance on it. The full warranty disclaimer,
          limitation of liability, indemnity, and Florida governing-law clause are in the{" "}
          <Link href="/terms/">terms of use</Link>.
        </p>
        <h2>Not an official election website</h2>
        <p>
          This site is not a government website. {SITE.legalName} is not affiliated with any election
          commission, interior ministry, statistical office, parliament, or other public body named on
          a page.
        </p>
        <h2>Our own analysis</h2>
        <p>
          Opinions, summaries, and analysis are our own. They are not statements by a government, a
          party, or a candidate. Nothing on this site is an endorsement of a candidate, party,
          coalition, or list. Names and party labels, when an official source prints them, are
          identification only.
        </p>
        <h2>Third-party links</h2>
        <p>
          Links leave {SITE.name}. We do not control those sites and we do not endorse them, the
          people they name, or anything they advertise.
        </p>
        <h2>Results</h2>
        <p>
          Result pages stay unofficial until the authority that scrutinises the election publishes the
          count. This site does not call a race and does not invent vote totals. Where a results page calculates
          seats from partial official vote totals, that allocation is labelled unofficial, not final, and not an
          official seat allocation.
        </p>
        <h2>No warranty</h2>
        <p>
          The site is provided “as is” and “as available,” without warranties of any kind, to the
          extent allowed by law.
        </p>
        <h2>Corrections</h2>
        <p>
          To report an error, use the contact form. The{" "}
          <Link href="/copyright/#corrections">corrections policy</Link> says how a report is handled
          and how a material correction is logged. Send copyright notices the same way, as described
          on the <Link href="/copyright/#dmca">copyright page</Link>.
        </p>
        <h2>Contact</h2>
        <p>
          {SITE.legalName}, {SITE.location}. <Link href="/contact/">Contact page</Link>.
        </p>
      </div>
      <LegalCopyrightNotice />
    </div>
  );
}
