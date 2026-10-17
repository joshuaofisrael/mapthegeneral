import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { JapanFrame } from "../../frame";
import { japanHome } from "../../../../../data/jp/paths";
import { sourceById, sourcesById } from "../../../../../data/jp/sources";
import type { Lang } from "../../../../../data/jp/types";
import { ui } from "../../../../../data/jp/ui";
import { japanMetadata } from "../../../../../data/jp/seo";
import { faqJsonLd } from "@/lib/format";

const FAQ = {
  ja: [
    {
      question: "次の衆議院議員総選挙はいつですか。",
      answer:
        "2026年10月17日に読んだ資料に、投票日の公示はありません。直近の総選挙は2026年2月8日です。憲法第45条の任期は4年で、解散があればそれより前に終わります。このサイトはその4年を投票日に換算しません。",
    },
    {
      question: "次の参議院議員通常選挙はいつですか。",
      answer:
        "参議院の概観は、一部の議員の任期満了を2028年7月25日としています。通常選挙はその日の前30日以内です。公示はまだ読んでいません。このサイトは、その30日の中から1日を選びません。",
    },
    {
      question: "衆議院の定数は何人ですか。",
      answer: "総務省のページは465人で、小選挙区289人、比例代表176人だと書いています。",
    },
    {
      question: "このサイトは結果を宣言しますか。",
      answer:
        "しません。第27回参議院の党派別の数字は、参議院の概観が総務省の結果調から作った表だけを転記しています。過半数や内閣については書きません。",
    },
    {
      question: "公式のサイトですか。",
      answer: "いいえ。Joshua Israel Ventures LLCの非公式の情報です。公式の選挙管理委員会で確認してください。",
    },
  ],
  en: [
    {
      question: "When is the next House of Representatives election?",
      answer:
        "No polling day was proclaimed in the sources read on 17 October 2026. The latest general election was on 8 February 2026. Article 45 sets a four-year term, which ends sooner if the House is dissolved. This site does not convert those four years into a polling day.",
    },
    {
      question: "When is the next House of Councillors election?",
      answer:
        "The House of Councillors overview gives 25 July 2028 as the term end for one group of members. An ordinary election is held within the 30 days before that day. No proclamation was read. This site does not pick one day inside those 30.",
    },
    {
      question: "How many members does the House of Representatives have?",
      answer: "The Ministry’s page says 465: 289 from single-member districts and 176 from proportional representation.",
    },
    {
      question: "Does this site call results?",
      answer:
        "No. The party figures for the 27th House of Councillors election are only the table the House overview says was compiled from the Ministry’s results report. Nothing here decides a majority or a cabinet.",
    },
    {
      question: "Is this an official website?",
      answer:
        "No. It is unofficial information from Joshua Israel Ventures LLC. Confirm it with the official election office.",
    },
  ],
} as const;

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
  const path = `${japanHome(lang)}faq/`;
  return japanMetadata({
    title: lang === "ja" ? "よくある質問" : "FAQ",
    description:
      lang === "ja"
        ? "日本の衆議院、参議院、次の選挙についての質問です。答えは読んだ公的資料に限ります。"
        : "Questions on Japan’s two houses and the next election. Answers stay inside the official sources that were read.",
    path,
    lang,
    alternatePath: `${japanHome(lang === "ja" ? "en" : "ja")}faq/`,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const ja = lang === "ja";
  const path = `${japanHome(lang)}faq/`;
  const items = FAQ[lang];
  const office = sourceById("soumu-senkyo");
  return (
    <JapanFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.japan, path: "/jp/" },
        { name: ja ? "日本" : "Japan", path: japanHome(lang) },
        { name: copy.faq, path },
      ]}
      title={copy.faq}
      officeHref={office.url}
      officeLabel="総務省"
      sources={sourcesById(["constitution", "soumu-kinds", "soumu-guide", "shugiin-list", "sangiin-218"])}
    >
      <JsonLd data={faqJsonLd(items.map((item) => ({ question: item.question, answer: item.answer })))} />
      <div className="space-y-6">
        {items.map((item) => (
          <section key={item.question}>
            <h2 className="font-serif text-xl font-semibold">{item.question}</h2>
            <p className="mt-2 leading-7">{item.answer}</p>
          </section>
        ))}
      </div>
    </JapanFrame>
  );
}
