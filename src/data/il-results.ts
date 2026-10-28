/**
 * Copy and facts for the Israel 2026 Knesset results pages (/il/he/results/,
 * /il/en/results/). Every figure here is sourced. The CEC feed is blocked outside
 * Israel, so figures are hand-copied (src/data/il-2026-manual-count.json).
 */
import meta from "./il-knesset-2026.json";
import { pollingExtended } from "./release-status";

export type IlLang = "he" | "en";
export const IL_WINDOW_ID = "il-2026-knesset";
export const IL_TRACKER_OPENS_AT = "2026-10-27T22:00:00+02:00";
export const IL_ELIGIBLE = 7331981;
export const IL_POLLING_STATIONS = 12018;
export const IL_PATHS: Record<IlLang, string> = { he: "/il/he/results/", en: "/il/en/results/" };
/**
 * Same-origin feed. A Cloudflare Worker on mapthegeneral.com/il-live/* proxies
 * the il-live-data branch and caches it at the edge for 60 seconds.
 */
export const IL_LIVE_DATA_URL = "/il-live/il-2026-knesset/results.json";
/** One attempt when the same-origin feed fails. Not the primary poll target. */
export const IL_LIVE_RAW_URL =
  "https://raw.githubusercontent.com/joshuaofisrael/mapthegeneral/il-live-data/il-2026-knesset/results.json";
export const IL_SNAPSHOT_URL = "/live/il-2026-knesset.json";
/** While the feed's stage has results (preliminary or final). */
export const IL_LIVE_POLL_RESULTS_MS = 120_000;
/** While the feed's stage is awaiting, or there is no count yet. */
export const IL_LIVE_POLL_AWAITING_MS = 300_000;

/** 2 minutes once a stage has results; 5 minutes while stage is awaiting. */
export function ilLivePollMs(doc: { stage?: string | null; results?: unknown[] } | null | undefined): number {
  if (doc?.stage === "awaiting") return IL_LIVE_POLL_AWAITING_MS;
  if (doc && Array.isArray(doc.results) && doc.results.length > 0) return IL_LIVE_POLL_RESULTS_MS;
  if (doc?.stage === "preliminary" || doc?.stage === "final") return IL_LIVE_POLL_RESULTS_MS;
  return IL_LIVE_POLL_AWAITING_MS;
}

/** Cache-friendly poll URL. ?t= stays constant inside the current refresh window. */
export function ilLivePollUrl(base: string, now = Date.now(), windowMs = IL_LIVE_POLL_AWAITING_MS): string {
  const join = base.includes("?") ? "&" : "?";
  return `${base}${join}t=${Math.floor(now / windowMs)}`;
}
export const IL_CEC_RESULTS = "https://cdn-votes26.bechirot.gov.il/";
export const IL_META = meta;

/** Seat label: seats are copied from a named report, never calculated here. Exact English; native Hebrew on he pages. */
export const IL_SEAT_LABEL = {
  he: "מספרי המנדטים הועתקו מדיווח תקשורתי שצוין בשמו על הספירה החלקית; האתר אינו מחשב מנדטים. לא רשמי ולא סופי.",
  en: "Seat numbers are copied from a named media report of the partial count; this site does not calculate seats. Unofficial and not final.",
} as const;

/** A feed older than this, or a failed fetch, must not show seat estimates. */
export const IL_FEED_FRESH_MS = 15 * 60 * 1000;

export function ilEstimatesAllowed(doc: { fetchedAt?: string | null; results?: unknown[] } | null, now: number, fetchFailed: boolean): boolean {
  if (fetchFailed || !doc || now < Date.parse(IL_TRACKER_OPENS_AT)) return false;
  if (pollingExtended(IL_WINDOW_ID)) return false;
  if (!Array.isArray(doc.results) || doc.results.length === 0) return false;
  if (!doc.fetchedAt) return false;
  const fetched = Date.parse(doc.fetchedAt);
  if (!Number.isFinite(fetched) || now - fetched > IL_FEED_FRESH_MS) return false;
  return true;
}

