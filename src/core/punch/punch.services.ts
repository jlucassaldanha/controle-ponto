import { prisma } from '@/lib/prisma'
import { getADayInterval } from "@/lib/dateUtils";
import { PunchType } from "@prisma/client";
import { AddPunchDataType } from "./punch.types";

export async function addPunch(userId: string) {
	const todayDate = new Date()

	try {
		const result = await prisma.$transaction(async (tx) => {
			const todayPunches = await getADayPunches(userId, todayDate)
			const punchCount = todayPunches.length

			if (punchCount === 0) {
				await tx.punch.create({
					data: {
						type: PunchType.CLOCK_IN,
						userId,
						timestamp: todayDate
					}
				})
			}

			if (punchCount === 1) {
				await tx.punch.create({
					data: {
						type: PunchType.CLOCK_OUT,
						userId,
						timestamp: todayDate
					}
				})
			}

			if (punchCount === 2) {
				const punchOut = todayPunches.find(punch => punch.type === PunchType.CLOCK_OUT)
				if (!punchOut) {
					throw new Error("Estado inválido: 2 pontos, mas sem CLOCK_OUT para atualizar.")
				}

				await tx.punch.update({
					where: { id: punchOut.id },
					data: { type: PunchType.START_LUNCH }
				})

				await tx.punch.create({
					data: {
						type: PunchType.END_LUNCH,
						userId,
						timestamp: todayDate
					}
				})
			}

			if (punchCount === 3) {
				await tx.punch.create({
					data: {
						type: PunchType.CLOCK_OUT,
						userId,
						timestamp: todayDate
					}
				})
			} 

			return null
		})
		
		return result

	} catch (error) {
		console.error(error);
    	throw new Error("Err2: Could not save punch.");
	}
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

export async function getFirstPunch(userId: string) {
	const firstPunch = await prisma.punch.findFirst({
		where: {
			userId: userId
		},
		orderBy: {
			timestamp: 'asc'
		}
	})

	return firstPunch
}

export async function upsertPunches(updates: {id: string, timestamp: Date}[], inserts: {type: PunchType, timestamp: Date, userId: string}[]) {
	const updatesOperations = updates.map((punch) => {
		return prisma.punch.update({
			where: {
				id: punch.id,
			},
			data: {
				timestamp: punch.timestamp
			}
		})
	})

	const insertsOperations = inserts.map((punch) => {
		return prisma.punch.create({
			data: {
				type: punch.type,
				timestamp: punch.timestamp,
				userId: punch.userId
			}
		})
	})

	await prisma.$transaction([
		...updatesOperations,
		...insertsOperations,
	])
}

export async function editPunchTime(punchId: string,  timestamp: Date) {
	const updatedPunch = await prisma.punch.update({
		where: {
			id: punchId,
		},
		data: {
			timestamp
		}
	})

	return updatedPunch
}