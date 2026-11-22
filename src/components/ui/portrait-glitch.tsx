'use client';

import Image from 'next/image';
import type { SyntheticEvent } from 'react';

import styles from './portrait-glitch.module.css';

type PortraitGlitchProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

export function PortraitGlitch({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: PortraitGlitchProps) {
  function prepareEffect({ currentTarget: photo }: SyntheticEvent<HTMLImageElement>) {
    const wrapper = photo.parentElement;
    if (!wrapper) return;

    wrapper.setAttribute('data-portrait-ready', '');
    if (priority) wrapper.setAttribute('data-portrait-entrance', '');
  }

  return (
    <div key={src} className={`${styles.portrait} ${className ?? ''}`}>
      <Image
        src={src}
        sizes={sizes}
        fill
        loading={priority ? 'eager' : 'lazy'}
        className={styles.image}
        alt={alt}
        fetchPriority={priority ? 'high' : undefined}
        onLoad={prepareEffect}
      />
    </div>
  );
}
