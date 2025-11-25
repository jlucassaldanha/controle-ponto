import { UserDataType } from "../user.types";
import { createUserSchema, logInSchema } from "../user.validation"

const userData: UserDataType & {confirm_password: string} = {
  email: "email@exemplo.com",
  username: "user name",
  password: "senha-123",
  confirm_password: "senha-123"
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('createUserSchema', () => {
  it('should pass validation when data is valid', () => {
    const result = createUserSchema.safeParse(userData)
    expect(result.success).toBe(true)
  })

  it('should fail if username is too short', () => {
    const invalidData = {
      username: 'us',
      email: 'email@valido.com',
      password: 'supersenha',
    }

    const result = createUserSchema.safeParse(invalidData)

    expect(result.success).toBe(false)

    if (!result.success) {
      const usernameError = result.error.issues.find((issue) => issue.path[0] === 'username')
      expect(usernameError?.message).toBe("Nome de usuário deve ter pelo menos 3 letras.")
    }
  })

  it('should fail if email is invalid', () => {
    const invalidData = {
      username: 'usuario valido',
      email: 'emailinvalido.com',
      password: 'supersenha',
    }

    const result = createUserSchema.safeParse(invalidData)

    expect(result.success).toBe(false)

    if (!result.success) {
      const emailError = result.error.issues.find((issue) => issue.path[0] === 'email')
      expect(emailError?.message).toBe('Insira um email valido.')
    }
  })

  it('should fail if password is too short', () => {
    const invalidData = {
      username: 'username',
      email: 'email@valido.com',
      password: 'senha',
    }

    const result = createUserSchema.safeParse(invalidData)

    expect(result.success).toBe(false)

    if (!result.success) {
      const passwordError = result.error.issues.find((issue) => issue.path[0] === 'password')
      expect(passwordError?.message).toBe("A senha deve ter pelo menos 8 caracteres.")
    }
  })
})

describe('logInSchema', () => {
  it('should pass validation when data is valid', () => {
    const validLogin = {
      email: 'email@valido.com',
      password: 'supersenha',
    }

    const result = logInSchema.safeParse(validLogin)

    expect(result.success).toBe(true)
  })

  it('should fail validation when email is not valid', () => {
    const invalidLogin = {
      email: 'emailinvalido.com',
      password: 'supersenha',
    }

    const result = logInSchema.safeParse(invalidLogin)

    expect(result.success).toBe(false)
    if (!result.success) {
      const emailError = result.error.issues.find((issue) => issue.path[0] === 'email')
      expect(emailError?.message).toBe("Insira um email valido.")
    }
  })

  it('should fail validation when password is not valid', () => {
    const invalidLogin = {
      email: 'email@valido.com',
      password: 'superse',
    }

    const result = logInSchema.safeParse(invalidLogin)

    expect(result.success).toBe(false)
    if (!result.success) {
      const passwordError = result.error.issues.find((issue) => issue.path[0] === 'password')
      expect(passwordError?.message).toBe("A senha deve ter pelo menos 8 caracteres.")
    }
  })
})