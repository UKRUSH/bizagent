import { LegalPage, legalMetadata } from "@/components/trust/LegalPage";

export const metadata = legalMetadata("terms");

/** Approved service terms (spec 5). Returns 404 until approved text is added to content/legal.ts. */
export default function TermsPage() {
  return <LegalPage slug="terms" />;
}
