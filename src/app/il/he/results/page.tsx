import { IlResultsPage, ilResultsMetadata } from "@/components/IlResultsPage";

export const metadata = ilResultsMetadata("he");

export default function Page() {
  return <IlResultsPage lang="he" />;
}
