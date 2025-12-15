import { getDailySchedulesTime } from "@/core/preferences/preferences.utils"
import { groupPunchesByDay, overtimeUndertime } from "@/core/punch/punch.reports"

export type PunchTableProps = {
	punchesPerDay: Awaited<ReturnType<typeof groupPunchesByDay>>
	dailySchedulesTime: ReturnType<typeof getDailySchedulesTime>
}

export type TableBodyRowProps = {
	day: Awaited<ReturnType<typeof groupPunchesByDay>>[number]
	overUnder: ReturnType<typeof overtimeUndertime>
	color: string
}