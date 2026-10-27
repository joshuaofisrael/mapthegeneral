/**
 * Fails the build when the sponsorship slot is missing, duplicated, on the
 * wrong page, or below the main heading. The Israel results embed stays empty.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { htmlHead, isRedirectStub } from "../src/lib/adsense";
import { isEmbedRoute, languageFromRoute, routeFromHtmlFile } from "../src/lib/house-ad";
import {
  SPONSOR_CHECKOUT_URL,
  SPONSOR_SLOT_CSS,
  SOLD_SPONSOR,
  isSponsorSurface,
  selfCheckSponsorship,
  sponsorSlotHtml,
} from "../src/data/sponsorship";

const OUT = path.join(process.cwd(), "out");
const errors = selfCheckSponsorship();
const globals = path.join(process.cwd(), "src/app/globals.css");
if (!existsSync(globals) || !readFileSync(globals, "utf8").includes(SPONSOR_SLOT_CSS)) {
  errors.push("src/app/globals.css is missing the sponsorship slot rules");
}

if (process.argv.includes("--self")) {
  if (errors.length) {
    console.error(`sponsor-slot: ${errors.length} self-check problem(s)`);
    for (const line of errors) console.error(`  - ${line}`);
    process.exit(1);
  }
  console.log("sponsor-slot: self-check passed");
  process.exit(0);
}

if (!existsSync(OUT)) errors.push("out/ is missing");

const SLOT_RE = /data-sponsor-slot="(?:open|sold)"/g;
let surfaces = 0;
let plain = 0;

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const rel = path.relative(OUT, full);
    const route = routeFromHtmlFile(rel);
    const html = readFileSync(full, "utf8");
    const skip = isRedirectStub(html) || htmlHead(html) === null || isEmbedRoute(route);
    const count = html.match(SLOT_RE)?.length ?? 0;
    if (skip || !isSponsorSurface(route)) {
      if (count !== 0) errors.push(`${rel}: sponsorship slot on a page that should not have one`);
      plain++;
      continue;
    }
    surfaces++;
    const expected = sponsorSlotHtml(route, languageFromRoute(route));
    const found = html.split(expected).length - 1;
    if (found !== 1 || count !== 1) {
      errors.push(`${rel}: expected one slot, found markup ${found} and markers ${count}`);
      continue;
    }
    const bodyAt = html.search(/<body\b/i);
    const body = bodyAt === -1 ? html : html.slice(bodyAt);
    const adAt = body.indexOf('class="house-ad"');
    const slotAt = body.indexOf("data-sponsor-slot=");
    const h1At = body.search(/<h1\b/i);
    if (adAt === -1 || slotAt < adAt) errors.push(`${rel}: slot is not under the house-ad banner`);
    if (h1At !== -1 && slotAt > h1At) errors.push(`${rel}: slot is below the main heading`);
    if (SOLD_SPONSOR) {
      if (!expected.includes('rel="sponsored noopener"')) errors.push(`${rel}: sold banner lost rel`);
    } else if (expected.includes('rel="sponsored')) {
      errors.push(`${rel}: unsold slot is marked sponsored`);
    }
  }
}

if (existsSync(OUT)) walk(OUT);

function page(rel: string): string {
  const full = path.join(OUT, rel);
  if (!existsSync(full)) {
    errors.push(`${rel} is missing`);
    return "";
  }
  return readFileSync(full, "utf8");
}

if (existsSync(OUT)) {
  const en = page("advertise/index.html");
  const es = page("advertise/es/index.html");
  const enTerms = [
    "One exclusive banner across the site from 3 Nov 00:00 ET to 6 Nov 23:59 ET.",
    "Non-political businesses only: no candidates, parties, campaigns or issue advocacy in any country.",
    "Ads are reviewed and labelled 'Sponsored'.",
    "A full refund if not approved.",
    "No traffic guarantees.",
    "Pay $1,000",
    SPONSOR_CHECKOUT_URL,
  ];
  for (const phrase of enTerms) {
    if (!en.includes(phrase)) errors.push(`advertise: missing “${phrase}”`);
  }
  const esTerms = [
    "Un banner exclusivo en el conjunto del sitio, del 3 de noviembre a las 00:00 ET al 6 de noviembre a las 23:59 ET.",
    "Solo negocios no políticos: ni candidaturas, ni partidos, ni campañas, ni defensa de causas, en ningún país.",
    "Los anuncios se revisan y se etiquetan como «Patrocinado».",
    "Reembolso completo si no se aprueba.",
    "Sin garantías de tráfico.",
    "Pagar $1,000",
    SPONSOR_CHECKOUT_URL,
  ];
  for (const phrase of esTerms) {
    if (!es.includes(phrase)) errors.push(`advertise/es: missing “${phrase}”`);
  }
  const visible = (html: string) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ");
  if (/joshua/i.test(visible(en)) || /\bllc\b/i.test(visible(en))) errors.push("advertise page names the owner");
  if (/joshua/i.test(visible(es)) || /\bllc\b/i.test(visible(es))) errors.push("Spanish advertise page names the owner");
  if (!/<html\b[^>]*\blang="es"/i.test(es)) errors.push("Spanish advertise page is not lang=es");
  const home = page("index.html");
  if (!home.includes('data-sponsor-slot="open"') && !home.includes('data-sponsor-slot="sold"')) {
    errors.push("homepage is missing the sponsorship slot");
  }
  const embed = page("il/embed/index.html");
  if (embed.includes("data-sponsor-slot")) errors.push("Israel embed has the sponsorship slot");
}

if (surfaces < 10) errors.push(`only ${surfaces} sponsor surfaces; expected the homepage and country hubs`);

if (errors.length) {
  console.error(`sponsor-slot: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  if (errors.length > 40) console.error(`  - … ${errors.length - 40} more`);
  process.exit(1);
}

console.log(`sponsor-slot: ${surfaces} surfaces, ${plain} other documents. checkout ${SPONSOR_CHECKOUT_URL}`);
