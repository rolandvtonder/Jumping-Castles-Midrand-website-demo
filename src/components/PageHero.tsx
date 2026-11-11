import {useRef, type ReactNode} from 'react';
import type {Line} from '../content';
import {usePullback} from '../hooks/usePullback';
import {Img} from './Img';
import {useReduced} from './Layout';

/**
 * The top of every inner page: a full-bleed party photo under a big headline,
 * with the same blur-and-pull-back as the home hero when you scroll on.
 */
export function PageHero({
  num,
  label,
  lines,
  body,
  photo,
  alt,
  children,
}: {
  num: string;
  label: string;
  lines: Line[];
  body: string;
  photo: string;
  alt: string;
  children?: ReactNode;
}) {
  const reduced = useReduced();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  usePullback(root, stage, reduced);

  return (
    <section ref={root} className="relative h-[82svh] min-h-[560px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        <Img slug={photo} alt={alt} priority className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(16_26_63/0.82),rgb(16_26_63/0.35)_60%,transparent),linear-gradient(0deg,rgb(16_26_63/0.6),transparent_45%)]" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1680px] px-5 pb-[clamp(40px,8vh,90px)] md:px-14">
          <p className="caps flex items-center gap-3 text-sun">
            <span className="rounded-full bg-sun px-2.5 py-0.5 text-ink">{num}</span> {label}
          </p>
          <h1 className="display mt-5 text-[clamp(54px,9vw,150px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            {lines.map((l) => (
              <span key={l.t} className={`block ${l.i ? 'it text-sun' : ''}`}>
                {l.t}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[520px] text-[18px] text-white/90">{body}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
