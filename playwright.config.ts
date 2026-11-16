import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  // Dos navegadores a la vez: mas estable en equipos lentos y en CI.
  workers: 2,
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  // PW_CHANNEL=msedge usa el Edge instalado y evita descargar Chromium.
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    // El sitio elige idioma segun el navegador; las pruebas parten del espanol.
    locale: 'es-CO',
    channel: process.env.PW_CHANNEL || undefined,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run build && npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
