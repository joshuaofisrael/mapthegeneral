import type { KrLang } from "./types";

const EN = {
  home: "Home",
  korea: "South Korea",
  koreaOfficial: "대한민국",
  elections: "Elections",
  parties: "Parties",
  candidates: "Candidates",
  results: "Results",
  faq: "FAQ",
  sources: "Sources",
  regions: "Upper-level local governments",
  sourcesHeading: "Sources",
  gap: "Gap",
  readOn: "Read",
  parent: "Parent pages",
  alphaNearby: "Previous and next names in the Korean alphabetical index",
  office: "Office printed in section 7-5",
  kind: "Kind",
  basic: "Si, gun, and gu",
  below: "Eup, myeon, and dong",
  unofficial: "Unofficial information. Confirm with your official election office.",
  candidateGap:
    "This release does not reprint candidate lists or constituency names. The National Assembly page read on 17 October 2026 gives the size of the chamber. It does not name the 254 constituency seats one by one.",
  officeholderGap:
    "The name of the sitting head is not copied here. The 9th nationwide simultaneous local elections were held on 3 June 2026. This page does not reprint a winner list and does not say who holds the office on 17 October 2026.",
  nextLocalGap:
    "Article 34(1)3 of the Public Official Election Act sets the polling day for the next election held because a local council term or a local-government head’s term is expiring. No later instrument naming that calendar day was read on 17 October 2026, so this page does not print one.",
  populationGap:
    "Table 1-1 of the administrative-area book, as read, prints counts of administrative units. This page does not copy a population figure from a later table in that book.",
  localPagesGap:
    "Pages for si, gun, and gu, and for eup, myeon, and dong, are not in this release. National Assembly constituency pages are not in this release.",
  postcodeGap:
    "A postcode search is not part of this release. Section 7-5 prints an office postcode for each government in that table. That is not a nationwide postcode file.",
  resultsGap:
    "There is no count of the 12 April 2028 National Assembly election to copy. This page does not assign seats and does not declare a winner.",
};

const KO = {
  home: "홈",
  korea: "대한민국",
  koreaOfficial: "대한민국",
  elections: "선거",
  parties: "정당",
  candidates: "후보자",
  results: "결과",
  faq: "질문",
  sources: "출처",
  regions: "상급 지방자치단체",
  sourcesHeading: "출처",
  gap: "공백",
  readOn: "읽은 날",
  parent: "위 페이지",
  alphaNearby: "한글 가나다순에서 앞뒤 이름",
  office: "7-5에 적힌 사무소",
  kind: "종류",
  basic: "시·군·구",
  below: "읍·면·동",
  unofficial: "비공식 정보입니다. 공식 선거관리기관에서 확인하십시오.",
  candidateGap:
    "이 배포는 후보자 명부와 선거구 이름을 옮기지 않습니다. 2026년 10월 17일에 읽은 국회 페이지는 의원 정수를 적습니다. 지역구 254곳을 하나씩 적지는 않습니다.",
  officeholderGap:
    "현직 단체장의 이름은 여기에 옮기지 않습니다. 제9회 전국동시지방선거는 2026년 6월 3일에 실시되었습니다. 이 페이지는 당선인 명부를 옮기지 않으며, 2026년 10월 17일 현재 누가 재직하는지도 적지 않습니다.",
  nextLocalGap:
    "공직선거법 제34조제1항제3호는 지방의회의원과 지방자치단체의 장에 대한 임기만료 선거의 선거일을 정합니다. 2026년 10월 17일에 그 달력 날짜를 적은 이후 문서를 읽지 않았으므로, 이 페이지는 그 날짜를 적지 않습니다.",
  populationGap:
    "읽은 행정구역 책자의 1-1 총괄표는 행정구역 수를 적습니다. 이 페이지는 그 책자의 다른 표에서 인구를 옮기지 않습니다.",
  localPagesGap:
    "시·군·구 페이지와 읍·면·동 페이지는 이 배포에 없습니다. 국회의원 지역선거구 페이지도 이 배포에 없습니다.",
  postcodeGap:
    "우편번호 검색은 이 배포에 없습니다. 7-5는 그 표의 각 단체 사무소 우편번호를 적습니다. 그것은 전국 우편번호 파일이 아닙니다.",
  resultsGap:
    "2028년 4월 12일 국회의원선거의 개표 결과가 없어 옮길 내용이 없습니다. 이 페이지는 의석을 배정하지 않고 당선인을 선언하지 않습니다.",
};

export function ui(lang: KrLang) {
  return lang === "ko" ? KO : EN;
}
