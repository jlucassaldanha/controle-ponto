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
	time: timeStringSchema,
	type: z.enum([
		PunchType.CLOCK_IN,
		PunchType.START_LUNCH,
		PunchType.END_LUNCH,
		PunchType.CLOCK_OUT,
	]),
})

export const addPunchesSchema = z.object({
	date: dateStringSchema,
	punches: z.array(punchSchema),
})
	.transform((addPunchesSchema) => {
		const newPunches = addPunchesSchema.punches.map((punch) => {
			return {
				type: punch.type, 
				timestamp: new Date(addPunchesSchema.date.getTime() + (punch.time * 60000))
			}
		})

		return {
			date: addPunchesSchema.date,
			punches: newPunches
		}
	})
	.refine((addPunchesSchema) => {
		const types = addPunchesSchema.punches.map((punche) => punche.type)
		const uniqueTypes = new Set(types)

		return uniqueTypes.size === types.length
	}, { message: "Não deve haver pontos repetidos para o mesmo dia."})
	.refine((addPunchesSchema) => {
		if (addPunchesSchema.punches.length === 0) {
			return true
		}

		const sortedPunches = [ ...addPunchesSchema.punches ].sort((a, b) => {
			return a.timestamp.getTime() - b.timestamp.getTime()
		})

		if (sortedPunches[0].type !== PunchType.CLOCK_IN) {
			return false
		}

		
		for (let i = 1; i < sortedPunches.length; i++) {
			const prevType = sortedPunches[i - 1].type
			const currentType = sortedPunches[i].type

			if (prevType === PunchType.CLOCK_IN && currentType !== PunchType.START_LUNCH && currentType !== PunchType.CLOCK_OUT) {
				return false
			}

			if (prevType === PunchType.START_LUNCH && currentType !== PunchType.END_LUNCH) {
				return false
			}

			if (prevType === PunchType.END_LUNCH && currentType !== PunchType.CLOCK_OUT) {
				return false
			}

			if (prevType === PunchType.CLOCK_OUT) {
				return false
			}
		}

		return true
	}, { message: "A sequência de pontos é inválida."})