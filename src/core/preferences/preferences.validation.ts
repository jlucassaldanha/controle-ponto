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

export const dailyScheduleSchema = z.object({
	dayOfWeek: z.number(),
	entryTime: timeStringSchema,
	exitTime: timeStringSchema,
	lunchStartTime: timeStringSchema,
	lunchEndTime: timeStringSchema,
})
.refine((data) => data.exitTime > data.entryTime, {
	message: "O horario de saida deve ser posterior ao de entrada.",
	path: ["exitTime"],
})
.refine((data) => data.lunchEndTime > data.lunchStartTime, {
	message: "O fim do almoço deve ser posterior ao inicio.",
	path: ["lunchEndTime"],
})
.refine((data) => data.lunchStartTime >= data.entryTime && data.lunchEndTime <= data.exitTime, {
    message: "O intervalo de almoço deve estar dentro do expediente.",
    path: ["lunchStartTime"],
});

export const updateUserPreferencesSchema = z.object({
	schedules: z.array(dailyScheduleSchema),
})