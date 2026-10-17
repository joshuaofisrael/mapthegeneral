import { notFound } from "next/navigation";
import type { TrLang } from "./types";

export function asTrLang(value: string): TrLang {
  if (value !== "tr" && value !== "en") notFound();
  return value;
}
