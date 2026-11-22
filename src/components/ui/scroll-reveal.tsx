'use client';

import { useEffect } from 'react';

import './scroll-reveal.css';

function getHashTarget() {
  try {
    return document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
  } catch {
    return null;
  }
}

export function ScrollReveal() {
  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches || !('IntersectionObserver' in window)) return;

    const viewportBottom = document.documentElement.clientHeight;
    const hashTarget = getHashTarget();
    // Content already in view stays visible while the page hydrates.
    const targets = Array.from(document.querySelectorAll('[data-reveal]')).filter(
      (target) =>
        target.getBoundingClientRect().top >= viewportBottom &&
        !target.matches(':focus-within') &&
        !(hashTarget && (target.contains(hashTarget) || hashTarget.contains(target))),
    );
    if (!targets.length) return;

    const pending = new Set(targets);
    const observer = new IntersectionObserver((entries) => {
      for (const { isIntersecting, target } of entries) {
        if (!isIntersecting || !pending.delete(target)) continue;
        target.setAttribute('data-reveal-state', 'shown');
        observer.unobserve(target);
      }
    });

    for (const target of targets) {
      target.setAttribute('data-reveal-state', 'pending');
      observer.observe(target);
    }

    function showImmediately(target: Element) {
      target.removeAttribute('data-reveal-state');
      if (pending.delete(target)) observer.unobserve(target);
    }

    function handleFocus(event: FocusEvent) {
      const focused = event.target;
      if (!(focused instanceof Element)) return;

      for (const target of targets) {
        if (target.contains(focused)) showImmediately(target);
      }
    }

    function handleHashChange() {
      const linked = getHashTarget();
      if (!linked) return;

      for (const target of targets) {
        if (target.contains(linked) || linked.contains(target)) showImmediately(target);
      }
    }

    function handleMotionChange() {
      if (motionPreference.matches) targets.forEach(showImmediately);
    }

    document.addEventListener('focusin', handleFocus);
    window.addEventListener('hashchange', handleHashChange);
    motionPreference.addEventListener('change', handleMotionChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('focusin', handleFocus);
      window.removeEventListener('hashchange', handleHashChange);
      motionPreference.removeEventListener('change', handleMotionChange);
      targets.forEach((target) => target.removeAttribute('data-reveal-state'));
    };
  }, []);

  return null;
}
