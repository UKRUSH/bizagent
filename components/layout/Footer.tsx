import { siteConfig, verifiedChannel, whatsappHref } from "@/config/site";
import { footerNavigation, legalNavigation } from "@/content/navigation";
import { SmartLink } from "@/components/ui/SmartLink";
import { BrandLogo } from "./BrandLogo";
import { CopyrightYear } from "./CopyrightYear";
import { ThemeSelector } from "./ThemeSelector";

/**
 * Footer (spec 5.2): original white logo, product description, grouped links, verified
 * contact channels only, approved legal links only, current year and parent attribution.
 */
export function Footer() {
  const whatsapp = verifiedChannel(siteConfig.contact.whatsapp);
  const phone = verifiedChannel(siteConfig.contact.phone);
  const email = verifiedChannel(siteConfig.contact.email);
  const hasContact = Boolean(whatsapp || phone || email);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <BrandLogo />
            <p>{siteConfig.shortDescription}</p>
            {hasContact && (
              <ul className="footer-links footer-contact" aria-label="Contact">
                {whatsapp && (
                  <li>
                    <a href={whatsappHref(whatsapp)} target="_blank" rel="noopener noreferrer">
                      WhatsApp {whatsapp.display}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a href={`tel:${phone.value}`}>Call {phone.display}</a>
                  </li>
                )}
                {email && (
                  <li>
                    <a href={`mailto:${email.value}`}>{email.display}</a>
                  </li>
                )}
              </ul>
            )}
          </div>

          {footerNavigation.map((group) => (
            <nav key={group.heading} aria-labelledby={`footer-${group.heading.toLowerCase()}`}>
              <h2 className="footer-heading" id={`footer-${group.heading.toLowerCase()}`}>
                {group.heading}
              </h2>
              <ul className="footer-links">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <SmartLink href={link.href} external={link.external}>
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="footer-bottom">
          <p>
            © <CopyrightYear /> {siteConfig.companyName}. {siteConfig.productName} is a product of
            the {siteConfig.companyName} {siteConfig.divisionName}.
          </p>
          <ThemeSelector />
          {legalNavigation.length > 0 && (
            <ul className="footer-links" aria-label="Legal">
              {legalNavigation.map((link) => (
                <li key={link.href}>
                  <SmartLink href={link.href}>{link.label}</SmartLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
