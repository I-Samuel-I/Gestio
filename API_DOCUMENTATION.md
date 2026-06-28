# 📚 Documentação das APIs - Gestio

## 🔐 Autenticação
Todas as APIs (exceto `/auth`) requerem JWT Token no header:
```
Authorization: Bearer {token}
```

---

## 1️⃣ **AUTH** - Autenticação

### 1.1 Registrar Novo Usuário
```
POST /auth/register
```
**Autenticação:** Não requer  
**Papel:** Nenhum

**Request Body:**
```json
{
  "name": "string (min: 3 chars)",
  "email": "string (valid email)",
  "password": "string (min: 4 chars)",
  "phone": "string (optional, min: 11 chars)",
  "company": "string (min: 4 chars)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "role": "USER|SELLER|SUPERVISOR|MANAGER|FINANCIAL"
}
```

---

### 1.2 Login
```
POST /auth/login
```
**Autenticação:** Não requer  
**Papel:** Nenhum

**Request Body:**
```json
{
  "email": "string (valid email)",
  "password": "string (min: 4 chars)"
}
```

**Response:**
```json
{
  "access_token": "jwt_token_string",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "phone": "string",
    "company": "string",
    "role": "string"
  }
}
```

---

### 1.3 Obter Dados do Usuário Autenticado
```
GET /auth/me
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "role": "string"
}
```

---

## 2️⃣ **USERS** - Gerenciamento de Usuários

### 2.1 Listar Usuários
```
GET /users
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Query Parameters:**
- `search` (opcional): string para buscar por nome

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "phone": "string",
    "company": "string",
    "role": "string"
  }
]
```

---

### 2.2 Obter Usuário por ID
```
GET /users/:id
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Path Parameters:**
- `id`: uuid do usuário

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "role": "string"
}
```

---

### 2.3 Obter Perfil do Usuário Autenticado
```
GET /users/me
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "role": "string"
}
```

---

### 2.4 Criar Novo Usuário
```
POST /users
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER

**Request Body:**
```json
{
  "name": "string (min: 3 chars)",
  "email": "string (valid email)",
  "password": "string (min: 4 chars)",
  "phone": "string (optional, min: 11 chars)",
  "company": "string (min: 4 chars)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "role": "string"
}
```

---

### 2.5 Atualizar Usuário
```
PATCH /users/:id
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER

**Path Parameters:**
- `id`: uuid do usuário

**Request Body:** (todos os campos são opcionais)
```json
{
  "name": "string (min: 3 chars)",
  "email": "string (valid email)",
  "password": "string (min: 4 chars)",
  "phone": "string (min: 11 chars)",
  "company": "string (min: 4 chars)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "role": "string"
}
```

---

### 2.6 Desativar Usuário
```
DELETE /users/:id
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER

**Path Parameters:**
- `id`: uuid do usuário

**Response:**
```json
{
  "message": "Usuário desativado com sucesso"
}
```

---

## 3️⃣ **PRODUCTS** - Gerenciamento de Produtos

### 3.1 Listar Produtos
```
GET /products
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Query Parameters:**
- `search` (opcional): string para buscar por nome

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "price": "number",
    "stock": "number",
    "available": "boolean",
    "category": "ELECTRONICS|CLOTHING|FOOD|SERVICES|OTHER"
  }
]
```

---

### 3.2 Obter Produto por ID
```
GET /products/:id
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Path Parameters:**
- `id`: uuid do produto

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "price": "number",
  "stock": "number",
  "available": "boolean",
  "category": "ELECTRONICS|CLOTHING|FOOD|SERVICES|OTHER"
}
```

---

### 3.3 Criar Produto
```
POST /products
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR

**Request Body:**
```json
{
  "name": "string (obrigatório)",
  "price": "number (> 0)",
  "stock": "number (>= 0)",
  "available": "boolean (opcional)",
  "category": "ELECTRONICS|CLOTHING|FOOD|SERVICES|OTHER"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "price": "number",
  "stock": "number",
  "available": "boolean",
  "category": "string"
}
```

---

