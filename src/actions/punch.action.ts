'use server'
import { addPunches } from "@/core/punch/punch.services"
import { addPunchesSchema } from "@/core/punch/punch.validation"
import { getCurrentUser } from "@/lib/session"
import { revalidatePath } from "next/cache"
import z from "zod"

type addPunchesActionForm = {
	success: boolean;
    errors: {
        date?: string[] | undefined;
        punches?: string[] | undefined;
    };
    message?: string;
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
			return { succes: false, message: "erro ao processar os dados do formulario."}
		}
	}

	const validateFormData = addPunchesSchema.safeParse(parsedPunches)

	if (!validateFormData.success) {
		return { success: false, errors: z.flattenError(validateFormData.error).fieldErrors }
	}

	try {
		await addPunches(session.id, validateFormData.data)
		
		revalidatePath('/dashboard')

		return { success: true, message: "Registros de ponto salvos." }

	} catch (error) {
		console.log(error)
		return { success: false, message: "Falha ao registrar pontos."}
	}
}