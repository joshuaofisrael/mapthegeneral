import { HubElection } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("kg", "election");

export default function Page() {
  return <HubElection code="kg" />;
}
