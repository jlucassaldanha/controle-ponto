'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import { updateUserPreferences } from "@/core/preferences/preferences.services";
import { updateUserPreferencesSchema } from "@/core/preferences/preferences.validation";
import z from "zod";

export type PreferencesFormState = {
	success: boolean;
	message?: string;
	errors?: {
		schedules?: string[] | undefined;
	};
}

export async function updatePreferencesAction(previousState: PreferencesFormState, formData: FormData) {
	const session = await auth()
	if (!session?.user?.id) {
		return { success: false, message: "Acesso negado." }
	}

	const schedulesPayload = formData.get('schedulesPayload')
	let parsedSchedules = []
	if (typeof schedulesPayload === 'string') {
		try {
			parsedSchedules = JSON.parse(schedulesPayload)
		} catch (e) {
			console.log(e)
			return { success: false, message: "erro ao processar os dados do formulario."}
		}
	}
	const dataToValidate = { schedules: parsedSchedules}

	const validateFormData = updateUserPreferencesSchema.safeParse(dataToValidate)

	if (!validateFormData.success) {
		return { success: false, errors: z.flattenError(validateFormData.error).fieldErrors }
	}

	try {
		await updateUserPreferences(session.user.id, validateFormData.data)
		return { success: true, message: "Configurações salvas com sucesso!"}
	} catch (error) {
		console.log(error)
		return { success: false, message: "Falha ao salvar as configurações."}
	}
}
