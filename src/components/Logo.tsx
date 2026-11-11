/** The castle mark: two sunny towers with red roofs on a splash-blue floor. */
export function CastleMark({className = ''}: {className?: string}) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <rect x="4" y="44" width="56" height="16" rx="6" fill="#1fb3dc" />
      <rect x="4" y="54" width="56" height="6" rx="3" fill="#d81f2a" />
      <rect x="8" y="22" width="12" height="28" rx="4" fill="#ffc72c" />
      <rect x="44" y="22" width="12" height="28" rx="4" fill="#ffc72c" />
      <rect x="18" y="30" width="28" height="8" rx="4" fill="#d81f2a" />
      <path d="M14 2 L22 22 H6 Z" fill="#d81f2a" stroke="#d81f2a" strokeWidth="2" strokeLinejoin="round" />
      <path d="M50 2 L58 22 H42 Z" fill="#d81f2a" stroke="#d81f2a" strokeWidth="2" strokeLinejoin="round" />
      <rect x="6" y="20" width="16" height="5" rx="2" fill="#101a3f" />
      <rect x="42" y="20" width="16" height="5" rx="2" fill="#101a3f" />
    </svg>
  );
}

/** Wordmark: "Jumping Castles" with "Midrand" on a red pennant. */
export function Logo({light = false, className = ''}: {light?: boolean; className?: string}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <CastleMark className="size-9 shrink-0 sm:size-10" />
      <span className="leading-none">
        <span className={`block text-[15px] font-black tracking-[-0.01em] uppercase sm:text-[17px] ${light ? 'text-white' : 'text-ink'}`}>
          Jumping Castles
        </span>
        <span className="mt-1 inline-block rounded-full bg-red px-2 pt-[3px] pb-[2px] text-[10px] font-black tracking-[0.32em] text-white uppercase">
          Midrand
        </span>
      </span>
    </span>
  );
}
