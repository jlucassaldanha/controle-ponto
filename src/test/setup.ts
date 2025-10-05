import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset } from 'vitest-mock-extended'
import { beforeEach } from "vitest"

const prismaMock = mockDeep<PrismaClient>()

beforeEach(() => {
	mockReset(prismaMock)
})

export default prismaMock