import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  agentDepartments,
  agenticFaqs,
  agenticHero,
  agenticSteps,
  automationCapabilities,
  customAgents,
  systemFlow,
  systemPrinciples,
  whatIsAgentic,
} from "@/content/agenticSolutions";
import { AgentDashboard } from "@/components/agentic/AgentDashboard";
import { AgentDepartments } from "@/components/agentic/AgentDepartments";
import { AgentNetwork } from "@/components/agentic/AgentNetwork";
import { OrchestrationDemo } from "@/components/agentic/OrchestrationDemo";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ArrowRightIcon,
  BarChartIcon,
  CheckIcon,
  CloseIcon,
  FileIcon,
  LayersIcon,
  MessageIcon,
  PhoneIcon,
  PlugIcon,
  SearchIcon,
  SlidersIcon,
  SparkIcon,
  UsersIcon,
  WorkflowIcon,
  WrenchIcon,
} from "@/components/ui/icons";
import styles from "@/components/agentic/agentic.module.css";

export const metadata: Metadata = {
  title: "Agentic Solutions — AI Agents for Business Automation",
  description:
    "AI agents that understand your goals, plan the work and carry out approved actions across sales, marketing, support, HR, finance, operations and IT, with your team in control.",
  alternates: { canonical: "/agentic-solutions" },
};

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

/** Decorative icon per capability card, keyed by its title. */
const capabilityIcons: Record<string, Icon> = {
  "Business Process Automation": WorkflowIcon,
  "AI Workflow Management": SlidersIcon,
  "Intelligent Task Execution": CheckIcon,
  "Multi-Agent Collaboration": UsersIcon,
  "Customer Communication Automation": MessageIcon,
  "AI Document Processing": FileIcon,
  "Business Data Analysis": SearchIcon,
  "Automated Reporting": BarChartIcon,
  "CRM / ERP Integration": PlugIcon,
  "WhatsApp AI Automation": MessageIcon,
  "AI Voice Agent Integration": PhoneIcon,
  "Custom AI Agent Development": WrenchIcon,
};

