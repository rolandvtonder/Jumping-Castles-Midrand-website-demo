import {ArrowRightIcon, CheckCircleIcon, WhatsappLogoIcon} from '@phosphor-icons/react';
import {CtaBand} from '../components/CtaBand';
import {Img} from '../components/Img';
import {PageHero} from '../components/PageHero';
import {castles, gallery} from '../content';
import {useReveals} from '../hooks/useReveals';
import {href, quoteText, whatsapp} from '../lib/links';
import {delay} from '../lib/style';

const altFor = (slug: string) => gallery.find((g) => g.photo === slug)?.alt ?? '';

export default function Castles() {
  const ref = useReveals<HTMLDivElement>();

  return (
    <div ref={ref}>
      <PageHero
        num="02"
        label="Our Castles"
        lines={[{t: 'Meet the'}, {t: 'Castles.', i: true}]}
        body="Two crowd-pleasers, both built for little legs and big imaginations. Pick one, or book both for a bigger party."
        photo="castle-courtyard"
        alt="The Classic Castle set up in a sunny courtyard"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {castles.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="btn bg-white/15 text-white backdrop-blur-md hover:bg-white/25">
              {c.name}
            </a>
          ))}
        </div>
      </PageHero>

      {castles.map((c, ci) => (
        <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className={`scroll-mt-6 px-5 py-24 md:px-14 md:py-32 ${ci % 2 ? 'bg-paper' : ''}`}>
          <div className={`mx-auto grid max-w-[1400px] items-start gap-12 lg:grid-cols-2 lg:gap-20`}>
            {/* Photo collage */}
            <div className={`grid grid-cols-3 grid-rows-[auto_auto] gap-3 lg:sticky lg:top-28 ${ci % 2 ? 'lg:order-2' : ''}`}>
              <div data-reveal className="col-span-3 aspect-[4/3] overflow-hidden rounded-[28px]" style={{background: c.tint}}>
                <Img slug={c.photos[0]} alt={altFor(c.photos[0])} sizes="(max-width: 1023px) 100vw, 50vw" className="h-full w-full object-cover" />
              </div>
              {c.photos.slice(1).map((p, i) => (
                <div key={p} data-reveal style={delay(0.1 + i * 0.08)} className="aspect-square overflow-hidden rounded-[22px] bg-ink/10">
                  <Img slug={p} alt={altFor(p)} sizes="(max-width: 1023px) 33vw, 16vw" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>

            {/* Details */}
            <div>
              <p data-reveal className="caps" style={{color: c.tint}}>
                0{ci + 1} · {c.kicker}
              </p>
              <h2 id={`${c.id}-title`} data-reveal style={delay(0.05)} className="display mt-3 text-[clamp(44px,5.4vw,88px)]">
                {c.name}
              </h2>
              {c.body.map((p, i) => (
                <p key={i} data-reveal style={delay(0.1 + i * 0.05)} className="mt-5 max-w-[560px] text-[19px] text-ink/80">
                  {p}
                </p>
              ))}

              <div data-reveal style={delay(0.2)} className="mt-8">
                <h3 className="caps text-ink/60">Perfect for</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {c.perfectFor.map((t) => (
                    <li key={t} className="rounded-full bg-ink px-4 py-2 text-[15px] font-extrabold text-white">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal style={delay(0.25)} className="card mt-8 p-6">
                <h3 className="caps text-ink/60">Good to know</h3>
                <ul className="mt-3 space-y-2.5">
                  {c.goodToKnow.map((t) => (
                    <li key={t} className="flex gap-3 text-[17px]">
                      <CheckCircleIcon size={24} weight="fill" className="shrink-0 text-leaf" aria-hidden /> {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div data-reveal style={delay(0.3)} className="mt-9 flex flex-wrap gap-3">
                <a href={whatsapp(quoteText(c.name))} target="_blank" rel="noopener" className="btn bg-leaf text-white">
                  <WhatsappLogoIcon size={22} weight="fill" aria-hidden /> Quote for this castle
                </a>
                <a href={href('/gallery/')} className="btn bg-cream text-ink ring-3 ring-ink/10">
                  More photos <ArrowRightIcon size={18} weight="bold" aria-hidden />
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Extras nudge */}
      <section className="px-5 pb-24 md:px-14">
        <a
          href={href('/extras/')}
          data-reveal
          className="group mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6 rounded-[32px] bg-grape px-8 py-10 text-white md:px-14"
        >
          <span>
            <span className="caps text-sun">Make it a party</span>
            <span className="display mt-2 block text-[clamp(32px,4vw,60px)]">
              Add tables <span className="it text-sun">& chairs</span>
            </span>
          </span>
          <span className="btn bg-sun text-ink">
            Party extras <ArrowRightIcon size={18} weight="bold" className="transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </a>
      </section>

      <CtaBand />
    </div>
  );
}
