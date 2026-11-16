import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Archivo, Source_Sans_3 } from 'next/font/google';
import { routing, type Locale } from '@/i18n/routing';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { profile } from '@/lib/data/profile';
import '../globals.css';

// Archivo trae eje de ancho (wdth): un solo archivo cubre titulares anchos y
// cabeceras de cuadro condensadas. Source Sans 3 es la letra de lectura.
const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  axes: ['wdth'],
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portafolio-esteban-mu.vercel.app';

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
    <html lang={locale} className={`${archivo.variable} ${sourceSans.variable}`}>
      <body>
        {nonce ? <meta name="x-nonce" content={nonce} /> : null}
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
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
