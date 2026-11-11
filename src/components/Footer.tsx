import {EnvelopeSimpleIcon, FacebookLogoIcon, MapPinIcon, PhoneIcon, WhatsappLogoIcon} from '@phosphor-icons/react';
import {areas, brand, footerNote, nav} from '../content';
import {useFitText} from '../hooks/useFitText';
import {href, quoteText, whatsapp} from '../lib/links';
import {Logo} from './Logo';

export function Footer() {
  const mark = useFitText<HTMLSpanElement>();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 pt-20 pb-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_1.3fr_1fr] md:px-14">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-white/75">{footerNote}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="caps text-sun">Pages</h2>
          <ul className="mt-4 space-y-2">
            {nav.map((n) => (
              <li key={n.id}>
                <a href={href(n.href)} className="text-white/85 hover:text-sun">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="caps text-sun">Contact</h2>
          <ul className="mt-4 space-y-3">
            <li>
              <a href={whatsapp(quoteText())} target="_blank" rel="noopener" className="flex items-center gap-2.5 text-white/85 hover:text-sun">
                <WhatsappLogoIcon size={20} aria-hidden /> WhatsApp us
              </a>
            </li>
            <li>
              <a href={`tel:${brand.phoneIntl}`} className="flex items-center gap-2.5 text-white/85 hover:text-sun">
                <PhoneIcon size={20} aria-hidden /> {brand.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${brand.email}`} className="flex items-center gap-2.5 text-white/85 [overflow-wrap:anywhere] hover:text-sun">
                <EnvelopeSimpleIcon size={20} className="shrink-0" aria-hidden /> {brand.email}
              </a>
            </li>
            <li>
              <a href={brand.facebook} target="_blank" rel="noopener" className="flex items-center gap-2.5 text-white/85 hover:text-sun">
                <FacebookLogoIcon size={20} aria-hidden /> Facebook
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="caps text-sun">We deliver to</h2>
          <ul className="mt-4 space-y-2">
            {areas.map((a) => (
              <li key={a.name} className="flex items-center gap-2.5 text-white/85">
                <MapPinIcon size={18} aria-hidden /> {a.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-5 md:px-14" aria-hidden>
        <span ref={mark} className="display inline-block whitespace-nowrap pb-[0.04em] text-sun">
          Let's <span className="it text-white">bounce!</span>
        </span>
      </div>

      <p className="caps mx-auto max-w-[1400px] px-5 pt-6 pb-28 text-white/55 md:px-14">
        © {year} {brand.name} · {brand.base}
      </p>
    </footer>
  );
}
