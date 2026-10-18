import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { asTrLang } from "@/data/tr/lang";
import { otherLang, turkeyHome, turkeyMetadata } from "@/data/tr/metadata";
import { SOURCES, sourceById } from "@/data/tr/sources";
import { ui } from "@/data/tr/ui";

const ysk = sourceById("ysk-home");

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const path = `${turkeyHome(lang)}sources/`;
  return turkeyMetadata({
    title: lang === "tr" ? "Kaynaklar" : "Sources",
    description:
      lang === "tr"
        ? "Türkiye sayfalarındaki Anayasa, kanun, Yüksek Seçim Kurulu, TBMM ve TÜİK kaynakları. Her kaydın okuma tarihi kaynak satırındadır."
        : "Constitution, statutes, Supreme Election Council, TBMM, and TÜİK sources used on the Turkey pages. The date read is on each source line.",
    path,
    lang,
    alternatePath: `${turkeyHome(otherLang(lang))}sources/`,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const copy = ui(lang);
  const path = `${turkeyHome(lang)}sources/`;
  const tr = lang === "tr";
  return (
    <TurkeyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.turkey, path: "/tr/" },
        { name: tr ? "Türkiye" : "Turkey", path: turkeyHome(lang) },
        { name: copy.sources, path },
      ]}
      title={copy.sources}
      lede={
        tr
          ? "Okuma tarihi her kaynağın satırındadır. Bir olgu bu listede yoksa sayfada eksik olarak işaretlenir."
          : "The date read is on each source line. A fact that is not in this list is marked as a gap on the page."
      }
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={SOURCES}
    >
      <p className="text-sm leading-6 text-ink-muted">
        {tr
          ? "Posta kodu dosyası eklenmedi. PTT’nin sorgu ekranı açık bir toplu dosya olarak bu sürüme alınmadı."
          : "No postcode file was added. PTT’s query screen was not brought into this release as an open bulk file."}
      </p>
      <h2 className="mt-6 font-serif text-xl font-semibold">{tr ? "Lisans ve kaynak gösterme" : "Licences and attribution"}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        {tr
          ? "Kanunlar, Anayasa metni ve Yüksek Seçim Kurulu kararları, 5846 sayılı Fikir ve Sanat Eserleri Kanununun 31. maddesi kapsamında resmî metinlerdir. Nüfus verileri için kaynak: TÜİK (Türkiye İstatistik Kurumu). İlçe belediye başkanı ve 2023 milletvekili adları YSK Açık Veri Portalı’ndaki seçilenler dosyalarından gelir. Portal, 18 Ekim 2026’da okunan sayfalarda ayrı bir yeniden kullanım lisansı basmıyordu; ad ve parti etiketi her sayfada YSK’ya bağlanır, ham dosya yeniden dağıtılmaz, logo kullanılmaz. Güncel milletvekili adı ve parti etiketi TBMM listesindendir; üye fotoğrafı, telefonu ve özgeçmişi alınmaz. 6698 sayılı Kanun kapsamında sayfalar yalnızca kamu görevinde zaten yayımlanmış adı ve parti etiketini tekrarlar. 298 sayılı Kanun seçim dönemi yayın sınırlarını koyar. 18 Ekim 2026’da YSK ana sayfasındaki «Yapılacak Seçimler» kutusunda güncel bir oy günü yoktu; 7 Haziran 2026 ara seçimi metni HTML yorumunun içindeydi. Bu sürüm anket veya projeksiyon yayımlamaz."
          : "Statutes, the text of the Constitution, and Supreme Election Council decisions are official texts under article 31 of Law No. 5846 on Intellectual and Artistic Works. Population figures: source TÜİK (Turkish Statistical Institute). İlçe belediye başkanı names and the 2023 deputy names come from the elected-candidate files on the YSK Open Data Portal. The portal pages read on 18 October 2026 did not print a separate reuse licence; each page attributes the name and party label to YSK, does not redistribute the raw file, and uses no logo. Current member names and party labels are from the TBMM list; photographs, telephone numbers, and biographies are not copied. Under Law No. 6698 the pages repeat only the name and party label already published for the public office. Law No. 298 sets publication limits during an election period. On 18 October 2026 the YSK homepage box «Yapılacak Seçimler» showed no current polling day; the 7 June 2026 by-election text sat inside an HTML comment. This release publishes no poll and no projection."}
      </p>
    </TurkeyFrame>
  );
}
