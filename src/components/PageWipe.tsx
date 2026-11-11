import {useEffect, useState, type CSSProperties} from 'react';
import {CastleMark} from './Logo';

const KEY = 'jcm-wipe';
type Phase = 'idle' | 'cover' | 'reveal';

const read = () => {
  try {
    return sessionStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
};
const write = (on: boolean) => {
  try {
    if (on) sessionStorage.setItem(KEY, '1');
    else sessionStorage.removeItem(KEY);
  } catch {
    /* storage blocked: the wipe just won't continue on the next page */
  }
};

/**
 * Page-to-page transition. Clicking a link to another page on this site
 * sweeps the menu's three slabs across the screen, then navigates; the new
 * page starts covered and sweeps them away to the left.
 */
export function PageWipe({reduced}: {reduced: boolean}) {
  // Start covered if the previous page handed off mid-wipe.
  const [phase, setPhase] = useState<Phase>(() => (!reduced && read() ? 'cover' : 'idle'));
  const [animate, setAnimate] = useState(false);

  // Arrived covered → sweep away.
  useEffect(() => {
    write(false);
    if (phase !== 'cover') return;
    const r = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        setPhase('reveal');
      }),
    );
    return () => cancelAnimationFrame(r);
    // Runs once on arrival only.
  }, []);

  // After sweeping away, park the slabs off to the right again without animating.
  useEffect(() => {
    if (phase !== 'reveal') return;
    const t = window.setTimeout(() => {
      setAnimate(false);
      setPhase('idle');
    }, 1000);
    return () => window.clearTimeout(t);
  }, [phase]);

  // Intercept clicks on links to other pages of this site.
  useEffect(() => {
    if (reduced) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname) return; // same page: let hash links scroll
      e.preventDefault();
      setAnimate(true);
      setPhase('cover');
      window.setTimeout(() => {
        write(true);
        location.assign(url.href);
      }, 720);
    };
    // Coming back via the back button restores this page from cache mid-wipe.
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setAnimate(false);
        setPhase('idle');
        write(false);
      }
    };
    document.addEventListener('click', onClick);
    window.addEventListener('pageshow', onShow);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', onShow);
    };
  }, [reduced]);

  const x = phase === 'cover' ? '0%' : phase === 'reveal' ? '-104%' : '104%';
  const slab = (k: number, bg: string): CSSProperties => ({
    transform: `translate3d(${x}, 0, 0)`,
    transition: animate ? `transform 700ms var(--ease-wipe) ${phase === 'reveal' ? (2 - k) * 0.08 : k * 0.08}s` : 'none',
    background: bg,
  });

  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 z-[70] overflow-hidden ${phase === 'idle' ? 'invisible' : ''}`}>
      <div className="absolute inset-0" style={slab(0, 'var(--color-red)')} />
      <div className="absolute inset-0" style={slab(1, 'var(--color-sun)')} />
      <div className="absolute inset-0 grid place-items-center" style={slab(2, 'var(--color-cream)')}>
        <CastleMark className="size-24 animate-[hop_0.6s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
