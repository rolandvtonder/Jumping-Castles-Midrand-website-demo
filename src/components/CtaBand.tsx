import {PhoneIcon, WhatsappLogoIcon} from '@phosphor-icons/react';
import {brand} from '../content';
import {useReveals} from '../hooks/useReveals';
import {quoteText, whatsapp} from '../lib/links';
import {delay} from '../lib/style';
import {CastleMark} from './Logo';

/** Closing call-to-action used at the bottom of every page. */
export function CtaBand({title = ['Got a date', 'in mind?'], body = 'Send us your date and area on WhatsApp and we will check availability and send you a quote.'}: {title?: [string, string]; body?: string}) {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} className="relative overflow-hidden bg-royal px-5 py-24 text-white md:px-14 md:py-32">
      {/* Decorative bunting */}
      <svg className="absolute inset-x-0 top-0 h-10 w-full" preserveAspectRatio="none" viewBox="0 0 120 10" aria-hidden>
        {Array.from({length: 12}, (_, i) => (
          <path key={i} d={`M${i * 10} 0 L${i * 10 + 10} 0 L${i * 10 + 5} 9 Z`} fill={['#d81f2a', '#ffc72c', '#1fb3dc', '#1b7f37'][i % 4]} />
        ))}
      </svg>
      <CastleMark className="absolute -right-10 -bottom-8 size-[260px] rotate-[-8deg] opacity-25 md:size-[380px]" />

      <div className="relative mx-auto max-w-[1400px]">
        <h2 data-reveal className="display text-[clamp(48px,8vw,128px)]">
          <span className="block">{title[0]}</span>
          <span className="it block text-sun">{title[1]}</span>
        </h2>
        <p data-reveal style={delay(0.1)} className="mt-6 max-w-[520px] text-[19px] text-white/90">
          {body}
        </p>
        <div data-reveal style={delay(0.2)} className="mt-9 flex flex-wrap gap-4">
          <a href={whatsapp(quoteText())} target="_blank" rel="noopener" className="btn bg-sun text-ink">
            <WhatsappLogoIcon size={22} weight="fill" aria-hidden /> Chat on WhatsApp
          </a>
          <a href={`tel:${brand.phoneIntl}`} className="btn bg-white text-ink">
            <PhoneIcon size={22} weight="fill" aria-hidden /> Call {brand.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
