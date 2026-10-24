import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { LegalCopyrightNotice } from "@/components/LegalCopyrightNotice";
import { PageHeader } from "@/components/PageHeader";
import { CORRECTIONS } from "@/data/corrections";
import { SITE } from "@/data/legal-entity";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Copyright, content use, and corrections",
  description: `Copyright and DMCA notices for ${SITE.name}, operated by ${SITE.legalName}. Notices and correction reports go through the contact form. No affiliate or political use of the text is granted.`,
  path: "/copyright",
});

export default function CopyrightPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Copyright", path: "/copyright" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Copyright" }]} />
      <PageHeader
        eyebrow="Last updated 23 October 2026"
        title="Copyright, content use, and corrections"
        lede={`Original text on ${SITE.name} belongs to ${SITE.legalName}. Notices are sent through the contact form.`}
      />
      <div className="prose-legal">
        <h2>Copyright owner</h2>
        <p>
          {SITE.legalName}, a {SITE.entityType}, owns the copyright in the original text, tables we
          compiled, and the design of {SITE.name}, unless a page says otherwise. {SITE.brandNote}{" "}
          Business address: {SITE.location}, United States.
        </p>
        <h2>What you may do</h2>
        <ul>
          <li>Link to any page.</li>
          <li>
            Quote a short passage, with a link to the page and credit to {SITE.name}, for commentary,
            criticism, or news.
          </li>
        </ul>
        <p>You may not:</p>
        <ul>
          <li>Copy pages in bulk, or mirror the site.</li>
          <li>Present this site, or a copy of it, as an official election authority.</li>
          <li>Imply that {SITE.legalName}, a government, a party, or a candidate endorses you.</li>
          <li>Use the text or the name {SITE.name} in campaign advertising or fundraising.</li>
        </ul>
        <h2>AI-generated images</h2>
        <p>
          The country photographs on this site are AI-generated images made for {SITE.name}. Each is captioned
          “AI-generated image” on the page. They depict public places, they do not depict a real event, and they do not
          depict real people. They are not official photographs and not a record of an election. The same note is on
          the <Link href="/about/">about page</Link>.
        </p>
        <h2>Official material and licences</h2>
        <p>
          Laws, results, maps, and lists published by an election office or a parliament stay under
          that publisher’s copyright or licence. Country source pages name the licence when one was
          read. Names of public bodies are used to identify sources. That use is not a claim of
          ownership and not an endorsement.
        </p>
        <h2>People named on the site</h2>
        <p>
          Pages name a person only when an official public source shows that the person holds or seeks
          public office. The site does not name private individuals, and it does not accuse anyone of
          wrongdoing. It does not publish private addresses, phone numbers, identity numbers, dates of
          birth, or photos of private individuals. If a page names a private individual or states an
          accusation, report it through the <Link href="/contact/">contact form</Link> and name the
          page. The entry will be removed or corrected against the official source.
        </p>
        <h2 id="dmca">Copyright complaints and DMCA notices</h2>
        <p>
          If you believe material on this site infringes a copyright you own, send a notice through
          the <Link href="/contact/">contact form</Link>. There is no personal email address on this
          page. You may also post a notice to {SITE.legalName}, {SITE.location}, United States. A
          notice should include:
        </p>
        <ul>
          <li>Your name and a way to reach you (an email address you type into the form is enough).</li>
          <li>A description of the copyrighted work you claim is infringed.</li>
          <li>The exact page address on {SITE.name} of the material you want removed.</li>
          <li>A statement that you have a good-faith belief the use is not authorized.</li>
          <li>
            A statement that the notice is accurate, and that you are the owner or are authorized to
            act for the owner, under penalty of perjury.
          </li>
          <li>Your physical or electronic signature.</li>
        </ul>
        <p>
          {SITE.legalName} will review a complete notice and remove or disable access to material that
          appears to infringe. A person who sends a false notice may be liable for damages. Repeat
          infringement can end permission to use the site.
        </p>
        <p>
          If your material was removed and you believe that was a mistake, send a counter-notice
          through the same <Link href="/contact/">contact form</Link>. Include your name and contact
          details, the page address, a statement under penalty of perjury that the removal was the
          result of mistake or misidentification, and consent to the jurisdiction of the federal
          district court for the judicial district that includes {SITE.locality}, {SITE.region}. After
          a valid counter-notice, the material may be restored in not less than ten and not more than
          fourteen business days unless the complainant tells us that they have filed a court action.
        </p>
        <p>
          This process is how {SITE.name} handles copyright complaints. It is not a statement that a
          particular work is registered, and it is not legal advice.
        </p>
        <h2 id="corrections">Corrections policy</h2>
        <p>
          Election facts change, and a page can be wrong. To report an error, use the “Report an
          error” link on the page, or the <Link href="/contact/">contact form</Link>. The report link
          opens the form with that page address attached. Say what is wrong and, if you have it, the
          official source that shows the correct fact. Do not send identity documents, voter numbers,
          or ballot photos.
        </p>
        <p>What happens next:</p>
        <ul>
          <li>The report is read against the official source named on the page, or the source you cite.</li>
          <li>The page is changed when that official source shows a different fact.</li>
          <li>
            A request to match a campaign claim, an unpublished allegation, or a private complaint
            about a public record is not a correction.
          </li>
          <li>
            A material correction (a date, a name, a seat count, a result, or a legal rule) is added
            to the log below: the date, the page address, and what changed.
          </li>
          <li>A typo that does not change a fact may be fixed without a log row.</li>
        </ul>
        <h3>Corrections log</h3>
        {CORRECTIONS.length === 0 ? (
          <p>
            No corrections have been posted to this log yet. When a material error is fixed, this list
            records the date, the page address, and what changed.
          </p>
        ) : (
          <ul>
            {CORRECTIONS.map((row) => (
              <li key={`${row.date}-${row.path}`}>
                <time dateTime={row.date}>{row.date}</time>: <Link href={row.path}>{row.path}</Link>. {row.change}
              </li>
            ))}
          </ul>
        )}
        <h2>Related pages</h2>
        <p>
          <Link href="/terms/">Terms of use</Link> · <Link href="/disclaimer/">Disclaimer</Link> ·{" "}
          <Link href="/privacy/">Privacy</Link> · <Link href="/advertising/">Advertising</Link> ·{" "}
          <Link href="/contact/">Contact</Link>
        </p>
      </div>
      <LegalCopyrightNotice />
    </div>
  );
}
