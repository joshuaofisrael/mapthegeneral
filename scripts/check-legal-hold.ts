/**
 * Pre-publish legal-hold gate for Map the General.
 *
 * Fails the process when content would publish while flagged, unless
 * data/review/approvals.jsonl contains the sha256 of that exact file and a
 * human approver. This script never writes approvals.jsonl.
 *
 * HIGH (owner approval of the exact sha256 only; a moderate clearance cannot release these):
 *   1 allegation keywords next to a person or organisation
 *   2 emails, phone numbers, and street addresses of private persons
 *   6 election dates and deadlines with no election-authority URL
 *   8 legal complaints or restrictions on the manual hold list
 * MODERATE (data/review/moderate-clearances.jsonl, verdict "safe", matching sha256;
 * or the same owner approval). The gate never writes that file:
 *   3 image / asset provenance in data/review/asset-rights.json
 *   4 source URL and retrieval time on candidate and result data
 *   5 general advice on the manual hold list
 *   6 projection labels, final/certified status, distinct count labels
 *   7 wording that presents this site as official or affiliated
 *
 * Judgement only (no detector): health, sexuality, children, or victim
 * details beyond contact data; whether two sources disagree; whether a
 * headline overclaims; synthetic media that could be mistaken for evidence;
 * whether ordinary reporting on medicine, law, tax, or markets is personalised
 * advice; polling places, eligibility, and procedures outside the structured
 * date fields. Those stay on the manual hold list.
 *
 *   node --experimental-strip-types scripts/check-legal-hold.ts
 *   node --experimental-strip-types scripts/check-legal-hold.ts --self-test
 *   node --experimental-strip-types scripts/check-legal-hold.ts --paths file.json --draft-path out.json
 */
import { createHash } from "node:crypto";
import { appendFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const SITE = "Map the General";
const BOT = "Politics Bot";
const PUBLISHER_ADDRESS = "5640 W Maple Rd";

const TEXT_EXT = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".html", ".txt", ".xml", ".md", ".svg"]);
const IMAGE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif", ".ico"]);
const SKIP_DIR = new Set(["node_modules", ".next", ".git", "coverage", "_next"]);

const ALLEGATION =
  /(?<![\p{L}\p{N}_])(fraud(?:ulent|s)?|corrupt(?:ion)?|crimes?|criminal(?:ly|s)?|indict(?:ed|ment|ments)?|embezzl(?:e|ed|ement|ing)|bribery|bribes?|felon(?:y|ies)|money laundering|misconduct|\babuse\b|convicted|fraude?s?|fraudulent[oa]s?|corrupci[oó]n|corrupt[oa]s?|crimen(?:es)?|criminales?|imputad[oa]s?|soborno|malversaci[oó]n|corrompu(?:e|s|es)?|criminel(?:le|s|les)?|inculp[eé](?:s|e|es)?|d[eé]tournement|frode|fraudolent[ei]|corrott[oi]|corruzione|crimine|criminale|incriminat[oi]|tangente|peculato|betrug|korrupt(?:ion)?|verbrechen|angeklagt|unterschlagung|oszustw[oa]|korupcj[aąę]|przestępstw[oa]|przekupstw[oa]|oskarżon[yae]|הונאה|שחיתות|מושחת|פשע|שוחד|מעילה|fraude|corruptie|misdaad|misdrijf|aangeklaagd|omkoping|suborno|indiciad[oa]|petos|korruptio|rikos|rikollinen|syyte|измама|корупция|престъпление|обвинен|pettus|korruptsioon|kuritegu|欺诈|贪污|腐败|犯罪|превара|корупциј|криминал|оптужен)(?![\p{L}\p{N}_])/giu;

const NAME = /\b[\p{Lu}][\p{L}'’-]{1,}\s+[\p{Lu}][\p{L}'’-]{1,}\b/gu;
const ORG_WORD =
  /^(?:Commission|Committee|Ministry|Ministries|Parliament|Knesset|Senate|Congress|Council|Government|Court|Office|Authority|Bureau|Agency|Service|Department|Party|Electoral)$/;
const ORG_SUFFIX =
  /\b(?:Committee|Commission|Party|Ministry|Parliament|Knesset|Senate|Congress|Council|Government|Court|Electoral)\b/;
const NOT_A_PERSON =
  /^(?:United States|United Kingdom|New Zealand|New South|South Wales|Hong Kong|Costa Rica|Puerto Rico|El Salvador|Czech Republic|Saudi Arabia|South Africa|Sri Lanka|North Macedonia|Burkina Faso|Sierra Leone)$/i;

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;
const PERSONAL_MAIL = /@(?:gmail|googlemail|hotmail|outlook|live|yahoo|icloud|proton|protonmail|aol|gmx)\./i;
const PHONE =
  /(?:\+\d{1,3}[\s.-])(?:\(?\d{1,4}\)?[\s.-]){2,5}\d{2,4}|\(\d{2,4}\)[\s.-]*\d{3,4}[\s.-]?\d{3,4}|\b\d{3}[-.]\d{3}[-.]\d{4}\b|\b0\d{2,4}[\s-]\d{2,4}[\s-]\d{2,4}(?:[\s-]\d{2,4})?\b/g;
