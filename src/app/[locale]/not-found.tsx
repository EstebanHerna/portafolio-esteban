import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <section className="editorial-grid py-24">
      <div className="col-span-4 md:col-span-8">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-4xl text-ink md:text-5xl">{t('title')}</h1>
        <p className="mt-3 text-ink-soft">{t('description')}</p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center border border-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-agar hover:text-agar-deep"
        >
          {t('back')}
        </Link>
      </div>
    </section>
  );
}
