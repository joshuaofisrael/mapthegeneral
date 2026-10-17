import Link from "next/link";
import { swapLang } from "@/lib/metadata";
import type { Lang } from "@/data/spain/types";

export function LanguageSwitch({ lang, path }: { lang: Lang; path: string }) {
  const other: Lang = lang === "es" ? "en" : "es";
  return (
    <p className="mb-4 text-sm text-ink-muted">
      <Link className={lang === "es" ? "font-semibold text-ink" : "text-navy underline"} href={swapLang(path, "es")}>
        Español
      </Link>
      <span aria-hidden="true"> · </span>
      <Link className={lang === "en" ? "font-semibold text-ink" : "text-navy underline"} href={swapLang(path, "en")}>
        English
      </Link>
      <span className="sr-only">{other}</span>
    </p>
  );
}
