import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type LangCode = 'en' | 'ha' | 'yo' | 'ig';

const languages: {
  code: LangCode;
  name: string;
  /** ISO 3166-1 alpha-2 for flagcdn.com (UK for English; Nigeria for local languages) */
  flagRegion: 'gb' | 'ng';
}[] = [
  { code: 'en', name: 'English', flagRegion: 'gb' },
  { code: 'ha', name: 'Hausa', flagRegion: 'ng' },
  { code: 'yo', name: 'Yoruba', flagRegion: 'ng' },
  { code: 'ig', name: 'Igbo', flagRegion: 'ng' },
];

function FlagIcon({
  region,
  size = 'md',
  className,
}: {
  region: 'gb' | 'ng';
  size?: 'sm' | 'md';
  className?: string;
}) {
  const w = size === 'sm' ? 20 : 28;
  const h = size === 'sm' ? 13 : 18;
  const src = `https://flagcdn.com/w40/${region}.png`;
  const srcSet = `https://flagcdn.com/w40/${region}.png 1x, https://flagcdn.com/w80/${region}.png 2x`;

  return (
    <span
      className={cn(
        'inline-flex overflow-hidden rounded-[3px] shadow-sm ring-1 ring-black/10 bg-white shrink-0',
        size === 'sm' ? 'w-5 h-[13px]' : 'w-7 h-[18px]',
        className
      )}
    >
      <img
        src={src}
        srcSet={srcSet}
        width={w}
        height={h}
        alt=""
        className="h-full w-full object-cover object-center"
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

/**
 * Language selector: real flag images (emoji flags break on many Windows setups),
 * visible “Language” label, current language name, and a clear dropdown affordance.
 */
export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const current = languages.find((l) => l.code === language) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex items-center gap-2.5 rounded-xl border border-[#1daa62]/25 bg-white px-2.5 py-1.5 text-left',
            'shadow-sm transition-all hover:border-[#1daa62]/45 hover:bg-[#1daa62]/[0.06] hover:shadow',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1daa62]/40 focus-visible:ring-offset-2',
            '[&[data-state=open]>svg:last-child]:rotate-180'
          )}
          aria-label={`${t('nav.language')}: ${current.name}`}
        >
          <FlagIcon region={current.flagRegion} size="md" />

          <div className="flex min-w-0 flex-col gap-0 leading-none">
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-[#1daa62]/75 sm:text-[0.65rem] leading-none">
              {t('nav.language')}
            </span>
            <span className="-mt-px max-w-[6rem] truncate text-xs font-semibold leading-tight text-[#1daa62] sm:max-w-[9rem] sm:text-sm lg:max-w-none">
              {current.name}
            </span>
          </div>

          <ChevronDown className="h-4 w-4 shrink-0 text-[#1daa62]/60 transition-transform duration-200" aria-hidden />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[min(100vw-2rem,17rem)] rounded-xl border border-gray-200 bg-white p-1.5 shadow-xl z-[200]"
      >
        <p className="px-2.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-gray-500">
          {t('nav.language')}
        </p>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={cn(
              'cursor-pointer flex items-center gap-3 rounded-lg px-2.5 py-2.5 text-[#1daa62]',
              'focus:bg-[#1daa62]/10 focus:text-[#158a50]',
              language === lang.code ? 'bg-[#1daa62]/10 font-semibold' : ''
            )}
          >
            <FlagIcon region={lang.flagRegion} size="sm" />
            <span className="flex-1 text-sm">{lang.name}</span>
            {language === lang.code && (
              <svg className="h-4 w-4 shrink-0 text-[#1daa62]" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
