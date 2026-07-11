'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Curva de crecimiento de turbidez de un hemocultivo, trazada con la longitud
 * real del path (getTotalLength) y stroke-dashoffset. No es decorativa: es la
 * misma senal que HemoVision mide (fase lag, exponencial, meseta).
 */
export function TurbidityCurve({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);

  // Sigmoide de crecimiento bacteriano muestreada en un viewBox 0..640 x 0..220.
  const d = buildGrowthPath();

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
  }, []);

  return (
    <svg
      className={className}
      viewBox="0 0 640 220"
      role="img"
      aria-label="Curva de crecimiento de turbidez de un hemocultivo"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ejes discretos */}
      <line x1="24" y1="196" x2="616" y2="196" stroke="#D8D0BE" strokeWidth="1" />
      <line x1="24" y1="24" x2="24" y2="196" stroke="#D8D0BE" strokeWidth="1" />
      {gridTicks().map((t) => (
        <line key={t} x1={t} y1="192" x2={t} y2="196" stroke="#D8D0BE" strokeWidth="1" />
      ))}

      {/* umbral de deteccion */}
      <line
        x1="24"
        y1="96"
        x2="616"
        y2="96"
        stroke="#B8862F"
        strokeWidth="1"
        strokeDasharray="3 5"
        opacity="0.5"
      />

      <motion.path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="#B8862F"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={
          reduce || length === 0 ? undefined : { strokeDasharray: length, strokeDashoffset: length }
        }
        animate={reduce || length === 0 ? undefined : { strokeDashoffset: 0 }}
        transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* punto que marca el cruce del umbral */}
      <circle cx="360" cy="96" r="4" fill="#7A5416" />
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
    // logistica desplazada: lag plano, subida, meseta
    const k = 12;
    const mid = 0.55;
    const s = 1 / (1 + Math.exp(-k * (t - mid)));
    const y = yBase - s * (yBase - yTop);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M ${points.join(' L ')}`;
}
