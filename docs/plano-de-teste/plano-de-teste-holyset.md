# Plano de Teste — HOLYSET

**Projeto:** HOLYSET — Sistema de Gestão de Ministério
**QA Responsável:** Maurício Silva
**Ambiente de teste:** segredinho.memremodelacoes.pt (dev)
**Ambiente de produção:** holy-set.vercel.app
**Data de criação:** 13/09/2026
**Versão:** 1.0

---

## 1. Objetivo

Definir o escopo, os tipos de teste, a estratégia e os critérios de qualidade aplicados ao HOLYSET, garantindo cobertura sistemática de qualidade além do teste exploratório ad-hoc, com processo de QA formalizado para o projeto.

## 2. Escopo

### Módulos cobertos
- Escalas
- Playlists
- Biblioteca de Louvores
- Cultos
- Equipe do Ministério
- Autenticação (Supabase Auth)

### Fora de escopo (nesta fase)
- Teste de carga/performance
- Teste de penetração formal (apenas XSS básico em campos de texto)
- Testes em dispositivos físicos (uso de emulação via DevTools)

## 3. Tipos de Teste

| Tipo | Status atual | Ferramenta |
|---|---|---|
| Exploratório | ✅ Em execução | Manual + Chrome DevTools |
| Automação E2E | 🔄 Em construção | Playwright + TypeScript |
| Teste de API | ❌ Não iniciado | Playwright API / Postman |
| Regressão | ❌ Não formalizado | A definir (suite Playwright) |
| Smoke test | ❌ Não iniciado | Playwright (subset @smoke) |
| Compatibilidade | 🔶 Parcial (mobile viewport simulado) | Chrome DevTools Device Toolbar |
| Acessibilidade | ❌ Não iniciado | axe-core / Lighthouse |
| Segurança básica | 🔶 Parcial (XSS em nome) | Manual |

## 4. Estratégia de Automação — Pirâmide de Testes

```
        /\
       /E2E\        ← poucos, críticos (login, criar culto, criar escala)
      /------\
     /  API   \      ← maioria da cobertura de regras de negócio
    /----------\
   /   Unit*    \    ← fora do escopo de QA (responsabilidade dev)
  /--------------\
```
*Testes unitários são responsabilidade de Rafael/Erick; QA foca em API + E2E.

**Decisão de arquitetura de teste:**
- E2E (Playwright): fluxos críticos de usuário, ponta a ponta, mobile-first (viewport 338x689)
- API: validação de regras de negócio direto no Supabase (ex: RLS, unicidade de Diretor Musical por culto, validação de e-mail)
- Locators: priorizar `getByRole`, `getByLabel` como estratégia de resiliência enquanto `data-testid` não é implementado pela equipe de dev

**Risco documentado:** ausência sistêmica de `id`/`name`/`data-testid` no HOLYSET aumenta o custo de manutenção da automação E2E. Escalado para Rafael como débito técnico de testabilidade.

## 5. Critérios de Entrada e Saída

**Entrada (para iniciar teste de uma feature):**
- Feature disponível em ambiente dev
- Critérios de aceite conhecidos (mesmo que informais, via Slack/Jira)

**Saída (para considerar uma feature testada):**
- Teste exploratório executado e bugs reportados no Jira (SCRUM)
- Casos críticos cobertos por automação E2E ou API
- Sem bug crítico/bloqueante em aberto sem triagem

## 6. Ambiente e Ferramentas

- **Ambiente:** segredinho.memremodelacoes.pt (dev), VPS sslip.io
- **Automação:** Playwright + TypeScript, repositório `playwright-ts-portfolio`
- **Gestão de bugs/tarefas:** Jira (SCRUM board, cloud `noreplyfintrackapp.atlassian.net`)
- **Inspeção:** Chrome DevTools (Network, Console, Device Toolbar)
- **Controle de versão:** GitHub, commits via conventional commits

## 7. Matriz de Rastreabilidade (modelo a preencher)

| Módulo | Caso de Teste | Tipo | Automatizado? | Status |
|---|---|---|---|---|
| Cultos | Criar culto com 1 Diretor Musical | Funcional | Não | ✅ Passou |
| Cultos | Impedir múltiplos Diretores Musicais | Regra de negócio | Não | 🐛 SCRUM-XX |
| Auth | Login com e-mail curto válido | API | Não | 🐛 400/429 |
| Playlists | Excluir playlist sem confirmação | UX/Funcional | Não | 🐛 Reportado |

*(preencher incrementalmente conforme novos casos são cobertos)*

## 8. Riscos Identificados

1. **Testabilidade:** ausência de atributos estáveis (`data-testid`) em toda a aplicação
2. **RLS mal configurado:** causa raiz de erros 403 em operações administrativas (SCRUM-14 a 18)
3. **Validação de formulário ausente:** padrão sistêmico em formulários de Culto e Playlist
4. **Cobertura de navegador:** testes concentrados em Chrome; Safari/iOS não testado

## 9. Próximos Passos

1. Implementar suite de testes de API (Supabase endpoints) — prioridade alta
2. Definir subset de smoke test (@smoke) para rodar a cada deploy em dev
3. Rodar auditoria de acessibilidade básica (axe-core) e reportar achados
4. Formalizar casos de teste em Gherkin para os fluxos críticos já testados exploratoriamente
5. Negociar com Rafael a inclusão de `data-testid` como padrão de desenvolvimento

---

*Documento vivo — atualizado conforme a cobertura de teste evolui.*
