import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { CountryGuide } from "@/components/CountryGuide";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BG_CIK } from "@/data/bg-president-2026";
import { countryGuide } from "@/data/guides/copy";
import { bilingualMetadata } from "@/lib/bilingual-meta";
import { breadcrumbJsonLd } from "@/lib/metadata";
import type { ReactNode } from "react";

const TRUST = {
  updated: "Обновено",
  before: "Неофициална информация. Потвърдете при ",
  link: "Централната избирателна комисия",
  after: ".",
  report: "Съобщете за грешка на тази страница",
};

export function bgChooserMetadata() {
  return bilingualMetadata({
    title: "България — език",
    description:
      "България в Map the General: избори за президент и вицепрезидент на 25 октомври и нов избор на 1 ноември 2026 г. Български и английски. Неофициална информация.",
    path: "/bg/",
    locale: "bg_BG",
    languages: { bg: "/bg/bg/", en: "/bg/en/", "x-default": "/bg/bg/" },
  });
}

export function bgHubMetadata(kind: "national" | "elections" | "faq" | "sources", lang: "bg" | "en") {
  const bg = lang === "bg";
  const path =
    kind === "national"
      ? bg
        ? "/bg/bg/"
        : "/bg/en/"
      : kind === "elections"
        ? bg
          ? "/bg/bg/elections/"
          : "/bg/en/elections/"
        : kind === "faq"
          ? bg
            ? "/bg/bg/faq/"
            : "/bg/en/faq/"
          : bg
            ? "/bg/bg/sources/"
            : "/bg/en/sources/";
  const copy = {
    national: bg
      ? {
          title: "България",
          description:
            "България: избори за президент и вицепрезидент. Първи вот на 25 октомври 2026 г. и нов избор на 1 ноември 2026 г. Неофициална информация.",
        }
      : {
          title: "Bulgaria",
          description:
            "Bulgaria: election of a president and vice president. First vote on 25 October 2026 and a new election on 1 November 2026. Unofficial information.",
        },
    elections: bg
      ? {
          title: "Избори в България",
          description: "Изборите за президент и вицепрезидент на 25 октомври и 1 ноември 2026 г., от ЦИК и Народното събрание.",
        }
      : {
          title: "Elections in Bulgaria",
          description: "The presidential and vice-presidential votes of 25 October and 1 November 2026, from the Central Election Commission and the National Assembly.",
        },
    faq: bg
      ? { title: "Въпроси за България", description: "Кратки отговори за датата, часовете, регистъра и резултатите на ЦИК." }
      : { title: "Bulgaria questions", description: "Short answers on the date, the hours, the register, and the Commission’s results." },
    sources: bg
      ? { title: "Източници за България", description: "Официалните страници за хъба за България: ЦИК, Народното събрание и Изборният кодекс." }
      : { title: "Bulgaria sources", description: "Official pages used for the Bulgaria hub: the Central Election Commission, the National Assembly, and the Election Code." },
  }[kind];
  const bgPath = bg ? path : path.replace("/bg/en/", "/bg/bg/");
  const enPath = bg ? path.replace("/bg/bg/", "/bg/en/") : path;
  return bilingualMetadata({
    title: copy.title,
    description: copy.description,
    path,
    locale: bg ? "bg_BG" : "en_US",
    languages: { bg: bgPath, en: enPath, "x-default": bgPath },
  });
}

function Shell({
  path,
  crumbs,
  title,
  lede,
  eyebrow,
  children,
}: {
  path: string;
  crumbs: { name: string; path: string }[];
  title: string;
  lede: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <article lang="bg" className="country-article" data-country="bg">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs
        items={crumbs.map((item, index) => ({
          href: index === crumbs.length - 1 ? undefined : item.path,
          label: item.name,
        }))}
      />
      <p className="text-sm">
        <Link className="text-navy underline" href={path.replace("/bg/bg/", "/bg/en/")} hrefLang="en">
          English
        </Link>
      </p>
      <PageHeader eyebrow={eyebrow} title={title} lede={lede} />
      <ContentTrust updated="27 October 2026" pagePath={path} officeHref={BG_CIK} officeLabel="Централна избирателна комисия" copy={TRUST} />
      <div className="mt-8 space-y-8">{children}</div>
    </article>
  );
}

