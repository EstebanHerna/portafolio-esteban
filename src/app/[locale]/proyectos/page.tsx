import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/ScrollReveal';
import { projectsByOrder } from '@/lib/data/projects';
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
    <section className="editorial-grid py-14 md:py-20">
      <div className="col-span-4 md:col-span-12">
        <div className="lab-rule mb-10 max-w-prose">
          <h1 className="font-serif text-4xl text-ink md:text-5xl">{t('title')}</h1>
          <p className="mt-3 text-ink-soft">{t('subtitle')}</p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {projectsByOrder.map((p, i) => (
            <ScrollReveal key={p.slug} as="li" delay={i * 0.05}>
              <Link
                href={`/proyectos/${p.slug}`}
                className="group grid grid-cols-1 gap-3 py-7 md:grid-cols-12 md:gap-6"
              >
                <div className="md:col-span-3">
                  <span className="font-mono text-xs text-muted">
                    {String(p.order).padStart(2, '0')}
                  </span>
                  <h2 className="mt-1 font-serif text-2xl text-ink transition-colors group-hover:text-agar-deep">
                    {p.name}
                  </h2>
                  <span className="data-chip mt-2 inline-block">{p.status.label[locale]}</span>
                </div>
                <p className="text-ink-soft md:col-span-8">{p.tagline[locale]}</p>
                <span className="hidden items-start justify-end text-agar-deep md:col-span-1 md:flex">
                  <ArrowRight
                    size={18}
                    className="mt-1 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
