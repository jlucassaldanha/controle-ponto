import { prisma } from '@/lib/prisma'
import { UpdateConfigDataType } from './preferences.types';

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