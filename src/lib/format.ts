import type { Locale } from '@/i18n/routing';

/** Entero con separador de miles del idioma (1.121 en español, 1,121 en inglés). */
export function formatInt(n: number, locale: Locale): string {
  const sep = locale === 'es' ? '.' : ',';
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, sep);
}

/** Decimal con la coma o el punto del idioma. */
export function formatDecimal(n: number, locale: Locale, digits = 1): string {
  const fixed = n.toFixed(digits);
  return locale === 'es' ? fixed.replace('.', ',') : fixed;
}

/** Fecha ISO (YYYY-MM-DD) a texto, sin desfase por zona horaria. */
export function formatDate(iso: string, locale: Locale): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
