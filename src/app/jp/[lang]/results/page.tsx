import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { JapanFrame } from "../../frame";
import { japanHome } from "../../../../../data/jp/paths";
import { sourceById, sourcesById } from "../../../../../data/jp/sources";
import type { Lang } from "../../../../../data/jp/types";
import { ui } from "../../../../../data/jp/ui";
import { japanMetadata } from "../../../../../data/jp/seo";

/** Figures printed in the House of Councillors overview, which cites the Ministry’s results report. The parenthetical is the Tokyo by-election held with the ordinary election and is outside the 124. */
const HC_ROWS: { name: string; seats: string }[] = [
  { name: "自由民主党", seats: "39" },
  { name: "立憲民主党", seats: "21（1）" },
  { name: "国民民主党", seats: "17" },
  { name: "参政党", seats: "14" },
  { name: "公明党", seats: "8" },
  { name: "日本維新の会", seats: "7" },
  { name: "日本共産党", seats: "3" },
  { name: "れいわ新選組", seats: "3" },
  { name: "日本保守党", seats: "2" },
  { name: "社会民主党", seats: "1" },
  { name: "チームみらい", seats: "1" },
  { name: "無所属", seats: "8" },
  { name: "改選数計", seats: "124（1）" },
];

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
  const path = `${japanHome(lang)}results/`;
  return japanMetadata({
    title: lang === "ja" ? "結果" : "Results",
    description:
      lang === "ja"
        ? "第27回参議院の党派別議席は概観の表です。当選の宣言はしません。非公式の情報です。"
        : "House of Councillors party seats are the overview’s table. This page does not declare a winner. Unofficial information.",
    path,
    lang,
    alternatePath: `${japanHome(lang === "ja" ? "en" : "ja")}results/`,
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const ja = lang === "ja";
  const path = `${japanHome(lang)}results/`;
  const office = sourceById("soumu-senkyo");
  return (
    <JapanFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.japan, path: "/jp/" },
        { name: ja ? "日本" : "Japan", path: japanHome(lang) },
        { name: copy.results, path },
      ]}
      eyebrow={ja ? "宣言はしない" : "No call"}
      title={ja ? "結果" : "Results"}
      lede={
        ja
          ? "数字は、読んだ公的資料の表だけです。過半数も、内閣が続くかどうかも、書きません。"
          : "Figures are only the table in the official document that was read. Nothing here decides a majority or whether a cabinet continues."
      }
      officeHref={office.url}
      officeLabel="総務省"
      sources={sourcesById(["sangiin-218", "soumu-hc-2025", "shugiin-list", "soumu-senkyo"])}
    >
      <GapNote label={copy.gap} text={copy.resultsGap} />
      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {ja ? "第27回参議院議員通常選挙" : "27th House of Councillors election"}
        </h2>
        <p className="mt-2 text-sm leading-6">
          {ja
            ? "表の党派名と数字は、参議院の国会概観が「総務省自治行政局選挙部『第27回参議院議員通常選挙結果調』より作成」としている表です。括弧は東京都選挙区の補欠選挙で、概観は外数だと書いています。概観が付けている増減や過半数の文は転記しません。"
            : "The party names and figures are the table the House of Councillors overview says was compiled from the Ministry’s results report for the 27th election. The parenthetical is the Tokyo by-election, which the overview says is outside the main total. The overview’s sentences about gains and about a majority are not copied."}
        </p>
        <table className="fact-table mt-3">
          <thead>
            <tr>
              <th scope="col">{ja ? "概観の党派名" : "Name in the overview"}</th>
              <th scope="col">{ja ? "獲得議席数" : "Seats in the table"}</th>
            </tr>
          </thead>
          <tbody>
            {HC_ROWS.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{row.seats}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-sm text-ink-muted">
          {ja
            ? "概観は、比例代表と選挙区の投票率をそれぞれ58.51％と書いています。"
            : "The overview prints a turnout of 58.51% for proportional representation and 58.51% for the districts."}
        </p>
      </section>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">
          {ja ? "第51回衆議院議員総選挙" : "51st House of Representatives election"}
        </h2>
        <GapNote
          label={copy.gap}
          text={
            ja
              ? "2026年10月17日に読んだ衆議院の総選挙一覧表に、第51回の党派別議席の表はありません。このページは、その表を他のサイトから作りません。"
              : "The House election list read on 17 October 2026 has no party seat table for the 51st election. This page does not build one from another site."
          }
        />
        <p className="text-sm">
          <Link className="text-navy underline" href={`${japanHome(lang)}elections/shuugiin-2026/`}>
            {ja ? "期日のページ" : "Page for the date"}
          </Link>
        </p>
      </section>
    </JapanFrame>
  );
}
