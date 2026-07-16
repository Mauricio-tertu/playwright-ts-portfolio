import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
test.describe('Testes de Login', () => {
  test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
});


  test('login com sucesso deve mostrar mensagem de boas-vindas', async ({ page }) => {
     const loginPage = new LoginPage(page);
  await loginPage.fazerLogin('student', 'Password123');


    await expect(page).toHaveURL(/success/);
    await expect(page.locator('body')).toContainText('Logged In Successfully');
  });

  test('login com senha inválida deve mostrar mensagem de erro', async ({ page }) => {
     const loginPage = new LoginPage(page);
  await loginPage.fazerLogin('student', 'SenhaErrada123');



    const mensagemErro = page.locator('#error');
    await expect(mensagemErro).toBeVisible();
    await expect(mensagemErro).toContainText('Your password is invalid!');
  });

  test('login com campos vazios deve mostrar mensagem de erro', async ({ page }) => {
     const loginPage = new LoginPage(page);
  await loginPage.fazerLogin('', '');


  
    const mensagemErro = page.locator('#error');
    await expect(mensagemErro).toBeVisible();
    await expect(mensagemErro).toContainText('Your username is invalid!');
  });
});