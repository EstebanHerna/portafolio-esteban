import { NextResponse, type NextRequest } from 'next/server';
import { getRateLimiter } from '@/lib/rate-limit';
import { ContactSchema } from '@/lib/contact-schema';
import { getEmailConfig, sendContactEmail } from '@/lib/email';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clientIp(request: NextRequest): string {
  // En Vercel, x-real-ip es el IP real de confianza. x-forwarded-for[0] lo puede
  // falsear el cliente, asi que solo se usa como respaldo (evita evadir el rate limit).
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]!.trim();
  return '127.0.0.1';
}

/** El Origin de un POST de navegador legitimo coincide con el host del sitio. */
function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true; // Sin Origin (no-navegador): lo cubren honeypot + rate limit + validacion.
  try {
    return new URL(origin).host === request.headers.get('host');
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  // Bloquea envios cross-site (CSRF): si el Origin no es el propio sitio, se rechaza.
  if (!isSameOrigin(request)) {
    return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 });
  }

  // Rechaza cuerpos desproporcionados antes de parsear (el mensaje maximo es 4000 chars).
  if (Number(request.headers.get('content-length') ?? '0') > 16_000) {
    return NextResponse.json({ ok: false, error: 'too_large' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 400 });
  }

  // Honeypot lleno => aceptar en silencio (no revelar la trampa), sin procesar.
  if (parsed.data.company && parsed.data.company.length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const limiter = getRateLimiter();
  if (limiter) {
    const { success } = await limiter.limit(clientIp(request));
    if (!success) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
    }
  } else if (process.env.NODE_ENV === 'production') {
    // En produccion sin backend de rate limiting configurado, no exponer el formulario.
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 });
  }

  // Envio real via Resend. Las credenciales viven solo en el entorno (Vercel).
  const emailConfig = getEmailConfig();
  if (emailConfig) {
    const delivered = await sendContactEmail(emailConfig, parsed.data);
    if (!delivered) {
      // Fallo del proveedor: no se filtran detalles al cliente.
      return NextResponse.json({ ok: false, error: 'send_failed' }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === 'production') {
    // Sin proveedor configurado en produccion: no fingir exito.
    return NextResponse.json({ ok: false, error: 'unavailable' }, { status: 503 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
