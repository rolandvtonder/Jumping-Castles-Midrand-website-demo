import {useEffect, useRef, useState, type CSSProperties} from 'react';
import {FacebookLogoIcon, PhoneIcon, WhatsappLogoIcon} from '@phosphor-icons/react';
import {brand, nav, type PageId} from '../content';
import {href, quoteText, whatsapp} from '../lib/links';

/**
 * The menu: three slabs wipe in from the right one after another
 * (castle red, sunshine yellow, cream); the cream one stays and holds the
 * items. Hovering an item makes it jiggle like a bouncing castle wall.
 */
export function Menu({open, page, onClose}: {open: boolean; page: PageId; onClose: () => void}) {
  const [hover, setHover] = useState(-1);
  const first = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) {
      setHover(-1);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    // Move focus into the menu once the paper slab has arrived.
    const t = window.setTimeout(() => first.current?.focus({preventScroll: true}), 420);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const slab = (extra: string) =>
    `absolute inset-y-0 right-0 w-[min(38vw,520px)] max-md:w-full transition-transform duration-[800ms] ease-wipe ${extra} ${
      open ? 'translate-x-0' : 'translate-x-[104%]'
    }`;
  // Open: red → yellow → cream, staggered. Close: the reverse, faster.
  const delay = (k: number): CSSProperties => ({transitionDelay: `${open ? k * 0.09 : (2 - k) * 0.06}s`});

  return (
    <div id="site-menu" inert={!open} className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      {/* Click-away */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={-1}
        onClick={onClose}
        className={`absolute inset-0 cursor-default bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className={slab('bg-red')} style={delay(0)} />
      <div className={slab('bg-sun')} style={delay(1)} />
      <nav
        className={slab('flex flex-col justify-between overflow-y-auto bg-cream px-8 pt-28 pb-8 text-ink md:px-12')}
        style={delay(2)}
        aria-label="Main menu"
      >
        <ul onMouseLeave={() => setHover(-1)}>
          {nav.map((item, i) => {
            const current = item.id === page;
            return (
              <li
                key={item.id}
                className={`transition-[opacity,transform] duration-700 ease-silk ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{transitionDelay: open ? `${0.42 + i * 0.06}s` : '0s'}}
              >
                <a
                  ref={i === 0 ? first : undefined}
                  href={href(item.href)}
                  aria-current={current ? 'page' : undefined}
                  onMouseEnter={() => setHover(i)}
                  onClick={(e) => {
                    if (current) {
                      e.preventDefault();
                      onClose();
                    }
                  }}
                  className={`display relative inline-flex items-center gap-3 py-1.5 text-[clamp(32px,3.4vw,50px)] transition-opacity duration-300 ${
                    hover >= 0 && hover !== i ? 'opacity-40' : 'opacity-100'
                  }`}
                >
                  <span className={`inline-block ${hover === i ? 'jelly' : ''} ${current ? 'text-red' : ''}`}>{item.label}</span>
                  <sup className="caps self-start pt-1 text-[11px] tracking-normal text-ink/45">0{i + 1}</sup>
                  {current && <span className="size-3 rounded-full bg-sun ring-2 ring-ink" aria-hidden />}
                </a>
              </li>
            );
          })}
        </ul>

        <div className={`mt-10 transition-opacity delay-700 duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
          <p className="caps text-ink/55">Get in touch</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href={whatsapp(quoteText())} target="_blank" rel="noopener" className="btn bg-leaf text-white">
              <WhatsappLogoIcon size={20} weight="fill" aria-hidden /> WhatsApp
            </a>
            <a href={`tel:${brand.phoneIntl}`} className="btn bg-ink text-white">
              <PhoneIcon size={20} weight="fill" aria-hidden /> {brand.phone}
            </a>
            <a href={brand.facebook} target="_blank" rel="noopener" className="btn bg-royal text-white" aria-label="Facebook page">
              <FacebookLogoIcon size={20} weight="fill" aria-hidden />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
