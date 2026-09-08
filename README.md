# Playwright TS Portfolio

Suíte de testes end-to-end desenvolvida com **Playwright** e **TypeScript**, criada como parte da minha transição de carreira para QA Automation.
![Playwright Tests](https://github.com/Mauricio-tertu/playwright-ts-portfolio/actions/workflows/playwright.yml/badge.svg)
## 🎯 Objetivo

Este repositório documenta minha prática de automação de testes, aplicando boas práticas como reutilização de código, seletores CSS limpos e organização por cenários de teste.

## 🏢 Projeto Real em Produção — HOLYSET

Além da suíte de automação abaixo, atuo como **QA responsável** de um app real em produção usado por igrejas para gestão de cultos, escalas e repertório musical ([holy-set.vercel.app](https://holy-set.vercel.app)), trabalhando junto a um engenheiro sénior (Deloitte Portugal) e um desenvolvedor.

**O que esse trabalho envolve:**
- Testes exploratórios manuais em mobile e desktop, com bugs reais documentados e rastreados em JIRA
- Investigação de causa raiz — não apenas reportar sintomas, mas isolar a origem real do problema (ex: diferenciar um bug de UI de uma falha de permissão no banco de dados)
- Plano de testes estruturado por risco e prioridade, alinhado com a equipe de desenvolvimento antes da implementação de novas features

**Destaque técnico:** na sessão de 08/09/2026, identifiquei 6 bugs em uma única sessão e, mais importante, isolei a causa raiz comum entre eles — uma policy de permissão (RLS) mal configurada em uma tabela específica do banco, validada por teste cruzado em outras áreas do sistema que confirmaram estar funcionando corretamente. Isso evitou uma investigação ampla desnecessária e direcionou a correção com precisão.

📄 Relatórios completos: [`docs/relatorios/`](docs/relatorios/)
📋 Casos de teste manuais: [`docs/casos-de-teste-manuais.md`](docs/casos-de-teste-manuais.md)

## 🛠️ Stack

- **Playwright** — framework de automação de testes E2E
- **TypeScript** — tipagem estática para JavaScript
- **Node.js v24** — ambiente de execução
- **GitHub Actions** — CI configurado para rodar os testes automaticamente

## 🧪 Testes implementados

**33 execuções por rodada** (11 cenários × 3 navegadores: Chromium, Firefox e WebKit)

- **Login** (`tests/login.spec.ts`) — 3 cenários: credenciais válidas, senha inválida, campos vazios
- **Logout** (`tests/logout.spec.ts`) — fluxo completo de login → logout → validação de retorno
- **API** (`tests/api.spec.ts`) — 5 cenários: GET, POST, PUT, DELETE e rota inexistente (404)

## 🔥 Suítes de teste

Os testes são organizados por tags, permitindo execuções seletivas:

- `@smoke` — caminhos vitais (login, logout, API respondendo): validação rápida em ~1 min
- `@regression` — suíte completa: garante que mudanças não quebraram funcionalidades existentes

```bash
npx playwright test --grep @smoke       # só os vitais
npx playwright test --grep @regression  # regressão completa
```

## 🏗️ Arquitetura

- **Page Object Model (POM)** — `pages/loginPage.ts` e `pages/securePage.ts` centralizam seletores e ações
- **Retries e timeouts configurados** — mitigação de flakiness documentada
- **CI com GitHub Actions** — suíte completa a cada push, com relatório HTML como artifact
## 🚀 Como rodar os testes

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Mauricio-tertu/playwright-ts-portfolio.git
cd playwright-ts-portfolio
npm install
```

Rode todos os testes:

```bash
npx playwright test
```

Rode apenas os testes de login:

```bash
npx playwright test login.spec.ts
```

Veja o relatório HTML após a execução:

```bash
npx playwright show-report
```

## 📁 Estrutura do projeto

## 📌 Boas práticas aplicadas

- Uso de `beforeEach` para eliminar repetição de código de setup
- Seletores CSS puros (ex: `#error`) em vez de sintaxe de locator menos comum
- Nomes de teste descritivos, explicando o comportamento esperado

## 🔜 Próximos passos

- [ ] Testes de API
- [ ] Page Object Model
- [ ] Integração com Jira para gestão de casos de teste

## 👤 Autor

**Maurício Tertuliano**
Em transição para QA Automation | Portugal
[LinkedIn](https://www.linkedin.com/in/maur%C3%ADcio-tert%C3%BAliano-3b916a20b/)
