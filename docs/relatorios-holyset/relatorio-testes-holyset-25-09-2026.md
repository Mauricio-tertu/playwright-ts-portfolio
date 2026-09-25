# Relatório de Reteste — HOLYSET · 25/09/2026

**Testador:** Maurício Tertuliano (QA)
**Ticket guarda-chuva:** SCRUM-39 — Verificar se os bugs em review ainda estão presentes
**Ambiente:** dev (`segredinho.memremodelacoes.pt`)
**Configuração:** Chrome DevTools · viewport mobile 405×689 · Conexão 4G lenta · Rede com filtro Fetch/XHR
**Duração:** ~10h15–12h10

---

## Resumo

| Métrica | Valor |
|---|---|
| Tickets retestados | 11 |
| Aprovados → Concluído | 9 |
| Reprovados → A fazer | 2 |
| Blocos concluídos | Playlists/Louvores + Cultos/Escalas |
| Tickets novos abertos | 1 (SCRUM-43) |

O cronograma previa estes dois blocos para sábado (26/09) e segunda (28/09). Os dois foram antecipados e concluídos hoje. Somado ao dia 24/09, o reteste de todos os tickets em review foi finalizado em 2 dias.

---

## Resultados por ticket

### Playlists e Louvores

| Ticket | Descrição | Resultado |
|---|---|---|
| SCRUM-17 | Campo de link do YouTube não valida formato | ✅ Concluído |
| SCRUM-18 | Link inválido vira rota interna quebrada | ✅ Concluído |
| SCRUM-19 | Data retroativa aceita na Playlist | ❌ A fazer |
| SCRUM-25 | Botões editar/excluir instáveis (Playlists) | ✅ Concluído |
| SCRUM-26 | Exclusão de louvor sem confirmação | ✅ Concluído |
| SCRUM-27 | Mesmo louvor adicionado várias vezes na playlist | ✅ Concluído |
| SCRUM-29 | Título/Artista aceitam espaços e números longos | ❌ A fazer |

### Cultos e Escalas

| Ticket | Descrição | Resultado |
|---|---|---|
| SCRUM-20 | Botão excluir aparece e some em Escalas | ✅ Concluído |
| SCRUM-21 | Salvar sem resposta ao criar Culto vazio | ✅ Concluído |
| SCRUM-22 | Data sem limite + nome numérico | ✅ Concluído (escopo separado*) |
| SCRUM-30 | Múltiplos Diretores Musicais no mesmo culto | ✅ Concluído |

\* A parte de data e de tamanho mínimo do nome foi corrigida. A validação de conteúdo do nome (nomes sem letras) foi separada no SCRUM-43, que cobre todos os formulários.

---

## Detalhes relevantes

**SCRUM-17/18 — Validação em duas camadas.** Link sem protocolo (`youtube.com`) é bloqueado por formato; URL válida de outro domínio é bloqueada com "Link da playlist deve ser um link do YouTube."; o link curto `youtu.be` é aceito e abre externamente. A correção ficou acima do que o ticket pedia.

**SCRUM-19 — Bug persiste.** Datas passadas (24/09/2026, 01/07/2021, 23/09/2026) continuam sendo aceitas e gravadas. Na Rede, o save aparece como `ministry_data?on_conflict=...` (upsert, status 200).

**SCRUM-29 — Corrigido parcialmente.** O caso "só espaços" agora é bloqueado. Continuam aceitos: números longos, números com vírgulas e "+", e nomes só com símbolos (`''`, `..`, `--`).

**SCRUM-27 — Contexto do dev.** Segundo o Erick, a validação de duplicidade vale para playlists novas. Em playlist nova, a duplicata é bloqueada ("Este louvor já está na playlist."), inclusive com variação de maiúsculas. Não havia playlists antigas no dev para testar o caso de adição nova em playlist anterior ao fix.

**SCRUM-30 — Boa solução de UX.** Com DM já definido, a opção aparece como "Já definido: @usuario" e fica desabilitada para os demais.

