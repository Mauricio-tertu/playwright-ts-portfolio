# Relatório de testes HOLYSET, 21/09/2026

**Ambiente:** HolySet dev (segredinho.memremodelacoes.pt)
**Viewport:** mobile (Chrome DevTools, Device Toolbar, ~407x689)
**Rede:** 4G lenta na maior parte da sessão (em alguns momentos ficou em 4G rápida)
**Foco da sessão:** testes de API (Supabase) e teste exploratório no mobile

---

## 1. Testes de API (SCRUM-32)

**Arquivo:** `tests/holyset-supabase.spec.ts` (3 testes)

### O que aconteceu
- Os 3 testes falharam de início com `getaddrinfo ENOTFOUND`: a requisição nem chegava ao servidor.
- **Causa:** erro de digitação na `SUPABASE_URL` do `.env` (um "i" no lugar de um "l" no endereço do projeto dev). Confirmado com o endereço que o próprio app dev usa nas requisições (aba Rede).
- **Correção:** URL copiada direto da aba Rede e ajustada para conter apenas o domínio base.

### Resultado depois da correção
| Teste | Resultado |
|---|---|
| GET sem apikey deve retornar 401 (RLS) | Passou |
| GET com apikey válida deve retornar 200 e uma lista | Falhou: recebeu 401 |
| Admin autenticado não consegue editar o próprio nome (403), regressão SCRUM-15 | Falhou (causa ainda não inspecionada) |

### Ainda não confirmado
- Por que o servidor devolve 401 com a apikey do `.env`. A hipótese de chave de produção no lugar da de dev foi descartada como causa provável: a chave visível no app dev parece a mesma, mas a comparação foi feita por foto e não é conclusiva.
- Próximo passo definido: imprimir `response.status()` e `await response.text()` antes do `expect` para ler a mensagem que o servidor devolve.

### Pendências
- Local da pasta `holyset-api-tests`: não é um repositório git (`git pull` falhou). Verificar em qual repositório os testes devem ser commitados.
- SCRUM-32 continua **Em Progresso**.

---

## 2. Teste exploratório (mobile)

### Bugs abertos nesta sessão
| Ticket | Módulo | Resumo |
|---|---|---|
| SCRUM-33 | Trocas de Escala | Data do card com formato quebrado (`21T09:51:37.068Z/09/2026`) |
| SCRUM-34 | Trocas de Escala | Permite escolher cultos que já passaram (escala atual e data desejada). A confirmar regra de negócio com o Rafael |
| SCRUM-35 | Início | Card de ministério aparece sem nome em "Meus ministérios" (mesmo após recarregar e esperar). Causa ainda não confirmada |
| SCRUM-36 | Geral | `fire-heart.png` retorna 404 (2 requisições). Prioridade baixa, sem efeito visível até agora |

### Observações (sem ticket)
- **Ministérios:** a aba ainda não tem função de criar nem excluir. Tratado como funcionalidade não implementada, não como bug.
- **Dados de teste antigos** nas listas de cultos (nome só numérico, ano 2119, nomes vazios ou de um caractere): já cobertos pelos SCRUM-21, SCRUM-22 e SCRUM-29.
- **Campo de nome com `<script>alert(1)</script>`:** aparece como texto no dropdown de cultos e não executa. Bom sinal para esse campo (não é uma varredura de segurança completa).
- **Chamadas de rede:** todas as requisições ao Supabase inspecionadas na sessão voltaram com 200, exceto os 404 do `fire-heart.png`.

---

## 3. Pendências para a próxima sessão
1. Retomar os testes de API: diagnosticar o 401 com o log da resposta do servidor.
2. Confirmar quantos pedidos de troca foram criados na sessão (a lista mostrou 2 cards com ~40 segundos de diferença). Se foi só 1, abrir ticket de duplicação.
3. Abrir a aba **Resposta** da chamada `ministries?select=*&id=in...` para fechar a causa do SCRUM-35.
4. Perguntar ao Rafael se cultos passados devem aparecer na troca de escala (SCRUM-34).
5. Voltar a rede para **4G lenta** no início do exploratório (diretriz do Rafael).
6. Definir onde a pasta `holyset-api-tests` deve ser versionada.