export function BgChooser() {
  return (
    <div lang="bg">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Начало", path: "/" },
          { name: "България", path: "/bg/" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Начало" }, { label: "България" }]} />
      <PageHeader
        eyebrow="България"
        title="България"
        lede="Езикът по подразбиране е български. Английската страница е превключвател, не отделен избор."
      />
      <ContentTrust updated="27 October 2026" pagePath="/bg/" officeHref={BG_CIK} officeLabel="Централна избирателна комисия" copy={TRUST} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="country-card rounded-xl border border-line bg-paper-card p-5" lang="bg">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/bg/bg/">
              Български
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Избори за президент и вицепрезидент. Първи вот на 25 октомври 2026 г. Нов избор на 1 ноември 2026 г.{" "}
            <Link className="text-navy underline" href="/bg/bg/elections/prezident-2026/">
              Страница на избора
            </Link>
          </p>
        </li>
        <li className="country-card rounded-xl border border-line bg-paper-card p-5" lang="en">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/bg/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Presidential and vice-presidential election. First vote on 25 October 2026. New election on 1 November 2026.{" "}
            <Link className="text-navy underline" href="/bg/en/elections/president-2026/">
              Election page
            </Link>
          </p>
        </li>
      </ul>
    </div>
  );
}

export function BgNational() {
  return (
    <Shell
      path="/bg/bg/"
      crumbs={[
        { name: "Начало", path: "/" },
        { name: "България", path: "/bg/bg/" },
      ]}
      eyebrow="Президент и вицепрезидент · 1 ноември 2026"
      title="България"
      lede="Народното събрание насрочи изборите за 25 октомври 2026 г. и нов избор за 1 ноември 2026 г., ако няма избрана двойка."
    >
      <CountryGuide code="bg" lang="bg" />
      <p className="text-sm">
        <Link className="text-navy underline" href="/bg/bg/elections/">
          Избори
        </Link>
        {" · "}
        <Link className="text-navy underline" href="/bg/bg/faq/">
          Въпроси
        </Link>
        {" · "}
        <Link className="text-navy underline" href="/bg/bg/sources/">
          Източници
        </Link>
      </p>
    </Shell>
  );
}

export function BgElectionsIndex() {
  const guide = countryGuide("bg", "bg");
  return (
    <Shell
      path="/bg/bg/elections/"
      crumbs={[
        { name: "Начало", path: "/" },
        { name: "България", path: "/bg/bg/" },
        { name: "Избори", path: "/bg/bg/elections/" },
      ]}
      title="Избори в България"
      lede="Този хъб води към изборите за президент и вицепрезидент. Няма страници за общини."
    >
      <ul className="space-y-4">
        {guide?.elections.map((item) => (
          <li key={item.name}>
            {item.href ? (
              <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={item.href}>
                {item.name}
              </Link>
            ) : (
              <p className="font-serif text-xl font-semibold">{item.name}</p>
            )}
            {item.detail ? <p className="mt-1 text-sm leading-6 text-ink-muted">{item.detail}</p> : null}
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function BgFaqPage() {
  const guide = countryGuide("bg", "bg");
  const items = guide?.faq ?? [];
  return (
    <Shell
      path="/bg/bg/faq/"
      crumbs={[
        { name: "Начало", path: "/" },
        { name: "България", path: "/bg/bg/" },
        { name: "Въпроси", path: "/bg/bg/faq/" },
      ]}
      title="Въпроси за България"
      lede="Отговорите следват страниците на ЦИК и Изборния кодекс, прочетени на 27 октомври 2026 г."
    >
      <dl className="space-y-4">
        {items.map((item) => (
          <div key={item.q}>
            <dt className="font-semibold">{item.q}</dt>
            <dd className="mt-1 text-sm leading-6 text-ink-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Shell>
  );
}

export function BgSourcesPage() {
  const guide = countryGuide("bg", "bg");
  return (
    <Shell
      path="/bg/bg/sources/"
      crumbs={[
        { name: "Начало", path: "/" },
        { name: "България", path: "/bg/bg/" },
        { name: "Източници", path: "/bg/bg/sources/" },
      ]}
      title="Източници за България"
      lede="Всяка страница в хъба сочи към този списък. Страниците са прочетени на 27 октомври 2026 г."
    >
      <ul className="space-y-3 text-sm">
        {guide?.sources.map((item) => (
          <li key={item.href}>
            <a className="text-navy underline" href={item.href} rel="noopener noreferrer">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
