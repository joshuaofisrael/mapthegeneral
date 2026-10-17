import { GbFrame } from "@/app/gb/_components/GbFrame";
import { gbLang } from "@/app/gb/_components/lang";
import { gbMetadata } from "@/data/gb/seo";
import { SOURCES, sourceById } from "@/data/gb/sources";

export function generateStaticParams() {
  return [{ lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  return gbMetadata({
    title: "Sources",
    description:
      "Official sources read for the United Kingdom pages on 17 October 2026: legislation.gov.uk, the Electoral Commission, UK Parliament, GOV.UK, gov.scot, GOV.WALES, the Executive Office and the ONS.",
    path: "/gb/en/sources/",
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  gbLang((await params).lang);
  const commission = sourceById("ec-schedule");
  return (
    <GbFrame
      path="/gb/en/sources/"
      crumbs={[
        { name: "Home", path: "/" },
        { name: "United Kingdom", path: "/gb/" },
        { name: "United Kingdom", path: "/gb/en/" },
        { name: "Sources", path: "/gb/en/sources/" },
      ]}
      title="Sources"
      lede="Every page in this release cites a subset of this list. The read date is 17 October 2026."
      officeHref={commission.url}
      officeLabel="Electoral Commission"
      sources={SOURCES}
    >
      <p className="text-sm leading-6 text-ink-muted">
        Constituency results, council leaders and candidate lists are not sources for this release. Those pages are not
        published yet.
      </p>
      <h2 className="mt-6 font-serif text-xl font-semibold">Licences and attribution</h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Contains public sector information licensed under the{" "}
        <a className="underline" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0
        </a>
        .
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Contains Parliamentary information licensed under the{" "}
        <a className="underline" href="https://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/">
          Open Parliament Licence v3.0
        </a>
        .
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Facts are reported in our own words with a citation to each page. No images, logos or crests are reproduced.
        Map the General is not affiliated with any of these bodies, and they do not endorse it.
      </p>
    </GbFrame>
  );
}
