import type { DeLang } from "./types";

const DE = new Intl.NumberFormat("de-DE");
const EN = new Intl.NumberFormat("en-US");

export function formatNumber(value: number, lang: DeLang): string {
  return (lang === "de" ? DE : EN).format(value);
}
