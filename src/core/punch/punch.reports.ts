import { groupPunchesByDay } from "./punch.services";
import { minutesToTimeString } from "@/lib/timeFormater"
import { formatDate, getDayOfWeek } from "@/lib/dateUtils";
import { dailySchedulesTimeType, PunchesPerDayType } from "./punch.types";
import { isUnderOver } from "./punch.utils";

export function overtimeUndertime(workTime: number, workedTime: number) {
	const overtime = workedTime - workTime
	const timeStr = minutesToTimeString(Math.abs(overtime))

	const underOver = isUnderOver(overtime)
	return {
		...underOver,
		timeStr,
	}	
}

export function getTotalOvertime(punches: PunchesPerDayType[], schedules: {dayOfWeek: number; workTime: number;}[], initialBalance: number) {
	const punchesSum = punches.reduce((accumulator, day) => {
		const daySchedule = schedules.find((schedule) => schedule.dayOfWeek === day.dayOfWeek.day)

		const workTime = daySchedule ? daySchedule.workTime : 0
		const overUnder = overtimeUndertime(workTime, day.workedTime.time)
		
		return accumulator + overUnder.time
	}, 0)
	const total = punchesSum + initialBalance
	const timeStr = minutesToTimeString(Math.abs(total))

	const underOver = isUnderOver(total)

	return {
		...underOver,
		timeStr,
	}
}

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
		const currentDateString = formatDate(currentDate)
		const currentDay = currentDate.getDay()
		const currentPunch = punchesPerDayMap.get(currentDateString)
		
		if (currentPunch) {
			finalReportList.push(currentPunch)
		} else if (punchesPerDay.length > 0 && dailySchedulesTimeMap.has(currentDay)){
			const currentDayString = getDayOfWeek(currentDate)

			finalReportList.push({
				workedTime: {
					timeString: "00:00",
					time: 0,
				},
				timestamp: currentDate,
				date: currentDateString,
				dayOfWeek: {
					dayString: currentDayString,
					day: currentDay,
				},
				punches: []
			})
		}
		currentDate.setDate(currentDate.getDate() + 1)
	}
	
	return finalReportList
}