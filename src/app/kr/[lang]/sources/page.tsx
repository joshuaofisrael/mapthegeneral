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
        ? "대한민국 페이지의 공식 출처. 각 항목에 읽은 날이 있습니다. 중앙선거관리위원회, 국회, 국가법령정보센터, 행정안전부."
        : "Official sources for the South Korea pages. Each item shows the date it was read: National Election Commission, National Assembly, National Law Information Center, and Ministry of the Interior and Safety.",
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
          ? "각 항목의 읽은 날은 그 줄에 있습니다. 언론 보도와 백과사전은 사실의 출처로 쓰지 않습니다."
          : "The date on each item is the day that item was read. News reports and encyclopedias are not used as the source of a fact."
      }
      officeHref={nec.url}
      officeLabel="중앙선거관리위원회"
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          {ko
            ? "이 출처에 없는 것은 만들지 않습니다. 후보자 명부, 2028년 개표, 인구, 우편번호 검색, 읍·면·동 페이지는 빈칸으로 남아 있습니다. 시·군·구 페이지는 7-5와 당선인명부의 칸만 옮깁니다. 지역구 페이지는 선관위 이름과 국회 검색의 이름·정당·지역구만 옮깁니다."
            : "What is not in these sources is not invented. Candidate lists, the 2028 count, population, a postcode search, and pages for eup, myeon, and dong stay open. Si, gun, and gu pages copy only cells from section 7-5 and the winner roster. Constituency pages copy only the National Election Commission name and the name, party, and constituency cells from the National Assembly search."}
        </p>
        <h2>{ko ? "이용 조건과 출처 표시" : "Terms of use and attribution"}</h2>
        <p>
          {ko
            ? "법령, 공포문 등 국가기관의 고시·공고는 저작권법 제7조에 따라 저작권 보호 대상이 아닙니다. 중앙선거관리위원회, 국회, 행정안전부 등 공공기관의 공개 정보는 각 기관의 이용 조건("
            : "Statutes, promulgations and public notices of state bodies are not protected works under article 7 of the Copyright Act. Public information from the National Election Commission, the National Assembly, the Ministry of the Interior and Safety and other public bodies is used under each body’s terms of use ("}
          <a href="https://www.kogl.or.kr/info/license.do">{ko ? "공공누리" : "KOGL"}</a>
          {ko
            ? " 등)에 따라 출처와 열람일을 각 항목에 밝혀 이용합니다. 이미지와 로고는 옮기지 않습니다."
            : " or the body’s own terms), with the source and the date read given for each item. No images or logos are reproduced."}
        </p>
        <p>
          {ko
            ? "당선인명부 게시문은 공공누리 자유이용이라고 적고, 마크 그림의 대체 텍스트는 “공공누리 마크”입니다. 유형 번호는 그 대체 텍스트에 없습니다. 선거통계시스템 이용지침은 출처를 밝히면 무료로 이용할 수 있고, 당선인명부의 개인정보를 변형하지 말라고 적습니다. 열린국회정보 국회의원 인적사항 데이터의 이용허락조건 칸은 공공누리 출처표시 그림입니다. 저작권 정책은 공공누리 제1유형을 출처표시라고 설명하고, 저작권법 제24조의2를 인용합니다. 이 페이지들은 이름, 정당, 선거구 또는 단체 이름만 옮깁니다."
            : "The winner-roster post says use is free under 공공누리, and the mark image’s alt text is “공공누리 마크”. That alt text does not give a type number. The election-statistics terms say the statistics may be used free of charge if the source is named, and that personal information in a winner list must not be altered. The National Assembly member-data metadata shows a 공공누리 attribution mark. The copyright policy describes 공공누리 type 1 as attribution and quotes article 24-2 of the Copyright Act. These pages copy only name, party, and constituency or government name."}
        </p>
        <p>
          {ko
            ? "공직선거법 제108조제1항은 선거일 전 6일부터 투표마감시각까지 정당 지지도나 당선인을 예상하게 하는 여론조사의 경위와 결과를 공표하거나 인용하여 보도할 수 없다고 적습니다. 2026년 10월 18일에 읽은 재보궐선거 확정상황의 다음 실시일은 모두 2027년 4월 7일입니다. 그 날짜는 이 글을 읽은 날부터 몇 주 안이 아닙니다. 이 배포는 여론조사 결과와 당선 예상, 개표 예측을 싣지 않습니다. 2026년 6월 3일 명부는 이미 공표된 공식 당선인 명부입니다."
            : "Article 108(1) of the Public Official Election Act says that, from six days before election day until the close of voting, nobody may publish or quote a poll that shows party support or predicts who will be elected. Every future polling day on the by-election confirmation table read on 18 October 2026 is 7 April 2027. That date is not within a few weeks of the day the table was read. This release publishes no poll results, no forecast of a winner, and no projected count. The 3 June 2026 roster is the official list of people already declared elected."}
        </p>
        <p>
          {ko
            ? "개인정보 보호법 페이지의 제목은 개인정보보호법입니다. 당선인과 의원에 대해 공식 명부가 이미 공개한 공적 직위의 이름과 정당만 사용합니다. 생년월일, 주소, 전화, 이메일, 사진, 보좌진은 사용하지 않습니다. 쿠키나 추적기는 없습니다."
            : "The personal-information statute page is titled 개인정보보호법. For people elected or sitting in the Assembly, these pages use only the name and party already published in an official list for that public role. Birth date, address, telephone, email, photo, and staff are not used. There are no cookies or trackers."}
        </p>
      </div>
    </KoreaFrame>
  );
}