### 3.4 Atualizar Produto
```
PATCH /products/:id
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR

**Path Parameters:**
- `id`: uuid do produto

**Request Body:** (todos os campos são opcionais)
```json
{
  "name": "string",
  "price": "number (> 0)",
  "stock": "number (>= 0)",
  "available": "boolean",
  "category": "ELECTRONICS|CLOTHING|FOOD|SERVICES|OTHER"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "price": "number",
  "stock": "number",
  "available": "boolean",
  "category": "string"
}
```

---

### 3.5 Deletar Produto
```
DELETE /products/:id
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER

**Path Parameters:**
- `id`: uuid do produto

**Response:**
```json
{
  "message": "Produto deletado com sucesso"
}
```

---

## 4️⃣ **CUSTOMERS** - Gerenciamento de Clientes

### 4.1 Listar Clientes
```
GET /customers
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Query Parameters:**
- `search` (opcional): string para buscar por nome

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "document_type": "CPF|CNPJ",
    "document": "string",
    "email": "string",
    "phone": "string",
    "state": "UF",
    "city": "string",
    "address": "string",
    "status": "ACTIVE|INACTIVE|BLOCKED"
  }
]
```

---

### 4.2 Obter Cliente por ID
```
GET /customers/:id
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Path Parameters:**
- `id`: uuid do cliente

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "document_type": "CPF|CNPJ",
  "document": "string",
  "email": "string",
  "phone": "string",
  "state": "UF",
  "city": "string",
  "address": "string",
  "status": "ACTIVE|INACTIVE|BLOCKED"
}
```

---

### 4.3 Criar Cliente
```
POST /customers
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, SELLER

**Request Body:**
```json
{
  "name": "string (min: 3 chars)",
  "document_type": "CPF|CNPJ",
  "document": "string (11 para CPF, 14 para CNPJ)",
  "email": "string (valid email)",
  "phone": "string (10-11 dígitos)",
  "state": "UF (brasileira válida)",
  "city": "string (2-100 chars)",
  "address": "string (5-100 chars)",
  "status": "ACTIVE|INACTIVE|BLOCKED"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "document_type": "CPF|CNPJ",
  "document": "string",
  "email": "string",
  "phone": "string",
  "state": "UF",
  "city": "string",
  "address": "string",
  "status": "string"
}
```

---

### 4.4 Atualizar Cliente
```
PATCH /customers/:id
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, SELLER

**Path Parameters:**
- `id`: uuid do cliente

**Request Body:** (todos os campos são opcionais)
```json
{
  "name": "string (min: 3 chars)",
  "document_type": "CPF|CNPJ",
  "document": "string",
  "email": "string (valid email)",
  "phone": "string (10-11 dígitos)",
  "state": "UF",
  "city": "string (2-100 chars)",
  "address": "string (5-100 chars)",
  "status": "ACTIVE|INACTIVE|BLOCKED"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "document_type": "CPF|CNPJ",
  "document": "string",
  "email": "string",
  "phone": "string",
  "state": "UF",
  "city": "string",
  "address": "string",
  "status": "string"
}
```

---

### 4.5 Deletar Cliente
```
DELETE /customers/:id
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR

**Path Parameters:**
- `id`: uuid do cliente

**Response:**
```json
{
  "message": "Cliente deletado com sucesso"
}
```

---

## 5️⃣ **ORDERS** - Gerenciamento de Pedidos

### 5.1 Listar Pedidos
```
GET /orders
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Query Parameters:**
- `search` (opcional): string para buscar

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "string",
    "description": "string",
    "customerId": "uuid",
    "status": "PENDING|IN_PROGRESS|COMPLETED|CANCELLED",
    "createdAt": "date",
    "updatedAt": "date"
  }
]
```

---

### 5.2 Obter Pedido por ID
```
GET /orders/:id
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Path Parameters:**
- `id`: uuid do pedido

**Response:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "customerId": "uuid",
  "status": "PENDING|IN_PROGRESS|COMPLETED|CANCELLED",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

