/**
 * New Zealand 2026 polling average.
 * NZ_POLLS_BLACKOUT: set to true at about 10:30 London on 6 November 2026
 * (before the 11:00 freeze), and back to false after 06:00 London on 7 November.
 * When true: /nz/en/polls/ renders with no figures and noindex, the page leaves the
 * sitemap, IndexNow and search index, and every poll link and section is removed.
 * The election-law check then fails the build if any NZ page carries a poll figure.
 */
export const NZ_POLLS_BLACKOUT = false;

export const NZ_POLLS_READ_ON = "31 October 2026";
export const NZ_POLLS_WINDOW_DAYS = 30;

export type NzPoll = {
  pollster: string;
  fieldwork: string;
  fieldworkEnd: string;
  sample: number;
  href: string;
  figures: Record<string, number>;
};

export const NZ_PARTIES: { key: string; name: string }[] = [
  { key: "NAT", name: "National Party" },
  { key: "LAB", name: "Labour Party" },
  { key: "GRN", name: "Green Party" },
  { key: "ACT", name: "ACT New Zealand" },
  { key: "NZF", name: "New Zealand First Party" },
  { key: "OPP", name: "Opportunity Party" },
  { key: "TPM", name: "Te Pāti Māori" },
];

/** Latest published poll per pollster with fieldwork ending within 30 days of the read date. */
export const NZ_POLLS: NzPoll[] = [
  {
    pollster: "RNZ–Reid Research",
    fieldwork: "20–26 October 2026",
    fieldworkEnd: "2026-10-26",
    sample: 1000,
    href: "https://www.rnz.co.nz/news/politics_election-2026/2211553/rnz-reid-research-poll-national-below-disastrous-2020-result-as-opportunity-surges",
    figures: { NAT: 24.8, LAB: 30.6, GRN: 14.5, ACT: 10.1, NZF: 9.9, TPM: 1.9, OPP: 7.2 },
  },
  {
    pollster: "1News–Verian",
    fieldwork: "21–25 October 2026",
    fieldworkEnd: "2026-10-25",
    sample: 1000,
    href: "https://www.1news.co.nz/2026/10/27/poll-coalition-has-path-to-power-but-labour-steady-after-gangs-row/",
    figures: { NAT: 28.9, LAB: 27.3, GRN: 14.8, ACT: 12.4, NZF: 10, TPM: 0.1, OPP: 6.3 },
  },
  {
    pollster: "The Post/Freshwater Strategy",
    fieldwork: "9–19 October 2026",
    fieldworkEnd: "2026-10-19",
    sample: 1458,
    href: "https://www.thepost.co.nz/politics/361101225/postfreshwater-strategy-poll-fraction-point-could-decide-who-governs",
    figures: { NAT: 27.6, LAB: 28.7, GRN: 14.3, ACT: 9, NZF: 11.8, TPM: 2, OPP: 5.4 },
  },
  {
    pollster: "Taxpayers’ Union–Curia",
    fieldwork: "1–5 October 2026",
    fieldworkEnd: "2026-10-05",
    sample: 1000,
    href: "https://www.taxpayers.org.nz/oct2026_nztucurpolljjhhfas",
    figures: { NAT: 28.5, LAB: 28.2, GRN: 13.3, ACT: 9.2, NZF: 12, TPM: 1.4, OPP: 4.8 },
  },
];

export const NZ_POLLS_LIST =
  "https://en.wikipedia.org/wiki/Opinion_polling_for_the_2026_New_Zealand_general_election";

export function nzAverage(key: string): number {
  const vals = NZ_POLLS.map((p) => p.figures[key]);
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}
