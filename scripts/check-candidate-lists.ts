/**
 * Fails the build when a candidate-list file contains placeholder copy,
 * an unverified or non-https link, or a disambiguation URL. An empty
 * registered list must render no section and no ItemList.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ELECTION_SEO_PROFILES } from "../src/data/election-seo";
import {
  candidateItemListJsonLd,
  linkProblem,
  listCandidateFiles,
  loadCandidateList,
  orderedCandidates,
  placeholderHit,
  renderCandidateListHtml,
  type CandidateList,
  validateCandidateData,
} from "../src/lib/candidate-list";
import { renderElectionHtml } from "../src/lib/election-seo-html";

const root = process.cwd();
const errors: string[] = [];

for (const file of listCandidateFiles(root)) {
  const id = file.split("/").pop()?.replace(/\.json$/, "") ?? file;
  let data: CandidateList;
  try {
    data = JSON.parse(readFileSync(file, "utf8")) as CandidateList;
  } catch (error) {
    errors.push(`${id}: ${error instanceof Error ? error.message : String(error)}`);
    continue;
  }
  errors.push(...validateCandidateData(data, id));
}

const senat = loadCandidateList("senat-20-2026", root);
if (senat.candidates.length !== 0) errors.push("senat-20-2026: this check expects an empty list until the notice is copied in");
if (renderCandidateListHtml(senat, "en") !== "" || renderCandidateListHtml(senat, "pl") !== "") {
  errors.push("senat-20-2026: an empty list rendered text");
}
if (candidateItemListJsonLd(senat, "en") !== null) errors.push("senat-20-2026: an empty list produced ItemList");
if (senat.noticeDue !== "2026-11-12") errors.push("senat-20-2026: noticeDue is not 12 November 2026");
if (senat.submissionDeadline !== "2026-10-14") errors.push("senat-20-2026: submissionDeadline is not 14 October 2026");

const sample: CandidateList = {
  id: "sample",
  source: {
    url: "https://wybory.gov.pl/senat20261122/pl/pkw_obwieszczenia",
    readOn: "2026-11-12",
    order: "alphabetical",
    label: { en: "district commission notice", pl: "obwieszczenie okręgowej komisji" },
  },
  candidates: [
    {
      name: "Joanna SENYSZYN",
      surname: "Senyszyn",
      committee: "KOMITET WYBORCZY PRZYKŁAD A",
      links: [{ href: "https://pl.wikipedia.org/wiki/Przyklad", kind: "profile" }],
    },
    {
      name: "Anna ŁUKASIK",
      surname: "Łukasik",
      committee: "KOMITET WYBORCZY PRZYKŁAD B",
      links: [{ href: "https://example.com/komitet", kind: "committee" }],
    },
    {
      name: "Zdzisława RÓŻAŃSKA",
      surname: "Różańska",
      committee: "KOMITET WYBORCZY PRZYKŁAD C",
    },
  ],
};
const sampleErrors = validateCandidateData(sample, "sample");
if (sampleErrors.length) errors.push(...sampleErrors.map((line) => `sample: ${line}`));
const ordered = orderedCandidates(sample).map((row) => row.surname);
if (ordered.join("|") !== "Łukasik|Różańska|Senyszyn") {
  errors.push(`alphabetical order was ${ordered.join("|")}`);
}
const html = renderCandidateListHtml(sample, "en");
if (!html.includes('rel="nofollow noopener" target="_blank"')) errors.push("sample links missing nofollow noopener");
if (!html.includes("https://example.com/komitet")) errors.push("sample committee link missing");
if (html.includes("Zdzisława RÓŻAŃSKA") && /RÓŻAŃSKA[\s\S]{0,80}href=/.test(html)) {
  errors.push("unlinked sample row was given an href");
}
if (!html.includes("<li>Zdzisława RÓŻAŃSKA — KOMITET WYBORCZY PRZYKŁAD C.</li>")) {
  errors.push("unlinked sample row was not plain text");
}
const itemList = candidateItemListJsonLd(sample, "pl");
const elements = (itemList?.itemListElement as { name: string; position: number }[] | undefined) ?? [];
if (elements.map((item) => item.name).join("|") !== "Anna ŁUKASIK|Zdzisława RÓŻAŃSKA|Joanna SENYSZYN") {
  errors.push("ItemList names are not in alphabetical order");
}
if (elements.some((item, index) => item.position !== index + 1)) errors.push("ItemList positions are not 1..n");

const badLink = linkProblem("https://en.wikipedia.org/wiki/Smith_(disambiguation)");
if (badLink !== "disambiguation page") errors.push("disambiguation URL was accepted");
const badCopy = placeholderHit("Names to be announced");
if (!badCopy) errors.push("placeholder string was accepted");

const ballot: CandidateList = {
  id: "ballot",
  source: {
    url: "https://wybory.gov.pl/example",
    readOn: "2026-11-12",
    order: "ballot",
    label: { en: "notice", pl: "obwieszczenie" },
  },
  candidates: [
    { name: "B NOWAK", surname: "Nowak", committee: "KOMITET B", ballotOrder: 2 },
    { name: "A KOWAL", surname: "Kowal", committee: "KOMITET A", ballotOrder: 1 },
  ],
};
if (orderedCandidates(ballot).map((row) => row.ballotOrder).join(",") !== "1,2") {
  errors.push("ballot order was not applied");
}

for (const profile of ELECTION_SEO_PROFILES) {
  for (const page of profile.pages) {
    const pageHtml = renderElectionHtml(profile, page, root);
    const lists = pageHtml.match(/"@type":"ItemList"/g) ?? [];
    const section = pageHtml.includes('<section id="candidates">');
    if (!profile.candidateListId) {
      if (section || lists.length) errors.push(`${page.path}: candidate markup without a list id`);
      if (pageHtml.includes("article:modified_time")) errors.push(`${page.path}: dateModified meta without a candidate list`);
      continue;
    }
    const list = loadCandidateList(profile.candidateListId, root);
    if (list.candidates.length === 0) {
      if (section || lists.length) errors.push(`${page.path}: empty candidate list was rendered`);
    } else if (!section || lists.length !== 1) {
      errors.push(`${page.path}: published candidate list missing from the page`);
    }
    if (!pageHtml.includes(`<meta property="article:modified_time" content="${profile.lastmod}">`)) {
      errors.push(`${page.path}: dateModified meta is not ${profile.lastmod}`);
    }
    const outFile = join(root, "out", page.path, "index.html");
    try {
      const exported = readFileSync(outFile, "utf8");
      if (list.candidates.length === 0 && exported.includes('<section id="candidates">')) {
        errors.push(`${page.path}: export rendered an empty candidate list`);
      }
    } catch {
      // postbuild sees out/; a direct run before export only checks the renderer.
    }
  }
}

if (errors.length) {
  console.error(`candidate-lists: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log("candidate-lists: empty registered list renders nothing; placeholder and link checks passed.");
