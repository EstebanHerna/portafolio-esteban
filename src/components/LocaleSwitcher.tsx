'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

/** Conmutador ES / EN. El idioma activo va subrayado; el otro es el que se puede pulsar. */
export function LocaleSwitcher({ onCover = false }: { onCover?: boolean }) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const current = onCover ? 'text-white' : 'text-ink';
  const other = onCover ? 'text-navy-soft hover:text-white' : 'text-muted hover:text-accent';

  return (
    <div
      className="flex items-center gap-2 text-[0.9375rem] font-semibold"
      role="group"
      aria-label={t('language')}
    >
      {routing.locales.map((loc) => {
        const isCurrent = loc === locale;
        return (
          <button
            key={loc}
            type="button"
            lang={loc}
            aria-current={isCurrent ? 'true' : undefined}
            disabled={isCurrent || pending}
            onClick={() =>
              startTransition(() => {
                router.replace(pathname, { locale: loc });
              })
            }
            className={`uppercase transition-colors ${
              isCurrent ? `${current} underline decoration-2 underline-offset-[5px]` : other
            }`}
          >
            {loc}
          </button>
        );
      })}
    </div>
  );
}
