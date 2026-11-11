# Jumping Castles Midrand — website

**Live demo:** https://rolandvtonder.github.io/Jumping-Castles-Midrand-website-demo/
(rebuilt automatically by `.github/workflows/deploy.yml` on every push to `main`).

Six pages, each with its own address:

| Page | URL |
|---|---|
| Home | `/` |
| Our Castles | `/castles/` |
| Party Extras | `/extras/` |
| Gallery | `/gallery/` |
| Areas & FAQ | `/areas/` |
| Book & Contact | `/contact/` |

## Run it on your computer

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Change the words

All copy, contact details, castles, extras, gallery captions, areas and FAQ
answers are in **`src/content.ts`**. Edit the text there and save. Nothing
else needs touching.

## Add or swap photos

1. Put the new photo in the `media` folder next to this `website` folder.
2. Add a line for it in `scripts/optimize-images.mjs` (a short name → the file name).
3. Run `npm run images`. This makes web-sized WebP copies in `public/media`.
4. Use the short name in `src/content.ts` (for example in `gallery`).

## Publish it

```bash
npm run build
```

This creates a `dist` folder: a plain static website. Upload the contents of
`dist` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages or
your own web hosting). No server or database is needed. The booking form
opens WhatsApp with the customer's details filled in.
