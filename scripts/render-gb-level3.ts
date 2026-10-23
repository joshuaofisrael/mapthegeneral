import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ASSEMBLY_INDEX,
  NATION_NAME,
  SCOTTISH_PARLIAMENT_INDEX,
  SENEDD_INDEX,
  westminsterSeatPath,
  type NationSlug,
} from "../src/data/gb/level2";
import {
  COUNTIES,
  COUNTIES_INDEX,
  COUNCILS_HUB,
  GLA_PATH,
  LADS,
  MAYORS,
  MAYORS_INDEX,
  OMITTED_AUTHORITIES,
  constituenciesFor,
  councilByCode,
  councilPath,
  councilsIn,
  districtsInCounty,
  mayorPath,
  nationCouncilsIndex,
  type Council,
  type MayorBody,
} from "../src/data/gb/level3";
import { nationPath } from "../src/data/gb/paths";
import { sourcesById } from "../src/data/gb/sources";
import { absoluteUrl, reportErrorHref, SITE } from "../src/data/site";
import { withLegalFooter } from "../src/lib/legal-footer";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { socialMetaTags } from "../src/lib/social";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const OFFICE = "https://www.electoralcommission.org.uk/about-us/our-plans-priorities-and-spending/corporate-plan-2025/6-2029/30/electoral-system";
const NATIONS: NationSlug[] = ["england", "scotland", "wales", "northern-ireland"];

const DAY_2026 =
  "The Electoral Commission key-dates page, read on 17 October 2026, sets Thursday 7 May 2026 as polling day for the 2026 elections in its timetable, including local government elections and mayoral elections in England. That day is before 19 October 2026. This page does not state whether a 2026 election was held, and it does not reprint a result.";

const LAST_GAP =
  "The sources read for this page do not print the date of the last election held. This page does not supply one, and it does not reprint a result.";

const LEADER_GAP =
  "No central official list of council leaders was read on 19 October 2026. This page does not name a leader.";

const SCHEME_NOTE =
  "The timetable says a Local Government Boundary Commission for England review can mean a council that normally elects by thirds elects the whole council, and that some councils may resolve to change their scheme.";

const MAYOR_GAP =
  "The GOV.UK factsheet read on 19 October 2026 does not name the current mayor. This page does not supply a name.";

function esc(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
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
  const licence = `Source: Office for National Statistics licensed under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v.3.0</a>. Contains public sector information licensed under the <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">Open Government Licence v3.0</a>.`;
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
</head>
<body>
<p class="banner">${esc(SITE.officialNotUs).replace("official election office", `<a href="${OFFICE}">official election office</a>`)}</p>
<header class="wrap tools"><a href="/">${esc(SITE.name)}</a> · <a href="/gb/en/">United Kingdom</a> · <a href="${esc(COUNCILS_HUB)}">Councils</a> · <a href="/search/">Search</a></header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbNav}</nav>
<p><strong>Records read 19 October 2026.</strong> <a href="${esc(reportErrorHref(input.path))}">Report an error</a></p>
${input.body}
</main>
${withLegalFooter(`© 2026 ${esc(SITE.legalName)}. ${esc(SITE.location)}. ${licence} Unofficial, and not endorsed by the bodies named here.`)}
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

function linkList(items: { href: string; name: string; detail?: string }[]): string {
  return `<ul>${items
    .map((item) => {
      const detail = item.detail ? ` — ${esc(item.detail)}` : "";
      return `<li><a href="${esc(item.href)}">${esc(item.name)}</a>${detail}</li>`;
    })
    .join("")}</ul>`;
}

function nearby(list: { href: string; name: string }[], index: number): string {
  const prev = list[index - 1];
  const next = list[index + 1];
  const parts: string[] = [];
  if (prev) parts.push(`<a href="${esc(prev.href)}">${esc(prev.name)}</a>`);
  if (next) parts.push(`<a href="${esc(next.href)}">${esc(next.name)}</a>`);
  return parts.length ? `<p>Alphabetical neighbours: ${parts.join(" · ")}.</p>` : "";
}

function row(label: string, value: string): string {
  return `<tr><th>${esc(label)}</th><td>${value}</td></tr>`;
}

function devolved(nation: NationSlug): string {
  if (nation === "england") return "";
  const href =
    nation === "scotland" ? SCOTTISH_PARLIAMENT_INDEX : nation === "wales" ? SENEDD_INDEX : ASSEMBLY_INDEX;
  const label =
    nation === "scotland"
      ? "Scottish Parliament constituencies and regions"
      : nation === "wales"
        ? "Senedd constituencies"
        : "Northern Ireland Assembly constituencies";
  return `<h2>Devolved constituencies</h2>
<p><a href="${esc(href)}">${esc(label)}</a> are already published. The ONS lookup read for this page joins wards to Westminster constituencies only, so this page does not list a devolved overlap.</p>`;
}

