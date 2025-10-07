import { PrismaClient } from '@prisma/client';
import path from 'path';

// Esta é a maneira de declarar uma variável global de forma segura com TypeScript
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Constrói o caminho absoluto para o arquivo do banco de dados
// process.cwd() retorna o diretório raiz do projeto onde o comando 'npm run dev' foi executado
const dbPath = path.join(process.cwd(), 'prisma/dev.db');
const databaseUrl = `file:${dbPath}`;

const prisma = global.prisma ||
  new PrismaClient({
    // Sobrescreve a DATABASE_URL do .env com o nosso caminho absoluto e dinâmico
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export { prisma };