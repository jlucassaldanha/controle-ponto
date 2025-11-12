'use server'
import { auth } from "@/app/api/auth/[...nextauth]/route";
import { updateUserPreferences } from "@/core/preferences/preferences.services";
import { balanceTimeSchema, updateUserPreferencesSchema } from "@/core/preferences/preferences.validation";
import { updateInitialBalance } from "@/core/user/user.services";
import z from "zod";

export type PreferencesFormState = {
	success: boolean;
	message?: string;
	errors?: {
		schedules?: string[] | undefined;
	};
}

export type BalanceTimeFormState = {
	success: boolean;
	message?: string;
	errors?: {
		time?: string[] | undefined;
	};
}

const dayKeyToNumberMap: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export async function updatePreferencesAction(previousState: PreferencesFormState, formData: FormData) {
	const session = await auth()

	if (!session?.user?.id) {
		return { success: false, message: "Acesso negado." }
	}

	const schedulesPayload = formData.get('schedulesPayload')

	let parsedRules = []
	if (typeof schedulesPayload === 'string') {
		try {
			parsedRules = JSON.parse(schedulesPayload)
		} catch (error) {
			console.log(error)
			return { success: false, message: "erro ao processar os dados do formulario."}
		}
	}

	const dailySchedulesForValidation = []

	for (const rule of parsedRules) {
		for (const dayKey in rule.days) {
			if (rule.days[dayKey] === true) {
				dailySchedulesForValidation.push({
				dayOfWeek: dayKeyToNumberMap[dayKey], 
				entryTime: rule.entryTime,
				exitTime: rule.exitTime,
				lunchStartTime: rule.lunchStartTime,
				lunchEndTime: rule.lunchEndTime,
				});
			}
		}
  	}

	const dataToValidate = { schedules: dailySchedulesForValidation,}
	
	const validateFormData = updateUserPreferencesSchema.safeParse(dataToValidate)
	
	if (!validateFormData.success) {
		return { success: false, errors: z.flattenError(validateFormData.error).fieldErrors }
	}

	try {
		await updateUserPreferences(session.user.id, validateFormData.data)
		console.log("Configurações salvas com sucesso!")
	
		return { success: true, message: "Configurações salvas com sucesso!"}
	} catch (error) {
		console.log(error)
		return { success: false, message: "Falha ao salvar as configurações."}
	}
}

export async function updateInitialBalanceAction(previousState: BalanceTimeFormState, formData: FormData) {
	const session = await auth()

	if (!session?.user?.id) {
		return { success: false, message: "Acesso negado." }
	} 

	const rawData = Object.fromEntries(formData)

	const validateFormData = balanceTimeSchema.safeParse(rawData)

	if (!validateFormData.success) {
		return { success: false, errors: z.flattenError(validateFormData.error).fieldErrors }
	}

	try {
		await updateInitialBalance(session.user.id, validateFormData.data.time)

		return { success: true, message: "Configurações salvas com sucesso!" }
	} catch (error) {
		console.log(error)
		return { success: false, message: "Falha ao salvar as configurações."}
	}
}
