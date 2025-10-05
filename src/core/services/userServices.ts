import bcrypt from "bcryptjs"
import { prisma } from '@/lib/prisma'
import type { UserDataType } from "../types/user.types"

export async function findUser(email: string) {
	return await prisma.user.findUnique({
		where: {
			email: email
		}
	})
}

export async function findOrCreateUser(userData: UserDataType) {
	const userExist = await findUser(userData.email)

	if (!userExist) {
		const passwordHash = await bcrypt.hash(userData.password, 10)
		return await prisma.user.create({
			data: {
				email: userData.email,
				username: userData.username,
				passwordHash: passwordHash,
			}
		})

	}
	return null
}