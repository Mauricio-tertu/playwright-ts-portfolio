# Casos de Teste — Gherkin

## Funcionalidade: Login

### Cenário: Login com credenciais válidas
```gherkin
Dado que estou na página de login
Quando preencho usuário e senha válidos
E clico no botão de login
Então devo ver a mensagem "Logged In Successfully"
```
### Cenário : Senha errada
```gherkin
Dado que estou na página de login
Quando preencho usuário  válidos senha inválido
E clico no botão de login
Então devo ver a mensagem "Your password is invalid!"
```

###  Cenário : Sem preencher credenciais
```gherkin
Dado que estou na página de login
Quando deixo os campos de usuarios e senhas vazios .
E clico no botão de login
Então devo ver a mensagem "Your username is invalid!"
```