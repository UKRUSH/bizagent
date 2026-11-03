import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { publishedLegalSlugs } from "@/content/legal";
import { modules } from "@/content/modules";
import { products } from "@/content/products";
import { roleChannelContent, roleChannelHref } from "@/content/roleChannels";
import { absoluteUrl } from "@/lib/seo";

/**
 * Published routes only (spec 5, 16): no /thank-you, no API routes, and legal pages only
 * once approved text exists. lastModified is omitted rather than invented.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/agentic-solutions",
    "/platform",
    "/features",
    ...modules.map((entry) => `/features/${entry.slug}`),
    ...roleChannelContent.map((entry) => roleChannelHref(entry.role, entry.channel)),
    "/enterprise",
    "/whatsapp-ai",
    ...products.map((product) => product.href),
    "/industries",
    ...industries.map((industry) => `/industries/${industry.slug}`),
    "/integrations",
    "/security",
    "/about",
    "/contact",
    "/book-demo",
    "/demo",
    ...publishedLegalSlugs().map((slug) => `/${slug}`),
  ];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
