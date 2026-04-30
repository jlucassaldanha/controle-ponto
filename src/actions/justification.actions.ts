"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { deleteJustification, findJustificationByDate, upsertJustification } from "@/core/justification/justification.services"
import { revalidatePath } from "next/cache"

export async function fullDayJustificationAction(dateString: string, time: number, message: string) {
	const session = await auth()
	
	if (!session?.user?.id) {
		return { success: false, message: "Acesso negado." }
	}

	const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day, 0, 0, 0);

	try {
		const existingJustification = await findJustificationByDate(session.user.id, date)
		
		if (existingJustification) {
			await deleteJustification(existingJustification.id)
		} else {
			await upsertJustification(session.user.id, date, time, message)
		}
		
		revalidatePath("/punch/history")
		return { success: true, message }
	} catch (error) {
		console.log(error)
		return { success: false, message: "Erro ao tentar salvar abono"}
	}
}