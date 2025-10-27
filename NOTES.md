Primeiramente esta documentação iniciará como o meu próprio guia. Onde vou anotar coisas que acho importantes para eu lembrar sobre como isso foi escrito.

```bash
# Instalação das bibliotecas:
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom

/core terá as funções com o sentido de negocio
/utils são funções utilitarias gerais

# As chamadas backend no frontend não vao precisar de api, posso chamar diretamente as funções ou usar server actions

# Uso de banco de dados
npm install prisma --save-dev
npm install @prisma/client

npx prisma generate
npx prisma init --datasource-provider sqlite

# criptografia
npm install bcryptjs
npm install -D @types/bcryptjs

# Autenticação
npm install next-auth@beta

# tema

npm install @mui/material-nextjs

npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

## Organizando ideias:

- Melhoria: Checkbox "Hoje" inicia marcado

### Visualização de pontos

Separar por linhas e colunas

- Linhas: Dia
- Colunas: Tipo de entrada, quantas horas foram feitas, horas a mais ou a menos

### Calculos de horas

- É necessário identificar o dia da semana e qual o horário daquele dia para que possa ser feito o calculo corrento
- Preciso entender como calcular as horas semanais e mensais

- Preciso saber quando são os feriados ou ter uma caixa de seleção na hora de registrar o ponto para marcar o dia como feriado, ou abono por exemplo

## Próximos passos
1. Implementar visualização de pontos sem calculos de horas (FEITO)
2. Iniciar "Hoje" marcado (FEITO)
3. Adicionar calculo de horas (FEITO)
	- Calculo de horario trabalhado (FEITO)
	- Verificação: Esta dentro do horario, esta devendo hora (FEITO)
		- Necessario: Ler preferencias -> Calcular hora trabalhada por dia prestando atenção na exceção -> verificar o dia trabalhado -> o tempo trabalhdo -> verificar se esta fora ou dentro do  (FEITO)
	- Calculo de horas extras (FEITO)
4. Adicionar opção de visualização por dia, semana e mes
5. Adicionar opcão de abono na pagina de adição ou pagina de edição
6. Deixar pagina de edição iniciando com todos pontos e entrada e saida serem fixos (FEITO)
7. Mostrar total de extras ou faltantes (FEITO)
8. Adicionar opção para registrar horas extras anteriores

## Post

🚀 Controle de Ponto com Next.js e Vitest

Criei um sistema de controle de ponto para estudar e ainda por cima resolver uma necessidade real: facilitar o registro de horas para mim e meus colegas.

O principal objetivo foi evoluir minhas habilidades com Next.js e implementar uma cultura de qualidade com testes unitários usando Vitest.

A aplicação (versão beta) já possui autenticação, registro de horas e cálculo de extras. O código é open-source e está no meu GitHub.

🔗 Link para o repositório: https://github.com/jlucassaldanha/controle-ponto

#NextJS #ReactJS #TypeScript #Vitest #Prisma #DesenvolvimentoWeb #Portfolio #SoftwareEngineering
