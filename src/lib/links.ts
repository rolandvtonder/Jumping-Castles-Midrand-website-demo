import {brand} from '../content';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** A site path like `/castles/` with the deploy base prefixed. */
export const href = (path: string) => `${base}${path}`;

export const media = (slug: string, small = false) => `${base}/media/${slug}${small ? '-sm' : ''}.webp`;

/** WhatsApp click-to-chat link with an optional pre-filled message. */
export const whatsapp = (text?: string) =>
  `https://wa.me/${brand.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const quoteText = (item?: string) =>
  item
    ? `Hi Jumping Castles Midrand! I'd like a quote for the ${item}.\nDate: \nArea: `
    : `Hi Jumping Castles Midrand! I'd like to check availability and get a quote.\nDate: \nArea: `;
