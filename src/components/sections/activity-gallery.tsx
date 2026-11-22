'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { activityPhotos } from '@/content/activities';

import styles from './activity-gallery.module.css';

export function ActivityGallery() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ previous: false, next: activityPhotos.length > 1 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateEdges = () => {
      const previous = track.scrollLeft > 1;
      const next = track.scrollLeft + track.clientWidth < track.scrollWidth - 1;
      setEdges((current) => current.previous === previous && current.next === next ? current : { previous, next });
    };

    const resize = new ResizeObserver(updateEdges);
    resize.observe(track);
    track.addEventListener('scroll', updateEdges, { passive: true });
    updateEdges();

    return () => {
      resize.disconnect();
      track.removeEventListener('scroll', updateEdges);
    };
  }, []);

  function move(direction: 'previous' | 'next') {
    const track = trackRef.current;
    if (!track) return;

    const current = track.scrollLeft;
    const stops = Array.from(track.children, (slide) => (slide as HTMLElement).offsetLeft);
    const left = direction === 'next'
      ? stops.find((stop) => stop > current + 1) ?? track.scrollWidth
      : stops.findLast((stop) => stop < current - 1) ?? 0;

    track.scrollTo({ left });
  }

  return (
    <section className={styles.gallery} aria-labelledby="activity-gallery-title" data-reveal>
      <div className={styles.header}>
        <h3 id="activity-gallery-title" className={styles.title}>More activities</h3>
        <div className={styles.controls}>
          <button type="button" aria-controls="activity-photos" disabled={!edges.previous} onClick={() => move('previous')}>
            Previous
          </button>
          <button type="button" aria-controls="activity-photos" disabled={!edges.next} onClick={() => move('next')}>
            Next
          </button>
        </div>
      </div>

      <ul id="activity-photos" className={styles.track} ref={trackRef} tabIndex={0} role="list" aria-label="Activity photos">
        {activityPhotos.map(({ src, caption, alt, portrait }) => (
          <li className={styles.slide} data-portrait={portrait} key={src}>
            <figure className={styles.card}>
              <div className={styles.imageFrame}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes={portrait
                    ? '(max-width: 640px) 56vw, 224px'
                    : '(max-width: 640px) 86vw, (max-width: 920px) 44vw, (max-width: 1440px) 30vw, 425px'}
                  className={styles.photo}
                />
              </div>
              <figcaption className={styles.caption}>{caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
