import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { ProjectArticle } from '@/components/ProjectArticle';
import { getProject, projects } from '@/lib/data/projects';
import { routing, type Locale } from '@/i18n/routing';

type Params = Promise<{ locale: string; slug: string }>;

/** Una sola ruta para todos los proyectos: agregar uno es agregar una entrada en los datos. */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.name[locale], description: project.tagline[locale] };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { locale, slug } = (await params) as { locale: Locale; slug: string };
  setRequestLocale(locale);
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectArticle project={project} locale={locale} />;
}
