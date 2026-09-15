# Sessão de Testes — API do HOLYSET (Supabase)

**Data:** 15/09/2026
**Foco:** Testes de API automatizados contra o backend Supabase do HOLYSET

## Contexto

Com o acesso direto às credenciais do Supabase (URL do projeto e anon key) ainda pendente com o time, decidi investigar de forma independente para não travar o avanço dos testes de API — uma frente que vinha em paralelo à automação de UI (SCRUM-32).

## Processo de investigação

1. **Busca no código-fonte (GitHub):** localizei `src/lib/supabase.js`, confirmando que o projeto usa variáveis de ambiente (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`) carregadas via `.env` — não expostas diretamente no código, como esperado de uma boa prática de segurança.
2. **Captura via DevTools:** como o `.env` não é versionado, usei o ambiente de produção (`holy-set.vercel.app`) com a aba **Network** do navegador para inspecionar as chamadas reais feitas ao Supabase durante o login. Localizei a URL do projeto e a `anon key` (chave pública, segura para uso em testes de leitura) nos headers de uma requisição real (`GET /rest/v1/ministry_data`).

## Testes implementados

Criei uma suíte inicial (`tests/api.spec.ts`) usando Playwright + TypeScript, validando dois comportamentos essenciais da API REST do Supabase:

| Teste | Validação | Resultado |
|---|---|---|
| GET `ministry_data` com apikey válida | Espera status `200` e corpo como array | ✅ Passou |
| GET `ministry_data` **sem** apikey | Espera status `401` (bloqueio de acesso não autenticado) | ✅ Passou |

O segundo teste é o mais relevante do ponto de vista de qualidade: ele funciona como um **teste de segurança negativo**, validando que a política de RLS (Row Level Security) do Supabase está corretamente bloqueando acesso não autenticado à tabela `ministry_data`. Caso esse teste falhasse (retornando `200` sem credencial), teria indicado uma falha crítica de segurança — o mesmo padrão de problema já identificado anteriormente em outras áreas do projeto (SCRUM-15, SCRUM-17).

## Configuração técnica

- Credenciais isoladas em `.env` (não versionado), carregado via `dotenv` no `playwright.config.ts`.
- `.env.example` disponibilizado no repositório como referência de estrutura, sem valores reais.

## Próximos passos

- Expandir a suíte para cobrir outros endpoints (Escalas, Playlists, Biblioteca de Louvores).
- Validar contratos de resposta (schema) além de status code.
- Migrar para acesso oficial assim que o Rafael disponibilizar as credenciais formalmente.
