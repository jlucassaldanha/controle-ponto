import bcrypt from "bcryptjs"
import { prisma } from '@/lib/prisma'
import { findUser } from "./find-user"

export type UserDataType = {
	email: string
	username: string
	password: string
}

export async function findOrCreateUser(userData:UserDataType) {
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