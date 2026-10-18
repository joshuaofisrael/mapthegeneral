import { notFound } from "next/navigation";
import { JapanFrame } from "../../frame";
import { japanHome } from "../../../../../data/jp/paths";
import { SOURCES, sourceById } from "../../../../../data/jp/sources";
import type { Lang } from "../../../../../data/jp/types";
import { ui } from "../../../../../data/jp/ui";
import { japanMetadata } from "../../../../../data/jp/seo";

export function generateStaticParams() {
  return [{ lang: "ja" }, { lang: "en" }];
}
export const dynamicParams = false;

function asLang(value: string): Lang {
  if (value !== "ja" && value !== "en") notFound();
  return value;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${japanHome(lang)}sources/`;
  return japanMetadata({
    title: lang === "ja" ? "出典" : "Sources",
    description:
      lang === "ja"
        ? "日本のページの公的資料です。各項目に読んだ日があります。"
        : "Official sources for the Japan pages. Each item shows the date it was read.",
    path,
    lang,
    alternatePath: `${japanHome(lang === "ja" ? "en" : "ja")}sources/`,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const ja = lang === "ja";
  const path = `${japanHome(lang)}sources/`;
  const office = sourceById("soumu-senkyo");
  return (
    <JapanFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.japan, path: "/jp/" },
        { name: ja ? "日本" : "Japan", path: japanHome(lang) },
        { name: copy.sources, path },
      ]}
      title={ja ? "日本のページの出典" : "Sources for the Japan pages"}
      lede={
        ja
          ? "各資料に読んだ日を付けています。報道とWikipediaは、事実の出典にしていません。"
          : "Each source shows the date it was read. News reports and Wikipedia are not used as the source of a fact."
      }
      officeHref={office.url}
      officeLabel="総務省"
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          {ja
            ? "資料にないことは書きません。開いたままの未掲載は、衆議院議員の任期が終わる日、次の国政選挙の投票日、第51回の党派別議席、知事の氏名、市区町村、郵便番号、別表第一の町丁目の列記です。衆議院比例代表の北海道は、別表第二が「八人」、議員一覧が7人です。参議院の東京都は、別表第三が「十二人」、一覧が11人です。その差は欠員とは書いていません。人口は令和8年5月29日の人口速報です。令和8年9月29日の人口等基本集計は、都道府県の数字の出典にはしていません。"
            : "What is not in these sources is not invented. The gaps left open are the term-end date of the current House of Representatives, the next national polling day, party seats for the 51st general election, governors’ names, municipalities, postcodes, and the chome-level lists in Annex 1. For the Hokkaido proportional district, Annex 2 prints 八人 and the member list prints 7 names. For Tokyo in the House of Councillors, Annex 3 prints 十二人 and the list prints 11 names. That difference is not called a vacancy. Population is the preliminary count of 29 May 2026. The basic tabulation of 29 September 2026 was not used for the prefecture figures."}
        </p>
        <h2>{ja ? "利用規約と出典" : "Terms of use and attribution"}</h2>
        <p>
          {ja
            ? "総務省（統計局を含む）、首相官邸、衆議院、参議院、e-Govの公開情報は、各サイトの利用規約（"
            : "Public information from the Ministry of Internal Affairs and Communications (including the Statistics Bureau), the Prime Minister’s Office, the House of Representatives, the House of Councillors and e-Gov is used under each site’s terms of use ("}
          <a href="https://www.digital.go.jp/resources/open_data/public_data_license_v1.0">
            {ja ? "公共データ利用規約" : "Public Data License"}
          </a>
          {ja
            ? "、政府標準利用規約）に従います。総務省のページは公共データ利用規約（第1.0版）により、出典を書き、編集したことを分けて書いています。衆議院と参議院のページは、出所を明示した引用の範囲で使い、写真は転載していません。氏名の空白は一つにしています。著作権法第13条第1号は、憲法その他の法令を、この章の権利の目的となることができないものとしています。公職選挙法の条文は、その法令データから写しています。画像やロゴは転載していません。編集は当サイト（Joshua Israel Ventures LLC）によるもので、国が作成した未加工の情報ではありません。"
            : "). Ministry pages are used under the Public Data License 1.0, with the source named and edits marked as edits. House of Representatives and House of Councillors pages are quoted with the source named; no photographs are copied. Spaces inside names are collapsed to one. Article 13 of the Copyright Act says statutes are not the object of the rights in that chapter. Text of the Public Offices Election Act is taken from that statute. No images or logos are reproduced. Edits are by this site (Joshua Israel Ventures LLC), not an unedited government text."}
        </p>
      </div>
    </JapanFrame>
  );
}
