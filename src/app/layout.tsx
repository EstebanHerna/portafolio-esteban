// Root layout passthrough. El <html>/<body> real vive en [locale]/layout.tsx
// (patron de next-intl). Esto satisface el requisito de root layout de Next
// y permite que el not-found global provea su propio documento.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
