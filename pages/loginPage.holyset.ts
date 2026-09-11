import { Page, Locator } from '@playwright/test';

// Classe que representa a página de login do HOLYSET
export class LoginPage {
  readonly page: Page;
  readonly campoEmail: Locator;
  readonly campoSenha: Locator;
  readonly botaoEntrar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campoEmail = page.getByPlaceholder('seu@email.com');
    this.campoSenha = page.locator('input[type="password"]');
    this.botaoEntrar = page.getByRole('button', { name: 'Entrar' });
  }

  async goto() {
    await this.page.goto('https://segredinho.memremodelacoes.pt');
  }

  async fazerLogin(email: string, senha: string) {
    await this.campoEmail.fill(email);
    await this.campoSenha.fill(senha);
    await this.botaoEntrar.click();
  }
}

