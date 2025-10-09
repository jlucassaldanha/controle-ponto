export function minutesToTimeString(totalMinutes: number | null | undefined): string {
	if (totalMinutes === null || totalMinutes === undefined || totalMinutes < 0) {
		return ''
	}

	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60

	const formattedHours = String(hours).padStart(2, '0')
	const formattedMinutes = String(minutes).padStart(2, '0')

	return `${formattedHours}:${formattedMinutes}`
}