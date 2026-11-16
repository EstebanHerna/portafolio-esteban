import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { PipelineDiagram } from '@/components/PipelineDiagram';
import { projectsByOrder } from '@/lib/data/projects';
import type { Locale, Project } from '@/lib/types';

/**
 * Artículo de proyecto. Orden fijo: problema, lo construido, cifras con su fuente,
 * aclaración metodológica (mismo peso que las cifras), lo que falta y equipo.
 * La ficha técnica acompaña a la derecha.
 */
export async function ProjectArticle({ project, locale }: { project: Project; locale: Locale }) {
  const t = await getTranslations('projects');

  const index = projectsByOrder.findIndex((p) => p.slug === project.slug);
  const next = projectsByOrder[(index + 1) % projectsByOrder.length];

  return (
    <article className="sheet pb-24 pt-10 md:pt-12">
      <Link
        href="/proyectos"
        className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={15} aria-hidden="true" /> {t('backToProjects')}
      </Link>

      <header className="mt-6 max-w-[52rem]">
        <h1 className="title-page">{project.name[locale]}</h1>
        <p className="mt-5 text-[1.25rem] leading-snug text-ink">{project.tagline[locale]}</p>
      </header>

      <div className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <Section title={t('sectionProblem')} first>
            {project.problem[locale]}
          </Section>
          <Section title={t('sectionBuilt')}>{project.built[locale]}</Section>

          {project.pipeline && <PipelineDiagram pipeline={project.pipeline} locale={locale} />}

          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-12">
              <table className="cuadro stack-sm">
                <caption className="caption pb-2 text-left">
                  <span className="caption-num">{t('metricsLabel')}</span> {t('metricsTitle')}
                </caption>
                <thead className="max-sm:sr-only">
                  <tr>
                    <th scope="col">{t('colIndicator')}</th>
                    <th scope="col" className="text-right">
                      {t('colValue')}
                    </th>
                    <th scope="col" className="w-[40%]">
                      {t('colNote')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {project.metrics.map((m) => (
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
              {project.metricsSource && (
                <p className="fuente">
                  <b>{t('source')}</b> {project.metricsSource[locale]}
                </p>
              )}
            </div>
          )}

          {/* Mismo peso visual que las cifras: recuadro completo en tinta, no nota al pie. */}
          {project.disclaimer && (
            <aside role="note" className="mt-8 border-2 border-ink bg-tint p-5">
              <h2 className="font-display text-[1.0625rem] font-bold text-accent [font-stretch:92%]">
                {t('sectionDisclaimer')}
              </h2>
              <p className="mt-2 text-[1.125rem] leading-relaxed text-ink">
                {project.disclaimer[locale]}
              </p>
            </aside>
          )}

          <Section title={t('sectionPending')}>{project.pending[locale]}</Section>

          {project.collaborators && project.collaborators.length > 0 && (
            <div className="mt-12">
              <h2 className="title-section">{t('sectionTeam')}</h2>
              <ul className="mt-4 space-y-1.5">
                {project.collaborators.map((c) => (
                  <li key={c.name}>
                    <span className="font-semibold text-ink">{c.name}</span>
                    <span className="text-muted">. {c.role[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <aside className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <div className="md:sticky md:top-8">
            <h2 className="caption mb-2">{t('sheetTitle')}</h2>
            <dl className="border-b border-t-2 border-ink">
              <Row term={t('status')}>{project.status.label[locale]}</Row>
              <Row term={t('role')}>{project.role[locale]}</Row>
              <Row term={t('period')}>{project.timeframe[locale]}</Row>
              {project.stack.length > 0 && <Row term={t('stack')}>{project.stack.join(', ')}</Row>}
              <Row term={t('repo')} last>
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link inline-flex items-center gap-1"
                  >
                    {t('viewRepo')} <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                ) : (
                  t('repoPrivateLong')
                )}
              </Row>
            </dl>
            {project.links && project.links.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {project.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link inline-flex items-center gap-1"
                    >
                      {l.label[locale]} <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {next && next.slug !== project.slug && (
        <p className="mt-20 border-t-2 border-ink pt-5">
          <Link
            href={`/proyectos/${next.slug}`}
            className="inline-flex flex-wrap items-center gap-x-2 font-display text-[1.375rem] font-bold text-ink transition-colors [font-stretch:104%] hover:text-accent"
          >
            {t('next')}: {next.name[locale]} <ArrowRight size={22} aria-hidden="true" />
          </Link>
        </p>
      )}
    </article>
  );
}

function Section({
  title,
  children,
  first = false,
}: {
  title: string;
  children: React.ReactNode;
  first?: boolean;
}) {
  return (
    <section className={first ? '' : 'mt-12'}>
      <h2 className="title-section">{title}</h2>
      <p className="mt-4 max-w-prose text-[1.125rem] leading-relaxed">{children}</p>
    </section>
  );
}

function Row({
  term,
  children,
  last = false,
}: {
  term: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`grid grid-cols-[7rem_1fr] gap-3 py-3 ${last ? '' : 'border-b border-line'}`}>
      <dt className="font-display text-[0.9375rem] font-semibold text-ink [font-stretch:88%]">
        {term}
      </dt>
      <dd className="text-[0.9375rem] leading-snug">{children}</dd>
    </div>
  );
}
