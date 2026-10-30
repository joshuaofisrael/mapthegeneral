/**
 * GitHub Pages publishes the static export and does not apply HTTP 301s.
 * Retired El Salvador URLs are noindex meta-refresh pages that send browsers
 * to the homepage. They are not listed in the sitemap.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { RETIRED_EL_SALVADOR_PATHS } from "../src/data/retired-el-salvador";
import { absoluteUrl } from "../src/data/site";
import { GA_HEAD_TAGS } from "../src/lib/google-analytics";

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
<p><a href="${targetPath}">Map the General</a></p>
<script>location.replace(${JSON.stringify(targetPath)});</script>
</body>
</html>
`;
}

const outDir = path.join(process.cwd(), "out");
if (!existsSync(outDir)) {
  console.error("retired redirects: out/ is missing. Run next build first.");
  process.exit(1);
}

const html = redirectHtml("/");
for (const route of RETIRED_EL_SALVADOR_PATHS) {
  const htmlPath = path.join(outDir, route, "index.html");
  if (existsSync(htmlPath)) {
    const existing = readFileSync(htmlPath, "utf8");
    if (!/http-equiv\s*=\s*["']refresh["']/i.test(existing)) {
      throw new Error(`${route} already has a page that is not a redirect`);
    }
  }
  mkdirSync(path.dirname(htmlPath), { recursive: true });
  writeFileSync(htmlPath, html);
  if (!html.includes('content="noindex, follow"')) throw new Error(`${route} is not noindex`);
  if (!html.includes('http-equiv="refresh"')) throw new Error(`${route} has no refresh`);
  if (html.includes("El Salvador") || html.includes("/sv/")) throw new Error(`${route} still names the retired country`);
}

// Legal-page aliases people type or link to. They refresh to the real pages.
const LEGAL_ALIASES: Record<string, string> = {
  "privacy-policy": "/privacy/",
  corrections: "/copyright/#corrections",
  // No Russian edition; visitors arrive from shared links.
  "il/ru/results": "/il/en/results/",
};
for (const [route, target] of Object.entries(LEGAL_ALIASES)) {
  const htmlPath = path.join(outDir, route, "index.html");
  if (existsSync(htmlPath)) throw new Error(`${route} already exists; not overwriting`);
  mkdirSync(path.dirname(htmlPath), { recursive: true });
  writeFileSync(htmlPath, redirectHtml(target));
}

const sitemapDir = path.join(outDir, "sitemaps");
if (existsSync(sitemapDir)) {
  for (const name of readdirSync(sitemapDir)) {
    if (!name.endsWith(".xml")) continue;
    const xml = readFileSync(path.join(sitemapDir, name), "utf8");
    if (xml.includes("https://mapthegeneral.com/sv/")) {
      throw new Error(`${name} still lists an El Salvador URL`);
    }
  }
}

console.log(`retired redirects: ${RETIRED_EL_SALVADOR_PATHS.length} El Salvador URLs refresh to the homepage.`);
