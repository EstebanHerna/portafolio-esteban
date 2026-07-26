import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ScrollReveal } from '@/components/ScrollReveal';
import { profile } from '@/lib/data/profile';
import { stack } from '@/lib/data/stack';
import { certifications } from '@/lib/data/certifications';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: 'about' });
  return { title: t('title'), description: profile.academic[locale] };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);
  const t = await getTranslations('about');

  return (
    <section className="editorial-grid py-14 md:py-20">
      {/* Foto + intro */}
      <div className="col-span-4 md:col-span-4">
        <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden border border-line bg-bone-deep">
          {/*
            Reemplazar /public/esteban.jpg por la foto real de Esteban cuando este
            disponible. Mantener la relacion de aspecto 4/5 y el recorte definidos aqui.
          */}
          <Image
            src="/esteban.jpg"
            alt={t('photoAlt')}
            fill
            sizes="(max-width: 768px) 80vw, 20rem"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="col-span-4 mt-10 md:col-span-8 md:mt-0">
        <div className="lab-rule max-w-prose">
          <h1 className="font-serif text-4xl text-ink md:text-5xl">{t('title')}</h1>
          <p className="prose-editorial mt-4">{profile.positioning[locale]}</p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted">
              {t('academicTitle')}
            </h2>
            <p className="mt-2 text-ink-soft">{profile.academic[locale]}</p>
            <h3 className="mt-5 font-mono text-xs uppercase tracking-wider text-muted">
              {t('coursesTitle')}
            </h3>
            <p className="mt-2 text-ink-soft">{profile.education[locale]}</p>
          </div>
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-muted">
              {t('languagesTitle')}
            </h2>
            <p className="mt-2 text-ink-soft">{profile.languages[locale]}</p>
          </div>
        </div>

        {/* Stack */}
        <div className="mt-12">
          <h2 className="lab-rule font-serif text-2xl text-ink">{t('stackTitle')}</h2>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            {stack.map((group) => (
              <ScrollReveal key={group.label.en} as="div">
                <dt className="font-mono text-xs uppercase tracking-wider text-agar-deep">
                  {group.label[locale]}
                </dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item} className="data-chip">
                      {item}
                    </span>
                  ))}
                </dd>
              </ScrollReveal>
            ))}
          </dl>
        </div>

        {/* Certificaciones: cada credencial verificable enlaza a su pagina publica. */}
        <div className="mt-12">
          <h2 className="lab-rule font-serif text-2xl text-ink">{t('certsTitle')}</h2>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {certifications.map((cert, i) => {
              const dateLabel = cert.date
                ? new Date(cert.date).toLocaleDateString(locale === 'es' ? 'es-CO' : 'en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  })
                : t('certDatePending');

              const inner = (
                <>
                  <div className="md:col-span-7">
                    <p className="font-serif text-lg text-ink transition-colors duration-200 group-hover:text-agar-deep">
                      {cert.name}
                    </p>
                    <p className="text-sm text-muted">{cert.issuer}</p>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 md:col-span-5 md:mt-0 md:justify-end">
                    <span className="font-mono text-xs text-ink-soft">
                      {dateLabel}
                      {cert.duration ? ` - ${cert.duration}` : ''}
                    </span>
                    {cert.verifyUrl && (
                      <span className="inline-flex items-center gap-1 font-mono text-[0.68rem] uppercase tracking-wider text-muted transition-colors duration-200 group-hover:text-agar-deep">
                        {t('certVerify')}
                        <ArrowUpRight
                          size={13}
                          className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    )}
                  </div>
                </>
              );

              return (
                <ScrollReveal as="li" key={cert.name} delay={i * 0.04}>
                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid gap-1 py-4 transition-colors hover:bg-bone-deep/40 md:grid-cols-12 md:items-center md:gap-4"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="grid gap-1 py-4 md:grid-cols-12 md:items-center md:gap-4">
                      {inner}
                    </div>
                  )}
                </ScrollReveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
