import {ArrowRightIcon} from '@phosphor-icons/react';
import {CtaBand} from '../components/CtaBand';
import {Hero} from '../components/Hero';
import {Img} from '../components/Img';
import {Panels} from '../components/Panels';
import {areas, gallery, steps} from '../content';
import {useReveals} from '../hooks/useReveals';
import {href} from '../lib/links';
import {delay} from '../lib/style';

const STEP_TINTS = ['bg-red text-white', 'bg-sun text-ink', 'bg-splash text-ink'];

export default function Home() {
  const ref = useReveals<HTMLDivElement>();
  const teaser = gallery.slice(0, 5);

  return (
    <div ref={ref}>
      <Hero />
      <Panels />

      {/* Intro + proof */}
      <section className="mx-auto grid max-w-[1400px] gap-14 px-5 py-24 md:grid-cols-[1.4fr_1fr] md:items-end md:px-14 md:py-32">
        <h2 data-reveal className="display text-[clamp(44px,6.4vw,104px)] text-ink">
          <span className="block">Big fun.</span>
          <span className="it block text-red">Zero fuss.</span>
        </h2>
        <div data-reveal style={delay(0.1)}>
          <p className="text-[19px] text-ink/80">
            Based in Midrand, we bring the bounce to birthday parties, school fun days, church events and office get-togethers across
            Johannesburg and Centurion. Tell us your date, and we'll handle the delivery.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-3">
            {[
              ['10K+', 'Facebook fans'],
              ['6', 'Areas served'],
              ['3 in 1', 'Bounce, slide & splash'],
            ].map(([n, l], i) => (
              <div key={l} className={`rounded-3xl p-4 ${['bg-sun', 'bg-splash', 'bg-cream ring-3 ring-ink/10'][i]}`}>
                <dt className="sr-only">{l}</dt>
                <dd>
                  <span className="display block whitespace-nowrap text-[clamp(24px,2.3vw,36px)] text-ink">{n}</span>
                  <span className="mt-1 block text-[14px] leading-tight font-extrabold text-ink/80">{l}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-title" className="bg-paper px-5 py-24 md:px-14 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <p data-reveal className="caps text-red">
            How it works
          </p>
          <h2 id="how-title" data-reveal style={delay(0.05)} className="display mt-3 text-[clamp(40px,5vw,80px)]">
            Three steps <span className="it text-royal">to party</span>
          </h2>
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.n} data-reveal style={delay(0.1 + i * 0.1)} className="card p-8">
                <span className={`display inline-grid size-16 place-items-center rounded-2xl text-[28px] ${STEP_TINTS[i]}`}>{s.n}</span>
                <h3 className="mt-6 text-[26px] leading-tight font-black">{s.title}</h3>
                <p className="mt-3 text-ink/75">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Areas ticker */}
      <section aria-label="Areas we deliver to" className="overflow-hidden bg-sun py-6">
        <ul className="sr-only">
          {areas.map((a) => (
            <li key={a.name}>{a.name}</li>
          ))}
        </ul>
        <div className="marquee flex w-max" aria-hidden>
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center">
              {[...areas, ...areas].map((a, i) => (
                <span key={`${k}-${i}`} className="display flex items-center px-6 text-[clamp(28px,3.4vw,48px)] text-ink">
                  {a.name}
                  <span className="ml-12 inline-block size-4 rotate-45 rounded-[4px] bg-red" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Gallery teaser */}
      <section aria-labelledby="teaser-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-14 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="teaser-title" data-reveal className="display text-[clamp(40px,5vw,80px)]">
            Real <span className="it text-red">parties</span>
          </h2>
          <a data-reveal href={href('/gallery/')} className="btn bg-ink text-white">
            See the gallery <ArrowRightIcon size={18} weight="bold" aria-hidden />
          </a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:gap-4">
          {teaser.map((g, i) => (
            <a
              key={g.photo}
              href={href('/gallery/')}
              data-reveal
              style={delay(i * 0.07)}
              className={`group overflow-hidden rounded-[24px] bg-ink/10 ${i === 0 ? 'col-span-2 row-span-2 aspect-square md:aspect-auto' : 'aspect-square'}`}
            >
              <Img
                slug={g.photo}
                alt={g.alt}
                sizes={i === 0 ? '(max-width: 767px) 100vw, 50vw' : '(max-width: 767px) 50vw, 25vw'}
                className="h-full w-full object-cover transition-transform duration-700 ease-silk group-hover:scale-105"
              />
            </a>
          ))}
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
