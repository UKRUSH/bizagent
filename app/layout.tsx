import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { getSiteUrl, indexingAllowed } from "@/lib/seo";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";
import "./ui-polish.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// SITE_URL is the configured production domain (spec 16, 21). Indexing stays off until
// SITE_INDEXING=true, so draft content and draft prices are never crawled by accident.
export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `${siteConfig.productName} | Calls, WhatsApp and Follow-Ups`,
    template: `%s | ${siteConfig.productName}`,
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.productName,
  robots: indexingAllowed() ? undefined : { index: false, follow: false },
  // No shared og:title/description: pages would inherit them. Platforms fall back to each
  // page's <title> and description; the image comes from app/opengraph-image.tsx.
  openGraph: { type: "website", siteName: siteConfig.productName, locale: "en" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#5d0e8b",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior lets Next.js turn smooth scrolling off during route changes, so
    // new pages start at the top instantly while in-page anchor links still scroll smoothly.
    <html lang="en" data-theme="light" data-scroll-behavior="smooth" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
