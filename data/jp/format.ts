import type { Lang } from "./types";

const JA = new Intl.NumberFormat("ja-JP");
const EN = new Intl.NumberFormat("en-GB");

export function formatNumber(value: number, lang: Lang): string {
  return (lang === "ja" ? JA : EN).format(value);
}

export function formatIsoDate(iso: string, lang: Lang): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat(lang === "ja" ? "ja-JP" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
