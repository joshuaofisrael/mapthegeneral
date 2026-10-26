import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  LOCAL_AREAS,
  STATE_DISTRICTS,
  areasIn,
  chamberTitle,
  districtsIn,
  localIndexPath,
  localPath,
  stateAssemblyIndexPath,
  stateAssemblyPath,
  type LocalArea,
  type StateDistrict,
} from "../src/data/au/level3";
import { JURISDICTIONS } from "../src/data/au/places";
import { sourcesById } from "../src/data/au/sources";
import { SITE, absoluteUrl, reportErrorHref } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { nearbyIds, nearbyPlacesParagraph } from "../src/lib/nearby-html";
import { socialMetaTags } from "../src/lib/social";
import { auHome, jurisdictionPath } from "../src/countries/au";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const UPDATED = "19 October 2026";
const UPDATED_24 = "24 October 2026";
const UPDATED_26 = "26 October 2026";

const ABS_CAVEAT =
  "The Australian Bureau of Statistics says a Local Government Area is a Mesh Block approximation of a gazetted local government boundary. It says those approximations do not match official legal boundaries and should only be used for statistical purposes.";

const NO_MAP =
  "Which House of Representatives division, and which state or territory electoral district, this area falls in was not printed on an official correspondence read for this page. It is not guessed from a boundary.";

const NO_CALL = "This page does not publish a poll, a projection, or a result call.";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jurisdictionName(slug: string): string {
  if (slug === "other-territories") return "Other Territories";
  const item = JURISDICTIONS.find((row) => row.slug === slug);
  if (!item) throw new Error(`Missing jurisdiction ${slug}`);
  return item.officialName;
}

