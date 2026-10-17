import { notFound } from "next/navigation";
import type { Lang } from "@/data/spain/types";

export function asLang(value: string): Lang {
  if (value !== "es" && value !== "en") notFound();
  return value;
}
