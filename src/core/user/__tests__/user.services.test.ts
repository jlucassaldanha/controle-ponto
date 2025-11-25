import { describe, it, expect, vi, type Mock, beforeEach } from "vitest";
import bcrypt from "bcryptjs";
import prismaMock from "../../../../test/setup";
import { createUser, findUserByEmail, getInitialBalance, updateInitialBalance, validateCredentials } from "../user.services";
import { UserDataType } from "../user.types";

vi.mock("bcryptjs");
vi.mock("@/lib/dateUtils")

beforeEach(() => {
  vi.clearAllMocks();
});

describe('findUserByEmail', () => {
  const email: string = "existente@exemplo.com"

  it("should return null if the user don't exists", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await findUserByEmail(email)

    expect(result).toBeNull();
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: email },
    });
  });

  it("should return user if exists", async () => {
    
    const existingUser = {
      id: "uuid-existente-123",
      email: email,
      username: "um nome",
      passwordHash: "hash-existente",
      initialBalanceMinutes: 0
    };

    prismaMock.user.findUnique.mockResolvedValue(existingUser);

    const result = await findUserByEmail(email)

    expect(result).toStrictEqual(existingUser);
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: email },
    });
  });
})

const userData: UserDataType & {confirm_password: string} = {
  email: "email@exemplo.com",
  username: "user name",
  password: "senha-123",
  confirm_password: "senha-123"
};

describe("createUser", () => {
  it("should create and return a new user", async () => {
    const mockPasswordHash = "hash-novo-gerado";

    const createdUser = {
      id: "uuid-novo-456",
      email: userData.email,
      username: userData.username,
      passwordHash: mockPasswordHash,
      initialBalanceMinutes: 0
    };
    
    (bcrypt.hash as Mock).mockResolvedValue(mockPasswordHash);
    prismaMock.user.create.mockResolvedValue(createdUser);

    const result = await createUser(userData);

    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        email: userData.email,
        username: userData.username,
        passwordHash: mockPasswordHash,
      },
    });
    expect(result).toEqual(createdUser);
  });
});

describe('validateCredentials', () => {
  const existingUser = {
    id: "uuid-existente-123",
    email: userData.email,
    username: userData.username,
    passwordHash: "hash-existente",
    initialBalanceMinutes: 0
  };

  it('should return user if exist and have correct credentials', async () => {
    prismaMock.user.findUnique.mockResolvedValue(existingUser);
    (bcrypt.compare as Mock).mockResolvedValue(true);

    const result = await validateCredentials(userData.email, userData.password)

    expect(result).toStrictEqual({
      id: existingUser.id, 
      email: existingUser.email, 
      username: existingUser.username,
      initialBalanceMinutes: 0
    })
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, existingUser.passwordHash);
  })

  it('should return null if password is incorrect', async () => {
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
    prismaMock.user.findUnique.mockResolvedValue(null);

    const result = await validateCredentials(userData.email, userData.password)

    expect(result).toBeNull()
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(bcrypt.compare).not.toHaveBeenCalled();
  })
})

describe('updateInitialBalance', () => {
  it('should update the initial balance', async () => {
    const initialBalance = 120
    const userId = "uuid-existente-123"

    const existingUser = {
      id: userId,
      email: 'email@email.com',
      username: "um nome",
      passwordHash: "hash-existente",
      initialBalanceMinutes: initialBalance
    }

    prismaMock.user.update.mockResolvedValue(existingUser)

    const result = await updateInitialBalance(userId, initialBalance)

    expect(result).toStrictEqual(existingUser)
    expect(prismaMock.user.update).toHaveBeenCalledWith({ 
      where: { 
        id: userId 
      },
      data: {
        initialBalanceMinutes: initialBalance
      }
    });

  })
})

describe('getInitialBalance', () => {
  it('should return user balance', async () => {
    const initialBalance = 120
    const userId = "uuid-existente-123"

    const existingUser = {
      id: userId,
      email: 'email@email.com',
      username: "um nome",
      passwordHash: "hash-existente",
      initialBalanceMinutes: initialBalance
    }

    prismaMock.user.findUnique.mockResolvedValue(existingUser)

    const result = await getInitialBalance(userId)

    expect(result).toBe(120)
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ 
      where: { 
        id: userId 
      }
    });
  })
})