/** AI agents that plan and carry out approved business work (Agentic Solutions). */
export default function AgenticSolutionsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Agentic Solutions" }]}
        eyebrow={agenticHero.eyebrow}
        title={agenticHero.title}
        actions={
          <>
            <Link href="#departments" className="button">
              Explore AI Solutions
              <ArrowRightIcon width="18" height="18" />
            </Link>
            <Link href="/book-demo" className="button button--secondary">
              Build Your AI System
            </Link>
          </>
        }
        aside={<AgentNetwork />}
      >
        <p>{agenticHero.text}</p>
        <ul className={styles.heroPoints}>
          {agenticHero.points.map((point) => (
            <li key={point}>
              <CheckIcon width="16" height="16" />
              {point}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section" aria-labelledby="what-title">
        <div className="container">
          <SectionHeading id="what-title" eyebrow="What is Agentic Solutions?" title={whatIsAgentic.title}>
            {whatIsAgentic.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </SectionHeading>

          <ol className={styles.abilities}>
            {whatIsAgentic.abilities.map((ability, index) => (
              <li key={ability.title}>
                <span className={styles.abilityNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{ability.title}</h3>
                <p>{ability.description}</p>
              </li>
            ))}
          </ol>

          <div className={styles.comparison}>
            <div className={styles.compareChatbot}>
              <h3>{whatIsAgentic.comparison.chatbot.title}</h3>
              <ul>
                {whatIsAgentic.comparison.chatbot.items.map((item) => (
                  <li key={item}>
                    <CloseIcon width="16" height="16" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.compareAgent}>
              <h3>{whatIsAgentic.comparison.agent.title}</h3>
              <ul>
                {whatIsAgentic.comparison.agent.items.map((item) => (
                  <li key={item}>
                    <CheckIcon width="16" height="16" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="departments" className="section section--muted" aria-labelledby="departments-title">
        <div className="container">
          <SectionHeading id="departments-title" eyebrow="AI agent departments" title="An AI agent for every department.">
            <p>Choose a department to see what its agent does, what it connects to and what always waits for your team.</p>
          </SectionHeading>
          <AgentDepartments departments={agentDepartments} />
        </div>
      </section>

      <section className={`section ${styles.systemSection}`} aria-labelledby="system-title">
        <div className="container">
          <SectionHeading id="system-title" eyebrow="Complete business automation system" title="Many agents. One connected system.">
            <p>
              A central AI Manager takes your request, plans the work and delegates each task to the right
              specialised agent. Every agent shares the same business context, and you approve what matters.
            </p>
          </SectionHeading>

          <ol className={styles.flow} aria-label="How a request moves through the system">
            {systemFlow.map((stage, index) => (
              <li key={stage.title}>
                <span className={styles.flowNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <strong>{stage.title}</strong>
                <span>{stage.description}</span>
              </li>
            ))}
          </ol>

          <div className={styles.systemGrid}>
            <div>
              <h3 className={styles.systemSubhead}>What makes it one system</h3>
              <ul className={styles.principles}>
                {systemPrinciples.map((principle) => (
                  <li key={principle.title}>
                    <LayersIcon width="20" height="20" aria-hidden="true" />
                    <span>
                      <strong>{principle.title}</strong>
                      {principle.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.systemSubhead}>See one request, step by step</h3>
              <OrchestrationDemo />
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading id="capabilities-title" eyebrow="AI automation capabilities" title="Everything your AI agents can take on.">
            <p>Combine capabilities to fit your business. Connections and channels are confirmed for your setup.</p>
          </SectionHeading>
          <ul className={styles.capabilities}>
            {automationCapabilities.map((capability) => {
              const CapabilityIcon = capabilityIcons[capability.title] ?? SparkIcon;
              return (
                <li key={capability.title} className={`card card--interactive ${styles.capability}`}>
                  <span className="card-icon" aria-hidden="true">
                    <CapabilityIcon width="22" height="22" />
                  </span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                  {capability.href && (
                    <Link href={capability.href} className={styles.capabilityLink}>
                      Learn more<span className="sr-only"> about {capability.title}</span>
                      <ArrowRightIcon width="16" height="16" />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="dashboard-title">
        <div className="container">
          <SectionHeading id="dashboard-title" eyebrow="AI dashboard preview" title="See every agent at work, in one place.">
            <p>
              Agent status, active and completed tasks, approvals, workflows, activity logs and reports.
              Try approving the pending task.
            </p>
          </SectionHeading>
          <AgentDashboard />
        </div>
      </section>

      <section className="section" aria-labelledby="how-title">
        <div className="container">
          <SectionHeading id="how-title" eyebrow="How it works" title="From your business to working AI agents in four steps." />
          <ol className={styles.howSteps}>
            {agenticSteps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.howNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="custom-agents" className="section section--muted" aria-labelledby="custom-agents-title">
        <div className="container">
          <div className={styles.customPanel}>
            <div>
              <span className={`eyebrow ${styles.customEyebrow}`}>Custom AI agent development</span>
              <h2 id="custom-agents-title">{customAgents.title}</h2>
              <p>{customAgents.text}</p>
              <Link href="/book-demo" className="button button--white">
                {customAgents.cta}
                <ArrowRightIcon width="18" height="18" />
              </Link>
            </div>
            <ul className={styles.customList} aria-label="Examples of custom AI agents">
              {customAgents.examples.map((example) => (
                <li key={example.title}>
                  {example.href ? (
                    <Link href={example.href}>
                      {example.title}
                      <ArrowRightIcon width="16" height="16" />
                    </Link>
                  ) : (
                    <span>{example.title}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="agentic-faq-title">
        <div className="container">
          <SectionHeading id="agentic-faq-title" title="Questions about AI agents." />
          <FaqList questions={agenticFaqs} />
        </div>
      </section>

      <CtaBand
        id="agentic-cta-title"
        title="Ready to put AI agents to work?"
        text="Tell us how your business runs today. We'll show you where AI agents can take on the work, and where your team stays in control."
        action={{ href: "/book-demo", label: "Build Your AI System" }}
      />
    </>
  );
}
