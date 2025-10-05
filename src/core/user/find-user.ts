import { prisma } from '@/lib/prisma'

export async function findUser(email:string) {
	return await prisma.user.findUnique({
		where: {
			email: email
		}
	})
}