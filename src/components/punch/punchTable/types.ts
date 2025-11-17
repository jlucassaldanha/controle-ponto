import { getDailySchedulesTime } from "@/core/preferences/preferences.utils"
import { overtimeUndertime } from "@/core/punch/punch.reports"
import { groupPunchesByDay } from "@/core/punch/punch.services"

export type PunchTableProps = {
	punchesPerDay: Awaited<ReturnType<typeof groupPunchesByDay>>
	dailySchedulesTime: ReturnType<typeof getDailySchedulesTime>
}

export type TableBodyRowProps = {
	day: Awaited<ReturnType<typeof groupPunchesByDay>>[number]
	overUnder: ReturnType<typeof overtimeUndertime>
	color: string
}