/**
 * GitHub Pages publishes the static export and does not apply HTTP 301s.
 * Year-stamped election URLs that now have a permanent path are noindex
 * meta-refresh pages. The canonical URL is the permanent page. They are
 * not listed in the sitemap.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { absoluteUrl } from "../src/data/site";
import { GA_HEAD_TAGS } from "../src/lib/google-analytics";

const REDIRECTS: { from: string; to: string }[] = [
  { from: "/nz/en/elections/general-2026/", to: "/nz/en/elections/general-election/" },
];

function redirectHtml(targetPath: string): string {
  const canonical = absoluteUrl(targetPath);
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Map the General</title>
<link rel="canonical" href="${canonical}">
<meta name="robots" content="noindex, follow">
<meta http-equiv="refresh" content="0; url=${targetPath}">
${GA_HEAD_TAGS}
</head>
<body>
<p><a href="${targetPath}">General election</a></p>
<script>location.replace(${JSON.stringify(targetPath)});</script>
</body>
</html>
`;
}

const outDir = path.join(process.cwd(), "out");
if (!existsSync(outDir)) {
  console.error("election redirects: out/ is missing. Run next build first.");
  process.exit(1);
}

for (const route of REDIRECTS) {
  const targetFile = path.join(outDir, route.to, "index.html");
  if (!existsSync(targetFile)) {
    throw new Error(`${route.to} is missing, so ${route.from} cannot refresh to it`);
  }
  const html = redirectHtml(route.to);
  const htmlPath = path.join(outDir, route.from, "index.html");
  if (existsSync(htmlPath)) {
    const existing = readFileSync(htmlPath, "utf8");
    if (!/http-equiv\s*=\s*["']refresh["']/i.test(existing) && existing.includes("<h1")) {
      throw new Error(`${route.from} already has a page that is not a redirect`);
    }
  }
  mkdirSync(path.dirname(htmlPath), { recursive: true });
  writeFileSync(htmlPath, html);
  if (!html.includes('content="noindex, follow"')) throw new Error(`${route.from} is not noindex`);
  if (!html.includes('http-equiv="refresh"')) throw new Error(`${route.from} has no refresh`);
  if (!html.includes(`href="${absoluteUrl(route.to)}"`)) throw new Error(`${route.from} canonical is not ${route.to}`);
}

const sitemapDir = path.join(outDir, "sitemaps");
if (existsSync(sitemapDir)) {
  for (const name of readdirSync(sitemapDir)) {
    if (!name.endsWith(".xml")) continue;
    const xml = readFileSync(path.join(sitemapDir, name), "utf8");
    for (const route of REDIRECTS) {
      if (xml.includes(`https://mapthegeneral.com${route.from}`)) {
        throw new Error(`${name} still lists ${route.from}`);
      }
    }
  }
}

console.log(`election redirects: ${REDIRECTS.length} year-stamped URL refreshes to its permanent page.`);
