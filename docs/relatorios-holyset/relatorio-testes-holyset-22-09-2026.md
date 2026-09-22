# Relatório de Sessão de Testes Exploratórios — HolySet

**Data:** 22/09/2026
**QA responsável:** Maurício Tertúliano
**Ambiente:** `segredinho.memremodelacoes.pt` (dev)
**Dispositivo/viewport:** Mobile-first, ~435x689 (Chrome DevTools Device Toolbar), simulação de rede "4G lenta"
**Metodologia:** Testes exploratórios manuais, com verificação cruzada via DevTools (aba Rede) quando aplicável

---

## Resumo Executivo

Sessão cobrindo o módulo **Meu Perfil / Central de Ministérios** e o módulo de **Notificações (sininho)**, com uma tentativa adicional de testar níveis de permissão (Admin vs. usuário comum) via novo cadastro. Foi identificado **1 bug crítico novo** (SCRUM-38), reforçada uma investigação em aberto (SCRUM-35), confirmado o funcionamento do sininho de notificações (SCRUM-37), e documentado um problema de configuração de ambiente fora do escopo de QA funcional (redirect de confirmação de email).

Seguindo o novo acordo de ritmo de entrega, o volume de tickets novos foi limitado a **2 por dia**, priorizando os achados de maior impacto.

| Módulo | Status | Bugs novos/atualizados |
|---|---|---|
| Central de Ministérios / Navegação | Testado | 1 novo (SCRUM-38, crítico) |
| Meus Ministérios (lista) | Reconfirmado com nova evidência | SCRUM-35 atualizado |
| Notificações (sininho) | Testado — funcional | 0 (SCRUM-37 confirmado) |
| Cadastro / confirmação de email | Testado, bloqueado | Observação registrada (não é ticket) |
| Meu Perfil (edição de dados) | Bloqueado | Módulo ainda em desenvolvimento, sem CRUD implementado |

---

## 1. Central de Ministérios / Navegação

**Cobertura:** Fluxo de entrar em um ministério existente e de criar um novo ministério.

### Achados

**SCRUM-38 (novo) — Bug crítico: botões "Entrar" e "Novo Ministério" redirecionam para a tela de Perfil**
- Tanto o botão "Entrar" de qualquer card de ministério (testado em iluminação, TEC AUDIO, FOTOGRAfia, legacy) quanto o botão "Criar Ministério" do modal "Novo Ministério" levam para a tela de Perfil, em vez de abrir o ministério ou confirmar a criação.
- Sem nenhum toast/push de confirmação após criar um ministério — a única forma de saber se a criação funcionou é conferir manualmente a lista depois.
- **Impacto:** bloqueia o fluxo principal do app. Usuário não consegue acessar nenhum ministério pelo caminho normal da interface.
- Evidência indireta: um ministério criado durante o teste (contabilizado no card de estatísticas, que subiu de 5 para 6) não apareceu imediatamente na lista "Meus Ministérios" — reforça que a ação ocorre no backend mesmo com a navegação quebrada.

---

## 2. Meus Ministérios (lista, tela Início)

**SCRUM-35 (reconfirmado com nova evidência)** — Lista incompleta
- Sessão anterior (21/09): card do ministério "legacy" aparecia sem nome.
- Hoje: o total de ministérios subiu de 5 para 6 (conforme card de estatísticas "Ministérios que você participa"), mas a seção "Meus Ministérios" na tela Início continua mostrando apenas 3 (PREGADORES, iluminação, TEC AUDIO). FOTOGRAfia, legacy e o ministério recém-criado sem nome não aparecem.
- Ainda não confirmado se a causa é no backend (dado ausente) ou na renderização da lista (filtro/paginação incorreta).
- Comentário adicionado ao ticket existente em vez de abrir um novo, dentro do limite de 2 tickets/dia.

---

## 3. Notificações (sininho)

**SCRUM-37 (confirmado funcional)**
- Badge com contador (testado com 2 notificações pendentes) aparece corretamente no ícone de sino.
- Dropdown abre ao clicar, exibindo notificações "Escala atualizada!" do ministério PREGADORES, com timestamp relativo ("agora").
- Ícones de lixeira (limpar) e fechar (X) presentes na UI.
- Teste aprofundado das ações (marcar como lida, limpar todas, persistência após F5, clique em notificação individual) fica pendente para próxima sessão.

---

## 4. Cadastro e confirmação de email (fora do escopo de bug funcional)

Durante a tentativa de criar uma conta de teste para validar permissões (Admin vs. usuário comum):

- Link de confirmação de email (Supabase) aponta para `redirect_to=http://localhost:3000`, inexistente neste ambiente — gera `ERR_CONNECTION_REFUSED` após confirmação.
- Na mesma tentativa, o token de confirmação retornou `otp_expired` poucos minutos após o envio do email — possivelmente relacionado a pré-visita automática de link por scanners de segurança do Gmail, não necessariamente bug do HolySet.
- Segunda tentativa de cadastro bloqueada por `email rate limit exceeded` (limite padrão do Supabase).
- **Não registrado como ticket** — é uma configuração de ambiente dev (redirect para localhost), não um bug de comportamento do app. Fica como observação para alinhar com o Rafael.

---

## 5. Meu Perfil (edição de dados)

Confirmado com o time: o módulo "Meu Perfil" está apenas organizado estruturalmente (layout, campos visíveis), sem funcionalidade de edição implementada ainda. Teste de CRUD nesse módulo fica pendente até a feature ser entregue.

---

## 6. Regra de negócio a esclarecer

Levantada a necessidade de documentar formalmente: apenas usuários com nível de acesso **Admin** deveriam poder criar/editar ministérios; usuários comuns deveriam ter acesso somente leitura + solicitação de troca de escala. Essa regra ainda não está escrita em lugar nenhum — Maurício vai formalizá-la para uso como referência em testes futuros de permissão.

---

## Observações operacionais

- A partir de hoje, o volume de tickets novos por sessão foi limitado a **2 por dia**, para não sobrecarregar Rafael e Erick. Achados adicionais são registrados neste relatório e priorizados para sessões seguintes.
- Teste de permissão (conta não-admin) ficou bloqueado por indisponibilidade de conta de teste e pelos problemas de confirmação de email acima — retomar quando o Rafael disponibilizar uma conta, ou quando o rate limit do Supabase resetar.

---

## Tickets referenciados

| Ticket | Descrição | Status nesta sessão |
|---|---|---|
| SCRUM-38 | Botões "Entrar" e "Novo Ministério" redirecionam para Perfil | Criado (crítico) |
| SCRUM-35 | Lista "Meus Ministérios" incompleta | Atualizado com nova evidência |
| SCRUM-37 | Testar funcionamento do sininho no dashboard | Confirmado funcional |
