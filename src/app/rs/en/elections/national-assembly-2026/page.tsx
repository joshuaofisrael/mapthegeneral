import { HubElection } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("rs", "election");

export default function Page() {
  return <HubElection code="rs" />;
}
