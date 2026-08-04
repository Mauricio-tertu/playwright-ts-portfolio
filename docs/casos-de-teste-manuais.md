ID: TC001
Título: Login com credenciais válidas deve autenticar o usuário com sucesso
Pré-condição: Usuário está na página de login, sem estar autenticado
Passos:
1. Acessar a página de login
2. Preencher o campo de usuário com "student"
3. Preencher o campo de senha com "Password123"
4. Clicar no botão "Submit"
Resultado Esperado: Sistema exibe a mensagem "Logged In Successfully" e redireciona para a página de sucesso


ID: TC002
Título: Login com credenciais inválidas deve exibir mensagem de erro
Pré-condição: Usuário está na página de login, sem estar autenticado
Passos:
1. Acessar a página de login
2. Preencher o campo de usuário com "student"
3. Preencher o campo de senha com "SenhaErrada123"
4. Clicar no botão "Submit"
Resultado Esperado: Sistema exibe a mensagem "Your password is invalid!"