import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
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
    <section className="editorial-grid py-14 md:py-20">
      <div className="col-span-4 md:col-span-12">
        <div className="lab-rule mb-12 max-w-prose">
          <h1 className="font-serif text-4xl text-ink md:text-5xl">{t('title')}</h1>
          <p className="mt-3 text-ink-soft">{t('subtitle')}</p>
        </div>

        <ol className="relative border-l border-line pl-6 md:pl-8">
          {timelineReverse.map((entry, i) => (
            <ScrollReveal
              key={`${entry.sortKey}-${i}`}
              as="li"
              delay={i * 0.03}
              className="relative pb-10 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[calc(1.5rem+3px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-agar bg-bone md:-left-[calc(2rem+3px)]"
              />
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-mono text-xs uppercase tracking-wider text-agar-deep">
                  {entry.date}
                </span>
                <span className="data-chip border-none px-0 text-muted">{entry.tag[locale]}</span>
              </div>
              <h2 className="mt-1.5 font-serif text-xl text-ink">{entry.title[locale]}</h2>
              <p className="mt-1.5 max-w-prose text-ink-soft">{entry.detail[locale]}</p>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
