import { Page, Locator } from '@playwright/test';

// Classe que representa a página de login
export class LoginPage {
  readonly page: Page;
  readonly campoUsuario: Locator;
  readonly campoSenha: Locator;
  readonly botaoLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campoUsuario = page.locator('input[name="username"]');
    this.campoSenha = page.locator('input[name="password"]');
    this.botaoLogin = page.locator('button[id="submit"]');
  }
  async fazerLogin(usuario: string, senha: string) {
  await this.campoUsuario.fill(usuario);
  await this.campoSenha.fill(senha);
  await this.botaoLogin.click();
}
}