import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

/**
 * Rate limiter para /api/contact. Respaldado por Upstash Redis.
 * Si las variables no estan configuradas, devuelve null y la ruta responde 503
 * de forma controlada (nunca un error crudo).
 */
let limiter: Ratelimit | null | undefined;

export function getRateLimiter(): Ratelimit | null {
  if (limiter !== undefined) return limiter;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    limiter = null;
    return limiter;
  }

  const redis = new Redis({ url, token });
  limiter = new Ratelimit({
    redis,
    // 5 envios por 10 minutos por IP.
    limiter: Ratelimit.slidingWindow(5, '600 s'),
    analytics: false,
    prefix: 'ratelimit:contact',
  });
  return limiter;
}
