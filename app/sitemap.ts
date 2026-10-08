import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { publishedLegalSlugs } from "@/content/legal";
import { modules } from "@/content/modules";
import { roles } from "@/content/roles";
import { absoluteUrl } from "@/lib/seo";

/**
 * Published routes only (spec 5, 16): no /thank-you, no API routes, and legal pages only
 * once approved text exists. lastModified is omitted rather than invented.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/platform",
    "/features",
    ...modules.map((entry) => `/features/${entry.slug}`),
    ...roles.map((role) => role.href),
    "/enterprise",
    "/whatsapp-ai",
    "/pricing",
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
