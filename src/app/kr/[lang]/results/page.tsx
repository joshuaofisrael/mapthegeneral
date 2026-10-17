import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { KoreaFrame } from "@/app/kr/frame";
import { krPageMetadata } from "@/data/kr/metadata";
import { asKrLang, krHome, krRoot, naElectionPath, sectionPath } from "@/data/kr/paths";
import { sourceById, sourcesById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const path = sectionPath(lang, "results");
  return krPageMetadata({
    title: lang === "ko" ? "결과" : "Results",
    description:
      lang === "ko"
        ? "2028년 4월 12일 국회의원선거의 결과 페이지. 개표가 없어 옮길 내용이 없고, 당선을 선언하지 않습니다."
        : "Results page for the National Assembly election of 12 April 2028. There is no count to copy, and this page does not declare a winner.",
    path,
    lang,
    alternatePath: sectionPath(lang === "ko" ? "en" : "ko", "results"),
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const copy = ui(lang);
  const path = sectionPath(lang, "results");
  const ko = lang === "ko";
  const nec = sourceById("nec-home");
  return (
    <KoreaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.korea, path: krRoot() },
        { name: ko ? "대한민국" : "South Korea", path: krHome(lang) },
        { name: copy.results, path },
      ]}
      eyebrow={ko ? "개표 없음" : "No count"}
      title={ko ? "2028년 4월 12일 결과" : "Results of 12 April 2028"}
      lede={
        ko
          ? "이 페이지는 공식 개표를 기다립니다. 의석을 배정하지 않고 다수당을 선언하지 않습니다."
          : "This page is waiting for the official count. It does not assign seats and it does not declare a majority."
      }
      officeHref={nec.url}
      officeLabel="중앙선거관리위원회"
      sources={sourcesById(["nec-home", "election-act-34", "assembly-term-22"])}
    >
      <GapNote label={copy.gap} text={copy.resultsGap} />
      <div className="prose-legal">
        <p>
          {ko
            ? "이미 치러진 선거의 표도 여기에 다시 적지 않습니다. 선거통계시스템이 제21대 대통령선거를 2025년 6월 3일로, 제9회 전국동시지방선거 일정을 2026년 6월 3일로 표시하는 것은 국가 페이지에 있습니다. 득표수는 옮기지 않습니다."
            : "Counts of elections already held are not reprinted here either. The national page records that the statistics system heads the 21st presidential election as 3 June 2025 and that the 9th local-election schedule prints 3 June 2026. Vote totals are not copied."}
        </p>
      </div>
      <p className="text-sm">
        <a className="text-navy underline" href={nec.url} rel="noopener noreferrer">
          중앙선거관리위원회
        </a>
        {" · "}
        <Link className="text-navy underline" href={naElectionPath(lang)}>
          {ko ? "2028년 4월 12일" : "12 April 2028"}
        </Link>
      </p>
    </KoreaFrame>
  );
}
