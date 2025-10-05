import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset } from 'vitest-mock-extended'
import { vi, beforeEach } from "vitest"

const prismaMock = mockDeep<PrismaClient>()

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}));

beforeEach(() => {
	mockReset(prismaMock)
})

export default prismaMock