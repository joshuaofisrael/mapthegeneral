import { AuFrame } from "@/app/au/_components/AuFrame";
import { auPageMetadata } from "@/data/au/meta";
import { SOURCES, sourceById } from "@/data/au/sources";
import { auHome } from "@/countries/au";

export const metadata = auPageMetadata({
  title: "Sources",
  description:
    "Official sources read for the Australia pages on 17 October 2026: the Australian Electoral Commission, the ABS, state electoral commissions, and the Prime Minister’s site. Unofficial information.",
  path: "/au/en/sources",
});

export default function AustraliaSourcesPage() {
  const path = `${auHome()}sources/`;
  const aec = sourceById("aec-entitlement-2026");
  return (
    <AuFrame
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: "Australia", path: "/au/" },
        { name: "Australia", path: auHome() },
        { name: "Sources", path },
      ]}
      title="Sources for the Australia pages"
      lede="Each item below was read on 17 October 2026. News reports and Wikipedia are not used as the source of a fact."
      officeHref={aec.url}
      officeLabel="Australian Electoral Commission"
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          What is not in these sources is not invented. Open gaps include the Governor-General’s name, the premiers and
          chief ministers, federal and state candidate lists, a polling day for the next federal election, Senate
          counts, council pages, and a postcode search.
        </p>
        <h2>Licences and attribution</h2>
        <p>
          Australian Electoral Commission material: © Commonwealth of Australia (Australian Electoral Commission),
          licensed under the{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International licence</a>{" "}
          (<a href="https://www.aec.gov.au/footer/copyright.htm">AEC copyright notice</a>).
        </p>
        <p>
          Australian Bureau of Statistics material: Source: Australian Bureau of Statistics, © Commonwealth of
          Australia, licensed under the{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International licence</a>{" "}
          (<a href="https://www.abs.gov.au/website-privacy-copyright-and-disclaimer">ABS copyright notice</a>).
        </p>
        <p>
          Facts from the other official sites listed below are reported in our own words with a citation to each
          page. No images, logos or editorial text from those sites are reproduced. Map the General is not affiliated
          with any of these bodies, and they do not endorse it.
        </p>
      </div>
    </AuFrame>
  );
}
