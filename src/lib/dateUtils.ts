import { timeStamp } from "console"

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

export function formatDate(timestamp: Date) {
    const day = timestamp.getUTCDate().toString().padStart(2, '0')
	const month = (timestamp.getUTCMonth() + 1).toString().padStart(2, '0')
	const year = timestamp.getUTCFullYear()

	return `${day}/${month}/${year}`
}

export function formatTime(timestamp: Date) {
    const hours = timestamp.getUTCHours().toString().padStart(2, '0')
	const minutes = timestamp.getUTCMinutes().toString().padStart(2, '0')
	
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
    return dayNumberToKeyMap[timestamp.getUTCDay()]
}