# Playwright TS Portfolio

Suíte de testes end-to-end desenvolvida com **Playwright** e **TypeScript**, criada como parte da minha transição de carreira para QA Automation.

## 🎯 Objetivo

Este repositório documenta minha prática de automação de testes, aplicando boas práticas como reutilização de código, seletores CSS limpos e organização por cenários de teste.

## 🛠️ Stack

- **Playwright** — framework de automação de testes E2E
- **TypeScript** — tipagem estática para JavaScript
- **Node.js v24** — ambiente de execução
- **GitHub Actions** — CI configurado para rodar os testes automaticamente

## 📋 Testes implementados

Testes de login cobrindo os seguintes cenários (`tests/login.spec.ts`):

- ✅ Login com credenciais válidas (valida URL e mensagem de sucesso)
- ✅ Login com senha inválida (valida mensagem de erro)
- ✅ Login com campos vazios (valida mensagem de erro)

Todos os testes rodam em **3 navegadores**: Chromium, Firefox e WebKit.

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
