'use client';

import { useEffect, useRef } from 'react';

import styles from './pointer-cursor.module.css';

export function PointerCursor() {
  const pointer = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = pointer.current;
    if (!cursor) return;

    const root = document.documentElement;
    const preference = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)',
    );
    const listeners = new AbortController();
    let frame: number | undefined;
    let position: { x: number; y: number } | undefined;
    let nextX = 0;
    let nextY = 0;
    let heading = 0;
    let actionable = false;

    const hide = () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      frame = undefined;
      position = undefined;
      root.removeAttribute('data-custom-pointer');
    };

    const draw = () => {
      frame = undefined;
      if (position) {
        const dx = nextX - position.x;
        const dy = nextY - position.y;
        if (Math.abs(dx) + Math.abs(dy) >= 3) {
          const angle = Math.atan2(dy, dx) * 180 / Math.PI + 90;
          heading += ((angle - heading + 180) % 360 + 360) % 360 - 180;
          cursor.style.setProperty('--pointer-heading', `${Math.round(heading)}deg`);
        }
      }
      position = { x: nextX, y: nextY };
      cursor.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
      cursor.toggleAttribute('data-actionable', actionable);
      if (!root.hasAttribute('data-custom-pointer')) root.setAttribute('data-custom-pointer', '');
    };

    const move = (event: PointerEvent) => {
      if (!preference.matches || event.pointerType !== 'mouse' ||
          !(event.target instanceof Element) ||
          event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), iframe, video')) {
        if (position || frame !== undefined) hide();
        return;
      }

      nextX = event.clientX;
      nextY = event.clientY;
      actionable = Boolean(event.target.closest('a[href], button:enabled, summary, [role="button"]'));
      if (frame === undefined) frame = window.requestAnimationFrame(draw);
    };

    const options = { passive: true, signal: listeners.signal };
    window.addEventListener('pointermove', move, options);
    root.addEventListener('pointerleave', hide, options);
    window.addEventListener('blur', hide, options);
    document.addEventListener('visibilitychange', hide, options);
    preference.addEventListener('change', hide);

    return () => {
      listeners.abort();
      preference.removeEventListener('change', hide);
      hide();
    };
  }, []);

  return (
    <span className={styles.pointer} ref={pointer} aria-hidden="true" data-pointer-ornament>
      <svg viewBox="0 0 24 27" width="24" height="27" focusable="false">
        <path d="M 12 3 L 3 23 L 12 18.5 L 21 23 Z" />
      </svg>
    </span>
  );
}
