import type { MetadataRoute } from "next";
import { absoluteUrl, indexingAllowed } from "@/lib/seo";

/** Crawling is blocked until SITE_INDEXING=true (spec 16); APIs and receipts are never crawled. */
export default function robots(): MetadataRoute.Robots {
  if (!indexingAllowed()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
