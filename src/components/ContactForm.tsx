'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');
  const [errorKey, setErrorKey] = useState<'errorGeneric' | 'errorRate' | 'errorValidation'>(
    'errorGeneric',
  );

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      // Honeypot: los humanos no rellenan este campo oculto.
      company: String(data.get('company') ?? ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        return;
      }
      if (res.status === 429) {
        setErrorKey('errorRate');
      } else if (res.status === 400) {
        setErrorKey('errorValidation');
      } else {
        setErrorKey('errorGeneric');
      }
      setStatus('error');
    } catch {
      setErrorKey('errorGeneric');
      setStatus('error');
    }
  }

  const inputCls =
    'mt-1.5 w-full border border-line bg-bone px-3 py-2.5 font-sans text-ink placeholder:text-muted/70 focus:border-agar';
  const labelCls = 'block font-mono text-xs uppercase tracking-wider text-ink-soft';

  return (
    <form onSubmit={onSubmit} noValidate className="max-w-xl">
      <div className="grid gap-5">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            {t('name')}
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="cf-email" className={labelCls}>
            {t('email')}
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            className={inputCls}
          />
        </div>

        <div>
          <label htmlFor="cf-message" className={labelCls}>
            {t('message')}
          </label>
          <textarea
            id="cf-message"
            name="message"
            required
            rows={5}
            maxLength={4000}
            placeholder={t('messagePlaceholder')}
            className={`${inputCls} resize-y`}
          />
        </div>

        {/* Honeypot: oculto a usuarios y lectores de pantalla, visible a bots. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="cf-company">Company</label>
          <input id="cf-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="border border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-bone transition-colors hover:border-agar-deep hover:bg-agar-deep disabled:opacity-60"
          >
            {status === 'sending' ? t('sending') : t('send')}
          </button>

          <p aria-live="polite" role="status" className="font-sans text-sm">
            {status === 'success' && <span className="text-agar-deep">{t('success')}</span>}
            {status === 'error' && <span className="text-ink-soft">{t(errorKey)}</span>}
          </p>
        </div>
      </div>
    </form>
  );
}