### 5.3 Criar Pedido
```
POST /orders
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Request Body:**
```json
{
  "title": "string (obrigatório)",
  "description": "string (min: 5 chars)",
  "customerId": "uuid (válido)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "customerId": "uuid",
  "status": "PENDING",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

### 5.4 Atualizar Pedido
```
PATCH /orders/:id
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Path Parameters:**
- `id`: uuid do pedido

**Request Body:** (todos os campos são opcionais)
```json
{
  "title": "string",
  "description": "string (min: 5 chars)",
  "customerId": "uuid",
  "status": "PENDING|IN_PROGRESS|COMPLETED|CANCELLED"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "customerId": "uuid",
  "status": "string",
  "createdAt": "date",
  "updatedAt": "date"
}
```

---

### 5.5 Deletar Pedido
```
DELETE /orders/:id
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Path Parameters:**
- `id`: uuid do pedido

**Response:**
```json
{
  "message": "Pedido deletado com sucesso"
}
```

---

## 6️⃣ **TRANSACTIONS** - Gerenciamento de Transações

### 6.1 Listar Transações
```
GET /transactions
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, FINANCIAL

**Query Parameters:**
- `search` (opcional): string para buscar

**Response:**
```json
[
  {
    "id": "uuid",
    "type": "INCOME|EXPENSE",
    "amount": "number",
    "description": "string",
    "category": "SALARY|SALES|SUPPLIES|UTILITIES|OTHER",
    "date": "date",
    "productId": "uuid (opcional)",
    "quantity": "number (opcional)",
    "createdAt": "date"
  }
]
```

---

### 6.2 Obter Transações Recentes
```
GET /transactions/recent
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, FINANCIAL

**Response:**
```json
[
  {
    "id": "uuid",
    "type": "INCOME|EXPENSE",
    "amount": "number",
    "description": "string",
    "category": "SALARY|SALES|SUPPLIES|UTILITIES|OTHER",
    "date": "date",
    "productId": "uuid (opcional)",
    "quantity": "number (opcional)",
    "createdAt": "date"
  }
]
```

---

### 6.3 Obter Transação por ID
```
GET /transactions/:id
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, FINANCIAL

**Path Parameters:**
- `id`: uuid da transação

**Response:**
```json
{
  "id": "uuid",
  "type": "INCOME|EXPENSE",
  "amount": "number",
  "description": "string",
  "category": "SALARY|SALES|SUPPLIES|UTILITIES|OTHER",
  "date": "date",
  "productId": "uuid (opcional)",
  "quantity": "number (opcional)",
  "createdAt": "date"
}
```

---

### 6.4 Criar Transação
```
POST /transactions
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, FINANCIAL

**Request Body:**
```json
{
  "type": "INCOME|EXPENSE (entrada/saída)",
  "amount": "number (> 0)",
  "description": "string",
  "category": "SALARY|SALES|SUPPLIES|UTILITIES|OTHER",
  "date": "date (formato: YYYY-MM-DD ou Date)",
  "productId": "uuid (opcional)",
  "quantity": "number (> 0, opcional)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "type": "INCOME|EXPENSE",
  "amount": "number",
  "description": "string",
  "category": "string",
  "date": "date",
  "productId": "uuid",
  "quantity": "number",
  "createdAt": "date"
}
```

---

### 6.5 Atualizar Transação
```
PATCH /transactions/:id
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, FINANCIAL

**Path Parameters:**
- `id`: uuid da transação

**Request Body:** (todos os campos são opcionais)
```json
{
  "type": "INCOME|EXPENSE",
  "amount": "number (> 0)",
  "description": "string",
  "category": "SALARY|SALES|SUPPLIES|UTILITIES|OTHER",
  "date": "date",
  "productId": "uuid",
  "quantity": "number (> 0)"
}
```

**Response:**
```json
{
  "id": "uuid",
  "type": "INCOME|EXPENSE",
  "amount": "number",
  "description": "string",
  "category": "string",
  "date": "date",
  "productId": "uuid",
  "quantity": "number",
  "createdAt": "date"
}
```

---

### 6.6 Deletar Transação
```
DELETE /transactions/:id
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER

**Path Parameters:**
- `id`: uuid da transação

**Response:**
```json
{
  "message": "Transação deletada com sucesso"
}
```

---

## 7️⃣ **SETTINGS** - Configurações

### 7.1 Obter Configurações da Empresa
```
GET /settings/company
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "cnpj": "string",
  "email": "string",
  "phone": "string"
}
```

---

### 7.2 Atualizar Configurações da Empresa
```
PATCH /settings/company
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER

**Request Body:** (todos os campos são opcionais)
```json
{
  "name": "string (3-100 chars)",
  "cnpj": "string (14 dígitos)",
  "email": "string (valid email)",
  "phone": "string"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "cnpj": "string",
  "email": "string",
  "phone": "string"
}
```

---

### 7.3 Obter Preferências do Usuário
```
GET /settings/preferences
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "theme": "light|dark",
  "language": "pt|en",
  "notifications": "boolean"
}
```

---

### 7.4 Atualizar Preferências do Usuário
```
PATCH /settings/preferences
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Request Body:** (todos os campos são opcionais)
```json
{
  "theme": "light|dark",
  "language": "pt|en",
  "notifications": "boolean"
}
```

