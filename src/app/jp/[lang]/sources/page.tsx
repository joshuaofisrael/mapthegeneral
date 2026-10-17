import { notFound } from "next/navigation";
import { JapanFrame } from "../../frame";
import { japanHome } from "../../../../../data/jp/paths";
import { SOURCES, sourceById } from "../../../../../data/jp/sources";
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
  const path = `${japanHome(lang)}sources/`;
  return japanMetadata({
    title: lang === "ja" ? "出典" : "Sources",
    description:
      lang === "ja"
        ? "日本のページのために2026年10月17日に読んだ公的資料です。"
        : "Official sources read for the Japan pages on 17 October 2026.",
    path,
    lang,
    alternatePath: `${japanHome(lang === "ja" ? "en" : "ja")}sources/`,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const ja = lang === "ja";
  const path = `${japanHome(lang)}sources/`;
  const office = sourceById("soumu-senkyo");
  return (
    <JapanFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.japan, path: "/jp/" },
        { name: ja ? "日本" : "Japan", path: japanHome(lang) },
        { name: copy.sources, path },
      ]}
      title={ja ? "日本のページの出典" : "Sources for the Japan pages"}
      lede={
        ja
          ? "各資料は2026年10月17日に読みました。報道とWikipediaは、事実の出典にしていません。"
          : "Each item was read on 17 October 2026. News reports and Wikipedia are not used as the source of a fact."
      }
      officeHref={office.url}
      officeLabel="総務省"
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          {ja
            ? "資料にないことは書きません。この公開で開いたままの未掲載は、衆議院議員の任期が終わる日、次の国政選挙の投票日、第51回の党派別議席、知事の氏名、市区町村、小選挙区、郵便番号です。人口は令和8年5月29日の人口速報です。令和8年9月29日の人口等基本集計は、結果ページの公表時期としては読みましたが、都道府県の数字の出典にはしていません。"
            : "What is not in these sources is not invented. The gaps left open are the term-end date of the current House of Representatives, the next national polling day, party seats for the 51st general election, governors’ names, municipalities, single-member districts, and postcodes. Population is the preliminary count of 29 May 2026. The basic tabulation of 29 September 2026 was read as a release date on the results page and was not used for the prefecture figures."}
        </p>
      </div>
    </JapanFrame>
  );
}
