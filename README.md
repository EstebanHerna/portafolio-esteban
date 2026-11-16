# Portafolio de Esteban Hernández

Sitio bilingüe (español por defecto, inglés en `/en`) de Esteban Alejandro Hernández Sulvara: ingeniería de datos e IA aplicada con Python, SQL, Apache Airflow y AWS.

En producción: https://portafolio-esteban-mu.vercel.app

## Stack

- Next.js 15 (App Router) y TypeScript estricto
- Tailwind CSS, con los tokens de diseño en `tailwind.config.ts` y `src/app/globals.css`
- next-intl para las rutas por idioma
- Upstash Redis (límite de envíos) y Resend (correo) en `/api/contact`
- Vitest para pruebas unitarias y Playwright para pruebas de extremo a extremo
- Despliegue en Vercel

## Desarrollo

Requiere Node.js 18.18 o superior.

```bash
npm install
cp .env.example .env.local   # los valores pueden quedar vacíos en local
npm run dev
```

El sitio abre en http://localhost:3000.

## Verificación

Todo cambio debe pasar estos cuatro pasos antes de subirse. Son los mismos que corre la integración continua en `.github/workflows/ci.yml`.

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

Si el cambio toca la navegación, también `npm run test:e2e` (la primera vez hay que instalar el navegador con `npx playwright install chromium`).

## Estructura

```
src/
  app/
    [locale]/              páginas: inicio, proyectos, trayectoria, sobre-mi, explorar, contacto
    [locale]/proyectos/[slug]/   una sola ruta para todos los proyectos
    api/contact/           formulario de contacto (validación, límite de envíos, honeypot)
  components/              cabecera, pie, cuadros, gráficos y formularios
  lib/
    data/                  contenido tipado: proyectos, trayectoria, certificaciones, herramientas, perfil
    rag/                   buscador TF-IDF que corre en el navegador (página Explorar)
    format.ts              cifras y fechas según el idioma
  i18n/                    configuración de next-intl
  messages/                textos de la interfaz en es.json y en.json
  middleware.ts            cabeceras de seguridad y CSP con nonce
tests/
  content.test.ts          reglas de contenido que no se pueden romper
  rag.test.ts              tokenización, índice y recuperación
  e2e/                     pruebas de humo con Playwright
public/
  cv/                      los dos CV que el sitio ofrece para descargar
docs/
  AUDIT.md                 auditoría previa al primer despliegue
```

## Cómo cambiar el contenido

Los hechos viven en `src/lib/data` y los textos de interfaz en `src/messages`. Las páginas no llevan contenido escrito a mano.

- **Agregar un proyecto:** añade su identificador a `ProjectSlug` en `src/lib/types.ts` y una entrada en `src/lib/data/projects.ts`. La página, el índice, el buscador y el mapa del sitio lo toman de ahí.
- **Agregar una certificación:** una entrada en `src/lib/data/certifications.ts` con la fecha y el código tal como aparecen en el certificado.
- Cada texto existe en español y en inglés. Las pruebas fallan si falta alguno.

## Reglas de contenido

`tests/content.test.ts` las comprueba en cada ejecución:

- Los proyectos van en un orden fijo, con el flujo de salud ambiental primero.
- El titular y la portada no nombran a la entidad donde se hizo la práctica; el trabajo se presenta como proyecto de grado.
- HemoVision conserva la aclaración de datos sintéticos con el mismo peso visual que las cifras.
- BacterioScope se presenta como investigación en curso y declara la brecha frente a su meta de exactitud.
- Altus se presenta como concepto de competencia: sin cifras, sin cartas, no desplegado; participación (no selección) en Cornell EMC2.
- NexusMind figura como semifinalista de AWS 10,000 AIdeas.
- La lista de herramientas solo incluye lo que se puede defender en una entrevista.

## Variables de entorno

Los nombres están en `.env.example`. Los valores reales se definen solo en el panel de Vercel.

| Variable                                             | Para qué                                    |
| ---------------------------------------------------- | ------------------------------------------- |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Límite de envíos del formulario             |
| `CONTACT_TO_EMAIL`, `RESEND_API_KEY`, `RESEND_FROM`  | Envío del correo de contacto                |
| `NEXT_PUBLIC_SITE_URL`                               | URL pública para metadatos y mapa del sitio |

## Seguridad

Ver `SECURITY.md`. El sitio envía CSP con nonce por petición y el resto de cabeceras desde `src/middleware.ts`. El formulario valida con Zod, limita los envíos por IP y rechaza peticiones de otro origen. Gitleaks corre antes de cada commit y en la integración continua, junto con CodeQL y Dependabot.

## Lo que no se versiona

`.gitignore` deja fuera los certificados y documentos personales (`_privado/`), el contexto interno de trabajo y todos los PDF excepto los de `public/cv/`.
