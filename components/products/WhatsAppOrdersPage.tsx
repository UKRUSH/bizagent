import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { moduleAvailabilityLabels } from "@/content/modules";
import { previewDisclosure } from "@/content/previews";
import type { Product, ProductIcon } from "@/content/types";
import {
  alwaysOn,
  audienceLine,
  closingStatement,
  customAgent,
  extraConnections,
  heroAgents,
  heroBoardTags,
  heroKicker,
  heroLocalLine,
  heroStats,
  manualVersusAgent,
  notAnIvr,
  orderIndustries,
  orderIntegrations,
} from "@/content/whatsappOrders";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  ArrowRightIcon,
  BarChartIcon,
  BoxIcon,
  CheckIcon,
  ClockIcon,
  CloseIcon,
  GlobeIcon,
  MegaphoneIcon,
  MessageIcon,
  PhoneIcon,
  PhoneOutgoingIcon,
  PlugIcon,
  RefreshIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingBagIcon,
  SlidersIcon,
  SparkIcon,
  TrendingUpIcon,
  UsersIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import roleStyles from "@/components/solutions/solutions.module.css";
import whatsappStyles from "@/components/whatsapp/whatsapp.module.css";
import productStyles from "./products.module.css";
import styles from "./orders.module.css";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const icons: Record<ProductIcon, Icon> = {
  message: MessageIcon,
  box: BoxIcon,
  bag: ShoppingBagIcon,
  trending: TrendingUpIcon,
  refresh: RefreshIcon,
  chart: BarChartIcon,
  plug: PlugIcon,
  users: UsersIcon,
  workflow: WorkflowIcon,
  shield: ShieldIcon,
  search: SearchIcon,
  sliders: SlidersIcon,
  globe: GlobeIcon,
  spark: SparkIcon,
  phone: PhoneIcon,
  outgoing: PhoneOutgoingIcon,
  megaphone: MegaphoneIcon,
  clock: ClockIcon,
};

const notAnIvrIcons: Icon[] = [ClockIcon, UsersIcon, PhoneIcon, PhoneOutgoingIcon];

/** Sinhala text; lang lets screen readers and fonts switch correctly. */
function Si({ children, className }: { children: string; className?: string }) {
  return (
    <span lang="si" className={`${styles.si} ${className ?? ""}`}>
      {children}
    </span>
  );
}

