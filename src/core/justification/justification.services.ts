import { prisma } from "@/lib/prisma"

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

export async function getJustifications(userId: string) {
	try {
		const justifications = await prisma.justification.findMany({
			where: { 
				id: userId
			}
		})

		return justifications
	} catch (error) {
		throw new Error("Try to find justifications: " + error)
	}
}