import {useId, useRef, useState, type FormEvent} from 'react';
import {EnvelopeSimpleIcon, FacebookLogoIcon, MapPinIcon, PhoneIcon, WhatsappLogoIcon} from '@phosphor-icons/react';
import {PageHero} from '../components/PageHero';
import {areas, brand, castles, extras} from '../content';
import {useReveals} from '../hooks/useReveals';
import {whatsapp} from '../lib/links';
import {delay} from '../lib/style';

const ITEMS = [...castles.map((c) => c.name), ...extras.map((x) => x.name)];
type Errors = Partial<Record<'name' | 'date' | 'items', string>>;

const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

/**
 * Quote form with no server: it turns the answers into a WhatsApp message to
 * the business and opens it, ready to send. Email is offered as a fallback.
 */
export default function Contact() {
  const ref = useReveals<HTMLDivElement>();
  const uid = useId();
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const message = (fd: FormData) => {
    const items = fd.getAll('items').join(', ');
    const date = String(fd.get('date') || '');
    const nice = date ? new Date(`${date}T12:00`).toLocaleDateString('en-ZA', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}) : '';
    return [
      `Hi Jumping Castles Midrand! I'd like a quote please.`,
      ``,
      `Name: ${fd.get('name')}`,
      `Date: ${nice}`,
      `Area: ${fd.get('area')}`,
      `I'd like: ${items}`,
      fd.get('notes') ? `Notes: ${fd.get('notes')}` : '',
    ]
      .filter((l, i, a) => l !== '' || a[i - 1] !== '')
      .join('\n')
      .trim();
  };

  const validate = (fd: FormData): Errors => {
    const e: Errors = {};
    if (!String(fd.get('name') || '').trim()) e.name = 'Please tell us your name.';
    const d = String(fd.get('date') || '');
    if (!d) e.date = 'Please pick your party date.';
    else if (d < today()) e.date = 'That date has passed. Please pick a date from today onwards.';
    if (fd.getAll('items').length === 0) e.items = 'Please choose at least one item (you can change your mind later).';
    return e;
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fd = new FormData(ev.currentTarget);
    const e = validate(fd);
    setErrors(e);
    const first = (['name', 'date', 'items'] as const).find((k) => e[k]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      return;
    }
    window.open(whatsapp(message(fd)), '_blank', 'noopener');
    setSent(true);
  };

  const emailHref = () => {
    const fd = form.current ? new FormData(form.current) : new FormData();
    return `mailto:${brand.email}?subject=${encodeURIComponent('Jumping castle quote')}&body=${encodeURIComponent(message(fd))}`;
  };

  const field = 'mt-2 block min-h-[52px] w-full rounded-2xl border-3 border-ink/15 bg-white px-4 py-3 text-[17px] font-semibold text-ink outline-none transition-colors focus:border-royal';
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-err`} role="alert" className="mt-2 text-[15px] font-extrabold text-red">
        {errors[k]}
      </p>
    ) : null;

  const contacts = [
    {icon: WhatsappLogoIcon, label: 'WhatsApp', value: brand.phone, href: whatsapp(), ext: true, tint: 'bg-leaf text-white'},
    {icon: PhoneIcon, label: 'Call us', value: brand.phone, href: `tel:${brand.phoneIntl}`, tint: 'bg-sun text-ink'},
    {icon: EnvelopeSimpleIcon, label: 'Email', value: brand.email, href: `mailto:${brand.email}`, tint: 'bg-splash text-ink'},
    {icon: FacebookLogoIcon, label: 'Facebook', value: 'Jumping Castles Midrand', href: brand.facebook, ext: true, tint: 'bg-royal text-white'},
  ];

  return (
    <div ref={ref}>
      <PageHero
        num="06"
        label="Book & Contact"
        lines={[{t: "Let's book"}, {t: 'Your party.', i: true}]}
        body="Fill in a few details and we'll pick it up on WhatsApp, or reach us whichever way suits you."
        photo="combo-garden"
        alt="The Palm Tree Slide & Splash on a green lawn"
      />

      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-24 md:px-14 md:py-32 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        {/* Quote form */}
        <div data-reveal className="card p-6 md:p-10">
          <h2 className="display text-[clamp(36px,4vw,60px)]">
            Get a <span className="it text-red">quote</span>
          </h2>
          <p className="mt-3 text-ink/75">Fields marked * are needed. Pressing send opens WhatsApp with your message ready to go.</p>

          <form ref={form} noValidate onSubmit={onSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor={`${uid}-name`} className="text-[17px] font-black">
                Your name *
              </label>
              <input
                id={`${uid}-name`}
                data-field="name"
                name="name"
                autoComplete="name"
                className={field}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${uid}-name-err` : undefined}
              />
              {err('name')}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor={`${uid}-date`} className="text-[17px] font-black">
                  Party date *
                </label>
                <input
                  id={`${uid}-date`}
                  data-field="date"
                  name="date"
                  type="date"
                  min={today()}
                  className={field}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? `${uid}-date-err` : undefined}
                />
                {err('date')}
              </div>
              <div>
                <label htmlFor={`${uid}-area`} className="text-[17px] font-black">
                  Area
                </label>
                <select id={`${uid}-area`} name="area" className={`${field} cursor-pointer`} defaultValue={areas[0].name}>
                  {areas.map((a) => (
                    <option key={a.name}>{a.name}</option>
                  ))}
                  <option>Somewhere else</option>
                </select>
              </div>
            </div>

            <fieldset aria-describedby={errors.items ? `${uid}-items-err` : undefined}>
              <legend className="text-[17px] font-black">What would you like? *</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {ITEMS.map((item, i) => (
                  <label
                    key={item}
                    className="flex min-h-[52px] cursor-pointer items-center gap-3 rounded-2xl border-3 border-ink/15 bg-white px-4 py-3 font-extrabold transition-colors has-[:checked]:border-royal has-[:checked]:bg-royal/10"
                  >
                    <input type="checkbox" name="items" value={item} data-field={i === 0 ? 'items' : undefined} className="size-5 accent-royal" />
                    {item}
                  </label>
                ))}
              </div>
              {err('items')}
            </fieldset>

            <div>
              <label htmlFor={`${uid}-notes`} className="text-[17px] font-black">
                Anything else?
              </label>
              <textarea id={`${uid}-notes`} name="notes" rows={3} className={`${field} resize-y`} placeholder="Venue, number of kids, indoor or outdoor…" />
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button type="submit" className="btn bg-leaf text-white">
                <WhatsappLogoIcon size={22} weight="fill" aria-hidden /> Send on WhatsApp
              </button>
              <a
                href={`mailto:${brand.email}`}
                onClick={(e) => {
                  e.currentTarget.href = emailHref();
                }}
                className="font-extrabold text-royal underline decoration-3 underline-offset-4 hover:text-ink"
              >
                Prefer email?
              </a>
            </div>
            <p aria-live="polite" className="text-[16px] font-extrabold text-leaf">
              {sent ? 'WhatsApp should have opened with your message. Just press send!' : ''}
            </p>
          </form>
        </div>

        {/* Direct contact */}
        <div>
          <h2 data-reveal className="display text-[clamp(36px,4vw,60px)]">
            Or reach us <span className="it text-royal">directly</span>
          </h2>
          <ul className="mt-8 space-y-4">
            {contacts.map((c, i) => (
              <li key={c.label} data-reveal style={delay(0.05 + i * 0.06)}>
                <a
                  href={c.href}
                  target={c.ext ? '_blank' : undefined}
                  rel={c.ext ? 'noopener' : undefined}
                  className="card group flex items-center gap-5 p-5 transition-transform duration-300 ease-bounce hover:-translate-y-1"
                >
                  <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${c.tint}`}>
                    <c.icon size={28} weight="fill" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="caps block text-ink/60">{c.label}</span>
                    <span className="block text-[19px] font-black break-all">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li data-reveal style={delay(0.3)} className="flex items-center gap-5 rounded-[28px] bg-ink p-5 text-white">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-red">
                <MapPinIcon size={28} weight="fill" aria-hidden />
              </span>
              <span>
                <span className="caps block text-white/70">Based in</span>
                <span className="block text-[19px] font-black">{brand.base}</span>
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
