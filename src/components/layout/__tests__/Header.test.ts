import { getCurrentUser } from "@/lib/session"
import { render, screen } from "@testing-library/react"
import Header from "../Header"

vi.mock("@/lib/session")
vi.mock("@/actions/auth.action")

describe('Header', () => {
	it('should render "Entrar" link if user not loged in', async () => {
		vi.mocked(getCurrentUser).mockResolvedValue(null)

		render(await Header())

		expect(screen.getByRole('link', { name: 'Entrar' })).toBeInTheDocument()
		expect(screen.queryByText('Olá')).toBeNull()
	})

	it('should render user name and "Sair" button if user is loged in', async () => {
		const mockedUser = {
			id: 'user-uuid',
			username: 'user name',
			email: 'email@teste.com'
		}
		vi.mocked(getCurrentUser).mockResolvedValue(mockedUser)

		render(await Header())

		expect(screen.getByText(`Olá, ${mockedUser.username}`)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: 'Sair' })).toBeInTheDocument()
		expect(screen.queryByRole('link', { name: 'Entrar' })).toBeNull()
	})
})