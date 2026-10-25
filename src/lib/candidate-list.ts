/**
 * Registered-candidate lists for election pages.
 *
 * A list is rendered only from a data file of people on the official
 * registered-candidate notice. An empty `candidates` array renders nothing:
 * no heading, no “to be announced” line, and no ItemList. Ballot order is
 * used when every row has one. Otherwise the list is Polish alphabetical
 * order by surname.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export type CandidateLang = "en" | "pl";
export type CandidateLinkKind = "campaign" | "committee" | "profile";
export type CandidateOrder = "ballot" | "alphabetical";

export type CandidateLink = {
  href: string;
  kind: CandidateLinkKind;
};

export type CandidateRecord = {
  /** Name exactly as officially registered. */
  name: string;
  /** Registering electoral committee, official name. */
  committee: string;
  /** Surname used when the notice does not publish a ballot order. */
  surname: string;
  /** Official ballot position. Omit when the notice does not publish one. */
  ballotOrder?: number;
  links?: CandidateLink[];
};

export type CandidateSource = {
  url: string;
  readOn: string;
  order: CandidateOrder;
  label: { en: string; pl: string };
};

export type CandidateList = {
  id: string;
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
};

export function candidateListDir(root = process.cwd()): string {
  return join(root, "src/data/pl/candidates");
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

export function validateCandidateData(data: CandidateList, fileId: string): string[] {
  const errors: string[] = [];
  exactKeys(data, ["id", "noticeDue", "submissionDeadline", "source", "candidates"], fileId, errors);
  if (data.id !== fileId) errors.push(`${fileId}: id is ${data.id}`);
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
  exactKeys(data.source, ["url", "readOn", "order", "label"], `${fileId}.source`, errors);
  if (!ISO_DATE.test(data.source.readOn)) errors.push(`${fileId}: source.readOn is not a date`);
  if (data.source.order !== "ballot" && data.source.order !== "alphabetical") {
    errors.push(`${fileId}: source.order must be ballot or alphabetical`);
  }
  exactKeys(data.source.label, ["en", "pl"], `${fileId}.source.label`, errors);
  const sourceLink = linkProblem(data.source.url);
  if (sourceLink) errors.push(`${fileId}: source URL ${sourceLink}`);
  if (!data.source.label.en?.trim() || !data.source.label.pl?.trim()) errors.push(`${fileId}: source label is empty`);

  const orders: number[] = [];
  data.candidates.forEach((row, index) => {
    const where = `${fileId}.candidates[${index}]`;
    exactKeys(row, ["name", "committee", "surname", "ballotOrder", "links"], where, errors);
    if (!row.name?.trim()) errors.push(`${where}: name is empty`);
    if (!row.committee?.trim()) errors.push(`${where}: committee is empty`);
    if (!row.surname?.trim()) errors.push(`${where}: surname is empty`);
    if (!row.name.includes(row.surname.toLocaleUpperCase("pl")) && !row.name.includes(row.surname)) {
      errors.push(`${where}: surname is not part of the registered name`);
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
    errors.push(`${fileId}: alphabetical list must not mix in ballot positions`);
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
  return rows.sort((a, b) => a.surname.localeCompare(b.surname, "pl") || a.name.localeCompare(b.name, "pl"));
}

function formatReadOn(iso: string, lang: CandidateLang): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (lang === "pl") return `${day} ${MONTHS_PL[month - 1]} ${year} r.`;
  return `${day} ${MONTHS_EN[month - 1]} ${year}`;
}

function outbound(href: string, label: string): string {
  return `<a href="${esc(href)}" rel="nofollow noopener" target="_blank">${esc(label)}</a>`;
}

export function candidateHeading(lang: CandidateLang): string {
  return lang === "pl" ? "Zarejestrowani kandydaci" : "Registered candidates";
}

export function renderCandidateListHtml(list: CandidateList, lang: CandidateLang): string {
  if (list.candidates.length === 0 || !list.source) return "";
  const rows = orderedCandidates(list);
  const date = formatReadOn(list.source.readOn, lang);
  const source = outbound(list.source.url, list.source.label[lang]);
  const intro =
    lang === "pl"
      ? `Obwieszczenie o zarejestrowanych kandydatach, odczytane ${date}, jest listą poniżej. Komitet jest nazwą z tego obwieszczenia. Źródło: ${source}.`
      : `The notice of registered candidates, read on ${date}, is the list below. The committee is the name in that notice. Source: ${source}.`;
  const order =
    list.source.order === "ballot"
      ? lang === "pl"
        ? "Kolejność jest kolejnością na karcie z tego obwieszczenia."
        : "The order is the ballot order in that notice."
      : lang === "pl"
        ? "To obwieszczenie nie podaje pozycji na karcie. Nazwiska są w polskim porządku alfabetycznym."
        : "That notice does not give a ballot order. Names are in Polish alphabetical order by surname.";
  const items = rows
    .map((row) => {
      const links = (row.links ?? []).map((link) => outbound(link.href, LINK_LABEL[lang][link.kind]));
      const tail = links.length ? ` ${links.join(" · ")}` : "";
      return `<li>${esc(row.name)} — ${esc(row.committee)}.${tail}</li>`;
    })
    .join("\n");
  return `<section id="candidates">
<h2>${esc(candidateHeading(lang))}</h2>
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
    name: candidateHeading(lang),
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
