import Link from "next/link";
import { notFound } from "next/navigation";
import { JapanFrame } from "../../frame";
import { japanHome } from "../../../../../data/jp/paths";
import { sourceById, sourcesById } from "../../../../../data/jp/sources";
import type { Lang } from "../../../../../data/jp/types";
import { ui } from "../../../../../data/jp/ui";
import { japanMetadata } from "../../../../../data/jp/seo";

export function generateStaticParams() {
  return [{ lang: "ja" }, { lang: "en" }];
}
export const dynamicParams = false;

function asLang(value: string): Lang {
  if (value !== "ja" && value !== "en") notFound();
  return value;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${japanHome(lang)}elections/`;
  return japanMetadata({
    title: lang === "ja" ? "日本の選挙" : "Elections in Japan",
    description:
      lang === "ja"
        ? "日本のページにある国政選挙の索引です。次の投票日は公示されていません。"
        : "Index of national elections on the Japan pages. The next polling day has not been proclaimed.",
    path,
    lang,
    alternatePath: `${japanHome(lang === "ja" ? "en" : "ja")}elections/`,
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const ja = lang === "ja";
  const path = `${japanHome(lang)}elections/`;
  const office = sourceById("soumu-senkyo");
  return (
    <JapanFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.japan, path: "/jp/" },
        { name: ja ? "日本" : "Japan", path: japanHome(lang) },
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        ja
          ? "この公開が載せるのは、読んだ資料にある国政選挙です。47都道府県の次の投票日の一覧ではありません。"
          : "This release lists the national elections that appear in the sources that were read. It is not a calendar of the next election in all 47 prefectures."
      }
      officeHref={office.url}
      officeLabel="総務省"
      sources={sourcesById(["soumu-kinds", "shugiin-list", "sangiin-218", "soumu-hc-2025"])}
    >
      <ul className="space-y-4">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}kokusei-next/`}>
            {ja ? "次の国政選挙" : "Next national election"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {ja ? "投票日の公示はありません。" : "No polling day has been proclaimed."}
          </p>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}shuugiin-2026/`}>
            {ja ? "第51回衆議院議員総選挙、2026年2月8日" : "51st House of Representatives election, 8 February 2026"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">{ja ? "衆議院の総選挙一覧表。" : "House of Representatives election list."}</p>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}sangiin-2025/`}>
            {ja ? "第27回参議院議員通常選挙、2025年7月20日" : "27th House of Councillors election, 20 July 2025"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">{ja ? "参議院の国会概観と総務省の発表資料。" : "House of Councillors overview and the Ministry’s results index."}</p>
        </li>
      </ul>
    </JapanFrame>
  );
}
