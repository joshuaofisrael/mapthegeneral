import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: `Disclaimer for ${SITE.name}: unofficial, nonpartisan, not legal advice, and not an endorsement. ${SITE.brandSentence}`,
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
        eyebrow={`Last updated ${SITE.lastUpdated}`}
        title="Disclaimer"
        lede={`Read this before you rely on anything on ${SITE.name}.`}
      />
      <div className="prose-legal">
        <h2>Who operates this site</h2>
        <p>
          {SITE.brandNote} Any reference to “{SITE.name},” “we,” or “us” means {SITE.legalName}.
        </p>
        <h2>Informational only</h2>
        <p>
          Content is general information. It is not legal advice, not voting advice, and not
          election-administration advice. Using the site does not create a professional relationship.
          The site does not tell you how to vote.
        </p>
        <h2>Official sources control</h2>
        <p>
          We cite an official source for dates, seat counts, population figures, and chamber names, and
          we show when the source was read. We do not guarantee that a page is complete or current. If
          this site and an official source differ, the official source controls. {SITE.officialNotUs}
        </p>
        <h2>Not an official election website</h2>
        <p>
          This site is not a government website. {SITE.legalName} is not affiliated with the Junta
          Electoral Central, the Ministerio del Interior, the Instituto Nacional de Estadística, the
          Boletín Oficial del Estado, any autonomous parliament, or any other election authority.
        </p>
        <h2>Nonpartisan</h2>
        <p>
          Nothing on this site is an endorsement of a candidate, party, coalition, or list. Names and
          party labels, when an official list prints them, are identification only.
        </p>
        <h2>Results</h2>
        <p>
          Result pages stay unofficial until the authority that scrutinises the election publishes the
          count. This site does not call a race and does not invent vote totals.
        </p>
        <h2>Corrections</h2>
        <p>
          Email <a href={contactMailto()}>{SITE.email}</a> with the page address. See the{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </div>
  );
}
