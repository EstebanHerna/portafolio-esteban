'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';

/**
 * Curva de crecimiento de turbidez de un hemocultivo. Se dibuja progresivamente
 * con `pathLength` (Motion normaliza dasharray/dashoffset por dentro; poner
 * strokeDashoffset a la vez en `style` y en `animate` entra en conflicto y deja
 * el trazo invisible). No es decorativa: es la misma senal que mide HemoVision
 * (fase lag, exponencial, meseta) y el umbral desde el que se detecta.
 */
export function TurbidityCurve({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const t = useTranslations('home');
  const d = buildGrowthPath();

  return (
    <svg
      className={className}
      viewBox="0 0 640 236"
      role="img"
      aria-label={t('curveAria')}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Ejes discretos */}
      <line x1="24" y1="196" x2="616" y2="196" stroke="#D8D0BE" strokeWidth="1" />
      <line x1="24" y1="24" x2="24" y2="196" stroke="#D8D0BE" strokeWidth="1" />
      {gridTicks().map((x) => (
        <line key={x} x1={x} y1="192" x2={x} y2="196" stroke="#D8D0BE" strokeWidth="1" />
      ))}

      {/* Umbral de deteccion */}
      <line
        x1="24"
        y1="96"
        x2="616"
        y2="96"
        stroke="#B8862F"
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.55"
      />
      <text x="31" y="89" className="font-mono" fill="#6B6355" fontSize="10.5">
        {t('curveThreshold')}
      </text>

      {/* Curva de crecimiento */}
      <motion.path
        d={d}
        fill="none"
        stroke="#B8862F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 2.4, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Punto donde la curva cruza el umbral: aparece cuando el trazo llega */}
      <motion.circle
        cx="360"
        cy="96"
        r="4"
        fill="#7A5416"
        initial={{ opacity: reduce ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: reduce ? 0 : 1.5 }}
      />

      {/* Rotulos de ejes */}
      <text x="24" y="17" className="font-mono" fill="#6B6355" fontSize="10.5">
        {t('curveAxisY')}
      </text>
      <text x="616" y="216" textAnchor="end" className="font-mono" fill="#6B6355" fontSize="10.5">
        {t('curveAxisX')}
      </text>
    </svg>
  );
}

function gridTicks(): number[] {
  const ticks: number[] = [];
  for (let x = 24; x <= 616; x += 74) ticks.push(x);
  return ticks;
}

function buildGrowthPath(): string {
  const x0 = 24;
  const x1 = 616;
  const yTop = 24;
  const yBase = 196;
  const points: string[] = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x0 + t * (x1 - x0);
    // Logistica desplazada: lag plano, subida exponencial, meseta.
    const k = 12;
    const mid = 0.55;
    const s = 1 / (1 + Math.exp(-k * (t - mid)));
    const y = yBase - s * (yBase - yTop);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M ${points.join(' L ')}`;
}
