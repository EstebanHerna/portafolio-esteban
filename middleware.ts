import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './src/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

/** Construye el CSP. En dev se relaja para permitir HMR de Next. */
function buildCsp(nonce: string, isDev: boolean): string {
  const script = isDev
    ? `'self' 'nonce-${nonce}' 'unsafe-inline' 'unsafe-eval'`
    : `'self' 'nonce-${nonce}' 'strict-dynamic'`;

  return [
    `default-src 'self'`,
    `base-uri 'self'`,
    `script-src ${script}`,
    // Tailwind y Next inyectan estilos inline; se permiten via style-src.
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https://avatars.githubusercontent.com`,
    `font-src 'self' data:`,
    `connect-src 'self'`,
    `object-src 'none'`,
    `frame-ancestors 'none'`,
    `form-action 'self'`,
    `base-uri 'self'`,
    `upgrade-insecure-requests`,
  ].join('; ');
}

function applySecurityHeaders(headers: Headers, csp: string) {
  headers.set('Content-Security-Policy', csp);
  headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'no-referrer');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), browsing-topics=()');
  headers.set('X-DNS-Prefetch-Control', 'off');
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('X-Permitted-Cross-Domain-Policies', 'none');
}

export default function middleware(request: NextRequest) {
  const isDev = process.env.NODE_ENV !== 'production';
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = buildCsp(nonce, isDev);

  // Inyecta nonce y CSP en los headers de la request para que Next firme sus
  // scripts con este nonce. Mutamos la request antes de delegar a next-intl.
  request.headers.set('x-nonce', nonce);
  request.headers.set('Content-Security-Policy', csp);

  const response = handleI18nRouting(request) ?? NextResponse.next();
  applySecurityHeaders(response.headers, csp);
  return response;
}

export const config = {
  // Ejecuta en todas las rutas salvo estáticos, imágenes optimizadas y assets bien conocidos.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.well-known|.*\\..*).*)'],
};
