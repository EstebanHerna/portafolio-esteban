import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { timelineReverse } from '@/lib/data/timeline';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: 'timeline' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function TimelinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations('timeline');

  return (
    <section className="sheet pb-24 pt-12 md:pt-16">
      <h1 className="title-page">{t('title')}</h1>
      <p className="mt-4 max-w-prose text-[1.125rem]">{t('subtitle')}</p>

      <table className="cuadro stack-md mt-12">
        <caption className="caption pb-2 text-left">
          <span className="caption-num">{t('tableLabel')}</span> {t('tableTitle')}
        </caption>
        <thead className="max-md:sr-only">
          <tr>
            <th scope="col" className="w-[20%]">
              {t('colDate')}
            </th>
            <th scope="col">{t('colWhat')}</th>
            <th scope="col" className="w-[16%]">
              {t('colType')}
            </th>
          </tr>
        </thead>
        <tbody>
          {timelineReverse.map((entry) => (
            <tr key={`${entry.sortKey}-${entry.title.en}`}>
              <td className="whitespace-nowrap font-display font-semibold text-ink [font-stretch:92%]">
                {entry.date[locale]}
              </td>
              <th scope="row" className="font-normal">
                <span className="block font-semibold text-ink">{entry.title[locale]}</span>
                <span className="mt-1 block max-w-prose text-ink-soft">{entry.detail[locale]}</span>
                {entry.href && (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link mt-1.5 inline-flex items-center gap-1 text-[0.9375rem]"
                  >
                    {t('viewLink')} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </th>
              <td className="text-[0.9375rem] text-muted">{entry.tag[locale]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fuente">
        <b>{t('source')}</b> {t('tableSource')}
      </p>
    </section>
  );
}
