import { HubElections } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("se", "elections");

export default function Page() {
  return <HubElections code="se" />;
}
