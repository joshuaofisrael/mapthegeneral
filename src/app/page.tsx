import { IlResultsCard, IL_PROMO_UNTIL } from "@/components/IlResultsLinks";
import Link from "@/components/AnchorLink";
import { CountryHero } from "@/components/CountryHero";
import { HomeFaq } from "@/components/HomeFaq";
import { JsonLd } from "@/components/JsonLd";
import { SearchBox } from "@/components/SearchBox";
import { countryAccent } from "@/data/heroes";
import { homeFaqJsonLd } from "@/data/home-faq";
import { SITE } from "@/data/site";
import { MUNICIPALITY_PAGE_COUNT } from "@/data/spain/municipalities";
import { COMMUNITIES } from "@/data/spain/places";
import { ui } from "@/data/spain/ui";
import { upcomingElectionCards } from "@/data/election-seo";
import { registryCountries } from "@/lib/country-registry";
import { pageMetadata } from "@/lib/metadata";
import type { CSSProperties } from "react";

export const metadata = pageMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  const copy = ui("en");
  const extraCountries = registryCountries().filter((country) => country.code !== "es");
  const upcoming = upcomingElectionCards();
  return (
    <div className="space-y-12">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: SITE.name,
          url: `${SITE.url}/`,
          description: SITE.description,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: `${SITE.url}/` },
        }}
      />
      <JsonLd data={homeFaqJsonLd} />
      <section className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Global election guide</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Map the General
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-muted">
          {SITE.name} is an unofficial, independent guide to elections in{" "}
          <a className="font-medium text-navy underline" href="#countries">
            the countries covered so far
          </a>
          . It is not affiliated with any government or election authority, and it does not tell you how
          to vote.
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-muted">{SITE.officialNotUs}</p>
        {Date.now() < IL_PROMO_UNTIL && <IlResultsCard />}
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">Search</h2>
        <p className="mt-2 max-w-2xl text-sm text-ink-muted">
          The index is a file shipped with the site. Matching runs in your browser.
        </p>
        <div className="mt-4 max-w-2xl">
          <SearchBox
            placeholder="Country, community, province, or municipality"
            postcodeNote={copy.postcodeGap}
          />
        </div>
      </section>

      {upcoming.length > 0 ? (
        <section id="upcoming-elections">
          <h2 className="font-serif text-2xl font-semibold">Upcoming and recent elections</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
            Polling days in the next 60 days, elections held in the last 14 days, and the New South Wales state
            election of 13 March 2027, from the election registry. A recently held election stays on this list for 14
            days after polling day, then drops off. Each card links to that election’s page.
          </p>
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {upcoming.map((item) => (
              <li key={item.href} className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
                {item.recent ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">Recently held</p>
                ) : null}
                <h3 className="font-serif text-xl font-semibold">
                  <Link className="hover:text-navy" href={item.href}>
                    {item.label}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section id="countries">
        <h2 className="font-serif text-2xl font-semibold">Countries</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-muted">
          Each card opens that country’s guide. Where a card shows a photograph, it is an AI-generated image of a public
          place, and the country page captions it “AI-generated image”. Those images are not placed on municipality
          pages. Ireland, Norway, Sweden, Brazil, Serbia and Israel have no photograph in this release.
        </p>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          <li
            className="country-card overflow-hidden rounded-xl border border-line bg-paper-card shadow-card"
            style={{ "--country-accent": countryAccent("es"), borderTopColor: countryAccent("es") } as CSSProperties}
          >
            <CountryHero code="es" priority={false} sizes="(min-width: 768px) 34rem, 100vw" framed={false} />
            <div className="p-5">
              <h3 className="font-serif text-2xl font-semibold">
                <Link className="hover:text-navy" href="/es/">
                  Spain
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">
                General election for the Congreso de los Diputados and the Senado, Sunday, 29 November
                2026, called by Real Decreto 806/2026. This release has the national page,{" "}
                {COMMUNITIES.length} autonomous communities and cities, 50 provinces, and{" "}
                {MUNICIPALITY_PAGE_COUNT.toLocaleString("en-US")} municipalities, in Spanish and English.
              </p>
              <p className="mt-3 flex flex-wrap gap-4 text-sm">
                <Link className="font-medium text-navy hover:underline" href="/es/en/">
                  English
                </Link>
                <Link className="font-medium text-navy hover:underline" href="/es/es/">
                  Español
                </Link>
                <Link className="font-medium text-navy hover:underline" href="/es/en/elections/cortes-generales-2026/">
                  29 November 2026
                </Link>
              </p>
            </div>
          </li>
          {extraCountries.map((country) => (
            <li
              key={country.code}
              className="country-card overflow-hidden rounded-xl border border-line bg-paper-card shadow-card"
              style={
                {
                  "--country-accent": countryAccent(country.code),
                  borderTopColor: countryAccent(country.code),
                } as CSSProperties
              }
            >
              <CountryHero code={country.code} priority={false} sizes="(min-width: 768px) 34rem, 100vw" framed={false} />
              <div className="p-5">
                <h3 className="font-serif text-2xl font-semibold">
                  <Link className="hover:text-navy" href={country.href}>
                    {country.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">{country.summary}</p>
                <p className="mt-3 flex flex-wrap gap-4 text-sm">
                  {country.links.map((link) => (
                    <Link key={link.href} className="font-medium text-navy hover:underline" href={link.href}>
                      {link.label}
                    </Link>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-line bg-paper-card p-5">
        <h2 className="font-serif text-2xl font-semibold">United States midterms</h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          The 2026 U.S. midterm pages are on the sibling site {SITE.siblingName}.
        </p>
        <p className="mt-3">
          <a className="font-medium text-navy underline" href={SITE.siblingUrl}>
            {SITE.siblingUrl}
          </a>
        </p>
      </section>

      <HomeFaq />
    </div>
  );
}
