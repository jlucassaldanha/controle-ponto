import { getPunches } from "./punch.services";
import { minutesToTimeString } from "@/lib/dateUtils"
import { formatDate, getDayOfWeek } from "@/lib/dateUtils";
import { dailySchedulesTimeType, GroupedJustificationsType, GroupedPunchesType, PunchesPerDayType } from "./punch.types";
import { getPunchTimestampMinutes, isUnderOver } from "./punch.utils";
import { PunchType } from "@prisma/client";
import { getJustifications } from "../justification/justification.services";

export async function groupPunchesByDay(userId: string) {
	const allPunches = await getPunches(userId)
	
	if (allPunches.length === 0) {
        return [] 
    }

	const groupedPunches = allPunches.reduce((accumulator, punch) => {
		const date = formatDate(punch.timestamp)
		

		if (!accumulator[date]) {
			const dayOfWeek = getDayOfWeek(punch.timestamp)

			accumulator[date] = {
				dayOfWeek: {
					dayString: dayOfWeek,
					day: punch.timestamp.getDay()
				},
				timestamp: punch.timestamp,
				date,
				punches: [],
				justifications: []
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

		const workedTimeString = minutesToTimeString(workedTime)

		return {
			...punchesObj,
			workedTime: {
				timeString: workedTimeString,
				time: workedTime,
			}
		}
	})
	
	return result
}

export function overtimeUndertime(workTime: number, workedTime: number, justification: number) {
	const overtime = (workedTime + justification) - workTime
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
		const overUnder = overtimeUndertime(workTime, day.workedTime.time, day.justification)
		
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

export async function groupJustificationsByday(userId: string) {
	const allJustifications = await getJustifications(userId)
	
	if (allJustifications.length === 0) {
        return [] 
    }

	const groupedJustifications = allJustifications.reduce((accumulator, justification) => {
		const date = formatDate(justification.date)
		

		if (!accumulator[date]) {
			const dayOfWeek = getDayOfWeek(justification.date)

			accumulator[date] = {
				dayOfWeek: {
					dayString: dayOfWeek,
					day: justification.date.getDay()
				},
				timestamp: justification.date,
				date,
				justifications: []
			}
		}

		accumulator[date].justifications.push(justification)

		return accumulator

	}, {} as Record<string, GroupedJustificationsType>) 
	
	const justificationsArray = Object.values(groupedJustifications).reverse()

	const result = justificationsArray
	
	return result
}

export async function getWorkdayBalanceReport(userId: string, initialDate: Date, finalDate: Date, dailySchedulesTime: dailySchedulesTimeType[]) {
	const punchesPerDay = await groupPunchesByDay(userId)
	const justificationsPerDay = await groupJustificationsByday(userId)
	
	const punchesPerDayMap = new Map<string, PunchesPerDayType>(
		punchesPerDay.map(day => [day.date, day])
	)

	const justificationsPerDayMap = new Map<string, GroupedJustificationsType>(
		justificationsPerDay.map(day => [day.date, day])
	)
	
	const dailySchedulesTimeMap = new Map<number, dailySchedulesTimeType>(
		dailySchedulesTime.map(day => [day.dayOfWeek, day])
	)

	const currentDate = new Date(initialDate)
	const finalReportList = []
	while (currentDate <= finalDate) {
		const currentDateString = formatDate(currentDate)
		const currentDay = currentDate.getDay()
		const currentPunch = punchesPerDayMap.get(currentDateString)
		const currentJustification = justificationsPerDayMap.get(currentDateString)
		
		if (currentPunch) {
			finalReportList.push({
				punchesPerDay: currentPunch,
				justificationsPerDay:
			})
		} else if (punchesPerDay.length > 0 && dailySchedulesTimeMap.has(currentDay)){
			const currentDayString = getDayOfWeek(currentDate)

			finalReportList.push({
				workedTime: {
					timeString: "00:00",
					time: 0,
				},
				timestamp: new Date(currentDate),
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