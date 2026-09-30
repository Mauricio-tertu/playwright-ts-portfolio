# Relatório de testes HOLYSET — 30/09/2026

**Ambiente:** dev (`segredinho.memremodelacoes.pt`)
**Dispositivo:** mobile (Chrome DevTools), conexão "4G lenta"
**Contas:** admin + 3 contas de membro novas (`+teste1` a `+teste3`)
**Escopo:** reteste dos tickets em In Review

---

## Resumo

| Ticket | Assunto | Resultado |
|---|---|---|
| SCRUM-8 | Retirar notificações da biblioteca de louvores | Passou (conta admin) |
| SCRUM-23 | Campos da página "Meu perfil" | Passou |
| SCRUM-41 | Tela de preferência igual ao "Editar funções" | Fora do escopo (feature) |
| SCRUM-42 | Múltipla seleção de membros no convite | Fora do escopo (feature) |
| SCRUM-9 | Novo nível de autenticação (escolha de ministérios) | Parcial, com bug encontrado (SCRUM-47) |

---

## Detalhes

### SCRUM-8 — Retirar notificações da biblioteca de louvores
- **Resultado:** passou.
- O sininho de notificações não aparece mais na Biblioteca de louvores.
- **Não testado:** conta de membro (na hora do teste a conta antiga estava sem acesso).

### SCRUM-23 — Funcionalidades nos campos do "Meu perfil"
- **Resultado:** passou.
- O celular português (+351) é aceito e exibido corretamente em Meu perfil. Isso resolvia a observação levantada no reteste de 24/09.
- Nome, celular e data de nascimento funcionando na tela de Meu perfil.
- **Relação com SCRUM-40** (celular +351 rejeitado): o caso original deve ser reproduzido para decidir o fechamento.

### SCRUM-41 e SCRUM-42 — Fora do escopo
- **SCRUM-41:** não existe tela "Editar funções" na aba de escala para servir de referência. Trata-se de nova funcionalidade, não de correção.
- **SCRUM-42:** o pedido é uma capacidade nova (convite em lote), não a correção de algo existente.
- Ambos movidos para o local de features.

### SCRUM-9 — Escolha de ministérios no primeiro login
Ticket tagueado como feature, mas o desenvolvedor pediu verificação em 24/09. Testado com uma conta nova (`+teste1`) e o admin em paralelo.

**Funcionou:**
- Primeiro login mostra a tela "Bem-vindo ao HolySet" com a lista "Ministérios disponíveis".
- É possível solicitar entrada em mais de um ministério.
- O admin recebe o pedido em **Equipe → Pedidos de entrada**, com as opções Recusar e Aceitar.
- Após aceitar, o membro passou a ter acesso ao ministério liberado.

**Bug encontrado:**
- **SCRUM-47:** quando o admin recusa o pedido, o ministério continua como "Pedido enviado" para o membro (esperado: voltar a "Solicitar entrada" ou mostrar como recusado).

**Observações:**
- O admin só vê o pedido ao abrir a tela Equipe. Não há aviso na home nem contador no sininho. A visualização não apareceu de imediato após F5; apareceu depois.
- Na conta nova, dois ministérios já apareciam como "Pedido enviado" sem clique. Ao testar em outro navegador, o mesmo usuário via "Solicitar entrada". Causa não identificada (pode ser estado local do navegador ou pedidos de testes anteriores).

**Não verificado:**
- Se o membro **não** enxerga dados (Biblioteca, Escalas, Playlists) dos ministérios não liberados.
- Como o membro aparece após ter um ministério aceito (divisão "Seus ministérios").

**Status:** mantido em In Review, aguardando retorno do desenvolvedor.

---

## Infraestrutura de teste

- Os e-mails de confirmação de cadastro e de redefinição de senha **são enviados**, mas não chegam à caixa de entrada das contas de teste. Ficam na pasta Enviados do remetente. As contas novas foram confirmadas a partir desses e-mails.
- 3 contas de membro novas criadas (`+teste1` a `+teste3`) para testes de permissão.

---

## Pendências

1. **SCRUM-9:** postar o comentário com os resultados, manter em In Review e verificar o isolamento de dados entre ministérios.
2. **SCRUM-47:** atribuir ao desenvolvedor e acompanhar.
3. **SCRUM-40:** reproduzir o caso do celular +351 e fechar ou comentar.
4. **Conta de membro em SCRUM-8:** validar a ausência do sininho com um membro.
