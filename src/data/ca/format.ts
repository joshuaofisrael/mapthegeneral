import type { CaLang } from "./types";

const EN = new Intl.NumberFormat("en-CA");
const FR = new Intl.NumberFormat("fr-CA");

export function formatNumber(value: number, lang: CaLang): string {
  return (lang === "fr" ? FR : EN).format(value);
}