const STREET =
  /\b\d{1,5}\s+(?:[A-Z][\p{L}'’.-]*\s+){1,4}(?:Street|Road|Rd|Avenue|Ave|Boulevard|Blvd|Lane|Drive|Dr|Court|Way|Place|Terrace|Calle|Rua|Rue|Ulica|Straße|Strasse)\b\.?/gu;
const PHONE_PUBLIC = /freephone|helpline|hotline|infoline|toll[- ]free/i;

const SITE_CLAIM =
  /\b(?:map the general|this site|this page)\b[^.?\n]{0,80}\b(?:is|are)\b[^.?\n]{0,40}\b(?:the |an )?official\b|\b(?:map the general|this site|we)\b[^.?\n]{0,60}\b(?:is|are)\b[^.?\n]{0,20}\baffiliated\b|\bit is affiliated\b|\bofficial partner\b|\bour official website\b/gi;

const PROJECTION = /exit[- ]polls?|projections?|\bprojected\b|hochrechnung|מדגם|sondage à la sortie/gi;
const PROJECTION_NEGATION =
  /\b(no|not|never|without|none|isn't|aren't|doesn't|don't|won't|non|kein(?:e|en)?|nicht|geen|ingen|aucun|aucune|pas|forbid(?:s|den)?|prohibit(?:s|ion)?|bars?|banned)\b|n[’']en\b|\bni\b|אינו|אין|לא/i;

const PRELIMINARY_WORD =
  /preliminary|provisional|partial|wstępne|provvisor|vorläufig|provisoire|esialgne|voorlopig|alustav|preliminärt|初步|ראשונית/i;
const FINAL_ATTRIBUTION = /,|，|\bfrom\b|\bdal\b|\bdall|\bdel\b|\bde l|\bvom\b|\bvan\b|\bfrån\b|出自|Riigi |oikeusministeriön/i;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const ISO_TIME = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/;

type Rule = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Severity = "HIGH" | "MODERATE";

type Flag = {
  rule: Rule;
  severity: Severity;
  title: string;
  flagged: string;
  sources: string[];
  suggestion: string;
  draft_path: string;
};

type Approval = { path: string; sha256: string; approver: string };
type Clearance = {
  ts: string;
  item: string;
  rule: number;
  fix: string;
  independent_reviewer: string;
  verdict: string;
  sha256: string;
};
type Hold = { path: string; status: string; rule?: number; title?: string; note?: string };
type RightsEntry = { path: string; origin?: string; by?: string; note?: string };

type Options = {
  root: string;
  paths: string[] | null;
  draftPath: string | null;
  exportOut: boolean;
  queuePath: string;
  holdsPath: string;
  approvalsPath: string;
  clearancesPath: string;
  rightsPath: string;
  writeQueue: boolean;
  quiet: boolean;
};

const SUGGESTION: Record<Rule, string> = {
  1: "Hold for review. Do not soften or rephrase the allegation to pass this gate.",
  2: "Remove the private contact detail, or leave the file unpublished until this exact version is approved.",
  3: "Add a provenance entry with permission for the intended use, or drop the asset. Attribution is not permission.",
  4: "Add the source URL that was actually read and the retrieval time. Do not invent a citation.",
  5: "Manual hold. Leave unpublished until this exact version is approved.",
  6: "Label projections, exit polls, and partial counts apart from official results, and keep an election-authority source on dates and deadlines. A final or certified label needs an official-status flag.",
  7: "Remove wording that presents this site as official or affiliated.",
  8: "Manual hold for a legal complaint or restriction. Leave unpublished, and message the personal assistant. Do not republish automatically.",
};

function relFrom(root: string, file: string): string {
  const rel = path.relative(root, file);
  if (rel.startsWith("..")) return file.split(path.sep).join("/");
  return rel.split(path.sep).join("/");
}

function sha256(bytes: Buffer | string): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function snippet(text: string, index: number, length: number): string {
  const start = Math.max(0, index - 80);
  const end = Math.min(text.length, index + length + 80);
  return text.slice(start, end).replace(/\s+/g, " ").trim().slice(0, 400);
}

function urlsIn(text: string, limit = 5): string[] {
  const found = text.match(/https:\/\/[^\s"'<>)]+/g) ?? [];
  return [...new Set(found.map((url) => url.replace(/[.,;]+$/, "")))].slice(0, limit);
}

function titleFrom(text: string, draft: string): string {
  const h1 = text.match(/<h1[^>]*>([^<]{1,160})/i);
  if (h1) return h1[1].trim();
  const heading = text.match(/^\s{0,3}#{1,2}\s+(.{1,160})$/m);
  if (heading) return heading[1].trim();
  const titled = text.match(/"title"\s*:\s*"([^"\\]{1,160})"/);
  if (titled) return titled[1];
  return path.basename(draft);
}

function personalNames(slice: string): string[] {
  const names = slice.match(NAME) ?? [];
  return names.filter((name) => {
    if (NOT_A_PERSON.test(name)) return false;
    if (ORG_WORD.test(name.split(/\s+/).pop() ?? "")) return false;
    const at = slice.indexOf(name);
    const next = slice.slice(at + name.length).match(/^\s+([\p{Lu}][\p{L}'’-]+)/u);
    if (next && ORG_WORD.test(next[1])) return false;
    return true;
  });
}

function orgNear(slice: string): boolean {
  return ORG_SUFFIX.test(slice) || personalNames(slice).length > 0;
}

function benignAllegation(text: string, index: number, word: string): boolean {
  const before = text.slice(Math.max(0, index - 32), index);
  const after = text.slice(index + word.length, index + word.length + 20);
  if (/crime/i.test(word) && /police and\s*$/i.test(before)) return true;
  if (/criminal/i.test(word) && /^[-\s]?records?\b/i.test(after)) return true;
  if (/misconduct/i.test(word) && /our own willful\s+$/i.test(before)) return true;
  return false;
}

function describesOfficialSource(text: string, index: number, length: number): boolean {
  const after = text.slice(index + length, index + length + 32);
  return /^\s+(?:count|counts|results?|totals?|sources?|data|figures?|lists?|table|gazette|provisional|preliminary|file|tally|commission|committee|ministry|office)\b/i.test(after);
}

function windowAt(text: string, index: number, radius: number): string {
  return text.slice(Math.max(0, index - radius), Math.min(text.length, index + radius));
}

function sentenceAt(text: string, index: number): string {
  const start = Math.max(text.lastIndexOf("\n", index), text.lastIndexOf(".", index), text.lastIndexOf("!", index), text.lastIndexOf("?", index));
  const ends = [text.indexOf("\n", index), text.indexOf(".", index + 1), text.indexOf("!", index + 1), text.indexOf("?", index + 1)].filter((n) => n >= 0);
  const end = ends.length ? Math.min(...ends) : text.length;
  return text.slice(start + 1, end);
}

function negated(sentence: string): boolean {
  return /\b(not|never|no|non|without|unofficial)\b|n't|non-/i.test(sentence);
}

function severityFor(rule: Rule, logistics: boolean): Severity {
  if (rule === 1 || rule === 2 || rule === 8) return "HIGH";
  if (rule === 6 && logistics) return "HIGH";
  return "MODERATE";
}

function pushFlag(flags: Flag[], flag: Omit<Flag, "severity"> & { logistics?: boolean }) {
  const stored: Flag = {
    rule: flag.rule,
    severity: severityFor(flag.rule, flag.logistics === true),
    title: flag.title,
    flagged: flag.flagged,
    sources: flag.sources,
    suggestion: flag.suggestion,
    draft_path: flag.draft_path,
  };
  const key = `${stored.draft_path}\n${stored.rule}\n${stored.flagged}`;
  if (flags.some((item) => `${item.draft_path}\n${item.rule}\n${item.flagged}` === key)) return;
  flags.push(stored);
}

function checkAllegations(text: string, draft: string, flags: Flag[]) {
  ALLEGATION.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = ALLEGATION.exec(text))) {
    if (benignAllegation(text, match.index, match[0])) continue;
    const slice = windowAt(text, match.index, 120);
    if (!orgNear(slice)) continue;
    pushFlag(flags, {
      rule: 1,
      title: titleFrom(text, draft),
      flagged: snippet(text, match.index, match[0].length),
      sources: urlsIn(slice),
      suggestion: SUGGESTION[1],
      draft_path: draft,
    });
  }
}

function checkPrivateContact(text: string, draft: string, flags: Flag[]) {
  EMAIL.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = EMAIL.exec(text))) {
    const slice = windowAt(text, match.index, 80);
    const personal = PERSONAL_MAIL.test(match[0]) || personalNames(slice).length > 0;
    if (!personal) continue;
    pushFlag(flags, {
      rule: 2,
      title: titleFrom(text, draft),
      flagged: snippet(text, match.index, match[0].length),
      sources: urlsIn(slice),
      suggestion: SUGGESTION[2],
      draft_path: draft,
    });
  }
  PHONE.lastIndex = 0;
  while ((match = PHONE.exec(text))) {
    const sentence = sentenceAt(text, match.index);
    if (PHONE_PUBLIC.test(sentence)) continue;
    if (!personalNames(windowAt(text, match.index, 80)).length) continue;
    pushFlag(flags, {
      rule: 2,
      title: titleFrom(text, draft),
      flagged: snippet(text, match.index, match[0].length),
      sources: urlsIn(sentence),
      suggestion: SUGGESTION[2],
      draft_path: draft,
    });
  }
  STREET.lastIndex = 0;
  while ((match = STREET.exec(text))) {
    if (match[0].includes(PUBLISHER_ADDRESS) || text.slice(Math.max(0, match.index - 40), match.index + match[0].length + 40).includes(PUBLISHER_ADDRESS)) {
      continue;
    }
    const slice = windowAt(text, match.index, 80);
    if (!personalNames(slice).length) continue;
    pushFlag(flags, {
      rule: 2,
      title: titleFrom(text, draft),
      flagged: snippet(text, match.index, match[0].length),
      sources: urlsIn(slice),
      suggestion: SUGGESTION[2],
      draft_path: draft,
    });
  }
}

function checkAffiliation(text: string, draft: string, flags: Flag[]) {
  SITE_CLAIM.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = SITE_CLAIM.exec(text))) {
    const sentence = sentenceAt(text, match.index);
    if (negated(sentence) || sentence.includes("?")) continue;
    if (describesOfficialSource(text, match.index, match[0].length)) continue;
    pushFlag(flags, {
      rule: 7,
      title: titleFrom(text, draft),
      flagged: snippet(text, match.index, match[0].length),
      sources: urlsIn(sentence),
      suggestion: SUGGESTION[7],
      draft_path: draft,
    });
  }
}

const IL_EXIT_POLLS_OPEN_AT = Date.parse("2026-10-27T22:00:00+02:00");
const IL_EXIT_MARK = "data-il-" + "exit-polls";
const IL_EXIT_MARK_END = "data-il-sample-end";

function insideTag(text: string, index: number, tag: string): boolean {
  const open = text.lastIndexOf(`<${tag}`, index);
  if (open < 0) return false;
  const close = text.indexOf(`</${tag}>`, open);
  return close > index;
}

/** After 22:00 Israel time, television samples are allowed only in the Israel results section and its data file. */
function ilExitPollAllowed(draft: string, text: string, index: number, now = Date.now()): boolean {
  if (now < IL_EXIT_POLLS_OPEN_AT) return false;
  const norm = draft.replace(/\\/g, "/");
  if (norm.endsWith("src/data/il-2026-exit-polls.json")) return true;
  const page =
    norm.endsWith("src/components/IlExitPolls.tsx") ||
    norm.endsWith("il/en/results/index.html") ||
    norm.endsWith("il/he/results/index.html");
  if (!page) return false;
  if (norm.endsWith(".html") && (insideTag(text, index, "script") || insideTag(text, index, "style"))) return true;
  const start = text.lastIndexOf(IL_EXIT_MARK, index);
  if (start < 0) return false;
  const end = text.indexOf(IL_EXIT_MARK_END, start);
  return end > index;
}

function projectionDenied(text: string, index: number, length: number): boolean {
  const end = index + length;
  const around = text.slice(Math.max(0, index - 180), Math.min(text.length, end + 120));
  if (PROJECTION_NEGATION.test(around)) return true;
  const soon = text.slice(end, Math.min(text.length, end + 80));
  if (!soon.includes("?")) return false;
  const answer = text.slice(end, Math.min(text.length, end + 800));
  return PROJECTION_NEGATION.test(answer);
}

function checkProjectionLanguage(text: string, draft: string, flags: Flag[]) {
  PROJECTION.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = PROJECTION.exec(text))) {
    if (projectionDenied(text, match.index, match[0].length)) continue;
    if (ilExitPollAllowed(draft, text, match.index)) continue;
    const around = text.slice(Math.max(0, match.index - 180), Math.min(text.length, match.index + match[0].length + 120));
    pushFlag(flags, {
      rule: 6,
      title: titleFrom(text, draft),
      flagged: snippet(text, match.index, match[0].length),
      sources: urlsIn(around),
      suggestion: SUGGESTION[6],
      draft_path: draft,
    });
  }
}

function httpsUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value.startsWith("https://")) return null;
  return value;
}

function retrievalTime(value: unknown): boolean {
  if (typeof value !== "string" || !value.trim()) return false;
  return ISO_DATE.test(value) || ISO_TIME.test(value) || /\b\d{1,2}\s+[A-Z][a-z]+\.?\s+20\d{2}\b/.test(value);
}

function sourceObject(value: unknown): { url: string | null; when: boolean } {
  if (!value || typeof value !== "object") return { url: null, when: false };
  const record = value as Record<string, unknown>;
  const url = httpsUrl(record.url) ?? httpsUrl(record.href) ?? httpsUrl(record.source);
  const when =
    retrievalTime(record.readOn) ||
    retrievalTime(record.fetchedAt) ||
    retrievalTime(record.retrieved) ||
    retrievalTime(record.en) ||
    retrievalTime(record.he) ||
    retrievalTime(JSON.stringify(record));
  return { url, when };
}

function checkResultDocument(doc: Record<string, unknown>, text: string, draft: string, flags: Flag[]) {
  const results = Array.isArray(doc.results) ? doc.results : null;
  const stage = typeof doc.stage === "string" ? doc.stage : "";
  const officialStatus = typeof doc.officialStatus === "string" ? doc.officialStatus : "";
  const rows = results ? results.length : 0;
  const claimsCount = rows > 0 || stage === "preliminary" || stage === "final" || stage === "certified";
  const source = httpsUrl(doc.source) ?? sourceObject(doc.source).url;
  const when =
    retrievalTime(doc.fetchedAt) ||
    retrievalTime(doc.readOn) ||
    retrievalTime(doc.sourceUpdated) ||
    sourceObject(doc.source).when;
  if (claimsCount && (!source || !when)) {
    pushFlag(flags, {
      rule: 4,
      title: titleFrom(text, draft),
      flagged: `Result file ${draft} is missing a source URL or a retrieval time (stage ${stage || "unset"}, rows ${rows}).`,
      sources: source ? [source] : [],
      suggestion: SUGGESTION[4],
      draft_path: draft,
    });
  }
  const saysFinal = stage === "final" || stage === "certified" || doc.certified === true || officialStatus === "certified";
  const officialFlag = officialStatus === "official" || officialStatus === "certified" || (stage === "final" && !!source && officialStatus !== "partial" && officialStatus !== "none");
  if (saysFinal && !officialFlag) {
    const label = doc.certified === true || officialStatus === "certified" || stage === "certified" ? "certified" : stage || officialStatus;
    pushFlag(flags, {
      rule: 6,
      title: titleFrom(text, draft),
      flagged: `Result file ${draft} is labelled ${label} without an official-status flag.`,
      sources: source ? [source] : [],
      suggestion: SUGGESTION[6],
      draft_path: draft,
    });
  }
  if ((stage === "preliminary" || officialStatus === "partial") && /\bfinal results\b|\bcertified results\b/i.test(text) && !/\b(not|n't|preliminary|provisional|partial)\b/i.test(text)) {
    pushFlag(flags, {
      rule: 6,
      title: titleFrom(text, draft),
      flagged: `Result file ${draft} mixes a partial count with a final or certified label.`,
      sources: source ? [source] : [],
      suggestion: SUGGESTION[6],
      draft_path: draft,
    });
  }
}

function checkCandidateDocument(doc: Record<string, unknown>, text: string, draft: string, flags: Flag[]) {
  const candidates = Array.isArray(doc.candidates) ? doc.candidates : null;
  if (!candidates) return;
  const deadline = doc.submissionDeadline !== undefined || doc.noticeDue !== undefined;
  const populated = candidates.length > 0 || deadline;
  if (!populated) return;
  const source = sourceObject(doc.source);
  if (!source.url || !source.when) {
    pushFlag(flags, {
      rule: 4,
      title: titleFrom(text, draft),
      flagged: `Candidate file ${draft} is missing a source URL or a retrieval time.`,
      sources: source.url ? [source.url] : [],
      suggestion: SUGGESTION[4],
      draft_path: draft,
    });
  }
  if (deadline && !source.url) {
    pushFlag(flags, {
      rule: 6,
      title: titleFrom(text, draft),
      flagged: `Candidate file ${draft} has a deadline without an election-authority source URL.`,
      sources: [],
      suggestion: SUGGESTION[6],
      draft_path: draft,
      logistics: true,
    });
  }
}

function checkJsonData(text: string, draft: string, flags: Flag[]) {
  let doc: unknown;
  try {
    doc = JSON.parse(text);
  } catch {
    return;
  }
  if (!doc || typeof doc !== "object" || Array.isArray(doc)) return;
  const record = doc as Record<string, unknown>;
  if ("results" in record || "stage" in record) checkResultDocument(record, text, draft, flags);
  if ("candidates" in record || draft.includes("/candidates/")) checkCandidateDocument(record, text, draft, flags);
  if (draft.endsWith("il-knesset-2026.json")) {
    const source = sourceObject(record.source);
    if (!source.url || !source.when) {
      pushFlag(flags, {
        rule: 4,
        title: titleFrom(text, draft),
        flagged: "Israel candidate-list file is missing a source URL or a retrieval time.",
        sources: source.url ? [source.url] : [],
        suggestion: SUGGESTION[4],
        draft_path: draft,
      });
    }
  }
}

function checkVoteTable(text: string, draft: string, flags: Flag[]) {
  if (!/voteShare|mandates:\s*\d/.test(text)) return;
  if (draft.includes("/src/app/") || draft.endsWith("page.tsx")) return;
  const source = text.match(/https:\/\/[^\s"'<>)]+/);
  const when = ISO_DATE.test(text.match(/\b(20\d{2}-\d{2}-\d{2})\b/)?.[1] ?? "") || /\b20\d{2}-\d{2}-\d{2}\b/.test(text);
  if (!source || !when) {
    pushFlag(flags, {
      rule: 4,
      title: titleFrom(text, draft),
      flagged: `Result table ${draft} is missing a source URL or a retrieval time.`,
      sources: source ? [source[0]] : [],
      suggestion: SUGGESTION[4],
      draft_path: draft,
    });
  }
}

function loadJson<T>(file: string, fallback: T): T {
  if (!existsSync(file)) return fallback;
  const text = readFileSync(file, "utf8").trim();
  if (!text) return fallback;
  return JSON.parse(text) as T;
}

function loadJsonl(file: string): Record<string, unknown>[] {
  if (!existsSync(file)) return [];
  const rows: Record<string, unknown>[] = [];
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    rows.push(JSON.parse(trimmed) as Record<string, unknown>);
  }
  return rows;
}

function botApprover(name: string): boolean {
  return /^(politics bot|assistant|auto|automatic|self|ci|bot|github-actions(\[bot\])?)$/i.test(name.trim());
}

function ownerApprover(name: string): boolean {
  return /^(joshua|joshua israel|joshuaofisrael)$/i.test(name.trim());
}

function ownerRelease(file: string, hash: string, approvals: Approval[]): boolean {
  return approvals.some((row) => row.path === file && row.sha256 === hash && ownerApprover(row.approver));
}

function moderateRelease(flag: Flag, hash: string, clearances: Clearance[]): boolean {
  if (flag.severity !== "MODERATE") return false;
  return clearances.some(
    (row) =>
      row.item === flag.draft_path &&
      row.rule === flag.rule &&
      row.sha256 === hash &&
      row.verdict === "safe" &&
      row.ts.trim().length > 0 &&
      row.fix.trim().length > 0 &&
      row.independent_reviewer.trim().length > 1 &&
      !botApprover(row.independent_reviewer),
  );
}

function rightsEntries(file: string): RightsEntry[] {
  const parsed = loadJson<{ entries?: RightsEntry[] }>(file, {});
  return Array.isArray(parsed.entries) ? parsed.entries : [];
}

function imageCovered(draft: string, entries: RightsEntry[]): boolean {
  const candidates = [draft];
  if (draft.startsWith("out/")) candidates.push(`public/${draft.slice(4)}`);
  if (draft === "out/icon.svg" || draft === "out/favicon.ico" || draft === "out/apple-icon.png" || draft === "out/icon.png") {
    candidates.push("src/app/icon.svg");
  }
  for (const candidate of candidates) {
    for (const entry of entries) {
      const entryPath = entry.path.replace(/\\/g, "/");
      const hit = entryPath.endsWith("/") ? candidate.startsWith(entryPath) : candidate === entryPath;
      if (!hit) continue;
      const origin = (entry.origin ?? "").toLowerCase();
      const by = (entry.by ?? "").toLowerCase();
      if ((origin === "original" || origin === "generated") && by === "us") return true;
      const note = entry.note ?? "";
      if (/fair use|fair dealing/i.test(note)) return false;
      if (origin === "licensed" && note.trim().length > 12 && /permission|licence|license|commissioned/i.test(note)) return true;
    }
  }
  return false;
}

function checkImage(draft: string, entries: RightsEntry[], flags: Flag[]) {
  if (imageCovered(draft, entries)) return;
  pushFlag(flags, {
    rule: 3,
    title: path.basename(draft),
    flagged: draft,
    sources: [],
    suggestion: SUGGESTION[3],
    draft_path: draft,
  });
}

function constantsIn(text: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const match of text.matchAll(/^const\s+([A-Z0-9_]+)\s*=\s*"(https:[^"]+)"/gm)) {
    map.set(match[1], match[2]);
  }
  return map;
}

