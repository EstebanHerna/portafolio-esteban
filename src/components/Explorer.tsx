'use client';

import { useId, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { TfidfIndex } from '@/lib/rag/tfidf';
import type { DocType, SearchDoc } from '@/lib/rag/corpus';

const FILTERS: (DocType | 'all')[] = ['all', 'project', 'milestone', 'stack', 'cert'];

/**
 * Buscador del portafolio. Indexa en el navegador los documentos tipados con
 * TF-IDF (sin claves de API ni red) y lista los resultados como un cuadro,
 * ordenados por relevancia. Navegable por teclado.
 */
export function Explorer({ documents }: { documents: SearchDoc[] }) {
  const t = useTranslations('explore');
  const inputId = useId();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<DocType | 'all'>('project');

  const index = useMemo(() => new TfidfIndex(documents.map((d) => d.text)), [documents]);

  const results = useMemo(() => {
    const q = query.trim();
    const ranked: SearchDoc[] = q
      ? index
          .query(q)
          .map((h) => documents[h.index])
          .filter((d): d is SearchDoc => Boolean(d))
      : documents;
    return filter === 'all' ? ranked : ranked.filter((d) => d.type === filter);
  }, [query, filter, documents, index]);

  return (
    <div>
      <div className="relative max-w-2xl">
        <label htmlFor={inputId} className="sr-only">
          {t('label')}
        </label>
        <Search
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          id={inputId}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('placeholder')}
          autoComplete="off"
          className="field py-3 pl-10 text-[1.0625rem]"
        />
      </div>

      <div role="group" aria-label={t('filterLabel')} className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f)}
              className={`btn py-2 ${active ? 'border border-ink bg-ink text-white' : 'btn-outline border-line'}`}
            >
              {t(`type_${f}`)}
            </button>
          );
        })}
      </div>

      <p className="caption mb-2 mt-10" aria-live="polite">
        {t('results', { count: results.length })}
      </p>

      {results.length === 0 ? (
        <p className="max-w-[58rem] border-b border-t-2 border-ink py-6">{t('noResults')}</p>
      ) : (
        <table className="cuadro stack-sm max-w-[58rem]">
          <thead className="max-sm:sr-only">
            <tr>
              <th scope="col">{t('colTitle')}</th>
              <th scope="col" className="w-[18%]">
                {t('colType')}
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((doc) => (
              <tr key={doc.id}>
                <th scope="row" className="font-normal">
                  {doc.href ? (
                    <Link
                      href={doc.href}
                      className="font-semibold text-ink underline decoration-accent decoration-1 underline-offset-[3px] transition-colors hover:text-accent"
                    >
                      {doc.title}
                    </Link>
                  ) : (
                    <span className="font-semibold text-ink">{doc.title}</span>
                  )}
                  <span className="mt-0.5 line-clamp-2 block max-w-prose text-[0.9375rem] text-ink-soft">
                    {doc.subtitle}
                  </span>
                </th>
                <td className="text-[0.9375rem] text-muted">{t(`single_${doc.type}`)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
