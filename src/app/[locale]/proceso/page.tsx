import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProcessDiagram } from '@/components/ProcessDiagram';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: 'process' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations('process');

  return (
    <section className="editorial-grid py-14 md:py-20">
      <div className="col-span-4 md:col-span-12">
        <div className="lab-rule mb-12 max-w-prose">
          <h1 className="font-serif text-4xl text-ink md:text-5xl">{t('title')}</h1>
          <p className="mt-3 text-ink-soft">{t('subtitle')}</p>
        </div>
        <ProcessDiagram />
      </div>
    </section>
  );
}
