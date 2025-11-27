export function getADayInterval(date: Date) {
    const startOfDay = new Date(date)
	startOfDay.setHours(0, 0, 0, 0)

	const endOfDay = new Date(startOfDay)
	endOfDay.setDate(startOfDay.getDate() + 1)

    return {
        startOfDay,
        endOfDay,
    }
}

export function formatDate(timestamp: Date) {
    const day = timestamp.getDate().toString().padStart(2, '0')
	const month = (timestamp.getMonth() + 1).toString().padStart(2, '0')
	const year = timestamp.getFullYear()

	return `${day}/${month}/${year}`
}

export function formatTime(timestamp: Date) {
    const hours = timestamp.getHours().toString().padStart(2, '0')
	const minutes = timestamp.getMinutes().toString().padStart(2, '0')
	
    return `${hours}:${minutes}`
}

export function getDayOfWeek(timestamp: Date) {
    const dayNumberToKeyMap: { [key: number]: string } = {
        0: 'Dom', 
        1: 'Seg', 
        2: 'Ter', 
        3: 'Qua',
        4: 'Qui', 
        5: 'Sex', 
        6: 'Sáb',
    }
    return dayNumberToKeyMap[timestamp.getDay()]
}

// time formater
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
