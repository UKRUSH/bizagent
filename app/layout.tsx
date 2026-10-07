import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// SITE_URL is the configured production domain (spec 16, 21). Indexing stays off until
// SITE_INDEXING=true, so draft content and draft prices are never crawled by accident.
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const allowIndexing = process.env.SITE_INDEXING === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteConfig.productName} | Calls, WhatsApp and Follow-Ups`,
    template: `%s | ${siteConfig.productName}`,
  },
  description: siteConfig.shortDescription,
  applicationName: siteConfig.productName,
  robots: allowIndexing ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#5d0e8b",
  colorScheme: "light dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" className={inter.variable} suppressHydrationWarning>
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