export const IL_COPY = {
  he: {
    title: "תוצאות הבחירות לכנסת ה-26, 2026",
    h1: "תוצאות הבחירות לכנסת ה-26",
    description:
      "תוצאות חלקיות ולא רשמיות של הבחירות לכנסת ה-26 ב-27 באוקטובר 2026, שהוזנו ידנית עם מקור ושעת עדכון. אינן סופיות.",
    kicker: "בחירות 2026 · 27 באוקטובר",
    intro:
      "קובץ התוצאות של ועדת הבחירות המרכזית חסום לגישה מחוץ לישראל, ולכן הנתונים בעמוד זה מוזנים ידנית. כל טבלה מציינת מקור אחד ושעת עדכון: מספרי מנדטים שהועתקו מדיווח תקשורתי (האתר אינו מחשב מנדטים), סכומי קולות שהועתקו ידנית מאתר הוועדה, ובמדור נפרד מדגמי המנדטים של ערוצי הטלוויזיה. שום נתון כאן אינו סופי או רשמי.",
    breadcrumbs: ["דף הבית", "ישראל", "תוצאות הבחירות"],
  },
  en: {
    title: "Israel election results, 27 October 2026",
    h1: "Israel election results 2026: the 26th Knesset",
    description:
      "Partial, unofficial results of the 26th Knesset election on 27 October 2026, entered by hand with a source and as-of time for each table. Not final.",
    kicker: "Knesset election · 27 October 2026",
    intro:
      "The Central Elections Committee results file is blocked outside Israel, so the figures on this page are entered by hand. Each table names one source and an as-of time: seat numbers copied from a named media report (this site does not calculate seats), vote totals copied by hand from the Committee's results site, and, in a separate section, TV seat samples published by television channels. Nothing here is final or official.",
    breadcrumbs: ["Home", "Israel", "Election results"],
  },
} as const;

export const IL_HOW = {
  he: [
    ["120 מושבים, מחוז ארצי אחד", "כל הארץ היא אזור בחירה אחד. הבוחרים מצביעים לרשימה, לא למועמד, והמושבים מתחלקים באופן יחסי בין הרשימות."],
    ["אחוז החסימה 3.25%", "רשימה שקיבלה פחות מ-3.25% מהקולות הכשרים אינה נכנסת לכנסת, וקולותיה אינם משתתפים בחלוקת המושבים."],
    ["שיטת בדר-עופר", "הקולות של הרשימות שעברו את אחוז החסימה מחולקים ב-120 לקבלת 'מודד'. כל רשימה מקבלת מושב על כל מודד שלם, והמושבים שנותרו מחולקים לפי הממוצע הגבוה ביותר (שיטת ד'הונדט)."],
    ["הסכמי עודפים", "שתי רשימות רשאיות לחתום על הסכם עודפים. בחלוקת המושבים העודפים הן נחשבות כרשימה אחת, ואחר כך המושבים מתחלקים ביניהן."],
    ["61 לרוב", "ממשלה זקוקה לאמון של רוב חברי הכנסת. 61 מתוך 120 הוא רוב מוחלט. הנשיא מטיל את הרכבת הממשלה על חבר כנסת לאחר התייעצות עם הסיעות."],
  ],
  en: [
    ["120 seats, one national constituency", "The whole country is one constituency. Voters choose a party list, not a candidate, and seats are shared out in proportion to votes."],
    ["3.25% threshold", "A list with less than 3.25% of valid votes wins no seats, and its votes take no part in the seat allocation."],
    ["The Bader-Ofer method", "Votes for lists above the threshold are divided by 120 to give a quota. Each list gets a seat per whole quota; the remaining seats go by highest average (the D'Hondt method)."],
    ["Surplus-vote agreements", "Two lists may sign a surplus agreement. For the leftover seats they count as one list, then split what they win between them."],
    ["61 for a majority", "A government needs the confidence of a Knesset majority; 61 of 120 is an absolute majority. The President asks a member to form a government after consulting the parties."],
  ],
} as const;

export const IL_TIMELINE = {
  he: [
    ["27.10, 07:00", "פתיחת הקלפיות. רוב הקלפיות פתוחות עד 22:00; קלפיות קטנות נסגרות ב-20:00."],
    ["27.10, 22:00", "סגירת הקלפיות. מתחילה ספירת הקולות, והתוצאות מתעדכנות בהדרגה במהלך הלילה."],
    ["28.10", "ספירת הקלפיות הרגילות נמשכת. בחירות קודמות הראו שתמונת המנדטים יכולה להשתנות עד הספירה האחרונה."],
    ["28–29.10", "ספירת 'המעטפות הכפולות' (חיילים, אסירים, מאושפזים, דיפלומטים ואחרים) בכנסת – כ-650 אלף מעטפות לפי ההערכות."],
    ["29.10", "ועדת הבחירות צופה פרסום תוצאות אמת בסביבות הצהריים."],
    ["עד 4.11", "המועד האחרון בחוק לפרסום התוצאות הרשמיות ברשומות."],
  ],
  en: [
    ["27 Oct, 07:00", "Polls open. Most stations stay open until 22:00; some small stations close at 20:00."],
    ["27 Oct, 22:00", "Polls close. The count starts, and results come in through the night."],
    ["28 Oct", "Counting of regular ballot boxes continues. In past elections the seat picture has shifted until the last box."],
    ["28–29 Oct", "'Double envelope' votes (soldiers, prisoners, patients, diplomats and others) are counted at the Knesset, about 650,000 envelopes by estimates."],
    ["29 Oct", "The Central Elections Committee expects to publish true results around midday."],
    ["By 4 Nov", "Legal deadline for publishing the official results in the Reshumot gazette."],
  ],
} as const;