function councilSources(council: Council): string[] {
  const ids = [
    council.kind === "county" ? "ons-cty-dec-2025" : "ons-lad-apr-2025",
    "ons-wd-pcon-2025",
    "ons-geog-licences",
    "ogl-v3",
    "ec-schedule",
  ];
  if (council.nation === "england") ids.push("govuk-election-cycles");
  if (council.show2026Day) ids.push("ec-2026-dates");
  if (council.regionCode) ids.push("ons-lad-rgn-2025", "ons-rgn-dec-2025");
  if (council.countyCode || council.kind === "county") ids.push("ons-lad-ctyua-2025");
  if (council.cauthCode) ids.push("ons-lad-cauth-2025", "ons-cauth-may-2025");
  if (council.cauthCode && !council.cauthMayoral) ids.push("govuk-devolution-factsheets");
  return ids;
}

function councilBody(council: Council, peers: { href: string; name: string }[], index: number): string {
  const welsh = council.welshName
    ? row("ONS field LAD25NMW", esc(council.welshName))
    : "";
  const region = council.regionName
    ? row(
        "English region",
        `${esc(council.regionName)}${council.regionWelsh ? ` (${esc(council.regionWelsh)})` : ""}${council.regionCode ? `, ${esc(council.regionCode)}` : ""}`,
      )
    : "";
  const county = council.countyCode
    ? row(
        "County council",
        `<a href="/gb/en/england/counties/${esc(council.countySlug ?? "")}/">${esc(council.countyName ?? "")}</a>, ${esc(council.countyCode)}`,
      )
    : "";
  let cauth = "";
  if (council.cauthMayoral && council.cauthSlug) {
    cauth = row(
      "Combined authority",
      `<a href="/gb/en/england/combined-authorities/${esc(council.cauthSlug)}/">${esc(council.cauthName ?? "")}</a>, ${esc(council.cauthCode ?? "")}`,
    );
  } else if (council.cauthCode) {
    cauth = row(
      "Combined authority",
      `${esc(council.cauthName ?? "")}, ${esc(council.cauthCode)}. The factsheet says this body has no directly elected mayor, so this guide has no mayor page for it.`,
    );
  }
  const seats = constituenciesFor(council.pcon);
  const districts =
    council.kind === "county"
      ? `<h2>District councils</h2>${linkList(
          districtsInCounty(council.code).map((item) => ({
            href: councilPath(item),
            name: item.name,
            detail: item.code,
          })),
        )}`
      : "";
  const scheme = council.nation === "england" ? `<p>${esc(SCHEME_NOTE)}</p>` : "";
  const day = council.show2026Day ? `<p>${esc(DAY_2026)}</p>` : "";
  const note = council.nameNote ? `<p>${esc(council.nameNote)}</p>` : "";
  const split = council.splitWard
    ? `<p>The lookup marks at least one ward row for this code as split. Ward names are not listed.</p>`
    : `<p>Ward names are not listed.</p>`;
  const overlapField = council.kind === "county" ? "CTYUA25CD" : "LAD25CD";
  const description = `${council.name}, ${council.code}, ${council.classLabel} in ${NATION_NAME[council.nation]}. Unofficial information.`;
  return page({
    path: councilPath(council),
    title: council.name,
    description,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: NATION_NAME[council.nation], path: nationPath(council.nation) },
      { name: "Councils", path: nationCouncilsIndex(council.nation) },
      { name: council.name, path: councilPath(council) },
    ],
    body: `<p class="eyebrow">${esc(council.classLabel)} · ${esc(NATION_NAME[council.nation])}</p>
<h1>${esc(council.name)}</h1>
<p class="lede">${esc(council.code)} in ${esc(council.file)}.</p>
<table>
${row("Official name", esc(council.name))}
${welsh}
${row("GSS code", esc(council.code))}
${row("Council type on this page", esc(council.classLabel))}
${region}
${county}
${cauth}
${row("Council leader", esc(LEADER_GAP))}
</table>
<h2>Elections</h2>
<p>${esc(council.timetable)}</p>
${note}
<p>${esc(council.nextText)}</p>
${day}
${scheme}
<p class="gap"><strong>Gap.</strong> ${esc(LAST_GAP)}</p>
<h2>Westminster constituencies</h2>
<p>These are the distinct PCON24CD values on ward rows whose ${esc(overlapField)} is ${esc(council.code)} in WD25_PCON24_LAD25_CTYUA25_UK_LU. The lookup is an overlap. It does not assign the council to one constituency.</p>
${linkList(seats.map((seat) => ({ href: westminsterSeatPath(seat), name: seat.name, detail: seat.gss })))}
${split}
${districts}
${devolved(council.nation)}
${nearby(peers, index)}
<h2>Sources</h2>
<ul>${sourcesHtml(councilSources(council))}</ul>`,
  });
}

