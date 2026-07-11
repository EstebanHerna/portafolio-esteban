import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Fraunces, IBM_Plex_Mono, Hanken_Grotesk } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { profile } from '@/lib/data/profile';
import '../globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz', 'SOFT', 'WONK'],
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

// Mona Sans no esta en Google Fonts. Se usa Hanken Grotesk (sans con caracter,
// no Inter) en la misma ranura. Para usar Mona Sans real, anadir su .woff2 en
// /public/fonts y cambiar a next/font/local manteniendo la variable --font-mona-sans.
const bodySans = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-mona-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: 'meta' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://esteban-hernandez.vercel.app';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('defaultTitle'),
      template: `%s - ${t('siteName')}`,
    },
    description: t('defaultDescription'),
    authors: [{ name: profile.name }],
    alternates: {
      canonical: locale === 'es' ? '/' : '/en',
      languages: { es: '/', en: '/en' },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'es' ? 'es_CO' : 'en_US',
      siteName: t('siteName'),
      title: t('defaultTitle'),
      description: t('defaultDescription'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('defaultTitle'),
      description: t('defaultDescription'),
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  if (!routing.locales.includes(locale)) notFound();
  setRequestLocale(locale);

  // Leer el nonce inyectado por el middleware. Esto activa render dinamico por
  // request para que Next firme sus scripts con el nonce del CSP.
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${plexMono.variable} ${bodySans.variable}`}
    >
      <body>
        {nonce ? <meta name="x-nonce" content={nonce} /> : null}
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-ink focus:bg-bone focus:px-4 focus:py-2 focus:font-mono focus:text-xs"
          >
            {t('skipToContent')}
          </a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
