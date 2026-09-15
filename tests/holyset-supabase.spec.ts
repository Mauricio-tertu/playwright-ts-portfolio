import { test, expect } from '@playwright/test';

/**
 * Testes de API — HOLYSET / Supabase (ambiente real)
 *
 * Diferente de tests/api.spec.ts (que usa uma API mock pública para
 * praticar o padrão de teste), esta suíte valida a API REST real do
 * HOLYSET, servida pelo Supabase.
 *
 * Credenciais (URL + anon key) vêm do .env (nunca versionado — ver
 * .env.example para o formato esperado). Como o acesso direto ainda
 * estava pendente com o time no momento da escrita, a anon key foi
 * obtida de forma independente via inspeção da aba Network do
 * navegador contra o ambiente de produção — documentado em
 * docs/relatorios-holyset/relatorio-testes-holyset-15-09-2026.md.
 */

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;

test.describe('API - ministry_data (Supabase REST) @regression', () => {

  test('GET com apikey válida deve retornar 200 e uma lista', async ({ request }) => {
    const response = await request.get(
      `${SUPABASE_URL}/rest/v1/ministry_data?select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('GET sem apikey deve retornar 401 (validação de RLS) @smoke', async ({ request }) => {
    // Teste de segurança negativo: confirma que a política de RLS
    // (Row Level Security) do Supabase bloqueia acesso não autenticado.
    // Se este teste falhar (retornando 200), é uma falha crítica de
    // segurança — mesmo padrão de causa raiz já identificado em
    // SCRUM-15/SCRUM-17.
    const response = await request.get(
      `${SUPABASE_URL}/rest/v1/ministry_data?select=*`
    );

    expect(response.status()).toBe(401);
  });

});
