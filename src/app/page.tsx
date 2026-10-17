import Link from "@/components/AnchorLink";
import { JsonLd } from "@/components/JsonLd";
import { SearchBox } from "@/components/SearchBox";
import { SITE } from "@/data/site";
import { MUNICIPALITY_PAGE_COUNT } from "@/data/spain/municipalities";
import { COMMUNITIES } from "@/data/spain/places";
import { ui } from "@/data/spain/ui";
import { countryCards } from "@/lib/country-registry";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: SITE.name,
  description: SITE.description,
  path: "/",
});

export default function HomePage() {
  const copy = ui("en");
  const countries = countryCards();
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
      <section className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Global election guide</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Map the General
        </h1>
        <p className="mt-4 text-lg leading-8 text-ink-muted">
          {SITE.name} is a nonpartisan information site for elections in first-world countries. It is
          operated by {SITE.legalName}. It is not a government site and it does not tell you how to vote.
        </p>
        <p className="mt-3 text-sm leading-6 text-ink-muted">{SITE.officialNotUs}</p>
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

      <section>
        <h2 className="font-serif text-2xl font-semibold">Countries</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          <li className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
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
          </li>
          {countries.map((country) => (
            <li key={country.code} className="rounded-xl border border-line bg-paper-card p-5 shadow-card">
              <h3 className="font-serif text-2xl font-semibold">
                <Link className="hover:text-navy" href={country.href}>
                  {country.nameEn}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-muted">{country.summaryEn}</p>
              <p className="mt-3 flex flex-wrap gap-4 text-sm">
                {country.languages.map((language) => (
                  <Link key={language.href} className="font-medium text-navy hover:underline" href={language.href}>
                    {language.label}
                  </Link>
                ))}
                <Link className="font-medium text-navy hover:underline" href={country.election.href}>
                  {country.election.label}
                </Link>
              </p>
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
    </div>
  );
}
