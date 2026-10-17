import { JsonLd } from "@/components/JsonLd";
import { KoreaFrame } from "@/app/kr/frame";
import { krPageMetadata } from "@/data/kr/metadata";
import { asKrLang, krHome, krRoot, sectionPath } from "@/data/kr/paths";
import { sourceById, sourcesById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";
import { faqJsonLd } from "@/lib/format";

const FAQ = {
  ko: [
    {
      question: "다음 국회의원선거는 언제입니까?",
      answer:
        "국회회의록은 제22대 임기를 2024.05.30.부터 2028.05.29.까지로 적습니다. 공직선거법 제34조제1항제2호를 그 만료일에 적용하면 선거일은 2028년 4월 12일입니다. 제2항의 공휴일 연기는 2028년 공휴일표를 읽지 않아 적용하지 않았습니다.",
    },
    {
      question: "국회의원 정수는 몇 명입니까?",
      answer: "국회 페이지는 300인으로 적고, 지역구 254인과 비례대표 46인이라고 적습니다.",
    },
    {
      question: "최근 전국동시지방선거는 언제였습니까?",
      answer: "중앙선거관리위원회 일정표는 제9회 전국동시지방선거 실시일을 2026-06-03으로 적습니다.",
    },
    {
      question: "이 웹사이트가 당선을 선언합니까?",
      answer: "아닙니다. 2028년 4월 12일 결과는 아직 없고, 이 사이트는 선거를 선언하지 않습니다.",
    },
    {
      question: "공식 웹사이트입니까?",
      answer: "아닙니다. Joshua Israel Ventures LLC의 비공식 정보입니다. 중앙선거관리위원회에서 확인하십시오.",
    },
  ],
  en: [
    {
      question: "When is the next National Assembly election?",
      answer:
        "The National Assembly minutes index prints the 22nd term as 2024.05.30. to 2028.05.29. Applying article 34(1)2 of the Public Official Election Act to that expiry date gives 12 April 2028. The public-holiday postponement in paragraph 2 was not applied, because no 2028 holiday table was read.",
    },
    {
      question: "How many National Assembly members are there?",
      answer: "The National Assembly page says 300: 254 from constituencies and 46 proportional representatives.",
    },
    {
      question: "When was the latest nationwide local election?",
      answer: "The National Election Commission schedule prints the 9th nationwide simultaneous local elections as 2026-06-03.",
    },
    {
      question: "Does this website declare winners?",
      answer: "No. There are no results yet for 12 April 2028, and this site does not call elections.",
    },
    {
      question: "Is this an official website?",
      answer: "No. It is unofficial information from Joshua Israel Ventures LLC. Confirm it with the National Election Commission.",
    },
  ],
};

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const path = sectionPath(lang, "faq");
  return krPageMetadata({
    title: lang === "ko" ? "질문" : "FAQ",
    description:
      lang === "ko"
        ? "2028년 4월 12일 국회의원선거에 대한 짧은 답. 각 답은 출처 페이지의 문서에 묶여 있습니다."
        : "Short answers about the National Assembly election of 12 April 2028, each tied to a document on the sources page.",
    path,
    lang,
    alternatePath: sectionPath(lang === "ko" ? "en" : "ko", "faq"),
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const copy = ui(lang);
  const path = sectionPath(lang, "faq");
  const ko = lang === "ko";
  const items = FAQ[lang];
  const nec = sourceById("nec-home");
  return (
    <KoreaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.korea, path: krRoot() },
        { name: ko ? "대한민국" : "South Korea", path: krHome(lang) },
        { name: copy.faq, path },
      ]}
      title={copy.faq}
      lede={ko ? "짧은 답입니다. 각각 출처 페이지의 문서에 묶여 있습니다." : "Short answers, each tied to a document on the sources page."}
      officeHref={nec.url}
      officeLabel="중앙선거관리위원회"
      sources={sourcesById(["election-act-34", "assembly-term-22", "assembly-members", "nec-local-2026"])}
    >
      <JsonLd data={faqJsonLd(items)} />
      <dl className="space-y-6">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-serif text-xl font-semibold">{item.question}</dt>
            <dd className="mt-2 text-sm leading-6 text-ink-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </KoreaFrame>
  );
}
