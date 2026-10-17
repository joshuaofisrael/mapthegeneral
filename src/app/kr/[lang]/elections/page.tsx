import Link from "@/components/AnchorLink";
import { KoreaFrame } from "@/app/kr/frame";
import { krPageMetadata } from "@/data/kr/metadata";
import { asKrLang, electionsPath, krHome, krRoot, naElectionPath } from "@/data/kr/paths";
import { sourceById, sourcesById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const path = electionsPath(lang);
  return krPageMetadata({
    title: lang === "ko" ? "대한민국의 선거" : "Elections in South Korea",
    description:
      lang === "ko"
        ? "이 배포가 적는 다음 임기만료 국회의원선거는 2028년 4월 12일입니다."
        : "The next term-expiry National Assembly election printed in this release is 12 April 2028.",
    path,
    lang,
    alternatePath: electionsPath(lang === "ko" ? "en" : "ko"),
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const copy = ui(lang);
  const path = electionsPath(lang);
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
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        ko
          ? "이 배포는 2028년 4월 12일 임기만료 국회의원선거를 적습니다. 그 이후의 모든 지방선거 달력은 아닙니다."
          : "This release publishes the term-expiry National Assembly election of 12 April 2028. It is not a calendar of every later local election."
      }
      officeHref={nec.url}
      officeLabel="중앙선거관리위원회"
      sources={sourcesById(["election-act-34", "assembly-term-22", "nec-home"])}
    >
      <ul className="space-y-3">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={naElectionPath(lang)}>
            {ko ? "국회의원선거, 2028년 4월 12일" : "National Assembly, 12 April 2028"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {ko ? "공직선거법 제34조와 국회회의록의 제22대 임기." : "Article 34 of the Public Official Election Act and the 22nd term in the National Assembly minutes index."}
          </p>
        </li>
      </ul>
    </KoreaFrame>
  );
}