function checkElectionDates(root: string, flags: Flag[]) {
  const lawPath = path.join(root, "src/data/election-law.ts");
  if (existsSync(lawPath)) {
    const law = readFileSync(lawPath, "utf8");
    const end = law.indexOf("export const STANDING_RULES");
    const body = end === -1 ? law : law.slice(0, end);
    for (const chunk of body.split(/\n  \{\n/)) {
      const day = chunk.match(/pollingDay:\s*"(20\d{2}-\d{2}-\d{2})"/);
      if (!day) continue;
      const url = chunk.match(/officialResults:\s*\{[\s\S]*?url:\s*"(https:[^"]+)"/);
      const id = chunk.match(/id:\s*"([^"]+)"/)?.[1] ?? day[1];
      if (!url) {
        pushFlag(flags, {
          rule: 6,
          title: id,
          flagged: `${id} polling day ${day[1]} has no election-authority URL.`,
          sources: [],
          suggestion: SUGGESTION[6],
          draft_path: relFrom(root, lawPath),
          logistics: true,
        });
      }
    }
  }
  const seoDir = path.join(root, "src/data");
  if (!existsSync(seoDir)) return;
  for (const name of readdirSync(seoDir)) {
    if (!name.startsWith("election-seo") || !name.endsWith(".ts")) continue;
    const file = path.join(seoDir, name);
    const text = readFileSync(file, "utf8");
    const constants = constantsIn(text);
    for (const match of text.matchAll(/pollingDay:\s*"(20\d{2}-\d{2}-\d{2})"/g)) {
      const around = text.slice(match.index ?? 0, (match.index ?? 0) + 900);
      const literal = around.match(/organizerUrl:\s*"(https:[^"]+)"/);
      const ident = around.match(/organizerUrl:\s*([A-Z0-9_]+)/);
      const url = literal?.[1] ?? (ident ? constants.get(ident[1]) : undefined);
      if (!url) {
        const id = text.slice(Math.max(0, (match.index ?? 0) - 200), match.index).match(/id:\s*"([^"]+)"/);
        pushFlag(flags, {
          rule: 6,
          title: id?.[1] ?? name,
          flagged: `${id?.[1] ?? name} polling day ${match[1]} has no election-authority URL.`,
          sources: [],
          suggestion: SUGGESTION[6],
          draft_path: relFrom(root, file),
          logistics: true,
        });
      }
    }
  }
}

