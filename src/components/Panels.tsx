import {useEffect, useRef, useState} from 'react';
import {ArrowRightIcon} from '@phosphor-icons/react';
import {highlights} from '../content';
import {href} from '../lib/links';
import {Img} from './Img';

/**
 * The line-up: three tall panels slide in from the right one after another —
 * the Classic Castle, the Slide & Splash and the party extras. Side by side
 * on desktop they arrive together with a stagger; stacked on phones, each
 * one slides in as it scrolls into view.
 */
export function Panels() {
  const items = useRef<(HTMLElement | null)[]>([]);
  const [shown, setShown] = useState<boolean[]>(() => highlights.map(() => false));

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = items.current.indexOf(e.target as HTMLElement);
          setShown((s) => (s[i] ? s : s.map((v, k) => (k === i ? true : v))));
          io.unobserve(e.target);
        });
      },
      {threshold: 0.2},
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="lineup" aria-labelledby="lineup-title" className="relative bg-ink">
      <h2 id="lineup-title" className="sr-only">
        Our castles and party extras
      </h2>
      <div className="grid h-svh min-h-[640px] grid-cols-3 gap-[4px] overflow-hidden max-md:h-auto max-md:grid-cols-1">
        {highlights.map((b, i) => (
          <div key={b.id} ref={(el) => void (items.current[i] = el)} className="relative overflow-hidden max-md:h-[78svh]">
            <a
              href={href(b.href)}
              className={`group absolute inset-0 block overflow-hidden transition-transform duration-[1100ms] ease-wipe ${
                shown[i] ? 'translate-x-0' : 'translate-x-[calc(100%_+_100vw)]'
              }`}
              style={{transitionDelay: `${0.12 + i * 0.16}s`, background: b.tint}}
            >
              <Img
                slug={b.photo}
                alt=""
                sizes="(max-width: 767px) 100vw, 34vw"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{background: `linear-gradient(180deg, ${b.tint}f2 0%, ${b.tint}99 22%, transparent 52%), linear-gradient(0deg, rgb(16 26 63 / 0.55), transparent 35%)`}} />
              <div className="relative flex h-full flex-col justify-between p-7 md:p-9">
                <div>
                  <h3 className="display text-[clamp(38px,3.6vw,62px)] text-white">
                    <span className="block">{b.name[0]}</span>
                    <span className="it block">{b.name[1]}</span>
                  </h3>
                  <dl className={`mt-6 space-y-3 transition-opacity delay-[1300ms] duration-700 ${shown[i] ? 'opacity-100' : 'opacity-0'}`}>
                    {b.specs.map(([k, v]) => (
                      <div key={k}>
                        <dt className="caps text-white/75">{k}</dt>
                        <dd className="text-[17px] font-extrabold text-white">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <span className="btn self-start bg-white text-ink">
                  Take a look
                  <ArrowRightIcon size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
