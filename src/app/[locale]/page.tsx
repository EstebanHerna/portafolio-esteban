import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { TurbidityCurve } from '@/components/TurbidityCurve';
import { ScrollReveal } from '@/components/ScrollReveal';
import { featuredProjects, projectsByOrder } from '@/lib/data/projects';
import { profile } from '@/lib/data/profile';
import type { Locale } from '@/i18n/routing';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tp = await getTranslations('projects');

  return (
    <>
      {/* Hero editorial: dos columnas, sin blob ni gradiente. */}
      <section className="border-b border-line">
        <div className="editorial-grid py-16 md:py-24">
          <div className="col-span-4 md:col-span-7">
            <p className="eyebrow">{t('eyebrow')}</p>
            <h1 className="mt-5 font-serif text-[2.1rem] leading-[1.08] text-ink md:text-[3.1rem]">
              {profile.headline[locale]}
            </h1>
            <p className="prose-editorial mt-6">
              <span className="text-ink-soft">{profile.positioning[locale]}</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/proyectos"
                className="pressable group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-bone hover:border-agar-deep hover:bg-agar-deep"
              >
                {t('ctaProjects')}{' '}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                />
              </Link>
              <Link
                href="/proceso"
                className="pressable inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink hover:border-agar hover:text-agar-deep"
              >
                {t('ctaProcess')}
              </Link>
            </div>
          </div>

          <div className="col-span-4 mt-12 md:col-span-5 md:mt-0 md:self-center">
            <figure>
              <TurbidityCurve className="w-full" />
              <figcaption className="mt-3 border-t border-line pt-2 font-mono text-[0.68rem] leading-relaxed text-muted">
                {t('turbidityCaption')}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Proyectos ancla */}
      <section className="editorial-grid py-16 md:py-20">
        <div className="col-span-4 md:col-span-12">
          <ScrollReveal>
            <div className="lab-rule mb-8">
              <h2 className="font-serif text-2xl text-ink md:text-3xl">{t('featuredTitle')}</h2>
              <p className="mt-2 max-w-prose text-ink-soft">{t('featuredSubtitle')}</p>
            </div>
          </ScrollReveal>

          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {featuredProjects.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 0.06} as="article">
                <Link
                  href={`/proyectos/${p.slug}`}
                  className="group flex h-full flex-col bg-bone p-6 transition-colors hover:bg-bone-deep md:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="data-chip">{p.status.label[locale]}</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-agar-deep">
                      {tp('featuredBadge')}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-ink">{p.name}</h3>
                  <p className="mt-3 flex-1 text-ink-soft">{p.tagline[locale]}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors duration-200 group-hover:text-agar-deep">
                    {tp('sectionBuilt')}{' '}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Otros proyectos, en lista editorial */}
          <ul className="mt-10 divide-y divide-line border-t border-line">
            {projectsByOrder
              .filter((p) => !p.featured)
              .map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/proyectos/${p.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-serif text-lg text-ink group-hover:text-agar-deep">
                        {p.name}
                      </span>
                      <span className="hidden text-sm text-muted sm:inline">
                        {p.tagline[locale]}
                      </span>
                    </span>
                    <span className="shrink-0 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                      {p.status.label[locale]}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {/* Proceso condensado */}
      <section className="border-t border-line bg-bone-deep/40">
        <div className="editorial-grid py-16 md:py-20">
          <div className="col-span-4 md:col-span-12">
            <ScrollReveal>
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="lab-rule">
                  <h2 className="font-serif text-2xl text-ink md:text-3xl">{t('processTitle')}</h2>
                  <p className="mt-2 max-w-prose text-ink-soft">{t('processSubtitle')}</p>
                </div>
                <Link
                  href="/proceso"
                  className="inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-agar-deep"
                >
                  {t('processCta')} <ArrowRight size={14} />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
