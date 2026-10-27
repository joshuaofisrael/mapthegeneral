/**
 * Copy and facts for the Israel 2026 Knesset results pages (/il/he/results/,
 * /il/en/results/). Every figure here is sourced; live counts come only from
 * the Central Elections Committee via scripts/il-live/fetch.mjs.
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
/** Poll twice a minute. ?t= stays constant inside that 30s window so the edge can answer. */
export const IL_LIVE_POLL_MS = 30_000;

/** Cache-friendly poll URL: ?t=floor(now/30000), shared by every visitor in that window. */
export function ilLivePollUrl(base: string, now = Date.now()): string {
  const join = base.includes("?") ? "&" : "?";
  return `${base}${join}t=${Math.floor(now / IL_LIVE_POLL_MS)}`;
}
export const IL_CEC_RESULTS = "https://cdn-votes26.bechirot.gov.il/";
export const IL_META = meta;

/** Seats this site calculates. Exact English; native Hebrew on he pages. */
export const IL_SEAT_LABEL = {
  he: "חלוקת מנדטים בלתי רשמית, שחושבה מספירת קולות רשמית חלקית; אינה סופית ואינה חלוקת מנדטים רשמית.",
  en: "Unofficial seat allocation calculated from partial official vote totals; not final and not an official seat allocation.",
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
    title: "תוצאות הבחירות 2026 בזמן אמת – מנדטים לכנסת ה-26",
    h1: "תוצאות הבחירות לכנסת ה-26",
    description:
      "תוצאות הבחירות 2026 בזמן אמת מנתוני ועדת הבחירות המרכזית: מנדטים לכל רשימה, אחוז החסימה, אחוז הצבעה, קלפיות שנספרו ומחשבון קואליציה. מספרי מנדטים של ערוצי הטלוויזיה, אם מוצגים, נמצאים במדור נפרד. חלוקת מנדטים בלתי רשמית, שחושבה מספירת קולות רשמית חלקית; אינה סופית ואינה חלוקת מנדטים רשמית.",
    kicker: "בחירות 2026 · 27 באוקטובר",
    intro:
      "עמוד זה מציג את ספירת הקולות של ועדת הבחירות המרכזית מרגע סגירת הקלפיות ב-22:00. חלוקת מנדטים בלתי רשמית, שחושבה מספירת קולות רשמית חלקית; אינה סופית ואינה חלוקת מנדטים רשמית. מספרי מנדטים שפרסמו ערוצי הטלוויזיה, אם מוצגים, נמצאים במדור נפרד ואינם תוצאות רשמיות.",
    breadcrumbs: ["דף הבית", "ישראל", "תוצאות הבחירות"],
  },
  en: {
    title: "Israel Election Results 2026 Live – Knesset Seats",
    h1: "Israel election results 2026: the 26th Knesset",
    description:
      "Live Israel election results 2026 from the Central Elections Committee: Knesset seats by party, the 3.25% threshold, turnout, ballot boxes counted and a coalition calculator. Television seat samples are in a separate section. Unofficial seat allocation calculated from partial official vote totals; not final and not an official seat allocation.",
    kicker: "Knesset election · 27 October 2026",
    intro:
      "This page shows Central Elections Committee vote totals from the moment polls close at 22:00 Israel time. Unofficial seat allocation calculated from partial official vote totals; not final and not an official seat allocation. Television channels' seat samples, if shown, are in a separate section and are not official results.",
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
    ["מאיפה מגיעים הנתונים?", "חלק התוצאות משתמש רק בקובץ התוצאות שמפרסמת ועדת הבחירות המרכזית לכנסת ה-26. מספרי מנדטים של ערוצי הטלוויזיה, אם מוצגים, נמצאים במדור נפרד ואינם הקובץ הזה."],
    ["האם המנדטים בעמוד הם סופיים?", "לא. חלוקת מנדטים בלתי רשמית, שחושבה מספירת קולות רשמית חלקית; אינה סופית ואינה חלוקת מנדטים רשמית. החישוב הוא לפי שיטת בדר-עופר והסכמי העודפים שדווחו, והוא ישתנה ככל שהספירה תתקדם, ובמיוחד לאחר ספירת המעטפות הכפולות. התוצאה המחייבת היא זו שתפרסם ועדת הבחירות."],
    ["מהו אחוז החסימה?", "3.25% מהקולות הכשרים. רשימה מתחת לסף זה אינה מקבלת מושבים."],
    ["כמה מנדטים צריך כדי להקים ממשלה?", "ממשלה צריכה אמון של רוב חברי הכנסת: 61 מתוך 120. מחשבון הקואליציה בעמוד רק מחבר מספרים לבחירתכם ואינו מנבא דבר."],
    ["כמה בעלי זכות בחירה יש?", "לפי ועדת הבחירות המרכזית, 7,331,981 בעלי זכות בחירה ו-12,018 קלפיות."],
    ["האם מספרי הטלוויזיה הם תוצאות רשמיות?", "לא. אחרי 22:00 יש במדור נפרד את מספרי המנדטים שפרסמו ערוצי הטלוויזיה. הם אינם תוצאות רשמיות. התוצאות הרשמיות מגיעות רק מוועדת הבחירות המרכזית. הספירה בחלק התוצאות היא של הוועדה."],
  ],
  en: [
    ["When will the Israel election results be published?", "Counting starts when polls close at 22:00 Israel time on 27 October 2026, and results update here through the night. The Central Elections Committee expects true results around midday on 29 October; official results are published in the Reshumot gazette by 4 November."],
    ["Where does the data come from?", "The results section uses only the results file published by the Central Elections Committee for the 26th Knesset. Television seat samples, if shown, are in a separate section and are not that file."],
    ["Are the seat numbers final?", "No. Unofficial seat allocation calculated from partial official vote totals; not final and not an official seat allocation. The arithmetic uses the Bader-Ofer method and the reported surplus-vote agreements, and it will change as counting goes on, especially after the double-envelope count. The binding result is the one the Committee publishes."],
    ["What is the electoral threshold?", "3.25 percent of valid votes. A list below it wins no seats."],
    ["How many seats are needed to form a government?", "A government needs the confidence of a Knesset majority: 61 of 120. The coalition calculator on this page only adds up the numbers you pick; it predicts nothing."],
    ["How many people can vote?", "According to the Central Elections Committee, 7,331,981 eligible voters and 12,018 polling stations."],
    ["Are the television numbers official?", "No. After 22:00 a separate section shows seat counts published by television channels. They are not official results. Official results come only from the Central Elections Committee. The count in the results section is the Committee's."],
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
