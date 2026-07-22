import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { SecurePage } from '../pages/securePage';

test.describe('Testes de Logout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  test('logout após login bem-sucedido deve voltar pra página de login @smoke @regression', async ({ page }) => {
    // 1. Fazer login
    const loginPage = new LoginPage(page);
await loginPage.fazerLogin('student', 'Password123');

const securePage = new SecurePage(page);
await securePage.fazerLogout();

   // 3. Validar que voltou pra página de login
    await expect(page).toHaveURL(/practice-test-login/);
  });
});