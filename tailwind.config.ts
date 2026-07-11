import type { Config } from 'tailwindcss';

/**
 * Tokens de diseno del portafolio. Estetica "cuaderno de laboratorio editorial".
 * Ningun token usa Inter, gradientes violeta-azul ni glassmorphism.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bone: {
          DEFAULT: '#F4F0E6',
          deep: '#EBE5D6',
        },
        ink: {
          DEFAULT: '#1A1712',
          soft: '#3A352C',
        },
        agar: {
          DEFAULT: '#B8862F',
          deep: '#7A5416',
        },
        muted: '#6B6355',
        line: '#D8D0BE',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-mona-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
        editorial: '76rem',
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
      keyframes: {
        'reveal-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'reveal-up': 'reveal-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
