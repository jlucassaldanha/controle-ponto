import { minutesToTimeString } from "@/lib/timeFormater"
import { $Enums, PunchType, type Punch } from "@prisma/client";

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

export default async function getWorkdayBalanceReport(params:type) {
	
}