import { test, expect } from '@playwright/test';

test.describe('Testes de API', () => {

  test('GET deve retornar status 200 @smoke @regression', async ({ request }) => {
    const response = await request.get('https://postman-echo.com/get');
    await expect(response.status()).toBe(200);

  });

  test('POST deve enviar dados e receber confirmação @regression', async ({ request }) => {
    const response = await request.post('https://postman-echo.com/post', {
      data: {
        name: 'Mauricio'
      }

    });

    await expect(response.status()).toBe(200);
    const body = await response.json();
    await expect(body.json.name).toBe('Mauricio');
  });

   test('GET rota inexistente deve retornar 404 @regression', async ({ request }) => {
    const response = await request.get('https://postman-echo.com/nada');
    await expect(response.status()).toBe(404);
});

test('PUT deve atualizar dados e retornar status 200 @regression', async ({ request }) => {
  const response = await request.put('https://postman-echo.com/put', {
    data: {
      name: 'Mauricio Atualizado'
    }
  });
  await expect(response.status()).toBe(200);

  const body = await response.json();
  await expect(body.json.name).toBe('Mauricio Atualizado');
});
test('DELETE deve remover recurso e retornar status 200 @regression', async ({ request }) => {
  const response = await request.delete('https://postman-echo.com/delete');
  await expect(response.status()).toBe(200);
});
});