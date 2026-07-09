import { test, expect } from '@playwright/test';

test.describe('Testes de API', () => {

  test('GET deve retornar status 200', async ({ request }) => {
    const response = await request.get('https://postman-echo.com/get');
    await expect(response.status()).toBe(200);
  });

  test('POST deve enviar dados e receber confirmação', async ({ request }) => {
    const response = await request.post('https://postman-echo.com/post', {
      data: {
        name: 'Mauricio'
      }
    });
    await expect(response.status()).toBe(200);
    const body = await response.json();
    await expect(body.json.name).toBe('Mauricio');
  });

});