import { ConfigDataType } from "./preferences.types";
import { prisma } from '@/lib/prisma'
import type { Config } from "@prisma/client";

export async function getUserPreferences(userId: string): Promise<Config | null> {
	const userPreferences = prisma.config.findUnique({ 
		where: { 
			userId: userId 
		} 
	})
	return userPreferences
}

export async function updateUserPreferences(userId: string, data: ConfigDataType): Promise<Config | null> {
	const updatedConfig = await prisma.config.upsert({
		where: {
			userId: userId
		},
		update: {
			...data
		},
		create: {
			userId: userId,
			...data
		}
	})

	return updatedConfig
}