import { $Enums } from "@prisma/client";
import {  groupPunchesByDay } from "./punch.services";
import { minutesToTimeString } from "@/lib/timeFormater"
import { getDailySchedulesTime } from "../preferences/preferences.utils";
import { formatDate, getDayOfWeek } from "@/lib/dateUtils";

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

type dailySchedulesTimeType = ReturnType<typeof getDailySchedulesTime>[number]

export async function getWorkdayBalanceReport(userId: string, initialDate: Date, finalDate: Date, dailySchedulesTime: dailySchedulesTimeType[]) {
	const punchesPerDay = await groupPunchesByDay(userId)
	
	const punchesPerDayMap = new Map<string, PunchesPerDayType>(
		punchesPerDay.map(day => [day.date, day])
	)
	const dailySchedulesTimeMap = new Map<number, dailySchedulesTimeType>(
		dailySchedulesTime.map(day => [day.dayOfWeek, day])
	)

	const currentDate = initialDate
	const finalReportList = []
	while (currentDate <= finalDate) {
		const currentDay = currentDate.getUTCDay()
		if (dailySchedulesTimeMap.has(currentDay)) {
			const currentDateString = formatDate(currentDate)
			const currentDayString = getDayOfWeek(currentDate)

			const dayPunch = punchesPerDayMap.get(currentDateString)

			if (dayPunch) {
				finalReportList.push(dayPunch)
			} else {
				finalReportList.push({
					workedTime: {
						timeString: "00:00",
						time: 0,
					},
					date: currentDateString,
					dayOfWeek: {
						dayString: currentDayString,
						day: currentDay,
					},
					punches: []
				})
			}
		}
		currentDate.setDate(currentDate.getDate() + 1)
	}

	return finalReportList
}