function checkNightLabels(root: string, flags: Flag[]) {
  const file = path.join(root, "src/data/election-night.ts");
  if (!existsSync(file)) return;
  const text = readFileSync(file, "utf8");
  const preliminary = [...text.matchAll(/\bpreliminary:\s*"((?:\\.|[^"\\])*)"/g)].map((item) => item[1]);
  const finals = [...text.matchAll(/\bfinal:\s*"((?:\\.|[^"\\])*)"/g)].map((item) => item[1]);
  const draft = relFrom(root, file);
  if (preliminary.length !== finals.length || preliminary.length === 0) {
    pushFlag(flags, {
      rule: 6,
      title: "Election night labels",
      flagged: `preliminary labels ${preliminary.length}, final labels ${finals.length}`,
      sources: [],
      suggestion: SUGGESTION[6],
      draft_path: draft,
    });
    return;
  }
  for (let i = 0; i < preliminary.length; i++) {
    if (preliminary[i] === finals[i] || !PRELIMINARY_WORD.test(preliminary[i]) || !FINAL_ATTRIBUTION.test(finals[i])) {
      pushFlag(flags, {
        rule: 6,
        title: "Election night labels",
        flagged: `Partial label "${preliminary[i]}" is not distinct from final label "${finals[i]}", or the final label does not name the authority.`,
        sources: [],
        suggestion: SUGGESTION[6],
        draft_path: draft,
      });
    }
  }
}

function checkIsraelLabels(root: string, flags: Flag[]) {
  for (const rel of ["src/components/IlEmbed.tsx", "scripts/il-live/snapshot.mjs"]) {
    const file = path.join(root, rel);
    if (!existsSync(file)) continue;
    const text = readFileSync(file, "utf8");
    const oldEmbed =
      text.includes('stage === "final"') &&
      text.includes("Final results") &&
      text.includes("Preliminary official count") &&
      text.includes("תוצאות סופיות") &&
      text.includes("ספירה רשמית ראשונית");
    const newEmbed =
      text.includes('stage === "final"') &&
      text.includes("Final Committee count") &&
      text.includes("Preliminary official count") &&
      text.includes("ספירת קולות סופית של הוועדה") &&
      text.includes("ספירה רשמית ראשונית");
    const oldSnapshot = text.includes('stage === "final"') && text.includes("Final results") && text.includes("Preliminary official count");
    const newSnapshot = /not final/i.test(text) && /not an official seat allocation/i.test(text);
    const distinct = rel.endsWith(".mjs") ? oldSnapshot || newSnapshot : oldEmbed || newEmbed;
    if (!distinct) {
      pushFlag(flags, {
        rule: 6,
        title: "Israel results labels",
        flagged: `${rel} must keep a preliminary label distinct from the final label, switched on stage === "final".`,
        sources: ["https://cdn-votes26.bechirot.gov.il/"],
        suggestion: SUGGESTION[6],
        draft_path: rel,
      });
    }
  }
}

function applyHolds(root: string, holds: Hold[], flags: Flag[], hashOf: Map<string, string>) {
  for (const hold of holds) {
    if (hold.status !== "HOLD_REVIEW" || !hold.path) continue;
    const draft = hold.path.replace(/\\/g, "/");
    const absolute = path.join(root, draft);
    if (!existsSync(absolute) || !statSync(absolute).isFile()) continue;
    const hash = hashOf.get(draft) ?? sha256(readFileSync(absolute));
    hashOf.set(draft, hash);
    const rule = (hold.rule === 5 || hold.rule === 8 ? hold.rule : 8) as Rule;
    pushFlag(flags, {
      rule,
      title: hold.title || path.basename(draft),
      flagged: hold.note || `On the manual hold list (${draft}).`,
      sources: [],
      suggestion: SUGGESTION[rule],
      draft_path: draft,
    });
  }
}

function shouldSkipDir(name: string, exportOut: boolean): boolean {
  if (name === "out") return !exportOut;
  if (name === "review") return true;
  return SKIP_DIR.has(name);
}

function walk(dir: string, exportOut: boolean, files: string[]) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    if (name.startsWith(".")) continue;
    const full = path.join(dir, name);
    const info = statSync(full);
    if (info.isDirectory()) {
      if (shouldSkipDir(name, exportOut)) continue;
      walk(full, exportOut, files);
      continue;
    }
    files.push(full);
  }
}

function contentFiles(options: Options): string[] {
  if (options.paths) return options.paths.map((file) => path.resolve(file));
  const files: string[] = [];
  for (const dir of ["src", "public", "data"]) walk(path.join(options.root, dir), options.exportOut, files);
  if (options.exportOut) walk(path.join(options.root, "out"), true, files);
  for (const rel of ["scripts/il-live/snapshot.mjs", "scripts/il-live/fetch.mjs", "scripts/election-night/fetch.mjs"]) {
    const full = path.join(options.root, rel);
    if (existsSync(full)) files.push(full);
  }
  return files;
}

function publicMirror(root: string, draft: string): boolean {
  if (!draft.startsWith("out/")) return false;
  return existsSync(path.join(root, "public", draft.slice(4)));
}

function scanFile(file: string, options: Options, entries: RightsEntry[], flags: Flag[], hashOf: Map<string, string>): void {
  const draft = options.draftPath && options.paths?.length === 1 ? options.draftPath.replace(/\\/g, "/") : relFrom(options.root, file);
  if (draft.startsWith("data/review/") || draft.includes("/data/review/")) return;
  if (publicMirror(options.root, draft)) return;
  const ext = path.extname(file).toLowerCase();
  const bytes = readFileSync(file);
  hashOf.set(draft, sha256(bytes));
  if (IMAGE_EXT.has(ext)) checkImage(draft, entries, flags);
  if (!TEXT_EXT.has(ext)) return;
  if (bytes.includes(0)) return;
  const text = bytes.toString("utf8");
  checkAllegations(text, draft, flags);
  checkPrivateContact(text, draft, flags);
  checkAffiliation(text, draft, flags);
  checkProjectionLanguage(text, draft, flags);
  if (ext === ".json") checkJsonData(text, draft, flags);
  else checkVoteTable(text, draft, flags);
}

function readClearances(file: string): Clearance[] {
  return loadJsonl(file).map((row) => ({
    ts: String(row.ts ?? ""),
    item: String(row.item ?? ""),
    rule: typeof row.rule === "number" ? row.rule : Number(row.rule),
    fix: String(row.fix ?? ""),
    independent_reviewer: String(row.independent_reviewer ?? ""),
    verdict: String(row.verdict ?? ""),
    sha256: String(row.sha256 ?? ""),
  }));
}

