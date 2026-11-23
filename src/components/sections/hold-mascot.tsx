'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';

import styles from './hold-mascot.module.css';

const holdTime = 1450;
const columns = 4;
const rows = 3;
const pieces = Array.from({ length: columns * rows }, (_, index) => {
  const column = index % columns;
  const row = Math.floor(index / columns);

  return {
    left: `${100 * column / columns}%`,
    top: `${100 * row / rows}%`,
    backgroundPosition: `${100 * column / (columns - 1)}% ${100 * row / (rows - 1)}%`,
    '--scatter-x': `${(column - 1.5) * 14 + (row - 1) * 4}px`,
    '--scatter-y': `${(row - 1) * 23 + (column % 2 ? 4 : -4)}px`,
    '--scatter-rotate': `${(column - 1.5) * 7 + (row - 1) * 12}deg`,
  } as CSSProperties;
});

type HoldPhase = 'idle' | 'charging' | 'scattered';

type HoldMascotProps = {
  src: string;
  width: number;
  height: number;
  className?: string;
};

export function HoldMascot({ src, width, height, className = '' }: HoldMascotProps) {
  const [phase, setPhase] = useState<HoldPhase>('idle');
  const pointer = useRef<number | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  function reset() {
    window.clearTimeout(timer.current);
    pointer.current = null;
    setPhase('idle');
  }

  function charge(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary || pointer.current !== null) return;

    pointer.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    setPhase('charging');
    timer.current = window.setTimeout(() => setPhase('scattered'), holdTime);
  }

  function release(event: PointerEvent<HTMLButtonElement>) {
    if (pointer.current === event.pointerId) reset();
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${className}`}
      style={{ '--hold-time': `${holdTime}ms` } as CSSProperties}
      data-hold-mascot={phase}
      aria-label="Scatter the Rimuru image"
      aria-pressed={phase === 'scattered'}
      onPointerDown={charge}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
      onContextMenu={(event) => event.preventDefault()}
      onBlur={reset}
      onClick={(event) => {
        if (event.detail === 0) setPhase((current) => current === 'scattered' ? 'idle' : 'scattered');
      }}
    >
      <span className={styles.art} aria-hidden="true">
        <Image className={styles.image} src={src} width={width} height={height} alt="" unoptimized draggable={false} />
        <span className={styles.fragments} style={{ '--mascot-image': `url(${JSON.stringify(src)})` } as CSSProperties}>
          {pieces.map((piece, index) => <span key={index} className={styles.piece} style={piece} />)}
        </span>
      </span>
      <span className={styles.caption} aria-hidden="true">
        {phase === 'scattered' ? 'Scattered' : 'Hold to split'}
      </span>
      <span className={styles.progress} aria-hidden="true" />
    </button>
  );
}
