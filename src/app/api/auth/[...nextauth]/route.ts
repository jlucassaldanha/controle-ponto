import NextAuth, { User as NextAuthUser } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { validateCredentials } from '@/core/user/user.services'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials): Promise<NextAuthUser | null> {
				if (!credentials?.email || !credentials.password) {
					return null
				}

				return await validateCredentials(
					credentials.email as string,
					credentials.password as string
				)
			}
		})
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string
			}
			return session
		},
	}
})