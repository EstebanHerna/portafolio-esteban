import { test, expect } from '@playwright/test';

test('la portada muestra el titular y el boton de CV sin scroll', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.getByRole('link', { name: /Descargar CV/ })).toBeVisible();
});

test('navegacion a proyectos y a un proyecto', async ({ page }) => {
  await page.goto('/proyectos');
  await expect(page.getByRole('heading', { level: 1, name: /Proyectos/ })).toBeVisible();
  await page.getByRole('link', { name: 'BacterioScope' }).first().click();
  await expect(page).toHaveURL(/bacterioscope/);
  await expect(page.getByRole('heading', { level: 1, name: 'BacterioScope' })).toBeVisible();
});

test('el conmutador de idioma cambia a EN', async ({ page }) => {
  await page.goto('/sobre-mi');
  await page.getByRole('button', { name: 'en' }).first().click();
  await expect(page).toHaveURL(/\/en/);
});

test('el buscador encuentra un proyecto por una palabra propia', async ({ page }) => {
  await page.goto('/explorar');
  const box = page.getByRole('searchbox');
  const result = page.getByRole('link', { name: 'BacterioScope', exact: true });
  // El campo existe antes de que React lo controle: se reintenta hasta que la busqueda responde.
  await expect(async () => {
    await box.fill('');
    await box.fill('antibiogramas');
    await expect(result).toBeVisible({ timeout: 2000 });
  }).toPass();
});
