import { getLatestPunch, getPunches } from "./punch.services";
import { minutesToTimeString } from "@/lib/dateUtils"
import { formatDate } from "@/lib/dateUtils";
import { dailySchedulesTimeType, GroupedPunchesType, PunchesPerDayType } from "./punch.types";
import { getPunchTimestampMinutes, isUnderOver } from "./punch.utils";
import { PunchType } from "@prisma/client";
import { JustificationByDayType } from "../justification/justification.types";

export async function groupPunchesByDay(userId: string) {
	const allPunches = await getPunches(userId)
	
	if (allPunches.length === 0) {
        return [] 
    }

	const groupedPunches = allPunches.reduce((accumulator, punch) => {
		const date = formatDate(punch.timestamp)

		if (!accumulator[date]) {
			accumulator[date] = {
				dayOfWeek: punch.timestamp.getDay(),
				timestamp: punch.timestamp,
				date,
				punches: []
			}
		}

		accumulator[date].punches.push(punch)
		return accumulator
	}, {} as Record<string, GroupedPunchesType>) 
	
	const punchesArray = Object.values(groupedPunches).reverse()

	const result = punchesArray.map((punchesObj) => {
		const clockIn = getPunchTimestampMinutes(punchesObj, PunchType.CLOCK_IN)
		const clockOut = getPunchTimestampMinutes(punchesObj, PunchType.CLOCK_OUT)
		const journeyTime = clockOut - clockIn
		
		const lunchIn = getPunchTimestampMinutes(punchesObj, PunchType.START_LUNCH)
		const lunchOut = getPunchTimestampMinutes(punchesObj, PunchType.END_LUNCH)
		const lunchTime = lunchOut - lunchIn

		const workedTime = journeyTime - lunchTime

		return {
			...punchesObj,
			workedTime,
		}
	})
	
	return result
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

export function getTotalOvertime(punches: PunchesPerDayType[], schedules: {dayOfWeek: number; workTime: number;}[], justifications: JustificationByDayType[], initialBalance: number) {
	const justificationsSum = justifications.reduce((accumulator, justification) => {
		return accumulator + justification.timeMinutes
	}, 0)

	const punchesSum = punches.reduce((accumulator, day) => {
		const daySchedule = schedules.find((schedule) => schedule.dayOfWeek === day.dayOfWeek)

		const workTime = daySchedule ? daySchedule.workTime : 0
		const overUnder = overtimeUndertime(workTime, day.workedTime)
		
		return accumulator + overUnder.time
	}, 0)

	const total = punchesSum + justificationsSum + initialBalance
	const timeStr = minutesToTimeString(Math.abs(total))

	const underOver = isUnderOver(total)

	return {
		...underOver,
		timeStr,
	}
}

export async function getWorkdayBalanceReport(userId: string, initialDate: Date, finalDate: Date, dailySchedulesTime: dailySchedulesTimeType[]) {
	const punchesPerDay = await groupPunchesByDay(userId)
	const latestPunch = await getLatestPunch(userId)

	console.log(latestPunch)
	
	const punchesPerDayMap = new Map<string, PunchesPerDayType>(
		punchesPerDay.map(day => [day.date, day])
	)
	const dailySchedulesTimeMap = new Map<number, dailySchedulesTimeType>(
		dailySchedulesTime.map(day => [day.dayOfWeek, day])
	)

	const currentDate = new Date(initialDate)
	
	const finalSearchDate = latestPunch ? new Date(latestPunch.timestamp) : finalDate
	const finalReportList = []
	while (currentDate <= finalSearchDate) {
		const currentDateString = formatDate(currentDate)
		const currentDay = currentDate.getDay()
		const currentPunch = punchesPerDayMap.get(currentDateString)
		
		if (currentPunch) {
			finalReportList.push(currentPunch)
		} else if (punchesPerDay.length > 0 && dailySchedulesTimeMap.has(currentDay)){
			finalReportList.push({
				workedTime: 0,
				timestamp: new Date(currentDate),
				date: currentDateString,
				dayOfWeek: currentDay,
				punches: []
			})
		}
		currentDate.setDate(currentDate.getDate() + 1)
	}
	
	return finalReportList
}