function readApprovals(file: string): Approval[] {
  return loadJsonl(file).map((row) => ({
    path: String(row.path ?? ""),
    sha256: String(row.sha256 ?? ""),
    approver: String(row.approver ?? ""),
  }));
}

function readHolds(file: string): Hold[] {
  return loadJsonl(file).map((row) => ({
    path: String(row.path ?? ""),
    status: String(row.status ?? ""),
    rule: typeof row.rule === "number" ? row.rule : undefined,
    title: typeof row.title === "string" ? row.title : undefined,
    note: typeof row.note === "string" ? row.note : undefined,
  }));
}

function queueLine(flag: Flag): string {
  return JSON.stringify({
    ts: new Date().toISOString(),
    site: SITE,
    bot: BOT,
    title: flag.title,
    flagged: flag.flagged,
    rule: flag.rule,
    severity: flag.severity,
    sources: flag.sources,
    suggestion: flag.suggestion,
    draft_path: flag.draft_path,
    status: "HOLD_REVIEW",
  });
}

function appendQueue(queuePath: string, flags: Flag[]) {
  if (!flags.length) return;
  mkdirSync(path.dirname(queuePath), { recursive: true });
  const seen = new Set<string>();
  if (existsSync(queuePath)) {
    for (const line of readFileSync(queuePath, "utf8").split("\n")) {
      if (line.trim()) seen.add(line);
    }
  }
  const fresh: string[] = [];
  for (const flag of flags) {
    const line = queueLine(flag);
    const signature = `${flag.draft_path}\t${flag.rule}\t${flag.flagged}`;
    const already = [...seen].some((existing) => existing.includes(signature) || existing.includes(`"draft_path":${JSON.stringify(flag.draft_path)}`) && existing.includes(`"rule":${flag.rule}`) && existing.includes(JSON.stringify(flag.flagged)));
    if (already) continue;
    seen.add(signature);
    fresh.push(line);
  }
  if (fresh.length) appendFileSync(queuePath, `${fresh.join("\n")}\n`);
}

function blockedFlags(flags: Flag[], approvals: Approval[], clearances: Clearance[], hashOf: Map<string, string>): Flag[] {
  return flags.filter((flag) => {
    const hash = hashOf.get(flag.draft_path);
    if (!hash) return true;
    if (ownerRelease(flag.draft_path, hash, approvals)) return false;
    if (flag.severity === "HIGH") return true;
    return !moderateRelease(flag, hash, clearances);
  });
}

export function runGate(options: Options): Flag[] {
  const approvalsBefore = existsSync(options.approvalsPath) ? readFileSync(options.approvalsPath) : Buffer.alloc(0);
  const clearancesBefore = existsSync(options.clearancesPath) ? readFileSync(options.clearancesPath) : Buffer.alloc(0);
  const approvals = readApprovals(options.approvalsPath);
  const clearances = readClearances(options.clearancesPath);
  const holds = readHolds(options.holdsPath);
  const entries = rightsEntries(options.rightsPath);
  const flags: Flag[] = [];
  const hashOf = new Map<string, string>();
  let scanned = 0;
  for (const file of contentFiles(options)) {
    if (!existsSync(file) || !statSync(file).isFile()) continue;
    scanFile(file, options, entries, flags, hashOf);
    scanned++;
  }
  if (!options.paths) {
    checkElectionDates(options.root, flags);
    checkNightLabels(options.root, flags);
    checkIsraelLabels(options.root, flags);
    applyHolds(options.root, holds, flags, hashOf);
  }
  const blocked = blockedFlags(flags, approvals, clearances, hashOf);
  if (options.writeQueue) appendQueue(options.queuePath, blocked);
  const approvalsAfter = existsSync(options.approvalsPath) ? readFileSync(options.approvalsPath) : Buffer.alloc(0);
  const clearancesAfter = existsSync(options.clearancesPath) ? readFileSync(options.clearancesPath) : Buffer.alloc(0);
  if (!approvalsBefore.equals(approvalsAfter) || !clearancesBefore.equals(clearancesAfter)) {
    console.error("legal-hold: the gate modified approvals or clearances. It must never self-approve.");
    process.exit(2);
  }
  if (options.quiet) return blocked;
  if (blocked.length) {
    console.error(`legal-hold: ${blocked.length} flagged item(s) would publish`);
    for (const flag of blocked.slice(0, 40)) {
      console.error(`  - ${flag.severity} rule ${flag.rule} ${flag.draft_path}: ${flag.flagged.slice(0, 180)}`);
    }
    if (blocked.length > 40) console.error(`  - … ${blocked.length - 40} more`);
  } else {
    console.log(`legal-hold: ${scanned} file(s) scanned, nothing flagged.`);
  }
  return blocked;
}

function parseArgs(argv: string[]): Options & { selfTest: boolean } {
  const root = process.cwd();
  const options: Options & { selfTest: boolean } = {
    root,
    paths: null,
    draftPath: null,
    exportOut: false,
    queuePath: path.join(root, "data/review/hold-queue.jsonl"),
    holdsPath: path.join(root, "data/review/holds.jsonl"),
    approvalsPath: path.join(root, "data/review/approvals.jsonl"),
    clearancesPath: path.join(root, "data/review/moderate-clearances.jsonl"),
    rightsPath: path.join(root, "data/review/asset-rights.json"),
    writeQueue: true,
    quiet: false,
    selfTest: false,
  };
  const paths: string[] = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--export") options.exportOut = true;
    else if (arg === "--no-queue") options.writeQueue = false;
    else if (arg === "--root") options.root = path.resolve(argv[++i] ?? "");
    else if (arg === "--queue") options.queuePath = path.resolve(argv[++i] ?? "");
    else if (arg === "--draft-path") options.draftPath = argv[++i] ?? null;
    else if (arg === "--paths") {
      while (argv[i + 1] && !argv[i + 1].startsWith("--")) paths.push(argv[++i]);
    } else if (arg.startsWith("--")) {
      console.error(`legal-hold: unknown argument ${arg}`);
      process.exit(2);
    }
  }
  if (paths.length) options.paths = paths;
  return options;
}

function writeJson(file: string, value: unknown) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, typeof value === "string" ? value : JSON.stringify(value));
}

function assert(condition: unknown, message: string, errors: string[]) {
  if (!condition) errors.push(message);
}