/** Hero mockup: fictional agents at work and a live order board (spec 4.2: labelled demo). */
function AgentBoard() {
  return (
    <figure className={styles.board} aria-labelledby="agent-board-caption">
      <div className={styles.boardHeader}>
        <span className={styles.online}>
          <span className={styles.pulse} aria-hidden="true" />
          AI agents online
        </span>
        <span className={styles.demoBadge}>Illustrative demo</span>
      </div>
      <ul className={styles.agents}>
        {heroAgents.map((agent) => {
          const AgentIcon = icons[agent.icon];
          return (
            <li key={agent.label}>
              <span className={styles.agentIcon} aria-hidden="true">
                <AgentIcon width="18" height="18" />
              </span>
              <span>
                <span className={styles.agentLabel}>{agent.label}</span>
                <strong>{agent.status}</strong>
                <span className={styles.agentDetail}>{agent.detail}</span>
              </span>
            </li>
          );
        })}
      </ul>
      <ul className={styles.boardTags} aria-label="Order board">
        {heroBoardTags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <figcaption id="agent-board-caption" className={styles.boardCaption}>
        {previewDisclosure}. Orders and details are fictional.
      </figcaption>
    </figure>
  );
}

/** The product's fictional order chat, in the shared WhatsApp phone frame. */
function OrderChat({ preview }: { preview: Product["preview"] }) {
  return (
    <div className={whatsappStyles.preview}>
      <figure className={whatsappStyles.screen} aria-labelledby="order-chat-caption">
        <div className={whatsappStyles.header}>
          <span className={whatsappStyles.channel}>
            <span className={whatsappStyles.avatar} aria-hidden="true">
              <MessageIcon />
              <span className={whatsappStyles.dot} />
            </span>
            {preview.context}
          </span>
          <span className={whatsappStyles.demoBadge}>Illustrative demo</span>
        </div>
        <ol className={whatsappStyles.chat} aria-label="Fictional WhatsApp order">
          {preview.messages.map((message, index) => (
            <li key={index} className={message.side === "right" ? whatsappStyles.assistant : whatsappStyles.customer}>
              <span className={whatsappStyles.sender}>{preview.speakers[message.side]}</span>
              <span>{message.text}</span>
            </li>
          ))}
        </ol>
        <div className={`${whatsappStyles.outcome} ${roleStyles.channelHandoff}`}>
          <BoxIcon width="18" height="18" />
          <span>
            {preview.outcome.title}
            <small>{preview.outcome.details}</small>
          </span>
        </div>
        <figcaption id="order-chat-caption" className={whatsappStyles.caption}>
          {previewDisclosure}. Names and details are fictional.
        </figcaption>
      </figure>
    </div>
  );
}

/**
 * /whatsapp-orders. Orders by WhatsApp and phone call, structured like a Sinhala + English
 * AI call-agent landing page (content/whatsappOrders.ts). Claims follow spec 1.2.
 */
export function WhatsAppOrdersPage({ product }: { product: Product }) {
  const demoHref = `/book-demo?role=${product.formRole}`;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: product.navLabel }]}
        beforeTitle={
          <p className={styles.kicker}>
            <Si>{heroKicker.si}</Si>
            <span className={styles.kickerEn}>{heroKicker.en}</span>
          </p>
        }
        title={product.headline}
        actions={
          <>
            <Link href={demoHref} className="button">
              Start an AI Order Agent
            </Link>
            <a href="#features" className="button button--secondary">
              View services
            </a>
          </>
        }
        aside={<AgentBoard />}
      >
        <p className={styles.heroLocal}>
          <Si>{heroLocalLine}</Si>
        </p>
        <p>{product.description}</p>
        <dl className={styles.stats}>
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.audience}>
          <span>Built for</span> {audienceLine.join(" • ")}
        </p>
      </PageHero>

      <section className={`section ${styles.alwaysOn}`} aria-labelledby="always-on-title">
        <div className="container">
          <span className="eyebrow section-eyebrow">{alwaysOn.kicker.en}</span>
          <p className={styles.sectionLocal}>
            <Si>{alwaysOn.kicker.si}</Si>
          </p>
          <h2 id="always-on-title">{alwaysOn.title}</h2>
          <p>{alwaysOn.text}</p>
          <ul className={styles.tagRow}>
            {alwaysOn.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="features" className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading id="capabilities-title" eyebrow="02 · Services" title="Every order, by call or chat." />
          <div className={productStyles.fourGrid}>
            {product.capabilities.map((capability) => {
              const CapabilityIcon = icons[capability.icon];
              return (
                <article key={capability.title} className={`card ${styles.featureCard}`} aria-label={capability.title}>
                  <div className="card-icon" aria-hidden="true">
                    <CapabilityIcon />
                  </div>
                  <span className={styles.powered}>BIZny AI powered</span>
                  <h3>{capability.title}</h3>
                  {capability.localTitle && <Si className={styles.cardLocal}>{capability.localTitle}</Si>}
                  <p>{capability.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section--muted" aria-labelledby="workflow-title">
        <div className={`container ${styles.liveSplit}`}>
          <div>
            <SectionHeading id="workflow-title" eyebrow="03 · How it works" title="One order, start to finish." />
            <ol className={styles.timeline}>
              {product.workflow.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <OrderChat preview={product.preview} />
        </div>
      </section>

      <section className="section" aria-labelledby="custom-title">
        <div className={`container ${styles.customPanel}`}>
          <div>
            <span className="eyebrow section-eyebrow">04 · Custom order agent</span>
            <p className={styles.panelLocal}>
              <Si>{customAgent.si}</Si>
            </p>
            <h2 id="custom-title">{customAgent.title}</h2>
            <p>{customAgent.text}</p>
            <Link href={demoHref} className="button button--white">
              {customAgent.cta.en}
            </Link>
            <p className={styles.ctaLocal}>
              <Si>{customAgent.cta.si}</Si>
            </p>
          </div>
          <ul className="check-list">
            {customAgent.points.map((point) => (
              <li key={point}>
                <CheckIcon width="18" height="18" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="not-ivr-title">
        <div className="container">
          <SectionHeading id="not-ivr-title" eyebrow="05 · BIZny AI order agent" title={notAnIvr.title}>
            <p>{notAnIvr.text}</p>
          </SectionHeading>
          <div className={productStyles.fourGrid}>
            {notAnIvr.points.map((item, index) => {
              const PointIcon = notAnIvrIcons[index] ?? SparkIcon;
              return (
                <article key={item.title} className={`card ${styles.notBotCard}`} aria-label={item.title}>
                  <span className={styles.discIcon} aria-hidden="true">
                    <PointIcon width="22" height="22" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="industries-title">
        <div className="container">
          <SectionHeading id="industries-title" eyebrow="06 · Use cases" title="An order assistant for every kind of business." />
          <div className={styles.industryGrid}>
            {orderIndustries.map((industry, index) => (
              <article key={industry.title} className={`card ${styles.industryCard}`} aria-labelledby={`industry-${index}`}>
                <span className={styles.assistant}>{industry.assistant}</span>
                <h3 id={`industry-${index}`}>{industry.title}</h3>
                <ul className="feature-list">
                  {industry.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
                <p className={styles.benefit}>
                  <strong>BIZny benefit:</strong> {industry.benefit}
                </p>
                {industry.slug && (
                  <Link href={`/industries/${industry.slug}`} className={styles.industryLink}>
                    See the industry<span className="sr-only">: {industry.title}</span>
                    <ArrowRightIcon width="16" height="16" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="compare-title">
        <div className="container">
          <SectionHeading id="compare-title" eyebrow="07 · People + AI" title="Routine orders go to AI. Your team keeps the rest.">
            <p>
              <Si>{manualVersusAgent.si}</Si>
            </p>
          </SectionHeading>
          <div className={styles.compare}>
            <article className={`card ${styles.manual}`} aria-labelledby="manual-title">
              <h3 id="manual-title">{manualVersusAgent.manualTitle}</h3>
              <ul>
                {manualVersusAgent.manual.map((item) => (
                  <li key={item}>
                    <CloseIcon width="18" height="18" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className={`card ${styles.agent}`} aria-labelledby="agent-title">
              <h3 id="agent-title">{manualVersusAgent.agentTitle}</h3>
              <ul>
                {manualVersusAgent.agent.map((item) => (
                  <li key={item}>
                    <CheckIcon width="18" height="18" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={`section ${styles.closing}`} aria-labelledby="closing-title">
        <div className="container">
          <p className={styles.closingLocal}>
            <Si>{closingStatement.si}</Si>
          </p>
          <h2 id="closing-title">{closingStatement.title}</h2>
          <p>{closingStatement.text}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="integrations-title">
        <div className="container">
          <SectionHeading id="integrations-title" eyebrow="08 · Integrations" title="Connect BIZny with the tools you already use.">
            <p>Each connection is assessed for your setup before it goes live.</p>
          </SectionHeading>
          <div className={styles.integrationGrid}>
            {orderIntegrations.map((integration) => (
              <article key={integration.title} className={`card ${styles.integration}`} aria-label={integration.title}>
                <span className={styles.integrationIcon} aria-hidden="true">
                  <PlugIcon width="20" height="20" />
                </span>
                <div>
                  <h3>{integration.title}</h3>
                  <p>{integration.description}</p>
                </div>
              </article>
            ))}
          </div>
          <ul className={styles.tagRow} aria-label="Also available">
            {extraConnections.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-label="Team control and availability">
        <div className={`container ${productStyles.controlSplit}`}>
          <article className={`card ${roleStyles.teamCard}`} aria-labelledby="team-title">
            <h2 id="team-title">What stays with your team</h2>
            <ul className="check-list">
              {product.humanControls.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className={`card ${productStyles.statusCard}`} aria-labelledby="status-title">
            <h2 id="status-title">Availability</h2>
            <StatusBadge label={moduleAvailabilityLabels[product.availability]} />
            <p>
              Scope, connections and timing depend on your systems and are confirmed with you before
              anything goes live.
            </p>
            <Link href={demoHref} className="button button--secondary">
              Talk to us about your setup
            </Link>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading id="faq-title" title={`Questions about ${product.navLabel}`} />
          <FaqList questions={product.faqs} />
        </div>
      </section>

      <CtaBand
        id="product-cta-title"
        title="More time for your team. Faster service for your customers."
        text="Tell us what you sell and how customers order today, by call or on WhatsApp. We’ll shape the demo around your products, systems and rules."
        action={{ href: demoHref, label: "Book a Demo" }}
        showWhatsApp
      />
    </>
  );
}
