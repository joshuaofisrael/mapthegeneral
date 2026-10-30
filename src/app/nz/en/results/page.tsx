import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

const RESULTS = "https://electionresults.govt.nz/";
const PATH = "/nz/en/results";

export const metadata = pageMetadata({
  title: "New Zealand election results 2026: awaiting results",
  description:
    "Awaiting results for the New Zealand general election of 7 November 2026. No figures yet. Unofficial page; the official source is electionresults.govt.nz.",
  path: PATH,
});

export default function NzResultsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "New Zealand", path: "/nz/en/" },
          { name: "Results", path: PATH },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/nz/en/", label: "New Zealand" }, { label: "Results" }]} />
      <PageHeader
        eyebrow="Unofficial · awaiting results"
        title="New Zealand general election results, 7 November 2026"
        lede="Awaiting results. This page shows no figures yet."
      />
      <div className="prose-legal">
        <p>
          <strong>Unofficial page. Awaiting results.</strong> No vote count, seat number, poll or forecast is shown here.
          No count will be shown before 7:00 pm New Zealand daylight time on 7 November 2026, and none until the
          Electoral Commission has confirmed that voting places have closed.
        </p>
        <p>
          The official source for results is the Electoral Commission’s results site,{" "}
          <a href={RESULTS} rel="noopener">electionresults.govt.nz</a>. Any figures added to this page later will be
          labelled unofficial, with the source and the time they were read. Map the General is not an official website
          and is not affiliated with the Electoral Commission.
        </p>
        <p>
          For dates and how the election works, see the <Link href="/nz/en/elections/general-election/">general election guide</Link>.
        </p>
      </div>
    </div>
  );
}
