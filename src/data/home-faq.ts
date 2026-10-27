import { SITE } from "@/data/site";
import { faqJsonLd } from "@/lib/format";

/**
 * English homepage questions. The site homepage is not localised.
 * Visible copy and FAQPage JSON-LD both use `answer`. Each link label
 * appears once inside that answer. The Spanish polling day is not restated
 * here; Spain pages are maintained separately.
 */
export type HomeFaqLink = { label: string; href: string };

export type HomeFaqItem = {
  question: string;
  answer: string;
  links: readonly HomeFaqLink[];
};

export const HOME_FAQ_HEADING = "Questions";

const COUNTRY_LINKS = [
  { label: "Australia", href: "/au/" },
  { label: "Canada", href: "/ca/" },
  { label: "Italy", href: "/it/" },
  { label: "Mexico", href: "/mx/" },
  { label: "Poland", href: "/pl/" },
  { label: "Spain", href: "/es/" },
  { label: "Switzerland", href: "/ch/" },
  { label: "United Kingdom", href: "/gb/" },
  { label: "Ireland", href: "/ie/" },
  { label: "Norway", href: "/no/" },
  { label: "Sweden", href: "/se/" },
  { label: "Brazil", href: "/br/" },
  { label: "Serbia", href: "/rs/" },
  { label: "Israel", href: "/il/" },
  { label: "Bulgaria", href: "/bg/" },
  { label: "New Zealand", href: "/nz/" },
  { label: "Taiwan", href: "/tw/" },
  { label: "El Salvador", href: "/sv/" },
  { label: "Estonia", href: "/ee/" },
  { label: "Netherlands", href: "/nl/" },
] as const;

const HUB_LABELS = new Set(["Ireland", "Norway", "Sweden", "Brazil", "Serbia", "Israel", "Taiwan", "Bulgaria", "New Zealand", "El Salvador", "Estonia", "Netherlands"]);

function englishList(labels: readonly string[]): string {
  const spoken = labels.map((label) => (label === "United Kingdom" ? "the United Kingdom" : label));
  if (spoken.length <= 1) return spoken[0] ?? "";
  return `${spoken.slice(0, -1).join(", ")}, and ${spoken[spoken.length - 1]}`;
}

const fullGuides = englishList(COUNTRY_LINKS.filter((item) => !HUB_LABELS.has(item.label)).map((item) => item.label));

