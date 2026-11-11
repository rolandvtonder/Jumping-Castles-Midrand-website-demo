import type {CSSProperties} from 'react';

/** Stagger for `[data-reveal]` elements: sets the `--d` transition delay. */
export const delay = (s: number) => ({'--d': `${s}s`}) as CSSProperties;
