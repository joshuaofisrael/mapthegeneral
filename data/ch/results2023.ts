/** Mandate table as printed on the BFS page “Ergebnisse Parteien im Überblick: Schweiz, Nationalrat 2023”. */
export const NATIONAL_COUNCIL_2023 = [
  { party: "FDP", mandates: 28, mandateChange: "-1", voteShare: "14,25" },
  { party: "Mitte", mandates: 29, mandateChange: "+29", voteShare: "14,06" },
  { party: "SP", mandates: 41, mandateChange: "+2", voteShare: "18,27" },
  { party: "SVP", mandates: 62, mandateChange: "+9", voteShare: "27,93" },
  { party: "EVP", mandates: 2, mandateChange: "-1", voteShare: "1,95" },
  { party: "CSP", mandates: 0, mandateChange: "-", voteShare: "0,09" },
  { party: "GLP", mandates: 10, mandateChange: "-6", voteShare: "7,55" },
  { party: "PdA/Sol.", mandates: 0, mandateChange: "-2", voteShare: "0,72" },
  { party: "FGA", mandates: 0, mandateChange: "-", voteShare: "0,17" },
  { party: "GRÜNE", mandates: 23, mandateChange: "-5", voteShare: "9,78" },
  { party: "SD", mandates: 0, mandateChange: "-", voteShare: "0,08" },
  { party: "EDU", mandates: 2, mandateChange: "+1", voteShare: "1,23" },
  { party: "Lega", mandates: 1, mandateChange: "-", voteShare: "0,55" },
  { party: "MCR", mandates: 2, mandateChange: "+2", voteShare: "0,51" },
  { party: "Übrige", mandates: 0, mandateChange: "-", voteShare: "2,84" },
] as const;

export const NATIONAL_COUNCIL_2023_MANDATES = NATIONAL_COUNCIL_2023.reduce((sum, row) => sum + row.mandates, 0);

if (NATIONAL_COUNCIL_2023_MANDATES !== 200) {
  throw new Error(`2023 mandate column sums to ${NATIONAL_COUNCIL_2023_MANDATES}`);
}
