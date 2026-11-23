'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let disposed = false;
    let cleanup: (() => void) | undefined;

    async function sync() {
      if (!preference.matches) {
        cleanup?.();
        cleanup = undefined;
        return;
      }

      const { mountScrollEffects } = await import('./scroll-effects');
      if (!disposed && preference.matches && !cleanup) cleanup = mountScrollEffects();
    }

    const start = typeof window.requestIdleCallback === 'function'
      ? window.requestIdleCallback(() => { void sync(); }, { timeout: 450 })
      : undefined;
    const fallback = start === undefined ? window.setTimeout(() => { void sync(); }, 120) : undefined;
    const handlePreference = () => { void sync(); };
    preference.addEventListener('change', handlePreference);

    return () => {
      disposed = true;
      if (start !== undefined) window.cancelIdleCallback(start);
      if (fallback !== undefined) window.clearTimeout(fallback);
      preference.removeEventListener('change', handlePreference);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
