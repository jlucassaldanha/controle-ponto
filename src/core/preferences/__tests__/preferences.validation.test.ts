import { dailyScheduleSchema, timeStringSchema } from "../preferences.validation"

beforeEach(() => {
  vi.clearAllMocks();
});

describe('timeStringSchema', () => {
	it('should have success if formData is correct', () => {
		const res = timeStringSchema.safeParse('01:00')
		expect(res.success).toBe(true)
	})

	it('should fail if formData its not in correct format', () => {
		const res = timeStringSchema.safeParse('1,1')
		
		expect(res.success).toBe(false)

		if (!res.success) {
			const err = res.error.issues[0].message
			expect(err).toBe('Horario deve estar no formato HH:MM.')
		}
	})

	it('should fail if time dont make sense', () => {
		const res = timeStringSchema.safeParse('25:00')

		expect(res.success).toBe(false)
		
		if (!res.success) {
			const err = res.error.issues[0].message
			expect(err).toBe("Horário inválido.")
		}
	})
})

describe('dailyScheduleSchema', () => {
	it('should success if formData is corret', () => {
		const data = {
			dayOfWeek: 1,
			entryTime: "08:00",
			exitTime: "18:00",
			lunchStartTime: "12:00",
			lunchEndTime: "13:00",
		}

		const res = dailyScheduleSchema.safeParse(data)

		expect(res.success).toBe(true)
	})
	
	it('should fail if exit time is before entry time', () => {
		const data = {
			dayOfWeek: 1,
			entryTime: "08:00",
			exitTime: "07:00",
			lunchStartTime: "12:00",
			lunchEndTime: "13:00",
		}

		const res = dailyScheduleSchema.safeParse(data)

		expect(res.success).toBe(false)

		if (!res.success) {
			const err = res.error.issues.find((issue) => issue.path[0] === "exitTime")
			expect(err?.message).toBe("O horario de saida deve ser posterior ao de entrada.")
		}
	})
	
	it('should fail if lunch exit time is before lunch entry time', () => {
		const data = {
			dayOfWeek: 1,
			entryTime: "08:00",
			exitTime: "18:00",
			lunchStartTime: "12:00",
			lunchEndTime: "11:00",
		}
		
		const res = dailyScheduleSchema.safeParse(data)

		expect(res.success).toBe(false)

		if (!res.success) {
			const err = res.error.issues.find((issue) => issue.path[0] === "lunchEndTime")
			expect(err?.message).toBe("O fim do almoço deve ser posterior ao inicio.")
		}
	})
	
	it('should fail if lunch is out of work time range', () => {
		const data = {
			dayOfWeek: 1,
			entryTime: "08:00",
			exitTime: "18:00",
			lunchStartTime: "05:00",
			lunchEndTime: "08:00",
		}
		
		const res = dailyScheduleSchema.safeParse(data)

		expect(res.success).toBe(false)
		
		if (!res.success) {
			const err = res.error.issues.find((issue) => issue.path[0] === "lunchStartTime")
			expect(err?.message).toBe("O intervalo de almoço deve estar dentro do expediente.")
		}
	})
})