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
      updated="26 October 2026"
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
          counts, the elected members for Queensland, Western Australia, South Australia, the Australian Capital
          Territory and the Northern Territory, current mayors, an official local-area-to-division correspondence, and a
          postcode search. Victorian members are shown only where the Victorian Electoral Commission results confirm
          them: 81 of 88 Legislative Assembly districts and 34 of 40 Legislative Council seats. The rest are marked as
          gaps.
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
          Commissioner. The Commission’s district names, the extraordinary-election council list, and member names were
          not copied. The 59 Western Australian district pages use the ABS State Electoral Division names instead. A
          Tasmanian Electoral Commission copyright licence page was not found on 19 October 2026. The five division
          names already printed by the Commission are repeated. Member names and the 2026 candidate list were not
          copied. On 24 October 2026 a direct request to the Electoral Commission of Queensland copyright page, Elections
          ACT, and the Northern Territory Electoral Commission returned HTTP 403, so their rolls and member names were
          not copied. Facts those Queensland pages do state, including 93 state electorates, 77 local government areas,
          and the election on Saturday 26 October 2024, are reported in our own words.
        </p>
        <p>
          State Electoral Division names and codes added on 24 October 2026 are from the Australian Bureau of Statistics
          ASGS2025 MapServer: © Commonwealth of Australia,{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International licence</a>
          . The ABS says these are mesh block approximations and do not match official legal boundaries. Special-purpose
          codes for no usual address and for migratory, offshore and shipping populations are not given district pages.
          Queensland’s 93 ABS names match the count on the Commission’s boundaries page. South Australia’s 47 ABS names
          match the Government of South Australia “State Electorates 2026” dataset, which stores the same names in
          capitals. That dataset is the districts determined by the Electoral Districts Boundaries Commission, licensed{" "}
          <a href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0</a> (
          <a href="https://data.sa.gov.au/data/dataset/state-electorates">data.sa.gov.au</a>
          ).
        </p>
        <p>
          Queensland local government area names and state codes are from the Queensland Government dataset “Local
          government area boundaries - Queensland”, © State of Queensland,{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International licence</a>{" "}
          (
          <a href="https://www.data.qld.gov.au/dataset/local-government-area-boundaries-queensland">data.qld.gov.au</a>
          ). The dataset names 78 areas. The Commission’s boundaries page says there are 77. Both figures are kept. The
          Constitution of Queensland 2001 section 19B and the Local Government Electoral Act 2011 (Qld) section 23 are
          cited for the statutory election rules. Queensland legislation on legislation.qld.gov.au is © State of
          Queensland, Creative Commons Attribution 4.0 (
          <a href="https://www.legislation.qld.gov.au/copyright">legislation copyright</a>
          ). Mayors were not copied. A direct request for the department directory’s copyright licence returned HTTP 403. No Saturday was calculated
          from “the last Saturday in October” or “the last Saturday in March”.
        </p>
        <p>
          Legal names added on 26 October 2026 for New South Wales, Western Australia, South Australia, Tasmania, the
          Northern Territory, Christmas Island and the Cocos (Keeling) Islands are the LGA_NAME values in the Geoscape
          Administrative Boundaries August 2026 local government area tables, downloaded from{" "}
          <a href="https://data.gov.au/data/dataset/geoscape-administrative-boundaries">data.gov.au</a>. Preferred
          attribution: Administrative Boundaries © Geoscape Australia licensed by the Commonwealth of Australia under
          the{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International licence</a>
          . Each name was matched to an ABS 2025 code. Southern Limestone Coast Council, and the unincorporated names
          that are not separate ABS 2025 codes, are not given pages. The Victorian council names stay the Commission’s
          names. The Commission’s report to Parliament on the 2024 local government elections, on vec.vic.gov.au, says
          the general elections were held on 26 October 2024 and that the next local government elections are in October
          2028. That report is the Commission’s own publication. The Commission’s legal page licenses website material
          under Creative Commons Attribution 4.0, excluding images, video, branding and third-party content. No
          councillor names were copied from the report.
        </p>
        <p>
          The NSW Electoral Commission page on how a local government election works, read on 26 October 2026, says
          elections are held on the second Saturday in September every four years. It does not print the next calendar
          day, and none is calculated. The Office of Local Government copyright notice reserves all rights, so a month
          stated on its “Become a councillor” page is not copied. The Government of Western Australia local-government
          elections page prints a next ordinary election day. The wa.gov.au terms of use allow personal and
          non-commercial reproduction only, so that day is not copied. Local Government Victoria’s copyright notice is
          also limited to non-commercial use, so it was not used. Victorian legislation on legislation.vic.gov.au is
          published for personal use only, so no section of the Local Government Act 2020 (Vic) was copied.
        </p>
        <p>
          No opinion poll, exit poll, projection, or result call is published. The Victorian state-election window in
          the blackout table is unchanged. Tasmania’s 2026 local government elections close at 2 pm on Tuesday 27
          October 2026. On 26 October 2026 that time has not arrived. No count, return rate, or candidate list for that
          election is published. The Western Australian extraordinary elections of Thursday 3 December 2026 are not
          given a candidate list or a count. The Broadcasting Services Act 1992 (Cth) Schedule 2 clause 3A, the
          Commonwealth Electoral Act 1918, the Electoral Act 2002 (Vic), the Privacy Act 1988 (Cth), and the state Acts
          cited above were the election and privacy laws checked for this release. Only officeholder names already
          printed by a source under a licence that allows reuse are shown, and only in their public role. No personal
          address is published.
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
