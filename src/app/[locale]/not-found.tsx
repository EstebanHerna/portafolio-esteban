import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <section className="sheet py-24">
      <h1 className="title-page">{t('title')}</h1>
      <p className="mt-4 max-w-prose">{t('description')}</p>
      <p className="mt-8">
        <Link href="/" className="btn btn-outline">
          {t('back')}
        </Link>
      </p>
    </section>
  );
}
