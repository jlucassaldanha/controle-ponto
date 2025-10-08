import { describe, it, expect, vi, type Mock } from "vitest";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import prismaMock from "../../../test/setup";
import { createUser, validateCredentials } from "./user.services";
import { createUserSchema, logInSchema } from "./user.validation";
import { UserDataType } from "./user.types";

vi.mock("bcryptjs");

beforeEach(() => {
  vi.clearAllMocks();
});

describe('findUserByEmail', () => {
})

// MUDAR
describe("createUser", () => {
  it("should create and return a new user if the email does not exist", async () => {
    const userData: UserDataType = {
      email: "novo@exemplo.com",
      username: "Usuario Novo",
      password: "senha-nova-123",
    };
    const mockPasswordHash = "hash-novo-gerado";
    const createdUser = {
      id: "uuid-novo-456",
      email: userData.email,
      username: userData.username,
      passwordHash: mockPasswordHash,
    };
    
    prismaMock.user.findUnique.mockResolvedValue(null);
    (bcrypt.hash as Mock).mockResolvedValue(mockPasswordHash);
    prismaMock.user.create.mockResolvedValue(createdUser);

    const result = await createUser(userData);

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: userData.email,
        username: userData.username,
        passwordHash: mockPasswordHash,
      },
    });
    expect(result).toEqual(createdUser);
  });

  it("should return null if the user already exists", async () => {
    const userData: UserDataType = {
      email: "existente@exemplo.com",
      username: "Usuario Existente",
      password: "senha-qualquer",
    };
    const existingUser = {
      id: "uuid-existente-123",
      email: userData.email,
      username: userData.username,
      passwordHash: "hash-existente",
    };

    prismaMock.user.findUnique.mockResolvedValue(existingUser);

    const result = await createUser(userData);

    expect(result).toBeNull();
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });
});

describe('validateCredentials', () => {
  it('should return user if exist and have correct credentials', async () => {
    const userData: UserDataType = {
      email: "existente@exemplo.com",
      username: "Usuario Existente",
      password: "senha-qualquer",
    };

    const existingUser = {
      id: "uuid-existente-123",
      email: userData.email,
      username: userData.username,
      passwordHash: "hash-existente",
    };

    prismaMock.user.findUnique.mockResolvedValue(existingUser);
    (bcrypt.compare as Mock).mockResolvedValue(true);

    const result = await validateCredentials(userData.email, userData.password)

    expect(result).toStrictEqual({
      id: existingUser.id, 
      email: existingUser.email, 
      username: existingUser.username
    })
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, existingUser.passwordHash);
  })

  it('should return null if password is incorrect', async () => {
    const userData = {
      email: "existente@exemplo.com",
      password: "senha-qualquer",
    };

    const existingUser = {
      id: "uuid-existente-123",
      email: userData.email,
      username: "nome teste",
      passwordHash: "hash-existente",
    };

    prismaMock.user.findUnique.mockResolvedValue(existingUser);
    (bcrypt.compare as Mock).mockResolvedValue(false);

    const result = await validateCredentials(userData.email, userData.password)

    expect(result).toBeNull()
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, existingUser.passwordHash);
  })
  it('should return null if email not exist', async () => {
    const userData = {
      email: "teste@exemplo.com",
      password: "senha-qualquer",
    };

    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await validateCredentials(userData.email, userData.password)

    expect(result).toBeNull()
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  })
})

describe('createUserSchema', () => {
  it('should pass validation when data is valid', () => {
    const validData = {
      username: 'usuario valido',
      email: 'email@valido.com',
      password: 'supersenha',
    }

    const result = createUserSchema.safeParse(validData)

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
  it('should pass validation when data is valid', async () => {
    const validData = {
      email: 'email@valido.com',
      password: 'supersenha',
    }

    const result = logInSchema.safeParse(validData)

    expect(result.success).toBe(true)
  })

  it('should fail validation when email is not valid', async () => {
    const validData = {
      email: 'emailinvalido.com',
      password: 'supersenha',
    }

    const result = logInSchema.safeParse(validData)

    expect(result.success).toBe(false)
    if (!result.success) {
      const emailError = result.error.issues.find((issue) => issue.path[0] === 'email')
      expect(emailError?.message).toBe("Insira um email valido.")
    }
  })

  it('should fail validation when password is not valid', async () => {
    const validData = {
      email: 'email@valido.com',
      password: 'superse',
    }

    const result = logInSchema.safeParse(validData)

    expect(result.success).toBe(false)
    if (!result.success) {
      const passwordError = result.error.issues.find((issue) => issue.path[0] === 'password')
      expect(passwordError?.message).toBe("A senha deve ter pelo menos 8 caracteres.")
    }
  })
})