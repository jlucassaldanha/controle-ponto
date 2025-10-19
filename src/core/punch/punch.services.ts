import z from "zod";
import { addPunchesSchema } from "./punch.validation";
import { prisma } from '@/lib/prisma'
import { getADayInterval } from "@/lib/dateUtils";

type AddPunchDataType = z.infer<typeof addPunchesSchema>;

export async function addPunches(userId: string, punchData: AddPunchDataType) {
	const dbPunches = await getADayPunches(userId, punchData.date)

	const dbPunchesWithoutIds = dbPunches.map((punch) => ({
		timestamp: punch.timestamp,
		type: punch.type
	}))

	const allPunches = [ ...dbPunchesWithoutIds, ...punchData.punches ]
	const allTypes = allPunches.map((punch) => punch.type)
	
	const uniqueTypes = new Set(allTypes)

	if (allPunches.length !== uniqueTypes.size) {
		throw new Error('Tipos de pontos duplicados.')
	}

	try {
		await prisma.punch.createMany({
			data: punchData.punches.map((punch) => ({
				timestamp: punch.timestamp,
				type: punch.type,
				userId
			}))
		})
	} catch (error) {
    	console.error(error);
    	throw new Error("Could not save punch.");
  	}

}

export async function getADayPunches(userId: string, date: Date) {
	const { startOfDay, endOfDay } = getADayInterval(date)

	return await prisma.punch.findMany({
		where: {
			userId: userId,
			timestamp: {
				gte: startOfDay,
				lt: endOfDay,
			},
		},
		orderBy: {
			timestamp: 'asc',
		},
	})
}