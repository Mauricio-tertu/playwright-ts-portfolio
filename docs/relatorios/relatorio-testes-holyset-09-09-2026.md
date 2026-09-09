# Relatório de Sessão de Testes — HOLYSET

**Data:** 09/09/2026
**QA Responsável:** Maurício Tertuliano Santos Silva
**Ambiente testado:** `segredinho.memremodelacoes.pt` (dev)
**Viewport:** Mobile — 338x689 (Chrome DevTools Device Toolbar), conforme diretriz de priorização mobile definida pelo tech lead
**Duração:** ~16:30 – 18:45 (aprox. 2h15)
**Tipo de sessão:** Testes exploratórios dirigidos + testes de validação de formulário (boundary/negative testing)

---

## Resumo Executivo

Sessão de testes exploratórios cobrindo três módulos do HOLYSET (Playlists, Cultos, Escalas), com foco em validação de formulários e regras de negócio. Foram identificados **4 bugs reais**, documentados em JIRA com evidência (prints), passos de reprodução e critério de severidade. Além dos bugs, foi conduzido um teste de segurança básico (XSS) com resultado positivo, e uma inconsistência de regra de negócio foi identificada e corretamente escalada como pergunta ao Product Owner em vez de reportada como bug sem confirmação.

O achado central da sessão foi um **padrão sistêmico de validação ausente** nos formulários de Culto e Playlist — não um bug isolado, mas uma característica recorrente do sistema, identificada através de testes progressivos (do caso simples ao caso extremo).

---

## Cobertura de Testes

| Área | Status | Observação |
|---|---|---|
| Navegação (nav bar) | ✅ Coberto | Sem erros de navegação |
| Playlists — Criar/Editar/Excluir | ✅ PASS | CRUD completo funcional |
| Cultos — Criar/Editar/Excluir | ✅ PASS | CRUD completo funcional |
| Escalas — CRUD | ✅ PASS | Testado em sessão anterior |
| Validação de formulário (Culto/Playlist) | ⚠️ Falhas encontradas | Ver bugs abaixo |
| Segurança — XSS básico | ✅ PASS | Sanitização de input funcionando |
| Ministérios | 🚫 Bloqueado | Feature ainda não implantada no ambiente dev |
| Regra de negócio — limite de cultos/domingo | ❓ Pendente | Escalado ao PO, não confirmado como bug |

---

## Bugs Identificados

### 🐞 SCRUM-19 — Data retroativa aceita sem validação (Playlist e Culto)
**Severidade:** Médio
**Causa raiz:** validação de data ausente, compartilhada entre os dois formulários

Testado progressivamente:
- Playlist com data de 09/02/2023 (quase 2 anos retroativa) → aceito sem aviso
- Culto com data retroativa → mesmo comportamento confirmado
- Conclusão registrada em comentário: falha está na regra (ou ausência dela), provavelmente compartilhada entre os componentes de Playlist e Culto — recomendação de correção na raiz.

### 🐞 SCRUM-20 — Botão de excluir aparece de forma intermitente (Escalas)
**Severidade:** Médio
**Reprodutibilidade:** Confirmada 2x antes de reportar

Botão de exclusão surge no card do culto sem ação clara do usuário e desaparece ao clicar em qualquer ponto da tela — comportamento de UI inconsistente, risco de clique acidental.

### 🐞 SCRUM-21 — Validação de nome do Culto ausente ou incompleta
**Severidade:** Alto
**Evolução do teste (boundary testing progressivo):**

| Input testado | Resultado |
|---|---|
| Nome e data 100% vazios | Formulário trava sem feedback (nem salva, nem avisa erro) |
| Nome = "a" (1 caractere) | Aceito sem restrição |
| Nome = " " (espaço em branco) | Aceito — cria card sem nome visível |

Padrão identificado: o sistema não tem `trim()` nem validação de conteúdo mínimo — só "trava" (sem feedback ao usuário) quando o campo está completamente vazio, o que é o pior cenário possível de UX para erro de formulário.

### 🐞 SCRUM-22 — Ausência de range de data e validação de formato de nome (caso extremo)
**Severidade:** Alto

Teste de limite extremo, combinando dois vetores no mesmo caso:
- Data: 20/03/2119 (~93 anos no futuro) → aceito e ordenado corretamente na listagem
- Nome: string numérica longa sem sentido semântico → aceito sem validação de tipo/formato

Este teste consolidou a evidência de que a falha de validação identificada em SCRUM-19 e SCRUM-21 é sistêmica no formulário de Culto, não um caso isolado.

---

## Teste de Segurança

**XSS básico (`<script>alert(1)</script>`) no campo nome do Culto — PASS**

Testado tanto na listagem quanto na tela de detalhe do culto. O conteúdo foi renderizado como texto literal em ambas as telas, sem execução do script. Resultado positivo: apesar da fragilidade nas validações de negócio, a camada de sanitização de output está funcionando corretamente.

---

## Questão de Regra de Negócio (escalada, não reportada como bug)

Durante os testes, o número de cultos cadastrados no mesmo domingo chegou a 4 — historicamente o padrão observado era de no máximo 2 cultos por domingo. Como essa regra não está confirmada com o Product Owner, a questão foi formulada para esclarecimento em vez de aberta como ticket, evitando reportar como defeito algo que pode ser apenas ausência de regra (não necessariamente incorreta).

---

## Metodologia Aplicada

- **Boundary testing progressivo**: cada bug foi investigado incrementalmente (vazio → mínimo → extremo), maximizando a evidência coletada por ticket em vez de reportar o primeiro sintoma isoladamente.
- **Confirmação antes de reportar**: bugs de comportamento intermitente (SCRUM-20) só foram documentados após reprodução em múltiplas tentativas.
- **Separação bug vs. dúvida de negócio**: questões sem regra confirmada foram tratadas como perguntas ao PO, não como defeitos — preservando a credibilidade dos relatórios de bug.
- **Causa raiz sobre sintoma**: os bugs de validação foram agrupados por causa raiz comum (ausência de validação nos formulários), não documentados como itens desconexos.

---

## Evidências

Todos os bugs foram documentados no JIRA (projeto SCRUM) com:
- Ambiente e viewport exatos
- Passos de reprodução numerados
- Resultado obtido vs. resultado esperado
- Prints de evidência anexados
- Comentários de acompanhamento quando novos casos reforçaram o mesmo ticket

---

*Relatório gerado como parte do processo de QA do projeto HOLYSET (holy-set.vercel.app), aplicação real em produção utilizada por igrejas para gestão de cultos, escalas e repertório musical.*
