# Relatório de Testes Exploratórios — HolySet

**Projeto:** HolySet — plataforma de gestão de ministérios (escalas, cultos, repertório musical)
**Papel:** Consultor de QA (projeto colaborativo), em conjunto com engenheiro sénior da Deloitte Portugal
**Tipo de teste:** Exploratory Testing (teste exploratório manual)
**Data:** 01/09/2026
**Ambiente:** Produção (holy-set.vercel.app)

---

## Objetivo

Realizar uma rodada de testes exploratórios em toda a aplicação, navegando sistematicamente por cada módulo em busca de bugs, inconsistências visuais e falhas de validação, documentando os achados para a equipa de desenvolvimento.

---

## Escopo testado

| Módulo | Resultado |
|---|---|
| Login | ✅ Sem achados |
| Tela inicial / Ver Ministérios | 🐛 Bug encontrado |
| Biblioteca (busca, filtros, personalização) | 🐛 2 bugs encontrados |
| Playlists | ✅ Sem achados |
| Escala Geral / Detalhes do Culto | ✅ Sem achados |
| Trocas de Escala | ✅ Sem achados |
| Equipe | ✅ Sem achados |
| Cadastro / Logout | 🐛 Bug crítico encontrado |

---

## Bugs identificados

### 1. Inconsistência de tema visual (claro/escuro)
**Severidade:** Média
**Descrição:** A primeira carga da tela inicial exibe tema claro; ao navegar ou recarregar, a mesma tela passa a exibir tema escuro, sem ação do usuário.
**Reprodutibilidade:** Confirmada em 2 tentativas independentes.

### 2. Filtro de categoria retorna resultados incorretos
**Severidade:** Média
**Descrição:** Com 18 músicas cadastradas na Biblioteca, o filtro "Adoração" retorna apenas 2 resultados, e o filtro "Celebração" retorna 0 — mesmo havendo músicas cadastradas no total.
**Suspeita:** Ausência de categoria atribuída na maioria dos registros, ou falha na lógica de filtragem.

### 3. Contraste de texto inválido no campo "+ Personalizar"
**Severidade:** Média (acessibilidade/UX)
**Descrição:** Ao criar uma categoria personalizada na Biblioteca, o campo de texto exibe fundo claro com texto igualmente claro, tornando o conteúdo digitado ilegível.

### 4. [Crítico] Sistema permite cadastro duplicado com e-mail já existente
**Severidade:** Alta
**Descrição:** A tela de cadastro permite criar uma nova conta usando um e-mail já registrado no sistema, sem qualquer validação ou aviso. O fluxo foi reproduzido duas vezes com sucesso (contas diferentes, mesmo e-mail).
**Achados adicionais:**
- E-mail de confirmação mencionado na tela de sucesso não foi recebido (inbox e spam verificados).
- Botão "Voltar para Login" na tela de confirmação não navega corretamente — retorna à tela de cadastro com os campos anteriores ainda preenchidos.
**Risco:** Possível geração de contas duplicadas para o mesmo e-mail, com risco de conflito de dados de autenticação.
**Ação:** Ticket próprio criado no Jira com prioridade **Highest**, separado da exploração geral, dado o impacto na integridade do sistema.

---

## Metodologia aplicada

- Testes conduzidos como **usuário real do domínio** (pastor/administrador de ministério), permitindo identificar não só falhas técnicas, mas também inconsistências de fluxo do ponto de vista do usuário final.
- Cada achado foi documentado com: página, descrição do problema, passos para reprodução, resultado esperado vs. obtido.
- Bugs foram confirmados por reprodução antes de serem formalizados — casos ambíguos (ex.: campos preenchidos manualmente, eventos de teste legítimos) foram descartados após verificação, evitando ruído no relatório de bugs.
- Bug crítico foi isolado em ticket próprio com prioridade elevada, separado da tarefa de exploração geral, para garantir visibilidade adequada à equipa de desenvolvimento.

---

## Aprendizados aplicados

Esta sessão reforçou a importância de:
- Testar não apenas o "caminho feliz", mas também casos de borda (usuário sem dados, e-mail duplicado, navegação de retorno).
- Confirmar reprodutibilidade antes de reportar — um achado isolado tem menos peso do que um bug confirmado em múltiplas tentativas.
- Priorizar achados por impacto real: um bug de UX (contraste de texto) e um bug de integridade de dados (cadastro duplicado) não têm o mesmo peso, e a documentação deve refletir isso.
