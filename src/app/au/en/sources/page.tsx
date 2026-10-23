import { AuFrame } from "@/app/au/_components/AuFrame";
import { auPageMetadata } from "@/data/au/meta";
import { SOURCES, sourceById } from "@/data/au/sources";
import { auHome } from "@/countries/au";

export const metadata = auPageMetadata({
  title: "Australia sources",
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
      updated="19 October 2026"
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
          counts, Queensland, Western Australian, South Australian, ACT and Northern Territory lower-house district
          rolls, current mayors, and a postcode search. Victorian members are shown only where the Victorian Electoral
          Commission results confirm them: 81 of 88 Legislative Assembly districts and 34 of 40 Legislative Council
          seats. The rest are marked as gaps.
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
          The Broadcasting Services Act 1992 (Cth) Schedule 2 clause 3A is the citation already used for the Victorian
          state-election window. On 19 October 2026 that window has not opened. Tasmania’s 2026 local government
          elections are open, with close of poll printed as 2 pm on Tuesday 27 October. No count, return rate, or
          candidate list for that election is published.
        </p>
        <p>
          NSW Electoral Commission material used for the 93 district names and declared members, and for local election
          dates: © State of New South Wales through the NSW Electoral Commission, licensed under the{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International licence</a>
          , except third-party material, logos, the State Coat of Arms, personal information, and material that states
          other conditions (
          <a href="https://www.elections.nsw.gov.au/copyright">NSW Electoral Commission copyright</a>
          ). Attribution does not imply endorsement.
        </p>
        <p>
          Electoral Commission of South Australia website content used for the 21 March 2026 House date and the April
          2027 council timetable: Creative Commons Australia Attribution 3.0, except the Piping Shrike emblem, images,
          and trademarks. The Government of South Australia requests attribution as “Government of South Australia
          2011” (
          <a href="https://www.ecsa.sa.gov.au/copyright">ECSA copyright</a>
          ). The House of Assembly district table in the Government Gazette was not copied.
        </p>
        <p>
          Victorian local council names are from the Victorian Electoral Commission local-councils page, under the same
          Creative Commons Attribution 4.0 terms as the Commission’s other website material. ABS 2025 Local Government
          Area codes and names are from the ASGS2025 MapServer, © Commonwealth of Australia, Creative Commons
          Attribution 4.0. The statistical names are not treated as legal boundaries.
        </p>
        <p>
          The Western Australian Electoral Commission copyright page, read on 19 October 2026, says that apart from fair
          dealing, no part of its material may be reproduced without the prior written permission of the Electoral
          Commissioner. District names, the extraordinary-election council list, and member names were not copied. A
          Tasmanian Electoral Commission copyright licence page was not found on 19 October 2026. The five division
          names already printed by the Commission are repeated. Member names and the 2026 candidate list were not
          copied. Electoral Commission of Queensland, Elections ACT and the Northern Territory Electoral Commission
          sites returned HTTP 403, so their rolls were not copied.
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
