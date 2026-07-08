import { test, expect } from '@playwright/test';

test.describe('Testes de API', () => {
  test('GET deve retornar status 200', async ({ request }) => {
    const response = await request.get('https://postman-echo.com/get');
    await expect(response.status()).toBe(200);
   
  });
});