function mayorBody(mayor: MayorBody, peers: { href: string; name: string }[], index: number): string {
  const members = mayor.memberCodes
    .map((code) => councilByCode(code))
    .filter((item): item is Council => Boolean(item))
    .sort((a, b) => a.name.localeCompare(b.name, "en"));
  const extra = mayor.extraCountyCode ? councilByCode(mayor.extraCountyCode) : undefined;
  const seats = constituenciesFor(mayor.pcon);
  const codeRow = mayor.code
    ? row("ONS code", esc(mayor.code))
    : row("ONS code", "The combined-authority file read for this page does not include the Greater London Authority. This page does not print a GSS code for it.");
  const bits = [
    mayor.headingNote ? `<p>${esc(mayor.headingNote)}</p>` : "",
    mayor.constituents ? `<p>${esc(mayor.constituents)}</p>` : "",
    mayor.lgrText ? `<p>${esc(mayor.lgrText)}</p>` : "",
    extra
      ? `<p>The factsheet names ${esc(extra.name)} as a constituent. <a href="${esc(councilPath(extra))}">${esc(extra.name)}</a>, ${esc(extra.code)}. The LAD lookup does not use an E10 county code as a member row.</p>`
      : "",
  ].join("");
  const description = `${mayor.factsheetName}. Directly elected mayor. Unofficial information.`;
  return page({
    path: mayorPath(mayor),
    title: mayor.name,
    description,
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "England", path: nationPath("england") },
      { name: "Mayors", path: MAYORS_INDEX },
      { name: mayor.name, path: mayorPath(mayor) },
    ],
    body: `<p class="eyebrow">Directly elected mayor · England</p>
<h1>${esc(mayor.name)}</h1>
<p class="lede">${esc(mayor.factsheetName)} is ${esc(mayor.factsheetClass)}.</p>
<table>
${row("Name on the factsheet", esc(mayor.factsheetName))}
${codeRow}
${row("Current mayor", esc(MAYOR_GAP))}
</table>
<h2>Elections</h2>
<p>${esc(mayor.lastText)}</p>
<p>${esc(mayor.nextText)}</p>
<p>${esc(mayor.timetable)}</p>
<p>${esc(mayor.voteNote)}</p>
${bits}
<h2>Constituent councils in the ONS lookup</h2>
<p>Local authority districts below are the rows in LAD25_CAUTH25_EN_LU${mayor.page === "gla" ? ", except the Greater London Authority, whose councils are the ONS local authority districts in the London region" : ""}.</p>
${linkList(members.map((item) => ({ href: councilPath(item), name: item.name, detail: item.code })))}
<h2>Westminster constituencies</h2>
<p>Distinct PCON24CD values from the ward lookup for those constituent councils.</p>
${linkList(seats.map((seat) => ({ href: westminsterSeatPath(seat), name: seat.name, detail: seat.gss })))}
${nearby(peers, index)}
<h2>Sources</h2>
<ul>${sourcesHtml(["govuk-devolution-factsheets", "elections-act-2022-s13", "edcea-2026-sch30", "govuk-election-cycles", "ons-cauth-may-2025", "ons-lad-cauth-2025", "ons-wd-pcon-2025", "ons-geog-licences", "ogl-v3", "ec-schedule"])}</ul>`,
  });
}

function indexPage(input: {
  path: string;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
  body: string;
  sources: string[];
}): string {
  return page({
    ...input,
    body: `${input.body}<h2>Sources</h2><ul>${sourcesHtml(input.sources)}</ul>`,
  });
}

const sizes: number[] = [];
let files = 0;

function emit(path: string, html: string) {
  sizes.push(write(path, html));
  files += 1;
}

for (const nation of NATIONS) {
  const list = councilsIn(nation).map((council) => ({ href: councilPath(council), name: council.name }));
  councilsIn(nation).forEach((council, index) => {
    emit(councilPath(council), councilBody(council, list, index));
  });
}

const countyPeers = COUNTIES.slice()
  .sort((a, b) => a.name.localeCompare(b.name, "en"))
  .map((council) => ({ href: councilPath(council), name: council.name }));
COUNTIES.slice()
  .sort((a, b) => a.name.localeCompare(b.name, "en"))
  .forEach((council, index) => {
    emit(councilPath(council), councilBody(council, countyPeers, index));
  });

const mayorPeers = MAYORS.map((mayor) => ({ href: mayorPath(mayor), name: mayor.name }));
MAYORS.forEach((mayor, index) => {
  emit(mayorPath(mayor), mayorBody(mayor, mayorPeers, index));
});

