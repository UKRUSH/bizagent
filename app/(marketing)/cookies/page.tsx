import { LegalPage, legalMetadata } from "@/components/trust/LegalPage";

export const metadata = legalMetadata("cookies");

/**
 * Cookie explanation (spec 5, 21). Returns 404 until approved text exists. The site
 * currently sets no cookies and loads no optional scripts, so no preference categories are
 * invented.
 */
export default function CookiesPage() {
  return <LegalPage slug="cookies" />;
}
