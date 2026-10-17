import type { TrLang } from "./types";

const EN = {
  home: "Home",
  turkey: "Turkey",
  elections: "Elections",
  parties: "Parties",
  candidates: "Candidates",
  results: "Results",
  faq: "FAQ",
  sources: "Sources",
  provinces: "Provinces",
  population: "Population",
  deputies: "Deputies",
  sourcesHeading: "Sources",
  gap: "Gap",
  readOn: "Read on",
  parent: "Parent pages",
  alphaNearby: "Previous and next names in the Turkish alphabetical index",
  unofficial: "Unofficial information. Confirm with your official election office.",
  postcodeGap:
    "A postcode search is not wired up. This release did not add an official open postcode-to-province file. Five-digit queries are not matched to a province.",
  mayorGap:
    "The mayor’s name is not copied on this page. The Supreme Election Council proclaimed the 31 March 2024 local-election results in decision 2024/2367. Liste 2 covers 30 metropolitan mayoralties and Liste 3 covers 1,356 municipal mayoralties, with the cancelled contests named on Liste 3 left out of that total. This release does not reprint the name of the person elected in each place.",
  governorGap:
    "The governor’s name is not copied on this page. Article 126 of the Constitution says provincial administration is based on deconcentration. The Interior Ministry publishes the current governors.",
  candidateGap:
    "Proclaimed candidacies for the next presidential and parliamentary elections are not on this page. No Supreme Election Council list of 2028 candidates was read on 17 October 2026.",
  nextDayGap:
    "No Supreme Election Council calendar read on 17 October 2026 prints the polling day of the next ordinary presidential and parliamentary elections. Article 3 of Law 6271 says they are held every five years on the same day, and that polling day is the last Sunday before the terms expire, counted from the previous joint election. This page does not calculate that Sunday.",
  localNextGap:
    "Law 2972 article 8 says ordinary local elections are held every five years, that 1 January of the fifth year is the start, and that polling day is the last Sunday of March of that year. Decision 2023/1565 applied that rule to 31 March 2024. No later decision setting the next ordinary local polling day was read on 17 October 2026, so this page does not print one.",
  lowerTierGap:
    "District, municipality, town, village, and neighbourhood pages are not in this release. TÜİK’s 2025 statistical yearbook counts 81 provinces, 922 districts, 404 towns, and 18,249 villages, and its note says province centres (central districts) are not included in the district count.",
};

const TR = {
  home: "Başlangıç",
  turkey: "Türkiye",
  elections: "Seçimler",
  parties: "Partiler",
  candidates: "Adaylar",
  results: "Sonuçlar",
  faq: "Sık sorulanlar",
  sources: "Kaynaklar",
  provinces: "İller",
  population: "Nüfus",
  deputies: "Milletvekili",
  sourcesHeading: "Kaynaklar",
  gap: "Eksik",
  readOn: "Okuma",
  parent: "Üst sayfalar",
  alphaNearby: "Türkçe alfabetik dizinde bir önceki ve bir sonraki ad",
  unofficial: "Resmî olmayan bilgi. Resmî seçim kurulunuzdan teyit edin.",
  postcodeGap:
    "Posta kodu araması bağlı değil. Bu sürüm, resmî ve açık bir posta kodu–il dosyası eklemedi. Beş haneli bir sorgu bir ile eşlenmez.",
  mayorGap:
    "Belediye başkanının adı bu sayfada yok. Yüksek Seçim Kurulu, 31 Mart 2024 mahalli idareler seçiminin sonuçlarını 2024/2367 sayılı kararla ilan etti. Liste 2, 30 büyükşehir belediye başkanlığını; Liste 3, 1.356 belediye başkanlığını kapsar. Liste 3’te adı yazılan iptal edilen yarışlar bu toplama girmez. Bu sürüm, her yerde seçilen kişinin adını aktarmaz.",
  governorGap:
    "Valinin adı bu sayfada yok. Anayasanın 126. maddesi, il idaresinin yetki genişliğine dayandığını söyler. Güncel valileri İçişleri Bakanlığı yayımlar.",
  candidateGap:
    "Bir sonraki Cumhurbaşkanı ve milletvekili seçiminin ilan edilmiş adayları bu sayfada yok. 17 Ekim 2026’da okunan bir Yüksek Seçim Kurulu listesi 2028 adaylarını basmıyor.",
  nextDayGap:
    "17 Ekim 2026’da okunan bir Yüksek Seçim Kurulu takvimi, bir sonraki olağan Cumhurbaşkanı ve milletvekili seçiminin oy gününü basmıyor. 6271 sayılı Kanunun 3. maddesi, seçimlerin beş yılda bir aynı gün yapıldığını ve oy gününün, birlikte yapılan önceki seçim esas alınarak, görev sürelerinin dolmasından önceki son Pazar günü olduğunu söyler. Bu sayfa o Pazarı hesaplamaz.",
  localNextGap:
    "2972 sayılı Kanunun 8. maddesi, mahalli idareler seçimlerinin beş yılda bir yapıldığını, her seçim döneminin beşinci yılındaki 1 Ocak gününün başlangıç olduğunu ve aynı yılın Mart ayının son Pazar gününün oy günü olduğunu söyler. 2023/1565 sayılı karar bu kuralı 31 Mart 2024’e uygulamıştır. 17 Ekim 2026’da, bir sonraki olağan mahalli seçimin gününü belirleyen daha sonraki bir karar okunmadı; bu sayfa o günü yazmaz.",
  lowerTierGap:
    "İlçe, belediye, belde, köy ve mahalle sayfaları bu sürümde yok. TÜİK’in 2025 istatistik yıllığı 81 il, 922 ilçe, 404 belde ve 18.249 köy sayar. Dipnot, il merkezlerinin (merkez ilçelerin) ilçe sayısına dahil olmadığını söyler.",
};

export function ui(lang: TrLang) {
  return lang === "tr" ? TR : EN;
}
