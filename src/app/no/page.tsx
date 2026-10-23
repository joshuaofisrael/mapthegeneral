import { HubChooser } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("no", "chooser");

export default function Page() {
  return <HubChooser code="no" />;
}
