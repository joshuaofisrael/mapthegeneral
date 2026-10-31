import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LegalCopyrightNotice } from "@/components/LegalCopyrightNotice";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/legal-entity";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Advertising and affiliate disclosure",
  description: `Advertising on ${SITE.name} may include Google AdSense and Ezoic. ${SITE.legalName} does not sell political ads or endorse candidates.`,
  path: "/advertising",
});

export default function AdvertisingPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Advertising", path: "/advertising" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Advertising" }]} />
      <PageHeader
        eyebrow="Last updated 23 October 2026"
        title="Advertising and affiliate disclosure"
        lede={`${SITE.name} may show display ads. It does not sell political ads, and it does not endorse candidates or parties.`}
      />
      <div className="prose-legal">
        <h2>Who sells the ads</h2>
        <p>
          {SITE.name} may show advertisements from Google AdSense and from Ezoic Inc. Google, Ezoic
          and their partners choose and measure those ads. {SITE.legalName} does not write the ads and does not pick the advertiser
          for a particular visit. An advertisement is not an endorsement by {SITE.legalName} or by{" "}
          {SITE.name}.
        </p>
        <p>
          Cookies and the consent message for the European Economic Area, the United Kingdom, and
          Switzerland are described in the <Link href="/privacy/#advertising">privacy policy</Link>.
          That section is also written in Spanish, German, French, Italian, and Polish. This page does
          not add a second advertising consent banner. Analytics cookies are a separate choice,
          described in the privacy policy. Questions go through the{" "}
          <Link href="/contact/">contact page</Link>.
        </p>
        <h2>No paid political advertising</h2>
        <p>
          {SITE.name} does not sell political advertising. It does not accept payment from a
          candidate, a campaign, a party, a coalition, or a political committee for an ad, a label, or
          a placement. It does not accept campaign contributions. {SITE.officialNotUs}
        </p>
        <h2>No endorsements</h2>
        <p>
          {SITE.name} does not endorse any candidate, party, coalition, or list. Names and party
          labels are identification from the official source, when that source prints them. Nothing on
          an election page is a recommendation to vote, donate, or campaign. Analysis on the site is
          our own, as the <Link href="/disclaimer/">disclaimer</Link> says.
        </p>
        <h2>Affiliate links</h2>
        <p>
          This site has no affiliate links. It does not earn a commission when you follow a link. If
          an affiliate link is added later, the page will say so next to the link, and this page will
          list it.
        </p>
        <h2>Contact</h2>
        <p>
          {SITE.legalName}, {SITE.location}. Use the <Link href="/contact/">contact page</Link>.
        </p>
      </div>
      <LegalCopyrightNotice />
    </div>
  );
}
