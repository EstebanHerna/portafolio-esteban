'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';

const items = [
  { href: '/proyectos', key: 'projects' as const },
  { href: '/trayectoria', key: 'timeline' as const },
  { href: '/sobre-mi', key: 'about' as const },
  { href: '/explorar', key: 'explore' as const },
  { href: '/contacto', key: 'contact' as const },
];

/**
 * Cabecera del boletín: nombre a la izquierda, secciones a la derecha. Sobre la
 * portada se imprime en blanco sobre el campo azul; en el resto, en tinta sobre papel.
 */
export function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onCover = pathname === '/';

  const isActive = (href: string) => pathname.startsWith(href);

  const bar = onCover
    ? 'bg-navy text-white border-b border-navy-line'
    : 'bg-paper text-ink border-b-2 border-ink';
  const idle = onCover ? 'text-navy-soft hover:text-white' : 'text-ink-soft hover:text-accent';
  const active = onCover
    ? 'text-white underline decoration-2 underline-offset-[6px]'
    : 'text-accent underline decoration-2 underline-offset-[6px]';

  return (
    <header className={bar}>
      <nav aria-label={t('main')} className="sheet flex items-center justify-between py-4">
        <Link
          href="/"
          className="font-display text-[1.125rem] font-bold tracking-[-0.01em] [font-stretch:104%]"
        >
          Esteban Hernández
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={isActive(it.href) ? 'page' : undefined}
                className={`text-[0.9375rem] font-medium transition-colors ${
                  isActive(it.href) ? active : idle
                }`}
              >
                {t(it.key)}
              </Link>
            </li>
          ))}
          <li>
            <LocaleSwitcher onCover={onCover} />
          </li>
        </ul>

        <div className="flex items-center gap-4 md:hidden">
          <LocaleSwitcher onCover={onCover} />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 p-2"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className={`sheet pb-4 md:hidden ${onCover ? '' : 'border-t border-line'}`}
        >
          {items.map((it) => (
            <li key={it.href} className={onCover ? 'border-t border-navy-line' : ''}>
              <Link
                href={it.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(it.href) ? 'page' : undefined}
                className={`block py-3 text-[1.0625rem] font-medium ${
                  isActive(it.href) ? active : idle
                }`}
              >
                {t(it.key)}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
