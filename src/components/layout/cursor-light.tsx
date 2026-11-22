'use client';

import { useEffect, useRef } from 'react';

import styles from './starfield.module.css';

export function CursorLight() {
  const lightRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const light = lightRef.current;
    if (!light) return;

    const pointer = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    let frameId: number | undefined;
    let x = 0;
    let y = 0;

    const hide = () => {
      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
        frameId = undefined;
      }
      light.removeAttribute('data-active');
    };

    const paint = () => {
      frameId = undefined;
      light.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!light.hasAttribute('data-active')) light.setAttribute('data-active', '');
    };

    function move(event: PointerEvent) {
      if (event.pointerType === 'touch') {
        hide();
        return;
      }
      x = event.clientX;
      y = event.clientY;
      if (frameId === undefined) frameId = window.requestAnimationFrame(paint);
    }

    function leave(event: PointerEvent) {
      if (!event.relatedTarget) hide();
    }

    function stopTracking() {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
      document.removeEventListener('visibilitychange', hide);
      hide();
    }

    function syncTracking() {
      if (!pointer.matches) {
        stopTracking();
        return;
      }
      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('pointerout', leave, { passive: true });
      window.addEventListener('blur', hide);
      document.addEventListener('visibilitychange', hide);
    }

    pointer.addEventListener('change', syncTracking);
    syncTracking();

    return () => {
      pointer.removeEventListener('change', syncTracking);
      stopTracking();
    };
  }, []);

  return <span className={styles.cursorLight} ref={lightRef} />;
}
