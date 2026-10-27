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
  profileHref,
  renderCandidateListHtml,
  type CandidateList,
  type CandidateRecord,
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

function sectionHtml(html: string, id: string): string {
  const match = html.match(new RegExp(`<section id="${id}">([\\s\\S]*?)</section>`));
  return match?.[1] ?? "";
}

function expectProfile(list: CandidateList, name: string, href: string): void {
  const row = list.candidates.find((candidate) => candidate.name === name);
  if (!row) {
    errors.push(`${list.id}: missing ${name}`);
    return;
  }
  if (profileHref(row) !== href) errors.push(`${list.id}: ${name} profile is not the verified URL`);
}

function expectPlain(list: CandidateList, name: string): void {
  const row = list.candidates.find((candidate) => candidate.name === name);
  if (!row) {
    errors.push(`${list.id}: missing ${name}`);
    return;
  }
  if (row.links?.length) errors.push(`${list.id}: ${name} has a link but is unverified`);
}

const senat = loadCandidateList("senat-20-2026", root);
const senatOrder = orderedCandidates(senat).map((row) => row.surname).join("|");
if (senatOrder !== "Kubicki|Naruszewicz|Różańska|Senyszyn") {
  errors.push(`senat-20-2026: source order was ${senatOrder}`);
}
expectProfile(senat, "Janusz Krzysztof KUBICKI", "https://pl.wikipedia.org/wiki/Janusz_Kubicki_(samorz%C4%85dowiec)");
expectProfile(senat, "Joanna SENYSZYN", "https://pl.wikipedia.org/wiki/Joanna_Senyszyn");
expectPlain(senat, "Tomasz Jacek NARUSZEWICZ");
expectPlain(senat, "Zdzisława Maria RÓŻAŃSKA");
if (senat.noticeDue !== "2026-11-12") errors.push("senat-20-2026: noticeDue is not 12 November 2026");
if (senat.submissionDeadline !== "2026-10-14") errors.push("senat-20-2026: submissionDeadline is not 14 October 2026");
for (const lang of ["en", "pl"] as const) {
  const html = renderCandidateListHtml(senat, lang);
  if (
    /The notice of registered candidates, read on|Obwieszczenie o zarejestrowanych kandydatach, odczytane|<h2>Registered candidates<\/h2>|<h2>Zarejestrowani kandydaci<\/h2>/.test(
      html,
    )
  ) {
    errors.push(`senat-20-2026: ${lang} copy calls the Commission file a registered-candidate notice`);
  }
  if (!html.includes("kandydaci_senat_utf8.csv")) errors.push(`senat-20-2026: ${lang} copy does not name the file`);
}

const chieti = loadCandidateList("camera-chieti-2026", root);
const chietiOrder = orderedCandidates(chieti).map((row) => row.surname).join("|");
if (chietiOrder !== "Pasqualone|D'Amico|Colantonio|Ranieri") {
  errors.push(`camera-chieti-2026: source order was ${chietiOrder}`);
}
expectProfile(
  chieti,
  "Massimo Pasqualone",
  "https://dait.interno.gov.it/documenti/trasparenza/suppletive_camera_20261116-15/doc/MassimoPasqualone_CV.pdf",
);
expectProfile(
  chieti,
  "Mario Colantonio",
  "https://dait.interno.gov.it/documenti/trasparenza/suppletive_camera_20261116-15/doc/MarioColantonio_CV.pdf",
);
expectPlain(chieti, "Luciano D'Amico");
expectPlain(chieti, "Danilo Ranieri");
for (const lang of ["en", "it"] as const) {
  const html = renderCandidateListHtml(chieti, lang);
  if (!html.includes("MassimoPasqualone_CV.pdf") || !html.includes("MarioColantonio_CV.pdf")) {
    errors.push(`camera-chieti-2026: ${lang} list is missing a verified curriculum link`);
  }
  if (/D&#39;Amico[\s\S]{0,120}href=|D'Amico[\s\S]{0,80}href=/.test(html)) {
    errors.push(`camera-chieti-2026: ${lang} linked Luciano D'Amico`);
  }
  if (/Ranieri[\s\S]{0,80}href=/.test(html)) errors.push(`camera-chieti-2026: ${lang} linked Danilo Ranieri`);
}

