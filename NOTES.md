Primeiramente esta documentação iniciará como o meu próprio guia. Onde vou anotar coisas que acho importantes para eu lembrar sobre como isso foi escrito.

Instalação das bibliotecas:
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom

/core terá as funções com o sentido de negocio
/utils são funções utilitarias gerais

As chamadas backend no frontend não vao precisar de api, posso chamar diretamente as funções ou usar server actions

Uso de banco de dados
npm install prisma --save-dev
npm install @prisma/client

npx prisma generate
npx prisma init --datasource-provider sqlite

criptografia
npm install bcryptjs
npm install -D @types/bcryptjs

Autenticação
npm install next-auth@beta


Até agora:
Esta feita a logica de criação de usuario e inicio da autenticação
Proximo passo:
Testar server actions e interface