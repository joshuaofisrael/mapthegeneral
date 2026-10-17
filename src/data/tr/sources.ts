import type { SourceRef } from "./types";

const READ = "2026-10-17";

export const SOURCES: SourceRef[] = [
  {
    id: "anayasa",
    name: "Türkiye Cumhuriyeti Anayasası (Kanun No. 2709), Anayasa Mahkemesi metni",
    url: "https://www.anayasa.gov.tr/tr/mevzuat/anayasa/",
    readOn: READ,
  },
  {
    id: "kanun-6271",
    name: "6271 sayılı Cumhurbaşkanı Seçimi Kanunu, mevzuat.gov.tr metni",
    url: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6271.pdf",
    readOn: READ,
  },
  {
    id: "kanun-2839",
    name: "2839 sayılı Milletvekili Seçimi Kanunu, mevzuat.gov.tr metni",
    url: "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.2839.pdf",
    readOn: READ,
  },
  {
    id: "kanun-2972",
    name: "2972 sayılı Mahalli İdareler ile Mahalle Muhtarlıkları ve İhtiyar Heyetleri Seçimi Hakkında Kanun, mevzuat.gov.tr metni",
    url: "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.2972.pdf",
    readOn: READ,
  },
  {
    id: "kanun-6360",
    name: "6360 sayılı Kanun, mevzuat.gov.tr konsolide metni (büyükşehir belediyeleri)",
    url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6360&MevzuatTur=1&MevzuatTertip=5",
    readOn: READ,
  },
  {
    id: "ysk-2023-94",
    name: "Yüksek Seçim Kurulu Karar No: 2023/94",
    url: "https://www.ysk.gov.tr/doc/karar/dosya/82472/2023-94.pdf",
    readOn: READ,
  },
  {
    id: "ysk-2023-1255",
    name: "Yüksek Seçim Kurulu Karar No: 2023/1255 (28. Dönem Milletvekili Genel Seçimi kesin sonuçları)",
    url: "https://www.ysk.gov.tr/doc/karar/dosya/45639002/2023-1255.pdf",
    readOn: READ,
  },
  {
    id: "ysk-2023-1269",
    name: "Yüksek Seçim Kurulu Karar No: 2023/1269 (28 Mayıs 2023 Cumhurbaşkanı seçimi ikinci oylaması)",
    url: "https://www.ysk.gov.tr/doc/karar/dosya/46610370/2023-1269.pdf",
    readOn: READ,
  },
  {
    id: "ysk-cb-cm5",
    name: "Yüksek Seçim Kurulu, 28 Mayıs 2023 Cumhurbaşkanı seçimi ikinci oylaması, örnek CM/5",
    url: "https://www.ysk.gov.tr/doc/dosyalar/docs/14Mayis2023/KesinSecimSonuclari/2023CB-TumSecimSonucuIkinciTur.pdf",
    readOn: READ,
  },
  {
    id: "ysk-istatistik",
    name: "Yüksek Seçim Kurulu, Seçim İstatistikleri, tablo 2.6 (2018 ve 2023 milletvekillerinin illere göre dağılımı)",
    url: "https://www.ysk.gov.tr/doc/dosyalar/docs/SE%C3%87%C4%B0M-%C4%B0STAT%C4%B0ST%C4%B0K-2020_2024-TR-11-11-2025.pdf",
    readOn: READ,
  },
  {
    id: "ysk-2023-1565",
    name: "Yüksek Seçim Kurulu Karar No: 2023/1565 (31 Mart 2024 mahalli idareler seçimi)",
    url: "https://www.ysk.gov.tr/doc/karar/dosya/46637357/2023-1565.pdf",
    readOn: READ,
  },
  {
    id: "ysk-2024-2367",
    name: "Yüksek Seçim Kurulu Karar No: 2024/2367 (31 Mart 2024 kesin sonuçların ilanı)",
    url: "https://www.ysk.gov.tr/doc/karar/dosya/57816264/2024-2367.pdf",
    readOn: READ,
  },
  {
    id: "ysk-2024-liste2",
    name: "Yüksek Seçim Kurulu, 31 Mart 2024, Liste 2, büyükşehir belediye başkanlığı seçimleri sonucu",
    url: "https://www.ysk.gov.tr/doc/dosyalar/docs/2024MahalliIdareler/2024KesinSecimSonuclar%C4%B1/BUYUKSEHIRBELEDIYEBASKANLIGI.pdf",
    readOn: READ,
  },
  {
    id: "ysk-2024-liste3",
    name: "Yüksek Seçim Kurulu, 31 Mart 2024, Liste 3, belediye başkanlığı seçimleri sonucu",
    url: "https://www.ysk.gov.tr/doc/dosyalar/docs/2024MahalliIdareler/2024KesinSecimSonuclar%C4%B1/BELEDIYEBASKANLIGI.pdf",
    readOn: READ,
  },
  {
    id: "tuik-2025",
    name: "TÜİK, İstatistiklerle Türkiye 2025, tablo 1.4, İllere göre nüfus, 2025 (ADNKS)",
    url: "https://data.tuik.gov.tr/Bulten/Index?p=Adrese-Dayali-Nufus-Kayit-Sistemi-Sonuclari-2025-53899",
    readOn: READ,
  },
  {
    id: "tuik-duyuru",
    name: "TÜİK, Adrese Dayalı Nüfus Kayıt Sistemi Sonuçları, 2025 haber bülteni duyurusu (9 Şubat 2026)",
    url: "https://www.tuik.gov.tr/media/announcements/ADNKS_2025TR.pdf",
    readOn: READ,
  },
  {
    id: "ysk-home",
    name: "Yüksek Seçim Kurulu",
    url: "https://www.ysk.gov.tr/",
    readOn: READ,
  },
  {
    id: "tbmm",
    name: "Türkiye Büyük Millet Meclisi",
    url: "https://www.tbmm.gov.tr/",
    readOn: READ,
  },
  {
    id: "tccb",
    name: "Türkiye Cumhuriyeti Cumhurbaşkanlığı",
    url: "https://www.tccb.gov.tr/",
    readOn: READ,
  },
];

export function sourceById(id: string): SourceRef {
  const found = SOURCES.find((item) => item.id === id);
  if (!found) throw new Error(`Missing source ${id}`);
  return found;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map(sourceById);
}
