'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { Plus, Minus } from 'lucide-react';
import { processNodes } from '@/lib/data/process';
import type { Locale } from '@/lib/types';

/**
 * Diagrama de proceso agentico. Trazos SVG dibujados por scroll (getTotalLength
 * + stroke-dashoffset ligado a useScroll), nodos expandibles con evidencia real,
 * navegable por teclado. Bajo prefers-reduced-motion los trazos aparecen dibujados.
 */
export function ProcessDiagram() {
  const t = useTranslations('process');
  const locale = useLocale() as Locale;
  const reduce = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<SVGPathElement>(null);
  const vRef = useRef<SVGPathElement>(null);
  const [hLen, setHLen] = useState(0);
  const [vLen, setVLen] = useState(0);
  const [open, setOpen] = useState<string | null>(processNodes[0]?.id ?? null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'center 40%'],
  });

  const hOffset = useTransform(scrollYProgress, [0, 1], [hLen, 0]);
  const vOffset = useTransform(scrollYProgress, [0, 1], [vLen, 0]);

  useEffect(() => {
    if (hRef.current) setHLen(hRef.current.getTotalLength());
    if (vRef.current) setVLen(vRef.current.getTotalLength());
  }, []);

  const cx = [125, 375, 625, 875];

  return (
    <div ref={containerRef}>
      {/* Conector horizontal (desktop) */}
      <div className="relative hidden md:block" aria-hidden="true">
        <svg viewBox="0 0 1000 40" className="h-10 w-full" preserveAspectRatio="none">
          <line x1="60" y1="20" x2="940" y2="20" stroke="#D8D0BE" strokeWidth="2" />
          <motion.path
            ref={hRef}
            d="M 60 20 L 940 20"
            fill="none"
            stroke="#B8862F"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={
              reduce || hLen === 0
                ? undefined
                : { strokeDasharray: hLen, strokeDashoffset: hOffset }
            }
          />
          {cx.map((x) => (
            <circle key={x} cx={x} cy="20" r="5" fill="#7A5416" />
          ))}
        </svg>
      </div>

      {/* Conector vertical (movil) */}
      <div className="pointer-events-none absolute left-[26px] top-0 hidden" aria-hidden="true" />

      <div className="relative mt-4">
        {/* Linea vertical movil dibujada por scroll */}
        <svg
          viewBox="0 0 20 400"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="absolute left-[10px] top-2 h-[calc(100%-1rem)] w-5 md:hidden"
        >
          <line x1="10" y1="8" x2="10" y2="392" stroke="#D8D0BE" strokeWidth="2" />
          <motion.path
            ref={vRef}
            d="M 10 8 L 10 392"
            fill="none"
            stroke="#B8862F"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={
              reduce || vLen === 0
                ? undefined
                : { strokeDasharray: vLen, strokeDashoffset: vOffset }
            }
          />
        </svg>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-5">
          {processNodes.map((node) => {
            const isOpen = open === node.id;
            const panelId = `process-panel-${node.id}`;
            const btnId = `process-btn-${node.id}`;
            return (
              <li key={node.id} className="relative pl-12 md:pl-0">
                <span
                  aria-hidden="true"
                  className="absolute left-[13px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-agar bg-bone md:hidden"
                />
                <div className="border border-line bg-bone-deep/40">
                  <h3 className="m-0">
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? null : node.id)}
                      className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
                    >
                      <span>
                        <span className="block font-mono text-xs text-agar-deep">
                          {String(node.index + 1).padStart(2, '0')}
                        </span>
                        <span className="mt-1 block font-serif text-lg text-ink">
                          {node.label[locale]}
                        </span>
                      </span>
                      <span className="mt-1 shrink-0 text-agar-deep" aria-hidden="true">
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    hidden={!isOpen}
                    className="px-4 pb-4"
                  >
                    <p className="text-sm leading-relaxed text-ink-soft">{node.summary[locale]}</p>
                    <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                      {t('evidenceTitle')}
                    </p>
                    <ul className="mt-1.5 space-y-1.5">
                      {node.evidence.map((e, i) => (
                        <li key={i} className="flex gap-2 text-sm text-ink-soft">
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-agar"
                            aria-hidden="true"
                          />
                          <span>{e[locale]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
