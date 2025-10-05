import { vi } from 'vitest';
import prismaMock from './setup';

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));