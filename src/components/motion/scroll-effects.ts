import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const showcaseMedia = '(min-width: 56rem) and (min-height: 32rem)';
const pointerMedia = '(hover: hover) and (pointer: fine)';
const straightLine = 'M 0 36 Q 500 36 1000 36';

function revealWords() {
  for (const heading of document.querySelectorAll<HTMLElement>('[data-word-reveal]')) {
    if (heading.getBoundingClientRect().top < window.innerHeight * 0.87) continue;

    gsap.fromTo(heading.querySelectorAll('[data-word]'), { yPercent: 84, opacity: 0 }, {
      yPercent: 0,
      opacity: 1,
      duration: 0.52,
      stagger: 0.065,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: heading, start: 'top 87%', once: true },
    });
  }
}

function animateHorizon() {
  const horizon = document.querySelector<HTMLElement>('[data-scroll-horizon]');
  if (!horizon?.parentElement) return;

  gsap.fromTo(horizon, { yPercent: 17, scaleX: 0.94, opacity: 0.32 }, {
    yPercent: 0,
    scaleX: 1,
    opacity: 1,
    ease: 'none',
    scrollTrigger: { trigger: horizon.parentElement, start: 'top bottom', end: 'top 32%', scrub: 0.45 },
  });
}

function animateShowcase() {
  const showcase = document.querySelector<HTMLElement>('[data-project-showcase]');
  if (!showcase) return;

  const rows = [...showcase.querySelectorAll<HTMLElement>('[data-project-row]')];
  const frames = [...showcase.querySelectorAll<HTMLElement>('[data-project-frame]')];
  const stage = showcase.querySelector<HTMLElement>('[data-project-stage]');
  if (!stage || !rows.length || frames.length !== rows.length) return;

  let active = -1;
  function show(index: number) {
    if (index === active) return;
    rows[active]?.removeAttribute('data-active');
    frames[active]?.removeAttribute('data-active');
    rows[index].setAttribute('data-active', '');
    frames[index].setAttribute('data-active', '');
    active = index;
  }

  const listeners = new AbortController();
  show(0);
  showcase.setAttribute('data-enhanced', '');
  rows.forEach((row, index) => {
    row.addEventListener('focusin', () => show(index), { signal: listeners.signal });
    row.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') show(index);
    }, { passive: true, signal: listeners.signal });

    ScrollTrigger.create({
      trigger: row,
      start: 'top 58%',
      end: 'bottom 58%',
      onEnter: () => show(index),
      onEnterBack: () => show(index),
      onRefresh: (trigger) => { if (trigger.isActive) show(index); },
    });
  });

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: showcase, start: 'top 90%', end: 'bottom 28%', scrub: 0.35 },
  })
    .fromTo(stage, { scale: 0.94, rotateX: 7 }, { scale: 1, rotateX: 0, duration: 0.26 })
    .to(stage, { scale: 0.95, rotateX: -4, duration: 0.22 }, 0.78);

  return () => {
    listeners.abort();
    rows[active]?.removeAttribute('data-active');
    frames[active]?.removeAttribute('data-active');
    showcase.removeAttribute('data-enhanced');
  };
}

function animateDivider() {
  const area = document.querySelector<HTMLElement>('[data-elastic-divider]');
  const path = area?.querySelector<SVGPathElement>('path');
  if (!area || !path) return;

  const listeners = new AbortController();
  const bend = { x: 500, y: 36 };
  let frame: number | undefined;
  let pointerX = 0;
  let pointerY = 0;
  const draw = () => path.setAttribute('d', `M 0 36 Q ${bend.x.toFixed(1)} ${bend.y.toFixed(1)} 1000 36`);

  const follow = () => {
    frame = undefined;
    const { left, top, width, height } = area.getBoundingClientRect();
    if (!width || !height) return;
    const x = gsap.utils.clamp(0, 1000, (pointerX - left) * 1000 / width);
    const y = gsap.utils.clamp(5, 67, (pointerY - top) * 72 / height);
    gsap.to(bend, { x, y, duration: 0.2, ease: 'power2.out', onUpdate: draw, overwrite: true });
  };

  function release() {
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    frame = undefined;
    gsap.to(bend, { x: 500, y: 36, duration: 0.66, ease: 'elastic.out(1, 0.42)', onUpdate: draw, overwrite: true });
  }

  area.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse') return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (frame === undefined) frame = window.requestAnimationFrame(follow);
  }, { passive: true, signal: listeners.signal });
  area.addEventListener('pointerleave', release, { signal: listeners.signal });

  return () => {
    listeners.abort();
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    gsap.killTweensOf(bend);
    path.setAttribute('d', straightLine);
  };
}

export function mountScrollEffects() {
  const context = gsap.context(() => {
    revealWords();
    animateHorizon();
  });
  const media = gsap.matchMedia();
  media.add(showcaseMedia, animateShowcase);
  media.add(pointerMedia, () => {
    const resetDivider = animateDivider();
    let disposed = false;
    let stopSmoothScroll: (() => void) | undefined;

    void import('./smooth-scroll').then(({ enableSmoothScroll }) => {
      if (!disposed) stopSmoothScroll = enableSmoothScroll(() => ScrollTrigger.update());
    });

    return () => {
      disposed = true;
      resetDivider?.();
      stopSmoothScroll?.();
    };
  });

  return () => {
    media.revert();
    context.revert();
  };
}
