/**
 * Turns the raw Facebook photos in ../media into web-ready WebP files in
 * public/media, and writes src/media-manifest.json with each image's size so
 * the page can reserve space (no layout jump while photos load).
 *
 * To add a photo: drop it in ../media, add a line to PHOTOS below, run
 * `npm run images`, then reference its slug in src/content.ts.
 */
import sharp from 'sharp';
import {mkdirSync, writeFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(root, '..', 'media');
const OUT = join(root, 'public', 'media');

/** slug → source file. Photos with other businesses' adverts or text overlays are left out. */
const PHOTOS = {
  // Classic Castle
  'castle-courtyard': '475944747_1136686401485342_9058464304231318381_n.jpg',
  'castle-kids': '271724505_1283735018774650_7334476790459628893_n.jpg',
  'castle-garden': '471102330_2024223574725787_3888668845138086132_n.jpg',
  'castle-school': '492563851_1206261041194544_2296229898929926197_n.jpg',
  'castle-paving': '481660503_2077210859427058_6202448816564600507_n.jpg',
  'castle-lawn': '481767656_1156726606147988_6005551434629909906_n.jpg',
  'castle-indoor': '558231746_1320849913068989_5024391225178316901_n.jpg',
  'castles-lineup': '481469509_1156726586147990_9086326355459858224_n.jpg',
  // Palm Tree Slide & Splash
  'combo-party': '481268419_2078090652672412_6554536460035095605_n.jpg',
  'combo-foam-slide': '473620227_2043141299500681_779740138403197456_n.jpg',
  'combo-garden': '482091735_2077210896093721_7282012419079020171_n.jpg',
  'combo-ballpit': '471192482_2024223471392464_560451546828220703_n.jpg',
  'combo-foam': '130764091_1025005861314235_2880208819596471758_n.jpg',
  'combo-pool-party': '470883375_2024223611392450_2442501805590912677_n.jpg',
  'combo-pool-wide': '473344419_2043140989500712_8631629641822503590_n.jpg',
  'combo-foam-kids': '471141091_2024223451392466_6686589261763758863_n.jpg',
  'combo-slider': '130606466_1025005814647573_91222265075499745_n.jpg',
  'combo-slider-2': '471201051_2024223521392459_3531227319113192442_n.jpg',
  'combo-lawn': '481340701_2077210729427071_6368400593301411489_n.jpg',
  'combo-street': '476359806_1136687494818566_3687949433983105268_n.jpg',
  'combo-slide-view': '130669323_1025005777980910_6511803724451333705_n.jpg',
  // Party extras
  'kiddies-tables': '481670179_1156726352814680_41864923503221637_n.jpg',
  'kiddies-set': '481811180_1156726356148013_6228658659180854905_n.jpg',
  'garden-tables': '481472332_1156726602814655_4637227140666781004_n.jpg',
};

const LARGE = 1800; // long side of the full image
const SMALL = 760; // long side of the phone/thumbnail image

mkdirSync(OUT, {recursive: true});
const manifest = {};

for (const [slug, file] of Object.entries(PHOTOS)) {
  const input = join(SRC, file);
  const big = await sharp(input)
    .rotate()
    .resize({width: LARGE, height: LARGE, fit: 'inside', withoutEnlargement: true})
    .webp({quality: 78})
    .toFile(join(OUT, `${slug}.webp`));
  const small = await sharp(input)
    .rotate()
    .resize({width: SMALL, height: SMALL, fit: 'inside', withoutEnlargement: true})
    .webp({quality: 74})
    .toFile(join(OUT, `${slug}-sm.webp`));
  manifest[slug] = {w: big.width, h: big.height, sw: small.width};
  console.log(`${slug}: ${big.width}x${big.height} (${Math.round(big.size / 1024)}KB), sm ${small.width}w`);
}

writeFileSync(join(root, 'src', 'media-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log(`\n${Object.keys(manifest).length} photos written to public/media`);
