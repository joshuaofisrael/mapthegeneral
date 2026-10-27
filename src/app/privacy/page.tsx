import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CookieChoicesButton, GA_MEASUREMENT_ID } from "@/components/GoogleAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { LegalCopyrightNotice } from "@/components/LegalCopyrightNotice";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/legal-entity";
import { FORMSUBMIT_PRIVACY, FORMSUBMIT_URL } from "@/components/ContactForm";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `Privacy practices for ${SITE.name}: no accounts, cookieless Cloudflare Web Analytics, Google Analytics 4 only after consent, Google AdSense advertising cookies with a consent request for the EEA, the UK, and Switzerland, browser-only search, and GitHub Pages hosting logs. ${SITE.legalName} is the controller.`,
  path: "/privacy",
});

const GITHUB_PAGES_DATA =
  "https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection";
const GITHUB_PRIVACY = "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";
const GOOGLE_OPTOUT = "https://tools.google.com/dlpage/gaoptout";
const GOOGLE_ANALYTICS_COOKIES = "https://support.google.com/analytics/answer/11397207";
const GOOGLE_DATA_PRIVACY = "https://support.google.com/analytics/answer/6004245";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy", path: "/privacy" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Privacy" }]} />
      <PageHeader
        eyebrow="Last updated 27 October 2026"
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
          for those ads, as described under Advertising. Visit counts use cookieless Cloudflare Web
          Analytics. Google Analytics 4 loads only after you accept analytics cookies, as described
          under Google Analytics.
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
          <li>Analytics, only if you click Accept: Google Analytics cookies and usage data, as described below.</li>
          <li>Advertising: Google may set cookies when AdSense ads are served. See Advertising below.</li>
        </ul>
        <h2>What we do not collect</h2>
        <ul>
          <li>We do not set our own cookies. The analytics choice is kept in this browser’s local storage and is not a tracking cookie. Google Analytics cookies are set only if you click Accept.</li>
          <li>We do not use social-media pixels, or any advertising network other than Google AdSense. Google Analytics is not loaded unless you click Accept.</li>
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
          We keep emails and contact form messages for as long as needed to respond and for ordinary business records. Google
          keeps Google Analytics data under the retention setting in our Google Analytics account (no longer than 14
          months for user-level data). GitHub keeps its security logs under its own practices.
        </p>
        <h2 id="google-analytics">Analytics: Google Analytics (only with your consent)</h2>
        <p>
          The site also uses Google Analytics 4 (measurement ID {GA_MEASUREMENT_ID}), a service of
          Google LLC, to count visits and understand which pages are useful. The Google Analytics
          script is not on the page until you click Accept. That choice is this site’s consent
          script. Advertising and analytics storage for that tag start denied. When you first visit,
          a banner asks whether you accept analytics cookies. Google AdSense is a separate script
          and is described under Advertising. This analytics banner does not replace Google’s
          advertising consent message.
        </p>
        <ul>
          <li>
            If you click <strong>Accept</strong>, the site loads the Google tag and Google Analytics
            may set first-party cookies named <code>_ga</code> and <code>_ga_*</code> (Google says
            these last up to two years) to recognize your browser across visits to this site. See{" "}
            <a href={GOOGLE_ANALYTICS_COOKIES} rel="noopener noreferrer">
              Google’s description of these cookies
            </a>
            .
          </li>
          <li>
            If you click <strong>Reject</strong>, or make no choice, the Google script is not
            loaded and Google Analytics cookies are not set. We do not send Google a cookieless
            pageview in that case.
          </li>
          <li>
            When enabled, Google Analytics collects information such as the pages you view, how
            you arrived (for example, the referring site or search), approximate location (city
            or region derived from your IP address), device, browser, operating system, screen
            size, language, and interactions such as clicks and scrolling. Google says Google
            Analytics 4 does not log or store IP addresses (see{" "}
            <a href={GOOGLE_DATA_PRIVACY} rel="noopener noreferrer">
              Google Analytics data privacy
            </a>
            ).
          </li>
          <li>
            We have turned off Google signals and ad personalization for Google Analytics. That
            tag’s advertising consent signals stay denied, and we do not use Google Analytics data
            for advertising. The analytics choice does not replace Google’s advertising consent
            message.
          </li>
        </ul>
        <p>
          Google processes this data as a service provider. Data may be processed in the United
          States and other countries where Google operates.
        </p>
        <p>
          <strong>How to opt out.</strong> You can change your choice at any time with the{" "}
          <CookieChoicesButton /> control in the footer of every page; choosing Reject stops Google
          Analytics cookies and removes any <code>_ga</code> cookies set on this site. Your choice
          is remembered in your browser’s local storage (key <code>mtg-analytics-consent</code>),
          not in a cookie. You can also install the{" "}
          <a href={GOOGLE_OPTOUT} rel="noopener noreferrer">
            Google Analytics Opt-out Browser Add-on
          </a>{" "}
          (<a href={GOOGLE_OPTOUT} rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a>
          ), or block or delete cookies in your browser settings. The site works the same either way.
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
          second advertising consent banner.
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
          un segundo aviso de consentimiento publicitario. Las preguntas se envían por la <Link href="/contact/">página de contacto</Link>.
        </p>
        <h2 id="google-analytics-es">Analítica: Google Analytics (solo con su consentimiento)</h2>
        <p>
          El sitio también usa Google Analytics 4 (identificador de medición {GA_MEASUREMENT_ID}), un
          servicio de Google LLC, para contar visitas y ver qué páginas son útiles. El script de
          Google Analytics no está en la página hasta que pulsa Aceptar. Esa elección la hace el
          script de consentimiento de este sitio. El almacenamiento de publicidad y de analítica de
          esa etiqueta empieza denegado. En la primera visita, un aviso pregunta si acepta las
          cookies de analítica. Google AdSense es un script distinto y se describe en Publicidad.
          Este aviso no sustituye el mensaje de consentimiento publicitario de Google.
        </p>
        <p>
          Si pulsa <strong>Aceptar</strong>, el sitio carga la etiqueta de Google y Google Analytics
          puede guardar cookies propias llamadas <code>_ga</code> y <code>_ga_*</code> (Google indica
          que duran hasta dos años). Si pulsa <strong>Rechazar</strong>, o no elige, el script de
          Google no se carga y no enviamos una vista de página sin cookies. Las señales de Google y
          la personalización de anuncios están desactivadas para Google Analytics. No usamos esos
          datos para publicidad.
        </p>
        <p>
          <strong>Cómo rechazarla.</strong> Puede cambiar la elección en cualquier momento con el
          control de opciones de cookies en el pie de cada página. Rechazar detiene las cookies de
          Google Analytics y borra las cookies <code>_ga</code> de este sitio. La elección se guarda
          en el almacenamiento local del navegador (clave <code>mtg-analytics-consent</code>), no en
          una cookie. También puede instalar el complemento de inhabilitación en{" "}
          <a href={GOOGLE_OPTOUT} rel="noopener noreferrer">
            https://tools.google.com/dlpage/gaoptout
          </a>{" "}
          o bloquear las cookies en el navegador. El sitio funciona igual.
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
          das AdSense-Skript. Diese Website fügt kein zweites Banner für Werbe-Cookies hinzu. Fragen gehen über die{" "}
          <Link href="/contact/">Kontaktseite</Link>.
        </p>
        <h2 id="google-analytics-de">Analyse: Google Analytics (nur mit Ihrer Einwilligung)</h2>
        <p>
          Die Website nutzt außerdem Google Analytics 4 (Mess-ID {GA_MEASUREMENT_ID}), einen Dienst
          von Google LLC, um Besuche zu zählen und zu sehen, welche Seiten nützlich sind. Das Skript
          von Google Analytics ist erst auf der Seite, wenn Sie auf Akzeptieren klicken. Diese Wahl
          trifft das Einwilligungsskript dieser Website. Werbe- und Analyse-Speicher für dieses Tag
          starten auf abgelehnt. Beim ersten Besuch fragt ein Hinweis, ob Sie Analyse-Cookies
          akzeptieren. Google AdSense ist ein eigenes Skript und unter Werbung beschrieben. Dieser
          Hinweis ersetzt nicht die Werbe-Einwilligung von Google.
        </p>
        <p>
          Wenn Sie <strong>Akzeptieren</strong> wählen, lädt die Website das Google-Tag, und Google
          Analytics kann eigene Cookies namens <code>_ga</code> und <code>_ga_*</code> setzen (Google
          nennt eine Dauer von bis zu zwei Jahren). Wenn Sie <strong>Ablehnen</strong> wählen oder
          keine Wahl treffen, wird das Google-Skript nicht geladen und es wird kein Seitenaufruf ohne
          Cookies gesendet. Google-Signale und Anzeigenpersonalisierung sind für Google Analytics
          ausgeschaltet. Diese Daten werden nicht für Werbung verwendet.
        </p>
        <p>
          <strong>Widerspruch.</strong> Sie können die Wahl jederzeit über die Cookie-Auswahl in der
          Fußzeile jeder Seite ändern. Ablehnen stoppt die Google-Analytics-Cookies und löscht auf
          dieser Website gesetzte <code>_ga</code>-Cookies. Die Wahl steht im lokalen Speicher des
          Browsers (Schlüssel <code>mtg-analytics-consent</code>), nicht in einem Cookie. Sie können
          auch das Browser-Add-on unter{" "}
          <a href={GOOGLE_OPTOUT} rel="noopener noreferrer">
            https://tools.google.com/dlpage/gaoptout
          </a>{" "}
          installieren oder Cookies im Browser blockieren. Die Website funktioniert genauso.
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
          n’ajoute pas un second bandeau de consentement publicitaire. Les questions passent par la{" "}
          <Link href="/contact/">page de contact</Link>.
        </p>
        <h2 id="google-analytics-fr">Analytique : Google Analytics (uniquement avec votre consentement)</h2>
        <p>
          Le site utilise aussi Google Analytics 4 (identifiant de mesure {GA_MEASUREMENT_ID}), un
          service de Google LLC, pour compter les visites et voir quelles pages sont utiles. Le
          script Google Analytics n’est pas sur la page tant que vous n’avez pas cliqué sur Accepter.
          Ce choix est fait par le script de consentement de ce site. Le stockage publicitaire et
          analytique de cette balise commence refusé. À la première visite, un bandeau demande si
          vous acceptez les cookies d’analytique. Google AdSense est un script distinct, décrit sous
          Publicité. Ce bandeau ne remplace pas le message de consentement publicitaire de Google.
        </p>
        <p>
          Si vous cliquez sur <strong>Accepter</strong>, le site charge la balise Google et Google
          Analytics peut déposer des cookies internes nommés <code>_ga</code> et <code>_ga_*</code>{" "}
          (Google indique une durée allant jusqu’à deux ans). Si vous cliquez sur <strong>Refuser</strong>,
          ou si vous ne choisissez pas, le script Google n’est pas chargé et aucune page vue sans
          cookies n’est envoyée. Les signaux Google et la personnalisation des annonces sont
          désactivés pour Google Analytics. Ces données ne servent pas à la publicité.
        </p>
        <p>
          <strong>Comment refuser.</strong> Vous pouvez changer votre choix à tout moment avec le
          contrôle des cookies dans le pied de chaque page. Refuser arrête les cookies Google
          Analytics et supprime les cookies <code>_ga</code> déposés sur ce site. Le choix est
          mémorisé dans le stockage local du navigateur (clé <code>mtg-analytics-consent</code>), pas
          dans un cookie. Vous pouvez aussi installer le module de désactivation à{" "}
          <a href={GOOGLE_OPTOUT} rel="noopener noreferrer">
            https://tools.google.com/dlpage/gaoptout
          </a>{" "}
          ou bloquer les cookies dans le navigateur. Le site fonctionne de la même façon.
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
          secondo avviso di consenso pubblicitario. Le domande vanno inviate dalla <Link href="/contact/">pagina dei contatti</Link>.
        </p>
        <h2 id="google-analytics-it">Analisi: Google Analytics (solo con il tuo consenso)</h2>
        <p>
          Il sito usa anche Google Analytics 4 (ID misurazione {GA_MEASUREMENT_ID}), un servizio di
          Google LLC, per contare le visite e capire quali pagine sono utili. Lo script di Google
          Analytics non è nella pagina finché non clicchi Accetta. Questa scelta la fa lo script di
          consenso di questo sito. L’archiviazione pubblicitaria e analitica di quel tag parte come
          negata. Alla prima visita, un avviso chiede se accetti i cookie di analisi. Google AdSense
          è uno script separato ed è descritto in Pubblicità. Questo avviso non sostituisce il
          messaggio di consenso pubblicitario di Google.
        </p>
        <p>
          Se clicchi <strong>Accetta</strong>, il sito carica il tag di Google e Google Analytics può
          impostare cookie proprietari chiamati <code>_ga</code> e <code>_ga_*</code> (Google indica
          una durata fino a due anni). Se clicchi <strong>Rifiuta</strong>, o non scegli, lo script
          di Google non viene caricato e non inviamo una visualizzazione di pagina senza cookie. I
          segnali Google e la personalizzazione degli annunci sono disattivati per Google Analytics.
          Non usiamo questi dati per la pubblicità.
        </p>
        <p>
          <strong>Come rifiutare.</strong> Puoi cambiare la scelta in qualsiasi momento con il
          controllo dei cookie nel piè di ogni pagina. Rifiuta ferma i cookie di Google Analytics e
          cancella i cookie <code>_ga</code> impostati su questo sito. La scelta resta nella memoria
          locale del browser (chiave <code>mtg-analytics-consent</code>), non in un cookie. Puoi anche
          installare il componente aggiuntivo di disattivazione su{" "}
          <a href={GOOGLE_OPTOUT} rel="noopener noreferrer">
            https://tools.google.com/dlpage/gaoptout
          </a>{" "}
          oppure bloccare i cookie nel browser. Il sito funziona allo stesso modo.
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
          dodaje drugiego banera zgody na reklamy. Pytania należy wysyłać przez{" "}
          <Link href="/contact/">stronę kontaktową</Link>.
        </p>
        <h2 id="google-analytics-pl">Analityka: Google Analytics (tylko za zgodą)</h2>
        <p>
          Serwis używa także Google Analytics 4 (identyfikator pomiaru {GA_MEASUREMENT_ID}), usługi
          Google LLC, aby liczyć odwiedziny i sprawdzać, które strony są przydatne. Skrypt Google
          Analytics nie jest na stronie, dopóki nie klikniesz Akceptuj. Tego wyboru dokonuje skrypt
          zgody tego serwisu. Przechowywanie danych reklamowych i analitycznych dla tego tagu startuje
          jako odrzucone. Przy pierwszej wizycie baner pyta, czy akceptujesz pliki cookie analityki.
          Google AdSense to osobny skrypt, opisany w części Reklama. Ten baner nie zastępuje
          komunikatu zgody reklamowej Google.
        </p>
        <p>
          Po kliknięciu <strong>Akceptuj</strong> serwis ładuje tag Google, a Google Analytics może
          ustawić własne pliki cookie <code>_ga</code> i <code>_ga_*</code> (Google podaje czas do
          dwóch lat). Po kliknięciu <strong>Odrzuć</strong> albo bez wyboru skrypt Google nie jest
          ładowany i nie wysyłamy odsłony bez plików cookie. Sygnały Google i personalizacja reklam są
          wyłączone dla Google Analytics. Tych danych nie używamy do reklam.
        </p>
        <p>
          <strong>Jak zrezygnować.</strong> Wybór można zmienić w każdej chwili linkiem ustawień
          cookies w stopce każdej strony. Odrzucenie zatrzymuje pliki cookie Google Analytics i usuwa
          pliki <code>_ga</code> ustawione na tej stronie. Wybór jest pamiętany w pamięci lokalnej
          przeglądarki (klucz <code>mtg-analytics-consent</code>), nie w pliku cookie. Można też
          zainstalować dodatek wyłączający Google Analytics ze strony{" "}
          <a href={GOOGLE_OPTOUT} rel="noopener noreferrer">
            https://tools.google.com/dlpage/gaoptout
          </a>{" "}
          albo zablokować pliki cookie w przeglądarce. Serwis działa tak samo.
        </p>
        <h2>European Economic Area, including Spain, and the United Kingdom</h2>
        <p>
          If the EU or UK General Data Protection Regulation applies to you, {SITE.legalName} is the
          controller for personal information we process, such as contact form messages you send us. The legal basis
          is our legitimate interest in answering that message and in publishing a free information
          site, and your decision to write to us. For Google Analytics, the legal basis is your consent,
          which you give by clicking Accept and can withdraw through the cookie-choices control in the
          footer. Hosting logs are processed by GitHub, and contact form messages by FormSubmit. Google
          processes analytics data when you have accepted it. You may ask
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
          shows to visitors in the European Economic Area, the United Kingdom, and Switzerland, and
          from the analytics choice stored in this browser.
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
