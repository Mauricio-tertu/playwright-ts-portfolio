import { Page, Locator } from '@playwright/test';

// Classe que representa a área logada
export class SecurePage {
  readonly page: Page;
  readonly botaoLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.botaoLogout = page.getByText('log out ');
  }

  async fazerLogout() {
    await this.botaoLogout.click();
  }
}