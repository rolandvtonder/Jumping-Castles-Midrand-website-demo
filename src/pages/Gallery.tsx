import {useCallback, useEffect, useRef, useState} from 'react';
import {CaretLeftIcon, CaretRightIcon, FacebookLogoIcon, XIcon} from '@phosphor-icons/react';
import {CtaBand} from '../components/CtaBand';
import {Img} from '../components/Img';
import {PageHero} from '../components/PageHero';
import {brand, gallery, type Shot} from '../content';
import {useReveals} from '../hooks/useReveals';
import {lockScroll} from '../lib/scroll';
import {delay} from '../lib/style';

const FILTERS: {id: 'all' | Shot['tag']; label: string}[] = [
  {id: 'all', label: 'Everything'},
  {id: 'classic', label: 'Classic Castle'},
  {id: 'splash', label: 'Slide & Splash'},
  {id: 'extras', label: 'Party extras'},
];

export default function Gallery() {
  const ref = useReveals<HTMLDivElement>();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all');
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  const shots = filter === 'all' ? gallery : gallery.filter((g) => g.tag === filter);

  const show = (i: number, from: HTMLButtonElement) => {
    opener.current = from;
    setOpen(i);
  };
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length)), [shots.length]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) {
      d.showModal();
      lockScroll(true);
    } else if (open === null && d.open) {
      d.close();
    }
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  const current = open === null ? null : shots[open];

  return (
    <div ref={ref}>
      <PageHero
        num="04"
        label="Gallery"
        lines={[{t: 'Real'}, {t: 'Parties.', i: true}]}
        body="Birthdays, school days, office parties and foam-filled afternoons. A peek at our castles out in the wild."
        photo="combo-party"
        alt="The Palm Tree Slide & Splash at a garden party"
      />

      <section aria-labelledby="gallery-title" className="mx-auto max-w-[1500px] px-5 py-20 md:px-14 md:py-28">
        <h2 id="gallery-title" className="sr-only">
          Photos
        </h2>
        <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`btn ${filter === f.id ? 'bg-ink text-white' : 'bg-paper text-ink ring-3 ring-ink/10'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          Showing {shots.length} photos
        </p>

        <ul className="mt-10 columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
          {shots.map((g, i) => (
            <li key={`${filter}-${g.photo}`} data-reveal style={delay((i % 4) * 0.06)} className="mb-3 break-inside-avoid md:mb-4">
              <button
                type="button"
                onClick={(e) => show(i, e.currentTarget)}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-[22px] bg-ink/10"
                aria-label={`Open photo: ${g.alt}`}
              >
                <Img
                  slug={g.photo}
                  alt=""
                  sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
                  className="h-auto w-full transition-transform duration-700 ease-silk group-hover:scale-105"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <a href={brand.facebook} target="_blank" rel="noopener" className="btn bg-royal text-white">
            <FacebookLogoIcon size={22} weight="fill" aria-hidden /> More photos on Facebook
          </a>
        </div>
      </section>

      <dialog
        ref={dialog}
        onClose={() => {
          setOpen(null);
          lockScroll(false);
          opener.current?.focus({preventScroll: true});
        }}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label="Photo viewer"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-white backdrop:bg-ink/80"
      >
        {current && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between gap-4 px-5 pt-5 md:px-8">
              <p className="caps text-white/70">
                {open! + 1} / {shots.length}
              </p>
              <button type="button" onClick={close} className="btn bg-white text-ink" autoFocus>
                Close <XIcon size={18} weight="bold" aria-hidden />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-4 md:px-24" onClick={(e) => e.target === e.currentTarget && close()}>
              <Img key={current.photo} slug={current.photo} alt={current.alt} sizes="100vw" priority className="max-h-full w-auto max-w-full rounded-[18px] object-contain" />
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute top-1/2 left-3 grid size-14 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-sun text-ink shadow-[0_4px_0_rgb(0_0_0/0.3)] md:left-6"
              >
                <CaretLeftIcon size={26} weight="bold" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute top-1/2 right-3 grid size-14 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-sun text-ink shadow-[0_4px_0_rgb(0_0_0/0.3)] md:right-6"
              >
                <CaretRightIcon size={26} weight="bold" aria-hidden />
              </button>
            </div>
            <p className="px-5 pb-6 text-center text-white/85 md:px-8">{current.alt}</p>
          </div>
        )}
      </dialog>

      <CtaBand title={['Your party', 'could be next']} />
    </div>
  );
}