const brazil = loadCandidateList("br-president-2026", root);
const brazilNames = [
  ["Flávio Bolsonaro", "https://pt.wikipedia.org/wiki/Fl%C3%A1vio_Bolsonaro"],
  ["Luiz Inácio Lula da Silva", "https://pt.wikipedia.org/wiki/Luiz_In%C3%A1cio_Lula_da_Silva"],
  ["Augusto Cury", "https://pt.wikipedia.org/wiki/Augusto_Cury"],
  ["Renan Santos", "https://pt.wikipedia.org/wiki/Renan_Santos"],
  ["Ronaldo Caiado", "https://pt.wikipedia.org/wiki/Ronaldo_Caiado"],
] as const;
if (orderedCandidates(brazil).map((row) => row.name).join("|") !== brazilNames.map(([name]) => name).join("|")) {
  errors.push("br-president-2026: source order changed");
}
for (const [name, href] of brazilNames) expectProfile(brazil, name, href);
const hub = readFileSync(join(root, "src/components/ModestHub.tsx"), "utf8");
if (!hub.includes('from "@/components/VerifiedCandidate"')) errors.push("Brazil results do not use VerifiedCandidate");
for (const [name] of brazilNames) {
  if (!hub.includes(`listId="br-president-2026" name="${name}"`)) {
    errors.push(`Brazil results do not read ${name} from the candidate list`);
  }
}
if (!hub.includes('votes: "64,256,232"') || !hub.includes('pct: "2.18%"')) {
  errors.push("Brazil vote figures were removed from the results table");
}

type ReviewRow = {
  name: string;
  listId: string;
  pages: string[];
  contest: string;
  committee: string;
  reason: string;
};
const reviewPath = join(root, "data/review/unlinked-candidates.json");
let reviewRows: ReviewRow[] = [];
try {
  const review = JSON.parse(readFileSync(reviewPath, "utf8")) as { readOn?: string; candidates?: ReviewRow[] };
  if (review.readOn !== "2026-10-27") errors.push("unlinked-candidates.json: readOn is not 2026-10-27");
  reviewRows = review.candidates ?? [];
} catch (error) {
  errors.push(`unlinked-candidates.json: ${error instanceof Error ? error.message : String(error)}`);
}
const unlinked = new Map<string, CandidateRecord>();
for (const file of listCandidateFiles(root)) {
  const id = file.split("/").pop()?.replace(/\.json$/, "") ?? file;
  const list = loadCandidateList(id, root);
  for (const row of list.candidates) {
    if (!profileHref(row)) unlinked.set(`${id}\t${row.name}`, row);
  }
}
for (const row of reviewRows) {
  const key = `${row.listId}\t${row.name}`;
  const found = unlinked.get(key);
  if (!found) {
    errors.push(`review list names ${row.name} but that candidate has a profile or is not on a list`);
    continue;
  }
  if (found.committee !== row.committee) errors.push(`review committee does not match the list for ${row.name}`);
  if (!row.pages?.length || !row.contest?.trim() || row.reason.trim().length < 40) {
    errors.push(`review row for ${row.name} is missing pages, contest, or a reason`);
  }
  unlinked.delete(key);
}
for (const key of unlinked.keys()) errors.push(`unlinked candidate missing from data/review/unlinked-candidates.json: ${key}`);

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
    if (pageHtml.includes("{{candidates}}")) errors.push(`${page.path}: candidate marker was left in the page`);
    if (profile.candidateListId === "senat-20-2026") {
      const block = sectionHtml(pageHtml, "candidates");
      if (
        /The notice of registered candidates, read on|Obwieszczenie o zarejestrowanych kandydatach, odczytane|<h2>Registered candidates<\/h2>|<h2>Zarejestrowani kandydaci<\/h2>/.test(
          block,
        )
      ) {
        errors.push(`${page.path}: candidate section calls the Commission file a registered-candidate notice`);
      }
    }
    if (profile.candidateListId === "camera-chieti-2026" && /sondagg/i.test(sectionHtml(pageHtml, "candidates"))) {
      errors.push(`${page.path}: candidate section mentions a poll`);
    }
    const outFile = join(root, "out", page.path, "index.html");
    try {
      const exported = readFileSync(outFile, "utf8");
      if (list.candidates.length === 0 && exported.includes('<section id="candidates">')) {
        errors.push(`${page.path}: export rendered an empty candidate list`);
      }
      if (list.candidates.length > 0 && !exported.includes('<section id="candidates">')) {
        errors.push(`${page.path}: export is missing the candidate section`);
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
console.log("candidate-lists: verified profile links, review list, and placeholder checks passed.");
