import Link from "next/link";
import { siteConfig, verifiedChannel, whatsappHref } from "@/config/site";

interface CtaBandProps {
  id: string;
  title: string;
  text: string;
  action: { href: string; label: string };
  /** Adds a WhatsApp button when a verified number exists (spec 6.12, 12.3). */
  showWhatsApp?: boolean;
}

/** Purple conversion band. No response-time promises (spec 6.12). */
export function CtaBand({ id, title, text, action, showWhatsApp = false }: CtaBandProps) {
  const whatsapp = showWhatsApp ? verifiedChannel(siteConfig.contact.whatsapp) : null;

  return (
    <section className="cta-band" aria-labelledby={id}>
      <div className="container cta-band__inner">
        <div>
          <h2 id={id}>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="button-row">
          <Link href={action.href} className="button button--white">
            {action.label}
          </Link>
          {whatsapp && (
            <a
              href={whatsappHref(whatsapp)}
              className="button button--whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
