# Playwright TS Portfolio

![Playwright Tests](https://github.com/Mauricio-tertu/playwright-ts-portfolio/actions/workflows/playwright.yml/badge.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

> QA responsável pelo HOLYSET, em produção — atenção aos detalhes que fazem a diferença.

Meu trabalho como QA não é só encontrar bugs, é entender o sistema profundamente o suficiente pra saber onde ele vai falhar antes que o usuário descubra. Este repositório documenta esse processo no HOLYSET: investigação de causa raiz, decisões sobre o que testar primeiro, e a automação que sustenta isso no longo prazo.

---

## 🏢 Projeto Real em Produção — HOLYSET

Atuo como **QA único e responsável** por um sistema real em produção, usado por igrejas para gestão de cultos, escalas e repertório musical — [holy-set.vercel.app](https://holy-set.vercel.app) — trabalhando junto a um engenheiro sénior (com passagem pela Deloitte Portugal) e um desenvolvedor.

### Números do trabalho até aqui

| Métrica | Valor |
|---|---|
| Sessões de teste exploratório documentadas | 5 |
| Defeitos identificados e rastreados no Jira | 20+ (SCRUM-11 a SCRUM-31) |
| Módulos com CRUD validado de ponta a ponta | 4 (Escalas, Playlists, Biblioteca de Louvores, Cultos) |
| Falha sistêmica isolada por investigação de causa raiz | 1 (RLS mal configurado) |
| Cenários de teste automatizados (E2E + API) | 12 |
| Metodologia de teste | Mobile-first (viewport ~338×689) |

### Destaques técnicos

- **Investigação de causa raiz, não só sintoma:** em vez de reportar cada erro 403 isoladamente, isolei que a origem comum era uma *policy* de **RLS (Row Level Security)** mal configurada no banco (Supabase), validando a hipótese com testes cruzados em áreas não afetadas do sistema. Isso evitou uma investigação ampla e direcionou a correção da equipe de desenvolvimento com precisão.
- **Identificação de regra de negócio violada:** o sistema permitia múltiplos "Diretor Musical" no mesmo culto, contrariando uma regra que a equipe assumia como garantida pela interface.
- **Padrão sistêmico, não bug isolado:** identifiquei ausência recorrente de validação de formulário nos módulos de Culto e Playlist através de testes progressivos (do caso simples ao caso extremo), escalando como problema estrutural em vez de tickets soltos.
- **Escalação criteriosa:** quando um comportamento era ambíguo (regra de negócio incerta, não um bug confirmado), escalei como pergunta ao Product Owner em vez de abrir ticket sem validação — evitando ruído no backlog.
- **Achado de testabilidade proativo:** identifiquei e documentei a ausência sistêmica de atributos `id`/`name`/`data-testid` em toda a aplicação, um risco tanto para automação quanto para acessibilidade, e escalei como débito técnico para a equipe.
- **Teste de segurança básico:** validação de XSS em campos de nome, com resultado positivo (inputs tratados como texto literal, sem execução de script).
- **Investigação independente de credenciais + teste de API de segurança:** sem acesso direto às chaves do Supabase, localizei a configuração no código-fonte e capturei a URL/anon key via inspeção de tráfego de rede no ambiente real, depois automatizei um teste que valida que a API **bloqueia corretamente acesso sem autenticação (401)** — confirmando que a política de RLS está ativa e funcionando.

### Evidência documentada

- 📋 [Plano de teste formal](docs/plano-de-teste/plano-de-teste-holyset.md) — escopo, tipos de teste, estratégia de automação e matriz de rastreabilidade
- 📄 [Relatórios de sessão completos](docs/relatorios-holyset/) — 6 sessões, do achado ao ticket
- 🧪 [Casos de teste manuais](docs/casos-de-teste-manuais.md)
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
- **API real do HOLYSET** (`tests/holyset-supabase.spec.ts`) — validação da API REST do Supabase em produção, incluindo teste de segurança negativo (bloqueio de acesso sem autenticação)

> No CI público (badge acima) essa última suíte aparece como *skipped*, não como falha: ela depende de credenciais que não são versionadas por segurança. Localmente, com o `.env` preenchido (ver `.env.example`), os 12 cenários rodam de ponta a ponta.

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
- Credenciais isoladas via `.env` (nunca versionado) — apenas `.env.example` sobe ao repositório
- Testes que dependem de credenciais externas fazem `test.skip()` de forma explícita quando o ambiente não as tem, em vez de falhar o CI silenciosamente

## 🔜 Próximos passos

- [x] Suite de testes de API para o HOLYSET (Supabase)
- [ ] Specs E2E de login/logout do HOLYSET (POM já criado em `pages/loginPage.holyset.ts`)
- [ ] Smoke test e regressão específicos do HOLYSET (hoje as tags só cobrem o site de prática e a API)
- [ ] Expandir testes de API para outros endpoints (Escalas, Playlists, Biblioteca de Louvores)
- [ ] Auditoria de acessibilidade básica (axe-core)
- [ ] Certificação ISTQB

## 👤 Autor

**Maurício Tertuliano**
QA em transição de carreira (indústria → tecnologia) | Braga, Portugal
[LinkedIn](https://www.linkedin.com/in/maur%C3%ADcio-tert%C3%BAliano-3b916a20b/)
