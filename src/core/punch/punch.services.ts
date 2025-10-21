import z from "zod";
import { addPunchesSchema } from "./punch.validation";
import { prisma } from '@/lib/prisma'
import { formatDate, getADayInterval, getDayOfWeek } from "@/lib/dateUtils";
import { Punch } from "@prisma/client";

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
		throw new Error('Err1: Duplicated punch types.')
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
    	throw new Error("Err2: Could not save punch.");
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

export async function getPunches(userId: string) {
	return await prisma.punch.findMany({
		where: {
			userId: userId
		},
		orderBy: {
			timestamp: 'desc',
		},
	})
}

export async function groupPunchesByDay(userId: string) {
	const allPunches = await getPunches(userId)

	if (allPunches.length === 0) {
        return [] 
    }

	type GroupedPunchesType = {
		date: string,
		dayOfWeek: string,
		punches: Punch[],
	}

	const groupedPunches = allPunches.reduce((accumulator, punch) => {
		const date = formatDate(punch.timestamp)
		

		if (!accumulator[date]) {
			const dayOfWeek = getDayOfWeek(punch.timestamp)

			accumulator[date] = {
				dayOfWeek,
				date,
				punches: []
			}
		}

		accumulator[date].punches.push(punch)

		return accumulator

	}, {} as Record<string, GroupedPunchesType>) 

	const result = Object.values(groupedPunches).reverse()

	return result
}