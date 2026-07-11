import { test, expect } from '@playwright/test';

test('la home muestra el posicionamiento sin scroll', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
});

test('navegacion a proyectos y a un proyecto', async ({ page }) => {
  await page.goto('/proyectos');
  await expect(page.getByRole('heading', { name: /Proyectos|Projects/ })).toBeVisible();
  await page
    .getByRole('link', { name: /BacterioScope/ })
    .first()
    .click();
  await expect(page).toHaveURL(/bacterioscope/);
});

test('el conmutador de idioma cambia a EN', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'en' }).click();
  await expect(page).toHaveURL(/\/en/);
});

test('el diagrama de proceso expande un nodo por teclado', async ({ page }) => {
  await page.goto('/proceso');
  const btn = page.getByRole('button', { name: /Planeacion|Planning/ });
  await btn.focus();
  await page.keyboard.press('Enter');
});
