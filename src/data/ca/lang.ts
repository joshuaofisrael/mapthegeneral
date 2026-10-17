import { notFound } from "next/navigation";
import type { CaLang } from "./types";

export const CA_LANGS: CaLang[] = ["en", "fr"];

export function asCaLang(value: string): CaLang {
  if (value !== "en" && value !== "fr") notFound();
  return value;
}
