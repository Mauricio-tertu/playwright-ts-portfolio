# Relatório de Sessão de Testes — HOLYSET

**Data:** 08/09/2026
**QA:** Maurício
**Ambiente:** segredinho.memremodelacoes.pt (ambiente de dev/teste HTTPS)
**Ferramentas:** Chrome DevTools (Console + Network), Device Toolbar (mobile, 400x689 — conforme diretriz do Rafael de priorizar ~90% dos testes em mobile)
**Duração:** ~16:30 às 18:15

---

## Contexto

Sessão de testes exploratórios em preparação para a feature futura de multi-admin e autorização de acesso de membros, anunciada por Rafael. Como a feature ainda não foi implementada, o foco foi mapear o comportamento atual do sistema (baseline), com ênfase na tela "Equipe do Ministério" — área que provavelmente vai sustentar a nova funcionalidade.

---

## Bugs Encontrados

| Ticket | Título | Área | Severidade |
|---|---|---|---|
| SCRUM-14 | Botão "Salvar" não responde ao editar nome com campo vazio | Equipe | Média |
| SCRUM-15 | Nem admin consegue salvar o próprio nome (erro 403 - permission denied) | Equipe | **Alta** |
| SCRUM-16 | Admin não consegue remover membro — erro 403 de permissão | Equipe | **Alta** |
| (sem número no print) | Convite de membro entra ativo sem confirmação | Equipe | **Alta** |
| SCRUM-17 | Campo de link do YouTube não valida o formato | Playlists | Baixa |
| SCRUM-18 | Link inválido do YouTube não abre externo — vira rota interna quebrada | Playlists | Média |

---

## Diagnóstico Técnico (Causa Raiz)

A investigação revelou um padrão claro, não bugs isolados:

**A camada de UI do HOLYSET está bem construída:**
- Confirmações aparecem antes de ações destrutivas (ex: "Deseja realmente remover?")
- Validação client-side funciona corretamente (e-mail inválido é bloqueado com mensagem clara)
- Mensagens de erro são exibidas quando a API retorna erro

**O problema real está na camada de permissão do banco (RLS do Supabase):**
- Toda operação de escrita na tabela de usuários/membros (`editar nome`, `remover membro`) retorna **403 Forbidden**, mesmo para usuário Administrador
- A criação de convite de membro, por outro lado, passa **sem nenhuma checagem** — usuários "fantasma" (que nunca confirmaram e-mail) entram como membros ativos e aparecem em dropdowns de seleção em outras áreas do sistema (confirmado: apareceram como opção válida na tela de Escalas)

**Validação cruzada — testado em outras tabelas para confirmar escopo do problema:**
- Tabela de **Escalas**: CRUD completo testado (criar culto, escalar integrante, remover integrante) — **funcionando perfeitamente**, sem nenhum erro de permissão
- Tabela de **Playlists**: CRUD completo testado (criar playlist, adicionar faixa, editar faixa, reordenar) — **funcionando perfeitamente**

**Conclusão:** o problema de permissão é **isolado à tabela de usuários/membros**, não é sistêmico. Isso simplifica a correção — é uma policy de RLS específica a ser revisada, não uma auditoria geral do banco.

---

## Recomendação para Rafael

Priorizar a revisão da policy de RLS da tabela de usuários/membros **antes** de iniciar o desenvolvimento da feature de autorização de admin — ela vai herdar diretamente esse problema se não for corrigida primeiro.

---

## Próximos Passos

- Validar os 6 tickets com Rafael
- Aguardar deploy das tarefas do backlog (case sem ministérios, sininho de notificações, autorização de acesso, remoção de usuários)
- Retomar testes conforme cada parte da feature nova subir, seguindo o cronograma de testes já documentado
