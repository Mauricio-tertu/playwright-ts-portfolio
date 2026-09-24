# Relatório de Sessão de Reteste — HolySet

**Data:** 24/09/2026
**QA responsável:** Maurício Tertúliano
**Ambiente:** `segredinho.memremodelacoes.pt` (dev)
**Dispositivo/viewport:** Mobile-first, 405x689 (Chrome DevTools Device Toolbar), simulação de rede "4G lenta"
**Metodologia:** Reteste de tickets em *In Review* com roteiro por ticket (reproduzir passos originais → validar correção → testar bordas), verificação via DevTools (aba Rede) e persistência após F5 / logout-login

---

## Resumo Executivo

Sessão dedicada a esvaziar a coluna **In Review**, que acumulava ~20 tickets após uma rodada de correções do time de desenvolvimento. Os retestes foram agrupados por área do app (Perfil/Equipe, Autenticação, Notificações) para reduzir troca de contexto.

**Resultado:** 8 tickets validados e concluídos, 1 devolvido com evidência técnica e 1 bug novo registrado. Uma observação de privacidade foi identificada e encaminhada ao time antes de qualquer registro público.

| Resultado | Tickets |
|---|---|
| ✅ Concluídos após reteste | SCRUM-15, 16, 14, 13, 23, 12, 24, 37 |
| ❌ Devolvido para A fazer | SCRUM-31 |
| 🆕 Criado | SCRUM-40 |
| ⏳ Restam em review | Biblioteca/Playlists (17, 18, 19, 25, 26, 27, 29) e Cultos/Escalas (20, 21, 22, 30) |

---

## 1. Perfil e Equipe

### SCRUM-15 — Admin não conseguia salvar o próprio nome (403) → ✅ Concluído
- Nome editado 2x com valores diferentes → **200** do Supabase.
- Persistência confirmada após F5 (2x) e após logout/login.
- Observação: a edição de nome mudou de lugar, da tela Equipe para **Perfil → Editar dados**.

### SCRUM-16 — Admin não conseguia remover membro (403) → ✅ Concluído
- Remoção confirmada → **DELETE em `ministry_members` com 204**. O membro some e não volta após F5 (testado com 2 membros).
- Cancelar no popup de confirmação mantém o membro, sem nenhuma request.
- O admin não tem opção de remover a si mesmo (lixeira ausente na própria linha). Borda coberta.
- **Causa provável da correção:** as operações deixaram de acessar diretamente a tabela `users`, que era a origem do erro "permission denied for table users" nos dois tickets.

### SCRUM-14 — Botão Salvar mudo com nome vazio → ✅ Concluído
| Cenário | Resultado |
|---|---|
| Campo vazio | "Informe um nome de exibição", sem request |
| 1 caractere | "O nome deve ter pelo menos 2 caracteres" |
| Só espaços / "m " | Bloqueados (trim funcionando) |
| Nome válido | Salva normalmente |

### SCRUM-13 — Busca de membros na Equipe → ✅ Concluído
- Busca por nome ou e-mail implementada no novo modal **Convidar membro**, funcionando.
- A lista da tela Equipe continua sem filtro no mobile. Fica registrada como possível melhoria em ticket separado.

### SCRUM-23 — Funcionalidades dos campos de "Meu Perfil" → ✅ Concluído (com observações)
- Nome, celular e data de nascimento salvam e persistem após F5.
- Observações registradas no ticket:
  - O **celular aceita apenas o formato brasileiro** (virou o SCRUM-40, abaixo).
  - A **data de nascimento** bloqueia anos futuros, mas aceita datas recentes (ex.: 15/09/2026). Sugestão: idade mínima.

---

## 2. Autenticação

### SCRUM-12 — Flash da tela "Acesso Restrito" no login → ✅ Concluído
- 4 logins consecutivos com rede "4G lenta" (o cenário mais favorável para o flash aparecer): **nenhuma ocorrência**.

### SCRUM-31 — Signup rejeita e-mail válido (400) + rate limit (429) → ❌ Devolvido
- **429:** tratado como limitação de plano do Supabase (alinhado com o dev). O app agora exibe uma mensagem amigável em PT: "Muitas tentativas. Aguarde alguns minutos e tente novamente".
- **400 persiste:** o e-mail original do bug → 400 "Email address ... is invalid", enquanto uma variação com sufixo numérico → 200, na mesma sessão.
- **Hipótese encaminhada:** bloqueio do próprio Supabase Auth para esse endereço (ex.: bounce anterior). Recomendação: checar os logs de Auth.
- **UX:** o erro 400 aparece em inglês, cru, vindo direto do backend, sem o tratamento dado ao 429.
- Testes limitados a 3 signups espaçados para não esgotar o rate limit. O 429 foi atingido na 3ª tentativa, o que confirma o limite baixo.

---

## 3. Notificações

### SCRUM-24 (feature) + SCRUM-37 (teste do sininho) → ✅ Concluídos
- Sininho visível no dashboard, notificações disparam, o badge some ao ler, e o estado persiste após F5.
- Nova área **Perfil → Notificações** ("Gerenciar alertas e e-mails"): os toggles salvam e são respeitados. A área não tinha ticket próprio e ficou registrada como testada no SCRUM-37.
- Pendente: teste de notificação entre dois usuários (depende de conta não-admin ativa).

---

## 4. Bug novo

### SCRUM-40 — Campo Celular aceita apenas formato brasileiro (prioridade High)
- Números portugueses (`+351 9XXXXXXXX`) são rejeitados com "Informe DDD + número (10 ou 11 dígitos)".
- A única forma de salvar um número PT é inventar um DDD brasileiro: o número salvo aparece como "(11) ...".
- **Impacto:** o app é usado por igrejas em Portugal, e nenhum usuário local consegue cadastrar o celular real.
- **Sugestão:** aceitar formato internacional ou seletor de país (PT +351 / BR +55).

---

## 5. Observação de privacidade (em análise)

Durante o reteste do SCRUM-13, foi identificada uma questão de exposição de dados de usuários, relevante para o RGPD. O achado foi **reportado diretamente ao time de desenvolvimento** e os detalhes técnicos ficam omitidos neste relatório público até a avaliação e correção, por boa prática de divulgação responsável.

---

## Pendências para a próxima sessão

- Validar o RLS da tabela `profiles` com conta **não-admin** (conta de teste criada nesta sessão): o membro comum não pode editar dados de outro membro.
- Retestar Biblioteca/Playlists (17, 18, 19, 25, 26, 27, 29) e Cultos/Escalas (20, 21, 22, 30).
- Repor membros de teste na Equipe (2 foram removidos no reteste do SCRUM-16).

---

## Tickets referenciados

| Ticket | Descrição | Status nesta sessão |
|---|---|---|
| SCRUM-15 | Admin não salva o próprio nome (403) | Concluído |
| SCRUM-16 | Admin não remove membro (403) | Concluído |
| SCRUM-14 | Salvar sem resposta com nome vazio | Concluído |
| SCRUM-13 | Busca de membros na Equipe | Concluído |
| SCRUM-23 | Campos de "Meu Perfil" | Concluído com observações |
| SCRUM-12 | Flash "Acesso Restrito" no login | Concluído |
| SCRUM-31 | Signup 400 + rate limit 429 | Devolvido (400 persiste) |
| SCRUM-24 | Sininho de notificações (feature) | Concluído |
| SCRUM-37 | Teste do sininho | Concluído |
| SCRUM-40 | Celular só aceita formato BR | Criado (High) |
| SCRUM-39 | Verificar bugs em review | Em andamento |
