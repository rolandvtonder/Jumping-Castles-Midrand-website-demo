import type {ImgHTMLAttributes} from 'react';
import manifest from '../media-manifest.json';
import {media} from '../lib/links';

type Entry = {w: number; h: number; sw: number};
const sizesOf = manifest as Record<string, Entry>;

export const photoSize = (slug: string) => sizesOf[slug];

/**
 * A responsive WebP photo from public/media. Width/height come from the
 * manifest the image script writes, so the browser reserves the right space
 * before the photo arrives (no layout jump).
 */
export function Img({
  slug,
  alt,
  sizes = '100vw',
  priority = false,
  ...rest
}: {slug: string; alt: string; sizes?: string; priority?: boolean} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>) {
  const m = sizesOf[slug];
  if (!m) throw new Error(`Unknown photo "${slug}" — add it to scripts/optimize-images.mjs`);
  return (
    <img
      src={media(slug)}
      srcSet={m.sw < m.w ? `${media(slug, true)} ${m.sw}w, ${media(slug)} ${m.w}w` : undefined}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      {...rest}
    />
  );
}
