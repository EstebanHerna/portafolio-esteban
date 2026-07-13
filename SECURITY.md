# Politica de seguridad

Este portafolio sostiene el mismo nivel de rigor de seguridad aplicado en HemoVision, adaptado a un sitio Next.js con una funcion serverless.

## Reporte de vulnerabilidades

Si encuentras una vulnerabilidad, escribe a **ea.hernandezs1@uniandes.edu.co** (ver tambien `/.well-known/security.txt`, RFC 9116). No abras un issue publico con detalles explotables.

- Tiempo de respuesta esperado: 72 horas habiles para el primer acuse.
- Alcance: el sitio desplegado y este repositorio. Fuera de alcance: servicios de terceros (Vercel, Upstash, GitHub).

## Controles implementados

- **Cabeceras de seguridad** en cada respuesta via `middleware.ts` (Edge): `Content-Security-Policy` con nonce por request, `Strict-Transport-Security` con `preload`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer`, `Permissions-Policy` restrictiva (sin camara, microfono ni geolocalizacion), `Cross-Origin-Opener-Policy: same-origin` y `X-Permitted-Cross-Domain-Policies: none`.
- **Rechazo de envios cross-site (CSRF)** en `/api/contact`: si el header `Origin` no coincide con el host del sitio, la peticion se rechaza con 403. Ademas se limita el tamano del cuerpo (413 si excede el maximo esperado) antes de parsearlo, y el rate limiting usa el IP real de confianza (`x-real-ip`), no el `x-forwarded-for` manipulable.
- **CSP con nonce**: el nonce se genera por request en el middleware y se propaga por las cabeceras de la request para que Next firme sus scripts. Por esto, el documento se renderiza de forma dinamica por request; el contenido de datos sigue siendo estatico y auditable en git. Es un intercambio deliberado: se prioriza una CSP fuerte sobre el SSG puro del documento.
- **Rate limiting** en `/api/contact`: 5 envios por 10 minutos por IP, respaldado por Upstash Redis (`src/lib/rate-limit.ts`). Sin backend configurado en produccion, la ruta responde 503 controlado, nunca un error crudo.
- **Honeypot** invisible en el formulario: los envios con el campo trampa lleno se aceptan en silencio y se descartan.
- **Cero secretos en el repositorio**: `.env.example` documenta los nombres de variable sin valores. Las variables reales viven solo en el panel de Vercel.
- **Escaneo de secretos**: gitleaks en pre-commit (`.husky/pre-commit`) y en CI (`.github/workflows/ci.yml`).
- **Analisis estatico**: CodeQL (`.github/workflows/codeql.yml`) y Dependabot (`.github/dependabot.yml`) activos.
- **Rama principal protegida**: exige que los checks de CI pasen antes de merge (configurar en GitHub: Settings > Branches). `CODEOWNERS` fuerza revision.

## Proteccion de borde (DDoS)

El sitio corre sobre la red de Vercel, que incluye mitigacion de capa de red por defecto. Si el trafico o el plan lo justifican, se puede anteponer Cloudflare al dominio como capa adicional (proxy naranja + reglas de rate limiting a nivel de borde). Este paso queda documentado y listo; no se activa sin decision explicita de Esteban.

## Cuenta de GitHub

- Autenticacion de dos factores (2FA) obligatoria en la cuenta `EstebanHerna`.
- Proteccion de la rama `main` con revision requerida antes de merge, incluso trabajando en solitario.
