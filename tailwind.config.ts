import type { Config } from 'tailwindcss';

/**
 * Tokens del sistema "boletín estadístico": papel blanco frío, tinta azul marino,
 * un carmesí para marcas y enlaces. El detalle está en DESIGN.md.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        tint: '#EEF2F7',
        ink: {
          DEFAULT: '#0F1E3C',
          soft: '#33415C',
        },
        muted: '#56637C',
        line: '#C6D0DD',
        navy: {
          DEFAULT: '#12233F',
          deep: '#0B1830',
          line: '#2F446E',
          soft: '#B4C2DA',
        },
        accent: {
          DEFAULT: '#B5122F',
          deep: '#8A0C22',
          bright: '#FF6B81',
        },
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'Arial Narrow', 'sans-serif'],
        sans: ['var(--font-source-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
        sheet: '78rem',
      },
    },
  },
  plugins: [],
};

export default config;
