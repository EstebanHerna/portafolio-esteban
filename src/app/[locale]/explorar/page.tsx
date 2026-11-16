import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Explorer } from '@/components/Explorer';
import { buildCorpus } from '@/lib/rag/corpus';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: 'explore' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ExplorarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations('explore');
  const documents = buildCorpus(locale);

  return (
    <section className="sheet pb-24 pt-12 md:pt-16">
      <h1 className="title-page">{t('title')}</h1>
      <p className="mb-10 mt-4 max-w-prose text-[1.125rem]">{t('subtitle')}</p>
      <Explorer documents={documents} />
    </section>
  );
}
