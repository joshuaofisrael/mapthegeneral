import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${SITE.name}, an unofficial, independent election guide for the countries covered so far.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "About" }]} />
      <PageHeader
        eyebrow="About"
        title={SITE.name}
        lede="An unofficial, independent guide to elections in the countries covered so far."
      />
      <div className="prose-legal">
        <h2>What this site is</h2>
        <p>
          {SITE.name} publishes sourced pages about elections. The first country in this release is
          Spain, including the general election called for Sunday, 29 November 2026. Pages name the
          official source and the date that source was read. Where a fact was not on a source read for
          this release, the page says so.
        </p>
        <h2>What this site is not</h2>
        <ul>
          <li>Not an official election website and not affiliated with any government or party</li>
          <li>Not legal, voting, or election-administration advice, and not a how-to</li>
          <li>Not an endorsement of any candidate, party, or list</li>
          <li>Not a political committee and not a place to give money to a campaign</li>
          <li>Not a certified-results service</li>
        </ul>
        <p>
          The United States 2026 midterm pages are on{" "}
          <a href={SITE.siblingUrl}>{SITE.siblingName}</a>.
        </p>
        <p>
          Who operates this site is stated on the <Link href="/imprint/">legal notice</Link>. Use the{" "}
          <Link href="/contact/">contact page</Link> to write in. This site does not publish a personal
          email address.
        </p>
        <p>
          Read the <Link href="/disclaimer/">disclaimer</Link>, <Link href="/privacy/">privacy policy</Link>,{" "}
          <Link href="/terms/">terms of use</Link>, <Link href="/copyright/">copyright and corrections</Link>,
          and <Link href="/advertising/">advertising disclosure</Link>.
        </p>
      </div>
    </div>
  );
}
