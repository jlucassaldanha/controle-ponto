import { describe, it, expect } from "vitest";
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import prismaMock from "@/test/setup";
import { findUser, findOrCreateUser } from "./userServices";
import { UserDataType } from "../types/user.types";

vi.mock('bcryptjs');

describe('findUser', () => {
	it('should return user object if find on db', async () => {
		const mockUser = {
			id: 'uuid-123',
			username: 'User Test',
			email: 'test@test.com',
			passwordHash: 'hash-secret'
		}

		prismaMock.user.findUnique.mockResolvedValue(mockUser)

		const result = await findUser(mockUser.email)
		
		expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
			where: {
				email: mockUser.email
			}
		})

		expect(result).toEqual(mockUser)
	})

	it('should return null when user not found', async () => {
		prismaMock.user.findUnique.mockResolvedValue(null)

		const result = await findUser('teste@teste.com')

		expect(result).toBeNull()
	})
})

describe('createNewUser', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create and return a new user if the email does not exist', async () => {
    const userData: UserDataType = {
      email: 'novo@exemplo.com',
      username: 'Usuario Novo',
      password: 'senha-nova-123'
    };
    const mockPasswordHash = 'hash-novo-gerado';
    const createdUser = {
      id: 'uuid-novo-456',
      email: userData.email,
      username: userData.username,
      passwordHash: mockPasswordHash
    };

    prismaMock.user.findUnique.mockResolvedValue(null);
    (bcrypt.hash as vi.Mock).mockResolvedValue(mockPasswordHash);
    prismaMock.user.create.mockResolvedValue(createdUser);

    const result = await findOrCreateUser(userData);

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { email: userData.email } });
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
  
  it('should return null if the user already exists', async () => {
    const userData: UserDataType = {
      email: 'existente@exemplo.com',
      username: 'Usuario Existente',
      password: 'senha-qualquer'
    };
    const existingUser = {
      id: 'uuid-existente-123',
      email: userData.email,
      username: userData.username,
      passwordHash: 'hash-existente'
    };

    prismaMock.user.findUnique.mockResolvedValue(existingUser);

    const result = await findOrCreateUser(userData);

    expect(result).toBeNull();
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({ where: { email: userData.email } });
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });
});