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
3. Adicionar calculo de horas
	- Calculo de horario trabalhado
4. Adicionar opção de visualização por dia, semana e mes
5. Adicionar opcão de abono na pagina de adição ou pagina de edição

## Verificação de sequencia não permite adicionar pontos do meio da jornada, necessario revisar