function selfTest(): number {
  const root = mkdtempSync(path.join(tmpdir(), "legal-hold-"));
  const errors: string[] = [];
  const rights = path.join(root, "rights.json");
  const holds = path.join(root, "holds.jsonl");
  const approvals = path.join(root, "approvals.jsonl");
  const clearances = path.join(root, "moderate-clearances.jsonl");
  const queue = path.join(root, "queue.jsonl");
  writeJson(rights, {
    entries: [{ path: "public/images/heroes/", origin: "generated", by: "us", note: "test hero" }],
  });
  writeFileSync(holds, "");
  writeFileSync(approvals, "");
  writeFileSync(clearances, "");
  const content = path.join(root, "src");
  mkdirSync(content, { recursive: true });
  const bad = path.join(content, "allegation.txt");
  const good = path.join(content, "pass.txt");
  writeFileSync(bad, "Jordan Lee was indicted for fraud, according to a rumour published on 1 January 2026.\n");
  writeFileSync(
    good,
    "The Electoral Commission list, read on 27 October 2026, names Jordan Lee as a candidate. Source: https://example.com/authority. Map the General is not an official website and is not affiliated with the Commission.\n",
  );
  writeFileSync(path.join(content, "mail.txt"), "Write to Jane Smith at jane.smith@gmail.com about the timetable.\n");
  writeFileSync(path.join(content, "phone.txt"), "Call Jane Smith on 555-010-0199 after the count.\n");
  writeFileSync(path.join(content, "address.txt"), "Jane Smith lives at 12 Oak Street according to the leak.\n");
  writeFileSync(path.join(content, "office.txt"), `The publisher's office is ${PUBLISHER_ADDRESS}, Ste 101, West Bloomfield.\n`);
  writeFileSync(path.join(content, "claim.txt"), "Map the General is the official website of the election.\n");
  writeFileSync(path.join(content, "disclaimer.txt"), "Map the General is not affiliated with any government. It is not an official website.\n");
  writeFileSync(path.join(content, "office-title.txt"), "The key-dates page lists Police and Crime Commissioners in England and Wales for May 2028.\n");
  writeFileSync(path.join(content, "record.txt"), "The curriculum links for Luciano D'Amico include criminal-record certificates, which are not copied here.\n");
  writeFileSync(path.join(content, "no-projection.txt"), "This page does not publish a poll, a projection, or a result call. It publishes no exit poll.\n");
  writeFileSync(
    path.join(content, "faq-projection.txt"),
    `Does this site publish seat projections or polls? ${"x".repeat(240)} No. Seats are shown only once the commission assigns them.\n`,
  );
  writeFileSync(path.join(content, "calls-projection.txt"), "The exit poll gives the list 40 percent and calls the race.\n");
  mkdirSync(path.join(content, "data"), { recursive: true });
  mkdirSync(path.join(content, "components"), { recursive: true });
  writeFileSync(path.join(content, "data", "il-2026-exit-polls.json"), '{"note":"exit poll 24"}\n');
  writeFileSync(
    path.join(content, "components", "IlExitPolls.tsx"),
    '/** data-il-exit-polls */\nexport const inside = "exit poll inside";\nexport const end = "data-il-sample-end";\nexport const outside = "exit poll outside";\n',
  );
  writeFileSync(
    path.join(content, "indemnity.txt"),
    "This indemnity does not apply to the extent a claim is caused by our own willful misconduct. These terms are governed by the laws of the State of Florida, United States of America.\n",
  );
  writeFileSync(path.join(content, "named-misconduct.txt"), "Jordan Lee committed willful misconduct, according to the complaint.\n");
  writeFileSync(path.join(content, "deadline.json"), JSON.stringify({ candidates: [], submissionDeadline: "2026-11-01" }));
  writeFileSync(path.join(content, "waiting.txt"), "This page is waiting for the official count. It does not assign seats.\n");
  writeFileSync(path.join(content, "saint.txt"), "St. Gallen 3203 SG Wahlkreis St. Gallen is a commune, not a private address.\n");
  mkdirSync(path.join(root, "public/images/heroes"), { recursive: true });
  writeFileSync(path.join(root, "public/images/heroes/au.png"), "png");
  mkdirSync(path.join(root, "public/images/other"), { recursive: true });
  writeFileSync(path.join(root, "public/images/other/photo.png"), "png");
  writeFileSync(
    path.join(content, "candidates.json"),
    JSON.stringify({ id: "x", candidates: [{ name: "Jordan Lee" }] }),
  );
  writeFileSync(
    path.join(content, "candidates-ok.json"),
    JSON.stringify({
      id: "x",
      source: { url: "https://example.com/list", readOn: "2026-10-27" },
      candidates: [{ name: "Jordan Lee" }],
    }),
  );
  writeFileSync(path.join(content, "empty-candidates.json"), JSON.stringify({ id: "x", candidates: [] }));
  const preliminary = {
    schema: 1,
    election: "il-2026-knesset",
    stage: "preliminary",
    officialStatus: "partial",
    source: "https://media26.bechirot.gov.il/files/expc.csv",
    fetchedAt: "2026-10-27T20:05:00.000Z",
    results: [{ letter: "מחל", en: "Likud", votes: 10, seats: 1 }],
  };
  const finalDoc = { ...preliminary, stage: "final", officialStatus: "official", fetchedAt: "2026-10-27T22:30:00.000Z" };
  const legacyFinal = { ...finalDoc, officialStatus: undefined };
  delete legacyFinal.officialStatus;
  writeFileSync(path.join(content, "preliminary.json"), JSON.stringify(preliminary));
  writeFileSync(path.join(content, "final.json"), JSON.stringify(finalDoc));
  writeFileSync(path.join(content, "legacy-final.json"), JSON.stringify(legacyFinal));
  writeFileSync(
    path.join(content, "certified.json"),
    JSON.stringify({ stage: "preliminary", certified: true, source: "https://example.com/r", fetchedAt: "2026-10-27T20:00:00.000Z", results: [{ name: "A", votes: 1 }] }),
  );
  const base: Options = {
    root,
    paths: null,
    draftPath: null,
    exportOut: false,
    queuePath: queue,
    holdsPath: holds,
    approvalsPath: approvals,
    clearancesPath: clearances,
    rightsPath: rights,
    writeQueue: true,
    quiet: true,
  };
  const blocked = runGate(base);
  const paths = new Set(blocked.map((flag) => `${flag.rule}:${path.basename(flag.draft_path)}`));
  assert(paths.has("1:allegation.txt"), "allegation was not held", errors);
  assert(![...paths].some((item) => item.endsWith("pass.txt")), "clean item was held", errors);
  assert(paths.has("2:mail.txt") && paths.has("2:phone.txt") && paths.has("2:address.txt"), "private contact was not held", errors);
  assert(!paths.has("2:office.txt"), "publisher office was held", errors);
  assert(paths.has("7:claim.txt"), "official-site claim was not held", errors);
  assert(!paths.has("7:disclaimer.txt"), "disclaimer was held", errors);
  assert(!paths.has("1:office-title.txt"), "Police and Crime Commissioners was held", errors);
  assert(!paths.has("1:record.txt"), "criminal-record certificate was held", errors);
  assert(!paths.has("6:no-projection.txt"), "a denial of projections was held", errors);
  assert(!paths.has("6:faq-projection.txt"), "a projection question answered No was held", errors);
  assert(paths.has("6:calls-projection.txt"), "an unlabeled exit poll was not held", errors);
  assert(blocked.find((flag) => flag.draft_path.endsWith("calls-projection.txt"))?.severity === "MODERATE", "exit poll was not moderate", errors);
  assert(!blocked.some((flag) => flag.draft_path.endsWith("il-2026-exit-polls.json")), "Israel sample file was held after close", errors);
  const exitFlags = blocked.filter((flag) => flag.draft_path.endsWith("IlExitPolls.tsx"));
  assert(exitFlags.length === 1 && exitFlags[0]?.flagged.includes("outside"), "sample copy outside the marker was not the only hold", errors);
  assert(!paths.has("1:indemnity.txt"), "terms indemnity was held as an allegation", errors);
  assert(paths.has("1:named-misconduct.txt"), "named misconduct was not held", errors);
  assert(blocked.find((flag) => flag.draft_path.endsWith("allegation.txt"))?.severity === "HIGH", "allegation was not high", errors);
  assert(paths.has("6:deadline.json") && blocked.find((flag) => flag.draft_path.endsWith("deadline.json") && flag.rule === 6)?.severity === "HIGH", "unsourced deadline was not high", errors);
  assert(blocked.find((flag) => flag.draft_path.endsWith("candidates.json"))?.severity === "MODERATE", "missing source was not moderate", errors);
  assert(!paths.has("7:waiting.txt"), "waiting for the official count was held", errors);
  assert(!paths.has("2:saint.txt"), "St. Gallen was held as an address", errors);
  assert(paths.has("3:photo.png"), "unprovenanced image was not held", errors);
  assert(!paths.has("3:au.png"), "generated hero was held", errors);
  assert(paths.has("4:candidates.json"), "unsourced candidate file was not held", errors);
  assert(!paths.has("4:candidates-ok.json") && !paths.has("4:empty-candidates.json"), "sourced or empty candidate file was held", errors);
  assert(!paths.has("4:preliminary.json") && !paths.has("6:preliminary.json"), "preliminary official count was held", errors);
  assert(!paths.has("6:final.json") && !paths.has("6:legacy-final.json"), "final count with official status was held", errors);
  assert(paths.has("6:certified.json"), "certified label without official status was not held", errors);
  const queued = readFileSync(queue, "utf8").trim().split("\n").map((line) => JSON.parse(line) as Record<string, unknown>);
  const sample = queued.find((row) => String(row.draft_path).endsWith("allegation.txt"));
  for (const field of ["ts", "site", "bot", "title", "flagged", "rule", "sources", "suggestion", "draft_path", "status"]) {
    assert(sample && field in sample, `queue line missing ${field}`, errors);
  }
  assert(sample?.site === SITE && sample?.bot === BOT && sample?.status === "HOLD_REVIEW" && sample?.rule === 1 && sample?.severity === "HIGH", "queue line identity", errors);
  const before = readFileSync(approvals);
  const clearancesBefore = readFileSync(clearances);
  runGate(base);
  assert(readFileSync(approvals).equals(before), "gate wrote approvals", errors);
  assert(readFileSync(clearances).equals(clearancesBefore), "gate wrote clearances", errors);
  const again = readFileSync(queue, "utf8").trim().split("\n").length;
  assert(again === queued.length, "queue duplicated a flagged item", errors);

  const hash = sha256(readFileSync(bad));
  writeFileSync(approvals, `${JSON.stringify({ path: relFrom(root, bad), sha256: hash, approver: BOT })}\n`);
  const still = runGate({ ...base, writeQueue: false });
  assert(still.some((flag) => flag.draft_path.endsWith("allegation.txt")), "bot approval released a file", errors);
  writeFileSync(approvals, `${JSON.stringify({ path: relFrom(root, bad), sha256: hash, approver: "Alex" })}\n`);
  const stranger = runGate({ ...base, writeQueue: false });
  assert(stranger.some((flag) => flag.draft_path.endsWith("allegation.txt")), "non-owner approval released a high item", errors);
  writeFileSync(approvals, `${JSON.stringify({ path: relFrom(root, bad), sha256: hash, approver: "Joshua" })}\n`);
  const released = runGate({ ...base, writeQueue: false });
  assert(!released.some((flag) => flag.draft_path.endsWith("allegation.txt")), "owner approval of the exact hash did not release", errors);
  writeFileSync(approvals, "");
  writeFileSync(bad, "Jordan Lee was indicted for fraud, according to a rumour published on 1 January 2026.\n");
  const allegationHash = sha256(readFileSync(bad));
  const candidateFile = path.join(content, "candidates.json");
  const candidateHash = sha256(readFileSync(candidateFile));
  const candidatePath = relFrom(root, candidateFile);
  writeFileSync(
    clearances,
    `${JSON.stringify({
      ts: "2026-10-27T18:30:00.000Z",
      item: candidatePath,
      rule: 4,
      fix: "Added the commission URL and the retrieval time that were actually read.",
      independent_reviewer: "ChatGPT",
      verdict: "safe",
      sha256: candidateHash,
    })}\n${JSON.stringify({
      ts: "2026-10-27T18:30:00.000Z",
      item: relFrom(root, bad),
      rule: 1,
      fix: "Left the allegation as written.",
      independent_reviewer: "ChatGPT",
      verdict: "safe",
      sha256: allegationHash,
    })}\n`,
  );
  const cleared = runGate({ ...base, writeQueue: false });
  assert(!cleared.some((flag) => flag.draft_path.endsWith("candidates.json")), "safe moderate clearance did not release", errors);
  assert(cleared.some((flag) => flag.draft_path.endsWith("allegation.txt")), "moderate clearance released a high allegation", errors);
  writeFileSync(
    clearances,
    `${JSON.stringify({
      ts: "2026-10-27T18:30:00.000Z",
      item: candidatePath,
      rule: 4,
      fix: "Added the commission URL and the retrieval time that were actually read.",
      independent_reviewer: "ChatGPT",
      verdict: "unsure",
      sha256: candidateHash,
    })}\n`,
  );
  const unsure = runGate({ ...base, writeQueue: false });
  assert(unsure.some((flag) => flag.draft_path.endsWith("candidates.json")), "unsure verdict released a moderate item", errors);
  writeFileSync(
    clearances,
    `${JSON.stringify({
      ts: "2026-10-27T18:30:00.000Z",
      item: candidatePath,
      rule: 4,
      fix: "Added the commission URL and the retrieval time that were actually read.",
      independent_reviewer: BOT,
      verdict: "safe",
      sha256: candidateHash,
    })}\n`,
  );
  const selfCleared = runGate({ ...base, writeQueue: false });
  assert(selfCleared.some((flag) => flag.draft_path.endsWith("candidates.json")), "bot clearance released a moderate item", errors);
  writeFileSync(clearances, "");
  writeFileSync(bad, `${readFileSync(bad, "utf8")} \n`);
  const changed = runGate({ ...base, writeQueue: false });
  assert(changed.some((flag) => flag.draft_path.endsWith("allegation.txt")), "changed bytes stayed released", errors);

  writeFileSync(approvals, "");
  const manual = path.join(content, "advice.txt");
  writeFileSync(manual, "Ordinary note with no allegation and no contact detail.\n");
  writeFileSync(holds, `${JSON.stringify({ path: relFrom(root, manual), status: "HOLD_REVIEW", rule: 5, title: "Advice", note: "personalised tax advice" })}\n`);
  const held = runGate({ ...base, writeQueue: false });
  assert(held.some((flag) => flag.rule === 5 && flag.draft_path.endsWith("advice.txt")), "manual hold did not fire", errors);
  const manualHash = sha256(readFileSync(manual));
  writeFileSync(approvals, `${JSON.stringify({ path: relFrom(root, manual), sha256: manualHash, approver: "Joshua" })}\n`);
  const manualReleased = runGate({ ...base, writeQueue: false });
  assert(!manualReleased.some((flag) => flag.draft_path.endsWith("advice.txt")), "approved manual hold stayed blocked", errors);

  if (errors.length) {
    console.error(`legal-hold self-test: ${errors.length} failure(s)`);
    for (const error of errors) console.error(`  - ${error}`);
    return 1;
  }
  console.log("legal-hold self-test: pass");
  return 0;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isMain) {
  const options = parseArgs(process.argv.slice(2));
  if (options.selfTest) {
    process.exit(selfTest());
  }
  const blocked = runGate(options);
  process.exit(blocked.length ? 1 : 0);
}
