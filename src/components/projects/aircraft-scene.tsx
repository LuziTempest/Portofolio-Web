'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import styles from './project-detail.module.css';

function normalizeOffset(position: number, start: number, size: number) {
  return Math.max(-1, Math.min(1, (position - start) * 2 / size - 1));
}

export function AircraftScene({ children }: { children: ReactNode }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const formationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const formation = formationRef.current;
    if (!scene || !formation) return;

    const motion = window.matchMedia(
      '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    let frameId: number | undefined;
    let x = 0;
    let y = 0;

    const tilt = () => {
      frameId = undefined;
      const { left, top, width, height } = scene.getBoundingClientRect();
      if (!width || !height) return;

      const horizontal = normalizeOffset(x, left, width);
      const vertical = normalizeOffset(y, top, height);
      const pitch = Math.round(-3 - vertical * 12);
      const yaw = Math.round(6 + horizontal * 18);
      formation.style.setProperty('--aircraft-bank', `rotateX(${pitch}deg) rotateY(${yaw}deg)`);
    };

    function move(event: PointerEvent) {
      if (!motion.matches || event.pointerType === 'touch') return;
      x = event.clientX;
      y = event.clientY;
      if (frameId === undefined) frameId = window.requestAnimationFrame(tilt);
    }

    const reset = () => {
      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
        frameId = undefined;
      }
      formation.style.removeProperty('--aircraft-bank');
    };

    scene.addEventListener('pointermove', move, { passive: true });
    scene.addEventListener('pointerleave', reset);
    scene.addEventListener('pointercancel', reset);
    motion.addEventListener('change', reset);

    return () => {
      scene.removeEventListener('pointermove', move);
      scene.removeEventListener('pointerleave', reset);
      scene.removeEventListener('pointercancel', reset);
      motion.removeEventListener('change', reset);
      reset();
    };
  }, []);

  return (
    <div ref={sceneRef} className={styles.aircraft} aria-hidden="true">
      <div ref={formationRef} className={styles.formation}>{children}</div>
    </div>
  );
}
