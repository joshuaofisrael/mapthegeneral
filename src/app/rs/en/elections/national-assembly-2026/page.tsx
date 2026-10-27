import { RsParliamentPage, rsParliamentMetadata } from "@/components/RsParliamentPage";

export const metadata = rsParliamentMetadata("en");

export default function Page() {
  return <RsParliamentPage lang="en" />;
}
