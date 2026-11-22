'use client';

import { useEffect } from 'react';

import './scroll-reveal.css';

export function ScrollReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const viewport = document.documentElement;
    const inset = Math.min(32, Math.floor(viewport.clientHeight / 10));
    const observer = new IntersectionObserver(
      (entries) => {
        const viewportBottom = viewport.clientHeight;
        for (const { boundingClientRect, isIntersecting, target } of entries) {
          // Keep content already visible at the viewport edges during hydration.
          const withinViewport = boundingClientRect.bottom > 0 && boundingClientRect.top < viewportBottom;
          if (!isIntersecting && withinViewport && !target.hasAttribute('data-reveal-state')) continue;

          target.setAttribute('data-reveal-state', isIntersecting ? 'visible' : 'hidden');
        }
      },
      { rootMargin: `-${inset}px 0px` },
    );

    function stopObserving() {
      observer.disconnect();
      observer.takeRecords();
      targets.forEach((target) => target.removeAttribute('data-reveal-state'));
    }

    function updateMotion() {
      if (motionPreference.matches) {
        stopObserving();
        return;
      }
      targets.forEach((target) => observer.observe(target));
    }

    updateMotion();
    motionPreference.addEventListener('change', updateMotion);

    return () => {
      motionPreference.removeEventListener('change', updateMotion);
      stopObserving();
    };
  }, []);

  return null;
}
