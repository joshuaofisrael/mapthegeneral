import { AuFrame } from "@/app/au/_components/AuFrame";
import { auPageMetadata } from "@/data/au/meta";
import { SOURCES, sourceById } from "@/data/au/sources";
import { auHome } from "@/countries/au";

export const metadata = auPageMetadata({
  title: "Sources",
  description:
    "Official sources for the Australia pages, with the date each one was read. Australian Electoral Commission, Parliament of Australia, Victorian Electoral Commission, and the ABS. Unofficial information.",
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
      updated="18 October 2026"
      title="Sources for the Australia pages"
      lede="The date after each item is the day that page was read. News reports and Wikipedia are not used as the source of a fact."
      officeHref={aec.url}
      officeLabel="Australian Electoral Commission"
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          What is not in these sources is not invented. Open gaps include the Governor-General’s name, the premiers and
          chief ministers, federal and state candidate lists, a polling day for the next federal election, Senate
          counts, local government council pages, and a postcode search. Five Legislative Assembly districts had no row
          in the Parliament of Victoria list read on 18 October 2026.
        </p>
        <h2>Licences and attribution</h2>
        <p>
          Australian Electoral Commission material: © Commonwealth of Australia (Australian Electoral Commission),
          licensed under the{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International licence</a>{" "}
          (<a href="https://www.aec.gov.au/footer/copyright.htm">AEC copyright notice</a>
          ). The notice excludes the Commonwealth Coat of Arms, AEC logos, AEC maps, and third-party content. Division
          names and areas on these pages are from the profiles index, not from those maps. Use does not imply AEC
          endorsement.
        </p>
        <p>
          Australian Bureau of Statistics material: Source: Australian Bureau of Statistics, © Commonwealth of
          Australia, licensed under the{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International licence</a>{" "}
          (<a href="https://www.abs.gov.au/website-privacy-copyright-and-disclaimer">ABS copyright notice</a>).
        </p>
        <p>
          Parliament of Australia website material, other than the Commonwealth Coat of Arms and where otherwise noted,
          is under the{" "}
          <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
            Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International licence
          </a>{" "}
          (<a href="https://www.aph.gov.au/Help/Disclaimer_Privacy_Copyright">Parliament copyright notice</a>
          ). Attribute it as Parliament of Australia website. These pages quote the member’s name line, electorate and
          party legend from the 29 September 2026 list. They do not copy electorate-office addresses, telephone numbers
          or email addresses.
        </p>
        <p>
          Victorian Electoral Commission website material: © Victorian Electoral Commission, under the{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International licence</a>
          , except images, photographs, videos, branding including the VEC logo, and third-party content (
          <a href="https://www.vec.vic.gov.au/legal">VEC legal page</a>
          ).
        </p>
        <p>
          The VEC report to Parliament on the 2022 Victorian state election is © State of Victoria (Victorian Electoral
          Commission), licensed under Creative Commons Attribution 4.0 on the condition that the content is not changed.
          The licence does not apply to branding, including government logos. These pages cite the election dates in
          that report. They do not reproduce the report.
        </p>
        <p>
          The Parliament of Victoria copyright page does not grant a Creative Commons licence. It says the website may
          be downloaded and displayed for personal non-commercial use, research or study, or use within an organisation,
          and that other reproduction needs permission. These pages do not reproduce the member lists. They report the
          name, electorate, party and public office printed in the lists read on 18 October 2026, and link to those
          lists. The Parliament’s disclaimer says the material is for information and accepts no liability for reliance
          on it.
        </p>
        <p>
          The ACMA page on election and referendum blackout periods, read on 18 October 2026, says there are no current
          listings. It says a broadcaster cannot air election ads from the end of the Wednesday before polling day until
          the close of the poll, and that online services are not in that blackout. These pages publish no election
          advertisement, poll, projection, or result call.
        </p>
        <p>
          Facts from the other official sites listed below are reported in our own words with a citation to each page.
          No images, logos or editorial text from those sites are reproduced. Map the General is not affiliated with any
          of these bodies, and they do not endorse it.
        </p>
      </div>
    </AuFrame>
  );
}
