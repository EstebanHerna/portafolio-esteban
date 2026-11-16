import { getTranslations } from 'next-intl/server';
import { profile } from '@/lib/data/profile';

/** Pie del boletín: de dónde salen las cifras, contacto y fecha de actualización. */
export async function Footer() {
  const t = await getTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink">
      <div className="sheet grid gap-8 py-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-display text-[1.125rem] font-bold text-ink [font-stretch:104%]">
            {profile.name}
          </p>
          <p className="mt-2 max-w-prose text-[0.9375rem] text-muted">{t('method')}</p>
        </div>
        <ul className="space-y-1.5 text-[0.9375rem] md:col-span-5 md:justify-self-end">
          <li>
            <a href={`mailto:${profile.email}`} className="link">
              {profile.email}
            </a>
          </li>
          {profile.socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="me noopener noreferrer" className="link">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/.well-known/security.txt" className="link">
              {t('security')}
            </a>
          </li>
        </ul>
      </div>
      <div className="border-t border-line">
        <p className="sheet py-4 text-[0.875rem] text-muted">
          &copy; {year} {profile.name}. {t('rights')} {t('updated')}
        </p>
      </div>
    </footer>
  );
}
