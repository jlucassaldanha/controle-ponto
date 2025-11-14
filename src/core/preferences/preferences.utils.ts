import { dailySchedulesType, DayKey, SchedulesRulesType } from "@/core/preferences/preferences.types";
import { minutesToTimeString } from "@/lib/timeFormater";
import { DailySchedule } from "@prisma/client";
import { dayNumberToKeyMap } from "./preferences.constants";

export function groupSchedulesIntoRules(dailySchedulesFromDb: dailySchedulesType[]) {
	const scheduleRulesMap = new Map<string, SchedulesRulesType>();

	for (const schedule of dailySchedulesFromDb) {
		const timeKey = `${schedule.entryTime}-${schedule.exitTime}-${schedule.lunchStartTime}-${schedule.lunchEndTime}`;

		if (!scheduleRulesMap.has(timeKey)) {
			scheduleRulesMap.set(timeKey, {
				id: timeKey,
				entryTime: minutesToTimeString(schedule.entryTime),
				exitTime: minutesToTimeString(schedule.exitTime),
				lunchStartTime: minutesToTimeString(schedule.lunchStartTime),
				lunchEndTime: minutesToTimeString(schedule.lunchEndTime),
				days: { 
					sunday: false, 
					monday: false, 
					tuesday: false, 
					wednesday: false, 
					thursday: false, 
					friday: false, 
					saturday: false 
				},
			});
		}
		
		const rule = scheduleRulesMap.get(timeKey)
		if (rule) {
			const dayKey = dayNumberToKeyMap[schedule.dayOfWeek] as DayKey
			if (dayKey) {
				rule.days[dayKey] = true;
			}
		}
	}

	return Array.from(scheduleRulesMap.values());
}

export function getDailySchedulesTime(schedules: DailySchedule[] | undefined) {
		if (!schedules) {
			return []
		}

		return schedules.map((daySchedule) => {
			const journeyTime = daySchedule.exitTime - daySchedule.entryTime
			const lunchTime = daySchedule.lunchEndTime - daySchedule.lunchStartTime

			const workTime = journeyTime - lunchTime

			return {
				dayOfWeek: daySchedule.dayOfWeek,
				workTime
			}
		})
	}