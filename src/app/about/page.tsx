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
          this release, the page says so. Ireland, Norway and Sweden are national hubs added from official
          pages read on 23 October 2026. They have no municipality pages, no candidate names and no live tracker.
        </p>
        <h2>Images</h2>
        <p>
          The photographs on the home-page country cards, on each country hub, and at the top of election pages are
          AI-generated images. Every one is captioned “AI-generated image”. They show a public building or place
          connected with that country. They are not photographs of a real event, they contain no real people, and they
          are not official election pictures. Municipality pages do not carry them. Pages for a country without one of
          these images use the plain site card instead.
        </p>
        <h2>Editorial methods and sources</h2>
        <p>
          <strong>Last updated: 27 October 2026.</strong> Map the General Editorial Team writes the previews on the
          homepage, on each country hub, and on the election pages that carry one. The byline is the team. A personal
          name is not used on those pages.
        </p>
        <p>
          A preview states what an official page printed, and the date that page was read. A figure, a date, or a name
          that was not on a page read for the release is left out. The preview does not endorse a candidate, a party, or
          a list, and it does not tell a reader how to vote.
        </p>
        <p>
          Past results are copied from an official count. A party’s programme is that party’s own text. A preview names
          a party when an official register, an official count, or a calling instrument names it. It does not rewrite a
          programme that was not read, and it does not rank parties.
        </p>
        <p>
          These pages do not publish voting-intention figures, samples of voters leaving stations, or seat forecasts,
          including during a legal blackout. The dated windows are in the election-law table: Israel until the polls
          close on 27 October 2026, Italy from 31 October 2026 for the Chieti by-election, Spain’s five-day rule before
          29 November 2026, and the other rows in that table. When a rule is unclear, the page still prints no such
          figure.
        </p>
        <p>
          Sources are linked at the end of each preview and on the country sources page. A correction goes through the{" "}
          <Link href="/contact/">contact page</Link>. Who operates the site is stated on the{" "}
          <Link href="/imprint/">legal notice</Link>.
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
