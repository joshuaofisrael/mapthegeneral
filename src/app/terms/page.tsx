import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms for ${SITE.name}, operated by ${SITE.legalName}: informational use, Florida law, and no campaign fundraising.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms", path: "/terms" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Terms" }]} />
      <PageHeader
        eyebrow={`Last updated ${SITE.lastUpdated}`}
        title="Terms of Use"
        lede={`By using ${SITE.name}, you agree to these terms.`}
      />
      <div className="prose-legal">
        <p>
          These Terms of Use are a contract between you and <strong>{SITE.legalName}</strong> (“we,”
          “us”) for use of {SITE.name} ({SITE.url}). {SITE.legalName} is a {SITE.entityType}. Business
          address: {SITE.location}. If you do not agree, do not use the site.
        </p>
        <h2>Who you are dealing with</h2>
        <p>
          {SITE.brandNote} {SITE.legalName} is the only party to these terms on our side.
        </p>
        <h2>Informational site</h2>
        <p>
          The site is for general information. It is not an official election website, is not
          affiliated with any government, candidate, or party, and does not process registration or
          political contributions. It is not legal or professional advice. Use is subject to the{" "}
          <Link href="/disclaimer">disclaimer</Link> and <Link href="/privacy">privacy policy</Link>.
        </p>
        <h2>No campaign contribution solicitation</h2>
        <p>
          {SITE.name} does not solicit campaign contributions. We do not accept money or advertising
          from candidates, campaigns, parties, or political committees.
        </p>
        <h2>Accuracy</h2>
        <p>
          Elections change, and a page can lag the official record. If you see an error, email{" "}
          <a href={contactMailto()}>{SITE.email}</a> with the page address.
        </p>
        <h2>Intellectual property</h2>
        <p>
          Site design and original text are owned by {SITE.legalName} unless otherwise noted. Official
          names are used for identification and do not imply endorsement. Official materials remain
          the responsibility of the offices that publish them.
        </p>
        <h2>Disclaimer of warranties</h2>
        <p>
          The site is provided “as is” and “as available,” without warranties of any kind, to the
          extent allowed by law. We do not warrant that any page is complete, current, or official.
        </p>
        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE.legalName} is not liable for damages arising
          from use of the site or reliance on its content. If a complete exclusion is not allowed, our
          total aggregate liability for all claims shall not exceed one hundred U.S. dollars (US $100).
          Nothing here limits liability that cannot be limited under applicable law.
        </p>
        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Florida, without regard to
          conflict-of-law rules, unless a mandatory consumer-protection law in your place of residence
          says otherwise. Subject to that exception, the state and federal courts located in Florida
          have jurisdiction.
        </p>
        <h2>Contact</h2>
        <p>
          {SITE.legalName}
          <br />
          {SITE.location}
          <br />
          <a href={contactMailto()}>{SITE.email}</a>
        </p>
      </div>
    </div>
  );
}
