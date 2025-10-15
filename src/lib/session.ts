import { prisma } from "./prisma"
import { auth } from "@/app/api/auth/[...nextauth]/route";

export async function getCurrentUser() {
	const session = await auth();

	if (session) {
		const user = await prisma.user.findUnique({
			where: {
				id: session.user.id,
			},
		});

		if (user) {
			const { passwordHash: _, ...userWithoutHash } = user
			return userWithoutHash
		}
	}

	return null
}