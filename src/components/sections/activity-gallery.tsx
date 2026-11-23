'use client';

import { LazyMotion } from 'motion/react';
import * as m from 'motion/react-m';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { activityPhotos } from '@/content/activities';

import styles from './activity-gallery.module.css';

const loadMotionFeatures = () => import('@/components/motion/motion-features').then((module) => module.default);
const easing = [0.22, 1, 0.36, 1] as const;

export function ActivityGallery() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [animateCards, setAnimateCards] = useState(false);
  const [edges, setEdges] = useState({ previous: false, next: activityPhotos.length > 1 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const preference = window.matchMedia('(prefers-reduced-motion: no-preference)');
    const syncMotion = () => setAnimateCards(preference.matches);
    preference.addEventListener('change', syncMotion);
    syncMotion();

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
      preference.removeEventListener('change', syncMotion);
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
    <section className={styles.gallery} aria-labelledby="activity-gallery-title">
      <div className={styles.header}>
        <h3 id="activity-gallery-title" className={styles.title} data-reveal>More activities</h3>
        <div className={styles.controls}>
          <button type="button" aria-controls="activity-photos" disabled={!edges.previous} onClick={() => move('previous')}>
            <span aria-hidden="true">←</span>
            Previous
          </button>
          <button type="button" aria-controls="activity-photos" disabled={!edges.next} onClick={() => move('next')}>
            Next
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <LazyMotion features={loadMotionFeatures} strict>
        <ul
          id="activity-photos"
          className={styles.track}
          ref={trackRef}
          tabIndex={0}
          role="list"
          aria-label="Activity photos"
          data-lenis-prevent
          onKeyDown={(event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            move(event.key === 'ArrowLeft' ? 'previous' : 'next');
          }}
        >
          {activityPhotos.map(({ src, caption, alt, portrait }) => (
            <li className={styles.slide} data-portrait={portrait} key={src}>
              <m.figure
                className={styles.card}
                initial={false}
                whileInView={animateCards ? { opacity: [0.68, 1], y: [12, 0] } : undefined}
                whileHover={animateCards ? 'hover' : undefined}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: animateCards ? 0.42 : 0, ease: easing }}
              >
                <div className={styles.imageFrame}>
                  <m.div
                    className={styles.photoLayer}
                    variants={{ hover: { scale: 1.05, x: 2 } }}
                    transition={{ duration: animateCards ? 0.32 : 0, ease: easing }}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes={portrait
                        ? '(max-width: 640px) 56vw, 224px'
                        : '(max-width: 640px) 86vw, (max-width: 920px) 44vw, (max-width: 1440px) 30vw, 425px'}
                      className={styles.photo}
                    />
                  </m.div>
                </div>
                <figcaption className={styles.caption}>{caption}</figcaption>
              </m.figure>
            </li>
          ))}
        </ul>
      </LazyMotion>
    </section>
  );
}
