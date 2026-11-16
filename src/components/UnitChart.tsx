'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { RotateCcw } from 'lucide-react';
import { formatInt } from '@/lib/format';
import type { Locale } from '@/lib/types';

/** 59 x 19 = 1.121: una casilla por municipio, sin sobrantes. */
const COLS = 59;
const ROWS = 19;
const TOTAL = COLS * ROWS;
const CELL = 10;
const DURATION_MS = 4200;

/** Siete casillas marcadas como verificadas. La posición es ilustrativa. */
const CHECKED = [83, 214, 377, 508, 690, 873, 1042];

/**
 * Gráfico de unidades de la ejecución nacional. El servidor lo entrega completo.
 * En el cliente la ejecución se reproduce una vez, la primera vez que el gráfico
 * entra en pantalla, llenando las casillas en orden. Con prefers-reduced-motion
 * se queda en el estado final.
 *
 * En escritorio la figura ocupa toda la altura de la cubierta y las casillas
 * crecen con ella; en móvil conserva la proporción 59:19.
 */
export function UnitChart() {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;
  const uid = useId().replace(/:/g, '');
  const [count, setCount] = useState(TOTAL);
  const frame = useRef<number | null>(null);
  const figure = useRef<HTMLElement>(null);

  const play = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(TOTAL);
      return;
    }
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / DURATION_MS, 1);
      // Arranca rápido y frena al final, como una ejecución que cierra sus últimas tareas.
      const eased = 1 - Math.pow(1 - p, 2.2);
      setCount(Math.round(eased * TOTAL));
      frame.current = p < 1 ? requestAnimationFrame(step) : null;
    };
    setCount(0);
    frame.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const el = figure.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [play]);

  const fullRows = Math.floor(count / COLS);
  const rest = count % COLS;
  const w = COLS * CELL;
  const h = ROWS * CELL;

  return (
    <figure ref={figure} className="flex h-full flex-col">
      <figcaption className="font-display text-[1.0625rem] font-semibold leading-snug text-white [font-stretch:92%]">
        <span className="text-accent-bright">{t('chartLabel')}</span> {t('chartTitle')}
      </figcaption>

      <div className="mt-3 flex min-h-0 flex-1 flex-col border-t-2 border-white pt-3 md:mt-4 md:pt-4">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          role="img"
          aria-label={t('chartAria')}
          className="block aspect-[59/19] w-full md:aspect-auto md:min-h-[11rem] md:flex-1"
        >
          <defs>
            <pattern id={`${uid}-off`} width={CELL} height={CELL} patternUnits="userSpaceOnUse">
              <rect x="1" y="1" width="8" height="8" fill="#2F446E" />
            </pattern>
            <pattern id={`${uid}-on`} width={CELL} height={CELL} patternUnits="userSpaceOnUse">
              <rect x="1" y="1" width="8" height="8" fill="#F4F7FB" />
            </pattern>
          </defs>
          <rect width={w} height={h} fill={`url(#${uid}-off)`} />
          <rect width={w} height={fullRows * CELL} fill={`url(#${uid}-on)`} />
          {rest > 0 && (
            <rect y={fullRows * CELL} width={rest * CELL} height={CELL} fill={`url(#${uid}-on)`} />
          )}
          {CHECKED.filter((i) => i < count).map((i) => (
            <rect
              key={i}
              x={(i % COLS) * CELL + 1}
              y={Math.floor(i / COLS) * CELL + 1}
              width="8"
              height="8"
              fill="#FF6B81"
            />
          ))}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-navy-line pb-3">
        <p className="font-display text-[1.375rem] font-bold tabular-nums text-white [font-stretch:96%]">
          {t('chartCount', {
            count: formatInt(count, locale),
            total: formatInt(TOTAL, locale),
          })}
        </p>
        <button
          type="button"
          onClick={play}
          className="inline-flex items-center gap-1.5 text-[0.9375rem] font-medium text-navy-soft underline decoration-1 underline-offset-[3px] transition-colors hover:text-white"
        >
          <RotateCcw size={14} aria-hidden="true" />
          {t('chartReplay')}
        </button>
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.9375rem] text-navy-soft">
        <li className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 bg-[#F4F7FB]" aria-hidden="true" />
          {t('chartLegendDone')}
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 bg-accent-bright" aria-hidden="true" />
          {t('chartLegendChecked')}
        </li>
      </ul>

      <p className="mt-2 text-[0.9375rem] leading-snug text-navy-soft">
        <b className="font-semibold text-white">{t('source')}</b> {t('chartSource')}
      </p>
      <p className="mt-1 text-[0.9375rem] leading-snug text-navy-soft">
        <b className="font-semibold text-white">{t('note')}</b> {t('chartNote')}
      </p>
    </figure>
  );
}
