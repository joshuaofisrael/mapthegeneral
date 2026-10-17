import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { JapanFrame } from "../../frame";
import { japanHome, prefecturePath } from "../../../../../data/jp/paths";
import { PREFECTURES } from "../../../../../data/jp/places";
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
  const path = `${japanHome(lang)}candidates/`;
  return japanMetadata({
    title: lang === "ja" ? "候補者" : "Candidates",
    description:
      lang === "ja"
        ? "候補者の氏名は載せていません。次の国政選挙の公示はありません。非公式の情報です。"
        : "No candidate names are listed. The next national election has not been proclaimed. Unofficial information.",
    path,
    lang,
    alternatePath: `${japanHome(lang === "ja" ? "en" : "ja")}candidates/`,
  });
}

export default async function CandidatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const ja = lang === "ja";
  const path = `${japanHome(lang)}candidates/`;
  const office = sourceById("soumu-senkyo");
  return (
    <JapanFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.japan, path: "/jp/" },
        { name: ja ? "日本" : "Japan", path: japanHome(lang) },
        { name: copy.candidates, path },
      ]}
      title={ja ? "候補者" : "Candidates"}
      lede={
        ja
          ? "現職の氏名を、次の選挙の候補者としては書きません。"
          : "Sitting members are not listed here as candidates for an election that has not been called."
      }
      officeHref={office.url}
      officeLabel="総務省"
      sources={sourcesById(["soumu-guide", "soumu-kinds", "shugiin-list", "sangiin-218"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <div className="prose-legal">
        <p>
          {ja
            ? "総務省の案内は、衆議院議員の被選挙権を満25歳以上、参議院議員を満30歳以上とし、いずれも住所要件はない、としています。都道府県知事は満30歳以上、都道府県議会議員は満25歳以上で、議員には都道府県内の市区町村に引き続き3か月以上住んでいること、とあります。このページは立候補の手続を説明しません。"
            : "The Ministry’s guide says a candidate for the House of Representatives must be at least 25, and for the House of Councillors at least 30, with no residence requirement for either. A prefectural governor must be at least 30. A prefectural assembly member must be at least 25 and have lived for at least three months in a municipality of that prefecture. This page does not explain how to file."}
        </p>
      </div>
      <section>
        <h2 className="font-serif text-2xl font-semibold">{ja ? "都道府県" : "Prefectures"}</h2>
        <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
          {PREFECTURES.map((prefecture) => (
            <li key={prefecture.slug} className="mb-1">
              <Link className="text-navy underline" href={prefecturePath(lang, prefecture.slug)}>
                {prefecture.officialName}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </JapanFrame>
  );
}
