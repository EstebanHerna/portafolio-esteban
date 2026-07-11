import { NextResponse, type NextRequest } from 'next/server';
import { getRateLimiter } from '@/lib/rate-limit';
import { ContactSchema } from '@/lib/contact-schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]!.trim();
  return request.headers.get('x-real-ip') ?? '127.0.0.1';
}

export async function POST(request: NextRequest) {
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

  // El envio real de correo se conecta aqui (Resend u otro) usando variables del
  // panel de Vercel. El destino real NUNCA se expone al cliente.
  // Ejemplo (a implementar con la key en produccion):
  //   await sendEmail({ to: process.env.CONTACT_TO_EMAIL, ...parsed.data });
  const configured = Boolean(process.env.CONTACT_EMAIL_PROVIDER_API_KEY);
  if (!configured && process.env.NODE_ENV === 'production') {
    // Aceptar el mensaje pero registrar que falta el proveedor, sin filtrar detalles.
    console.warn('[contact] proveedor de email no configurado; mensaje no entregado');
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
