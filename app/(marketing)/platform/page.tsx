import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { deploymentOptions } from "@/content/deployment";
import { escalationTriggers, handoffContext, handoffTypes } from "@/content/handoff";
import { integrationStatusLabels } from "@/content/integrations";
import { platformChannels, platformInterfaces, sharedLayer } from "@/content/platform";
import { ArchitectureDiagram } from "@/components/features/ArchitectureDiagram";
import { deploymentIcons } from "@/components/platform/deploymentIcons";
import { PlatformHub } from "@/components/platform/PlatformHub";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  CheckIcon,
  HeadsetIcon,
  MailIcon,
  MessageIcon,
  MicIcon,
  MonitorIcon,
  PhoneIcon,
  PhoneOutgoingIcon,
  PlugIcon,
  ShieldIcon,
  SlidersIcon,
  SparkIcon,
  UserCheckIcon,
  UsersIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import styles from "@/components/features/features.module.css";
import p from "@/components/platform/platform.module.css";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "How BizMaster AI Agent connects phone and WhatsApp channels, business knowledge, workflows, your CRM and human handoff on one shared platform.",
  alternates: { canonical: "/platform" },
};

/** Decorative icons keyed by the content titles; a missing key simply shows no icon. */
const icons: Record<string, ReactNode> = {
  "Inbound phone calls": <PhoneIcon />,
  "Outbound phone calls": <PhoneOutgoingIcon />,
  "WhatsApp messaging": <MessageIcon />,
  "WhatsApp voice": <MicIcon />,
  "Desk phones (PBX)": <HeadsetIcon />,
  "SMS and email": <MailIcon />,
  "Voice engine": <MicIcon />,
  "AI orchestration": <SparkIcon />,
  "Workflow automation": <WorkflowIcon />,
  "Customer records": <UsersIcon />,
  Integrations: <PlugIcon />,
  "Admin console": <SlidersIcon />,
  "Handoff and approvals": <UserCheckIcon />,
  "Security controls": <ShieldIcon />,
  "Voice interface": <PhoneIcon width={26} height={26} />,
  "Messaging interface": <MessageIcon width={26} height={26} />,
  "Admin interface": <MonitorIcon width={26} height={26} />,
  ...Object.fromEntries(Object.entries(deploymentIcons).map(([slug, Icon]) => [slug, <Icon key={slug} />])),
};

function CardIcon({ name }: { name: string }) {
  return icons[name] ? <div className="card-icon">{icons[name]}</div> : null;
}

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
        aside={<PlatformHub />}
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
              <article key={channel.title} className={`card ${p.channelCard}`} aria-label={channel.title}>
                <CardIcon name={channel.title} />
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
              <article key={component.title} className={`card ${p.layerCard}`} aria-label={component.title}>
                <CardIcon name={component.title} />
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
              <article key={item.title} className={`card ${p.interfaceCard}`} aria-label={item.title}>
                {icons[item.title] && <div className={p.interfaceIcon}>{icons[item.title]}</div>}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="handoff-title">
        <div className={`container ${styles.twoColumn}`}>
          <div className={`card ${p.panel}`}>
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
            <ul className={p.chips}>
              {handoffContext.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 id="handoff-types-title" className={p.typesHeading}>
              How the handover happens
            </h2>
            <dl className={p.types} aria-labelledby="handoff-types-title">
              {handoffTypes.map((type) => (
                <div key={type.name} className={p.type}>
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
              <article key={option.slug} className={`card ${p.deployCard}`} aria-labelledby={`deploy-${option.slug}`}>
                <CardIcon name={option.slug} />
                <h3 id={`deploy-${option.slug}`}>{option.title}</h3>
                <p>{option.description}</p>
                <p className={p.bestFor}>
                  <strong>Best for:</strong> {option.bestFor}
                </p>
                <div className={p.deployFooter}>
                  <StatusBadge label={integrationStatusLabels[option.availability]} />
                </div>
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
