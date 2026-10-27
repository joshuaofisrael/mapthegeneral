import { existsSync } from "node:fs";
import { join } from "node:path";
import type { ElectionSeoPage, ElectionSeoProfile, SourcedText } from "../data/election-seo";
import { ELECTION_SEO_PROFILES } from "../data/election-seo";
import { SITE, absoluteUrl, reportErrorHref } from "../data/site";
import { ADSENSE_HEAD_TAGS } from "./adsense";
import { GA_HEAD_TAGS } from "./google-analytics";
import {
  candidateItemListJsonLd,
  listLanguages,
  loadCandidateList,
  renderCandidateListHtml,
  type CandidateLang,
  type CandidateList,
} from "./candidate-list";
import { previewByPath } from "../data/editorial";
import { editorialPreviewHtml } from "../data/editorial/html";
import { withLegalFooter } from "./legal-footer";
import { socialImageFor, socialMetaTags } from "./social";

const ISO_OFFSET = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d[+-]\d\d:\d\d$/;

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function textContent(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function linkText(item: SourcedText): string {
  const links = [...item.links].sort((a, b) => b.label.length - a.label.length);
  let html = esc(item.text);
  for (const link of links) {
    const occurrences = item.text.split(link.label).length - 1;
    if (occurrences !== 1) {
      throw new Error(`source label must appear once, found ${occurrences}: ${link.label}`);
    }
    if (!link.href.startsWith("https://")) throw new Error(`source link must be https: ${link.href}`);
    const needle = esc(link.label);
    const at = html.indexOf(needle);
    if (at < 0) throw new Error(`escaped label missing: ${link.label}`);
    const rel = link.rel ? ` rel="${esc(link.rel)}"` : "";
    const target = link.rel?.includes("noopener") ? ` target="_blank"` : "";
    html = `${html.slice(0, at)}<a href="${esc(link.href)}"${rel}${target}>${needle}</a>${html.slice(at + needle.length)}`;
  }
  return html;
}

function jsonScript(data: unknown): string {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

export function eventJsonLd(profile: ElectionSeoProfile, page: ElectionSeoPage, imageUrl?: string): Record<string, unknown> {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: page.eventName,
    startDate: profile.startDate,
    endDate: profile.endDate,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: page.locationName,
      address: {
        "@type": "PostalAddress",
        addressRegion: page.addressRegion,
        addressCountry: page.addressCountry,
      },
    },
    organizer: {
      "@type": "Organization",
      name: profile.organizerName,
      url: profile.organizerUrl,
    },
    url: absoluteUrl(page.path),
  };
  if (imageUrl) data.image = imageUrl;
  return data;
}

export function faqJsonLd(page: ElectionSeoPage): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.text },
    })),
  };
}

export function breadcrumbJsonLd(page: ElectionSeoPage): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: page.crumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Country OG image when the file is already in the repo. Never invents one. */
export function existingImageUrl(profile: ElectionSeoProfile, root = process.cwd()): string | undefined {
  if (!profile.imagePath) return undefined;
  const file = join(root, "public", profile.imagePath.replace(/^\//, ""));
  if (!existsSync(file)) return undefined;
  return `${SITE.url}${profile.imagePath}`;
}

function pageCandidateList(profile: ElectionSeoProfile, root: string): CandidateList | null {
  if (!profile.candidateListId) return null;
  return loadCandidateList(profile.candidateListId, root);
}

function webPageJsonLd(profile: ElectionSeoProfile, page: ElectionSeoPage): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.h1,
    url: absoluteUrl(page.path),
    dateModified: profile.lastmod,
  };
}

