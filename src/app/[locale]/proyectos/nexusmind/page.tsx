import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ProjectArticle } from '@/components/ProjectArticle';
import { getProject } from '@/lib/data/projects';
import type { Locale } from '@/i18n/routing';

const SLUG = 'nexusmind';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const project = getProject(SLUG);
  await getTranslations({ locale, namespace: 'projects' });
  return {
    title: project?.name,
    description: project?.tagline[locale],
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  return <ProjectArticle slug={SLUG} locale={locale} />;
}
