import { ContactForm } from '@/components/contact/contact-form';
import { ActionLink } from '@/components/ui/action-link';
import { site } from '@/content/site';
import { getContactSettings } from '@/lib/contact-settings';

import styles from './site-footer.module.css';

export function SiteFooter() {
  const { recipient, sender, apiKey } = getContactSettings();

  return (
    <footer id="contact" className="container" aria-labelledby="contact-title">
      <div className={styles.contact}>
        <div data-reveal>
          <h2 id="contact-title" className="section-title">Contact me.</h2>
          <p className={styles.description}>For project inquiries, collaborations, or questions.</p>
          <div className={styles.actions}>
            <ActionLink href={site.linkedinUrl}>LinkedIn</ActionLink>
          </div>
        </div>
        {recipient && (
          <div className={styles.formArea} data-reveal>
            <ContactForm emailAppRecipient={sender && apiKey ? undefined : recipient} />
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <p>{site.name}</p>
        <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
      </div>
    </footer>
  );
}
