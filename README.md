# Portafolio - Esteban Alejandro Hernandez Sulvara

Portafolio profesional bilingue (ES/EN). Ingeniero de sistemas que construye software de nivel produccion para problemas reales de microbiologia clinica, con el rigor que aplicaria a un sistema critico.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS (tokens de diseno en `tailwind.config.ts`)
- next-intl (ES por defecto sin prefijo, EN en `/en`)
- Motion (`motion/react`) para animacion; SVG dibujado por scroll
- Upstash Redis para rate limiting de `/api/contact`
- Despliegue en Vercel

## Requisitos

- Node.js >= 18.18
- npm

## Desarrollo

```bash
npm install
cp .env.example .env.local   # dejar valores vacios salvo local
npm run dev
```

Abrir http://localhost:3000

## Scripts

- `npm run dev` - desarrollo
- `npm run build` / `npm run start` - build y produccion
- `npm run typecheck` - TypeScript sin emitir
- `npm run lint` - ESLint (next)
- `npm run format` / `format:check` - Prettier
- `npm test` - Vitest (unidad)
- `npm run test:e2e` - Playwright (e2e)

## Estructura

```
src/
  app/[locale]/        paginas: inicio, proyectos, proceso, trayectoria, sobre-mi, contacto
  app/api/contact/     funcion serverless del formulario (rate limit + honeypot)
  components/          Nav, Footer, TurbidityCurve, ProcessDiagram, ContactForm, ...
  lib/data/            contenido tipado: projects, timeline, certifications, stack, profile, process
  i18n/                routing, navigation, request (next-intl)
  messages/            es.json, en.json
middleware.ts          cabeceras de seguridad + CSP con nonce
```

## Variables de entorno

Ver `.env.example`. Nunca commitear valores reales; definirlas en el panel de Vercel.

- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` - rate limiting del formulario.
- `CONTACT_TO_EMAIL`, `CONTACT_EMAIL_PROVIDER_API_KEY` - envio de correo (integrar proveedor).
- `NEXT_PUBLIC_SITE_URL` - URL publica para metadatos y sitemap.

## Seguridad

Ver `SECURITY.md`. Cabeceras completas via middleware, CSP con nonce, rate limiting, honeypot, gitleaks, CodeQL y Dependabot.

## Contenido: reglas no negociables

- HemoVision conserva SIEMPRE el disclaimer de datos sinteticos con el mismo peso visual que las metricas.
- BacterioScope se presenta como investigacion en curso, nunca como producto terminado; sin metricas clinicas.
- En BacterioScope solo se nombra a Paula Becerra (unica autorizacion registrada).
- Altus se presenta sobrio, sin stack inventado.
- Sin emojis en la interfaz ni en el copy; sin estetica default de IA.

## Pendientes (ver AUDIT.md)

Foto real (`/public/esteban.jpg` es placeholder), dominio, URL del repo de BacterioScope, visibilidad de NexusMind, fecha de la certificacion de Google, descripcion tecnica de Altus.

## Nota de tipografia

El cuerpo usa Hanken Grotesk (Google Fonts) en la ranura prevista para Mona Sans, que no esta en Google Fonts. Para usar Mona Sans real, anadir su `.woff2` en `/public/fonts` y cambiar a `next/font/local` manteniendo la variable `--font-mona-sans` (ver `src/app/[locale]/layout.tsx`).
