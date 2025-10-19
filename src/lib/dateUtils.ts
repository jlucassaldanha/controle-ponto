export function getADayInterval(date: Date) {
    const startOfDay = new Date(date)
	startOfDay.setUTCHours(0, 0, 0, 0)

	const endOfDay = new Date(startOfDay)
	endOfDay.setUTCDate(startOfDay.getUTCDate() + 1)

    return {
        startOfDay,
        endOfDay,
    }
}