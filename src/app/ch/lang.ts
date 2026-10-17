import { notFound } from "next/navigation";
import { CH_LANGS, type ChLang } from "../../../data/ch/types";

export function asChLang(value: string): ChLang {
  if (!CH_LANGS.includes(value as ChLang)) notFound();
  return value as ChLang;
}
