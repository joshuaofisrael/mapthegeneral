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
        ? "Türkiye sayfalarında kullanılan Anayasa, kanun, Yüksek Seçim Kurulu ve TÜİK kaynakları. Okuma tarihi 17 Ekim 2026."
        : "Constitution, statutes, Supreme Election Council, and TÜİK sources used on the Turkey pages. Read on 17 October 2026.",
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
          ? "Her kaydın okuma tarihi 17 Ekim 2026’dır. Bir olgu bu listede yoksa sayfada eksik olarak işaretlenir."
          : "Each record was read on 17 October 2026. A fact that is not in this list is marked as a gap on the page."
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
          ? "Kanunlar, Anayasa metni ve Yüksek Seçim Kurulu kararları, 5846 sayılı Fikir ve Sanat Eserleri Kanununun 31. maddesi kapsamında resmî metinlerdir. Nüfus verileri için kaynak: TÜİK (Türkiye İstatistik Kurumu), okuma tarihi her kayıtta yazılıdır. Diğer resmî kaynaklardaki olgular kendi sözlerimizle özetlenir ve her sayfada kaynak gösterilir. Görsel, logo veya amblem kullanılmaz."
          : "Statutes, the text of the Constitution and Supreme Election Council decisions are official texts under article 31 of Law No. 5846 on Intellectual and Artistic Works. Population figures: source TÜİK (Turkish Statistical Institute), with the date read given on each record. Facts from the other official sources are summarised in our own words and cited on each page. No images, logos or emblems are used."}
      </p>
    </TurkeyFrame>
  );
}
