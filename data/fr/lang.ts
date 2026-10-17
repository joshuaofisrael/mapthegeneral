import { notFound } from "next/navigation";
import type { Lang } from "./types";

export function asLang(value: string): Lang {
  if (value !== "fr" && value !== "en") notFound();
  return value;
}
