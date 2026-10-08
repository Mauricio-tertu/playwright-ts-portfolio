# Playwright TS Portfolio

![Playwright Tests](https://github.com/Mauricio-tertu/playwright-ts-portfolio/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

> QA responsável pelo HOLYSET, em produção — atenção aos detalhes que fazem a diferença.

Meu trabalho como QA não é só encontrar bugs, é entender o sistema profundamente o suficiente pra saber onde ele vai falhar antes que o usuário descubra. Este repositório documenta esse processo no HOLYSET: investigação de causa raiz, decisões sobre o que testar primeiro, e a automação que sustenta isso no longo prazo.

---

## 🏢 Projeto HOLYSET

Atuo como **QA único e responsável** por um sistema real em produção, usado por igrejas para gestão de cultos, escalas e repertório musical — [holy-set.vercel.app](https://holy-set.vercel.app) — trabalhando junto a um engenheiro sénior e um desenvolvedor.

### Números do trabalho até aqui

| Métrica | Valor |
|---|---|
| Sessões de teste documentadas | 15 |
| Defeitos identificados e rastreados no Jira | 20+ (SCRUM-11 a SCRUM-47) |
| Módulos com CRUD validado de ponta a ponta | 4 (Escalas, Playlists, Biblioteca de Louvores, Cultos) |
| Falha sistêmica isolada por investigação de causa raiz | 1 (RLS mal configurado) |
| Cenários de teste automatizados (E2E + API) | 12 |
| Casos de teste manuais formais do HOLYSET (login) | 2 executados, 3 planejados |
| Metodologia de teste | Mobile-first (viewport ~338×689) |

### Destaques do meu trabalho

- **Procuro a causa, não só o sintoma.** Vários erros 403 apareciam em telas diferentes. Em vez de abrir um ticket para cada um, testei áreas que não deviam falhar e percebi que a origem era a mesma: uma política de RLS mal configurada no Supabase. Um problema só, e a equipe pôde corrigir com precisão.
- **Reporto o que é bug e pergunto o que não tenho certeza.** O sistema aceitava vários Diretores Musicais no mesmo culto e isso violava uma regra, então abri o bug. Quando a regra não estava clara, levei como pergunta ao Product Owner, para não encher o backlog de ruído.
- **Vejo padrões, não bugs soltos.** Faltava validação em campos de Culto e Playlist. Testei do caso simples ao extremo (vazio, só espaços, datas em 2119) e levei como problema de estrutura.
- **Segurança básica.** Testei XSS nos campos de nome (o texto foi tratado como texto, sem executar nada). Automatizei também um teste que confirma que a API bloqueia acesso sem login (401).
- **Smoke depois do deploy.** No primeiro deploy para o Vercel (06/10) vi erros 404, 500 e 406 e os relacionei a um banco desalinhado, o que o Rafael confirmou. Não fiz os retestes antigos antes da correção, porque o resultado não valeria. Repeti no dia seguinte e passou.
- **Testabilidade.** Percebi que a aplicação não tem `id`/`data-testid` nos elementos, o que atrapalha a automação e a acessibilidade, e levei como débito técnico.

### Evidência documentada

- 📋 [Plano de teste formal](docs/plano-de-teste/plano-de-teste-holyset.md) — escopo, tipos de teste, estratégia de automação e matriz de rastreabilidade
- 📄 [Relatórios de sessão completos](docs/relatorios-holyset/) — 15 sessões, do achado ao ticket
- ✅ [Casos de teste manuais do HOLYSET (login)](docs/casos-de-teste-holyset/casos-de-teste-login.md) — passos, resultado esperado e obtido, status
- 🧪 [Casos de teste manuais do site de prática](docs/casos-de-teste-manuais.md)
- 🔌 [Testes de API via Postman](docs/testes-api-postman.md)

---

## 🛠️ Stack

- **Playwright** — framework de automação de testes E2E
- **TypeScript** — tipagem estática para JavaScript
- **Node.js (LTS)** — ambiente de execução
- **GitHub Actions** — CI configurado para rodar os testes automaticamente
- **Jira** — gestão de bugs e casos de teste em ambiente profissional real

## 🧪 Testes automatizados implementados

**36 execuções por rodada local completa** (12 cenários × 3 navegadores: Chromium, Firefox e WebKit)

- **Login** (`tests/login.spec.ts`) — credenciais válidas, senha inválida, campos vazios
- **Logout** (`tests/logout.spec.ts`) — fluxo completo de login → logout → validação de retorno
- **API** (`tests/api.spec.ts`) — GET, POST, PUT, DELETE e rota inexistente (404)
- **API real do HOLYSET** (`tests/holyset-supabase.spec.ts`) — validação da API REST do Supabase no ambiente de desenvolvimento (dev), incluindo teste de segurança negativo (bloqueio de acesso sem autenticação)

> No CI público (badge acima) essa última suíte aparece como *skipped*, não como falha: ela depende de credenciais que não são versionadas por segurança. Localmente, com o `.env` preenchido (ver `.env.example`), a suíte roda contra o ambiente dev do HOLYSET. Na última execução local (21/09/2026), o teste de bloqueio sem autenticação (401) passou; o teste de leitura com apikey válida retornou 401 inesperado e está em investigação.

## 🔥 Suítes de teste

Testes organizados por tags, permitindo execuções seletivas:

- `@smoke` — caminhos vitais: validação rápida (~1 min)
- `@regression` — suíte completa: garante que mudanças não quebraram funcionalidades existentes

```bash
npx playwright test --grep @smoke       # só os vitais
npx playwright test --grep @regression  # regressão completa
```

## 🏗️ Arquitetura

- **Page Object Model (POM)** — `pages/loginPage.ts`, `pages/securePage.ts`, `pages/loginPage.holyset.ts` centralizam seletores e ações
- **Retries e timeouts configurados** — mitigação de flakiness documentada
- **CI com GitHub Actions** — suíte completa a cada push, com relatório HTML como artifact

## 🚀 Como rodar os testes

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Mauricio-tertu/playwright-ts-portfolio.git
cd playwright-ts-portfolio
npm install
```

(Opcional) Pra rodar a suíte real do Supabase, copie `.env.example` para `.env` e preencha com credenciais válidas. Sem isso, essa suíte é pulada automaticamente.

Rode todos os testes:

```bash
npm test
```

Rode apenas smoke ou regressão:

```bash
npm run test:smoke
npm run test:regression
```

Rode apenas os testes de login:

```bash
npx playwright test login.spec.ts
```

Veja o relatório HTML após a execução:

```bash
npm run report
```

## 📁 Estrutura do projeto

```
├── docs/
│   ├── plano-de-teste/           # Plano de teste formal do HOLYSET
│   ├── relatorios-holyset/       # Relatórios de sessão de teste exploratório
│   ├── casos-de-teste-holyset/   # Casos de teste manuais do HOLYSET
│   ├── casos-de-teste-manuais.md # Casos do site de prática
│   └── testes-api-postman.md
├── pages/                        # Page Object Model
├── tests/                        # Specs Playwright
└── playwright.config.ts
```

## 📌 Boas práticas aplicadas

- Uso de `beforeEach` para eliminar repetição de código de setup
- Page Object Model para isolar seletores de lógica de teste
- Nomes de teste descritivos, explicando o comportamento esperado
- Bugs confirmados por reprodução antes de formalizados — casos ambíguos são investigados, não reportados como ruído
- Credenciais isoladas via `.env` (nunca versionado) — apenas `.env.example` sobe ao repositório
- Testes que dependem de credenciais externas fazem `test.skip()` de forma explícita quando o ambiente não as tem, em vez de falhar o CI silenciosamente

## 🔜 Próximos passos

- [x] Suite de testes de API para o HOLYSET (Supabase)
- [x] Primeiros casos de teste manuais formais do HOLYSET (login: senha incorreta e campos vazios)
- [ ] Executar os casos de teste de login restantes (TC-LOGIN-01, 04 e 05)
- [ ] Retestes dos tickets em revisão e exploratório no módulo Ministérios (adiados por causa do banco desalinhado em 06/10)
- [ ] Investigar o 401 inesperado no teste de leitura com apikey válida (ambiente dev)
- [ ] Versionar o teste de regressão do SCRUM-15 (admin recebe 403 ao editar o próprio nome), hoje só na máquina local
- [ ] Specs E2E de login/logout do HOLYSET (POM já criado em `pages/loginPage.holyset.ts`)
- [ ] Smoke test e regressão específicos do HOLYSET (hoje as tags só cobrem o site de prática e a API)
- [ ] Expandir testes de API para outros endpoints (Escalas, Playlists, Biblioteca de Louvores)
- [ ] Auditoria de acessibilidade básica (axe-core)
- [ ] Certificação ISTQB

## 👤 Autor

**Maurício Tertuliano**
QA em transição de carreira (indústria → tecnologia) | Braga, Portugal
[LinkedIn](https://www.linkedin.com/in/maur%C3%ADcio-tert%C3%BAliano-3b916a20b/)
