# Relatório de Testes Exploratórios — HOLYSET
**Data:** 03/09/2026
**Testador:** Maurício Tertuliano Santos Silva
**Ambiente:** Mobile (Chrome, Android, 4G e Wi-Fi) e Desktop (Chrome)
**Contexto:** Rafael (líder técnico) atualizou o design do HOLYSET e solicitou uma rodada de testes intensivos, com prioridade em mobile, para validar o novo layout antes de avançar com o desenvolvimento.

---

## Objetivo da sessão

Validar o comportamento do app após a atualização visual (nav bar bottom, novo design), com foco em fluxos de autenticação, biblioteca de músicas, gestão de equipe e escalas de culto.

---

## Resumo executivo

| Métrica | Resultado |
|---|---|
| Telas mapeadas | Login/Cadastro, Biblioteca (Músicas), Equipe, Escalas |
| Bugs confirmados | 3 |
| Bugs de prioridade Crítica/Alta | 2 |
| Falsos positivos investigados e descartados | 2 |
| Tickets JIRA atualizados/criados | SCRUM-11 (reconfirmado), SCRUM-12 (novo), SCRUM-13 (novo) |

---

## Bugs encontrados

### 🔴 SCRUM-11 — Cadastro permite e-mail duplicado (reconfirmado em mobile)
**Prioridade:** Alta
**Ambiente:** Desktop e Mobile

Ao tentar criar uma conta nova usando um e-mail já cadastrado, o sistema não bloqueia a ação. Em vez de exibir erro de "e-mail já existente", processa como cadastro válido e exibe "Conta Criada!", informando envio de e-mail de confirmação — que nunca chega.

**Testes realizados hoje:**
- Repetido o teste em mobile com a mesma senha da conta original → comportamento idêntico
- Repetido com senha diferente da conta original → comportamento idêntico
- Confirmado que nenhum e-mail de confirmação chega em nenhum dos dois casos
- Confirmado que a conta original permanece íntegra e o login com credenciais reais continua funcionando normalmente

**Conclusão:** bug confirmado como reproduzível de forma consistente (3ª confirmação), isolado ao fluxo de cadastro, sem impacto em contas já existentes. Risco de segurança/confusão para o usuário.

---

### 🟠 SCRUM-12 — Flash da tela "Acesso Restrito" ao fazer login (mobile)
**Prioridade:** Média-Alta

Ao fazer login com sucesso, a tela "Acesso Restrito" ("Você ainda não tem permissão para visualizar nenhum ministério...") aparece rapidamente antes do app carregar o conteúdo real do usuário, estabilizando em seguida no conteúdo correto.

**Testes realizados:**
- Reproduzido de forma consistente em 4G e Wi-Fi, descartando causa relacionada à velocidade de rede
- Comportamento idêntico em dois dias de teste consecutivos

**Suspeita técnica:** checagem de permissão do usuário roda de forma assíncrona e a UI renderiza o estado de "sem permissão" como padrão antes da resposta chegar, em vez de mostrar um loading state.

---

### 🟡 SCRUM-13 — Busca de membros ausente no mobile e não funcional no desktop
**Prioridade:** Média-Alta

A tela "Equipe" (27 membros) não oferece busca funcional em nenhuma plataforma:
- **Desktop:** campo de busca existe, mas não filtra a lista
- **Mobile:** campo de busca não existe na tela

**Impacto:** com o crescimento da equipe, a ausência de busca funcional prejudica a usabilidade — usuário precisa rolar a lista inteira manualmente.

---

## Investigações que não resultaram em bug

Durante a sessão, dois comportamentos suspeitos foram investigados e descartados após validação, evitando abertura de tickets incorretos:

1. **Filtro de categoria personalizada na Biblioteca** — campo "criar categoria" testado com texto livre. Comportamento confirmado como "filtro rápido temporário" (não persiste como categoria nova), conforme intenção de produto validada com o usuário.
2. **Busca por letra "D" retornando resultado sem match aparente** — investigado se a busca estava indexando o campo de "tom" da música indevidamente. Descartado: o resultado ("Cristo", artista "Alessandro Vilas Boas") continha a letra "D" no próprio nome do artista — coincidência, não bug.

---

## Telas exploradas sem achados

- **Biblioteca > Músicas:** filtros de categoria fixos, busca por texto, lista de 18 músicas — funcionando corretamente
- **Equipe:** listagem de 27 membros, cards de perfil — estrutura visual ok (exceto busca, já reportado)
- **Escalas:** 3 cultos cadastrados, vínculo de equipe escalada, vínculo de playlist/repertório, notas do culto — fluxo íntegro
- **Logout/Login:** campos de e-mail e senha não ficam preenchidos automaticamente após logout — sem vazamento de credenciais

---

## Próximos passos

- Acesso administrativo separado (e-mail dedicado a testes de admin) solicitado ao Eric, a ser configurado ainda hoje — permitirá testar fluxos de gestão de ministérios, criação de culto e permissões elevadas
- Áreas ainda não mapeadas: Dashboard, Playlists, Trocas de Escala, Ver Ministérios, Notificações
- Recomenda-se nova rodada de testes com o acesso admin ativo

---

## Observações finais

Sessão de teste exploratório com boa cobertura em relação ao tempo disponível (~1h). A taxa de 3 bugs confirmados sobre 4 áreas principais mapeadas indica boa qualidade geral do app, com destaque para dois problemas que merecem atenção prioritária do time de desenvolvimento: validação de e-mail duplicado no cadastro (SCRUM-11) e ausência de busca funcional na tela de Equipe (SCRUM-13).
