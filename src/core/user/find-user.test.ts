import { describe, it, expect } from "vitest";
import prismaMock from "@/test/setup";
import { findUser } from "./find-user";

describe('findUser', () => {
	it('should return user object if find on db', async () => {
		const mockUser = {
			id: 'uuid-123',
			username: 'User Test',
			email: 'test@test.com',
			passwordHash: 'hash-secret'
		}

		prismaMock.user.findUnique.mockResolvedValue(mockUser)

		const result = await findUser(mockUser.email)
		
		expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
			where: {
				email: mockUser.email
			}
		})

		expect(result).toEqual(mockUser)
	})

	it('should return null when user not found', async () => {
		prismaMock.user.findUnique.mockResolvedValue(null)

		const result = await findUser('teste@teste.com')

		expect(result).toBeNull()
	})
})