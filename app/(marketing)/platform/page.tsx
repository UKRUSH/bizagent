import type { Metadata } from "next";
import Link from "next/link";
import { deploymentOptions } from "@/content/deployment";
import { escalationTriggers, handoffContext, handoffTypes } from "@/content/handoff";
import { integrationStatusLabels } from "@/content/integrations";
import { platformChannels, platformInterfaces, sharedLayer } from "@/content/platform";
import { ArchitectureDiagram } from "@/components/features/ArchitectureDiagram";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { CheckIcon } from "@/components/ui/icons";
import styles from "@/components/features/features.module.css";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "How BizMaster AI Agent connects phone and WhatsApp channels, business knowledge, workflows, your CRM and human handoff on one shared platform.",
  alternates: { canonical: "/platform" },
};

/** How the platform works (spec 5: channels, shared knowledge, workflows, CRM, handoff). */
export default function PlatformPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Platform" }]}
        eyebrow="Platform"
        title="One shared platform behind every conversation."
        actions={
          <>
            <Link href="/book-demo" className="button">
              Discuss My Workflow
            </Link>
            <Link href="/features" className="button button--secondary">
              Explore features
            </Link>
          </>
        }
      >
        <p>
          Calls, WhatsApp messages and follow-ups run on the same knowledge, the same customer
          history and the same handoff rules. Whichever channel a customer uses, your team sees one
          conversation and one record.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="channels-title">
        <div className="container">
          <SectionHeading id="channels-title" title="Every channel, one conversation.">
            <p>Channel availability depends on your numbers, region and provider eligibility, confirmed during onboarding.</p>
          </SectionHeading>
          <div className="grid-3">
            {platformChannels.map((channel) => (
              <article key={channel.title} className="card" aria-label={channel.title}>
                <h3>{channel.title}</h3>
                <p>{channel.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="architecture-title">
        <div className="container">
          <SectionHeading id="architecture-title" title="How a conversation moves through the platform.">
            <p>The assistant answers and acts, but only within the rules you set. Anything that needs judgement goes to a person first.</p>
          </SectionHeading>
          <ArchitectureDiagram />
        </div>
      </section>

      <section className="section" aria-labelledby="layer-title">
        <div className="container">
          <SectionHeading id="layer-title" title="The shared layer every module uses." />
          <div className={styles.layerGrid}>
            {sharedLayer.map((component) => (
              <article key={component.title} className="card" aria-label={component.title}>
                <h3>{component.title}</h3>
                <p>{component.description}</p>
              </article>
            ))}
          </div>
          <div className={styles.subsection}>
            <SectionHeading id="interfaces-title" title="Three interfaces." />
          </div>
          <div className="grid-3">
            {platformInterfaces.map((item) => (
              <article key={item.title} className="card" aria-label={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="handoff-title">
        <div className={`container ${styles.twoColumn}`}>
          <div>
            <h2 id="handoff-title">When a person takes over</h2>
            <ul className="check-list" aria-label="Escalation triggers">
              {escalationTriggers.map((trigger) => (
                <li key={trigger}>
                  <CheckIcon width="18" height="18" />
                  {trigger}
                </li>
              ))}
            </ul>
            <h3>What your team receives</h3>
            <ul className="feature-list">
              {handoffContext.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="handoff-types-title">How the handover happens</h2>
            <dl className={styles.handoffTypes} aria-labelledby="handoff-types-title">
              {handoffTypes.map((type) => (
                <div key={type.name}>
                  <dt>{type.name}</dt>
                  <dd>{type.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="deployment-title">
        <div className="container">
          <SectionHeading id="deployment-title" title="Ways to deploy.">
            <p>
              Start standalone, add the assistant to the systems you already run, or design
              something custom. Options are confirmed against your requirements.
            </p>
          </SectionHeading>
          <div className={styles.layerGrid}>
            {deploymentOptions.map((option) => (
              <article key={option.slug} className="card" aria-labelledby={`deploy-${option.slug}`}>
                <h3 id={`deploy-${option.slug}`}>{option.title}</h3>
                <p>{option.description}</p>
                <p>
                  <strong>Best for:</strong> {option.bestFor}
                </p>
                <StatusBadge label={integrationStatusLabels[option.availability]} />
              </article>
            ))}
          </div>
          <p className={styles.diagramNote}>
            Need private connectivity, your own cloud or white-label?{" "}
            <Link href="/enterprise">See enterprise options</Link>.
          </p>
        </div>
      </section>

      <CtaBand
        id="platform-cta-title"
        title="Let’s map your workflow."
        text="Tell us which channels you use, which systems hold your customer data, and where your team needs to stay involved."
        action={{ href: "/book-demo", label: "Discuss My Workflow" }}
      />
    </>
  );
}
