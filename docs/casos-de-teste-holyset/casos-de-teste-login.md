# Casos de teste: Login (HOLYSET)

**Responsável:** Maurício Tertuliano Santos Silva
**Ambiente:** Dev (URL omitida)
**Dispositivo:** Chrome DevTools, viewport mobile 400x658
**Data de execução:** 08/10/2026
**Tipo:** Teste manual funcional

## Resumo

| ID | Título | Status | Data |
|---|---|---|---|
| TC-LOGIN-02 | Login com senha incorreta exibe mensagem de erro | Passou | 08/10/2026 |
| TC-LOGIN-03 | Login com campos vazios exibe mensagens de campo obrigatório | Passou | 08/10/2026 |

**Próximos casos planejados:** TC-LOGIN-01 (login válido), TC-LOGIN-04 (apenas e-mail preenchido), TC-LOGIN-05 (apenas senha preenchida).

---

## TC-LOGIN-02: Login com senha incorreta exibe mensagem de erro

**Pré-condição:** usuário de teste cadastrado na dev; sem sessão iniciada.

**Passos:**
1. Abrir a tela de login (400x658).
2. Digitar o e-mail do usuário de teste.
3. Digitar uma senha incorreta (ex.: `senha-errada-123`).
4. Tocar em "Entrar".

**Resultado esperado:** aparece "E-mail ou senha incorretos." e o usuário permanece na tela de login.

**Resultado obtido:** a mensagem aparece em destaque acima do botão "Entrar" e o usuário permanece na tela de login.

**Status:** Passou

**Observação:** a mensagem é genérica e não revela qual campo está errado, o que é uma boa prática de segurança. No console aparece um erro 400 (Bad Request) da requisição de autenticação, provavelmente o comportamento normal para credenciais inválidas.

---

## TC-LOGIN-03: Login com campos vazios exibe mensagens de campo obrigatório

**Pré-condição:** tela de login aberta, sem sessão iniciada.

**Passos:**
1. Abrir a tela de login (400x658).
2. Deixar os campos e-mail e senha em branco.
3. Tocar em "Entrar".

**Resultado esperado:** aparece uma mensagem para cada campo pedindo o preenchimento, os campos ficam destacados em vermelho e o usuário permanece na tela de login.

**Resultado obtido:** aparecem "Informe seu e-mail" e "Informe a sua senha", os campos ficam em vermelho e o usuário permanece na tela de login.

**Status:** Passou

**Observação:** o destaque em vermelho indica o que falta preencher. A confirmar: os textos das duas mensagens usam construções diferentes ("seu" / "a sua").
