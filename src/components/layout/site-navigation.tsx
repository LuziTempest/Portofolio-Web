'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

import { navigation } from '@/content/site';

import styles from './site-header.module.css';

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  return (
    <div
      className={styles.navGroup}
      data-open={open}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !open) return;
        setOpen(false);
        toggle.current?.focus();
      }}
    >
      <button
        ref={toggle}
        className={styles.menuToggle}
        type="button"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen(!open)}
      >
        Menu <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <nav id="site-navigation" className={styles.navigation} aria-label="Main navigation">
        {navigation.map(({ label, href }) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
        ))}
      </nav>
    </div>
  );
}