for (const nation of NATIONS) {
  const list = councilsIn(nation);
  emit(
    nationCouncilsIndex(nation),
    indexPage({
      path: nationCouncilsIndex(nation),
      title: `Councils in ${NATION_NAME[nation]}`,
      description: `Principal councils in ${NATION_NAME[nation]}, with ONS codes. Unofficial information.`,
      crumbs: [
        { name: "Home", path: "/" },
        { name: "United Kingdom", path: "/gb/en/" },
        { name: NATION_NAME[nation], path: nationPath(nation) },
        { name: "Councils", path: nationCouncilsIndex(nation) },
      ],
      sources: ["ons-lad-apr-2025", "ons-geog-licences", "ogl-v3", "ec-schedule"],
      body: `<p class="eyebrow">${esc(NATION_NAME[nation])}</p>
<h1>Councils in ${esc(NATION_NAME[nation])}</h1>
<p class="lede">${list.length} local authority districts in LAD_APR_2025_UK_NC_v2.</p>
${linkList(list.map((council) => ({ href: councilPath(council), name: council.name, detail: `${council.code} · ${council.classLabel}` })))}
${nation === "england" ? `<p><a href="${esc(COUNTIES_INDEX)}">County councils</a> · <a href="${esc(MAYORS_INDEX)}">Directly elected mayors</a> · <a href="${esc(GLA_PATH)}">Greater London Authority</a></p>` : ""}`,
    }),
  );
}

emit(
  COUNTIES_INDEX,
  indexPage({
    path: COUNTIES_INDEX,
    title: "English county councils",
    description: "21 English county councils in CTY_DEC_2025_EN_NC. Unofficial information.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "England", path: nationPath("england") },
      { name: "County councils", path: COUNTIES_INDEX },
    ],
    sources: ["ons-cty-dec-2025", "govuk-election-cycles", "ons-geog-licences", "ogl-v3"],
    body: `<p class="eyebrow">England</p>
<h1>County councils</h1>
<p class="lede">21 councils in CTY_DEC_2025_EN_NC. Metropolitan counties are not principal councils and have no page here.</p>
${linkList(
  COUNTIES.slice()
    .sort((a, b) => a.name.localeCompare(b.name, "en"))
    .map((council) => ({ href: councilPath(council), name: council.name, detail: council.code })),
)}`,
  }),
);

emit(
  MAYORS_INDEX,
  indexPage({
    path: MAYORS_INDEX,
    title: "Directly elected mayors",
    description: "Combined authorities with a directly elected mayor, and the Greater London Authority. Unofficial information.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "England", path: nationPath("england") },
      { name: "Mayors", path: MAYORS_INDEX },
    ],
    sources: ["govuk-devolution-factsheets", "govuk-election-cycles", "ons-cauth-may-2025", "ogl-v3"],
    body: `<p class="eyebrow">England</p>
<h1>Directly elected mayors</h1>
<p class="lede">Bodies the GOV.UK devolution factsheets describe as having a directly elected mayor, including the Mayor of London and the London Assembly.</p>
${linkList(MAYORS.map((mayor) => ({ href: mayorPath(mayor), name: mayor.name, detail: mayor.code ?? "no combined-authority code in the ONS file" })))}
<h2>ONS combined authorities with no mayor page</h2>
${OMITTED_AUTHORITIES.map((item) => `<p><strong>${esc(item.name)}</strong>, ${esc(item.code)}. ${esc(item.reason)}</p>`).join("")}`,
  }),
);

emit(
  COUNCILS_HUB,
  indexPage({
    path: COUNCILS_HUB,
    title: "Principal councils",
    description: "United Kingdom principal councils and directly elected mayors. Unofficial information.",
    crumbs: [
      { name: "Home", path: "/" },
      { name: "United Kingdom", path: "/gb/en/" },
      { name: "Councils", path: COUNCILS_HUB },
    ],
    sources: ["ons-lad-apr-2025", "ons-cty-dec-2025", "govuk-election-cycles", "ec-schedule", "ons-geog-licences", "ogl-v3"],
    body: `<p class="eyebrow">United Kingdom</p>
<h1>Principal councils</h1>
<p class="lede">${LADS.length} local authority districts and ${COUNTIES.length} English county councils. Ward, parish and candidate pages are not in this release. Council leaders are not named.</p>
${linkList([
  ...NATIONS.map((nation) => ({
    href: nationCouncilsIndex(nation),
    name: NATION_NAME[nation],
    detail: `${councilsIn(nation).length} councils`,
  })),
  { href: COUNTIES_INDEX, name: "English county councils", detail: `${COUNTIES.length} councils` },
  { href: MAYORS_INDEX, name: "Directly elected mayors", detail: `${MAYORS.length} bodies` },
])}`,
  }),
);

const max = Math.max(...sizes);
const over = sizes.filter((size) => size > 12000).length;
console.log(
  `gb level 3 html: ${files} files, largest ${max} bytes, over 12KB ${over}, total ${sizes.reduce((sum, size) => sum + size, 0)} bytes`,
);
