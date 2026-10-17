import { notFound } from "next/navigation";

export function gbLang(value: string): "en" {
  if (value !== "en") notFound();
  return "en";
}
