import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ASSEMBLY,
  ASSEMBLY_INDEX,
  CONSTITUENCY_HUB,
  MSP_DIRECTORY,
  NATION_NAME,
  SCOTTISH_CONSTITUENCIES,
  SCOTTISH_PARLIAMENT_INDEX,
  SCOTTISH_REGIONS,
  SENEDD,
  SENEDD_FIND,
  SENEDD_INDEX,
  WESTMINSTER,
  WESTMINSTER_INDEX,
  assemblyPath,
  constituenciesInRegion,
  mpProfile,
  seneddPath,
  spConstituencyPath,
  spRegionPath,
  westminsterIn,
  westminsterNationIndex,
  westminsterSeatPath,
  type AssemblySeat,
  type NationSlug,
  type SeneddSeat,
  type SpConstituency,
  type SpRegion,
  type WestminsterSeat,
} from "../src/data/gb/level2";
import { nationPath } from "../src/data/gb/paths";
import { sourcesById } from "../src/data/gb/sources";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { GA_HEAD_TAGS } from "../src/lib/google-analytics";
import { socialMetaTags } from "../src/lib/social";
import { formatIsoDate } from "../src/lib/format";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://www.electoralcommission.org.uk/about-us/our-plans-priorities-and-spending/corporate-plan-2025/6-2029/30/electoral-system";
const NATIONS: NationSlug[] = ["england", "scotland", "wales", "northern-ireland"];

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function date(iso: string): string {
  return formatIsoDate(iso, "en");
}

function sourcesHtml(ids: string[]): string {
  return sourcesById(ids)
    .map(
      (source) =>
        `<li><a href="${esc(source.url)}">${esc(source.name)}</a> — read ${esc(source.readOn)}</li>`,
    )
    .join("");
}

