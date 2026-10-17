/** Figures printed in the cited YSK decisions. Names are copied as printed. */

export const PRESIDENTIAL_2023 = {
  registered: 64_197_454,
  voted: 54_023_601,
  valid: 53_339_313,
  invalid: 684_288,
  turnout: "84,15",
  candidates: [
    { name: "RECEP TAYYİP ERDOĞAN", votes: 27_834_589, share: "52,18" },
    { name: "KEMAL KILIÇDAROĞLU", votes: 25_504_724, share: "47,82" },
  ],
} as const;

export const PARLIAMENT_2023_DOMESTIC = {
  registered: 60_721_745,
  voted: 53_994_049,
  valid: 52_628_182,
  invalid: 1_365_867,
  turnout: "88,92",
} as const;

export const PARLIAMENT_2023_SEATS = [
  { name: "ADALET VE KALKINMA PARTİSİ", seats: 268 },
  { name: "YENİDEN REFAH PARTİSİ", seats: 5 },
  { name: "MİLLİYETÇİ HAREKET PARTİSİ", seats: 50 },
  { name: "YEŞİLLER VE SOL GELECEK PARTİSİ", seats: 61 },
  { name: "TÜRKİYE İŞÇİ PARTİSİ", seats: 4 },
  { name: "CUMHURİYET HALK PARTİSİ", seats: 169 },
  { name: "İYİ PARTİ", seats: 43 },
  { name: "BAĞIMSIZLAR", seats: 0 },
] as const;

const seatSum = PARLIAMENT_2023_SEATS.reduce((sum, row) => sum + row.seats, 0);
if (seatSum !== 600) throw new Error(`2023 proclaimed seats sum to ${seatSum}`);

const presidentialVotes = PRESIDENTIAL_2023.candidates.reduce((sum, row) => sum + row.votes, 0);
if (presidentialVotes !== PRESIDENTIAL_2023.valid) {
  throw new Error(`Presidential votes sum to ${presidentialVotes}`);
}
