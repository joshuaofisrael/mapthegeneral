import type { ItLang } from "./types";

const IT = new Intl.NumberFormat("it-IT");
const EN = new Intl.NumberFormat("en-GB");

export function formatNumber(value: number, lang: ItLang): string {
  return (lang === "it" ? IT : EN).format(value);
}

export function formatIsoDate(iso: string, lang: ItLang): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