function page(input: {
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  body: string;
  licence: string;
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
  const crumbNav = input.crumbs
    .map((item, index) =>
      index === input.crumbs.length - 1
        ? `<span>${esc(item.name)}</span>`
        : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
  const socialTitle = `${input.title} · ${SITE.name}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(socialTitle)}</title>
<meta name="description" content="${esc(input.description)}">
<link rel="canonical" href="${esc(canonical)}">
<link rel="alternate" hreflang="en" href="${esc(canonical)}">
<link rel="alternate" hreflang="x-default" href="${esc(canonical)}">
<meta name="robots" content="index,follow">
<meta property="og:title" content="${esc(socialTitle)}">
<meta property="og:description" content="${esc(input.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_GB">
${socialMetaTags()}
<link rel="stylesheet" href="/gb/place.css">
<script type="application/ld+json">${jsonLd}</script>
${ADSENSE_HEAD_TAGS}
${GA_HEAD_TAGS}
</head>
<body>
<p class="banner">${esc(SITE.officialNotUs).replace("official election office", `<a href="${OFFICE}">official election office</a>`)}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="/gb/en/">United Kingdom</a> · <a href="/search/">Search</a> · <a href="${esc(CONSTITUENCY_HUB)}">Constituencies</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav}</nav>
<p><strong>Records read 18 October 2026.</strong> <a href="${esc(reportErrorHref(input.path))}">Report an error</a></p>
${input.body}
</main>
${withLegalFooter(`${input.licence} Unofficial, and not endorsed by the bodies named here.`)}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
}

function write(path: string, html: string): number {
  const file = join(publicDir, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  return Buffer.byteLength(html);
}

function nearby(prev?: { href: string; name: string }, next?: { href: string; name: string }): string {
  const parts: string[] = [];
  if (prev) parts.push(`<a href="${esc(prev.href)}">${esc(prev.name)}</a>`);
  if (next) parts.push(`<a href="${esc(next.href)}">${esc(next.name)}</a>`);
  return parts.length ? ` Alphabetical neighbours: ${parts.join(" · ")}.` : "";
}

function linkList(items: { href: string; name: string; detail: string }[]): string {
  return `<ul>${items
    .map(
      (item) =>
        `<li><a href="${esc(item.href)}">${esc(item.name)}</a> — ${esc(item.detail)}</li>`,
    )
    .join("")}</ul>`;
}

const OPL = `Contains Parliamentary information licensed under the <a href="https://www.parliament.uk/site-information/copyright-parliament/open-parliament-licence/">Open Parliament Licence v3.0</a>.`;
const ONS = `Source: Office for National Statistics licensed under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v.3.0</a>.`;
const OGL = `Contains public sector information licensed under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0</a>.`;
const SPCL = `Contains information licensed under the <a href="https://www.parliament.scot/about/copyright">Scottish Parliament Copyright Licence</a>.`;
const NI_OGL = `Contains Parliamentary information licensed under the <a href="http://data.niassembly.gov.uk/licence.aspx">Open Government Licence v3.0</a>.`;

function westminsterBody(seat: WestminsterSeat, prev?: WestminsterSeat, next?: WestminsterSeat): string {
  const extraName = seat.fullTitle.includes(seat.displayName)
    ? ""
    : `<tr><th>nameDisplayAs</th><td>${esc(seat.displayName)}</td></tr>`;
  const welsh = seat.welshName
    ? `<tr><th>ONS field PCON24NMW</th><td>${esc(seat.welshName)}</td></tr>`
    : "";
  let electionNote = "";
  const sourceIds = [
    "members-constituencies",
    "ons-pcon-2024",
    "ons-geog-licences",
    "ge2024-results",
    "ec-schedule",
    "dacop-s4",
  ];
  if (seat.byElection || seat.statusStart !== "2024-07-04") sourceIds.push("commons-by-elections");
  if (seat.byElection?.statusMatchesList) {
    electionNote = `<p>The UK Parliament list of by-elections in the 59th Parliament includes “${esc(seat.byElection.listed)}”. The Members API records this membership status as starting on that date. This page does not state a cause, and it does not reprint votes.</p>`;
  } else if (seat.byElection) {
    electionNote = `<p>The UK Parliament list of by-elections in the 59th Parliament includes “${esc(seat.byElection.listed)}”. The Members API records the current membership status as starting on ${esc(date(seat.statusStart))}. This page does not explain the difference, and it does not state a cause or reprint votes.</p>`;
  } else if (seat.statusStart !== "2024-07-04") {
    electionNote = `<p class="gap"><strong>Gap.</strong> The by-elections list read on 18 October 2026 does not name ${esc(seat.name)}. This page does not state why the membership status starts on ${esc(date(seat.statusStart))}.</p>`;
  }
  const description = `${seat.name}: ${seat.fullTitle}, ${seat.party}. Westminster constituency, ${NATION_NAME[seat.nation]}. Unofficial information.`;
  return page({
    path: westminsterSeatPath(seat),
    title: seat.name,
    description,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: NATION_NAME[seat.nation], path: nationPath(seat.nation) },
      { name: "Westminster constituencies", path: westminsterNationIndex(seat.nation) },
      { name: seat.name, path: westminsterSeatPath(seat) },
    ],
    licence: `${OPL} ${ONS}`,
    body: `<p class="eyebrow">Westminster constituency · ${esc(NATION_NAME[seat.nation])}</p>
<h1>${esc(seat.name)}</h1>
<p class="lede">House of Commons. 2024 boundaries.</p>
<table>
<tr><th>Current member</th><td><a href="${esc(mpProfile(seat.memberId))}">${esc(seat.fullTitle)}</a></td></tr>
${extraName}
<tr><th>Party</th><td>${esc(seat.party)}</td></tr>
<tr><th>Membership status</th><td>${esc(seat.statusDescription)}, from ${esc(date(seat.statusStart))}</td></tr>
<tr><th>ONS code</th><td>${esc(seat.gss)}</td></tr>
<tr><th>Constituency record start</th><td>${esc(date(seat.boundaryStart))}</td></tr>
${welsh}
</table>
<h2>Elections</h2>
<p>The UK Parliament results page titles one count “Results for the UK general election on 4 July 2024”. The data.gov.uk summary of the July 2024 names-and-codes file says those constituencies are operative 4 July 2024, and that page prints Licence: Not set. The Electoral Commission schedule lists the UK Parliament at no later than 15 August 2029. Section 4 of the Dissolution and Calling of Parliament Act 2022 says that if it has not been dissolved earlier, a Parliament dissolves at the beginning of the day that is the fifth anniversary of the day on which it first met.</p>
<p class="gap"><strong>Gap.</strong> The day the current Parliament first met is not printed in section 4 or in that Electoral Commission table. Candidate lists are not published on this page.</p>
${electionNote}
<p class="tools">Parent: <a href="${esc(nationPath(seat.nation))}">${esc(NATION_NAME[seat.nation])}</a> · <a href="${esc(westminsterNationIndex(seat.nation))}">Westminster constituencies in ${esc(NATION_NAME[seat.nation])}</a>.${nearby(
      prev ? { href: westminsterSeatPath(prev), name: prev.name } : undefined,
      next ? { href: westminsterSeatPath(next), name: next.name } : undefined,
    )}</p>
<h2>Sources</h2>
<ul>${sourcesHtml(sourceIds)}</ul>`,
  });
}

function spConstBody(seat: SpConstituency, prev?: SpConstituency, next?: SpConstituency): string {
  return page({
    path: spConstituencyPath(seat),
    title: seat.name,
    description: `${seat.name}: ${seat.member.displayName}, ${seat.member.party}. Scottish Parliament constituency. Unofficial information.`,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "Scotland", path: nationPath("scotland") },
      { name: "Scottish Parliament", path: SCOTTISH_PARLIAMENT_INDEX },
      { name: seat.name, path: spConstituencyPath(seat) },
    ],
    licence: SPCL,
    body: `<p class="eyebrow">Scottish Parliament constituency</p>
<h1>${esc(seat.name)}</h1>
<p class="lede">Region: <a href="${esc(spRegionPath({ slug: seat.regionSlug } as SpRegion))}">${esc(seat.regionName)}</a></p>
<table>
<tr><th>Constituency code</th><td>${esc(seat.code)}</td></tr>
<tr><th>Record valid from</th><td>${esc(date(seat.validFrom))}</td></tr>
<tr><th>Current member</th><td>${esc(seat.member.displayName)}</td></tr>
<tr><th>ParliamentaryName</th><td>${esc(seat.member.parliamentaryName)}</td></tr>
<tr><th>Party</th><td>${esc(seat.member.party)}</td></tr>
<tr><th>Membership from</th><td>${esc(date(seat.member.from))}</td></tr>
</table>
<p>The name above is the open-data constituency Name. ParliamentaryName is the member field, printed as “Surname, Forenames”; the current member line reverses that comma when the field has one comma. The party is ActualName with surrounding spaces removed. Election status on this row is Current.</p>
<h2>Elections</h2>
<p>The Electoral Commission key-dates page includes Scottish Parliament elections on Thursday 7 May 2026. The open constituency record and this membership both start on ${esc(date(seat.validFrom))}.</p>
<p class="gap"><strong>Gap.</strong> No date for the next Scottish Parliament election was in the sources read for this page. Candidate lists are not published. <a href="${esc(MSP_DIRECTORY)}">Current and previous MSPs</a>.</p>
<p class="tools">Parent: <a href="${esc(nationPath("scotland"))}">Scotland</a> · <a href="${esc(SCOTTISH_PARLIAMENT_INDEX)}">Scottish Parliament</a>.${nearby(
      prev ? { href: spConstituencyPath(prev), name: prev.name } : undefined,
      next ? { href: spConstituencyPath(next), name: next.name } : undefined,
    )}</p>
<h2>Sources</h2>
<ul>${sourcesHtml(["sp-open-data", "sp-copyright", "ec-2026-dates"])}</ul>`,
  });
}

function spRegionBody(region: SpRegion, prev?: SpRegion, next?: SpRegion): string {
  const rows = region.members
    .map(
      (member) =>
        `<tr><td>${esc(member.displayName)}</td><td>${esc(member.parliamentaryName)}</td><td>${esc(member.party)}</td><td>${esc(date(member.from))}</td></tr>`,
    )
    .join("");
  const children = constituenciesInRegion(region.slug)
    .map((seat) => `<li><a href="${esc(spConstituencyPath(seat))}">${esc(seat.name)}</a></li>`)
    .join("");
  const later = region.members.filter((member) => member.from !== "2026-05-07");
  const laterNote = later.length
    ? `<p class="gap"><strong>Gap.</strong> ${esc(later.map((member) => member.displayName).join(", "))} ${later.length === 1 ? "has a membership start" : "have membership starts"} after 7 May 2026. This page does not state why.</p>`
    : "";
  return page({
    path: spRegionPath(region),
    title: region.name,
    description: `${region.name}: Scottish Parliament region, ${region.members.length} current regional members. Unofficial information.`,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "Scotland", path: nationPath("scotland") },
      { name: "Scottish Parliament", path: SCOTTISH_PARLIAMENT_INDEX },
      { name: region.name, path: spRegionPath(region) },
    ],
    licence: SPCL,
    body: `<p class="eyebrow">Scottish Parliament region</p>
<h1>${esc(region.name)}</h1>
<p class="lede">The open-data region name is printed above as the API records it.</p>
<table>
<tr><th>Region code</th><td>${esc(region.code)}</td></tr>
<tr><th>Region record start</th><td>${esc(date(region.start))}</td></tr>
<tr><th>Region record end</th><td>Empty in the API</td></tr>
</table>
<h2>Current regional members</h2>
<table>
<tr><th>Member</th><th>ParliamentaryName</th><th>Party</th><th>From</th></tr>
${rows}
</table>
<p>These are memberships with election status Current on this region. A Current membership whose region record has ended is not listed. Party is ActualName with surrounding spaces removed.</p>
${laterNote}
<h2>Elections</h2>
<p>The Electoral Commission key-dates page includes Scottish Parliament elections on Thursday 7 May 2026.</p>
<p class="gap"><strong>Gap.</strong> No date for the next Scottish Parliament election was in the sources read for this page. Candidate lists are not published. <a href="${esc(MSP_DIRECTORY)}">Current and previous MSPs</a>.</p>
<h2>Constituencies in this region</h2>
<ul>${children}</ul>
<p class="tools">Parent: <a href="${esc(nationPath("scotland"))}">Scotland</a> · <a href="${esc(SCOTTISH_PARLIAMENT_INDEX)}">Scottish Parliament</a>.${nearby(
      prev ? { href: spRegionPath(prev), name: prev.name } : undefined,
      next ? { href: spRegionPath(next), name: next.name } : undefined,
    )}</p>
<h2>Sources</h2>
<ul>${sourcesHtml(["sp-open-data", "sp-copyright", "ec-2026-dates"])}</ul>`,
  });
}

function seneddBody(seat: SeneddSeat, prev?: SeneddSeat, next?: SeneddSeat): string {
  const rows = seat.members
    .map(
      (member) =>
        `<tr><td>${esc(member.name)}</td><td>${esc(member.party)}</td><td>${esc(date(member.from))}</td></tr>`,
    )
    .join("");
  return page({
    path: seneddPath(seat),
    title: seat.name,
    description: `${seat.name}: Senedd constituency, six current members. Unofficial information.`,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "Wales", path: nationPath("wales") },
      { name: "Senedd constituencies", path: SENEDD_INDEX },
      { name: seat.name, path: seneddPath(seat) },
    ],
    licence: OGL,
    body: `<p class="eyebrow">Senedd constituency</p>
<h1>${esc(seat.name)}</h1>
<p class="lede">2026 constituency, as printed by the Senedd open-data service and by Find a Member of the Senedd.</p>
<h2>Current members</h2>
<table>
<tr><th>Member</th><th>Party</th><th>Open term from</th></tr>
${rows}
</table>
<p>Each row is a member whose open term of office in GetCouncillorsByWard has end date “unspecified” and start date 8 May 2026. The party is politicalpartytitle. Photos, addresses and contact fields in that file are not copied.</p>
<h2>Elections</h2>
<p>The Electoral Commission key-dates page includes Senedd Cymru elections on Thursday 7 May 2026.</p>
<p class="gap"><strong>Gap.</strong> No date for the next Senedd election was in the sources read for this page. This page does not state why the open term starts on 8 May 2026. Candidate lists are not published. <a href="${esc(SENEDD_FIND)}">Find a Member of the Senedd</a>.</p>
<p class="tools">Parent: <a href="${esc(nationPath("wales"))}">Wales</a> · <a href="${esc(SENEDD_INDEX)}">Senedd constituencies</a>.${nearby(
      prev ? { href: seneddPath(prev), name: prev.name } : undefined,
      next ? { href: seneddPath(next), name: next.name } : undefined,
    )}</p>
<h2>Sources</h2>
<ul>${sourcesHtml(["senedd-members", "senedd-find", "senedd-open-data", "ogl-v3", "ec-2026-dates"])}</ul>`,
  });
}

function assemblyBody(seat: AssemblySeat, prev?: AssemblySeat, next?: AssemblySeat): string {
  const rows = seat.members
    .map((member) => `<tr><td>${esc(member.name)}</td><td>${esc(member.party)}</td></tr>`)
    .join("");
  return page({
    path: assemblyPath(seat),
    title: seat.name,
    description: `${seat.name}: Northern Ireland Assembly constituency, five current MLAs. Unofficial information.`,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "Northern Ireland", path: nationPath("northern-ireland") },
      { name: "Assembly constituencies", path: ASSEMBLY_INDEX },
      { name: seat.name, path: assemblyPath(seat) },
    ],
    licence: NI_OGL,
    body: `<p class="eyebrow">Northern Ireland Assembly constituency</p>
<h1>${esc(seat.name)}</h1>
<p class="lede">Name as printed in GetAllCurrentMembers_JSON.</p>
<h2>Current members</h2>
<table>
<tr><th>MemberFullDisplayName</th><th>PartyName</th></tr>
${rows}
</table>
<p>Five current members are recorded for this constituency name. Photos are not copied.</p>
<h2>Elections</h2>
<p>The Electoral Commission corporate-plan table lists the Northern Ireland Assembly in May 2027. It does not print a day.</p>
<p class="gap"><strong>Gap.</strong> The members feed does not print the date of the last Assembly election. Candidate lists are not published.</p>
<p class="tools">Parent: <a href="${esc(nationPath("northern-ireland"))}">Northern Ireland</a> · <a href="${esc(ASSEMBLY_INDEX)}">Assembly constituencies</a>.${nearby(
      prev ? { href: assemblyPath(prev), name: prev.name } : undefined,
      next ? { href: assemblyPath(next), name: next.name } : undefined,
    )}</p>
<h2>Sources</h2>
<ul>${sourcesHtml(["ni-members", "ni-ogl", "ogl-v3", "ec-schedule"])}</ul>`,
  });
}

const seatBytes: number[] = [];

for (const nation of NATIONS) {
  const seats = westminsterIn(nation);
  seats.forEach((seat, index) => {
    seatBytes.push(write(westminsterSeatPath(seat), westminsterBody(seat, seats[index - 1], seats[index + 1])));
  });
  const items = seats.map((seat) => ({
    href: westminsterSeatPath(seat),
    name: seat.name,
    detail: `${seat.fullTitle}, ${seat.party}`,
  }));
  write(
    westminsterNationIndex(nation),
    page({
      path: westminsterNationIndex(nation),
      title: `Westminster constituencies in ${NATION_NAME[nation]}`,
      description: `${seats.length} Westminster constituencies in ${NATION_NAME[nation]}, with the current MP named on each page. Unofficial information.`,
      crumbs: [
        { name: "Home", path: "/" },
        { name: "United Kingdom", path: "/gb/en/" },
        { name: NATION_NAME[nation], path: nationPath(nation) },
        { name: "Westminster constituencies", path: westminsterNationIndex(nation) },
      ],
      licence: `${OPL} ${ONS}`,
      body: `<p class="eyebrow">${esc(NATION_NAME[nation])}</p>
<h1>Westminster constituencies in ${esc(NATION_NAME[nation])}</h1>
<p class="lede">${seats.length} current constituencies whose ONS code begins with ${nation === "england" ? "E" : nation === "scotland" ? "S" : nation === "wales" ? "W" : "N"}.</p>
${linkList(items)}
<p class="tools"><a href="${esc(nationPath(nation))}">${esc(NATION_NAME[nation])}</a> · <a href="${esc(WESTMINSTER_INDEX)}">All Westminster constituencies</a></p>
<h2>Sources</h2>
<ul>${sourcesHtml(["members-constituencies", "ons-pcon-2024", "ons-geog-licences"])}</ul>`,
    }),
  );
}

SCOTTISH_CONSTITUENCIES.forEach((seat, index) => {
  seatBytes.push(
    write(
      spConstituencyPath(seat),
      spConstBody(seat, SCOTTISH_CONSTITUENCIES[index - 1], SCOTTISH_CONSTITUENCIES[index + 1]),
    ),
  );
});
SCOTTISH_REGIONS.forEach((region, index) => {
  seatBytes.push(
    write(spRegionPath(region), spRegionBody(region, SCOTTISH_REGIONS[index - 1], SCOTTISH_REGIONS[index + 1])),
  );
});
SENEDD.forEach((seat, index) => {
  seatBytes.push(write(seneddPath(seat), seneddBody(seat, SENEDD[index - 1], SENEDD[index + 1])));
});
ASSEMBLY.forEach((seat, index) => {
  seatBytes.push(write(assemblyPath(seat), assemblyBody(seat, ASSEMBLY[index - 1], ASSEMBLY[index + 1])));
});

write(
  SCOTTISH_PARLIAMENT_INDEX,
  page({
    path: SCOTTISH_PARLIAMENT_INDEX,
    title: "Scottish Parliament constituencies and regions",
    description: "73 Scottish Parliament constituencies and 8 regions, with current members. Unofficial information.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "Scotland", path: nationPath("scotland") },
      { name: "Scottish Parliament", path: SCOTTISH_PARLIAMENT_INDEX },
    ],
    licence: SPCL,
    body: `<p class="eyebrow">Scotland</p>
<h1>Scottish Parliament constituencies and regions</h1>
<p class="lede">Constituencies and regions whose end date is empty, and memberships whose election status is Current.</p>
<h2>Regions</h2>
${linkList(
  SCOTTISH_REGIONS.map((region) => ({
    href: spRegionPath(region),
    name: region.name,
    detail: `${region.members.length} regional members`,
  })),
)}
<h2>Constituencies</h2>
${linkList(
  SCOTTISH_CONSTITUENCIES.map((seat) => ({
    href: spConstituencyPath(seat),
    name: seat.name,
    detail: `${seat.member.displayName}, ${seat.member.party}`,
  })),
)}
<p class="tools"><a href="${esc(nationPath("scotland"))}">Scotland</a></p>
<h2>Sources</h2>
<ul>${sourcesHtml(["sp-open-data", "sp-copyright"])}</ul>`,
  }),
);

write(
  SENEDD_INDEX,
  page({
    path: SENEDD_INDEX,
    title: "Senedd constituencies",
    description: "16 Senedd constituencies under the 2026 system, with current members. Unofficial information.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "Wales", path: nationPath("wales") },
      { name: "Senedd constituencies", path: SENEDD_INDEX },
    ],
    licence: OGL,
    body: `<p class="eyebrow">Wales</p>
<h1>Senedd constituencies</h1>
<p class="lede">16 constituencies from GetCouncillorsByWard. The same names are on Find a Member of the Senedd.</p>
${linkList(SENEDD.map((seat) => ({ href: seneddPath(seat), name: seat.name, detail: `${seat.members.length} members` })))}
<p class="tools"><a href="${esc(nationPath("wales"))}">Wales</a></p>
<h2>Sources</h2>
<ul>${sourcesHtml(["senedd-members", "senedd-find", "senedd-open-data", "ogl-v3"])}</ul>`,
  }),
);

write(
  ASSEMBLY_INDEX,
  page({
    path: ASSEMBLY_INDEX,
    title: "Northern Ireland Assembly constituencies",
    description: "18 Northern Ireland Assembly constituencies and current MLAs. Unofficial information.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "Northern Ireland", path: nationPath("northern-ireland") },
      { name: "Assembly constituencies", path: ASSEMBLY_INDEX },
    ],
    licence: NI_OGL,
    body: `<p class="eyebrow">Northern Ireland</p>
<h1>Northern Ireland Assembly constituencies</h1>
<p class="lede">18 constituency names in GetAllCurrentMembers_JSON, with 5 current members on each page.</p>
${linkList(
  ASSEMBLY.map((seat) => ({
    href: assemblyPath(seat),
    name: seat.name,
    detail: seat.members.map((member) => member.name).join(", "),
  })),
)}
<p class="tools"><a href="${esc(nationPath("northern-ireland"))}">Northern Ireland</a></p>
<h2>Sources</h2>
<ul>${sourcesHtml(["ni-members", "ni-ogl", "ogl-v3"])}</ul>`,
  }),
);

write(
  WESTMINSTER_INDEX,
  page({
    path: WESTMINSTER_INDEX,
    title: "Westminster constituencies",
    description: "650 Westminster constituencies on 2024 boundaries, listed by nation. Unofficial information.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "Westminster constituencies", path: WESTMINSTER_INDEX },
    ],
    licence: `${OPL} ${ONS}`,
    body: `<p class="eyebrow">House of Commons</p>
<h1>Westminster constituencies</h1>
<p class="lede">650 current constituencies from the Members API, matched to the ONS July 2024 names and codes.</p>
<ul>
${NATIONS.map((nation) => `<li><a href="${esc(westminsterNationIndex(nation))}">${esc(NATION_NAME[nation])}</a> — ${westminsterIn(nation).length}</li>`).join("")}
</ul>
<p class="tools"><a href="${esc(CONSTITUENCY_HUB)}">All legislatures</a> · <a href="/gb/en/">United Kingdom</a></p>
<h2>Sources</h2>
<ul>${sourcesHtml(["members-constituencies", "ons-pcon-2024", "ons-geog-licences"])}</ul>`,
  }),
);

write(
  CONSTITUENCY_HUB,
  page({
    path: CONSTITUENCY_HUB,
    title: "Constituencies",
    description: "Westminster, Scottish Parliament, Senedd and Northern Ireland Assembly constituencies. Unofficial information.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "Constituencies", path: CONSTITUENCY_HUB },
    ],
    licence: `${OPL} ${OGL} ${SPCL}`,
    body: `<p class="eyebrow">United Kingdom</p>
<h1>Constituencies</h1>
<p class="lede">Current members from each legislature’s official source. Councils, wards and candidate lists are not in this release.</p>
<ul>
<li><a href="${esc(WESTMINSTER_INDEX)}">Westminster constituencies</a> — 650</li>
<li><a href="${esc(SCOTTISH_PARLIAMENT_INDEX)}">Scottish Parliament constituencies and regions</a> — 73 constituencies and 8 regions</li>
<li><a href="${esc(SENEDD_INDEX)}">Senedd constituencies</a> — 16</li>
<li><a href="${esc(ASSEMBLY_INDEX)}">Northern Ireland Assembly constituencies</a> — 18</li>
</ul>
<p class="gap"><strong>Gap.</strong> English regions are not separate pages in this release. Local-authority, ward, parish and candidate pages are not published.</p>
<h2>Sources</h2>
<ul>${sourcesHtml(["members-constituencies", "sp-open-data", "senedd-members", "ni-members"])}</ul>`,
  }),
);

seatBytes.sort((a, b) => a - b);
const median = seatBytes[Math.floor(seatBytes.length / 2)];
console.log(
  `gb level2 html seats ${seatBytes.length} min ${seatBytes[0]} median ${median} max ${seatBytes[seatBytes.length - 1]}`,
);
