import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { profile } from '@/lib/data/profile';
import { stack } from '@/lib/data/stack';
import { certifications } from '@/lib/data/certifications';
import { formatDate } from '@/lib/format';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title'), description: profile.degree[locale] };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <section className="sheet pb-24 pt-12 md:pt-16">
      <div className="grid gap-x-14 gap-y-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <h1 className="title-page">{t('title')}</h1>
          <p className="mt-6 max-w-prose text-[1.1875rem] leading-relaxed text-ink">
            {profile.about[locale]}
          </p>
          <p className="mt-5 max-w-prose">{profile.availability[locale]}</p>

          <dl className="mt-10 max-w-prose border-b border-t-2 border-ink">
            <div className="border-b border-line py-4">
              <dt className="font-display font-semibold text-ink [font-stretch:92%]">
                {t('academicTitle')}
              </dt>
              <dd className="mt-1">
                {profile.degree[locale]} {profile.graduation[locale]}.
              </dd>
            </div>
            <div className="border-b border-line py-4">
              <dt className="font-display font-semibold text-ink [font-stretch:92%]">
                {t('coursesTitle')}
              </dt>
              <dd className="mt-1">{profile.courses[locale]}</dd>
            </div>
            <div className="py-4">
              <dt className="font-display font-semibold text-ink [font-stretch:92%]">
                {t('languagesTitle')}
              </dt>
              <dd className="mt-1">{profile.languages[locale]}</dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] w-full max-w-[20rem] bg-tint">
            <Image
              src="/esteban.jpg"
              alt={t('photoAlt')}
              fill
              sizes="(max-width: 768px) 80vw, 20rem"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <table className="cuadro stack-sm mt-16">
        <caption className="caption pb-2 text-left">
          <span className="caption-num">{t('stackLabel')}</span> {t('stackTitle')}
        </caption>
        <thead className="max-sm:sr-only">
          <tr>
            <th scope="col" className="w-[28%]">
              {t('colArea')}
            </th>
            <th scope="col">{t('colTools')}</th>
          </tr>
        </thead>
        <tbody>
          {stack.map((g) => (
            <tr key={g.label.en}>
              <th scope="row">{g.label[locale]}</th>
              <td>{g.items.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fuente">
        <b>{t('note')}</b> {t('stackNote')}
      </p>

      <table className="cuadro stack-md mt-16">
        <caption className="caption pb-2 text-left">
          <span className="caption-num">{t('certsLabel')}</span> {t('certsTitle')}
        </caption>
        <thead className="max-md:sr-only">
          <tr>
            <th scope="col">{t('colCert')}</th>
            <th scope="col" className="w-[18%]">
              {t('colIssuer')}
            </th>
            <th scope="col" className="w-[13%]">
              {t('colDate')}
            </th>
            <th scope="col" className="w-[27%]">
              {t('colCode')}
            </th>
          </tr>
        </thead>
        <tbody>
          {certifications.map((cert) => (
            <tr key={cert.name}>
              <th scope="row">
                {cert.name}
                {cert.duration && (
                  <span className="font-normal text-muted"> ({cert.duration[locale]})</span>
                )}
              </th>
              <td>{cert.issuer}</td>
              <td className="whitespace-nowrap text-[0.9375rem]">
                {formatDate(cert.date, locale)}
              </td>
              <td className="text-[0.9375rem]">
                {cert.code && (
                  <span className="block text-[0.8125rem] text-muted md:whitespace-nowrap">
                    {cert.code}
                  </span>
                )}
                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link mt-0.5 flex w-fit items-center gap-1"
                  >
                    {t('certVerify')} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fuente">
        <b>{t('source')}</b> {t('certsSource')}
      </p>
    </section>
  );
}
