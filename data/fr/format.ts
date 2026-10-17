import type { Lang } from "./types";

const FR = new Intl.NumberFormat("fr-FR");
const EN = new Intl.NumberFormat("en-US");

export function formatNumber(value: number, lang: Lang): string {
  return (lang === "fr" ? FR : EN).format(value);
}

export function formatOptional(value: number | null, lang: Lang): string {
  if (value == null) return "—";
  return formatNumber(value, lang);
}
