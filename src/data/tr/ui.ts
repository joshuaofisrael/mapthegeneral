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
    "District pages name the ilçe belediye başkanı when the YSK open-data file of people elected on 31 March 2024 has one. Liste 3 leaves out seven cancelled contests. Three of those are districts: Aksaray-Güzelyurt, Kayseri-Pınarbaşı, and Şanlıurfa-Hilvan. The elected person’s name is not on those three district pages. The kaymakam’s name is not copied.",
  governorGap:
    "The governor’s name is not copied on this page. Article 126 of the Constitution says provincial administration is based on deconcentration. The Interior Ministry publishes the current governors.",
  candidateGap:
    "Proclaimed candidacies for the next presidential and parliamentary elections are not on this page. No Supreme Election Council list of 2028 candidates was read on 17 October 2026.",
  nextDayGap:
    "No Supreme Election Council calendar read on 17 October 2026 prints the polling day of the next ordinary presidential and parliamentary elections. Article 3 of Law 6271 says they are held every five years on the same day, and that polling day is the last Sunday before the terms expire, counted from the previous joint election. This page does not calculate that Sunday.",
  localNextGap:
    "Law 2972 article 8 says ordinary local elections are held every five years, that 1 January of the fifth year is the start, and that polling day is the last Sunday of March of that year. Decision 2023/1565 applied that rule to 31 March 2024. No later decision setting the next ordinary local polling day was read on 17 October 2026, so this page does not print one.",
  lowerTierGap:
    "Town, village, and neighbourhood pages are not in this release. TÜİK’s 2025 statistical yearbook counts 922 districts with a note that province centres are not included, plus 404 towns and 18,249 villages. This release publishes 973 districts from the YSK ilçe belediye başkanı list, not the yearbook’s 922.",
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
    "İlçe sayfaları, 31 Mart 2024 seçilenler dosyasında adı varsa ilçe belediye başkanını yazar. Liste 3, yedi iptal edilen yarışı toplama almaz. Bunların üçü ilçedir: Aksaray-Güzelyurt, Kayseri-Pınarbaşı ve Şanlıurfa-Hilvan. Seçilen kişinin adı o üç ilçe sayfasında yoktur. Kaymakamın adı kopyalanmadı.",
  governorGap:
    "Valinin adı bu sayfada yok. Anayasanın 126. maddesi, il idaresinin yetki genişliğine dayandığını söyler. Güncel valileri İçişleri Bakanlığı yayımlar.",
  candidateGap:
    "Bir sonraki Cumhurbaşkanı ve milletvekili seçiminin ilan edilmiş adayları bu sayfada yok. 17 Ekim 2026’da okunan bir Yüksek Seçim Kurulu listesi 2028 adaylarını basmıyor.",
  nextDayGap:
    "17 Ekim 2026’da okunan bir Yüksek Seçim Kurulu takvimi, bir sonraki olağan Cumhurbaşkanı ve milletvekili seçiminin oy gününü basmıyor. 6271 sayılı Kanunun 3. maddesi, seçimlerin beş yılda bir aynı gün yapıldığını ve oy gününün, birlikte yapılan önceki seçim esas alınarak, görev sürelerinin dolmasından önceki son Pazar günü olduğunu söyler. Bu sayfa o Pazarı hesaplamaz.",
  localNextGap:
    "2972 sayılı Kanunun 8. maddesi, mahalli idareler seçimlerinin beş yılda bir yapıldığını, her seçim döneminin beşinci yılındaki 1 Ocak gününün başlangıç olduğunu ve aynı yılın Mart ayının son Pazar gününün oy günü olduğunu söyler. 2023/1565 sayılı karar bu kuralı 31 Mart 2024’e uygulamıştır. 17 Ekim 2026’da, bir sonraki olağan mahalli seçimin gününü belirleyen daha sonraki bir karar okunmadı; bu sayfa o günü yazmaz.",
  lowerTierGap:
    "Belde, köy ve mahalle sayfaları bu sürümde yoktur. TÜİK’in 2025 istatistik yıllığı, il merkezlerinin dahil olmadığı 922 ilçe ile 404 belde ve 18.249 köy sayar. Bu sürüm, YSK ilçe belediye başkanı listesindeki 973 ilçeyi yayımlar; yıllıktaki 922 sayısını değil.",
};

export function ui(lang: TrLang) {
  return lang === "tr" ? TR : EN;
}
