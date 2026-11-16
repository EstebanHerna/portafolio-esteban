import { getTranslations } from 'next-intl/server';
import type { Locale, Pipeline } from '@/lib/types';

/**
 * Diagrama de etapas de un flujo de datos: las fuentes entran por arriba, las
 * etapas se leen en orden de ejecución sobre una línea vertical y el resultado
 * cierra abajo. Los números de etapa son información: es el orden en que corre.
 */
export async function PipelineDiagram({
  pipeline,
  locale,
}: {
  pipeline: Pipeline;
  locale: Locale;
}) {
  const t = await getTranslations('projects');

  return (
    <figure className="mt-12">
      <figcaption className="caption mb-2">
        <span className="caption-num">{t('pipelineLabel')}</span> {pipeline.title[locale]}
      </figcaption>

      <div className="border-b border-t-2 border-ink">
        {/* Fuentes */}
        <p className="border-b border-ink bg-tint px-3 py-2 font-display text-[0.9375rem] font-semibold text-ink [font-stretch:88%]">
          {t('pipelineSources')}
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-4">
          {pipeline.sources.map((s, i) => (
            <li
              key={s.name}
              className={`border-b border-line px-3 py-3 ${i % 2 === 0 ? 'border-r' : ''} ${
                i < pipeline.sources.length - 1 ? 'sm:border-r' : 'sm:border-r-0'
              }`}
            >
              <span className="block font-display font-bold text-ink [font-stretch:96%]">
                {s.name}
              </span>
              <span className="mt-0.5 block text-[0.9375rem] leading-snug text-muted">
                {s.what[locale]}
              </span>
            </li>
          ))}
        </ul>

        {/* Etapas, en orden de ejecución */}
        <p className="border-b border-ink bg-tint px-3 py-2 font-display text-[0.9375rem] font-semibold text-ink [font-stretch:88%]">
          {t('pipelineStages')}
        </p>
        <ol className="relative px-3 py-4">
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[1.4375rem] top-4 w-0.5 bg-ink"
          />
          {pipeline.stages.map((stage, i) => (
            <li key={stage.name.en} className="relative flex gap-4 pb-5 last:pb-0">
              <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center bg-ink font-display text-[0.8125rem] font-bold tabular-nums text-white">
                {i + 1}
              </span>
              <span>
                <span className="block font-semibold leading-6 text-ink">{stage.name[locale]}</span>
                <span className="mt-0.5 block text-[0.9375rem] leading-snug">
                  {stage.detail[locale]}
                </span>
              </span>
            </li>
          ))}
        </ol>

        {/* Resultado */}
        <p className="bg-ink px-3 py-3 text-white">
          <span className="font-display font-semibold [font-stretch:88%]">
            {t('pipelineOutput')}
          </span>{' '}
          {pipeline.output[locale]}
        </p>
      </div>

      <p className="fuente">
        <b>{t('source')}</b> {pipeline.source[locale]}
      </p>
      <p className="fuente">
        <b>{t('note')}</b> {pipeline.note[locale]}
      </p>
    </figure>
  );
}
