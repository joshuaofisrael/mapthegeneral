import type { TrLang } from "./types";

export function formatNumber(value: number, lang: TrLang): string {
  return new Intl.NumberFormat(lang === "tr" ? "tr-TR" : "en-US").format(value);
}
