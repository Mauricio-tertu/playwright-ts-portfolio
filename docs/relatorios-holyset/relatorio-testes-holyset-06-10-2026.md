# Relatório de Smoke Test: HolySet

**Data:** 06/10/2026
**Responsável:** Maurício Silva
**Ambiente:** holy-set.vercel.app (deploy feito pelo Rafael, do segredinho para o Vercel)
**Condições:** Chrome, viewport mobile 400x658, rede 4G lento, cache desativado, hard reload

## Resultado geral: FALHOU PARCIALMENTE

## O que passou
- Login
- Biblioteca
- Escalas
- Perfil

## O que falhou

1. **Início, "Solicitar entrada" (Alta):** o botão dá erro. A função `request_ministry_join` não existe no banco (erro 404).
2. **Início, erro de servidor (Alta):** pedido a `ministry_data` retorna erro 500. A app regista "Erro ao carregar dados globais" e "Erro ao carregar ministério".
3. **Dados de perfil, erro 406 (Média):** pedido a `profiles` retorna erro 406.
4. **Playlists (Alta):** a tela abre azul e vazia, sem conteúdo nem mensagem. Reproduz também dentro do ministério Louvor LGCY. Sem erro vermelho no Console.
5. **Avisos de PWA (Baixa):** ícone do manifest não carrega e a meta tag `apple-mobile-web-app-capable` está deprecated.

## Causa provável
Banco (Supabase) desalinhado com o deploy, confirmado pelo Rafael. Os itens 1, 2 e 3 estão ligados a isso. No item 4 a causa ainda não está confirmada.

## Observações
- Todos os erros se repetem após hard reload.
- Em Playlists, ainda não foi verificado se a tela faz algum pedido de dados.
- O Perfil passou, mesmo com o erro 406 visto antes. Pode ter sido pontual.

## Ações
- Problemas reportados ao Rafael pelo grupo do WhatsApp.
- Tickets no Jira: pendentes, por pedido do Rafael.
- Retestes de tickets antigos: adiados, porque o resultado não seria válido com o banco desalinhado.

## Próximo passo
Quando o Rafael confirmar a correção do banco: hard reload, repetir o smoke completo (incluindo "Solicitar entrada" e Playlists) e só depois os retestes.

## Evidências
Prints da mensagem de erro, da aba Rede (404), do Console (500 e 406) e da tela vazia de Playlists.
