# Relatório de Sessão de Testes Exploratórios — HolySet

**Data:** 10/09/2026
**QA responsável:** Maurício Tertúliano
**Ambiente:** `segredinho.memremodelacoes.pt` (dev)
**Dispositivo/viewport:** Mobile-first, ~356x689 (Chrome DevTools Device Toolbar)
**Metodologia:** Testes exploratórios manuais, com verificação cruzada via console do navegador (DevTools) quando aplicável

---

## Resumo Executivo

Sessão de testes exploratórios cobrindo quatro módulos do HolySet: **Escalas**, **Playlists**, **Biblioteca de Louvores** e **Login/Cadastro**. Foram identificados **7 novos defeitos** (SCRUM-25 a SCRUM-31) e **1 regressão reconfirmada** (SCRUM-11), além da validação de CRUD completo em três módulos.

| Módulo | CRUD | Status | Bugs novos |
|---|---|---|---|
| Escalas | ✅ Completo | Testado | 1 (regra de negócio) |
| Playlists | ✅ Completo | Testado | 3 |
| Biblioteca de Louvores | ✅ Completo | Testado | 2 |
| Login/Cadastro | Parcial | Testado (cadastro) | 1 novo + 1 regressão confirmada |
| Meu Perfil | — | Bloqueado (em dev pelo Eric) | — |

---

## 1. Escalas

**Cobertura:** CRUD completo confirmado (criar culto, adicionar/remover integrante da escala, exclusão).

### Achados

**SCRUM-20 (atualizado)** — Botão de excluir aparece/some de forma instável
- Comportamento reconfirmado, porém com origem mais precisa: o gatilho ocorre durante a **criação de um culto**, não na listagem geral de Escalas como inicialmente reportado.

**SCRUM-30 (novo)** — Sistema permite múltiplos "Diretor Musical (DM)" no mesmo culto
- Regra de negócio esperada: apenas 1 DM por culto.
- Reproduzido no culto "domingop a noite": os 3 integrantes escalados estavam simultaneamente marcados como DM, sem qualquer bloqueio do sistema.
- **Impacto:** afeta diretamente a operação real do ministério — ambiguidade sobre quem é o responsável pelo culto.

---

## 2. Playlists

**Cobertura:** CRUD completo confirmado (criar, editar, adicionar/remover louvor, reordenar, vínculo com culto).

### Achados

**SCRUM-25** — Botões de editar/excluir instáveis ao clique próximo do elemento (mesmo padrão do SCRUM-20, possível componente de UI reaproveitado).

**SCRUM-26** — Exclusão de louvor na playlist não solicita confirmação. Ação destrutiva ocorre imediatamente ao clique, sem modal de segurança.

**SCRUM-27** — Sistema permite adicionar o mesmo louvor múltiplas vezes na mesma playlist, sem validação de duplicidade (reproduzido com 5–6 repetições do mesmo item).

> **Observação de contraste:** a exclusão de louvor na **Biblioteca** solicita confirmação (`window.confirm`), enquanto a exclusão de louvor **dentro da playlist** não. Padrão de confirmação inconsistente entre módulos.

---

## 3. Biblioteca de Louvores

**Cobertura:** CRUD completo confirmado (criar, editar, excluir — com confirmação).

### Achados

**SCRUM-28** — Segundo clique em categoria de filtro já ativa sempre reseta para "Todas" (comportamento consistente, não é bug de clique duplo acidental). Registrado como dúvida de UX: se for toggle intencional, falta feedback visual claro ao usuário.

**SCRUM-29** — Campos "Título" e "Artista/Ministério" sem validação de conteúdo mínimo:
- Aceita registro criado apenas com espaço em branco (sem caractere visível), resultando em card sem identificação na listagem.
- Aceita sequências numéricas longas com caracteres especiais, sem limite ou validação de formato.

---

## 4. Login / Cadastro

**Cobertura:** Fluxo de cadastro testado. Logout temporariamente bloqueado (funcionalidade em desenvolvimento pelo Eric — não reportado como bug).

### Achados

**SCRUM-11 (reconfirmado)** — Cadastro duplicado com e-mail já existente ainda é aceito pelo sistema sem validação. Reconfirmado nesta sessão com o e-mail `mauriciosilva.pt@gmail.com`, já ativo em conta anterior.

**SCRUM-31 (novo)** — Validação de e-mail no Supabase Auth rejeitando endereços válidos:
- `juca@gmail.com` retornou erro 400 (Bad Request) via `supabase.co/auth/v1/signup`, classificado incorretamente como inválido.
- O mesmo endereço com sufixo numérico adicional foi aceito normalmente.
- Testes repetidos também dispararam erro 429 (Too Many Requests), indicando rate limit de signup possivelmente baixo demais para ambiente de desenvolvimento/QA.
- **Causa raiz provável:** configuração de validação de e-mail no painel do Supabase Auth (filtro de e-mails "simples") e/ou rate limiting padrão não ajustado para o ambiente de testes.

---

## Padrões Identificados (Cross-módulo)

1. **Ausência de validação de formato em campos de texto** — presente em Escalas (SCRUM-22), Biblioteca (SCRUM-29) e, por extensão, no comportamento do e-mail (SCRUM-31). Sugestão: consolidar como iniciativa única de validação de inputs no backlog do time.
2. **Inconsistência em confirmação de ações destrutivas** — excluir tem confirmação em alguns contextos (Biblioteca) e não em outros (Playlists). Recomenda-se padronizar.
3. **Componente de UI com comportamento instável ao clique** — reproduzido em dois módulos distintos (Escalas/SCRUM-20 e Playlists/SCRUM-25), sugerindo componente compartilhado com o mesmo defeito.

---

## Tickets Criados/Atualizados Nesta Sessão

| Ticket | Módulo | Resumo |
|---|---|---|
| SCRUM-20 | Escalas | Atualizado — origem do bug precisada (criação de culto) |
| SCRUM-25 | Playlists | Botões instáveis ao clique |
| SCRUM-26 | Playlists | Exclusão sem confirmação |
| SCRUM-27 | Playlists | Louvor duplicado permitido |
| SCRUM-28 | Biblioteca | Filtro reseta com segundo clique |
| SCRUM-29 | Biblioteca | Campos sem validação de conteúdo |
| SCRUM-30 | Escalas | Múltiplos DM no mesmo culto |
| SCRUM-31 | Login/Cadastro | Supabase rejeita e-mail válido + rate limit |
| SCRUM-11 | Login/Cadastro | Comentário de reconfirmação adicionado |

---

## Próximos Passos

- **Meu Perfil**: aguardando finalização do desenvolvimento (SCRUM-23, Eric) para retomar testes.
- Módulos com CRUD completo hoje (Escalas, Playlists, Biblioteca) seguem para eventual regressão após correções dos devs.
- Sugestão ao time: priorizar SCRUM-30 (múltiplos DM) e SCRUM-11 (cadastro duplicado) por impacto direto na integridade operacional e de dados.

---

*Relatório gerado como parte do processo de QA exploratório do projeto HolySet, com documentação mantida no repositório de portfólio [`playwright-ts-portfolio`](https://github.com/mauricio-tertu/playwright-ts-portfolio).*
