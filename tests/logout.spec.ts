import { test, expect } from '@playwright/test';

test.describe('Testes de Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  test('logout após login bem-sucedido deve voltar pra página de login', async ({ page }) => {
    // 1. Fazer login
    await page.locator('input[name="username"]').fill('student');
    await page.locator('input[name="password"]').fill('Password123');
    await page.locator('button[id="submit"]').click();

    // 2. Clicar no botão logout
    await page.getByText('log out ').click();

    // 3. Validar que voltou pra página de login
    await expect(page).toHaveURL(/practice-test-login/);
  });
});