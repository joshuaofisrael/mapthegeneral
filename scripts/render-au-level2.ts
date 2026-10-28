import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ASSEMBLY,
  COUNCIL,
  assemblyIndexPath,
  assemblyPath,
  councilIndexPath,
  councilPath,
  divisionPath,
  divisionsIn,
  houseIndexPath,
  stateHouseIndexPath,
  type AssemblyDistrict,
  type CouncilRegion,
  type VicMember,
} from "../src/data/au/level2";
import { JURISDICTIONS, alphaJurisdictions } from "../src/data/au/places";
import { sourcesById } from "../src/data/au/sources";
import { SITE, absoluteUrl, reportErrorHref } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { GA_HEAD_TAGS } from "../src/lib/google-analytics";
import { socialMetaTags } from "../src/lib/social";
import { auHome, jurisdictionPath } from "../src/countries/au";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const UPDATED = "18 October 2026";

const AEC_NOTE =
  "The Australian Electoral Commission profiles page, read on 18 October 2026, says: “This page represents the electorates that were in place for the 2025 federal election. The website will be updated to reflect the recently determined redistributions in South Australia, Tasmania and the Australian Capital Territory prior to the next federal election.”";

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function jurisdictionName(slug: string): string {
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
${GA_HEAD_TAGS}
</head>
<body>
<p class="banner">Unofficial information. Confirm with your <a href="${esc(input.officeHref)}">official election office</a>.</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="${esc(auHome())}">Australia</a> · <a href="/search/">Search</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbs}</nav>
<p class="eyebrow">${esc(input.eyebrow)}</p>
<h1>${esc(input.h1)}</h1>
<p class="lede">${esc(input.lede)}</p>
<p><strong>Last updated: ${UPDATED}.</strong> <a href="${esc(reportErrorHref(input.path))}">Report an error</a></p>
${input.body}
<h2>Sources</h2>
<ul>${sources}</ul>
</main>
${withLegalFooter("")}
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
  return parts.length ? parts.join(" · ") : "";
}

function list(items: { name: string; href: string }[]): string {
  return `<ul>${items.map((item) => `<li><a href="${esc(item.href)}">${esc(item.name)}</a></li>`).join("")}</ul>`;
}

const POV_MEMBERS_PAGE = "https://www.parliament.vic.gov.au/members/";

const VEC_BY_ELECTION: Record<string, string> = {
  "vec-narracan-2023": "the Narracan District supplementary election of Saturday 28 January 2023",
  "vec-warrandyte-2023": "the Warrandyte District by-election of Saturday 26 August 2023",
  "vec-mulgrave-2023": "the Mulgrave District by-election of Saturday 18 November 2023",
  "vec-prahran-2025": "the Prahran District by-election of Saturday 8 February 2025",
  "vec-werribee-2025": "the Werribee District by-election of Saturday 8 February 2025",
  "vec-nepean-2026": "the Nepean District by-election of Saturday 2 May 2026",
};

function ordinal(n: number): string {
  return ["", "1st", "2nd", "3rd", "4th", "5th"][n] ?? `${n}th`;
}

function vecDeclared(member: VicMember): string {
  const event = VEC_BY_ELECTION[member.source] ?? "the 26 November 2022 state election";
  return `<p>The Victorian Electoral Commission results for ${esc(event)} print the elected member as ${esc(member.printed)}, ${esc(member.party)}.</p>`;
}

function vicGap(what: string, extra = "", fill = "No name is filled in here."): string {
  return `<p class="gap"><strong>Gap.</strong> The Victorian Electoral Commission results used here (the 2022 state election and the by-election and supplementary election results since) do not confirm ${what}. ${fill}${extra} The Parliament of Victoria publishes its <a href="${esc(POV_MEMBERS_PAGE)}">current members</a>.</p>`;
}

function baseCrumbs(extra: { name: string; path: string }[]): { name: string; path: string }[] {
  return [
    { name: "Home", path: "/" },
    { name: "Australia", path: "/au/" },
    { name: "Australia", path: auHome() },
    ...extra,
  ];
}

