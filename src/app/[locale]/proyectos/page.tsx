import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectsTable } from '@/components/ProjectsTable';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: 'projects' });
  return { title: t('title'), description: t('subtitle') };
}

export default async function ProjectsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations('projects');

  return (
    <section className="sheet pb-24 pt-12 md:pt-16">
      <h1 className="title-page">{t('title')}</h1>
      <p className="mt-4 max-w-prose text-[1.125rem]">{t('subtitle')}</p>

      <ProjectsTable
        locale={locale}
        className="mt-12"
        caption={
          <>
            <span className="caption-num">{t('tableLabel')}</span> {t('tableTitle')}
          </>
        }
      />
      <p className="fuente">
        <b>{t('source')}</b> {t('tableSource')}
      </p>
      <p className="fuente">
        <b>{t('note')}</b> {t('tableNote')}
      </p>
    </section>
  );
}
