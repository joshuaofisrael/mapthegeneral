/**
 * Validates the homepage FAQ: schema.org FAQPage shape, one question set,
 * link labels that match the visible answer, and (when the export exists)
 * JSON-LD that parses and matches the homepage text. No sameAs is expected.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { HOME_FAQ_HEADING, HOME_FAQS, answerSegments, homeFaqJsonLd } from "../src/data/home-faq";
import { registryCountries } from "../src/lib/country-registry";

const root = process.cwd();
const requireExport = process.argv.includes("--export");
const errors: string[] = [];

const BANNED = ["29 November 2026", "29 de noviembre de 2026", "Joshua", "placeholder", "TODO", "TBD", "lorem"];

type JsonLdNode = Record<string, unknown>;

function decodeEntities(value: string): string {
  return value
    .replace(/&#(\d+);/g, (_, digits: string) => String.fromCodePoint(Number(digits)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function textContent(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ""));
}

function jsonLdNodes(html: string): JsonLdNode[] {
  const nodes: JsonLdNode[] = [];
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  for (const match of html.matchAll(re)) {
    const parsed = JSON.parse(match[1]) as JsonLdNode | JsonLdNode[];
    if (Array.isArray(parsed)) nodes.push(...parsed);
    else nodes.push(parsed);
  }
  return nodes;
}

function repoCorpus(): string {
  const skip = new Set([path.normalize("src/data/home-faq.ts"), path.normalize("scripts/check-home-faq.ts")]);
  const chunks: string[] = [];
  const stack = ["src", "data"].map((dir) => path.join(root, dir));
  while (stack.length) {
    const dir = stack.pop();
    if (!dir || !existsSync(dir)) continue;
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      const rel = path.relative(root, full);
      if (statSync(full).isDirectory()) {
        if (entry !== "node_modules" && entry !== "out" && entry !== ".next") stack.push(full);
        continue;
      }
      if (skip.has(path.normalize(rel))) continue;
      if (!/\.(ts|tsx|js|mjs|json|md|html|txt|yml)$/.test(entry)) continue;
      chunks.push(readFileSync(full, "utf8"));
    }
  }
  return chunks.join("\n");
}

function validateData() {
  const corpus = repoCorpus();
  if (HOME_FAQS.length < 5 || HOME_FAQS.length > 8) errors.push(`FAQ count ${HOME_FAQS.length} is outside 5–8`);
  const questions = new Set<string>();
  for (const item of HOME_FAQS) {
    if (questions.has(item.question)) errors.push(`duplicate question: ${item.question}`);
    questions.add(item.question);
    if (!item.question.endsWith("?")) errors.push(`question needs a question mark: ${item.question}`);
    if (!item.answer.trim()) errors.push(`empty answer: ${item.question}`);
    const blob = `${item.question} ${item.answer}`;
    for (const phrase of BANNED) {
      if (blob.includes(phrase)) errors.push(`banned phrase in FAQ: ${phrase}`);
    }
    try {
      const joined = answerSegments(item).map((part) => part.text).join("");
      if (joined !== item.answer) errors.push(`segments drifted: ${item.question}`);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }
    for (const link of item.links) {
      if (link.href.startsWith("http") && !link.href.startsWith("https://")) errors.push(`link is not https: ${link.href}`);
      if (!corpus.includes(link.href)) errors.push(`link is not already in the repo: ${link.href}`);
    }
  }

  const countryAnswer = HOME_FAQS.find((item) => item.question.startsWith("Which countries"));
  const linked = new Map((countryAnswer?.links ?? []).map((link) => [link.label, link.href]));
  for (const card of registryCountries()) {
    if (linked.get(card.name) !== card.href) {
      errors.push(`country link missing for ${card.name} (${card.href})`);
    }
  }
  for (const [label, href] of [
    ["Spain", "/es/"],
    ["Poland", "/pl/"],
  ] as const) {
    if (linked.get(label) !== href) errors.push(`country link missing for ${label}`);
  }

  let parsed: JsonLdNode;
  try {
    parsed = JSON.parse(JSON.stringify(homeFaqJsonLd)) as JsonLdNode;
  } catch (error) {
    errors.push(`FAQ JSON-LD did not parse: ${error instanceof Error ? error.message : String(error)}`);
    return;
  }
  if (parsed["@context"] !== "https://schema.org") errors.push("FAQPage @context");
  if (parsed["@type"] !== "FAQPage") errors.push("FAQPage @type");
  const main = parsed.mainEntity;
  if (!Array.isArray(main) || main.length !== HOME_FAQS.length) errors.push("FAQPage mainEntity length");
  HOME_FAQS.forEach((item, index) => {
    const node = (main as JsonLdNode[] | undefined)?.[index];
    const answer = (node?.acceptedAnswer as JsonLdNode | undefined)?.text;
    if (node?.["@type"] !== "Question" || node?.name !== item.question) errors.push(`JSON-LD question mismatch: ${item.question}`);
    if ((node?.acceptedAnswer as JsonLdNode | undefined)?.["@type"] !== "Answer" || answer !== item.answer) {
      errors.push(`JSON-LD answer mismatch: ${item.question}`);
    }
  });
  if ("sameAs" in parsed) errors.push("FAQPage must not carry sameAs");
}

function validateExport() {
  const file = path.join(root, "out", "index.html");
  if (!existsSync(file)) {
    if (requireExport) errors.push("out/index.html is missing");
    else console.log("home-faq: export not built; skipped HTML check");
    return;
  }
  const html = readFileSync(file, "utf8");
  let nodes: JsonLdNode[] = [];
  try {
    nodes = jsonLdNodes(html);
  } catch (error) {
    errors.push(`homepage JSON-LD did not parse: ${error instanceof Error ? error.message : String(error)}`);
    return;
  }
  const faqs = nodes.filter((node) => node["@type"] === "FAQPage");
  if (faqs.length !== 1) errors.push(`homepage FAQPage count ${faqs.length}`);
  const org = nodes.find((node) => node["@type"] === "Organization" && String(node["@id"] ?? "").endsWith("#organization"));
  if (!org) errors.push("homepage Organization JSON-LD missing");
  else if ("sameAs" in org) errors.push("Organization sameAs was added without a verified profile");

  const section = html.match(/<section id="faq">([\s\S]*?)<\/section>/);
  if (!section) {
    errors.push("visible FAQ section missing");
    return;
  }
  if (!section[1].includes(HOME_FAQ_HEADING)) errors.push("FAQ heading missing");
  const pairs = [...section[1].matchAll(/<dt[^>]*>([\s\S]*?)<\/dt>\s*<dd[^>]*>([\s\S]*?)<\/dd>/g)];
  if (pairs.length !== HOME_FAQS.length) errors.push(`visible FAQ count ${pairs.length}`);
  HOME_FAQS.forEach((item, index) => {
    const pair = pairs[index];
    if (!pair) return;
    const question = textContent(pair[1]).trim();
    const answer = textContent(pair[2]);
    if (question !== item.question) errors.push(`visible question mismatch: ${item.question}`);
    if (answer !== item.answer) errors.push(`visible answer mismatch: ${item.question}`);
    const anchors = [...pair[2].matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((match) => ({
      href: decodeEntities(match[1].match(/href="([^"]*)"/)?.[1] ?? ""),
      label: textContent(match[2]),
    }));
    if (anchors.length !== item.links.length) errors.push(`visible link count for ${item.question}`);
    item.links.forEach((link, linkIndex) => {
      const anchor = anchors[linkIndex];
      if (!anchor || anchor.href !== link.href || anchor.label !== link.label) {
        errors.push(`visible link mismatch: ${link.label}`);
      }
    });
  });
  const faq = faqs[0];
  const main = (faq?.mainEntity as JsonLdNode[] | undefined) ?? [];
  HOME_FAQS.forEach((item, index) => {
    const node = main[index];
    const answer = (node?.acceptedAnswer as JsonLdNode | undefined)?.text;
    if (node?.name !== item.question || answer !== item.answer) errors.push(`exported JSON-LD mismatch: ${item.question}`);
  });
}

validateData();
validateExport();

if (errors.length) {
  console.error(`home-faq: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(`home-faq: ${HOME_FAQS.length} questions; FAQPage matches the visible text; no sameAs.`);
