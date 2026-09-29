# Relatório de testes HOLYSET — 29/09/2026

**Testador:** Maurício Tertúliano
**Ambiente:** dev (`segredinho.memremodelacoes.pt`)
**Configuração:** Chrome DevTools, mobile 389×689, "4G lenta"
**Janela de teste:** manhã, até 11:30

## Resumo

| Resultado | Tickets |
|---|---|
| Validados / concluídos | SCRUM-19, SCRUM-43, SCRUM-8, SCRUM-31 |
| Bug novo registrado | SCRUM-46 |
| Não testado (bloqueio) | SCRUM-41 |
| Fora do escopo de QA | SCRUM-9 (feature), SCRUM-45 |

---

## Retestes e validações

### SCRUM-19 — Data retroativa na playlist
**Resultado: corrigido no front.**
- Na edição da playlist, datas passadas (27 e 28/09) ficam bloqueadas no calendário; hoje (29/09) é selecionável.
- Seta de mês anterior desabilitada.
- Digitação manual da data não é permitida.
- Playlist salva normalmente com data de hoje e futura.

**Dúvidas de regra de negócio (para o Eric):**
1. O calendário limita a 2 anos à frente. É intencional?
2. A data da playlist é obrigatória? Hoje dá pra salvar sem data usando "Limpar".

**Não verificado:** se o servidor também bloqueia data passada (o teste foi só pela tela).

### SCRUM-43 — Validação de campos de nome
**Testado em:** Renomear ministério, Novo Louvor (título e artista), louvor externo na playlist e culto.

- ✅ Só símbolos (`-----`, `#-------#`, apóstrofos) é bloqueado.
- ✅ Letras + `#` são aceitas (regra de negócio confirmada: letras com `#` ou `@` podem entrar em nomes).
- ✅ Acentos funcionam ("adoração" salvo e exibido corretamente).
- ❌ Nome só com números continuou sendo aceito e salvo: ministério (`2222222`), louvor externo (título e artista) e culto.
- ❓ `adoração+1` foi aceito. Não ficou claro se o `+` é permitido.
- ⚠️ A mensagem ("use letras e números") não cobre o caso de só números e é diferente da sugerida no ticket.

**Ponto em aberto:** o ticket foi fechado por decisão do QA. Registrar se nome só com números é regra de negócio válida.
**Ajuste pendente:** a regra 6 da descrição do ticket lista `@` e `#` como proibidos, o que contradiz a regra de negócio.
**Não testado:** 101 caracteres, só espaços, espaços nas pontas, nome da playlist, perfil e criação de ministério.

### SCRUM-8 — Notificações na Biblioteca
**Resultado: OK.** Nenhuma notificação aparece na Biblioteca (lista, pastas, ao adicionar, editar ou excluir).

### SCRUM-31 — E-mails válidos rejeitados no cadastro
**Resultado: OK.**
- O e-mail curto que antes retornava 400 agora cadastra normalmente ("Conta Criada!").
- E-mail inválido mostra mensagem em português ("Informe um e-mail válido (ex: nome@email.com)."), sem erro em inglês.
- O 429 (limite de tentativas) não foi forçado, para não travar os outros testes de conta.

### SCRUM-41 — Tela de preferência igual ao "Editar funções"
**Não testado.** Não encontrei o "Editar funções" na aba Escalas. O detalhe do culto mostra apenas Equipe Escalada, Vincular Playlist e Notas do Culto. Dúvida enviada ao Eric sobre onde a tela fica agora.

---

## Bug novo

### SCRUM-46 — Não é possível excluir ministério que tem dados dentro
- Como admin, ao excluir um ministério com dados (Louvor Teste, www), aparece o alerta "Erro ao excluir: Sem permissão para excluir este ministério." e ele não é excluído.
- Um ministério vazio (testes444) foi excluído normalmente pelo mesmo admin, então não é falta de permissão.
- A requisição de exclusão retorna 400.
- Prioridade: Medium.

---

## Outros achados (sem ticket)

- **Plural incorreto com 1 item:** "1 músicas cadastradas" (Biblioteca), "1 louvores" (Playlist), "1 cultos cadastrados" (Escalas). O Rafael já tratou o assunto no grupo; sem ticket por ora.
- **`fire-heart.png` com 404** ao carregar o app. Já existe o SCRUM-36.
- **Requisições `ministry_*` com falha** apareceram no Network numa captura. Verificar se se repete.
- **1 achado novo a documentar** (relatado no fim da sessão, ainda sem passo a passo).

## Bloqueios

- **Conta de membro de teste:** a senha guardada no `.env` não confere e o e-mail de redefinição não chegou. Possível causa (hipótese): limite de envio do SMTP padrão do Supabase, o mesmo do SCRUM-31. Vou pedir ao Eric ou ao Rafael uma senha nova direto no painel.
- Sem a conta de membro, os testes de permissão ficaram adiados.

## Fora do escopo hoje

- **SCRUM-9:** é feature, não passa por QA.
- **SCRUM-45:** decisão de deixar de fora por enquanto.

## Processo

- Tickets e comentários no Jira agora seguem o formato simples pedido pelo Rafael: descrição objetiva, sem detalhe técnico demais, comentários curtos.

## Próximos passos

1. Documentar o achado novo (passo a passo e print).
2. Recuperar a conta de membro e retomar os testes de permissão.
3. Postar a pergunta do SCRUM-41 pro Eric.
4. Retestar o SCRUM-23; conferir com o Rafael se o SCRUM-42 é do escopo de QA.
5. Completar os casos que faltaram no SCRUM-43 (101 caracteres, só espaços, outros formulários), se fizer sentido.
