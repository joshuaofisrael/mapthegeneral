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
          counts, local government council pages, and a postcode search. Victorian members are shown only where the
          Victorian Electoral Commission results confirm them: 81 of 88 Legislative Assembly districts and 34 of 40
          Legislative Council seats. The rest are marked as gaps.
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
          Federal members on the House division pages are the members the Australian Electoral Commission declared
          elected: the tally room list of House members elected at the 3 May 2025 federal election, and the Farrer
          by-election of 9 May 2026. That material is © Commonwealth of Australia (Australian Electoral Commission),
          under the{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International licence</a>{" "}
          (<a href="https://www.aec.gov.au/footer/copyright.htm">AEC copyright notice</a>). No AEC endorsement is
          implied. These pages do not copy material from the Parliament of Australia website, which is under a
          non-commercial licence (
          <a href="https://www.aph.gov.au/Help/Disclaimer_Privacy_Copyright">Parliament copyright notice</a>
          ). They link to the Parliament’s{" "}
          <a href="https://www.aph.gov.au/Senators_and_Members/Members">members page</a> for the current list.
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
          Victorian members on the Legislative Assembly and Legislative Council pages are the members the Victorian
          Electoral Commission printed as elected: its 2022 state election results by district and by region, and its
          by-election and supplementary election results since (Narracan 2023, Warrandyte 2023, Mulgrave 2023, Prahran
          2025, Werribee 2025 and Nepean 2026). A name is shown only where that result still matches the sitting
          member on 18 October 2026. Otherwise the page shows a gap. These pages do not copy the Parliament of
          Victoria member lists, whose{" "}
          <a href="https://www.parliament.vic.gov.au/copyright/">copyright page</a> allows only personal
          non-commercial use, research or study, or use within an organisation. They link to the Parliament’s{" "}
          <a href="https://www.parliament.vic.gov.au/members/">members page</a> for the current list.
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
