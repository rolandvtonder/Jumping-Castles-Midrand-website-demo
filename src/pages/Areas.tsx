import {MapPinIcon, PlusIcon, WhatsappLogoIcon} from '@phosphor-icons/react';
import {CtaBand} from '../components/CtaBand';
import {PageHero} from '../components/PageHero';
import {areas, faq} from '../content';
import {useReveals} from '../hooks/useReveals';
import {quoteText, whatsapp} from '../lib/links';
import {delay} from '../lib/style';

const TINTS = ['bg-red text-white', 'bg-sun text-ink', 'bg-splash text-ink', 'bg-royal text-white', 'bg-grape text-white', 'bg-leaf text-white'];

export default function Areas() {
  const ref = useReveals<HTMLDivElement>();

  return (
    <div ref={ref}>
      <PageHero
        num="05"
        label="Areas & FAQ"
        lines={[{t: 'Where we'}, {t: 'Bounce.', i: true}]}
        body="Based in Midrand, delivering across Johannesburg, Centurion and Kempton Park. Plus the answers to the questions parents ask us most."
        photo="castle-kids"
        alt="Children bouncing in the Classic Castle"
      />

      {/* Areas */}
      <section id="areas" aria-labelledby="areas-title" className="mx-auto max-w-[1400px] px-5 py-24 md:px-14 md:py-32">
        <p data-reveal className="caps text-red">
          Delivery areas
        </p>
        <h2 id="areas-title" data-reveal style={delay(0.05)} className="display mt-3 text-[clamp(40px,5vw,80px)]">
          We deliver <span className="it text-royal">to you</span>
        </h2>
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((a, i) => (
            <li key={a.name} data-reveal style={delay(0.08 + i * 0.06)} className={`flex items-center gap-5 rounded-[28px] p-7 ${TINTS[i % TINTS.length]}`}>
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/25">
                <MapPinIcon size={30} weight="fill" aria-hidden />
              </span>
              <span>
                <span className="block text-[26px] leading-tight font-black">{a.name}</span>
                {a.note && <span className="mt-0.5 block text-[15px] font-extrabold opacity-85">{a.note}</span>}
              </span>
            </li>
          ))}
        </ul>
        <p data-reveal className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-[18px] text-ink/80">
          Not on the list?
          <a href={whatsapp(quoteText())} target="_blank" rel="noopener" className="btn bg-leaf text-white">
            <WhatsappLogoIcon size={20} weight="fill" aria-hidden /> Ask us anyway
          </a>
        </p>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="bg-paper px-5 py-24 md:px-14 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <p data-reveal className="caps text-red">
              Good questions
            </p>
            <h2 id="faq-title" data-reveal style={delay(0.05)} className="display mt-3 text-[clamp(40px,5vw,80px)]">
              Parents <span className="it block text-royal">ask us</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faq.map((f, i) => (
              <details key={f.q} data-reveal style={delay(0.04 * i)} className="card group overflow-hidden" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 p-6 text-[20px] leading-snug font-black [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sun transition-transform duration-300 ease-bounce group-open:rotate-45" aria-hidden>
                    <PlusIcon size={20} weight="bold" />
                  </span>
                </summary>
                <p className="px-6 pb-6 text-[17px] text-ink/80">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={['Still got', 'a question?']} body="We're happy to help. Send us a WhatsApp or give us a call." />
    </div>
  );
}
