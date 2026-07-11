import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/ContactForm';
import { profile } from '@/lib/data/profile';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <section className="editorial-grid py-14 md:py-20">
      <div className="col-span-4 md:col-span-7">
        <div className="lab-rule mb-8 max-w-prose">
          <h1 className="font-serif text-4xl text-ink md:text-5xl">{t('title')}</h1>
          <p className="mt-3 text-ink-soft">{t('subtitle')}</p>
        </div>
        <ContactForm />
      </div>

      <aside className="col-span-4 mt-12 md:col-span-4 md:col-start-9 md:mt-0">
        <h2 className="font-mono text-xs uppercase tracking-wider text-muted">
          {t('directTitle')}
        </h2>
        <ul className="mt-4 space-y-3">
          <li>
            <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              {t('emailLabel')}
            </span>
            <a href={`mailto:${profile.email}`} className="link-underline break-all">
              {profile.email}
            </a>
          </li>
          {profile.socials.map((s) => (
            <li key={s.href}>
              <span className="block font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                {s.label}
              </span>
              <a
                href={s.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="link-underline"
              >
                {s.href.replace('https://', '')}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}
