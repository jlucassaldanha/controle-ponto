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
  const config = await prisma.config.upsert({
    where: { userId: userId },
    update: {}, 
    create: { userId: userId }, 
  });

  const configId = config.id;

  const deleteOldSchedules = prisma.dailySchedule.deleteMany({
    where: { configId: configId },
  });

  const createNewSchedules = prisma.dailySchedule.createMany({
    data: data.schedules.map((schedule) => ({
      ...schedule,
      configId: configId,
    })),
  });

  try {
    await prisma.$transaction([
      deleteOldSchedules,
      createNewSchedules,
    ]);
  } catch (error) {
    console.error("Failed to update preferences transaction:", error);
    throw new Error("Could not save preferences.");
  }
}