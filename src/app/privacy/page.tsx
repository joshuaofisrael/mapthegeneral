import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Privacy practices for ${SITE.name}: no accounts, no cookies, no analytics, browser-only search, and GitHub Pages hosting logs. ${SITE.legalName} is the controller.`,
  path: "/privacy",
});

const GITHUB_PAGES_DATA =
  "https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection";
const GITHUB_PRIVACY = "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Privacy" }]} />
      <PageHeader
        eyebrow={`Last updated ${SITE.lastUpdated}`}
        title="Privacy Policy"
        lede={`How ${SITE.legalName} handles information on ${SITE.name}.`}
      />
      <div className="prose-legal">
        <p>
          This policy explains what information is involved when you visit {SITE.name} ({SITE.url}).
          The site is operated by {SITE.legalName}, a {SITE.entityType}. Business address:{" "}
          {SITE.location}. {SITE.name} is a static informational website. It has no user accounts, no
          comments, no advertising, no email sign-up, and no payments. It does not use cookies or
          tracking pixels, and it does not load an analytics script.
        </p>
        <h2>Who is responsible</h2>
        <p>
          {SITE.brandNote} {SITE.legalName} is the data controller for personal information it
          collects through {SITE.name}. Privacy requests go to <a href={contactMailto()}>{SITE.email}</a>.
        </p>
        <h2>What the site collects</h2>
        <ul>
          <li>Search runs in your browser against a file shipped with the site. We do not run a search server.</li>
          <li>
            If you submit the search form, the words you typed are placed in the page address. The
            host receives that address in the ordinary request log. We do not receive a separate copy.
          </li>
          <li>Hosting: GitHub Pages keeps security logs, including IP addresses, under GitHub’s own policy.</li>
          <li>Email you choose to send us.</li>
        </ul>
        <h2>What we do not collect</h2>
        <ul>
          <li>We do not set cookies and we do not use local storage for tracking.</li>
          <li>We do not use Google Analytics, advertising networks, or social-media pixels.</li>
          <li>We do not collect national identity numbers, voter numbers, or ballot images.</li>
          <li>We do not sell or share personal information.</li>
        </ul>
        <h2>Hosting</h2>
        <p>
          The site is hosted on GitHub Pages. GitHub states that a visitor’s IP address is logged for
          security purposes. See{" "}
          <a href={GITHUB_PAGES_DATA} rel="noopener noreferrer">GitHub Pages data collection</a> and the{" "}
          <a href={GITHUB_PRIVACY} rel="noopener noreferrer">GitHub General Privacy Statement</a>. We do
          not receive those logs for marketing.
        </p>
        <h2>Fonts and links</h2>
        <p>
          Fonts are served from this website. The site does not embed third-party frames. Links to
          official election offices leave {SITE.name}, and those sites have their own policies.
        </p>
        <h2>Email you send us</h2>
        <p>
          If you email <a href={contactMailto()}>{SITE.email}</a>, we receive whatever you include so
          we can reply. Please do not send identity documents or ballot photos. Mail is delivered
          through Google, which processes messages under its own terms.
        </p>
        <h2>Retention</h2>
        <p>
          We keep emails for as long as needed to respond and for ordinary business records. GitHub
          keeps its security logs under its own practices.
        </p>
        <h2>European Economic Area, including Spain, and the United Kingdom</h2>
        <p>
          If the EU or UK General Data Protection Regulation applies to you, {SITE.legalName} is the
          controller for personal information we process, such as email you send us. The legal basis
          is our legitimate interest in answering that message and in publishing a free information
          site, and your decision to write to us. Hosting logs are processed by GitHub. You may ask
          to access, correct, or delete personal information we hold, or object to its use, and you
          may complain to a supervisory authority, including the Agencia Española de Protección de
          Datos.
        </p>
        <h2>U.S. state privacy rights</h2>
        <p>
          We do not sell or share personal information for cross-context behavioural advertising, and
          we do not profile you. A browser privacy signal does not change a site that sets no cookies
          and runs no advertising.
        </p>
        <h2>Children</h2>
        <p>
          The site is not directed to children under 13, and we do not knowingly collect personal
          information from children.
        </p>
        <h2>Contact</h2>
        <p>
          {SITE.legalName}, {SITE.location}. <a href={contactMailto()}>{SITE.email}</a>. See also the{" "}
          <Link href="/disclaimer">disclaimer</Link> and <Link href="/terms">terms of use</Link>.
        </p>
      </div>
    </div>
  );
}
