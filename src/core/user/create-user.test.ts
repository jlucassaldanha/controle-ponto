import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import prismaMock from "@/test/setup";
import * as findUserMod from './find-user';
import { findOrCreateUser, UserDataType } from './create-user';

vi.mock('bcryptjs');

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

    const findUserSpy = vi.spyOn(findUserMod, 'findUser').mockResolvedValue(null);
    (bcrypt.hash as vi.Mock).mockResolvedValue(mockPasswordHash);
    prismaMock.user.create.mockResolvedValue(createdUser);

    const result = await findOrCreateUser(userData);

    expect(findUserSpy).toHaveBeenCalledWith(userData.email);
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

    const findUserSpy = vi.spyOn(findUserMod, 'findUser').mockResolvedValue(existingUser);

    const result = await findOrCreateUser(userData);

    expect(result).toBeNull();
    expect(findUserSpy).toHaveBeenCalledWith(userData.email);
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });
});