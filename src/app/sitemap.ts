import type { MetadataRoute } from 'next';
import { projects } from '@/lib/data/projects';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://esteban-hernandez.vercel.app';
  const paths = [
    '',
    '/proyectos',
    ...projects.map((p) => `/proyectos/${p.slug}`),
    '/proceso',
    '/trayectoria',
    '/sobre-mi',
    '/contacto',
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    for (const path of paths) {
      entries.push({
        url: `${base}${prefix}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'monthly' : 'yearly',
        priority: path === '' ? 1 : 0.7,
      });
    }
  }
  return entries;
}
