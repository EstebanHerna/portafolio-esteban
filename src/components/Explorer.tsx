'use client';

import { useId, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'motion/react';
import { Search, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { TfidfIndex } from '@/lib/rag/tfidf';
import type { DocType, SearchDoc } from '@/lib/rag/corpus';

const FILTERS: (DocType | 'all')[] = ['all', 'project', 'milestone', 'stack', 'cert'];

/**
 * Buscador visual del portafolio. Indexa en el cliente los documentos tipados con
 * el mismo TF-IDF del RAG local (sin API keys, sin red) y filtra/ordena tarjetas.
 * Respeta prefers-reduced-motion y es navegable por teclado.
 */
export function Explorer({ documents }: { documents: SearchDoc[] }) {
  const t = useTranslations('explore');
  const reduce = useReducedMotion();
  const inputId = useId();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<DocType | 'all'>('all');

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
      <div className="relative max-w-xl">
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
          className="w-full border border-line bg-bone py-3 pl-10 pr-4 font-mono text-sm text-ink placeholder:text-muted focus:border-agar focus:outline-none"
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
              className={
                active
                  ? 'pressable border border-agar bg-agar/10 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-agar-deep'
                  : 'pressable border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-muted hover:border-ink hover:text-ink'
              }
            >
              {t(`type_${f}`)}
            </button>
          );
        })}
      </div>

      <p className="mt-6 font-mono text-xs text-muted" aria-live="polite">
        {t('results', { count: results.length })}
      </p>

      {results.length === 0 ? (
        <p className="mt-6 border border-dashed border-line p-6 text-ink-soft">{t('noResults')}</p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((doc, i) => (
            <motion.li
              key={doc.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
                delay: Math.min(i * 0.015, 0.18),
              }}
            >
              <ResultCard doc={doc} typeLabel={t(`type_${doc.type}`)} />
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ResultCard({ doc, typeLabel }: { doc: SearchDoc; typeLabel: string }) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <span className="eyebrow">{typeLabel}</span>
        {doc.href && (
          <ArrowUpRight
            size={15}
            aria-hidden="true"
            className="mt-0.5 text-agar-deep opacity-0 transition-opacity group-hover:opacity-100"
          />
        )}
      </div>
      <h3 className="mt-2 font-serif text-xl leading-snug text-ink">{doc.title}</h3>
      <p className="mt-1.5 line-clamp-3 text-sm text-ink-soft">{doc.subtitle}</p>
      {doc.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {doc.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="data-chip">
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );

  const shell = 'group block h-full border border-line bg-bone p-5 transition-colors';

  return doc.href ? (
    <Link href={doc.href} className={`${shell} hover:border-agar`}>
      {body}
    </Link>
  ) : (
    <div className={shell}>{body}</div>
  );
}
