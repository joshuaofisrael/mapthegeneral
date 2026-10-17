import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
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
  const path = `${japanHome(lang)}parties/`;
  return japanMetadata({
    title: lang === "ja" ? "政党" : "Parties",
    description:
      lang === "ja"
        ? "政党の一覧は、この公開では転記しません。非公式の情報です。"
        : "This release does not reprint a party register. Unofficial information.",
    path,
    lang,
    alternatePath: `${japanHome(lang === "ja" ? "en" : "ja")}parties/`,
  });
}

export default async function PartiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const ja = lang === "ja";
  const path = `${japanHome(lang)}parties/`;
  const office = sourceById("soumu-senkyo");
  return (
    <JapanFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.japan, path: "/jp/" },
        { name: ja ? "日本" : "Japan", path: japanHome(lang) },
        { name: copy.parties, path },
      ]}
      title={ja ? "政党" : "Parties"}
      lede={
        ja
          ? "2026年10月17日に読んだ資料は、届出政党の全名簿ではありません。このページは名簿を作りません。"
          : "The sources read on 17 October 2026 were not a full register of political parties. This page does not build one."
      }
      officeHref={office.url}
      officeLabel="総務省"
      sources={sourcesById(["soumu-senkyo", "soumu-kinds", "sangiin-218"])}
    >
      <GapNote
        label={copy.gap}
        text={
          ja
            ? "2026年10月17日に読んだ資料から、現在の届出政党の全名簿は取っていません。参議院の概観にある第27回の党派別議席は、結果のページにだけ転記します。それはその選挙の表であり、現在の政党名簿ではありません。"
            : "A full current register of political parties was not taken from the sources read on 17 October 2026. The party seat lines in the House of Councillors overview of the 27th election are copied only on the results page. That is a table for that election, not the current party register."
        }
      />
    </JapanFrame>
  );
}
