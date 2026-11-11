import {useCallback, useEffect, useRef, useState} from 'react';
import {hero} from '../content';
import {usePullback} from '../hooks/usePullback';
import {Img} from './Img';
import {useReduced} from './Layout';

const ALTS = [
  'Foam pouring down the slide of the Palm Tree Slide & Splash into its pool',
  'The Classic Castle with red roofs and yellow towers set up in a sunny courtyard',
  'The Palm Tree Slide & Splash at a garden party with a balloon arch',
];
const HOLD = 6000; // ms each photo stays before cross-fading to the next

/**
 * Home hero: three real party photos cross-fade with a slow drift under the
 * big headline. Scrolling on pulls the camera back (blur, dim, shrink) as
 * the castle panels arrive. The slideshow pauses off-screen, when the tab is
 * hidden, and never runs for reduced-motion visitors.
 */
export function Hero() {
  const reduced = useReduced();
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  const [index, setIndex] = useState(0);

  const onProgress = useCallback((p: number) => {
    visible.current = p < 0.98;
  }, []);
  usePullback(root, stage, reduced, onProgress);

  useEffect(() => {
    if (reduced) return;
    const t = window.setInterval(() => {
      if (visible.current && !document.hidden) setIndex((i) => (i + 1) % hero.photos.length);
    }, HOLD);
    return () => window.clearInterval(t);
  }, [reduced]);

  return (
    <section ref={root} className="relative h-svh min-h-[640px] overflow-hidden bg-ink">
      <div ref={stage} className="absolute inset-0 origin-center will-change-transform">
        {hero.photos.map((slug, i) => (
          <div
            key={slug}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-silk ${i === index ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== index}
          >
            <Img
              slug={slug}
              alt={ALTS[i]}
              priority={i === 0}
              className="h-full w-full object-cover"
              style={
                reduced
                  ? undefined
                  : {animation: `drift ${HOLD * 1.6}ms linear both`, animationPlayState: i === index ? 'running' : 'paused'}
              }
              key={i === index ? `on-${index}` : 'off'}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(16_26_63/0.78),rgb(16_26_63/0.25)_62%,transparent),linear-gradient(0deg,rgb(16_26_63/0.55),transparent_40%)]" />

        <div className="absolute inset-0 mx-auto max-w-[1680px] px-5 pt-[clamp(120px,17vh,170px)] md:px-14">
          <h1 className="display text-[clamp(50px,8.4vw,150px)] text-white drop-shadow-[0_4px_30px_rgb(0_0_0/0.35)]">
            {hero.lines.map((l, i) => (
              <span key={l.t} className={`block ${l.i ? 'it text-sun' : ''} ${i === 0 ? 'md:pl-[1.4em]' : ''}`}>
                {l.t}
              </span>
            ))}
          </h1>
          <p className="mt-8 max-w-[380px] text-[18px] text-white/90 md:ml-[clamp(0px,16vw,300px)]">{hero.body}</p>
        </div>
      </div>

    </section>
  );
}
