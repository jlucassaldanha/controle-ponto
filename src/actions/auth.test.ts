import { describe, it, expect, vi, type Mock } from "vitest";
import { z } from 'zod'
import { createUser, validateCredentials } from "@/core/user/user.services";
import { createUserSchema, logInSchema } from "@/core/user/user.validation";
import { signUpAction, logInAction, logOutAction } from "./auth.action";
import { signIn } from "next-auth/react";

vi.mock('@/core/user/user.services', () => ({
  createUser: vi.fn()
}))
vi.mock('@/core/user/user.validation', () => ({
  createUserSchema: {
    safeParse: vi.fn(),
  },
  logInSchema: {
    safeParse: vi.fn(),
  },
}))

vi.mock('zod', async (importOriginal) => {
  const originalZod = await importOriginal<typeof import('zod')>()
  return {
    ...originalZod,
    z: {
      ...originalZod.z,
      flattenError: vi.fn()
    }
  }
})

beforeEach(() => {
  vi.clearAllMocks();
});

describe('signUpAction', () => {
  it('should success and return a object with success true and the new user', async () => {
    const inputData = {
      username: "usuario teste",
      email: 'teste@email.com',
      password: 'senhateste'
    }

    const formData = new FormData()

    formData.append("username", inputData.username)
    formData.append("email", inputData.email)
    formData.append("password", inputData.password)

    vi.mocked(createUserSchema.safeParse).mockReturnValue({ success: true, data: inputData })
    vi.mocked(createUser).mockResolvedValue({ 
      id: "id-la", 
      username: inputData.username, 
      email: inputData.email, 
      passwordHash: "senha-hash" 
    })

    const result = await signUpAction(formData)

    expect(result).toStrictEqual({ 
      success: true, 
      user:  {
        id: "id-la", 
        username: inputData.username, 
        email: inputData.email
      }
    })
    expect(createUserSchema.safeParse).toBeCalledWith(Object.fromEntries(formData))
    expect(createUser).toBeCalledWith(inputData)
  })

  it('should fail and return a object with success false and the errors if the fromData is invalid', async () => {
    const inputData = {
      username: "usuario teste",
      email: 'teste@email.com',
      password: 'senhateste'
    }

    const formData = new FormData()

    formData.append("username", inputData.username)
    formData.append("email", inputData.email)
    formData.append("password", inputData.password)

    vi.mocked(createUserSchema.safeParse).mockReturnValue({ success: false, error: {} as any })
    vi.mocked(z.flattenError).mockReturnValue({ 
      formErrors: [], 
      fieldErrors: [], 
    })

    const result = await signUpAction(formData)

    expect(result.success).toBe(false)
    expect(result.errors).toEqual([])
    expect(createUserSchema.safeParse).toBeCalledWith(Object.fromEntries(formData))
    expect(createUser).not.toHaveBeenCalled()
  })

  it('should fail and return a object with success false and the errors if the email is used', async () => {
    const inputData = {
      username: "usuario teste",
      email: 'testeemail.com',
      password: 'senhateste'
    }

    const formData = new FormData()

    formData.append("username", inputData.username)
    formData.append("email", inputData.email)
    formData.append("password", inputData.password)

    vi.mocked(createUserSchema.safeParse).mockReturnValue({ success: true, data: inputData })
    vi.mocked(createUser).mockResolvedValue(null)

    const result = await signUpAction(formData)

    expect(result).toStrictEqual({ success: false, message: "Este email já está em uso." })
    expect(createUserSchema.safeParse).toBeCalledWith(Object.fromEntries(formData))
    expect(createUser).toHaveBeenCalledWith(inputData);
  })

  it('should fail and return a object with success false and the errors if another error ocours', async () => {
    const inputData = {
      username: "usuario teste",
      email: 'testeemail.com',
      password: 'senhateste'
    }

    const formData = new FormData()

    formData.append("username", inputData.username)
    formData.append("email", inputData.email)
    formData.append("password", inputData.password)

    vi.mocked(createUserSchema.safeParse).mockReturnValue({ success: true, data: inputData })
    vi.mocked(createUser).mockRejectedValue(new Error('Database connection failed'));

    const result = await signUpAction(formData)

    expect(result).toStrictEqual({ 
      success: false, 
      message: 'Ocorreu um erro no servidor.' 
    });
    expect(createUserSchema.safeParse).toBeCalledWith(Object.fromEntries(formData))
    expect(createUser).toHaveBeenCalledWith(inputData);
  })
})

describe('logInAction', () => {
  it('should call sighIn with correct data on successful validation', async () => {
    const inputData = { email: 'teste@exemplo.com', password: 'senha-correta' }
    const formData = new FormData();
    formData.append('email', inputData.email);
    formData.append('password', inputData.password);

    vi.mocked(logInSchema.safeParse).mockReturnValue({ success: true, data: inputData })
    vi.mocked(signIn).mockResolvedValue(undefined as any)

    const result = await logInAction(formData)

    expect(signIn).toHaveBeenCalledWith('credentials', {
      ...inputData,
      redirectTo: '/dashboard',
    })

    expect(result.success).toBe(true)
  })
  it('should fail on validation if form data in invalid', async () => {})
  it('should fail if credentials are wrong', async () => {})
})