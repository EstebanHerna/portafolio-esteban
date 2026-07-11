import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  // El locale por defecto (es) no lleva prefijo en la URL; /en si lo lleva.
  localePrefix: 'as-needed',
});

export type Locale = (typeof routing.locales)[number];
