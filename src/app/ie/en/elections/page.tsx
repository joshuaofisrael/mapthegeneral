import { HubElections } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("ie", "elections");

export default function Page() {
  return <HubElections code="ie" />;
}
