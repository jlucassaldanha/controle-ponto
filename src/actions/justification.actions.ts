"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { createJustification, deleteJustification, findJustification, findJustificationByDate, upsertJustification } from "@/core/justification/justification.services"
import { revalidatePath } from "next/cache"

export async function fullDayJustificationAction(date: Date, time: number) {
	const session = await auth()
	
	if (!session?.user?.id) {
		return { success: false, message: "Acesso negado." }
	}

	try {
		const existingJustification = await findJustificationByDate(session.user.id, date)
		let message: string
		if (existingJustification) {
			await upsertJustification(session.user.id, date, 0, "no justification")
			message = "Abono apagado"
		} else {
			await upsertJustification(session.user.id, date, 1, "dia inteiro")
			message = "Abono criado"
		}
		
		revalidatePath("/punch/history")
		return { success: true, message }
	} catch (error) {
		console.log(error)
		return { success: false, message: "Erro ao tentar salvar abono"}
	}
}