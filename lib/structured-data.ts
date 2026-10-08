import { siteConfig } from "@/config/site";
import type { Question } from "@/content/types";
import { absoluteUrl } from "./seo";

/**
 * Structured data with accurate properties only (spec 16): no prices, offers, ratings,
 * review counts or partner claims. FAQ data must mirror questions visible on the page.
 */
export function homepageStructuredData(faqs: Question[]): Record<string, unknown> {
  const organizationId = `${absoluteUrl("/")}#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: siteConfig.companyName,
        url: siteConfig.corporateWebsiteUrl,
        logo: absoluteUrl("/brand/bizmaster-logo-original.png"),
      },
      {
        "@type": "SoftwareApplication",
        name: siteConfig.productName,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: siteConfig.shortDescription,
        url: absoluteUrl("/"),
        publisher: { "@id": organizationId },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