**SCRUM-22 — Validação atual do nome do Culto.** Nome com 1 caractere é bloqueado ("O nome deve ter pelo menos 2 caracteres."), mas nomes com 2+ caracteres sem letras (`@@`, `--`, `''`, `13215498744654654874`) são aceitos. A regra valida o tamanho, não o conteúdo.

---

## Padrão identificado

Verificação feita no fim da sessão: **todos os campos de nome do app já usam a mesma regra de mínimo de 2 caracteres.** A regra é consistente, mas valida só o **tamanho**, não o **conteúdo**. Qualquer valor com 2+ caracteres passa, mesmo sem nenhuma letra (`@@`, `--`, `''`, números longos).

| Validação | Situação atual |
|---|---|
| Vazio / só espaços | ✅ Bloqueado |
| Mínimo de 2 caracteres | ✅ Bloqueado |
| Exige pelo menos 1 letra | ❌ Não existe |
| Limita símbolos permitidos | ❌ Não existe |
| Tamanho máximo | ❌ Não existe |

Para resolver de uma vez, foi aberto o **SCRUM-43 — Padronizar validação de campos de nome em todos os formulários**, com regra proposta (mín. 2 caracteres + pelo menos 1 letra + lista de caracteres permitidos + máx. 100), critério de aceite com exemplos que devem ser bloqueados e aceitos, e recomendação de aplicar a mesma regra no Supabase, já que validação só no front pode ser contornada via API.

---

## Observações (sem ticket — para a próxima sessão)

1. **Plural errado:** "1 músicas cadastradas", "1 louvores".
2. **Ícone do app com 404:** o manifest aponta para `img.icons8.com/.../fire-heart.png`, que não existe mais. Pode afetar o ícone quando o app for instalado na tela inicial. O Console também avisa sobre a meta tag `mobile-web-app-capable` ausente.
3. **Mesmo membro escalado duas vezes:** é possível escalar a mesma pessoa em funções diferentes no mesmo culto. Pode ser regra de negócio — pergunta para o Rafael.
4. **Modelo de dados `ministry_data`:** os saves são feitos por upsert em um registro do ministério. Pergunta para o Rafael: há risco de uma edição sobrescrever outra se duas pessoas salvarem ao mesmo tempo?
5. **Ambiente de teste:** SCRUM-2 (VPS) e SCRUM-3 (novo domínio) foram fechados em 25/09. Confirmar se a URL de teste muda.

---

## Aprendizado técnico do dia

- Uso da aba **Rede** do DevTools em português: filtros Fetch/XHR, opção **Manter registro** (para não perder requests ao navegar) e leitura de Método/Status.
- Um upsert no Supabase retorna **200**, e não 201. Status diferente do esperado nem sempre indica erro; é preciso entender a operação.
- A busca da Rede não é confiável para procurar dentro do Payload enviado. Para isso, o caminho é abrir a request e olhar a aba Payload.
- Teste de borda em validações de texto: maiúsculas, espaços nas pontas, 1 caractere, só símbolos e números longos.
- Reaproveitar dados de teste: a limpeza de louvores e cultos criados no teste serviu como o próprio reteste dos tickets de exclusão (SCRUM-26 e SCRUM-20).

---

## Situação do quadro após a sessão

- **Com os devs:** SCRUM-23 (Perfil — em ajuste), SCRUM-31 (Auth — Em Progresso)
- **A fazer (reprovados hoje):** SCRUM-19, SCRUM-29 (coberto pelo SCRUM-43)
- **Novo:** SCRUM-43 (validação padronizada de nomes)
- **Não corrigidos ainda:** SCRUM-33, 34, 35, 36, 38

## Próximos passos (28/09)

1. Referenciar o **SCRUM-43** nos comentários do SCRUM-22 e do SCRUM-29.
2. Decidir com o Rafael se o SCRUM-29 é fechado como coberto pelo SCRUM-43.
3. Avaliar as observações 1–5 e abrir no máximo 2 tickets novos.
4. Mover o SCRUM-39 para Concluído com o placar consolidado de 24–25/09.
