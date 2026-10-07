import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Public header, skip-link target and footer shared by marketing pages and not-found. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
