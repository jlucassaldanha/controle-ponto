import { auth } from "@/app/api/auth/[...nextauth]/route"
import prismaMock from "../../../test/setup"
import { Mock } from "vitest"
import { getCurrentUser } from "../session"

vi.mock('@/app/api/auth/[...nextauth]/route')

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getCurrentUser', () => {
	const mockedReturn = {
		id: "user-uuid",
		username: "user name",
		email: "email@test.com",
	}

	it('should return user data without hash if have a session', async () => {
		(auth as Mock).mockResolvedValue({ user: mockedReturn })
		prismaMock.user.findUnique.mockResolvedValue({ ...mockedReturn, passwordHash: "senha" })		

		const res = await getCurrentUser()

		expect(res).toStrictEqual(mockedReturn)
		expect(auth).toHaveBeenCalledOnce()
		expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
			where: { id: mockedReturn.id },
		})
	})

	it('should return null if session not found', async () => {
		(auth as Mock).mockResolvedValue(null)		

		const res = await getCurrentUser()

		expect(res).toBeNull()
		expect(auth).toHaveBeenCalledOnce()
		expect(prismaMock.user.findUnique).not.toHaveBeenCalled()
	})

	it('should return null if user not found', async () => {
		(auth as Mock).mockResolvedValue({ user: mockedReturn })
		prismaMock.user.findUnique.mockResolvedValue(null)		

		const res = await getCurrentUser()

		expect(res).toStrictEqual(null)
		expect(auth).toHaveBeenCalledOnce()
		expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
			where: { id: mockedReturn.id },
		})
	})
})