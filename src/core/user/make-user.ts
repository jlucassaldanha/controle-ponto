import bcrypt from "bcryptjs"

export async function makeUser(email: string, username: string, password: string) {
	const passwordHash = await bcrypt.hash(password, 10)
	return {
		email,
		username,
		passwordHash, 
	}
}
