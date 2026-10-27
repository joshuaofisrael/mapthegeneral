import { IlKnessetGuide, ilKnessetMetadata } from "@/components/IlKnessetGuide";

export const metadata = ilKnessetMetadata("he");

export default function Page() {
  return <IlKnessetGuide lang="he" />;
}
