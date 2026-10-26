import { IlResultsPage, ilResultsMetadata } from "@/components/IlResultsPage";

export const metadata = ilResultsMetadata("en");

export default function Page() {
  return <IlResultsPage lang="en" />;
}
