# Playwright TS Portfolio

![Playwright Tests](https://github.com/Mauricio-tertu/playwright-ts-portfolio/actions/workflows/playwright.yml/badge.svg)

Portfólio de QA com automação em **Playwright + TypeScript** e um caso real de projeto profissional em produção — não apenas exercícios de curso.

---

## 🏢 Projeto Real em Produção — HOLYSET

Atuo como **QA único e responsável** por um sistema real em produção, usado por igrejas para gestão de cultos, escalas e repertório musical — [holy-set.vercel.app](https://holy-set.vercel.app) — trabalhando junto a um engenheiro sénior (com passagem pela Deloitte Portugal) e um desenvolvedor.

### Números do trabalho até aqui

| Métrica | Valor |
|---|---|
| Sessões de teste exploratório documentadas | 5 |
| Defeitos identificados e rastreados no Jira | 20+ (SCRUM-11 a SCRUM-31) |
| Módulos com CRUD validado de ponta a ponta | 3 (Escalas, Playlists, Biblioteca de Louvores) |
| Falha sistêmica isolada por investigação de causa raiz | 1 (RLS mal configurado) |
| Metodologia de teste | Mobile-first (viewport ~338×689) |

### Destaques técnicos

- **Investigação de causa raiz, não só sintoma:** em vez de reportar cada erro 403 isoladamente, isolei que a origem comum era uma *policy* de **RLS (Row Level Security)** mal configurada no banco (Supabase), validando a hipótese com testes cruzados em áreas não afetadas do sistema. Isso evitou uma investigação ampla e direcionou a correção da equipe de desenvolvimento com precisão.
- **Identificação de regra de negócio violada:** o sistema permitia múltiplos "Diretor Musical" no mesmo culto, contrariando uma regra que a equipe assumia como garantida pela interface.
- **Padrão sistêmico, não bug isolado:** identifiquei ausência recorrente de validação de formulário nos módulos de Culto e Playlist através de testes progressivos (do caso simples ao caso extremo), escalando como problema estrutural em vez de tickets soltos.
- **Escalação criteriosa:** quando um comportamento era ambíguo (regra de negócio incerta, não um bug confirmado), escalei como pergunta ao Product Owner em vez de abrir ticket sem validação — evitando ruído no backlog.
- **Achado de testabilidade proativo:** identifiquei e documentei a ausência sistêmica de atributos `id`/`name`/`data-testid` em toda a aplicação, um risco tanto para automação quanto para acessibilidade, e escalei como débito técnico para a equipe.
- **Teste de segurança básico:** validação de XSS em campos de nome, com resultado positivo (inputs tratados como texto literal, sem execução de script).

### Evidência documentada

- 📋 [Plano de teste formal](docs/plano-de-teste/plano-de-teste-holyset.md) — escopo, tipos de teste, estratégia de automação e matriz de rastreabilidade
- 📄 [Relatórios de sessão completos](docs/relatorios-holyset/) — 5 sessões, do achado ao ticket
- 🧪 [Casos de teste manuais](docs/casos-de-teste-manuais.md)
- 🔌 [Testes de API via Postman](docs/testes-api-postman.md)

---

## 🛠️ Stack

- **Playwright** — framework de automação de testes E2E
- **TypeScript** — tipagem estática para JavaScript
- **Node.js v24** — ambiente de execução
- **GitHub Actions** — CI configurado para rodar os testes automaticamente
- **Jira** — gestão de bugs e casos de teste em ambiente profissional real

## 🧪 Testes automatizados implementados

**33 execuções por rodada** (11 cenários × 3 navegadores: Chromium, Firefox e WebKit)

- **Login** (`tests/login.spec.ts`) — credenciais válidas, senha inválida, campos vazios
- **Logout** (`tests/logout.spec.ts`) — fluxo completo de login → logout → validação de retorno
- **API** (`tests/api.spec.ts`) — GET, POST, PUT, DELETE e rota inexistente (404)

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

```
├── docs/
│   ├── plano-de-teste/           # Plano de teste formal do HOLYSET
│   ├── relatorios-holyset/       # Relatórios de sessão de teste exploratório
│   ├── casos-de-teste-manuais.md
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

## 🔜 Próximos passos

- [ ] Suite de testes de API para o HOLYSET (Supabase)
- [ ] Page Object Model do módulo Cultos
- [ ] Auditoria de acessibilidade básica (axe-core)
- [ ] Certificação ISTQB

## 👤 Autor

**Maurício Tertuliano**
QA em transição de carreira (indústria → tecnologia) | Braga, Portugal
[LinkedIn](https://www.linkedin.com/in/maur%C3%ADcio-tert%C3%BAliano-3b916a20b/)
