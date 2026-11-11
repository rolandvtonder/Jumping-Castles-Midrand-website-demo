import {createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode} from 'react';
import {WhatsappLogoIcon} from '@phosphor-icons/react';
import {type PageId} from '../content';
import {useReducedMotion} from '../hooks/useReducedMotion';
import {href, quoteText, whatsapp} from '../lib/links';
import {lockScroll, startScroll} from '../lib/scroll';
import {Footer} from './Footer';
import {Logo} from './Logo';
import {Menu} from './Menu';
import {PageWipe} from './PageWipe';

const Reduced = createContext(false);
/** Whether the visitor asked for reduced motion (shared by every section). */
export const useReduced = () => useContext(Reduced);

/** Shared frame for every page: logo, menu, page wipe, WhatsApp button, footer. */
export function Layout({page, children}: {page: PageId; children: ReactNode}) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => startScroll(reduced), [reduced]);
  useEffect(() => lockScroll(open), [open]);

  const close = useCallback(() => {
    setOpen(false);
    toggle.current?.focus({preventScroll: true});
  }, []);

  return (
    <Reduced.Provider value={reduced}>
      <a
        href="#main"
        className="caps fixed top-3 left-1/2 z-[80] -translate-x-1/2 -translate-y-24 rounded-full bg-sun px-5 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <header>
        <a
          href={href('/')}
          aria-label="Jumping Castles Midrand, home"
          className="fixed top-4 left-4 z-[55] rounded-[22px] bg-cream py-2 pr-4 pl-2.5 shadow-[0_5px_0_rgb(16_26_63/0.25)] ring-2 ring-ink/10 transition-transform duration-300 ease-bounce hover:-rotate-2 md:top-6 md:left-8"
        >
          <Logo />
        </a>

        <button
          ref={toggle}
          type="button"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-controls="site-menu"
          className={`btn fixed top-5 right-4 z-[55] max-sm:px-4 md:top-7 md:right-8 ${open ? 'bg-ink text-white' : 'bg-cream text-ink'}`}
        >
          {open ? 'Close' : 'Menu'}
          <span className={`text-[22px] leading-none transition-transform duration-500 ease-bounce ${open ? 'rotate-45' : ''}`} aria-hidden>
            +
          </span>
        </button>
      </header>

      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />

      {page !== 'contact' && (
        <a
          href={whatsapp(quoteText())}
          target="_blank"
          rel="noopener"
          className={`btn fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[45] bg-sun text-ink md:right-8 md:bottom-7 ${
            open ? 'pointer-events-none translate-y-24 opacity-0' : ''
          }`}
        >
          <WhatsappLogoIcon size={22} weight="fill" aria-hidden />
          Book on <em className="font-black normal-case">WhatsApp</em>
        </a>
      )}

      <Menu open={open} page={page} onClose={close} />
      <PageWipe reduced={reduced} />
    </Reduced.Provider>
  );
}
