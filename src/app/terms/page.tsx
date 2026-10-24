import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LegalCopyrightNotice } from "@/components/LegalCopyrightNotice";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/legal-entity";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms for ${SITE.name}, operated by ${SITE.legalName}: information only, no warranty, Florida law, and your own risk.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Terms" }]} />
      <PageHeader
        eyebrow="Last updated 23 October 2026"
        title="Terms of Use"
        lede={`By using ${SITE.name}, you agree to these terms. If you do not agree, do not use the site.`}
      />
      <div className="prose-legal">
        <p>
          These Terms of Use are a contract between you and <strong>{SITE.legalName}</strong> (“we,”
          “us”) for use of {SITE.name} ({SITE.url}). {SITE.legalName} is a {SITE.entityType}. Business
          address: {SITE.location}, United States. The <Link href="/disclaimer/">disclaimer</Link> is
          part of these terms. The <Link href="/privacy/">privacy policy</Link>,{" "}
          <Link href="/copyright/">copyright and corrections policy</Link>, and{" "}
          <Link href="/advertising/">advertising disclosure</Link> are incorporated for the topics they
          cover.
        </p>
        <h2>Who you are dealing with</h2>
        <p>
          {SITE.brandNote} {SITE.legalName} is the only party to these terms on our side.
        </p>
        <h2>Information only</h2>
        <p>
          The site is for general information. It is not legal advice, not political advice, not
          voting advice, not election-administration advice, and not financial, investment, or tax
          advice. It does not tell you how to vote, whom to support, or how to give money. Using the
          site does not create a lawyer-client, adviser, or other professional relationship. It is not
          an official election website, is not affiliated with any government, candidate, or party,
          and does not process registration or political contributions.
        </p>
        <h2>No campaign contribution solicitation</h2>
        <p>
          {SITE.name} does not solicit campaign contributions. We do not accept money or advertising
          from candidates, campaigns, parties, or political committees. See the{" "}
          <Link href="/advertising/">advertising disclosure</Link>.
        </p>
        <h2>Accuracy and timeliness</h2>
        <p>
          We do not guarantee that any page is accurate, complete, current, or fit for a particular
          purpose. Election rules differ by country and change. A page can lag the official record.
          Before you rely on a date, a rule, a name, or a result, check the official source named on
          the page, or the election authority where you vote. If this site and an official source
          differ, the official source controls. {SITE.officialNotUs}
        </p>
        <h2>Your own risk</h2>
        <p>You use the site, and you rely on it, entirely at your own risk.</p>
        <h2>Our own words</h2>
        <p>
          Summaries, characterizations, and analysis are our own. They are not statements by a
          government, a party, a candidate, or any person named on a page. Nothing on the site is an
          endorsement.
        </p>
        <h2>Third-party links</h2>
        <p>
          Links to official offices, statutes, and other sites are for reference. We do not control
          those sites. A link is not an endorsement of the site, of the people it names, or of any
          product it shows. Those sites have their own terms.
        </p>
        <h2>Intellectual property</h2>
        <p>
          Site design and original text are owned by {SITE.legalName} unless a page says otherwise.
          Use of the content is set out on the <Link href="/copyright/">copyright page</Link>,
          including how to send a copyright notice and how corrections are logged. Notices go through
          the <Link href="/contact/">contact form</Link>.
        </p>
        <h2>Disclaimer of warranties</h2>
        <p>
          The site is provided “as is” and “as available,” without warranties of any kind, whether
          express, implied, or statutory, to the fullest extent allowed by law. We disclaim warranties
          of accuracy, timeliness, completeness, merchantability, fitness for a particular purpose,
          title, and non-infringement. We do not warrant that the site will be uninterrupted or free
          of errors.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE.legalName} and its members, managers, and
          agents are not liable for any direct, indirect, incidental, special, consequential, or
          punitive damages, or for lost profits, lost votes, or lost data, arising from use of the
          site or reliance on its content, even if we were told that such damages were possible. If a
          complete exclusion is not allowed, our total aggregate liability for all claims relating to
          the site shall not exceed one hundred U.S. dollars (US $100). Nothing here limits liability
          that cannot be limited under applicable law.
        </p>
        <h2>Indemnification</h2>
        <p>
          You will indemnify and hold harmless {SITE.legalName} and its members and agents from
          claims, damages, losses, and expenses (including reasonable attorneys’ fees) arising out of
          your use of the site, your reliance on its content, content you submit, or your violation of
          these terms, to the extent allowed by law. This indemnity does not apply to the extent a
          claim is caused by our own willful misconduct.
        </p>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Florida, United States of America,
          without regard to conflict-of-law rules, unless a mandatory consumer-protection law in your
          place of residence says otherwise. Subject to that exception, the state and federal courts
          located in Florida have exclusive jurisdiction, and you consent to that jurisdiction.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about these terms go through the <Link href="/contact/">contact page</Link>.
        </p>
        <p>
          {SITE.legalName}
          <br />
          {SITE.location}
          <br />
          United States
        </p>
      </div>
      <LegalCopyrightNotice />
    </div>
  );
}
