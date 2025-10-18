import { z } from 'zod'

export const timeStringSchema = z.string()
	.regex(/^\d{2}:\d{2}$/, { message: "Horario deve estar no formato HH:MM." })
	.transform((time) => {
		const [hours, minutes] = time.split(':').map(Number)

		if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
			return -1
		}
		return hours * 60 + minutes
	})
	.refine((minutes) => minutes >= 0, { message: "Horário inválido." })

export const dateStringSchema = z.string()
	.regex(/^\d{2}\/\d{2}\/\d{4}$/, { message: "Data deve estar no formato dd/mm/aaaa." })
	.transform((date) => {
		const [day, month, year] = date.split('/').map(Number)
		const jsDate = new Date(Date.UTC(year, month - 1, day))

		if (isNaN(jsDate.getTime())) {
			return NaN
		}

		const msTimeStamp = jsDate.getTime()

		return (msTimeStamp / 1000) / 60
	})
	.refine(minutes => !isNaN(minutes), { message: "Data inválida." })

export const punchSchema = z.object({
	date: dateStringSchema,
	time: timeStringSchema,
	type: z.string(),
})


export const addPunchesSchema = z.object({
	punches: z.array(punchSchema),
})