**Response:**
```json
{
  "id": "uuid",
  "userId": "uuid",
  "theme": "string",
  "language": "string",
  "notifications": "boolean"
}
```

---

## 8️⃣ **COMPANY** - Empresa

### 8.1 Obter Dados da Empresa
```
GET /company
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "cnpj": "string",
  "email": "string",
  "phone": "string"
}
```

---

## 9️⃣ **REPORTS** - Relatórios

### 9.1 Relatório Financeiro
```
GET /reports/financial
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, FINANCIAL

**Query Parameters:**
- `startDate` (opcional): data início (YYYY-MM-DD)
- `endDate` (opcional): data fim (YYYY-MM-DD)
- `period` (opcional): "day|week|month|year"

**Response:**
```json
{
  "totalIncome": "number",
  "totalExpense": "number",
  "balance": "number",
  "period": "string"
}
```

---

### 9.2 Distribuição por Categoria
```
GET /reports/category-distribution
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, FINANCIAL

**Query Parameters:**
- `startDate` (opcional): data início
- `endDate` (opcional): data fim
- `period` (opcional): "day|week|month|year"

**Response:**
```json
[
  {
    "category": "string",
    "amount": "number",
    "percentage": "number"
  }
]
```

---

### 9.3 Fluxo de Caixa
```
GET /reports/cashflow
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, FINANCIAL

**Query Parameters:**
- `startDate` (opcional): data início
- `endDate` (opcional): data fim
- `period` (opcional): "day|week|month|year"

**Response:**
```json
[
  {
    "date": "date",
    "income": "number",
    "expense": "number",
    "balance": "number"
  }
]
```

---

### 9.4 Relatório de Clientes
```
GET /reports/customers
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, SELLER, FINANCIAL

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "totalOrders": "number",
    "totalSpent": "number"
  }
]
```

---

### 9.5 Relatório de Estoque
```
GET /reports/stock
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, SELLER

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "stock": "number",
    "price": "number",
    "available": "boolean"
  }
]
```

---

### 9.6 Relatório de Vendas
```
GET /reports/sales
```
**Autenticação:** Requer JWT  
**Papel:** MANAGER, SUPERVISOR, SELLER, FINANCIAL

**Response:**
```json
[
  {
    "id": "uuid",
    "productName": "string",
    "quantity": "number",
    "totalRevenue": "number"
  }
]
```

---

## 🔟 **ACTIVITIES** - Atividades

### 10.1 Listar Atividades Recentes
```
GET /activities
```
**Autenticação:** Requer JWT  
**Papel:** Qualquer usuário autenticado

**Response:**
```json
[
  {
    "id": "uuid",
    "action": "string",
    "entity": "string",
    "entityId": "uuid",
    "userId": "uuid",
    "createdAt": "date"
  }
]
```

---

## 📋 Resumo de Papéis

| Papel | Descrição |
|-------|-----------|
| **MANAGER** | Acesso completo, gerencia usuários e transações |
| **SUPERVISOR** | Gerencia produtos e transações financeiras |
| **SELLER** | Acesso a clientes, produtos e pedidos |
| **FINANCIAL** | Acesso apenas a transações e relatórios |
| **USER** | Acesso limitado apenas ao próprio perfil |

---

## 🔑 Chaves de Erro Comuns

| Código | Mensagem |
|--------|----------|
| 400 | Dados inválidos ou ausentes |
| 401 | Token inválido ou expirado |
| 403 | Sem permissão para acessar |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

*Documento gerado automaticamente baseado na estrutura do backend*
