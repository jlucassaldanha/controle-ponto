# ⏰ Controle de ponto

[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)]()
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3-2d3748?logo=prisma)](https://www.prisma.io/)
[![Vitest](https://img.shields.io/badge/Vitest-passing-yellowgreen?logo=vitest)](https://vitest.dev/)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/jlucassaldanha/controle-ponto)

## 📌 Sobre o projeto
Um sistema de controle de ponto moderno e funcional, criado para simplificar o registro de horas de trabalho. Além de uma ferramenta de uso pessoal, este projeto serviu como um campo de estudo prático para aprofundar conhecimentos em **Next.js** e testes unitários com **Vitest**.

**👉 Acesse a aplicação em produção aqui: [Controle de ponto](https://controleponto.vercel.app)**

## 🛠️ Tecnologias Utilizadas
- **Full-Stack Framework** → Next.js (com Server Actions)
- **Linguagem** → TypeScript
- **Banco de Dados / ORM** → PostgreSQL + Prisma
- **Componentes de UI** → Material UI
- **Testes Unitários** → Vitest
- **Deploy** → Vercel

## 🎯 Funcionalidades Atuais (Beta)
- ✅ **Autenticação:** Sistema completo de login e cadastro de usuários.
- ✅ **Botão registrar ponto:** Botão de registro de ponto com um clique.
- ✅ **Registro de Horas:** Interface para registrar manualmente entradas e saídas.
- ✅ **Edição de registro:** Possibilidade de editar os registros de horas.
- ✅ **Insights:** Visualização dos registros do dia, total de horas trabalhadas e cálculo de horas extras.
- ✅ **Jornada de trabalho:** Definição da jornada de trabalho para cálculos precisos.
- ✅ **Saldo anterior:** Definição de saldo de horas anterior ao uso da aplicação para cálculos atualizados.
- ✅ **Responsividade:** Interface adaptada para uso em desktop e mobile.
- ✅ **Abono:** Possibilidade de abonar dias não sem registro de ponto.
- ✅ **Edição:** Edição de ponto inline na tabela de visualização.

## 🚀 Funcionalidades Planejadas
- ⚙️ Filtros avançados para visualização (diário, semanal, mensal).
- ⚙️ Mostragem de saldo em tempo real.
- ⚙️ Adição de ponto inline.

## 🖼️ Preview

### Tela de Inicial
![Tela de Inicio](./docs/imagem_home.png)

### Tela de Login
![Tela de Login do Projeto](./docs/imagem_login.png)

### Resigtros de Pontos
![Tela de registros de ponto](./docs/imagem_ponto.png)

### Versão Mobile
![Aplicação rodando em um celular](./docs/imagem_mobile.png)

## 🔧 Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/jlucassaldanha/controle-ponto

# 2. Acesse a pasta do projeto
cd controle_ponto

# 3. Instale as dependências
npm install

# 4. Configure as variáveis de ambiente
# Crie um arquivo .env.local na raiz e adicione sua DATABASE_URL
# Exemplo: DATABASE_URL="postgresql://user:password@host:port/database"

# 5. Rode as migrations do banco de dados
npx prisma migrate dev

# 6. Inicie o servidor de desenvolvimento
npm run dev
```
A aplicação estará disponível em `http://localhost:3000`.

## 📜 Licença
Este projeto está licenciado sob a **MIT License** – veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

## 📫 Contato
- **LinkedIn:** [@joao-lucas-saldanha](https://linkedin.com/in/joao-lucas-saldanha/)