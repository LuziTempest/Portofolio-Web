import Lenis from 'lenis';

export function enableSmoothScroll(update: () => void) {
  const lenis = new Lenis({
    autoRaf: false,
    smoothWheel: true,
    syncTouch: false,
    lerp: 0.14,
    prevent: (node) => node.matches('textarea'),
  });
  let frame: number | undefined;

  function advance(time: number) {
    lenis.raf(time);
    frame = lenis.isScrolling === 'smooth' ? window.requestAnimationFrame(advance) : undefined;
  }

  function wake() {
    if (frame !== undefined) return;
    // Reset Lenis' clock before it handles the first wheel event after idle.
    lenis.raf(performance.now());
    frame = window.requestAnimationFrame(advance);
  }

  function releaseForAnchor(event: MouseEvent) {
    if (lenis.isScrolling !== 'smooth' || !(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href]');
    if (link?.hash && link.origin === location.origin && link.pathname === location.pathname) {
      lenis.stop();
      lenis.start();
    }
  }

  lenis.on('virtual-scroll', wake);
  lenis.on('scroll', update);
  document.addEventListener('click', releaseForAnchor, true);

  return () => {
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    document.removeEventListener('click', releaseForAnchor, true);
    lenis.destroy();
  };
}