function shell(input: {
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  eyebrow: string;
  h1: string;
  lede: string;
  officeHref: string;
  body: string;
  sourceIds: string[];
  updated?: string;
}): string {
  const canonical = absoluteUrl(input.path);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: input.crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }).replace(/</g, "\\u003c");
  const crumbs = input.crumbs
    .map((item, index) =>
      index === input.crumbs.length - 1
        ? `<span>${esc(item.name)}</span>`
        : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
  const sources = sourcesById(input.sourceIds)
    .map((source) => `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — read ${esc(source.readOn)}</li>`)
    .join("");
  const pageTitle = `${input.title} · ${SITE.name}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(input.description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="en" href="${esc(canonical)}">
<link rel="alternate" hreflang="x-default" href="${esc(canonical)}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(pageTitle)}">
<meta property="og:description" content="${esc(input.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_US">
${socialMetaTags()}
<link rel="stylesheet" href="/place.css">
<script type="application/ld+json">${jsonLd}</script>
${ADSENSE_HEAD_TAGS}
</head>
<body>
<p class="banner">Unofficial information. Confirm with your <a href="${esc(input.officeHref)}">official election office</a>.</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(auHome())}">Australia</a> · <a href="/search/">Search</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbs}</nav>
<p class="eyebrow">${esc(input.eyebrow)}</p>
<h1>${esc(input.h1)}</h1>
<p class="lede">${esc(input.lede)}</p>
<p><strong>Last updated: ${input.updated ?? UPDATED}.</strong> <a href="${esc(reportErrorHref(input.path))}">Report an error</a></p>
${input.body}
<h2>Sources</h2>
<ul>${sources}</ul>
</main>
${withLegalFooter(`Australian data on this page is reused under the licences listed on <a href="/au/en/sources/">Licences and attribution</a>, including <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> material from the Australian Bureau of Statistics (© Commonwealth of Australia), the NSW Electoral Commission (© State of New South Wales through the NSW Electoral Commission) and the Victorian Electoral Commission. Unofficial, and not endorsed by the bodies named here.`)}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function writePage(path: string, html: string) {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

function nearby(items: { name: string; href: string }[], index: number): string {
  const parts: string[] = [];
  if (index > 0) parts.push(`<a href="${esc(items[index - 1].href)}">${esc(items[index - 1].name)}</a>`);
  if (index < items.length - 1) parts.push(`<a href="${esc(items[index + 1].href)}">${esc(items[index + 1].name)}</a>`);
  return parts.length ? `<p>Previous and next: ${parts.join(" · ")}</p>` : "";
}

function list(items: { name: string; href: string }[]): string {
  return `<ul>${items.map((item) => `<li><a href="${esc(item.href)}">${esc(item.name)}</a></li>`).join("")}</ul>`;
}

function parentCrumbs(slug: string, indexName: string, indexHref: string, pageName: string, pagePath: string) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Australia", path: "/au/" },
    { name: "Australia", path: auHome() },
  ];
  if (slug !== "other-territories") {
    crumbs.push({ name: jurisdictionName(slug), path: jurisdictionPath(slug) });
  }
  crumbs.push({ name: indexName, path: indexHref }, { name: pageName, path: pagePath });
  return crumbs;
}

const SED_CAVEAT =
  "The Australian Bureau of Statistics says a State Electoral Division is a Mesh Block approximation of a state electoral district. It says those approximations do not match official legal boundaries and should only be used for statistical purposes.";

function absDistrictLine(item: StateDistrict): string {
  return `<p>ABS State Electoral Division code <strong>${esc(item.absCode ?? "")}</strong>, name <strong>${esc(item.name)}</strong>, in the ASGS2025 MapServer extract read on 24 October 2026. ${SED_CAVEAT}</p>`;
}

function districtBody(item: StateDistrict): { body: string; sources: string[]; office: string; lede: string; updated: string } {
  if (item.jurisdictionSlug === "queensland") {
    return {
      office: "https://www.ecq.qld.gov.au/2024sge",
      updated: UPDATED_24,
      lede: `${item.name}, a Queensland Legislative Assembly electoral district. ABS State Electoral Division code ${item.absCode}.`,
      sources: ["abs-sed-2025", "ecq-boundaries", "ecq-2024", "qld-const-19b", "ecq-plan"],
      body: `${absDistrictLine(item)}
<p>The Electoral Commission of Queensland boundaries page, read on 24 October 2026, says Queensland is currently divided into 93 state electorates. A copyright page for the Commission was not retrieved that day, because a direct request returned HTTP 403, so the Commission’s district roll and the Gazette notice of elected candidates were not copied. The member for ${esc(item.name)} is not printed. Not published under a confirmed reuse licence.</p>
<p>The Commission’s 2024 state general election page says the election was held on Saturday 26 October 2024, and that all results have been declared. It says polling places were open from 8am to 6pm. This page does not reprint a count.</p>
<p>The Constitution of Queensland 2001, section 19B, says the normal polling day for an ordinary general election is the last Saturday in October in the fourth calendar year after the calendar year of the last ordinary general election, unless polling is postponed under that section. The Commission’s Strategic Plan 2025–2029 places a state general election in October 2028 and does not print a calendar day. This page does not calculate that Saturday. No candidate list is printed.</p>
<p>${NO_CALL}</p>
<p>Which House of Representatives division this district falls in was not printed on an official correspondence read for this page. It is not guessed from a boundary.</p>`,
    };
  }
  if (item.jurisdictionSlug === "western-australia") {
    return {
      office: "https://www.elections.wa.gov.au/elections/state",
      updated: UPDATED_24,
      lede: `${item.name}, a Western Australian Legislative Assembly electoral district. ABS State Electoral Division code ${item.absCode}.`,
      sources: ["abs-sed-2025", "waec-state", "waec-copyright"],
      body: `${absDistrictLine(item)}
<p>The Western Australian Electoral Commission state-elections page says the last WA State election was held on Saturday 8 March 2025. That page does not print the next state polling day. This page does not forecast one.</p>
<p>The Commission’s copyright notice says that, apart from fair dealing, no part of its material may be reproduced without the prior written permission of the Electoral Commissioner. The Commission’s district list and the member for ${esc(item.name)} were not copied. Not published under a reuse licence.</p>
<p>${NO_CALL}</p>
<p>Which House of Representatives division this district falls in was not printed on an official correspondence read for this page. It is not guessed from a boundary.</p>`,
    };
  }
  if (item.jurisdictionSlug === "south-australia") {
    return {
      office: "https://www.ecsa.sa.gov.au/",
      updated: UPDATED_24,
      lede: `${item.name}, a South Australian House of Assembly electoral district. ABS State Electoral Division code ${item.absCode}.`,
      sources: ["abs-sed-2025", "sa-electorates-2026", "ecsa-ha-2026", "ecsa-copyright"],
      body: `${absDistrictLine(item)}
<p>The Government of South Australia dataset “State Electorates 2026”, licensed Creative Commons Attribution 4.0, read on 24 October 2026, is the state electoral districts determined by the Electoral Districts Boundaries Commission. In that file this district is stored in capitals as <strong>${esc(item.name.toUpperCase())}</strong>. The words are the same as the ABS name.</p>
<p>The Electoral Commission of South Australia notice of House of Assembly results says those elections were held on Saturday, 21 March 2026. The notice points to a Government Gazette for the votes of the two unexcluded candidates. That table was not copied. The member for ${esc(item.name)} is not printed.</p>
<p>The next state polling day after 2026 was not on the pages read. No candidate list is printed. ${NO_CALL}</p>
<p>Which House of Representatives division this district falls in was not printed on an official correspondence read for this page. It is not guessed from a boundary.</p>`,
    };
  }
  if (item.jurisdictionSlug === "australian-capital-territory") {
    return {
      office: "https://www.elections.act.gov.au/elections",
      updated: UPDATED_24,
      lede: `${item.name}, an Australian Capital Territory Legislative Assembly electorate. ABS State Electoral Division code ${item.absCode}.`,
      sources: ["abs-sed-2025", "elections-act"],
      body: `${absDistrictLine(item)}
<p>The Elections ACT elections page, read on 17 October 2026, says the next ACT Legislative Assembly election will be held in October 2028. It does not print a calendar day. A direct request on 24 October 2026 returned HTTP 403, so the Commission’s electorate roll and the members elected for ${esc(item.name)} were not copied. Not published under a confirmed reuse licence.</p>
<p>${NO_CALL}</p>
<p>Which House of Representatives division this electorate falls in was not printed on an official correspondence read for this page. It is not guessed from a boundary.</p>`,
    };
  }
  if (item.jurisdictionSlug === "northern-territory") {
    return {
      office: "https://ntec.nt.gov.au/",
      updated: UPDATED_24,
      lede: `${item.name}, a Northern Territory Legislative Assembly division. ABS State Electoral Division code ${item.absCode}.`,
      sources: ["abs-sed-2025"],
      body: `${absDistrictLine(item)}
<p>The Northern Territory Electoral Commission site returned HTTP 403 on 24 October 2026, so its division roll was not copied. The member for ${esc(item.name)} is not printed. Last and next election days were not read. Not published centrally.</p>
<p>${NO_CALL}</p>
<p>Which House of Representatives division this division falls in was not printed on an official correspondence read for this page. It is not guessed from a boundary.</p>`,
    };
  }
  if (item.jurisdictionSlug === "new-south-wales") {
    const member =
      item.memberKind === "by-election" && item.declaration
        ? `<p>${esc(item.declaration)} The virtual tally room for Saturday 25 March 2023 printed a different elected candidate for this district. This page uses the later declaration. It does not track a change the Commission has not listed.</p>`
        : `<p>The NSW Electoral Commission virtual tally room for the state general election of Saturday 25 March 2023 prints the elected candidate as ${esc(item.memberPrinted ?? "")}, ${esc(item.memberParty ?? "")}.</p>`;
    return {
      office: "https://elections.nsw.gov.au/elections/state-elections/2027-nsw-state-election",
      updated: UPDATED,
      lede: `${item.name}, a New South Wales Legislative Assembly district. One member is elected for the district.`,
      sources:
        item.memberKind === "by-election"
          ? ["nswec-vtr-2023", "nswec-past", "nswec-2027", "nswec-copyright"]
          : ["nswec-vtr-2023", "nswec-2027", "nswec-copyright"],
      body: `${member}
<p>The NSW Electoral Commission page for the 2027 NSW State election prints Saturday, 13 March 2027. No candidate list for that election is printed here. ${NO_CALL}</p>
<p>${NO_MAP}</p>`,
    };
  }
  return {
    office: "https://www.tec.tas.gov.au/house-of-assembly/elections-2025/index.html",
    updated: UPDATED,
    lede: `${item.name}, one of the five Tasmanian House of Assembly divisions.`,
    sources: ["tec-hoa-2025"],
    body: `<p>The Tasmanian Electoral Commission says a general election for the House of Assembly was held on Saturday 19 July 2025, and that polling closed at 6 pm that day. It says seven members are elected for each of the five divisions, for a term of up to four years.</p>
<p>The names of the members elected for ${esc(item.name)} were not in the results page retrieved on 19 October 2026. They are not filled in here. A copyright licence page for the Commission was not found that day, so no results table was copied.</p>
<p>The Commission’s page does not print the next House of Assembly polling day. ${NO_CALL}</p>
<p>${NO_MAP}</p>`,
  };
}

function areaOffice(area: LocalArea): string {
  if (area.group === "vic-council") return "https://www.vec.vic.gov.au/electoral-boundaries/local-councils";
  if (area.jurisdictionSlug === "new-south-wales") return "https://elections.nsw.gov.au/elections/past-results/local-government-election-results";
  if (area.jurisdictionSlug === "south-australia") return "https://www.ecsa.sa.gov.au/parties-and-candidates/council-candidates";
  if (area.jurisdictionSlug === "queensland") {
    return "https://www.dlgwv.qld.gov.au/local-government/for-the-community/local-government-directory/search-the-local-government-directory";
  }
  if (area.jurisdictionSlug === "tasmania") return "https://www.tec.tas.gov.au/local-government/elections-2026/index.html";
  if (area.jurisdictionSlug === "western-australia") return "https://www.elections.wa.gov.au/copyright";
  return "https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/non-abs-structures/local-government-areas";
}

function areaSources(area: LocalArea): string[] {
  const ids = ["abs-lga-2025", "abs-lga-map"];
  if (area.group === "vic-council") ids.push("vec-councils", "vec-local", "vec-2024-councils", "vec-legal", "vec-lg-report-2024");
  if (area.jurisdictionSlug === "new-south-wales") ids.push("nswec-lg-results", "nswec-copyright", "nswec-past", "nswec-lg-how", "olg-councillor");
  if (area.jurisdictionSlug === "south-australia") ids.push("ecsa-council-2027", "ecsa-copyright");
  if (area.jurisdictionSlug === "queensland") ids.push("qld-lga-boundaries", "qld-lgea-s23", "ecq-boundaries", "ecq-plan");
  if (area.jurisdictionSlug === "tasmania") ids.push("tec-lg-2026");
  if (area.jurisdictionSlug === "western-australia") ids.push("waec-copyright", "wa-dlg-elections");
  if (area.legalPid || area.kind === "unincorporated" || area.flags.includes("sa-grant")) ids.push("geoscape-lga-2026");
  if (area.flags.includes("christmas") || area.flags.includes("cocos")) ids.push("abs-lga-2025");
  return [...new Set(ids)];
}

function electionParagraph(area: LocalArea): string {
  if (area.group === "vic-council") {
    const bye: Record<string, string> = {
      "vic-banyule":
        "The Commission’s local-council elections page links a current Banyule City Council Beale Ward by-election. Ward pages and candidate lists are not built here, and no count is printed.",
      "vic-bendigo":
        "The Commission’s local-council elections page links a current Greater Bendigo City Council Lockwood Ward by-election. Ward pages and candidate lists are not built here, and no count is printed.",
      "vic-mornington":
        "The Commission’s local-council elections page links a current Mornington Peninsula Shire Council Briars Ward by-election. Ward pages and candidate lists are not built here, and no count is printed.",
      "vic-murrindindi":
        "The Commission’s local-council elections page links a current Murrindindi Shire Council Kinglake Ward by-election. Ward pages and candidate lists are not built here, and no count is printed.",
    };
    const extra = area.flags.map((flag) => bye[flag]).filter(Boolean).join(" ");
    const moira = area.flags.includes("vic-moira")
      ? " The same report says an election was not held for Moira Shire Council, and that the next general election for that council will be held in October 2028."
      : "";
    return `<p>The Victorian Electoral Commission’s report to Parliament on the 2024 local government elections says the general elections were held on 26 October 2024. The foreword says the next local government elections are in October 2028. It does not print a calendar day for 2028. This page does not calculate one. The results index read on 19 October 2026 does not print a calendar day.${moira} ${extra}</p>`;
  }
  if (area.jurisdictionSlug === "new-south-wales") {
    const bits = [
      "<p>The NSW Electoral Commission local government results page prints “2024 NSW Local Government elections | 14 September 2024”. The Commission’s page on how a local government election works, read on 26 October 2026, says local government elections are held on the second Saturday in September every four years. That page does not print the next calendar day. This page does not calculate one. The Office of Local Government’s “Become a councillor” page states a month for the next ordinary election. Its copyright notice reserves all rights and allows a single copy for personal use only, so that month is not copied here.</p>",
    ];
    if (area.flags.includes("nsw-cobar")) {
      bits.push(
        "<p>The Commission’s current-elections list, on the state past-results page, includes a Cobar Shire Council by-election on 28 November 2026, for one councillor. No candidate list is printed here.</p>",
      );
    }
    if (area.flags.includes("nsw-coffs")) {
      bits.push(
        "<p>That list includes a City of Coffs Harbour Council by-election on 12 December 2026, for one councillor. The ABS name of this area is Coffs Harbour. No candidate list is printed here.</p>",
      );
    }
    if (area.flags.includes("nsw-hunters-hill")) {
      bits.push(
        "<p>That list includes a Hunter’s Hill Council (South Ward) by-election on 12 December 2026, for one councillor. The ABS name of this area is Hunters Hill. No candidate list is printed here.</p>",
      );
    }
    if (area.flags.includes("central-darling")) {
      bits.push(
        "<p>The same results page prints Central Darling Shire Council ward elections of 20 September 2025. It says Peter Sullivan was declared elected for A Ward at 11:33am on Tuesday, 14 October 2025; Max Bradley was declared elected for B Ward at 12:35pm that day; and C Ward was uncontested, with Daniel Fusi declared elected. These are councillor declarations, not a mayor. Earlier countbacks are not listed here.</p>",
      );
    }
    return bits.join("");
  }
  if (area.jurisdictionSlug === "south-australia") {
    const rename = area.flags.includes("lower-eyre")
      ? " The ABS page says Lower Eyre Peninsula was renamed Lower Eyre, with no code change."
      : "";
    return `<p>The Electoral Commission of South Australia says the next periodic local government council elections will be held in April 2027, moved from November 2026. The timetable on that page prints close of voting (polling day) at 5pm on Wednesday 7 April 2027. Rolls close at 5pm on Monday 4 January 2027. Nominations open on Tuesday 26 January 2027 and close at 12 noon on Tuesday 9 February 2027. The calendar day of the last periodic council election was not on the Commission pages read on 26 October 2026. No candidate list is printed here.${rename}</p>`;
  }
  if (area.jurisdictionSlug === "queensland") {
    return `<p>The Local Government Electoral Act 2011 (Qld) section 23 says a quadrennial election must be held in, and every fourth year after, 2012, on the last Saturday in March. It also says a regulation may fix a different Saturday for a particular year. The Electoral Commission of Queensland Strategic Plan 2025–2029 places local government elections in March 2028 and does not print a calendar day. The calendar day of the last quadrennial election was not in those sources. This page does not calculate a Saturday. No candidate list is printed.</p>`;
  }
  if (area.jurisdictionSlug === "tasmania") {
    return `<p>The Tasmanian Electoral Commission page titled “2026 local government elections”, read on 26 October 2026, prints close of poll at 2 pm on Tuesday 27 October, and counting commencing from 9 am on Wednesday 28 October. On that read, the close of poll has not arrived. The page says it is now too late to return a vote by post, and that a completed ballot pack should be returned in person by that close of poll. The timetable still prints ballot packs delivered by post from Monday 5 October, and the page says there are 29 councils. This page does not publish a candidate list, a return rate, or a count. A Commission copyright licence page was not found, so council legal names were not copied from the Commission.</p>`;
  }
  if (area.jurisdictionSlug === "western-australia") {
    return `<p>A current mayor was not published centrally under a reuse licence. The Western Australian Electoral Commission copyright notice does not allow this publisher to reproduce the Commission’s council list, district list, or election dates. Whether this area is in the December 2026 extraordinary elections is not stated here. The Government of Western Australia local-government elections page, read on 26 October 2026, prints a next ordinary election day. The wa.gov.au terms of use allow personal and non-commercial reproduction only, so that day is not copied here.</p>`;
  }
  if (area.jurisdictionSlug === "australian-capital-territory") {
    return `<p>The ABS explanatory page says the Local Government Area codes for the Australian Capital Territory are statistical areas, not a statement that the Territory has elected councils of that number. Elections ACT returned HTTP 403 on 19 October 2026, so a Legislative Assembly electorate list was not copied.</p>`;
  }
  if (area.jurisdictionSlug === "northern-territory") {
    const change = area.flags.includes("groote") || area.flags.includes("east-arnhem")
      ? " The ABS page says East Arnhem was split to create Groote Archipelago, with code changes, in the 2025 update."
      : "";
    return `<p>No Northern Territory Electoral Commission page was read on 26 October 2026. A direct request returned HTTP 403, as it did on 19 October 2026. Last and next council election days are not printed here.${change}</p>`;
  }
  return "";
}

function officeParagraph(area: LocalArea): string {
  if (area.kind === "unincorporated") {
    return `<p>This record is an unincorporated area in the ABS list, not an elected council named on the pages read. No mayor is printed. Not published centrally.</p>`;
  }
  if (area.flags.includes("melbourne")) {
    return `<p>The Victorian Electoral Commission says that in a local council election people vote for councillors, and that after the councillors are elected they decide who will act as mayor. It says Melbourne City Council elections elect the lord mayor and deputy lord mayor, and 9 councillors. The current officeholders were not on the index read on 19 October 2026. Not published centrally.</p>`;
  }
  if (area.group === "vic-council") {
    return `<p>The Victorian Electoral Commission says that in a local council election people vote for councillors, and that after the councillors are elected they decide who will act as mayor. The current mayor was not on the council index read on 19 October 2026. Not published centrally.</p>`;
  }
  if (area.jurisdictionSlug === "queensland" && area.stateCode) {
    return `<p>A current mayor and the current councillors were not copied. The Queensland local government directory lists council officers. A copyright licence for that directory was not retrieved on 24 October 2026, because a direct request returned HTTP 403. Not published under a confirmed reuse licence.</p>`;
  }
  return `<p>A current mayor or council membership was not published on a central page whose licence permits this publisher to copy it. Not published centrally.</p>`;
}

const GEOSCAPE_UNMATCHED: Record<string, string> = {
  "unincorporated-nsw":
    "The Geoscape Administrative Boundaries August 2026 local government area table names four unincorporated areas that are not separate codes in the ABS 2025 extract used here: Unincorporated - Botany Bay Area; Unincorporated - Far West Area; Unincorporated - Lord Howe Island; and Unincorporated - Sydney Harbour Area. The ABS extract has one area, Unincorporated NSW. This page does not split it.",
  "unincorporated-vic":
    "The Geoscape August 2026 Victoria table also names Falls Creek Alpine Resort (Unincorporated), French-Elizabeth-Sandstone Islands (Uninc), Lake Mountain Alpine Resort (Unincorporated), Mount Baw Baw Alpine Resort (Unincorporated), Mount Buller Alpine Resort (Unincorporated), Mount Hotham Alpine Resort (Unincorporated), Mount Stirling Alpine Resort (Unincorporated), and Gabo Island (Unincorporated). Those names are not among the 79 councils, and they are not separate codes in the ABS 2025 extract used here. This page does not add them.",
  "unincorporated-sa":
    "The Geoscape August 2026 South Australia table also names Pastoral Unincorporated Area, UIA Riverland, UIA Torrens Island, and UIA Whyalla. Those names are not separate codes in the ABS 2025 extract used here. This page does not split Unincorporated SA.",
  "unincorporated-nt":
    "The Geoscape August 2026 Northern Territory table also names Northern Territory Rates Act (Prescribed Area A) Area, Un-Incorporated (Alyangula) Area, Un-Incorporated (Cox-Daly) Area, Un-Incorporated (Marrakai-Douglas Daly) Area, Un-Incorporated (Nhulunbuy) Area, and Un-Incorporated (Yulara) Area. Those names are not separate codes in the ABS 2025 extract used here. This page does not split Unincorporated NT.",
  "unincorporated-act":
    "The Geoscape August 2026 state tables read for this release do not include an Australian Capital Territory local government area table. This record stays the ABS name.",
  "unincorp-other-territories":
    "The Geoscape August 2026 Other Territories table names Shire of Christmas Island and Shire of Cocos (Keeling) Islands, which have their own pages. It does not name this unincorporated record.",
  grant:
    "The Geoscape August 2026 South Australia table has no area named Grant. It does name Southern Limestone Coast Council, which is not an ABS 2025 code in this extract. This page does not treat those names as the same area.",
};

function areaBody(area: LocalArea): string {
  const code = `<p>ABS Local Government Area code <strong>${esc(area.absCode)}</strong>, name <strong>${esc(area.absName)}</strong>, in the ASGS2025 MapServer extract read on 19 October 2026. ${ABS_CAVEAT}</p>`;
  const official =
    area.group === "vic-council"
      ? `<p>Official council name, as the Victorian Electoral Commission prints it: ${esc(area.name)}.</p>`
      : area.jurisdictionSlug === "queensland" && area.stateCode
        ? `<p>Official name in the Queensland Government local government area boundaries dataset, read on 24 October 2026: ${esc(area.name)}. State code <strong>${esc(area.stateCode)}</strong>. The dataset is licensed Creative Commons Attribution 4.0.</p>`
        : area.legalPid
          ? `<p>Official name in the Geoscape Administrative Boundaries August 2026 local government area table, read on 26 October 2026: ${esc(area.name)}. Geoscape identifier <strong>${esc(area.legalPid)}</strong>. The table is licensed Creative Commons Attribution 4.0.</p>`
          : "";
  const unmatched = GEOSCAPE_UNMATCHED[area.slug]
    ? `<p>${GEOSCAPE_UNMATCHED[area.slug]}</p>`
    : "";
  const islands =
    area.flags.includes("christmas") || area.flags.includes("cocos")
      ? `<p>The MapServer state name for this code is Other Territories. The ABS Local Government Areas page also says that in ASGS Edition 3, Cocos (Keeling) Islands and Christmas Island are included as Western Australian Local Government Areas, reflecting their administration at the local government level. This page does not resolve that difference. The 2025 page says Cocos Islands was renamed Cocos (Keeling) Islands.</p>`
      : "";
  const mapped =
    area.jurisdictionSlug === "queensland" && area.stateCode
      ? "The local government area boundaries dataset read on 24 October 2026 does not name a House of Representatives division or a state electoral district for this area. It is not guessed from a boundary."
      : NO_MAP;
  return `${official}${code}${unmatched}${islands}${officeParagraph(area)}${electionParagraph(area)}<p>${NO_CALL}</p><p>${mapped}</p>`;
}

const DISTRICT_ORDER = [
  "new-south-wales",
  "queensland",
  "western-australia",
  "south-australia",
  "tasmania",
  "australian-capital-territory",
  "northern-territory",
];

function districtIndexSources(slug: string): string[] {
  if (slug === "tasmania") return ["tec-hoa-2025"];
  if (slug === "new-south-wales") return ["nswec-vtr-2023", "nswec-copyright"];
  if (slug === "queensland") return ["abs-sed-2025", "ecq-boundaries", "ecq-2024"];
  if (slug === "western-australia") return ["abs-sed-2025", "waec-copyright"];
  if (slug === "south-australia") return ["abs-sed-2025", "sa-electorates-2026", "ecsa-copyright"];
  if (slug === "australian-capital-territory") return ["abs-sed-2025", "elections-act"];
  return ["abs-sed-2025"];
}

function districtIndexOffice(slug: string): string {
  if (slug === "tasmania") return "https://www.tec.tas.gov.au/house-of-assembly/elections-2025/index.html";
  if (slug === "new-south-wales") return "https://elections.nsw.gov.au/elections/state-elections/2027-nsw-state-election";
  if (slug === "queensland") return "https://www.ecq.qld.gov.au/electoral-boundaries";
  if (slug === "western-australia") return "https://www.elections.wa.gov.au/copyright";
  if (slug === "south-australia") return "https://data.sa.gov.au/data/dataset/state-electorates";
  if (slug === "australian-capital-territory") return "https://www.elections.act.gov.au/elections";
  return "https://ntec.nt.gov.au/";
}

function districtIndexLede(slug: string, count: number): string {
  if (slug === "queensland") {
    return `${count} names from the Australian Bureau of Statistics ASGS 2025 State Electoral Division list. The Electoral Commission of Queensland says Queensland is divided into 93 state electorates. Members were not copied.`;
  }
  if (slug === "western-australia") {
    return `${count} names from the ABS ASGS 2025 State Electoral Division list. The Western Australian Electoral Commission district list was not copied. Its copyright notice requires prior written permission.`;
  }
  if (slug === "south-australia") {
    return `${count} names. The Government of South Australia State Electorates 2026 dataset, CC BY 4.0, stores the same names in capitals. Members were not copied from the Government Gazette.`;
  }
  if (slug === "australian-capital-territory") {
    return `${count} names from the ABS ASGS 2025 State Electoral Division list. Two special-purpose ABS codes are not electorates and have no page. Elections ACT returned HTTP 403 on 24 October 2026, so its roll was not copied.`;
  }
  if (slug === "northern-territory") {
    return `${count} names from the ABS ASGS 2025 State Electoral Division list. Two special-purpose ABS codes are not divisions and have no page. The Northern Territory Electoral Commission site returned HTTP 403 on 24 October 2026, so its roll was not copied.`;
  }
  return `${count} names. Each name links to its own page.`;
}

function renderDistricts() {
  for (const slug of DISTRICT_ORDER) {
    const items = districtsIn(slug);
    if (items.length === 0) continue;
    const parent = jurisdictionName(slug);
    const indexHref = stateAssemblyIndexPath(slug);
    const links = items.map((item) => ({ name: item.name, href: stateAssemblyPath(slug, item.slug) }));
    const chamber = chamberTitle(slug);
    const fresh = slug !== "new-south-wales" && slug !== "tasmania";
    writePage(
      indexHref,
      shell({
        path: indexHref,
        title: `${parent} ${chamber}`,
        description: `${items.length} ${chamber} for ${parent}. Unofficial information.`,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "Australia", path: "/au/" },
          { name: "Australia", path: auHome() },
          { name: parent, path: jurisdictionPath(slug) },
          { name: chamber, path: indexHref },
        ],
        eyebrow: parent,
        h1: chamber,
        lede: districtIndexLede(slug, items.length),
        officeHref: districtIndexOffice(slug),
        body: list(links),
        sourceIds: districtIndexSources(slug),
        updated: fresh ? UPDATED_24 : UPDATED,
      }),
    );
    items.forEach((item, index) => {
      const path = stateAssemblyPath(slug, item.slug);
      const copy = districtBody(item);
      writePage(
        path,
        shell({
          path,
          title: item.name,
          description: `${item.name}, ${parent} ${item.chamber}. Unofficial information.`,
          crumbs: parentCrumbs(slug, chamber, indexHref, item.name, path),
          eyebrow: item.chamber,
          h1: item.name,
          lede: copy.lede,
          officeHref: copy.office,
          body: `${copy.body}${nearby(links, index)}${nearbyPlacesParagraph(
            "en",
            nearbyIds(`au-dist:${slug}/${item.slug}`)
              .map((id) => items.find((other) => other.slug === id))
              .filter((other): other is NonNullable<typeof other> => Boolean(other))
              .map((other) => ({ href: stateAssemblyPath(slug, other.slug), name: other.name })),
          )}<p><a href="${esc(indexHref)}">${esc(chamber)}</a> · <a href="${esc(jurisdictionPath(slug))}">${esc(parent)}</a></p>`,
          sourceIds: copy.sources,
          updated: copy.updated,
        }),
      );
    });
  }
}

function renderAreas() {
  const groups = [...new Set(LOCAL_AREAS.map((item) => item.jurisdictionSlug))];
  for (const slug of groups) {
    const items = areasIn(slug);
    const parentName = jurisdictionName(slug);
    const indexHref = localIndexPath(slug);
    const parentPath = slug === "other-territories" ? auHome() : jurisdictionPath(slug);
    const councils = items.filter((item) => item.group === "vic-council");
    const rest = items.filter((item) => item.group !== "vic-council");
    const links = items.map((item) => ({ name: item.name, href: localPath(item) }));
    const title =
      slug === "victoria"
        ? "Victorian local councils"
        : slug === "other-territories"
          ? "Other Territories local government areas"
          : `${parentName} local government areas`;
    const indexCrumbs = [
      { name: "Home", path: "/" },
      { name: "Australia", path: "/au/" },
      { name: "Australia", path: auHome() },
      ...(slug === "other-territories" ? [] : [{ name: parentName, path: parentPath }]),
      { name: title, path: indexHref },
    ];
    const named = items.filter((item) => item.legalPid).length;
    const lede =
      slug === "victoria"
        ? "79 local councils named by the Victorian Electoral Commission, then the ABS unincorporated area that is not one of those councils. The Commission’s report to Parliament says the 2024 general elections were held on 26 October 2024, except that no election was held for Moira Shire Council. It says the next local government elections are in October 2028 and does not print a calendar day for 2028."
        : slug === "queensland"
          ? "78 names from the Queensland Government local government area boundaries dataset (CC BY 4.0), with the matching ABS 2025 code. The Electoral Commission of Queensland says there are 77 local government areas. Both figures are kept. Mayors were not copied."
          : slug === "australian-capital-territory"
            ? `${items.length} Local Government Area in the ABS ASGS2025 extract, excluding non-spatial special purpose codes. The Geoscape August 2026 state tables read for this release do not include an Australian Capital Territory local government area table.`
            : `${items.length} Local Government Areas in the ABS ASGS2025 extract, excluding non-spatial special purpose codes. ${named} legal names are from the Geoscape Administrative Boundaries August 2026 table, CC BY 4.0, matched to those ABS codes. A Geoscape name with no ABS 2025 code in this extract has no separate page.`;
    const body =
      slug === "victoria"
        ? `<h2>79 local councils</h2>${list(councils.map((item) => ({ name: item.name, href: localPath(item) })))}<h2>Not one of the 79 councils</h2>${list(rest.map((item) => ({ name: item.name, href: localPath(item) })))}`
        : list(links);
    writePage(
      indexHref,
      shell({
        path: indexHref,
        title,
        description: `${title}. Unofficial information.`,
        crumbs: indexCrumbs,
        eyebrow: parentName,
        h1: title,
        lede,
        officeHref: areaOffice(items[0]),
        body,
        sourceIds: areaSources(items[0]),
        updated: slug === "queensland" ? UPDATED_24 : UPDATED_26,
      }),
    );
    const councilLinks = councils.map((item) => ({ name: item.name, href: localPath(item) }));
    const restLinks = rest.map((item) => ({ name: item.name, href: localPath(item) }));
    items.forEach((item) => {
      const path = localPath(item);
      const siblings = item.group === "vic-council" ? councilLinks : slug === "victoria" ? restLinks : links;
      const indexIn = siblings.findIndex((link) => link.href === path);
      const h1 = item.name;
      const lede =
        item.group === "vic-council"
          ? `${item.name}, a Victorian local council. ABS statistical code ${item.absCode} (${item.absName}).`
          : item.jurisdictionSlug === "queensland" && item.stateCode
            ? `${item.name}, a Queensland local government area. State code ${item.stateCode}. ABS statistical code ${item.absCode} (${item.absName}).`
            : item.legalPid
              ? `${item.name}, a local government area in ${parentName}. ABS statistical code ${item.absCode} (${item.absName}).`
              : `${item.absName}, ABS Local Government Area code ${item.absCode}, ${parentName}.`;
      writePage(
        path,
        shell({
          path,
          title: h1,
          description: `${lede} Unofficial information.`,
          crumbs: parentCrumbs(slug, title, indexHref, h1, path),
          eyebrow: item.group === "vic-council" ? "Local council" : "Local government area",
          h1,
          lede,
          officeHref: areaOffice(item),
          body: `${areaBody(item)}${nearby(siblings, indexIn)}${nearbyPlacesParagraph(
            "en",
            nearbyIds(`au-area:${slug}/${item.slug}`)
              .map((id) => items.find((other) => other.slug === id && other.group === item.group))
              .filter((other): other is NonNullable<typeof other> => Boolean(other))
              .map((other) => ({ href: localPath(other), name: other.name })),
          )}<p><a href="${esc(indexHref)}">${esc(title)}</a> · <a href="${esc(parentPath)}">${esc(parentName)}</a></p>`,
          sourceIds: areaSources(item),
          updated: item.jurisdictionSlug === "queensland" ? UPDATED_24 : UPDATED_26,
        }),
      );
    });
  }
}

renderDistricts();
renderAreas();
console.log(`au level 3: ${STATE_DISTRICTS.length} districts, ${LOCAL_AREAS.length} local areas`);
