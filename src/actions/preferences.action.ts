'use server'

import { auth } from "@/app/api/auth/[...nextauth]/route";
import { updateUserPreferences } from "@/core/preferences/preferences.services";
import { updateUserPreferencesSchema } from "@/core/preferences/preferences.validation";
import z from "zod";

export type PreferencesFormState = {
	success: boolean;
	message?: string;
	errors?: {
		entryTime?: string[] | undefined;
		exitTime?: string[] | undefined;
		lunchStartTime?: string[] | undefined;
		lunchEndTime?: string[] | undefined;
	};
}

export async function updatePreferencesAction(previousState: PreferencesFormState, formData: FormData) {
	const session = await auth()
	if (!session?.user?.id) {
		return { success: false, message: "Acesso negado." }
	}

	const validateFormData = updateUserPreferencesSchema.safeParse(Object.fromEntries(formData))

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
