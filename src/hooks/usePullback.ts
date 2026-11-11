import {useEffect, type RefObject} from 'react';
import {clamp} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The hero "camera pull-back": as the section scrolls away, its stage drifts
 * down, shrinks, blurs and dims together, so the next section seems to
 * arrive in front of it. Runs on the shared rAF loop and writes styles
 * directly (no React state while scrolling). `onProgress` lets the home hero
 * pause its slideshow once it is out of view.
 */
export function usePullback(
  root: RefObject<HTMLElement | null>,
  stage: RefObject<HTMLElement | null>,
  reduced: boolean,
  onProgress?: (p: number) => void,
) {
  useEffect(
    () =>
      onFrame(() => {
        const el = root.current;
        const s = stage.current;
        if (!el || !s) return;
        const r = el.getBoundingClientRect();
        const h = Math.max(1, r.height);
        const p = clamp(-r.top / h);
        onProgress?.(p);
        if (reduced) {
          s.style.opacity = String(1 - p * 0.6);
          return;
        }
        s.style.transform = `translate3d(0, ${(p * h * 0.45).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        s.style.filter = p > 0.01 ? `blur(${(p * 16).toFixed(1)}px) brightness(${(1 - p * 0.5).toFixed(3)})` : 'none';
      }),
    [root, stage, reduced, onProgress],
  );
}
