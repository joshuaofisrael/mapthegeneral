/**
 * Named-candidate lists for election pages.
 *
 * Rows come from a data file: an official notice, a commission candidate
 * file, or a ministry or results list. An empty `candidates` array renders
 * nothing: no heading, no “to be announced” line, and no ItemList. Ballot
 * order is used when the source says so. Alphabetical order is by surname
 * in the list’s language. Source order keeps the rows as published.
 *
 * A profile link is stored on the row. The page does not hard-code it.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type CandidateLang = "en" | "pl" | "it";
export type CandidateLinkKind = "campaign" | "committee" | "profile";
export type CandidateOrder = "ballot" | "alphabetical" | "source";
export type LangText = Partial<Record<CandidateLang, string>>;

export type CandidateLink = {
  href: string;
  kind: CandidateLinkKind;
};

export type CandidateRecord = {
  /** Name exactly as officially published. */
  name: string;
  /** Registering committee, list, or party, in the official name. */
  committee: string;
  /** Surname used when the source does not publish a ballot order. */
  surname: string;
  /** Official ballot position. Omit when the source does not publish one. */
  ballotOrder?: number;
  links?: CandidateLink[];
};

export type CandidateSource = {
  url: string;
  readOn: string;
  order: CandidateOrder;
  label: LangText;
  /**
   * Custom section copy. `{date}` and `{source}` are filled at render.
   * When heading is omitted, the list uses the registered-notice wording
   * in English and Polish.
   */
  heading?: LangText;
  intro?: LangText;
  orderNote?: LangText;
};

export type CandidateList = {
  id: string;
  /** Languages this list can be rendered in. Defaults to English and Polish. */
  langs?: CandidateLang[];
  /** Calendar day by which the registered-candidate notice is due, if known. Not rendered. */
  noticeDue?: string;
  /** Calendar day on which candidate submission closed, if known. Not rendered. */
  submissionDeadline?: string;
  source?: CandidateSource;
  candidates: CandidateRecord[];
};

const LINK_KINDS: CandidateLinkKind[] = ["campaign", "committee", "profile"];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const PLACEHOLDERS = [
  /to be announced/i,
  /not retrieved/i,
  /\btbd\b/i,
  /\btba\b/i,
  /placeholder/i,
  /lorem ipsum/i,
  /do uzupełnienia/i,
  /nie ogłoszono/i,
  /coming soon/i,
  /brak danych/i,
  /not yet/i,
  /wkrótce/i,
  /\btodo\b/i,
  /\bfixme\b/i,
];

const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTHS_PL = [
  "stycznia",
  "lutego",
  "marca",
  "kwietnia",
  "maja",
  "czerwca",
  "lipca",
  "sierpnia",
  "września",
  "października",
  "listopada",
  "grudnia",
];

const LINK_LABEL: Record<CandidateLang, Record<CandidateLinkKind, string>> = {
  en: { campaign: "campaign site", committee: "committee site", profile: "profile" },
  pl: { campaign: "strona kampanii", committee: "strona komitetu", profile: "profil" },
  it: { campaign: "sito di campagna", committee: "sito della lista", profile: "profilo" },
};

const LANGS: CandidateLang[] = ["en", "pl", "it"];

const MONTHS_IT = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
];

export function candidateListDir(root = process.cwd()): string {
  return join(root, "src/data/candidates");
}

export function listLanguages(list: Pick<CandidateList, "langs">): CandidateLang[] {
  return list.langs ?? ["en", "pl"];
}

export function candidateListFile(id: string, root = process.cwd()): string {
  return join(candidateListDir(root), `${id}.json`);
}

export function listCandidateFiles(root = process.cwd()): string[] {
  const dir = candidateListDir(root);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => join(dir, name));
}

export function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function placeholderHit(value: string): string | null {
  for (const pattern of PLACEHOLDERS) {
    const match = value.match(pattern);
    if (match) return match[0];
  }
  return null;
}

function walkStrings(value: unknown, path: string, found: string[]): void {
  if (typeof value === "string") {
    const hit = placeholderHit(value);
    if (hit) found.push(`${path}: placeholder “${hit}”`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkStrings(item, `${path}[${index}]`, found));
    return;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) walkStrings(item, `${path}.${key}`, found);
  }
}

function exactKeys(value: object, allowed: string[], where: string, errors: string[]): void {
  for (const key of Object.keys(value)) {
    if (!allowed.includes(key)) errors.push(`${where}: unexpected field ${key}`);
  }
}

export function linkProblem(href: string): string | null {
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return "not a URL";
  }
  if (url.protocol !== "https:") return "must be https";
  const path = decodeURIComponent(url.pathname).toLowerCase();
  if (path.includes("disambiguation") || path.includes("ujednoznacznienie")) return "disambiguation page";
  return null;
}

function requireCopy(block: LangText | undefined, langs: CandidateLang[], where: string, errors: string[], token?: string): void {
  if (!block) {
    errors.push(`${where}: missing`);
    return;
  }
  exactKeys(block, langs, where, errors);
  for (const lang of langs) {
    const text = block[lang];
    if (!text?.trim()) errors.push(`${where}.${lang} is empty`);
    else if (token && !text.includes(token)) errors.push(`${where}.${lang} is missing ${token}`);
  }
}

