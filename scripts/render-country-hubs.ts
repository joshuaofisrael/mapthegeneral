/**
 * Writes national hub HTML for countries added as packs.
 * Election pages in the SEO registry are written by render-upcoming-elections.ts.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { previewByPath } from "../src/data/editorial";
import { editorialPreviewHtml } from "../src/data/editorial/html";
import { COUNTRY_HUBS } from "../src/data/country-hubs";
import { SITE, absoluteUrl, reportErrorHref } from "../src/data/site";
import { ADSENSE_HEAD_TAGS } from "../src/lib/adsense";
import { GA_HEAD_TAGS } from "../src/lib/google-analytics";
import { withLegalFooter } from "../src/lib/legal-footer";
import { socialMetaTags } from "../src/lib/social";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

for (const hub of COUNTRY_HUBS) {
  for (const page of hub.pages) {
    const canonical = absoluteUrl(page.path);
    const alternates = page.alternates
      .map((item) => `<link rel="alternate" hreflang="${esc(item.hreflang)}" href="${esc(absoluteUrl(item.path))}">`)
      .join("\n");
    const nav = page.nav.map((item) => `<a href="${esc(item.href)}">${esc(item.label)}</a>`).join(" · ");
    const crumbs = page.crumbs
      .map((item, index) =>
        index === page.crumbs.length - 1 ? `<span>${esc(item.name)}</span>` : `<a href="${esc(item.path)}">${esc(item.name)}</a>`,
      )
      .join(" / ");
    const html = `<!DOCTYPE html>
<html lang="${esc(page.htmlLang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)} · ${esc(SITE.name)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${esc(canonical)}">
${alternates}
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:type" content="website">
<meta property="og:locale" content="${page.htmlLang === "bg" ? "bg_BG" : "en_GB"}">
${socialMetaTags(page.path)}
<link rel="stylesheet" href="/place.css">
${ADSENSE_HEAD_TAGS}
${GA_HEAD_TAGS}
</head>
<body>
<p class="banner">${esc(SITE.officialNotUs)}</p>
<header class="wrap tools">${nav}</header>
<main class="wrap">
<nav class="crumbs" aria-label="Breadcrumb">${crumbs}</nav>
<h1>${esc(page.h1)}</h1>
<p class="lede">${esc(page.lede)}</p>
<p><a href="${esc(reportErrorHref(page.path))}">${page.htmlLang === "bg" ? "Съобщете за грешка" : "Report an error"}</a></p>
${editorialPreviewHtml(previewByPath(page.path))}
${page.bodyHtml}
</main>
${withLegalFooter("")}
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
</body>
</html>
`;
    const file = join(root, "public", page.path, "index.html");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
    console.log(`country-hub: wrote ${page.path}`);
  }
}
