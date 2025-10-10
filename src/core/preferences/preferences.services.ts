import { prisma } from '@/lib/prisma'
import z from "zod";
import { updateUserPreferencesSchema } from "./preferences.validation";

export async function getUserPreferences(userId: string) {
	const userPreferences = prisma.config.findUnique({ 
		where: { 
			userId: userId 
		},
		include: {
			dailySchedules: true
		} 
	})
	return userPreferences
}

type UpdateConfigDataType = z.infer<typeof updateUserPreferencesSchema>;

export async function updateUserPreferences(userId: string, data: UpdateConfigDataType) {
	const userConfig = await prisma.config.findUnique({
		where: {
			userId: userId
		},
		select: {
			id: true
		}
	})

	if (!userConfig) {
		throw new Error('Configuração não encontrada')
	}

	const deleteOldSchedules = prisma.dailySchedule.deleteMany({
		where: {
			configId: userConfig.id
		}
	})

	const createNewSchedules = prisma.dailySchedule.createMany({
		data: data.schedules.map((schedule) => ({
			dayOfWeek: schedule.dayOfWeek,
			entryTime: schedule.entryTime,
			exitTime: schedule.exitTime,
			lunchStartTime: schedule.lunchStartTime,
			lunchEndTime: schedule.lunchEndTime,
			configId: userConfig.id,
		}))
	})

	try {
		const transactionResult = await prisma.$transaction([
			deleteOldSchedules,
			createNewSchedules,
		])

		return transactionResult
	} catch (error) {
		console.log(error)
		throw new Error("Não foi possivel salvar as configurações.")
	}
}