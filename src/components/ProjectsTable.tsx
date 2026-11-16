import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { projectsByOrder } from '@/lib/data/projects';
import type { Locale } from '@/lib/types';

/**
 * Cuadro de proyectos. En pantallas anchas es una tabla de cuatro columnas; en
 * móvil cada fila se apila sin perder el orden de lectura.
 */
export async function ProjectsTable({
  locale,
  caption,
  className = '',
}: {
  locale: Locale;
  caption: React.ReactNode;
  className?: string;
}) {
  const t = await getTranslations('projects');

  return (
    <table className={`cuadro stack-md ${className}`}>
      <caption className="caption pb-2 text-left">{caption}</caption>
      <thead className="max-md:sr-only">
        <tr>
          <th scope="col" className="w-[24%]">
            {t('colProject')}
          </th>
          <th scope="col">{t('colWhat')}</th>
          <th scope="col" className="w-[20%]">
            {t('colStatus')}
          </th>
          <th scope="col" className="w-[15%]">
            {t('colVerify')}
          </th>
        </tr>
      </thead>
      <tbody>
        {projectsByOrder.map((p) => (
          <tr key={p.slug}>
            <th scope="row">
              <Link
                href={`/proyectos/${p.slug}`}
                className="font-display text-[1.125rem] font-bold leading-snug text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors [font-stretch:98%] hover:text-accent"
              >
                {p.name[locale]}
              </Link>
            </th>
            <td>{p.tagline[locale]}</td>
            <td className="text-[0.9375rem]">{p.status.label[locale]}</td>
            <td className="text-[0.9375rem]">
              {p.repoUrl ? (
                <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="link">
                  {t('repoPublic')}
                </a>
              ) : (
                <span className="text-muted">{t('repoPrivate')}</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