export const HOME_FAQS: readonly HomeFaqItem[] = [
  {
    question: "What is Map the General?",
    answer:
      "Map the General is an unofficial, independent, nonpartisan guide to elections in the countries covered so far. It is not affiliated with any government or election authority, and it does not tell you how to vote. Unofficial information. Confirm with your official election office.",
    links: [{ label: "countries covered so far", href: "#countries" }],
  },
  {
    question: "Which countries does this site cover?",
    answer: `This release covers ${fullGuides}. It also has national hubs for Ireland, Norway, Sweden, Brazil, Serbia and Israel, with no municipality pages and no live tracker. Bulgaria, New Zealand, Taiwan, El Salvador, Estonia and the Netherlands are national hubs with no municipality pages. Each election-night section shows that country’s official count only after the legal opening time. The 2026 U.S. midterm pages are on the sibling site ${SITE.siblingName}.`,
    links: [...COUNTRY_LINKS, { label: SITE.siblingName, href: SITE.siblingUrl }],
  },
  {
    question: "Which elections are covered?",
    answer:
      "Each country guide names the elections in this release. A polling day is printed only when the official source named on that page states it. This site does not supply a polling day that source did not print.",
    links: [],
  },
  {
    question: "Where do dates and results come from?",
    answer:
      "Each page names the official body its dates and results were read from. This site does not keep its own count. The bodies already used include the Australian Electoral Commission, Elections Canada, the Electoral Commission for Ireland, the Dipartimento per gli Affari Interni e Territoriali, the Instituto Nacional Electoral, Valgdirektoratet, the Państwowa Komisja Wyborcza, the Junta Electoral Central, Infoelectoral (Ministerio del Interior), Valmyndigheten, the Bundeskanzlei, the Electoral Commission for the United Kingdom, and the Central Election Commission of Taiwan. If this site and an official source differ, the official source controls.",
    links: [
      { label: "Australian Electoral Commission", href: "https://www.aec.gov.au/learn/election-timetable.htm" },
      { label: "Elections Canada", href: "https://www.elections.ca/" },
      { label: "Electoral Commission for Ireland", href: "https://www.electoralcommission.ie/general-elections/" },
      { label: "Dipartimento per gli Affari Interni e Territoriali", href: "https://dait.interno.gov.it/elezioni" },
      { label: "Instituto Nacional Electoral", href: "https://ine.mx/voto-y-elecciones/elecciones-2027/" },
      { label: "Valgdirektoratet", href: "https://www.valg.no/om-valg/valgene-i-norge/stortingsvalg/" },
      { label: "Państwowa Komisja Wyborcza", href: "https://pkw.gov.pl/" },
      { label: "Junta Electoral Central", href: "https://www.juntaelectoralcentral.es/" },
      { label: "Infoelectoral (Ministerio del Interior)", href: "https://infoelectoral.interior.gob.es/" },
      {
        label: "Valmyndigheten",
        href: "https://val.se/english/future-elections/2026-elections---the-riksdag-and-regional-and-municipal-councils",
      },
      { label: "Bundeskanzlei", href: "https://www.bk.admin.ch/de/nationalratswahlen" },
      {
        label: "Electoral Commission for the United Kingdom",
        href: "https://www.electoralcommission.org.uk/about-us/our-plans-priorities-and-spending/corporate-plan-2025/6-2029/30/electoral-system",
      },
      { label: "Central Election Commission of Taiwan", href: "https://www.cec.gov.tw/" },
    ],
  },
  {
    question: "How often are pages updated?",
    answer:
      "There is no fixed update timetable. The site is a static export. A push to the main branch runs the GitHub Pages workflow and publishes a new export. A page that shows a Last updated line prints the date of that update. The disclaimer says a figure, a date, or a name on this site can be behind the official record.",
    links: [{ label: "disclaimer", href: "/disclaimer/" }],
  },
  {
    question: "How do I report an error?",
    answer:
      "Use the contact page and the form on that page. Error reports are welcome. Include the page address and what should be corrected, with a source if you have one. Material corrections are logged on the copyright page. This site does not publish a personal email address.",
    links: [
      { label: "contact page", href: "/contact/" },
      { label: "copyright page", href: "/copyright/#corrections" },
    ],
  },
  {
    question: "Does the site make predictions or endorsements?",
    answer:
      "No. Map the General makes no predictions and no endorsements. It does not tell you how to vote. Nothing on this site is an endorsement of a candidate, party, coalition, or list. It prints no opinion polls, exit polls, or projections, and it does not call a race or invent vote totals.",
    links: [],
  },
];

export type AnswerSegment = { text: string; href?: string };

/** Split an answer so each link label is one segment and the joined text is the answer. */
export function answerSegments(item: HomeFaqItem): AnswerSegment[] {
  const ranges: { start: number; end: number; href: string; label: string }[] = [];
  for (const link of item.links) {
    if (!link.label || !link.href) throw new Error(`FAQ link is empty: ${item.question}`);
    const start = item.answer.indexOf(link.label);
    if (start < 0) throw new Error(`FAQ link label missing from answer: ${link.label}`);
    if (item.answer.indexOf(link.label, start + link.label.length) !== -1) {
      throw new Error(`FAQ link label appears more than once: ${link.label}`);
    }
    ranges.push({ start, end: start + link.label.length, href: link.href, label: link.label });
  }
  ranges.sort((a, b) => a.start - b.start);
  for (let index = 1; index < ranges.length; index += 1) {
    if (ranges[index].start < ranges[index - 1].end) {
      throw new Error(`FAQ link labels overlap: ${ranges[index - 1].label} / ${ranges[index].label}`);
    }
  }
  const parts: AnswerSegment[] = [];
  let cursor = 0;
  for (const range of ranges) {
    if (range.start > cursor) parts.push({ text: item.answer.slice(cursor, range.start) });
    parts.push({ text: item.answer.slice(range.start, range.end), href: range.href });
    cursor = range.end;
  }
  if (cursor < item.answer.length) parts.push({ text: item.answer.slice(cursor) });
  return parts;
}

export const homeFaqJsonLd = faqJsonLd(HOME_FAQS.map((item) => ({ question: item.question, answer: item.answer })));

for (const item of HOME_FAQS) {
  const joined = answerSegments(item).map((part) => part.text).join("");
  if (joined !== item.answer) throw new Error(`FAQ segments do not match the answer: ${item.question}`);
}
