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
    title: "United Kingdom sources",
    description:
      "Official sources for the United Kingdom pages, with the date each was read. Unofficial information.",
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
        { name: "United Kingdom", path: "/gb/en/" },
        { name: "Sources", path: "/gb/en/sources/" },
      ]}
      title="Sources"
      lede="Every page in this release cites a subset of this list. National pages were read on 17 October 2026. Constituency and member lists were read on 18 October 2026. Council and mayor pages were read on 19 October 2026. Each source below carries its own read date."
      officeHref={commission.url}
      officeLabel="Electoral Commission"
      sources={SOURCES}
    >
      <p className="text-sm leading-6 text-ink-muted">
        Current members are copied from the official member feeds linked below. Council leaders, ward councillors and
        candidate lists were not read for this release. Mayor pages name the office and the election years on the
        GOV.UK factsheet. That factsheet does not name the current mayor.
      </p>
      <h2 className="mt-6 font-serif text-xl font-semibold">Licences and attribution</h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Contains public sector information licensed under the{" "}
        <a className="underline" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0
        </a>
        . The Senedd open-data page says its datasets are available for re-use under that licence.
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Source: Office for National Statistics licensed under the Open Government Licence v.3.0. The ONS geography
        licences page says lookup products, including names and codes, use that attribution. The data.gov.uk page for
        the July 2024 Westminster names and codes prints Licence: Not set.
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Contains Parliamentary information licensed under the{" "}
        <a className="underline" href="https://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/">
          Open Parliament Licence v3.0
        </a>
        .
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Contains information licensed under the{" "}
        <a className="underline" href="https://www.parliament.scot/about/copyright">
          Scottish Parliament Copyright Licence
        </a>
        . That licence does not cover personal data in the information, and it does not allow use for party political
        purposes or to suggest SPCB endorsement. These pages name current MSPs and the party recorded for them. They do
        not copy dates of birth, photographs or contact details.
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Contains Parliamentary information licensed under the{" "}
        <a className="underline" href="http://data.niassembly.gov.uk/licence.aspx">
          Open Government Licence v3.0
        </a>
        , as the Northern Ireland Assembly open-data page asks.
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        The election-timetable page states that the publication is licensed under the Open Government Licence v3.0
        except where otherwise stated. The devolution factsheets are a GOV.UK publication, published 10 July 2025.
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Section 66A of the Representation of the People Act 1983, read again on 19 October 2026, prohibits publishing,
        before the poll is closed, a statement about the way voters have voted where that statement is based on
        information given by voters after they have voted, or a forecast of the result based on that information, for a
        parliamentary election and for a local government election in England or Wales. The UK Parliament list of
        by-elections in the 59th Parliament, read on 19 October 2026, ends with 8 October 2026, Holborn and St Pancras.
        No election on that list falls in the weeks after 19 October 2026. This release does not publish polls or
        exit-poll statements.
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Section 1 of the Data Protection Act 2018 says the Act makes provision about the processing of personal data,
        and that most processing of personal data is subject to the UK GDPR. The Information Commissioner’s Office
        guide, read on 19 October 2026, says Article 5 of the UK GDPR includes data minimisation: personal data shall
        be adequate, relevant and limited to what is necessary. That guide says it is under review because of the Data
        (Use and Access) Act. These pages do not add dates of birth, photographs, personal addresses, or personal
        email addresses or telephone numbers. Officeholder names appear only where an official page already publishes
        them in that public role.
      </p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Facts are reported in our own words with a citation to each page. No images, logos or crests are reproduced.
        Map the General is not affiliated with any of these bodies, and they do not endorse it.
      </p>
    </GbFrame>
  );
}
