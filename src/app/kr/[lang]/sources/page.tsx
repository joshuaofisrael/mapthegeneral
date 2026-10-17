import { KoreaFrame } from "@/app/kr/frame";
import { krPageMetadata } from "@/data/kr/metadata";
import { asKrLang, krHome, krRoot, sectionPath } from "@/data/kr/paths";
import { SOURCES, sourceById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const path = sectionPath(lang, "sources");
  return krPageMetadata({
    title: lang === "ko" ? "출처" : "Sources",
    description:
      lang === "ko"
        ? "2026년 10월 17일에 대한민국 페이지를 위해 읽은 공식 출처. 중앙선거관리위원회, 국회, 국가법령정보센터, 행정안전부."
        : "Official sources read for the South Korea pages on 17 October 2026: National Election Commission, National Assembly, National Law Information Center, and Ministry of the Interior and Safety.",
    path,
    lang,
    alternatePath: sectionPath(lang === "ko" ? "en" : "ko", "sources"),
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const copy = ui(lang);
  const path = sectionPath(lang, "sources");
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
        { name: copy.sources, path },
      ]}
      title={ko ? "대한민국 페이지의 출처" : "Sources for the South Korea pages"}
      lede={
        ko
          ? "아래 항목은 2026년 10월 17일에 읽었습니다. 언론 보도와 백과사전은 사실의 출처로 쓰지 않습니다."
          : "Each item below was read on 17 October 2026. News reports and encyclopedias are not used as the source of a fact."
      }
      officeHref={nec.url}
      officeLabel="중앙선거관리위원회"
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          {ko
            ? "이 출처에 없는 것은 만들지 않습니다. 현직 단체장, 후보자 명부, 2028년 개표, 인구, 우편번호 검색, 시·군·구와 읍·면·동 페이지는 빈칸으로 남아 있습니다."
            : "What is not in these sources is not invented. The sitting local heads, candidate lists, the 2028 count, population, a postcode search, and pages for si, gun, gu, eup, myeon, and dong stay open."}
        </p>
      </div>
    </KoreaFrame>
  );
}
