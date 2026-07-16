'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useTransition } from 'react';

export function LocaleSwitcher() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <div
      className="flex items-center gap-1 font-mono text-xs"
      role="group"
      aria-label={t('language')}
    >
      {routing.locales.map((loc, i) => {
        const active = loc === locale;
        return (
          <span key={loc} className="flex items-center">
            {i > 0 && (
              <span className="px-1 text-line" aria-hidden="true">
                /
              </span>
            )}
            <button
              type="button"
              lang={loc}
              aria-current={active ? 'true' : undefined}
              disabled={active || pending}
              onClick={() =>
                startTransition(() => {
                  router.replace(pathname, { locale: loc });
                })
              }
              className={
                active
                  ? 'uppercase text-agar-deep'
                  : 'pressable uppercase text-muted underline decoration-line underline-offset-4 hover:text-ink'
              }
            >
              {loc}
            </button>
          </span>
        );
      })}
    </div>
  );
}
