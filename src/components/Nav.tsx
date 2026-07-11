'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { LocaleSwitcher } from './LocaleSwitcher';
import { Menu, X } from 'lucide-react';

const items = [
  { href: '/', key: 'home' as const },
  { href: '/proyectos', key: 'projects' as const },
  { href: '/explorar', key: 'explore' as const },
  { href: '/proceso', key: 'process' as const },
  { href: '/trayectoria', key: 'timeline' as const },
  { href: '/sobre-mi', key: 'about' as const },
  { href: '/contacto', key: 'contact' as const },
];

export function Nav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bone/85 backdrop-blur-[2px]">
      <nav className="mx-auto flex max-w-editorial items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="font-serif text-lg font-semibold tracking-tightish text-ink">
          Esteban Hernandez
          <span className="ml-1 text-agar" aria-hidden="true">
            .
          </span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {items.slice(1).map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={isActive(it.href) ? 'page' : undefined}
                className={
                  isActive(it.href)
                    ? 'font-mono text-xs uppercase tracking-wider text-agar-deep'
                    : 'font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-ink'
                }
              >
                {t(it.key)}
              </Link>
            </li>
          ))}
          <li>
            <LocaleSwitcher />
          </li>
        </ul>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleSwitcher />
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={t('toggleMenu')}
            onClick={() => setOpen((v) => !v)}
            className="text-ink"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line md:hidden">
          <ul className="mx-auto flex max-w-editorial flex-col px-5 py-2">
            {items.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(it.href) ? 'page' : undefined}
                  className={
                    isActive(it.href)
                      ? 'block py-2.5 font-mono text-sm uppercase tracking-wider text-agar-deep'
                      : 'block py-2.5 font-mono text-sm uppercase tracking-wider text-muted'
                  }
                >
                  {t(it.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
