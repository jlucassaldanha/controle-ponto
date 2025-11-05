import { PunchType, type Punch } from "@prisma/client";
import { GroupedPunchesType } from "./punch.services";
import { formatTime } from "@/lib/dateUtils";

const dayNumberToKeyMap: { [key: number]: string } = {
  0: 'Dom', 
  1: 'Seg', 
  2: 'Ter', 
  3: 'Qua',
  4: 'Qui', 
  5: 'Sex', 
  6: 'Sáb',
}

export function formatPunchDateTime(punch: Punch) {
	const day = punch.timestamp.getUTCDate().toString().padStart(2, '0')
	const month = (punch.timestamp.getUTCMonth() + 1).toString().padStart(2, '0')
	const year = punch.timestamp.getUTCFullYear()
	const date = `${day}/${month}/${year}`

	const hours = punch.timestamp.getUTCHours().toString().padStart(2, '0')
	const minutes = punch.timestamp.getUTCMinutes().toString().padStart(2, '0')
	const time = `${hours}:${minutes}`

	const dayOfWeek = dayNumberToKeyMap[punch.timestamp.getUTCDay()]

	return { date, dayOfWeek, time, }
}

export function getPunchTimestampMinutes(punchesObj: GroupedPunchesType, type: PunchType) {
	const punch = punchesObj.punches.find((punch) => punch.type === type)
	
	if (!punch) {
		return 0
	}

	const minutes = punch.timestamp.getMinutes()
	const hours = punch.timestamp.getHours()

	return hours * 60 + minutes
}

export function getPunchTime(punches: Punch[], type: PunchType) {
	const punch = punches.find((punch) => ( punch.type === type ))
	if (punch) {
		return formatTime(punch.timestamp)
	}
}