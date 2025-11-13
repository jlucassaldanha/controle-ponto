import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { UserDataType } from "./user.types";
import { User as NextAuthUser } from "next-auth";
import type { User } from "@prisma/client"

export async function findUserByEmail(email: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      email: email,
    }
  });
}

export async function createUser(userData: UserDataType): Promise<User> {
  const passwordHash = await bcrypt.hash(userData.password, 10);

  return await prisma.user.create({
    data: {
      email: userData.email,
      username: userData.username,
      passwordHash: passwordHash,
    },
  });
}

export async function validateCredentials(email: string, password: string): Promise<NextAuthUser | null> {
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || !user.passwordHash) {
    return null
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (isPasswordCorrect) {
    const { passwordHash: _, ...userWithoutHash } = user
    return userWithoutHash
  }

  return null
}

export async function updateInitialBalance(userId: string, initialBalance: number) {
  const user = await prisma.user.update({ 
    where: { 
      id: userId 
    },
    data: {
      initialBalanceMinutes: initialBalance
    }
  })

  return user
}

export async function getInitialBalance(userId: string) {
  const user = await prisma.user.findUnique({ 
    where: { 
      id: userId 
    }
  })

  if (!user) {
    return 0
  }
  
  return user.initialBalanceMinutes
}