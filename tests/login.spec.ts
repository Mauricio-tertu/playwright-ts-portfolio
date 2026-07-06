import { test, expect } from '@playwright/test';

test.describe('Testes de Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
  });

  test('login com sucesso deve mostrar mensagem de boas-vindas', async ({ page }) => {
    await page.locator('input[name="username"]').fill('student');
    await page.locator('input[name="password"]').fill('Password123');
    await page.locator('button[id="submit"]').click();

    await expect(page).toHaveURL(/success/);
    await expect(page.locator('body')).toContainText('Logged In Successfully');
  });

  test('login com senha inválida deve mostrar mensagem de erro', async ({ page }) => {
    await page.locator('input[name="username"]').fill('student');
    await page.locator('input[name="password"]').fill('SenhaErrada123');
    await page.locator('button[id="submit"]').click();

    const mensagemErro = page.locator('#error');
    await expect(mensagemErro).toBeVisible();
    await expect(mensagemErro).toContainText('Your password is invalid!');
  });

  test('login com campos vazios deve mostrar mensagem de erro', async ({ page }) => {
    await page.locator('input[name="username"]').fill('');
    await page.locator('input[name="password"]').fill('');
    await page.locator('button[id="submit"]').click();

    const mensagemErro = page.locator('#error');
    await expect(mensagemErro).toBeVisible();
    await expect(mensagemErro).toContainText('Your username is invalid!');
  });
});