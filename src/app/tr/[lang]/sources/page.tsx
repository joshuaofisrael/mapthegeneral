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
    </TurkeyFrame>
  );
}