export function validateCandidateData(data: CandidateList, fileId: string): string[] {
  const errors: string[] = [];
  exactKeys(data, ["id", "noticeDue", "submissionDeadline", "source", "candidates", "langs"], fileId, errors);
  if (data.id !== fileId) errors.push(`${fileId}: id is ${data.id}`);
  const langs = listLanguages(data);
  if (data.langs) {
    if (data.langs.length === 0) errors.push(`${fileId}: langs is empty`);
    for (const lang of data.langs) {
      if (!LANGS.includes(lang)) errors.push(`${fileId}: language ${lang}`);
    }
  }
  if (data.noticeDue !== undefined && !ISO_DATE.test(data.noticeDue)) errors.push(`${fileId}: noticeDue is not a date`);
  if (data.submissionDeadline !== undefined && !ISO_DATE.test(data.submissionDeadline)) {
    errors.push(`${fileId}: submissionDeadline is not a date`);
  }
  if (!Array.isArray(data.candidates)) {
    errors.push(`${fileId}: candidates is not a list`);
    return errors;
  }
  walkStrings(data, fileId, errors);
  if (data.candidates.length === 0) {
    if (data.source) errors.push(`${fileId}: empty list must not carry a source block`);
    return errors;
  }
  if (!data.source) {
    errors.push(`${fileId}: a published list needs a source`);
    return errors;
  }
  exactKeys(data.source, ["url", "readOn", "order", "label", "heading", "intro", "orderNote"], `${fileId}.source`, errors);
  if (!ISO_DATE.test(data.source.readOn)) errors.push(`${fileId}: source.readOn is not a date`);
  if (data.source.order !== "ballot" && data.source.order !== "alphabetical" && data.source.order !== "source") {
    errors.push(`${fileId}: source.order must be ballot, alphabetical, or source`);
  }
  requireCopy(data.source.label, langs, `${fileId}.source.label`, errors);
  const custom = data.source.heading || data.source.intro || data.source.orderNote;
  if (custom) {
    requireCopy(data.source.heading, langs, `${fileId}.source.heading`, errors);
    requireCopy(data.source.intro, langs, `${fileId}.source.intro`, errors, "{source}");
    requireCopy(data.source.orderNote, langs, `${fileId}.source.orderNote`, errors);
  } else if (langs.some((lang) => lang !== "en" && lang !== "pl")) {
    errors.push(`${fileId}: a list outside English and Polish needs heading, intro, and orderNote`);
  }
  const sourceLink = linkProblem(data.source.url);
  if (sourceLink) errors.push(`${fileId}: source URL ${sourceLink}`);

  const orders: number[] = [];
  data.candidates.forEach((row, index) => {
    const where = `${fileId}.candidates[${index}]`;
    exactKeys(row, ["name", "committee", "surname", "ballotOrder", "links"], where, errors);
    if (!row.name?.trim()) errors.push(`${where}: name is empty`);
    if (!row.committee?.trim()) errors.push(`${where}: committee is empty`);
    if (!row.surname?.trim()) errors.push(`${where}: surname is empty`);
    const upper = row.surname.toLocaleUpperCase(sortLocale(data));
    if (!row.name.includes(upper) && !row.name.includes(row.surname)) {
      errors.push(`${where}: surname is not part of the published name`);
    }
    if (row.ballotOrder !== undefined) {
      if (!Number.isInteger(row.ballotOrder) || row.ballotOrder < 1) errors.push(`${where}: ballotOrder must be a positive integer`);
      else orders.push(row.ballotOrder);
    }
    for (const link of row.links ?? []) {
      exactKeys(link, ["href", "kind"], `${where}.link`, errors);
      if (!LINK_KINDS.includes(link.kind)) errors.push(`${where}: link kind ${link.kind}`);
      const problem = linkProblem(link.href);
      if (problem) errors.push(`${where}: link ${problem} (${link.href})`);
    }
  });
  const withOrder = data.candidates.filter((row) => row.ballotOrder !== undefined).length;
  if (data.source.order === "ballot") {
    if (withOrder !== data.candidates.length) errors.push(`${fileId}: ballot order is missing on a row`);
    if (new Set(orders).size !== orders.length) errors.push(`${fileId}: ballot positions repeat`);
  } else if (withOrder !== 0) {
    errors.push(`${fileId}: this list must not mix in ballot positions`);
  }
  return errors;
}

export function loadCandidateList(id: string, root = process.cwd()): CandidateList {
  const file = candidateListFile(id, root);
  if (!existsSync(file)) throw new Error(`candidate list file is missing: ${file}`);
  const data = JSON.parse(readFileSync(file, "utf8")) as CandidateList;
  const errors = validateCandidateData(data, id);
  if (errors.length) throw new Error(errors.join("\n"));
  return data;
}

