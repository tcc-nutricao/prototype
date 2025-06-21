# 🍎 Protótipo de Sistema de Nutrição

Este repositório contém o protótipo de um sistema de nutrição O objetivo é fornecer uma base funcional para um aplicativo que ajude usuários a monitorarem sua alimentação e hábitos saudáveis.

## 💻 Tecnologias Utilizadas

- **⚙️ Backend:** Node.js (Express)
- **🌐 Frontend:** Vue.js
- **🔐 Autenticação:** Login e cadastro de usuários com proteção de rotas

## 📌 Funcionalidades Iniciais

- Cadastro de usuário
- Login com autenticação segura
- Validação de formulários
- Feedback de erros
- Proteção de rotas autenticadas

## 📁 Estrutura do Projeto

```bash
/
├── backend/         # API Node.js com Express
│   └── ...
├── frontend/        # Aplicação Vue.js
│   └── ...
└── README.md
```

## 👨‍💻 Como Rodar Localmente

1. **Clone o repositório**
```bash
git clone https://github.com/tcc-nutricao/prototype.git

cd prototype
```

2. **No backend:**

```bash
cd backend
```

Instale as dependências:
```bash
npm install

npm install prisma --save-dev

npx prisma generate

```

Inicie o servidor:
```bash
npm run dev
```

3. **No frontend:**

No diretório /prototype:
```bash
cd frontend
```

Instale as dependências:
```bash
npm install
```

Inicie o servidor:
```bash
npm run dev
```