export const IL_FAQ = {
  he: [
    ["מתי יתפרסמו תוצאות הבחירות 2026?", "הספירה מתחילה עם סגירת הקלפיות ב-22:00 ב-27 באוקטובר 2026, והתוצאות מתעדכנות כאן במהלך הלילה. ועדת הבחירות צופה תוצאות אמת סביב הצהריים ב-29 באוקטובר, והתוצאות הרשמיות יפורסמו ברשומות עד 4 בנובמבר."],
    ["מאיפה מגיעים הנתונים?", "קובץ התוצאות של הוועדה חסום מחוץ לישראל. סכומי הקולות מועתקים ידנית מאתר התוצאות של ועדת הבחירות המרכזית, ומספרי המנדטים מועתקים מהדיווח התקשורתי שצוין ליד הטבלה. מדגמי הטלוויזיה נמצאים במדור נפרד."],
    ["האם המנדטים בעמוד הם סופיים?", "לא. מספרי המנדטים הועתקו מדיווח תקשורתי על הספירה החלקית; האתר אינו מחשב מנדטים. הם ישתנו ככל שהספירה תתקדם, ובמיוחד לאחר ספירת המעטפות הכפולות. התוצאה המחייבת היא זו שתפרסם ועדת הבחירות."],
    ["מהו אחוז החסימה?", "3.25% מהקולות הכשרים. רשימה מתחת לסף זה אינה מקבלת מושבים."],
    ["כמה מנדטים צריך כדי להקים ממשלה?", "ממשלה צריכה אמון של רוב חברי הכנסת: 61 מתוך 120. "],
    ["כמה בעלי זכות בחירה יש?", "לפי ועדת הבחירות המרכזית, 7,331,981 בעלי זכות בחירה ו-12,018 קלפיות."],
    ["האם מספרי הטלוויזיה הם תוצאות רשמיות?", "לא. אחרי 22:00 יש במדור נפרד את מספרי המנדטים שפרסמו ערוצי הטלוויזיה. הם אינם תוצאות רשמיות. התוצאות הרשמיות מגיעות רק מוועדת הבחירות המרכזית. סכומי הקולות בחלק התוצאות הועתקו ידנית מאתר הוועדה."],
  ],
  en: [
    ["When will the Israel election results be published?", "Counting starts when polls close at 22:00 Israel time on 27 October 2026, and results update here through the night. The Central Elections Committee expects true results around midday on 29 October; official results are published in the Reshumot gazette by 4 November."],
    ["Where does the data come from?", "The Committee's results file is blocked outside Israel. Vote totals are copied by hand from the Central Elections Committee results site, and seat numbers are copied from the media report named beside that table. TV seat samples are in a separate section."],
    ["Are the seat numbers final?", "No. Seat numbers are copied from a named media report of the partial count; this site does not calculate seats. They will change as counting goes on, especially after the double-envelope count. The binding result is the one the Committee publishes."],
    ["What is the electoral threshold?", "3.25 percent of valid votes. A list below it wins no seats."],
    ["How many seats are needed to form a government?", "A government needs the confidence of a Knesset majority: 61 of 120. "],
    ["How many people can vote?", "According to the Central Elections Committee, 7,331,981 eligible voters and 12,018 polling stations."],
    ["Are the television numbers official?", "No. After 22:00 a separate section shows seat counts published by television channels. They are not official results. Official results come only from the Central Elections Committee. The vote totals in the results section are copied by hand from the Committee's results site."],
  ],
} as const;

export const IL_SOURCES = [
  { he: "ועדת הבחירות המרכזית – תוצאות הבחירות לכנסת ה-26", en: "Central Elections Committee – results, 26th Knesset", url: IL_CEC_RESULTS },
  { he: "ועדת הבחירות המרכזית – אתר הבית", en: "Central Elections Committee – home", url: "https://www.bechirot.gov.il/" },
  { he: meta.source.he, en: meta.source.en, url: meta.source.url },
  { he: meta.agreementsSource.he, en: meta.agreementsSource.en, url: meta.agreementsSource.url },
  { he: meta.past2022.source.he, en: meta.past2022.source.en, url: meta.past2022.source.url },
  { he: "הכנסת – חלוקת מושבים בכנסת, שיטת בדר-עופר", en: "The Knesset – distribution of Knesset seats (Bader-Ofer method)", url: "https://main.knesset.gov.il/About/Lexicon/Pages/seats.aspx" },
  { he: "חוק הבחירות (דרכי תעמולה), סעיף 16ה", en: "Elections (Modes of Propaganda) Law, s. 16E", url: "https://www.nevo.co.il/law_html/law00/90696.htm" },
  { he: "ynet – 7,331,981 בעלי זכות בחירה ו-12,018 קלפיות", en: "ynet voter guide – 7,331,981 eligible voters, 12,018 polling stations", url: "https://www.ynet.co.il/news/elections2026/article/yokra14927061" },
];
