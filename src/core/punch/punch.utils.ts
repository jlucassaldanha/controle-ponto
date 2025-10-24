import { $Enums, PunchType, type Punch } from "@prisma/client";
import { GroupedPunchesType } from "./punch.services";
import { formatTime } from "@/lib/dateUtils";
import { minutesToTimeString } from "@/lib/timeFormater";

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

export function overtimeUndertime(workTime: number, workedTime: number) {
	const overtime = workedTime - workTime
	const timeStr = minutesToTimeString(Math.abs(overtime))

	const underOver = isUnderOver(overtime)
	return {
		...underOver,
		timeStr,
	}	
}

export function isUnderOver(time: number) {
	if (time < 0) { 
		return {
			overtime: false,
			undertime: true,
			time: time,
		}
	} else if (time > 0) {
		return {
			overtime: true,
			undertime: false,
			time: time,
		}
	} else {
		return {
			overtime: false,
			undertime: false,
			time: time,
		}
	}
}

type PunchesPerDayType = {
    workedTime: {
        timeString: string;
        time: number;
    };
    date: string;
    dayOfWeek: {
        dayString: string;
        day: number;
    };
    punches: {
        id: string;
        userId: string;
        timestamp: Date;
        type: $Enums.PunchType;
    }[];
}

export function getTotalOvertime(punches: PunchesPerDayType[], schedules: {dayOfWeek: number; workTime: number;}[]) {
	const total = punches.reduce((accumulator, day) => {
		const daySchedule = schedules.find((schedule) => schedule.dayOfWeek === day.dayOfWeek.day)

		const workTime = daySchedule ? daySchedule.workTime : 0
		const overUnder = overtimeUndertime(workTime, day.workedTime.time)
		
		return accumulator + overUnder.time
	}, 0)

	const timeStr = minutesToTimeString(Math.abs(total))

	const underOver = isUnderOver(total)

	return {
		...underOver,
		timeStr,
	}
}