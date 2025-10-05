import { describe, it, expect } from "vitest";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import prismaMock from "@/test/setup";
import { findUser, createUser } from "./user.services";
import { createUserSchema } from "./user.validation";
import { UserDataType } from "./user.types";

vi.mock("bcryptjs");

describe("findUser", () => {
  it("should return user object if find on db", async () => {
    const mockUser = {
      id: "uuid-123",
      username: "User Test",
      email: "test@test.com",
      passwordHash: "hash-secret",
    };

    prismaMock.user.findUnique.mockResolvedValue(mockUser);

    const result = await findUser(mockUser.email);

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: mockUser.email,
      },
    });

    expect(result).toEqual(mockUser);
  });

  it("should return null when user not found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await findUser("teste@teste.com");

    expect(result).toBeNull();
  });
});

describe("createUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
    (bcrypt.hash as vi.Mock).mockResolvedValue(mockPasswordHash);
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
      expect(emailError?.message).toBe('Insira um email valido')
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