const states = alphaJurisdictions();
const assemblyAlpha = [...ASSEMBLY].sort((a, b) => a.name.localeCompare(b.name, "en"));
const councilAlpha = [...COUNCIL].sort((a, b) => a.name.localeCompare(b.name, "en"));
const divisionItems = states.flatMap((state) =>
  divisionsIn(state.slug).map((item) => ({
    name: item.name,
    href: divisionPath(state.slug, item.slug),
    state,
    item,
  })),
);

const APH_MEMBERS_PAGE = "https://www.aph.gov.au/Senators_and_Members/Members";

function divisionPage(row: (typeof divisionItems)[number], indexInState: number, stateRows: typeof divisionItems): string {
  const { item, state } = row;
  const path = row.href;
  const parent = jurisdictionPath(state.slug);
  const indexPath = stateHouseIndexPath(state.slug);
  const profile = item.profilePath.startsWith("/")
    ? `https://www.aec.gov.au${item.profilePath}`
    : `https://www.aec.gov.au/${item.profilePath}`;
  const near = nearby(
    stateRows.map((entry) => ({ name: entry.name, href: entry.href })),
    indexInState,
  );
  const body = `<table>
<tr><th>State, as printed</th><td>${esc(item.stateLabel)}</td></tr>
<tr><th>Area (sq km), as printed</th><td>${esc(item.area)}</td></tr>
<tr><th>Most recent redistribution, as printed</th><td>${esc(item.redistribution)}</td></tr>
</table>
<p>${esc(AEC_NOTE)}</p>
<p><a href="${esc(profile)}">Profile of electorate of ${esc(item.name)}</a></p>
<h2>Member</h2>
${
  item.member.source === "aec-farrer-2026"
    ? `<p>The Australian Electoral Commission says David Farley was declared the elected member for Farrer on Thursday 28 May 2026, after the Farrer by-election of Saturday 9 May 2026. Its tally room lists ${esc(item.member.printed)}, ${esc(item.member.party)}, as elected.</p>`
    : `<p>The Australian Electoral Commission tally room list of House members elected at the 3 May 2025 federal election prints ${esc(item.member.printed)}, ${esc(item.member.party)}, for ${esc(item.name)}.</p>`
}
<p>The Commission’s by-elections page, read on 18 October 2026, lists one House by-election since the 2025 federal election: Farrer, on 9 May 2026. This page does not track later changes. The Parliament of Australia publishes the <a href="${esc(APH_MEMBERS_PAGE)}">current members of the House</a>.</p>
<h2>Elections</h2>
<p>The Commission’s 2025 federal election page is headed Saturday 3 May 2025. It says the official results are as they were at the return of the writs (12 June 2025). </p>
<p>The Commission’s media release updated 23 July 2026 says the next federal election is due to be held between August 2027 and May 2028. The timetable page says the AEC has no role in determining the date of an election. This page does not name a polling day.</p>
<p class="tools">Parent: <a href="${esc(parent)}">${esc(state.officialName)}</a> · <a href="${esc(indexPath)}">House divisions in ${esc(state.officialName)}</a> · <a href="${esc(houseIndexPath())}">All House divisions</a>. Alphabetical neighbours: ${near}.</p>`;
  return shell({
    path,
    title: item.name,
    description: `${item.name} (${item.stateLabel}): House division for the 2025 federal election. Unofficial information.`,
    crumbs: baseCrumbs([
      { name: state.officialName, path: parent },
      { name: "House of Representatives", path: indexPath },
      { name: item.name, path },
    ]),
    eyebrow: "House of Representatives division",
    h1: item.name,
    lede: state.officialName,
    officeHref: "https://www.aec.gov.au/profiles/",
    body,
    sourceIds: [
      "aec-profiles",
      "aec-2025",
      item.member.source === "aec-farrer-2026" ? "aec-farrer-2026" : "aec-2025-elected",
      "aec-by-elections",
      "aec-entitlement-2026",
      "aec-timetable",
    ],
  });
}

