import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { profile } from '@/lib/data/profile';

export async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-editorial flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-serif text-lg text-ink">{profile.shortName}</p>
          <p className="mt-1 max-w-prose text-sm text-muted">{t('builtWith')}</p>
        </div>
        <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider">
          <div className="flex flex-wrap gap-4">
            {profile.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="text-muted transition-colors hover:text-agar-deep"
              >
                {s.label}
              </a>
            ))}
            <Link href="/contacto" className="text-muted transition-colors hover:text-agar-deep">
              {t('security') === 'Security policy' ? 'Contact' : 'Contacto'}
            </Link>
          </div>
          <a href="/SECURITY.md" className="text-muted transition-colors hover:text-agar-deep">
            {t('security')}
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-editorial px-5 py-4 font-mono text-[0.68rem] text-muted md:px-8">
          &copy; {year} {profile.name}. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
