import { prisma } from "@/lib/prisma"

export async function upsertJustification(userId: string, date: Date, time: number, reason: string) {
	try {
		await prisma.justification.upsert({
			where: {
				userId_date: {
					userId,
					date
				}
			},
			update: {
				minutes: time,
				reason
			},
			create: {
				userId,
				date,
				minutes: time,
				reason: "Dia inteiro"
			}
		})
	} catch (error) {
		throw new Error("Try to upsert justification: " + error)
	}
}

export async function createJustification(userId: string, date: Date, time: number) {
	try {
		await prisma.justification.create({
			data: {
				userId,
				date,
				minutes: time,
				reason: "Dia inteiro"
			}
		})
	} catch (error) {
		throw new Error("Try to create justification: " + error)
	}
}

export async function deleteJustification(id: string) {
	try {
		await prisma.justification.delete({
			where: { id }
		})
	} catch (error) {
		throw new Error("Try to delete justification: " + error)
	}
}

export async function findJustification(userId: string, date: Date) {
	try {
		const justification = await prisma.justification.findUnique({
			where: { 
				userId_date: {
					userId,
					date
				} 
			}
		})

		return justification
	} catch (error) {
		throw new Error("Try to find justification: " + error)
	}
}

export async function findJustificationByDate(userId: string, date: Date) {
	try {
		const justification = await prisma.justification.findFirst({
			where: { 
				userId,
				date: {
					gte: new Date(date.setHours(0, 0, 0, 0)),
					lt: new Date(date.setHours(24, 0, 0, 0)),
				} 
			}
		})

		return justification
	} catch (error) {
		throw new Error("Try to find justification: " + error)
	}
}

export async function getJustifications(userId: string) {
	try {
		const justifications = await prisma.justification.findMany({
			where: { 
				userId
			}
		})

		return justifications
	} catch (error) {
		throw new Error("Try to find justifications: " + error)
	}
}

export async function getJustificationsByDateRange(userId: string, initialDate: Date, finalDate: Date,) {
	try {
		const justifications = await prisma.justification.findMany({
			where: {
				userId,
				date: {
					gte: initialDate,
					lte: finalDate,
				},
			}
		})

		return justifications
	} catch (error) {
		throw new Error("Try to find justifications in day range: " + error)
	}
}