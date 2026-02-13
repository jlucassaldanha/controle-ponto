'use server'

import { addPunch, addPunches, upsertPunches } from "@/core/punch/punch.services"
import { addPunchesSchema } from "@/core/punch/punch.validation"
import { getCurrentUser } from "@/lib/session"
import { revalidatePath } from "next/cache"
import z from "zod"
import { addPunchesActionForm } from "./actions.types"
import { PunchType } from "@prisma/client"
import { PunchFieldType } from "@/components/punch/types"

export async function addPunchAction() {
	const session = await getCurrentUser()
	
	if (!session?.id) {
		return { success: false, message: "Acesso negado." }
	}

	try {
		const result =  await addPunch(session.id)

		if (result === null) {
			return {success: false, message: "Nenhum ponto adicionado."}
		}	
		
		revalidatePath('/punch/history')
		revalidatePath('/punch')

		return {success: true, data: result}
	} catch (error) {
		console.log(error)

		return { success: false, error: "Não foi possivel registrar o ponto por algum erro no servidor."}
	}
}

export async function upsertPunchesAction(punchesObj: Record<string, Date>) {
	const session = await getCurrentUser()
	
	if (!session?.id) {
		console.log("ERRO: Sem sessão");
		return { success: false, message: "Acesso negado." }
	}

	const updates = []
	const creates = []

	try {
		for (const [key, value] of Object.entries(punchesObj)) {
			if (!value || isNaN(new Date(value).getTime())) {
				return { success: false, error: `Data inválida recebida para o ponto ${key}` }
			}

			if (key.startsWith("TEMP::")) {
				const typeStr = key.split("::")[1]

				if (!Object.values(PunchType).includes(typeStr as PunchType)) {
					return { success: false, error: `Tipo de ponto inválido: ${typeStr}` }
				}

				const type = typeStr as PunchType

				creates.push({
					type,
					timestamp: value,
					userId: session.id
				})
			} else {
				updates.push({
					id: key,
					timestamp: value,
				})
			}
		}

		if (updates.length === 0 && creates.length === 0) {
			return { success: true, message: "Nada a alterar." }
		}
	
		await upsertPunches(updates, creates)

		revalidatePath("/punch/history");
		revalidatePath("/punch");

		return { success: true, message: "Ponto atualizado"}
	} catch (error) {
		console.log(error)

		return { success: false, error: "Não foi possivel atualizar o ponto por algum erro no servidor."}
	}
}

export async function addPunchesAction(previousState: addPunchesActionForm, formData: FormData) {
	const session = await getCurrentUser()

	if (!session?.id) {
		return { success: false, message: "Acesso negado." }
	}

	const punchesPayload = formData.get('punches')

	let parsedPunches = []
	if (typeof punchesPayload === 'string') {
		try {
			parsedPunches = JSON.parse(punchesPayload)
		} catch (error) {
			console.log(error)
			return { success: false, message: "erro ao processar os dados do formulario."}
		}
	}

	const formDataDate = formData.get('date')
	const validateFormData = addPunchesSchema.safeParse({ date: formDataDate, punches: parsedPunches })

	if (!validateFormData.success) {
		return { success: false, errors: z.flattenError(validateFormData.error).fieldErrors }
	}
	
	try {
		await addPunches(session.id, validateFormData.data)
		
		revalidatePath('/dashboard')

		return { success: true, message: "Registros de ponto salvos." }

	} catch (error) {
		console.log(error)
		if (error instanceof Error) {
			if (error.message.includes("Err1")) {
				return { success: false, message: "O tipo de ponto já está registrado para esse dia."}
			}
			if (error.message.includes("Err2")) {
				return { success: false, message: "Não foi possivel salvar as alterações."}
			}
		}
		return { success: false, message: "Falha ao registrar pontos."}
	}
}

export async function addPunchesDirectAction(data: { date: string, punches: PunchFieldType[] }) {
    const formData = new FormData();
    formData.append('date', data.date);
    formData.append('punches', JSON.stringify(data.punches));
    
    // Chama a action original passando um estado inicial vazio
	const response = await addPunchesAction({ success: false, message: "" }, formData);

	revalidatePath("/punch/history");
	revalidatePath("/punch");
    return response
}
