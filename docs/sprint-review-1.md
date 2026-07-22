# Sprint Review — Sprint 1

**Período:** 15/07 a 22/07/2026

## ✅ Entregue (tickets concluídos)
- **SCRUM-10** — Testes de login refatorados com Page Object Model (LoginPage)
- **SCRUM-14** — CI/CD com GitHub Actions validado: suíte completa a cada push + badge no README
- **SCRUM-18** — foi criado método goto() ao LoginPage e criado segundo Page Object 
- **SCRUM-15** — Criar suite de testes de regressão @ smoke para prioridade  @regression para restantes
- **SCRUM-20** — instabilidade do teste de logout no Chromium (flaky tempo demais aguardando resposta)
- **SCRUM-21** — investigar o erro do git actions- foi apenas o tempo de resposta da pagina
- **SCRUM-16** — Documentar casos de teste no formato Gherkin (BDD) facilitando a leitura 


## 🔄 Não concluído (volta pro backlog)
- **SCRUM-12** — Cobertura de API revisada informalmente; falta registrar a análise no ticket
- **SCRUM-13** — Execução cross-browser já validada na prática; falta documentar evidências

## 📚 Aprendizados da sprint
Aprendi que refatorar é melhorar a estrutura sem mudar o comportamento — e que o POM centraliza os seletores numa classe, facilitando a manutenção.
aprendi que testes podem falhar por tempo de espera pela pagina o chamado (flaky)
Entendi que CI serve para testar o meu codigo na nuvem, me dando mais confiabilidade no codigo

## 📊 Números
- 11 cenários de teste × 3 navegadores = 33 execuções por rodada
- Suíte @smoke: 9 execuções em ~42s
- ~14 execuções de CI no GitHub Actions
- 16 commits no repositório