import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { UnitChart } from '@/components/UnitChart';
import { BarPair } from '@/components/BarPair';
import { ProjectsTable } from '@/components/ProjectsTable';
import { getProject } from '@/lib/data/projects';
import { profile } from '@/lib/data/profile';
import { stack } from '@/lib/data/stack';
import { formatDecimal } from '@/lib/format';
import type { Locale } from '@/i18n/routing';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations('home');

  const thesis = getProject('salud-ambiental');
  const other: Locale = locale === 'es' ? 'en' : 'es';

  return (
    <>
      {/* Cubierta: campo azul a sangre, titular a la izquierda y el Gráfico 1 a la derecha. */}
      <section className="bg-navy text-white">
        {/*
          En escritorio: texto en siete columnas y el grafico en cinco, a toda la altura.
          En movil el orden es titular, botones de CV, grafico y despues el parrafo.
        */}
        <div className="sheet grid pb-14 pt-10 md:grid-cols-12 md:gap-x-12 md:pb-20 md:pt-16">
          <div className="order-1 md:col-span-7 md:col-start-1">
            <h1 className="font-display text-[2.25rem] font-bold leading-[1.02] tracking-[-0.025em] text-white [font-stretch:110%] sm:text-[3.25rem] lg:text-[4.25rem]">
              {profile.headline[locale]}
            </h1>
            <p className="mt-3 font-display text-[1.125rem] font-medium text-navy-soft [font-stretch:92%] md:mt-4 md:text-[1.5rem]">
              {profile.tools}
            </p>
          </div>

          <p className="order-4 mt-8 max-w-[58ch] text-[1.125rem] leading-relaxed text-white md:order-2 md:col-span-7 md:col-start-1 md:mt-7">
            {profile.positioning[locale]}
          </p>

          <div className="order-2 mt-6 flex flex-wrap gap-3 md:order-3 md:col-span-7 md:col-start-1 md:mt-8">
            <a href={profile.cv[locale]} download className="btn btn-cover">
              <Download size={16} aria-hidden="true" />
              {t('cvPrimary')}
            </a>
            <a href={profile.cv[other]} download lang={other} className="btn btn-cover-outline">
              {t('cvSecondary')}
            </a>
          </div>

          <div className="order-5 md:order-4 md:col-span-7 md:col-start-1">
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[1rem]">
              {profile.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="me noopener noreferrer"
                    className="font-medium text-white underline decoration-navy-soft decoration-1 underline-offset-4 transition-colors hover:decoration-white hover:decoration-2"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-medium text-white underline decoration-navy-soft decoration-1 underline-offset-4 transition-colors hover:decoration-white hover:decoration-2"
                >
                  {profile.email}
                </a>
              </li>
            </ul>
            <p className="mt-10 max-w-[58ch] border-t border-navy-line pt-4 text-[0.9375rem] leading-snug text-navy-soft">
              {profile.name}. {t('byline')}. {profile.graduation[locale]}. {profile.location}.{' '}
              {t('edition')}
            </p>
          </div>

          <div className="order-3 mt-8 md:order-5 md:col-span-5 md:col-start-8 md:row-span-4 md:row-start-1 md:mt-2">
            <UnitChart />
          </div>
        </div>
      </section>

      {/* Cuadro 1: las cifras del proyecto de grado, cada una con cómo se obtuvo. */}
      {thesis?.metrics && (
        <section className="sheet pt-16 md:pt-24">
          <div className="grid gap-x-12 gap-y-6 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="title-section">{thesis.name[locale]}</h2>
              <p className="mt-4">{t('t1Intro')}</p>
              <p className="mt-5">
                <Link
                  href="/proyectos/salud-ambiental"
                  className="link inline-flex items-center gap-1.5"
                >
                  {t('t1Link')} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </p>
            </div>
            <div className="md:col-span-8">
              <table className="cuadro stack-sm">
                <caption className="caption pb-2 text-left">
                  <span className="caption-num">{t('t1Label')}</span> {t('t1Title')}
                </caption>
                <thead className="max-sm:sr-only">
                  <tr>
                    <th scope="col">{t('t1ColIndicator')}</th>
                    <th scope="col" className="text-right">
                      {t('t1ColValue')}
                    </th>
                    <th scope="col" className="w-[42%]">
                      {t('t1ColNote')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {thesis.metrics.map((m) => (
                    <tr key={m.label.en}>
                      <th scope="row">{m.label[locale]}</th>
                      <td className="text-right">
                        <span className="cifra">{m.value[locale]}</span>
                      </td>
                      <td className="text-[0.9375rem] text-muted">{m.note?.[locale]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {thesis.metricsSource && (
                <p className="fuente">
                  <b>{t('source')}</b> {thesis.metricsSource[locale]}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Gráficos 2 y 3: dos antes-y-después medidos. */}
      <section className="sheet pt-16 md:pt-24">
        <h2 className="title-section">{t('chartsTitle')}</h2>
        <div className="mt-8 grid gap-x-12 gap-y-12 md:grid-cols-2">
          <figure>
            <figcaption className="caption mb-4 border-b-2 border-ink pb-2">
              <span className="caption-num">{t('c2Label')}</span> {t('c2Title')}
            </figcaption>
            <BarPair
              max={12}
              ticks={['0', '3', '6', '9', '12 GB']}
              bars={[
                { label: t('c2Before'), display: `> ${formatDecimal(11.8, locale)}`, value: 11.8 },
                {
                  label: t('c2After'),
                  display: formatDecimal(8.71, locale, 2),
                  value: 8.71,
                  highlight: true,
                },
              ]}
            />
            <p className="fuente">
              <b>{t('source')}</b> {t('c2Source')}
            </p>
            <p className="fuente">
              <b>{t('note')}</b> {t('c2Note')}
            </p>
          </figure>
          <figure>
            <figcaption className="caption mb-4 border-b-2 border-ink pb-2">
              <span className="caption-num">{t('c3Label')}</span> {t('c3Title')}
            </figcaption>
            <BarPair
              max={50}
              ticks={['0', '10', '20', '30', '40', '50']}
              bars={[
                { label: t('c3Before'), display: formatDecimal(26.6, locale), value: 26.6 },
                { label: t('c3After'), display: t('c3Approx'), value: 39, highlight: true },
              ]}
            />
            <p className="fuente">
              <b>{t('source')}</b> {t('c3Source')}
            </p>
            <p className="fuente">
              <b>{t('note')}</b> {t('c3Note')}
            </p>
          </figure>
        </div>
      </section>

      {/* Cuadro 2: todos los proyectos. */}
      <section className="sheet pt-16 md:pt-24">
        <ProjectsTable
          locale={locale}
          caption={
            <>
              <span className="caption-num">{t('t2Label')}</span> {t('t2Title')}
            </>
          }
        />
        <p className="fuente">
          <b>{t('source')}</b> {t('t2Source')}
        </p>
        <p className="fuente">
          <b>{t('note')}</b> {t('t2Note')}
        </p>
      </section>

      {/* Cuadro 3: herramientas por área. */}
      <section className="sheet pb-20 pt-16 md:pb-28 md:pt-24">
        <table className="cuadro stack-sm">
          <caption className="caption pb-2 text-left">
            <span className="caption-num">{t('t3Label')}</span> {t('t3Title')}
          </caption>
          <thead className="max-sm:sr-only">
            <tr>
              <th scope="col" className="w-[28%]">
                {t('t3ColArea')}
              </th>
              <th scope="col">{t('t3ColTools')}</th>
            </tr>
          </thead>
          <tbody>
            {stack.map((g) => (
              <tr key={g.label.en}>
                <th scope="row">{g.label[locale]}</th>
                <td>{g.items.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="fuente">
          <b>{t('note')}</b> {t('t3Source')}
        </p>
      </section>

      {/* Cierre: disponibilidad y contacto. */}
      <section className="bg-navy text-white">
        <div className="sheet grid gap-8 py-16 md:grid-cols-12 md:items-end md:py-20">
          <div className="md:col-span-8">
            <h2 className="font-display text-[2rem] font-bold leading-[1.05] tracking-[-0.02em] text-white [font-stretch:108%] md:text-[2.75rem]">
              {t('closeTitle')}
            </h2>
            <p className="mt-4 max-w-[58ch] text-[1.125rem] text-navy-soft">
              {profile.availability[locale]}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <a href={`mailto:${profile.email}`} className="btn btn-cover">
              {t('closeCta')}
            </a>
            <a href={profile.cv[locale]} download className="btn btn-cover-outline">
              <Download size={16} aria-hidden="true" />
              CV
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
