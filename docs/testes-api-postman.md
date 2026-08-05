# Testes de API — Postman

Documentação dos testes manuais de API realizados via Postman, complementando os testes automatizados em Playwright.

---

## TC003: Validar listagem de recursos via GET

**Endpoint:** GET https://jsonplaceholder.typicode.com/users

**Passos:**
1. Enviar requisição GET para o endpoint
2. Validar status code da resposta
3. Validar estrutura dos dados retornados

**Resultado Esperado:** Status 200 OK, retorno de lista de usuários em formato JSON com campos id, name, username, email, address, phone, website e company.

**Resultado Obtido:** Status 200 OK. Lista retornada corretamente com todos os campos esperados.

**Status:** ✅ Passou

---

## TC004: Validar criação de recurso via POST

**Endpoint:** POST https://jsonplaceholder.typicode.com/users

**Payload:**
```json
{
  "name": "Mauricio Silva",
  "email": "mauricio@teste.com"
}
```

**Passos:**
1. Enviar requisição POST com payload acima
2. Validar status code da resposta
3. Validar se os dados enviados retornam na resposta

**Resultado Esperado:** Status 201 Created, retorno dos dados enviados mais um `id` gerado automaticamente pelo sistema.

**Resultado Obtido:** Status 201 Created. Dados retornados corretamente, incluindo `id: 11` gerado pela API.

**Observação:** API de demonstração (jsonplaceholder) — não persiste dados reais. Confirmado ao repetir o GET: o registro criado não aparece na listagem.

**Status:** ✅ Passou (comportamento esperado para API de demonstração)

---

## TC005: Validar persistência de dado após criação via POST

**Endpoint:** POST https://api.restful-api.dev/objects (criação) + GET /objects/{id} (validação)

**Payload:**
```json
{
  "name": "Notebook QA Teste",
  "data": {
    "cor": "prata",
    "preco": 1200
  }
}
```

**Passos:**
1. Enviar requisição POST para criar o recurso
2. Capturar o `id` retornado na resposta
3. Enviar requisição GET para `/objects/{id}` usando o id capturado
4. Validar se os dados retornados no GET são idênticos aos enviados no POST

**Resultado Esperado:** Status 200/201 na criação; GET subsequente retorna os mesmos dados criados, confirmando persistência.

**Resultado Obtido:**
- POST retornou status 200 OK (não 201, como seria o padrão REST) com `id` gerado: `ff80b1819f7e10ae019fd16b2f3e77af`
- GET subsequente com esse id retornou **404 Not Found**: `"Object with id=... was not found."`

**Status:** ❌ Falhou

**Análise:** A API respondeu com sucesso na criação (200 OK, id gerado, dados ecoados de volta), mas o recurso não estava disponível numa consulta posterior. Isso indica que resposta de sucesso na escrita **não garante persistência real** do dado — uma inconsistência que só é detectável testando o ciclo completo (criar → depois buscar), não apenas validando a resposta isolada do POST.

**Lição aplicada:** Todo teste de criação via API deveria ser complementado por uma validação de leitura subsequente antes de ser considerado completo.