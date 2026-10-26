import { HubChooser } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("il", "chooser");

export default function Page() {
  return <HubChooser code="il" />;
}
