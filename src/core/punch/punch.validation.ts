import { z } from 'zod'
import { PunchType } from "@prisma/client"

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

		return jsDate
	})

export const punchSchema = z.object({
	date: dateStringSchema,
	time: timeStringSchema,
	type: z.enum([
		PunchType.CLOCK_IN,
		PunchType.START_LUNCH,
		PunchType.END_LUNCH,
		PunchType.CLOCK_OUT,
	]),
})
.transform((punch) => {
	const date = new Date(punch.date.getTime() + (punch.time * 60000))

	return {
		timestamp: date,
		type: punch.type
	}
})


export const addPunchesSchema = z.object({
	punches: z.array(punchSchema),
})