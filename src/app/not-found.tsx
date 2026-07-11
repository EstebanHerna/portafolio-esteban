import Link from 'next/link';
import './globals.css';

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className="bg-bone text-ink">
        <main className="mx-auto flex min-h-screen max-w-editorial flex-col justify-center px-6">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">404</p>
          <h1 className="mt-4 font-serif text-4xl">Pagina no encontrada / Page not found</h1>
          <Link
            href="/"
            className="mt-8 font-mono text-xs uppercase tracking-wider text-agar-deep underline"
          >
            Inicio / Home
          </Link>
        </main>
      </body>
    </html>
  );
}
