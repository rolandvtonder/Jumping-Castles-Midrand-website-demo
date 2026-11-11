import {WhatsappLogoIcon} from '@phosphor-icons/react';
import {CtaBand} from '../components/CtaBand';
import {Img} from '../components/Img';
import {PageHero} from '../components/PageHero';
import {extras, gallery} from '../content';
import {useReveals} from '../hooks/useReveals';
import {quoteText, whatsapp} from '../lib/links';
import {delay} from '../lib/style';

const altFor = (slug: string) => gallery.find((g) => g.photo === slug)?.alt ?? '';

export default function Extras() {
  const ref = useReveals<HTMLDivElement>();

  return (
    <div ref={ref}>
      <PageHero
        num="03"
        label="Party Extras"
        lines={[{t: 'Party'}, {t: 'Extras.', i: true}]}
        body="Everything else you need around the castle: somewhere for the kids to eat cake and somewhere for the grown-ups to sit."
        photo="garden-tables"
        alt="White party tables and chairs on a lawn with a jumping castle behind them"
      />

      <section className="mx-auto max-w-[1400px] px-5 py-24 md:px-14 md:py-32">
        <h2 data-reveal className="display text-[clamp(40px,5vw,80px)]">
          Add-ons to <span className="it text-red">your booking</span>
        </h2>
        <p data-reveal style={delay(0.05)} className="mt-5 max-w-[620px] text-[19px] text-ink/80">
          Hiring a castle? Add any of these to the same booking and we'll deliver everything together.
        </p>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {extras.map((x, i) => (
            <article key={x.id} id={x.id} data-reveal style={delay(0.1 + i * 0.1)} className="card flex flex-col overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden" style={{background: x.tint}}>
                <Img slug={x.photo} alt={altFor(x.photo)} sizes="(max-width: 767px) 100vw, 33vw" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="h-2 w-14 rounded-full" style={{background: x.tint}} aria-hidden />
                <h3 className="mt-4 text-[28px] leading-tight font-black">{x.name}</h3>
                <p className="mt-3 flex-1 text-ink/75">{x.body}</p>
                <a href={whatsapp(quoteText(x.name))} target="_blank" rel="noopener" className="btn mt-7 self-start bg-leaf text-white">
                  <WhatsappLogoIcon size={20} weight="fill" aria-hidden /> Ask about this
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title={['Build your', 'party pack']} body="Tell us which castle and extras you'd like, your date and your area. We'll send you one quote for the lot." />
    </div>
  );
}
