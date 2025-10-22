import z from "zod";
import { addPunchesSchema } from "./punch.validation";
import { prisma } from '@/lib/prisma'
import { formatDate, getADayInterval, getDayOfWeek } from "@/lib/dateUtils";
import { Punch, PunchType } from "@prisma/client";
import { minutesToTimeString } from "@/lib/timeFormater";
import { getPunchTimestampMinutes } from "./punch.utils";

type AddPunchDataType = z.infer<typeof addPunchesSchema>;

export type GroupedPunchesType = {
		date: string,
		dayOfWeek: {
			dayString: string,
			day: number
		},
		punches: Punch[],
	}

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

	const groupedPunches = allPunches.reduce((accumulator, punch) => {
		const date = formatDate(punch.timestamp)
		

		if (!accumulator[date]) {
			const dayOfWeek = getDayOfWeek(punch.timestamp)

			accumulator[date] = {
				dayOfWeek: {
					dayString: dayOfWeek,
					day: punch.timestamp.getUTCDay()
				},
				date,
				punches: []
			}
		}

		accumulator[date].punches.push(punch)

		return accumulator

	}, {} as Record<string, GroupedPunchesType>) 
	
	const punchesArray = Object.values(groupedPunches).reverse()

	const result = punchesArray.map((punchesObj) => {
		const clockIn = getPunchTimestampMinutes(punchesObj, PunchType.CLOCK_IN)
		const clockOut = getPunchTimestampMinutes(punchesObj, PunchType.CLOCK_OUT)
		const journeyTime = clockOut - clockIn
		
		const lunchIn = getPunchTimestampMinutes(punchesObj, PunchType.START_LUNCH)
		const lunchOut = getPunchTimestampMinutes(punchesObj, PunchType.END_LUNCH)
		const lunchTime = lunchOut - lunchIn

		const workedTime = journeyTime - lunchTime

		const workedTimeString = minutesToTimeString(workedTime)

		return {
			...punchesObj,
			workedTime: {
				timeString: workedTimeString,
				time: workedTime,
			}
		}
	})
	
	return result
}