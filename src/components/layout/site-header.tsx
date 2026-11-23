import Image from 'next/image';
import Link from 'next/link';

import { ActionLink } from '@/components/ui/action-link';
import { site } from '@/content/site';

import styles from './site-header.module.css';
import { SiteNavigation } from './site-navigation';

export function SiteHeader() {
  return (
    <header id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className={`container ${styles.header}`}>
        <Link className={styles.brand} href="/#top" aria-label={`Home · ${site.name}`}>
          <Image {...site.mascot} className={styles.mascot} sizes="43px" alt="" />
        </Link>

        <SiteNavigation />

        <ActionLink compact href="#contact" icon="↓">Contact me</ActionLink>
      </div>
    </header>
  );
}
