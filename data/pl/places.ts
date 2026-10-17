import type { Voivodeship } from "./types";

/**
 * Seat totals are the sums of „Liczba posłów wybieranych w okręgu wyborczym wynosi”
 * in Załącznik nr 1 to the consolidated electoral code (Dz. U. 2026 poz. 1261),
 * grouped by the voivodeship named in each constituency. The 41 figures add up to 460.
 */
export const VOIVODESHIPS: Voivodeship[] = [
  { slug: "dolnoslaskie", name: "województwo dolnośląskie", sejmSeats: 34, sejmConstituencies: 3 },
  { slug: "kujawsko-pomorskie", name: "województwo kujawsko-pomorskie", sejmSeats: 25, sejmConstituencies: 2 },
  { slug: "lubelskie", name: "województwo lubelskie", sejmSeats: 27, sejmConstituencies: 2 },
  { slug: "lubuskie", name: "województwo lubuskie", sejmSeats: 12, sejmConstituencies: 1 },
  { slug: "lodzkie", name: "województwo łódzkie", sejmSeats: 31, sejmConstituencies: 3 },
  { slug: "malopolskie", name: "województwo małopolskie", sejmSeats: 41, sejmConstituencies: 4 },
  { slug: "mazowieckie", name: "województwo mazowieckie", sejmSeats: 63, sejmConstituencies: 5 },
  { slug: "opolskie", name: "województwo opolskie", sejmSeats: 12, sejmConstituencies: 1 },
  { slug: "podkarpackie", name: "województwo podkarpackie", sejmSeats: 26, sejmConstituencies: 2 },
  { slug: "podlaskie", name: "województwo podlaskie", sejmSeats: 14, sejmConstituencies: 1 },
  { slug: "pomorskie", name: "województwo pomorskie", sejmSeats: 26, sejmConstituencies: 2 },
  { slug: "slaskie", name: "województwo śląskie", sejmSeats: 55, sejmConstituencies: 6 },
  { slug: "swietokrzyskie", name: "województwo świętokrzyskie", sejmSeats: 16, sejmConstituencies: 1 },
  { slug: "warminsko-mazurskie", name: "województwo warmińsko-mazurskie", sejmSeats: 18, sejmConstituencies: 2 },
  { slug: "wielkopolskie", name: "województwo wielkopolskie", sejmSeats: 40, sejmConstituencies: 4 },
  { slug: "zachodniopomorskie", name: "województwo zachodniopomorskie", sejmSeats: 20, sejmConstituencies: 2 },
];

const seatTotal = VOIVODESHIPS.reduce((sum, item) => sum + item.sejmSeats, 0);
const constituencyTotal = VOIVODESHIPS.reduce((sum, item) => sum + item.sejmConstituencies, 0);
if (VOIVODESHIPS.length !== 16 || seatTotal !== 460 || constituencyTotal !== 41) {
  throw new Error(`Poland voivodeship check failed: ${VOIVODESHIPS.length} units, ${seatTotal} seats, ${constituencyTotal} constituencies`);
}

const bySlug = new Map(VOIVODESHIPS.map((item) => [item.slug, item]));

export const SEJM_SEAT_TOTAL = seatTotal;
export const SEJM_CONSTITUENCY_TOTAL = constituencyTotal;

export function voivodeshipBySlug(slug: string): Voivodeship | undefined {
  return bySlug.get(slug);
}

export function alphaVoivodeships(): Voivodeship[] {
  return [...VOIVODESHIPS].sort((a, b) => a.name.localeCompare(b.name, "pl"));
}

export function alphaNeighbors(slug: string): { prev?: Voivodeship; next?: Voivodeship } {
  const list = alphaVoivodeships();
  const index = list.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}
