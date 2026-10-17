import Link from "@/components/AnchorLink";
import { CH_LANGS_LABEL } from "../../../data/ch/ui";
import { CH_LANGS, type ChLang } from "../../../data/ch/types";

export function ChLanguageSwitch({ lang, path }: { lang: ChLang; path: string }) {
  return (
    <p className="mb-4 text-sm text-ink-muted">
      {CH_LANGS.map((code, index) => (
        <span key={code}>
          {index > 0 && <span aria-hidden="true"> · </span>}
          <Link
            className={lang === code ? "font-semibold text-ink" : "text-navy underline"}
            href={path.replace(/^\/ch\/(de|fr|it|en)\//, `/ch/${code}/`)}
          >
            {CH_LANGS_LABEL[code]}
          </Link>
        </span>
      ))}
    </p>
  );
}
