import type { ReactNode } from 'react';

import styles from './action-link.module.css';

type ActionLinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: '↗' | '↓';
  compact?: boolean;
};

export function ActionLink({
  href,
  children,
  variant = 'secondary',
  icon = '↗',
  compact = false,
}: ActionLinkProps) {
  const sizeClass = compact ? styles.compact : '';
  const className = `${styles.action} ${styles[variant]} ${sizeClass}`;
  return (
    <a href={href} className={className}>
      {children}
      <span className={styles.icon} aria-hidden="true">{icon}</span>
    </a>
  );
}
