import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LegalCopyrightNotice } from "@/components/LegalCopyrightNotice";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/legal-entity";
import { FORMSUBMIT_PRIVACY, FORMSUBMIT_URL } from "@/components/ContactForm";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Privacy practices for ${SITE.name}: no accounts, cookieless Cloudflare Web Analytics, Google AdSense advertising cookies with a consent request for the EEA, the UK, and Switzerland, browser-only search, and GitHub Pages hosting logs. ${SITE.legalName} is the controller.`,
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
        eyebrow="Last updated 23 October 2026"
        title="Privacy Policy"
        lede={`How ${SITE.legalName} handles information on ${SITE.name}.`}
      />
      <div className="prose-legal">
        <p>
          This policy explains what information is involved when you visit {SITE.name} ({SITE.url}).
          The site is operated by {SITE.legalName}, a {SITE.entityType}. Business address:{" "}
          {SITE.location}. {SITE.name} is a static informational website. It has no user accounts, no
          comments, no email sign-up, and no payments. Its contact form is processed by FormSubmit.
          It may show advertisements from Google AdSense. Google and its partners may use cookies
          for those ads, as described under Advertising. The only analytics it loads is cookieless
          Cloudflare Web Analytics, which counts page views with no cookies or ad tracking.
        </p>
        <h2>Who is responsible</h2>
        <p>
          {SITE.brandNote} {SITE.legalName} is the data controller for personal information it
          collects through {SITE.name}. Privacy requests, including requests to access, correct, or
          delete information, go through the <Link href="/contact/">contact page</Link>.
        </p>
        <h2>What the site collects</h2>
        <ul>
          <li>Search runs in your browser against a file shipped with the site. We do not run a search server.</li>
          <li>
            If you submit the search form, the words you typed are placed in the page address. The
            host receives that address in the ordinary request log. We do not receive a separate copy.
          </li>
          <li>Hosting: GitHub Pages keeps security logs, including IP addresses, under GitHub’s own policy.</li>
          <li>Messages you choose to send us by email or through the contact form (delivered by FormSubmit).</li>
          <li>Visit counts: the site uses Cloudflare Web Analytics, which is cookieless and counts page views without setting cookies or using local storage.</li>
          <li>Advertising: Google may set cookies when AdSense ads are served. See Advertising below.</li>
        </ul>
        <h2>What we do not collect</h2>
        <ul>
          <li>We do not set our own cookies, and we do not use local storage for tracking.</li>
          <li>We do not use Google Analytics, social-media pixels, or any advertising network other than Google AdSense.</li>
          <li>We do not collect national identity numbers, voter numbers, or ballot images.</li>
          <li>We do not sell personal information.</li>
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
        <h2>Messages you send us</h2>
        <p>
          If you write through the <Link href="/contact/">contact page</Link>, we receive whatever you
          include so we can reply. Please do not send identity documents or ballot photos. The form
          is delivered by FormSubmit, described below. A message that reaches us by email is delivered
          through Google, which processes it under its own terms. The site does not publish a personal
          email address.
        </p>
        <h2 id="contact-form">Contact form (FormSubmit)</h2>
        <p>
          The form on the <Link href="/contact/">contact page</Link> is processed by{" "}
          <a href={FORMSUBMIT_URL} rel="noopener noreferrer">FormSubmit</a> (formsubmit.co), a
          third-party form service. When you submit it, your name, email address, message, and the
          page you were reporting (if any) are sent to FormSubmit, which delivers them to{" "}
          {SITE.legalName} so the message can be read and answered. FormSubmit may show a spam check (captcha) and
          processes submissions under its own{" "}
          <a href={FORMSUBMIT_PRIVACY} rel="noopener noreferrer">privacy policy</a>. We use what you
          send only to reply or keep an ordinary business record, and we never add you to a mailing
          list. The form is how you reach us. The site does not publish a personal email address.
        </p>
        <h2>Retention</h2>
        <p>
          We keep emails and contact form messages for as long as needed to respond and for ordinary business records. GitHub
          keeps its security logs under its own practices.
        </p>
        <h2 id="advertising">Advertising</h2>
        <p>
          {SITE.name} may show advertisements provided by Google AdSense. Google and its advertising
          partners may use cookies to serve and measure ads on this site. Google describes that use at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
            https://policies.google.com/technologies/partner-sites
          </a>
          . You can manage ads in your Google account at{" "}
          <a href="https://www.google.com/settings/ads" rel="noopener noreferrer">
            https://www.google.com/settings/ads
          </a>
          .
        </p>
        <p>
          Visitors in the European Economic Area, the United Kingdom, and Switzerland are asked for
          consent before those advertising cookies are used. The message is Google’s consent message
          for European regulations. It is shown through the AdSense script. This site does not add a
          second consent banner.
        </p>
        <p>
          Questions about advertising or this policy go through the <Link href="/contact/">contact page</Link>.
          The <Link href="/advertising/">advertising disclosure</Link> says that ads are Google AdSense,
          that the site does not sell political advertising or endorsements, and that it has no
          affiliate links.
        </p>
        <h2>Publicidad</h2>
        <p>
          {SITE.name} puede mostrar anuncios de Google AdSense. Google y sus socios publicitarios
          pueden usar cookies para mostrar y medir anuncios en este sitio. Google describe ese uso en{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
            https://policies.google.com/technologies/partner-sites
          </a>
          . La configuración de anuncios de Google está en{" "}
          <a href="https://www.google.com/settings/ads" rel="noopener noreferrer">
            https://www.google.com/settings/ads
          </a>
          .
        </p>
        <p>
          A las personas que visitan desde el Espacio Económico Europeo, el Reino Unido y Suiza se
          les pide consentimiento antes de usar esas cookies publicitarias. El mensaje es el de
          Google para la normativa europea y se muestra con el script de AdSense. Este sitio no añade
          un segundo aviso. Las preguntas se envían por la <Link href="/contact/">página de contacto</Link>.
        </p>
        <h2>Werbung</h2>
        <p>
          {SITE.name} kann Anzeigen von Google AdSense zeigen. Google und seine Werbepartner können
          Cookies verwenden, um Anzeigen auf dieser Website auszuliefern und zu messen. Google
          beschreibt das unter{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
            https://policies.google.com/technologies/partner-sites
          </a>
          . Die Google-Anzeigeneinstellungen sind unter{" "}
          <a href="https://www.google.com/settings/ads" rel="noopener noreferrer">
            https://www.google.com/settings/ads
          </a>
          .
        </p>
        <p>
          Besucherinnen und Besuchern aus dem Europäischen Wirtschaftsraum, dem Vereinigten
          Königreich und der Schweiz wird vor der Verwendung dieser Werbe-Cookies eine Einwilligung
          abgefragt. Die Meldung ist die von Google für europäische Vorschriften und erscheint über
          das AdSense-Skript. Diese Website fügt kein zweites Banner hinzu. Fragen gehen über die{" "}
          <Link href="/contact/">Kontaktseite</Link>.
        </p>
        <h2>Publicité</h2>
        <p>
          {SITE.name} peut afficher des annonces fournies par Google AdSense. Google et ses
          partenaires publicitaires peuvent utiliser des cookies pour diffuser et mesurer des annonces
          sur ce site. Google décrit cet usage sur{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
            https://policies.google.com/technologies/partner-sites
          </a>
          . Les paramètres des annonces Google sont sur{" "}
          <a href="https://www.google.com/settings/ads" rel="noopener noreferrer">
            https://www.google.com/settings/ads
          </a>
          .
        </p>
        <p>
          Les visiteurs de l’Espace économique européen, du Royaume-Uni et de la Suisse sont invités
          à donner leur consentement avant l’usage de ces cookies publicitaires. Le message est celui
          de Google pour la réglementation européenne et s’affiche par le script AdSense. Ce site
          n’ajoute pas un second bandeau. Les questions passent par la{" "}
          <Link href="/contact/">page de contact</Link>.
        </p>
        <h2>Pubblicità</h2>
        <p>
          {SITE.name} può mostrare annunci di Google AdSense. Google e i suoi partner pubblicitari
          possono usare cookie per erogare e misurare gli annunci su questo sito. Google descrive
          questo uso su{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
            https://policies.google.com/technologies/partner-sites
          </a>
          . Le impostazioni degli annunci Google sono su{" "}
          <a href="https://www.google.com/settings/ads" rel="noopener noreferrer">
            https://www.google.com/settings/ads
          </a>
          .
        </p>
        <p>
          Ai visitatori dello Spazio economico europeo, del Regno Unito e della Svizzera viene chiesto
          il consenso prima dell’uso di questi cookie pubblicitari. Il messaggio è quello di Google
          per la normativa europea e compare tramite lo script AdSense. Questo sito non aggiunge un
          secondo avviso. Le domande vanno inviate dalla <Link href="/contact/">pagina dei contatti</Link>.
        </p>
        <h2>Reklama</h2>
        <p>
          {SITE.name} może wyświetlać reklamy Google AdSense. Google i jego partnerzy reklamowi mogą
          używać plików cookie, aby wyświetlać i mierzyć reklamy na tej stronie. Google opisuje to
          użycie na stronie{" "}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">
            https://policies.google.com/technologies/partner-sites
          </a>
          . Ustawienia reklam Google są na stronie{" "}
          <a href="https://www.google.com/settings/ads" rel="noopener noreferrer">
            https://www.google.com/settings/ads
          </a>
          .
        </p>
        <p>
          Osoby odwiedzające z Europejskiego Obszaru Gospodarczego, Wielkiej Brytanii i Szwajcarii są
          proszone o zgodę, zanim te reklamowe pliki cookie zostaną użyte. Komunikat jest komunikatem
          Google dotyczącym przepisów europejskich i pojawia się przez skrypt AdSense. Ta strona nie
          dodaje drugiego banera. Pytania należy wysyłać przez{" "}
          <Link href="/contact/">stronę kontaktową</Link>.
        </p>
        <h2>European Economic Area, including Spain, and the United Kingdom</h2>
        <p>
          If the EU or UK General Data Protection Regulation applies to you, {SITE.legalName} is the
          controller for personal information we process, such as contact form messages you send us. The legal basis
          is our legitimate interest in answering that message and in publishing a free information
          site, and your decision to write to us. Hosting logs are processed by GitHub, and contact form messages by FormSubmit. You may ask
          to access, correct, or delete personal information we hold, or object to its use, through the{" "}
          <Link href="/contact/">contact page</Link>. You may complain to a supervisory authority, including the Agencia Española de Protección de
          Datos.
        </p>
        <h2 id="people-named">People named on this site</h2>
        <p>
          Pages name elected officeholders and candidates when an official public source names them,
          with the office, constituency and party or list they stood for. These details come only from official public sources: election
          commissions, parliaments, official gazettes and government registers, each cited on the page.
          {SITE.legalName} publishes them so voters can see who holds or seeks public office. Party
          affiliation is published because the person made it public by standing for election or
          taking office. The site publishes no private addresses, phone numbers, identity numbers,
          dates of birth or photos of private individuals. A person named on the site can ask for a
          correction or object to publication through the <Link href="/contact/">contact page</Link>; a
          correction is made when the official source shows a different fact. Entries change when the
          official source changes.
        </p>
        <h2 id="national-privacy-laws">Other national privacy laws</h2>
        <p>
          Requests under other national laws, including Switzerland’s Federal Act on Data Protection,
          the United Kingdom GDPR, Mexico’s federal personal data law, Canada’s PIPEDA and
          Australia’s Privacy Act 1988, go through the <Link href="/contact/">contact page</Link> and
          are handled the same way. Deletion requests use that form.
        </p>
        <h2>U.S. state privacy rights</h2>
        <p>
          We do not sell personal information, and we do not build our own profile of visitors.
          Google may use cookies for advertising as described under Advertising, including ads that
          Google personalises. A browser privacy signal is separate from the consent choice Google
          shows to visitors in the European Economic Area, the United Kingdom, and Switzerland.
        </p>
        <h2>Children</h2>
        <p>
          The site is not directed at children, including children under 13, and we do not knowingly
          collect personal information from children. A parent who believes we have a child’s
          information can ask for it to be deleted through the <Link href="/contact/">contact page</Link>.
        </p>
        <h2>Contact</h2>
        <p>
          {SITE.legalName}, {SITE.location}. <Link href="/contact/">Contact page</Link>. See also the{" "}
          <Link href="/disclaimer/">disclaimer</Link>, <Link href="/terms/">terms of use</Link>, and{" "}
          <Link href="/copyright/">copyright and corrections policy</Link>.
        </p>
      </div>
      <LegalCopyrightNotice />
    </div>
  );
}
