# Auditoria previa al despliegue — Portafolio de Esteban Hernandez

Registro de verificacion antes del primer `git push` y del primer despliegue a
produccion. Cada punto indica **que se verifico**, **con que** y **el resultado**.
Lo pendiente se marca de forma explicita: no se declara verde lo que no se corrio.

Fecha de esta auditoria: 2026-07-10.

---

## 1. Gate suite de calidad (local, replicable en CI)

| Gate                | Comando                | Resultado                                              |
| ------------------- | ---------------------- | ------------------------------------------------------ |
| Tipos               | `npm run typecheck`    | Sin errores                                            |
| Lint                | `npm run lint`         | Sin advertencias ni errores                            |
| Formato             | `npm run format:check` | Todos los archivos con estilo Prettier                 |
| Pruebas unitarias   | `npm test`             | 8/8 en verde (`tests/content.test.ts`)                 |
| Build de produccion | `npm run build`        | Exit 0; 26 rutas estaticas + `/api/contact` serverless |

El workflow `.github/workflows/ci.yml` corre exactamente estos gates en
`ubuntu-latest` (Node 20) en cada push y PR a `main`. El build local en Windows y
el de CI/Vercel (Linux) coinciden en verde.

## 2. Seguridad de dependencias

- **Next.js actualizado a `15.5.20`** (linea de soporte con backports de
  seguridad), desde `15.1.6`, que tenia una vulnerabilidad conocida
  (CVE-2025-66478). Tras la actualizacion, `npm audit` ya no reporta esa
  vulnerabilidad directa de Next.
- **Residual de `npm audit` (3 moderadas), evaluadas y aceptadas:**
  - `next-intl` — prototype pollution _solo_ via `experimental.messages.precompile`.
    Esa opcion **no se usa** en este proyecto (ver `src/i18n/`), asi que no aplica.
    El fix requiere `next-intl@4` (cambio mayor rompiente); no se adopta.
  - `postcss` (empaquetado dentro de Next) — XSS en la salida de stringify, es
    tooling de build, no superficie de runtime de un sitio estatico. El "fix"
    sugerido por npm es un downgrade absurdo de Next; no se aplica.
- **Dependabot** (`.github/dependabot.yml`) y **CodeQL**
  (`.github/workflows/codeql.yml`) quedan activos desde el primer push para vigilar
  nuevas alertas.

## 3. Secretos

- **gitleaks 8.x** corre en `pre-commit` (`.husky/pre-commit`) y en CI.
- Escaneo del arbol antes del commit inicial: **sin hallazgos**.
- `.env.example` documenta nombres de variable sin valores. `.npmrc` no contiene
  tokens. Las credenciales reales (Upstash, proveedor de email) viven solo en el
  panel de Vercel.
- El `.gitignore` excluye `.env*.local`, artefactos de build, los certificados PDF
  personales, y el andamiaje de planeacion (`.kiro/`, `.claude/`, `design.md`).

## 4. Cabeceras de seguridad

Definidas en `middleware.ts` para cada respuesta: CSP con nonce por request, HSTS
con `preload`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: no-referrer` y `Permissions-Policy` restrictiva.

> Pendiente: verificacion en runtime contra la URL desplegada (p. ej.
> securityheaders.com o `curl -I`). Solo puede correrse cuando el sitio este en
> Vercel. Ver seccion 7.

## 5. Contenido no negociable (verificado en los datos tipados)

- **HemoVision**: el disclaimer de datos sinteticos esta presente en
  `src/lib/data/projects.ts` y se renderiza como bloque destacado con el mismo peso
  visual que las metricas (`src/components/ProjectArticle.tsx`), no como nota al pie.
- **BacterioScope**: estado `Investigacion en curso`; sin metricas clinicas; solo
  se nombra a Paula Becerra (unica autorizacion registrada).
- **Altus**: presentado sobrio, sin inventar stack ni alcance.
- Sin emojis en interfaz ni copy; tokens de diseno sin Inter, sin gradiente
  violeta-azul, sin glassmorphism (`tailwind.config.ts`, `src/app/globals.css`).

## 6. Formulario de contacto

- `/api/contact` valida y sanea la entrada con Zod, aplica rate limiting (5/10 min
  por IP, Upstash) y honeypot. Sin backend configurado, responde **503 controlado**,
  nunca un error crudo (`src/lib/rate-limit.ts`).
- **Pendiente**: el envio real del correo (integrar Resend u otro proveedor) no
  esta conectado todavia; hoy la ruta valida/limita pero no despacha el mensaje.

## 7. Pendientes antes de considerar el sitio "publicado"

Ninguno bloquea el `git push`; sí condicionan el despliegue final:

- [ ] **Lighthouse** por pagina (performance, accesibilidad, SEO, best practices)
      contra el sitio desplegado o `npm start` local. Objetivo: perf >= 90 movil,
      accesibilidad >= 95.
- [ ] **Verificacion de cabeceras** en runtime contra la URL de Vercel.
- [ ] **Datos reales pendientes** (en `src/lib/data/`), a confirmar por Esteban:
      URL del repo de BacterioScope (o dejarlo sin boton), si NexusMind es publico,
      foto real en `public/esteban.jpg` (hoy placeholder), fecha del certificado de
      Google.
- [ ] **Envio de correo** del formulario (Resend + variables en Vercel).
- [ ] **GitHub**: 2FA en `EstebanHerna`, proteccion de la rama `main` (Settings >
      Branches, exigir checks de CI). Documentado en `SECURITY.md`.
- [ ] **Vercel**: crear proyecto, definir variables (`UPSTASH_*`, email,
      `NEXT_PUBLIC_SITE_URL`) y desplegar.
- [ ] **Confirmacion explicita de Esteban** de que el disclaimer de HemoVision y el
      estado "investigacion en curso" de BacterioScope siguen intactos y visibles en
      el sitio ya desplegado.