export function orderedCandidates(list: CandidateList): CandidateRecord[] {
  const rows = [...list.candidates];
  if (rows.length === 0 || !list.source) return rows;
  if (list.source.order === "ballot") {
    return rows.sort((a, b) => (a.ballotOrder ?? 0) - (b.ballotOrder ?? 0));
  }
  if (list.source.order === "source") return rows;
  const locale = sortLocale(list);
  return rows.sort((a, b) => a.surname.localeCompare(b.surname, locale) || a.name.localeCompare(b.name, locale));
}

function formatReadOn(iso: string, lang: CandidateLang): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (lang === "pl") return `${day} ${MONTHS_PL[month - 1]} ${year} r.`;
  if (lang === "it") return `${day} ${MONTHS_IT[month - 1]} ${year}`;
  return `${day} ${MONTHS_EN[month - 1]} ${year}`;
}

function fillTemplate(template: string, date: string, sourceHtml: string): string {
  return esc(template).replaceAll("{date}", esc(date)).replaceAll("{source}", sourceHtml);
}

function sortLocale(list: CandidateList): string {
  const langs = listLanguages(list);
  if (langs.includes("pl")) return "pl";
  if (langs.includes("it")) return "it";
  return "en";
}

export function profileHref(row: CandidateRecord): string | undefined {
  return row.links?.find((link) => link.kind === "profile")?.href;
}

function outbound(href: string, label: string): string {
  return `<a href="${esc(href)}" rel="nofollow noopener" target="_blank">${esc(label)}</a>`;
}

export function candidateHeading(list: CandidateList, lang: CandidateLang): string {
  const custom = list.source?.heading?.[lang];
  if (custom) return custom;
  return lang === "pl" ? "Zarejestrowani kandydaci" : "Registered candidates";
}

function noticeIntro(lang: CandidateLang, date: string, source: string): string {
  if (lang === "pl") {
    return `Obwieszczenie o zarejestrowanych kandydatach, odczytane ${date}, jest listą poniżej. Komitet jest nazwą z tego obwieszczenia. Źródło: ${source}.`;
  }
  return `The notice of registered candidates, read on ${date}, is the list below. The committee is the name in that notice. Source: ${source}.`;
}

function noticeOrder(list: CandidateList, lang: CandidateLang): string {
  if (list.source?.order === "ballot") {
    return lang === "pl"
      ? "Kolejność jest kolejnością na karcie z tego obwieszczenia."
      : "The order is the ballot order in that notice.";
  }
  return lang === "pl"
    ? "To obwieszczenie nie podaje pozycji na karcie. Nazwiska są w polskim porządku alfabetycznym."
    : "That notice does not give a ballot order. Names are in Polish alphabetical order by surname.";
}

export function renderCandidateListHtml(list: CandidateList, lang: CandidateLang): string {
  if (list.candidates.length === 0 || !list.source) return "";
  if (!listLanguages(list).includes(lang)) {
    throw new Error(`${list.id}: no ${lang} copy`);
  }
  const rows = orderedCandidates(list);
  const date = formatReadOn(list.source.readOn, lang);
  const label = list.source.label[lang];
  if (!label) throw new Error(`${list.id}: source label missing for ${lang}`);
  const source = outbound(list.source.url, label);
  const intro = list.source.intro?.[lang]
    ? fillTemplate(list.source.intro[lang], date, source)
    : noticeIntro(lang, date, source);
  const order = list.source.orderNote?.[lang] ? esc(list.source.orderNote[lang]) : noticeOrder(list, lang);
  const items = rows
    .map((row) => {
      const links = (row.links ?? []).map((link) => outbound(link.href, LINK_LABEL[lang][link.kind]));
      const tail = links.length ? ` ${links.join(" · ")}` : "";
      return `<li>${esc(row.name)} — ${esc(row.committee)}.${tail}</li>`;
    })
    .join("\n");
  return `<section id="candidates">
<h2>${esc(candidateHeading(list, lang))}</h2>
<p>${intro}</p>
<p>${order}</p>
<ul>
${items}
</ul>
</section>`;
}

function personUrl(row: CandidateRecord): string | undefined {
  const campaign = row.links?.find((link) => link.kind === "campaign");
  if (campaign) return campaign.href;
  return row.links?.find((link) => link.kind === "profile")?.href;
}

export function candidateItemListJsonLd(list: CandidateList, lang: CandidateLang): Record<string, unknown> | null {
  if (list.candidates.length === 0 || !list.source) return null;
  const rows = orderedCandidates(list);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: candidateHeading(list, lang),
    numberOfItems: rows.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: rows.map((row, index) => {
      const affiliation: Record<string, unknown> = { "@type": "Organization", name: row.committee };
      const committee = row.links?.find((link) => link.kind === "committee");
      if (committee) affiliation.url = committee.href;
      const item: Record<string, unknown> = {
        "@type": "Person",
        name: row.name,
        affiliation,
      };
      const url = personUrl(row);
      if (url) item.url = url;
      return {
        "@type": "ListItem",
        position: list.source?.order === "ballot" ? row.ballotOrder : index + 1,
        name: row.name,
        item,
      };
    }),
  };
}
