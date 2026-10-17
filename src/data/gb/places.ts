export const NATIONS = [
  { slug: "england", name: "England" },
  { slug: "scotland", name: "Scotland" },
  { slug: "wales", name: "Wales" },
  { slug: "northern-ireland", name: "Northern Ireland" },
] as const;

export type NationSlug = (typeof NATIONS)[number]["slug"];

export function nationBySlug(slug: string) {
  return NATIONS.find((nation) => nation.slug === slug);
}

/** Mid-2024 UK total as printed by the ONS bulletin read on 17 October 2026. */
export const UK_POPULATION_MID_2024 = 69_281_400;

export const POPULATION_GROWTH = [
  { slug: "england", name: "England", rate: "1.2%" },
  { slug: "scotland", name: "Scotland", rate: "0.7%" },
  { slug: "wales", name: "Wales", rate: "0.6%" },
  { slug: "northern-ireland", name: "Northern Ireland", rate: "0.4%" },
] as const;

/**
 * Parties with constituencies won, as printed on electionresults.parliament.uk.
 * That page says the list does not include independents or the Speaker.
 * The seat column sums to 643, not 650. This file does not fill the difference.
 */
export const GE2024_WINNERS = [
  { party: "Labour", contested: 631, votes: 9708716, share: "33.7%", won: 411 },
  { party: "Conservative", contested: 635, votes: 6828925, share: "23.7%", won: 121 },
  { party: "Liberal Democrat", contested: 630, votes: 3519143, share: "12.2%", won: 72 },
  { party: "Scottish National Party", contested: 57, votes: 724758, share: "2.5%", won: 9 },
  { party: "Sinn Féin", contested: 14, votes: 210891, share: "0.7%", won: 7 },
  { party: "Reform UK", contested: 609, votes: 4117610, share: "14.3%", won: 5 },
  { party: "Democratic Unionist Party", contested: 16, votes: 172058, share: "0.6%", won: 5 },
  { party: "Green Party", contested: 574, votes: 1843124, share: "6.4%", won: 4 },
  { party: "Plaid Cymru", contested: 32, votes: 194811, share: "0.7%", won: 4 },
  { party: "Social Democratic & Labour Party", contested: 18, votes: 86861, share: "0.3%", won: 2 },
  { party: "Alliance", contested: 18, votes: 117191, share: "0.4%", won: 1 },
  { party: "Ulster Unionist Party", contested: 17, votes: 94779, share: "0.3%", won: 1 },
  { party: "Traditional Unionist Voice", contested: 14, votes: 48685, share: "0.2%", won: 1 },
] as const;

export const GE2024_WON_SUM = GE2024_WINNERS.reduce((sum, row) => sum + row.won, 0);

export const GE2024_ELECTORATE = 48_224_212;
export const GE2024_VALID_VOTES = 28_809_340;
export const GE2024_INVALID_VOTES = 116_253;

/**
 * Current House of Commons, counted from the Members API response read on 17 October 2026.
 * totalResults was 650. latestParty.name is copied as returned. Labour and Labour (Co-op) are separate.
 */
export const COMMONS_PARTIES = [
  { party: "Labour", seats: 361 },
  { party: "Conservative", seats: 118 },
  { party: "Liberal Democrat", seats: 71 },
  { party: "Labour (Co-op)", seats: 43 },
  { party: "Independent", seats: 11 },
  { party: "Reform UK", seats: 8 },
  { party: "Scottish National Party", seats: 8 },
  { party: "Sinn Féin", seats: 7 },
  { party: "Green Party", seats: 5 },
  { party: "Democratic Unionist Party", seats: 5 },
  { party: "Plaid Cymru", seats: 4 },
  { party: "Your Party", seats: 2 },
  { party: "Social Democratic & Labour Party", seats: 2 },
  { party: "Traditional Unionist Voice", seats: 1 },
  { party: "Alliance", seats: 1 },
  { party: "Speaker", seats: 1 },
  { party: "Restore Britain", seats: 1 },
  { party: "Ulster Unionist Party", seats: 1 },
] as const;

export const COMMONS_SEAT_SUM = COMMONS_PARTIES.reduce((sum, row) => sum + row.seats, 0);

if (GE2024_WON_SUM !== 643) {
  throw new Error(`GE2024 winner sum ${GE2024_WON_SUM}`);
}
if (COMMONS_SEAT_SUM !== 650) {
  throw new Error(`Commons seat sum ${COMMONS_SEAT_SUM}`);
}