function assemblyPage(item: AssemblyDistrict): string {
  const path = assemblyPath(item.slug);
  const parent = jurisdictionPath("victoria");
  const indexPath = assemblyIndexPath();
  const index = assemblyAlpha.findIndex((row) => row.slug === item.slug);
  const near = nearby(
    assemblyAlpha.map((row) => ({ name: row.name, href: assemblyPath(row.slug) })),
    index,
  );
  const member = item.member
    ? `${vecDeclared(item.member)}\n<p>This page does not track changes after the Commission’s last declared result for this district. The Parliament of Victoria publishes its <a href="${esc(POV_MEMBERS_PAGE)}">current members</a>.</p>`
    : vicGap("the current member for this district");
  const narracan =
    item.slug === "narracan-district"
      ? `<p>The same report says the Narracan District election failed, and that a supplementary election for Narracan District was held on Saturday 28 January 2023.</p>`
      : "";
  const body = `<p>The Victorian Electoral Commission state-districts page says there are 88 electoral districts in Victoria, and that voters in a district elect one member of Parliament to represent them in Victoria’s Legislative Assembly.</p>
<h2>Member</h2>
${member}
<h2>Elections</h2>
<p>The Commission’s report to Parliament says the Victorian State general election was held on 26 November 2022, and that on 26 November 2022 Victorians elected the 60th Parliament of Victoria.</p>
${narracan}
<p>The Commission says the next state election is on Saturday 28 November 2026. The Parliament of Victoria prints the same day and says nominations open on Wednesday 4 November 2026. On 18 October 2026 that day has not arrived. No candidate list is printed here. This page does not publish a poll, a projection, or a result call.</p>
<p class="tools">Parent: <a href="${esc(parent)}">Victoria</a> · <a href="${esc(indexPath)}">All Legislative Assembly districts</a>. Alphabetical neighbours: ${near}.</p>`;
  return shell({
    path,
    title: item.name,
    description: `${item.name}: Victorian Legislative Assembly district. Next state election Saturday 28 November 2026. Unofficial information.`,
    crumbs: baseCrumbs([
      { name: "Victoria", path: parent },
      { name: "Legislative Assembly districts", path: indexPath },
      { name: item.name, path },
    ]),
    eyebrow: "Legislative Assembly district",
    h1: item.name,
    lede: "Victoria",
    officeHref: "https://www.vec.vic.gov.au/electoral-boundaries/state-districts",
    body,
    sourceIds: [
      "vec-districts",
      item.member ? item.member.source : "vec-2022-districts",
      "vec-by-elections",
      "vec-state",
      "vic-parliament-2026",
      "vec-2022-report",
      "pov-members",
    ],
  });
}