export function renderElectionHtml(profile: ElectionSeoProfile, page: ElectionSeoPage, root = process.cwd()): string {
  const imageUrl = existingImageUrl(profile, root);
  const candidateLang = page.lang as CandidateLang;
  const candidateReady = page.lang === "en" || page.lang === "pl" || page.lang === "it";
  const candidateList = candidateReady ? pageCandidateList(profile, root) : null;
  if (candidateList && !listLanguages(candidateList).includes(candidateLang)) {
    throw new Error(`${page.path}: candidate list ${profile.candidateListId} has no ${page.lang} copy`);
  }
  const candidateHtml = candidateList ? renderCandidateListHtml(candidateList, candidateLang) : "";
  const itemList = candidateList ? candidateItemListJsonLd(candidateList, candidateLang) : null;
  const modifiedHead = profile.candidateListId
    ? `<meta property="article:modified_time" content="${esc(profile.lastmod)}">\n${jsonScript(webPageJsonLd(profile, page))}\n`
    : "";
  const canonical = absoluteUrl(page.path);
  const alternates = page.alternates
    .map((item) => `<link rel="alternate" hreflang="${esc(item.hreflang)}" href="${esc(absoluteUrl(item.path))}">`)
    .join("\n");
  const crumbs = page.crumbs
    .map((item, index) =>
      index === page.crumbs.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
    )
    .join(" / ");
  const nav = page.nav.map((item) => `<a href="${esc(item.href)}">${esc(item.label)}</a>`).join(" · ");
  const keyDates = page.keyDates
    .map((item) => `<li><strong>${esc(item.label)}.</strong> ${linkText(item)}</li>`)
    .join("\n");
  const faqs = page.faqs
    .map((item) => `<h3>${esc(item.question)}</h3>\n<p>${linkText(item)}</p>`)
    .join("\n");
  const related = page.related.map((item) => `<a href="${esc(item.href)}">${esc(item.label)}</a>`).join(" · ");
  const sources = page.sources
    .map((item) => `<li><a href="${esc(item.href)}">${esc(item.label)}</a> — ${esc(page.readWord ?? "read")} ${esc(item.readOn)}</li>`)
    .join("\n");
  const pageTitle = `${page.title} · ${SITE.name}`;
  const html = `<!DOCTYPE html>
<html lang="${esc(page.htmlLang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(pageTitle)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${esc(canonical)}">
${alternates}
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.ogDescription)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${esc(page.ogLocale)}">
${socialMetaTags(page.path)}
<link rel="stylesheet" href="/place.css">
${modifiedHead}${jsonScript(breadcrumbJsonLd(page))}
${jsonScript(eventJsonLd(profile, page, imageUrl))}
${jsonScript(faqJsonLd(page))}
${itemList ? `${jsonScript(itemList)}\n` : ""}${ADSENSE_HEAD_TAGS}
${GA_HEAD_TAGS}
</head>
<body>
<p class="banner">${esc(page.bannerBefore)}<a href="${esc(page.officeHref)}">${esc(page.bannerAfter)}</a>.</p>
<header class="wrap tools">${nav}</header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbs}</nav>
<p class="eyebrow">${esc(page.eyebrow)}</p>
<h1>${esc(page.h1)}</h1>
<p class="lede">${esc(page.lede)}</p>
<p><strong>${esc(page.updated)}</strong> <a href="${esc(reportErrorHref(page.path))}">${esc(page.reportLabel)}</a></p>
${editorialPreviewHtml(previewByPath(page.path))}${page.bodyHtml.includes("{{candidates}}") ? page.bodyHtml.replaceAll("{{candidates}}", candidateHtml) : `${page.bodyHtml}\n${candidateHtml ? `${candidateHtml}\n` : ""}`}<section id="how-to-vote">
<h2>${esc(page.keyDatesHeading)}</h2>
<p>${esc(page.keyDatesIntro)}</p>
<ul>
${keyDates}
</ul>
</section>
<section id="faq">
<h2>${esc(page.faqHeading)}</h2>
${faqs}
</section>
<section id="related">
<h2>${esc(page.relatedHeading)}</h2>
<p class="tools">${related}</p>
</section>
<h2>${esc(page.sourcesHeading)}</h2>
<ul>
${sources}
</ul>
</main>
${withLegalFooter("")}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
  const errors = validateElectionHtml(html, profile, page, imageUrl, root);
  if (errors.length) {
    throw new Error(`${page.path}\n${errors.map((line) => `  - ${line}`).join("\n")}`);
  }
  return html;
}

type JsonLdNode = Record<string, unknown>;

function jsonLdNodes(html: string): JsonLdNode[] {
  const nodes: JsonLdNode[] = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  for (const match of html.matchAll(re)) {
    nodes.push(JSON.parse(match[1]) as JsonLdNode);
  }
  return nodes;
}

function section(html: string, id: string): string {
  const re = new RegExp(`<section id="${id}">([\\s\\S]*?)</section>`);
  const match = html.match(re);
  if (!match) return "";
  return match[1];
}

export function validateElectionHtml(
  html: string,
  profile: ElectionSeoProfile,
  page: ElectionSeoPage,
  imageUrl?: string,
  root = process.cwd(),
): string[] {
  const errors: string[] = [];
  if (html.includes("{{candidates}}")) errors.push("candidate marker was not filled");
  let nodes: JsonLdNode[] = [];
  try {
    nodes = jsonLdNodes(html);
  } catch (error) {
    errors.push(`JSON-LD did not parse: ${error instanceof Error ? error.message : String(error)}`);
    return errors;
  }
  const events = nodes.filter((node) => node["@type"] === "Event");
  const faqs = nodes.filter((node) => node["@type"] === "FAQPage");
  const crumbs = nodes.filter((node) => node["@type"] === "BreadcrumbList");
  if (events.length !== 1) errors.push(`expected exactly one Event, found ${events.length}`);
  if (faqs.length !== 1) errors.push(`expected exactly one FAQPage, found ${faqs.length}`);
  if (crumbs.length !== 1) errors.push(`expected exactly one BreadcrumbList, found ${crumbs.length}`);
  const event = events[0];
  if (event) {
    if (event.name !== page.eventName) errors.push("Event name mismatch");
    if (event.startDate !== profile.startDate || !ISO_OFFSET.test(String(event.startDate))) errors.push("Event startDate invalid");
    if (event.endDate !== profile.endDate || !ISO_OFFSET.test(String(event.endDate))) errors.push("Event endDate invalid");
    if (Date.parse(String(event.endDate)) <= Date.parse(String(event.startDate))) errors.push("Event ends before it starts");
    if (event.eventAttendanceMode !== "https://schema.org/OfflineEventAttendanceMode") errors.push("Event attendance mode");
    if (event.eventStatus !== "https://schema.org/EventScheduled") errors.push("Event status");
    if (event.url !== absoluteUrl(page.path)) errors.push("Event url is not the canonical URL");
    const location = event.location as JsonLdNode | undefined;
    if (!location || location["@type"] !== "Place" || location.name !== page.locationName) errors.push("Event location");
    const address = location?.address as JsonLdNode | undefined;
    if (!address || address.addressCountry !== page.addressCountry || address.addressRegion !== page.addressRegion) {
      errors.push("Event address");
    }
    const organizer = event.organizer as JsonLdNode | undefined;
    if (!organizer || organizer.name !== profile.organizerName || organizer.url !== profile.organizerUrl) errors.push("Event organizer");
    if (imageUrl) {
      if (event.image !== imageUrl) errors.push("Event image does not match the existing OG image");
    } else if ("image" in event) errors.push("Event image was set without an existing file");
    const social = socialImageFor(page.path);
    if (imageUrl && social.url !== imageUrl) errors.push("Event image is not the page OG image");
  }
  if (page.faqs.length < 4 || page.faqs.length > 6) errors.push(`FAQ count ${page.faqs.length} is outside 4–6`);
  const faq = faqs[0];
  const mainEntity = (faq?.mainEntity as JsonLdNode[] | undefined) ?? [];
  if (faq && mainEntity.length !== page.faqs.length) errors.push("FAQPage question count");
  const faqHtml = section(html, "faq");
  if (!faqHtml.includes(`<h2>${esc(page.faqHeading)}</h2>`)) errors.push("FAQ heading missing");
  page.faqs.forEach((item, index) => {
    const node = mainEntity[index];
    const answer = (node?.acceptedAnswer as JsonLdNode | undefined)?.text;
    if (node?.name !== item.question || answer !== item.text) errors.push(`FAQ JSON-LD mismatch: ${item.question}`);
    if (!faqHtml.includes(`<h3>${esc(item.question)}</h3>`)) errors.push(`FAQ heading not visible: ${item.question}`);
    if (!textContent(faqHtml).includes(item.text)) errors.push(`FAQ answer not visible: ${item.question}`);
  });
  const datesHtml = section(html, "how-to-vote");
  if (!datesHtml.includes(esc(page.keyDatesHeading))) errors.push("key-dates heading missing");
  for (const item of page.keyDates) {
    if (!textContent(datesHtml).includes(item.text)) errors.push(`key date not visible: ${item.label}`);
    if (!datesHtml.includes(`<strong>${esc(item.label)}.</strong>`)) errors.push(`key date label missing: ${item.label}`);
  }
  if (!html.includes(`<link rel="canonical" href="${esc(absoluteUrl(page.path))}">`)) errors.push("canonical missing");
  const owner = /joshua israel ventures|joshua israel/i;
  if (owner.test(html)) errors.push("owner name on an election page");
  const lists = nodes.filter((node) => node["@type"] === "ItemList");
  const pages = nodes.filter((node) => node["@type"] === "WebPage");
  if (!profile.candidateListId) {
    if (lists.length) errors.push("ItemList without a candidate list");
    if (pages.length) errors.push("WebPage dateModified without a candidate list");
    if (html.includes("article:modified_time")) errors.push("dateModified meta without a candidate list");
    if (html.includes('<section id="candidates">')) errors.push("candidate section without a candidate list");
    return errors;
  }
  if (pages.length !== 1) errors.push(`expected one WebPage dateModified, found ${pages.length}`);
  if (pages[0] && pages[0].dateModified !== profile.lastmod) errors.push("WebPage dateModified mismatch");
  if (!html.includes(`<meta property="article:modified_time" content="${esc(profile.lastmod)}">`)) {
    errors.push("dateModified meta missing");
  }
  let candidateList: CandidateList | null = null;
  try {
    candidateList = loadCandidateList(profile.candidateListId, root);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
    return errors;
  }
  const published = candidateList.candidates.length > 0;
  if (!published) {
    if (lists.length) errors.push("ItemList on an empty candidate list");
    if (html.includes('<section id="candidates">')) errors.push("candidate section on an empty list");
    return errors;
  }
  if (lists.length !== 1) errors.push(`expected one ItemList, found ${lists.length}`);
  if (!html.includes('<section id="candidates">')) errors.push("candidate section missing");
  const itemList = lists[0];
  const elements = (itemList?.itemListElement as JsonLdNode[] | undefined) ?? [];
  if (itemList && elements.length !== candidateList.candidates.length) errors.push("ItemList length");
  for (const row of candidateList.candidates) {
    if (!html.includes(esc(row.name)) || !html.includes(esc(row.committee))) errors.push(`candidate not visible: ${row.name}`);
  }
  return errors;
}

export function renderAllElectionPages(root = process.cwd()): { path: string; html: string }[] {
  return ELECTION_SEO_PROFILES.flatMap((profile) =>
    profile.pages.map((page) => ({ path: page.path, html: renderElectionHtml(profile, page, root) })),
  );
}
