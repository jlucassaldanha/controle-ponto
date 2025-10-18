import z from "zod";
import { addPunchesSchema } from "./punch.validation";
import { prisma } from '@/lib/prisma'

type AddPunchDataType = z.infer<typeof addPunchesSchema>;

export async function addPunch(userId: string, punchData: AddPunchDataType) {
	const addNewPunch = prisma.punch.createMany({
		data: punchData.punches.map((punch) => ({
			timestamp: punch.time + punch.date,
			type: punch.type,
			userId
		}))
	})
}