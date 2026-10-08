import type { Metadata } from "next";
import Link from "next/link";
import { demoDisclosure } from "@/content/demo-scenarios";
import { DemoPlayer } from "@/components/demo/DemoPlayer";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Illustrative Demo",
  description:
    "Play fictional conversations by industry, role and channel to see how the assistant answers and what it hands to your team. Nothing is sent.",
  alternates: { canonical: "/demo" },
};

/** Optional guided preview (spec 5 /demo, 13). A live demo is a separate, consented workflow. */
export default function DemoPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Illustrative demo" }]}
        eyebrow={demoDisclosure}
        title="See a conversation from start to handoff."
      >
        <p>
          Choose a scenario, a role and a channel, then play the conversation. Every name and detail
          is fictional, and nothing leaves this page: no calls, messages, bookings or payments.
        </p>
      </PageHero>

      <section className="section" aria-label="Interactive preview">
        <div className="container">
          <DemoPlayer />
          <p className="muted prose" style={{ marginTop: "var(--space-8)" }}>
            Pre-scripted examples show how a conversation can flow; they are not a measure of live
            response times or performance. <Link href="/platform">See how the platform works</Link>.
          </p>
        </div>
      </section>

      <CtaBand
        id="demo-cta-title"
        title="See it with your own workflow."
        text="A live demo uses your channels, your questions and your handoff rules."
        action={{ href: "/book-demo", label: "Request Live Demo" }}
      />
    </>
  );
}