function councilPage(item: CouncilRegion): string {
  const path = councilPath(item.slug);
  const parent = jurisdictionPath("victoria");
  const indexPath = councilIndexPath();
  const index = councilAlpha.findIndex((row) => row.slug === item.slug);
  const near = nearby(
    councilAlpha.map((row) => ({ name: row.name, href: councilPath(row.slug) })),
    index,
  );
  const body = `<p>The Victorian Electoral Commission state-regions page says there are 8 electoral regions in Victoria, that each region is made up of 11 districts, and that voters in a region elect 5 members of Parliament to represent them in Victoria’s Legislative Council.</p>
<h2>Members</h2>
<p>The Victorian Electoral Commission results by region for the 26 November 2022 state election print five members elected for ${esc(item.name)}, in order. Listed here are those members from that count who still held the seat on 18 October 2026:</p>
<ul>${item.members.map((member) => `<li>${esc(ordinal(member.order))} elected: ${esc(member.printed)}, ${esc(member.party)}.</li>`).join("")}</ul>
${
  item.members.length < 5
    ? vicGap(
        `${5 - item.members.length === 1 ? "one of the five current members" : `${5 - item.members.length} of the five current members`} for this region`,
        " The Commission’s page on by-elections and appointments says an upper house vacancy is filled by a person the party nominates, appointed at a joint sitting of Parliament, not by an election.",
        5 - item.members.length === 1 ? "No name is filled in for that seat." : "No names are filled in for those seats.",
      )
    : `<p>This page does not track changes after the 2022 count. The Parliament of Victoria publishes its <a href="${esc(POV_MEMBERS_PAGE)}">current members</a>.</p>`
}
<h2>Elections</h2>
<p>The Commission’s report to Parliament says the Victorian State general election was held on 26 November 2022, and that on 26 November 2022 Victorians elected the 60th Parliament of Victoria.</p>
<p>The Commission says the next state election is on Saturday 28 November 2026. The Parliament of Victoria prints the same day and says nominations open on Wednesday 4 November 2026. On 18 October 2026 that day has not arrived. No candidate list is printed here. This page does not publish a poll, a projection, or a result call.</p>
<p class="tools">Parent: <a href="${esc(parent)}">Victoria</a> · <a href="${esc(indexPath)}">All Legislative Council regions</a>. Alphabetical neighbours: ${near}.</p>`;
  return shell({
    path,
    title: item.name,
    description: `${item.name}: Victorian Legislative Council region, five members. Next state election Saturday 28 November 2026. Unofficial information.`,
    crumbs: baseCrumbs([
      { name: "Victoria", path: parent },
      { name: "Legislative Council regions", path: indexPath },
      { name: item.name, path },
    ]),
    eyebrow: "Legislative Council region",
    h1: item.name,
    lede: "Victoria",
    officeHref: "https://www.vec.vic.gov.au/electoral-boundaries/state-regions",
    body,
    sourceIds: ["vec-regions", "vec-2022-regions", "vec-state", "vic-parliament-2026", "vec-2022-report", "vec-appointments", "pov-members"],
  });
}

rmSync(join(publicDir, "au", "en", "house"), { recursive: true, force: true });
rmSync(join(publicDir, "au", "en", "victoria", "assembly"), { recursive: true, force: true });
rmSync(join(publicDir, "au", "en", "victoria", "council"), { recursive: true, force: true });
for (const state of JURISDICTIONS) {
  rmSync(join(publicDir, "au", "en", state.slug, "house"), { recursive: true, force: true });
}

let written = 0;
for (const state of states) {
  const rows = divisionItems.filter((row) => row.state.slug === state.slug);
  rows.forEach((row, index) => {
    writePage(row.href, divisionPage(row, index, rows));
    written += 1;
  });
  const indexPath = stateHouseIndexPath(state.slug);
  writePage(
    indexPath,
    shell({
      path: indexPath,
      title: `${state.officialName} House divisions`,
      description: `${rows.length} House of Representatives divisions in ${state.officialName}, from the Australian Electoral Commission profiles page. Unofficial information.`,
      crumbs: baseCrumbs([
        { name: state.officialName, path: jurisdictionPath(state.slug) },
        { name: "House of Representatives", path: indexPath },
      ]),
      eyebrow: "House of Representatives",
      h1: `${state.officialName} divisions`,
      lede: `${rows.length} names on the Australian Electoral Commission profiles page, read on 18 October 2026.`,
      officeHref: "https://www.aec.gov.au/profiles/",
      body: `<p>${esc(AEC_NOTE)}</p>${list(rows.map((row) => ({ name: row.name, href: row.href })))}<p class="tools">Parent: <a href="${esc(jurisdictionPath(state.slug))}">${esc(state.officialName)}</a> · <a href="${esc(houseIndexPath())}">All House divisions</a>.</p>`,
      sourceIds: ["aec-profiles", "aec-2025-elected"],
    }),
  );
  written += 1;
}

const housePath = houseIndexPath();
const grouped = `<ul>${states
  .map((state) => {
    const count = divisionItems.filter((row) => row.state.slug === state.slug).length;
    return `<li><a href="${esc(stateHouseIndexPath(state.slug))}">${esc(state.officialName)}</a> — ${count}</li>`;
  })
  .join("")}</ul>`;
