import { getDailySchedulesTime } from "@/core/preferences/preferences.utils"
import { groupPunchesByDay2, overtimeUndertime } from "@/core/punch/punch.reports"

export type PunchTableProps2 = {
	punchesPerDay: Awaited<ReturnType<typeof groupPunchesByDay2>>
	dailySchedulesTime: ReturnType<typeof getDailySchedulesTime>
}

export type TableBodyRowProps2 = {
	day: Awaited<ReturnType<typeof groupPunchesByDay2>>[number]
	overUnder: ReturnType<typeof overtimeUndertime>
	color: string
}