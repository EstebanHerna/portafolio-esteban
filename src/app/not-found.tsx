import Link from 'next/link';
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body>
        <main className="sheet flex min-h-screen flex-col justify-center">
          <h1 className="title-page">Página no encontrada / Page not found</h1>
          <p className="mt-4 text-muted">Error 404</p>
          <p className="mt-8">
            <Link href="/" className="btn btn-outline">
              Inicio / Home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
