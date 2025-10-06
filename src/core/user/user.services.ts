import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { UserDataType } from "./user.types";
import { User as NextAuthUser } from "next-auth";
import type { User } from "@prisma/client"

export async function createUser(userData: UserDataType): Promise<User | null> {
  const userExist = await prisma.user.findUnique({
    where: {
      email: userData.email,
    },
  });

  if (!userExist) {
    const passwordHash = await bcrypt.hash(userData.password, 10);
    return await prisma.user.create({
      data: {
        email: userData.email,
        username: userData.username,
        passwordHash: passwordHash,
      },
    });
  }
  return null;
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