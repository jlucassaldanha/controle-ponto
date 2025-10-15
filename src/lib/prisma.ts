import { PrismaClient } from '@prisma/client';
import path from 'path';

declare global {
  var prisma: PrismaClient | undefined;
}

const dbPath = path.join(process.cwd(), 'prisma/dev.db');
const databaseUrl = `file:${dbPath}`;

const prisma = global.prisma ||
  new PrismaClient({
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