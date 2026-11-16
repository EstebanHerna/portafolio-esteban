'use client';

import { useEffect, useRef, useState } from 'react';

export interface Bar {
  label: string;
  /** Texto de la cifra tal como se imprime. */
  display: string;
  value: number;
  /** La barra que lleva el resultado se pinta en carmesí. */
  highlight?: boolean;
}

/**
 * Par de barras horizontales con rótulo directo, sobre un eje común que va de 0 a `max`.
 * `ticks` son las marcas del eje, repartidas a distancias iguales (la primera es 0 y la
 * última es `max`). El servidor entrega las barras dibujadas; en el cliente, si el
 * gráfico aún no está en pantalla, se recogen y crecen desde el eje una sola vez.
 */
export function BarPair({ bars, max, ticks }: { bars: Bar[]; max: number; ticks: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;

    setCollapsed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setCollapsed(false);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Líneas de referencia en cada marca intermedia del eje.
  const steps = ticks.length - 1;
  const gridlines = `repeating-linear-gradient(to right, transparent 0, transparent calc(100% / ${steps} - 1px), #C6D0DD calc(100% / ${steps} - 1px), #C6D0DD calc(100% / ${steps}))`;

  return (
    <div ref={ref}>
      <dl className="space-y-4">
        {bars.map((bar, i) => (
          <div key={bar.label}>
            <dt className="flex items-baseline justify-between gap-4 text-[0.9375rem] text-ink-soft">
              <span>{bar.label}</span>
              <span className="cifra">{bar.display}</span>
            </dt>
            <dd className="mt-1.5 h-5 bg-tint" style={{ backgroundImage: gridlines }}>
              <div
                className={`h-full origin-left ${bar.highlight ? 'bg-accent' : 'bg-ink'}`}
                style={{
                  width: `${(bar.value / max) * 100}%`,
                  transform: collapsed ? 'scaleX(0)' : 'scaleX(1)',
                  transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`,
                }}
              />
            </dd>
          </div>
        ))}
      </dl>
      <div
        className="relative mt-1.5 h-6 border-t border-ink text-[0.8125rem] tabular-nums text-muted"
        aria-hidden="true"
      >
        {ticks.map((tick, i) => (
          <span
            key={tick}
            className="absolute top-1"
            style={
              i === 0
                ? { left: 0 }
                : i === steps
                  ? { right: 0 }
                  : { left: `${(i / steps) * 100}%`, transform: 'translateX(-50%)' }
            }
          >
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
}
