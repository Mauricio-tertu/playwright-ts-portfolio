# Relatório de Testes — HOLYSET — 28/09/2026

**Testador:** Maurício Tertúliano (QA)
**Ambiente:** dev
**Dispositivo:** Chrome DevTools, viewport mobile 400×689, rede "4G lenta" (salvo indicação em contrário)
**Contas:** admin + membro não-admin (conta de teste)

---

## Resumo

| Item | Resultado |
|---|---|
| Retestes concluídos | 1 (SCRUM-44 → Concluído) |
| Tickets novos | 1 (SCRUM-45) |
| Bugs investigados até a causa raiz | 1 (tela preta em Playlists, ticket pendente) |
| Tickets bloqueados | 1 (SCRUM-19) |
| Evidências para tickets existentes | 2 (SCRUM-33, SCRUM-36) |

---

## 1. Reteste — SCRUM-44 ✅ Corrigido

**Ticket:** Excluir ministério com dados falha em silêncio (409 no banco, sem aviso ao usuário)

A exclusão agora é feita pela função RPC `delete_ministry`.

| Cenário | Resultado |
|---|---|
| Excluir ministério sem permissão | 400 (`P0001`) com a mensagem "Sem permissão para excluir este ministério.", exibida ao usuário ✅ |
| Excluir ministério com membro + escala vinculados | Sucesso (200/204) ✅ |
| Conta membro após a exclusão | Ministério e escala removidos, sem dado órfão ✅ |

**Observações de UX (não bloqueantes):**
1. A confirmação é um "Tem certeza?" genérico e não avisa que membros e escalas também serão apagados, mesmo sendo uma exclusão em cascata.
2. O erro de permissão usa `alert()` nativo, que destoa do tema do app.
3. A lixeira aparece em ministérios que o usuário não pode excluir.

**Status:** movido para Concluído.

---

## 2. Bug novo — SCRUM-45 (High)

**Título:** Membro não consegue solicitar troca de escala — RLS bloqueia escrita em `ministry_data` (403) e erro técnico é exibido ao usuário

**Como foi encontrado:** exploratório, na conta de membro.

**Passos:** Escalas → Trocas de Escala → Novo Pedido → preencher → Salvar

**Obtido:**
- O upsert em `ministry_data` retorna **403**, código `42501` (insufficient_privilege)
- Mensagem crua do Postgres exibida ao usuário: *"new row violates row-level security policy (USING expression)…"*

**Análise:** em upsert, a violação na "USING expression" indica que o registro já existe e o membro não tem política de UPDATE na tabela. O pedido de troca parece ser gravado no mesmo registro de dados do ministério, que só admin pode editar. Relacionado ao SCRUM-15 (RLS).

**Impacto:** funcionalidade de troca indisponível para membros, e informação técnica do banco exposta ao usuário final.

---

## 3. Investigação — Tela preta em Playlists 🔍 (ticket pendente)

**Sintoma:** a aba Playlists abre totalmente escura, sem conteúdo, em **todos** os ministérios, inclusive nos que têm playlists e em um ministério recém-criado. O F5 não resolve.

**Investigação, passo a passo:**

1. **Network:** `ministry_members?select=role…` retorna **406**
2. **Resposta do 406:** `PGRST116` — *"The result contains 0 rows"*. O front usa `.single()` para buscar o papel do usuário e não encontra vínculo.
   - A hipótese inicial de registro duplicado (relacionada ao achado "mesmo membro em dois instrumentos") foi **descartada**.
3. **Armazenamento local:** o app guarda o estado de navegação no navegador:
   - `holySet_activeMinistryId`
   - `holySet_activePlaylistId`
   - `holySet_activeTab = playlists`
4. **Teste decisivo:** apagar apenas `holySet_activeMinistryId` e `holySet_activePlaylistId` e recarregar → **a tela de Playlists voltou ao normal**.

**Causa provável:** depois da exclusão de ministérios (e das playlists deles, em cascata), o navegador continua apontando para IDs que não existem mais. O app não trata essa referência inválida e a tela não renderiza.

**Impacto:** o usuário fica sem saída, porque a única correção é limpar o armazenamento pelo DevTools. Em produção, se um admin excluir um ministério, **todo membro** que estava com ele aberto pode ficar com a tela de Playlists preta.

**Próximo passo:** reproduzir de forma limpa (criar ministério → abrir playlist → excluir ministério → abrir Playlists em outro ministério) e abrir o ticket.

---

## 4. Bloqueios

- **SCRUM-19** (data retroativa na criação de playlist): reteste **bloqueado** pela tela preta em Playlists. Retomar na próxima sessão, a partir do Cenário 1.

---

## 5. Evidências para tickets existentes

- **SCRUM-33** (data quebrada em Trocas de Escala): **continua aberto**. O card mostra `28T10:42:00.447Z/09/2026`.
- **SCRUM-36** (`fire-heart.png` 404): o **manifest** do app usa o mesmo ícone quebrado, o que gera um erro adicional no Console. Não abrir ticket novo; adicionar comentário no SCRUM-36.

---

## 6. Pendências para a próxima sessão

1. Reproduzir a tela preta e abrir o ticket
2. Retestar o SCRUM-19 (6 cenários)
3. SCRUM-45: anexar prints e verificar por que não aparece no board
4. Comentar no SCRUM-36 sobre o manifest
5. Abrir tickets: mesmo membro em dois instrumentos; plural "1 músicas"
6. Retestar os demais em In Review: SCRUM-43, 41, 42, 23

---

## 7. Aprendizados técnicos

| Código | Origem | Significado |
|---|---|---|
| `P0001` | Postgres | `RAISE EXCEPTION` escrito à mão numa função (regra de negócio proposital) |
| `42501` | Postgres | `insufficient_privilege`: bloqueio de permissão/RLS |
| `PGRST116` / 406 | PostgREST (Supabase) | `.single()` recebeu 0 ou mais de 1 linha |

- **Armazenamento local (DevTools → Aplicativo):** estado guardado no navegador pode sobreviver a F5 e causar bugs que não aparecem para outros usuários. Vale checar sempre que um bug "só acontece no meu navegador".
- **Isolar a causa:** apagar só as chaves suspeitas, em vez de limpar tudo, prova qual dado causa o problema e preserva o login.
