import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { ArrowLeft, ArrowUpRight, Lock } from 'lucide-react';
import { getProject } from '@/lib/data/projects';
import type { Locale } from '@/lib/types';

export async function ProjectArticle({ slug, locale }: { slug: string; locale: Locale }) {
  const project = getProject(slug);
  if (!project) notFound();
  const t = await getTranslations('projects');

  return (
    <article className="editorial-grid py-14 md:py-20">
      {/* Columna de notas al margen */}
      <aside className="col-span-4 md:col-span-3">
        <Link
          href="/proyectos"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors duration-200 hover:text-ink"
        >
          <ArrowLeft
            size={14}
            className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
          />{' '}
          {t('backToProjects')}
        </Link>

        <dl className="mt-8 space-y-5 border-t border-line pt-6 md:sticky md:top-24">
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              {t('status')}
            </dt>
            <dd className="mt-1 text-sm text-ink">{project.status.label[locale]}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              {t('role')}
            </dt>
            <dd className="mt-1 text-sm text-ink">{project.role[locale]}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
              {project.timeframe}
            </dt>
          </div>
          {project.stack.length > 0 && (
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                {t('sectionStack')}
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span key={s} className="data-chip">
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          )}
          <div className="pt-2">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable group inline-flex items-center gap-2 border border-ink px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink hover:border-agar hover:text-agar-deep"
              >
                {t('viewRepo')}{' '}
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted">
                <Lock size={13} /> {t('repoPrivate')}
              </span>
            )}
          </div>
        </dl>
      </aside>

      {/* Cuerpo */}
      <div className="col-span-4 mt-10 md:col-span-8 md:col-start-5 md:mt-0">
        <p className="eyebrow">{project.status.label[locale]}</p>
        <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">{project.name}</h1>
        <p className="prose-editorial mt-5 text-lg">{project.tagline[locale]}</p>

        <Section title={t('sectionProblem')}>{project.problem[locale]}</Section>
        <Section title={t('sectionBuilt')}>{project.built[locale]}</Section>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-10">
            <h2 className="lab-rule font-serif text-xl text-ink">{t('sectionMetrics')}</h2>
            <dl className="mt-5 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {project.metrics.map((m) => (
                <div key={m.value} className="bg-bone p-4">
                  <dt className="font-mono text-2xl text-agar-deep">{m.value}</dt>
                  <dd className="mt-1 text-xs leading-snug text-muted">{m.label[locale]}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {/* Disclaimer con el mismo peso visual que las metricas: bloque destacado, no nota al pie. */}
        {project.disclaimer && (
          <aside
            className="mt-8 border-l-4 border-agar bg-bone-deep/60 p-5"
            role="note"
            aria-label={t('sectionDisclaimer')}
          >
            <p className="font-mono text-[0.68rem] uppercase tracking-wider text-agar-deep">
              {t('sectionDisclaimer')}
            </p>
            <p className="mt-2 text-[1.02rem] leading-relaxed text-ink">
              {project.disclaimer[locale]}
            </p>
          </aside>
        )}

        <Section title={t('sectionPending')}>{project.pending[locale]}</Section>

        {project.collaborators && project.collaborators.length > 0 && (
          <div className="mt-10">
            <h2 className="lab-rule font-serif text-xl text-ink">{t('sectionTeam')}</h2>
            <ul className="mt-4 space-y-2">
              {project.collaborators.map((c) => (
                <li key={c.name} className="flex flex-wrap items-baseline gap-x-3 text-ink-soft">
                  <span className="font-medium text-ink">{c.name}</span>
                  <span className="text-sm text-muted">{c.role[locale]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.links && project.links.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
            {project.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:text-agar-deep"
              >
                {l.label[locale]} <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="lab-rule font-serif text-xl text-ink">{title}</h2>
      <p className="prose-editorial mt-4">{children}</p>
    </section>
  );
}
