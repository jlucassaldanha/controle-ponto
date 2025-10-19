import z from "zod";
import { addPunchesSchema } from "./punch.validation";
import { prisma } from '@/lib/prisma'

type AddPunchDataType = z.infer<typeof addPunchesSchema>;

export async function addPunch(userId: string, punchData: AddPunchDataType) {
	

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