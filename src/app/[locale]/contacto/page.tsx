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
    <section className="sheet pb-24 pt-12 md:pt-16">
      <h1 className="title-page">{t('title')}</h1>
      <p className="mt-4 max-w-prose text-[1.125rem]">{t('subtitle')}</p>
      <p className="mt-3 max-w-prose">{profile.availability[locale]}</p>

      <div className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <ContactForm />
        </div>

        <aside className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <h2 className="caption mb-2">{t('directTitle')}</h2>
          <dl className="border-b border-t-2 border-ink">
            <div className="border-b border-line py-3">
              <dt className="font-display text-[0.9375rem] font-semibold text-ink [font-stretch:88%]">
                {t('emailLabel')}
              </dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="link break-all">
                  {profile.email}
                </a>
              </dd>
            </div>
            {profile.socials.map((s) => (
              <div key={s.href} className="border-b border-line py-3">
                <dt className="font-display text-[0.9375rem] font-semibold text-ink [font-stretch:88%]">
                  {s.label}
                </dt>
                <dd>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="link break-all"
                  >
                    {s.href.replace('https://', '').replace('www.', '')}
                  </a>
                </dd>
              </div>
            ))}
            <div className="py-3">
              <dt className="font-display text-[0.9375rem] font-semibold text-ink [font-stretch:88%]">
                {t('cvLabel')}
              </dt>
              <dd className="flex flex-col">
                <a href={profile.cv.es} download className="link w-fit">
                  {t('cvEs')}
                </a>
                <a href={profile.cv.en} download className="link w-fit">
                  {t('cvEn')}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