writePage(
  housePath,
  shell({
    path: housePath,
    title: "House of Representatives divisions",
    description:
      "150 House of Representatives divisions in place for the 2025 federal election, from the Australian Electoral Commission. Unofficial information.",
    crumbs: baseCrumbs([{ name: "House of Representatives", path: housePath }]),
    eyebrow: "Level 2 index",
    h1: "House of Representatives divisions",
    lede: "150 divisions, listed on each state and territory page. Names are from the Australian Electoral Commission profiles page, read on 18 October 2026.",
    officeHref: "https://www.aec.gov.au/profiles/",
    body: `<p>${esc(AEC_NOTE)}</p>${grouped}<p class="tools"><a href="${esc(auHome())}">Australia</a> · <a href="${esc(assemblyIndexPath())}">Victorian Legislative Assembly districts</a> · <a href="${esc(councilIndexPath())}">Victorian Legislative Council regions</a>.</p>`,
    sourceIds: ["aec-profiles", "aec-2025-elected"],
  }),
);
written += 1;

const assemblyIndex = assemblyIndexPath();
writePage(
  assemblyIndex,
  shell({
    path: assemblyIndex,
    title: "Victorian Legislative Assembly districts",
    description:
      "88 Victorian Legislative Assembly districts. Next state election Saturday 28 November 2026. Unofficial information.",
    crumbs: baseCrumbs([
      { name: "Victoria", path: jurisdictionPath("victoria") },
      { name: "Legislative Assembly districts", path: assemblyIndex },
    ]),
    eyebrow: "Level 2 index",
    h1: "Legislative Assembly districts",
    lede: "88 names on the Victorian Electoral Commission state-districts page, read on 18 October 2026.",
    officeHref: "https://www.vec.vic.gov.au/electoral-boundaries/state-districts",
    body: `<p>That page says voters in a district elect one member of the Legislative Assembly. The next state election printed by the Commission is Saturday 28 November 2026. This page does not publish a poll, a projection, or a result call.</p>${list(assemblyAlpha.map((item) => ({ name: item.name, href: assemblyPath(item.slug) })))}<p class="tools">Parent: <a href="${esc(jurisdictionPath("victoria"))}">Victoria</a> · <a href="${esc(councilIndexPath())}">Legislative Council regions</a>.</p>`,
    sourceIds: ["vec-districts", "vec-state", "acma-blackout"],
  }),
);
written += 1;
for (const item of assemblyAlpha) {
  writePage(assemblyPath(item.slug), assemblyPage(item));
  written += 1;
}

const councilIndex = councilIndexPath();
writePage(
  councilIndex,
  shell({
    path: councilIndex,
    title: "Victorian Legislative Council regions",
    description:
      "8 Victorian Legislative Council regions. Next state election Saturday 28 November 2026. Unofficial information.",
    crumbs: baseCrumbs([
      { name: "Victoria", path: jurisdictionPath("victoria") },
      { name: "Legislative Council regions", path: councilIndex },
    ]),
    eyebrow: "Level 2 index",
    h1: "Legislative Council regions",
    lede: "8 names on the Victorian Electoral Commission state-regions page, read on 18 October 2026.",
    officeHref: "https://www.vec.vic.gov.au/electoral-boundaries/state-regions",
    body: `<p>That page says voters in a region elect 5 members of the Legislative Council. The next state election printed by the Commission is Saturday 28 November 2026. This page does not publish a poll, a projection, or a result call.</p>${list(councilAlpha.map((item) => ({ name: item.name, href: councilPath(item.slug) })))}<p class="tools">Parent: <a href="${esc(jurisdictionPath("victoria"))}">Victoria</a> · <a href="${esc(assemblyIndexPath())}">Legislative Assembly districts</a>.</p>`,
    sourceIds: ["vec-regions", "vec-state", "acma-blackout"],
  }),
);
written += 1;
for (const item of councilAlpha) {
  writePage(councilPath(item.slug), councilPage(item));
  written += 1;
}

if (written !== 150 + 8 + 1 + 88 + 1 + 8 + 1) throw new Error(`Unexpected page count ${written}`);
console.log(`australia level 2 html: ${written}`);
