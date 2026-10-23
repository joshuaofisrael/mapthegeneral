import Link from "@/components/AnchorLink";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ReportedPageNote } from "@/components/ReportedPageNote";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/data/legal-entity";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${SITE.name}, a brand of ${SITE.legalName}, with the contact form. Error reports and copyright notices are welcome.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Contact" }]} />
      <PageHeader
        eyebrow="Contact"
        title={`Contact ${SITE.name}`}
        lede={`${SITE.name} is owned and operated by ${SITE.legalName}.`}
      />
      <div className="prose-legal">
        <p>
          Use the form below. It reaches {SITE.legalName}. We reply by email. The site does not
          publish a personal email address.
        </p>
        <h2>Contact form</h2>
        <ContactForm />
        <p>
          {SITE.legalName}
          <br />
          {SITE.location}
        </p>
        <h2>Error reports</h2>
        <p>
          Error reports are welcome. Use the form. Include the page address and what should be corrected, with a
          source if you have one. Material corrections are logged on the{" "}
          <Link href="/copyright/#corrections">copyright page</Link>.
        </p>
        <Suspense fallback={null}>
          <ReportedPageNote />
        </Suspense>
        <h2>Election questions</h2>
        <p>
          We are not an election office. Confirm dates, lists, and results with the official office
          named on the page.
        </p>
        <p>
          See the <Link href="/terms/">terms of use</Link>, <Link href="/disclaimer/">disclaimer</Link>,{" "}
          <Link href="/privacy/">privacy policy</Link>, <Link href="/copyright/">copyright and corrections</Link>,
          and <Link href="/advertising/">advertising disclosure</Link>.
        </p>
      </div>
    </div>
  );
}
