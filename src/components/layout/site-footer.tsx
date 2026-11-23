import Link from 'next/link';

import { ContactForm } from '@/components/contact/contact-form';
import { WordReveal } from '@/components/motion/word-reveal';
import { navigation, site } from '@/content/site';
import { getContactSettings } from '@/lib/contact-settings';

import styles from './site-footer.module.css';

export function SiteFooter() {
  const { recipient } = getContactSettings();

  return (
    <footer id="contact" className={styles.shell} aria-labelledby="contact-title">
      <div className="container">
        <div className={styles.divider} data-elastic-divider aria-hidden="true">
          <svg viewBox="0 0 1000 72" preserveAspectRatio="none" focusable="false">
            <path d="M 0 36 Q 500 36 1000 36" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className={styles.contact}>
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title" className={styles.title}><WordReveal text="Let’s work together." /></h2>
            <p className={styles.description}>For project inquiries, collaborations, or questions.</p>
            <dl className={styles.directory}>
              {recipient && (
                <div>
                  <dt>Email</dt>
                  <dd><a href={`mailto:${encodeURIComponent(recipient).replace('%40', '@')}`}>{recipient}</a></dd>
                </div>
              )}
              <div>
                <dt>Location</dt>
                <dd>{site.location}</dd>
              </div>
              <div>
                <dt>Social</dt>
                <dd><a href={site.linkedinUrl}>LinkedIn <span aria-hidden="true">↗</span></a></dd>
              </div>
            </dl>
          </div>
          <div className={styles.formArea} data-reveal>
            <ContactForm />
          </div>
        </div>

        <div className={styles.footer}>
          <p>{site.name}</p>
          <nav aria-label="Footer navigation">
            {navigation.map(({ label, href }) => <Link key={href} href={href}>{label}</Link>)}
          </nav>
          <a className={styles.top} href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
