import { getFirstPunch } from "@/core/punch/punch.services"
import { requireUserSession } from "@/lib/session"
import { getUserPreferences } from "@/core/preferences/preferences.services";
import { getDailySchedulesTime } from "@/core/preferences/preferences.utils";
import { Typography } from "@mui/material";
import PunchTable from "@/components/punch/punchTable/PunchTable";
import { getWorkdayBalanceReport, getTotalOvertime } from "@/core/punch/punch.reports";
import OvertimeCard from "@/components/punch/OvertimeCard/OvertimeCard";

export const dynamic = 'force-dynamic'

export default async function PunchHistory() {
	const session = await requireUserSession()
	
	const firstPunch = await getFirstPunch(session.id)	
	const initialDate = firstPunch?.timestamp || new Date()
	const todayDate = new Date()

	const userPreferences = await getUserPreferences(session.id)
	const dailySchedulesTime = getDailySchedulesTime(userPreferences?.dailySchedules)
	
	const punchesPerDay = await getWorkdayBalanceReport(session.id, initialDate, todayDate, dailySchedulesTime)

	const totalOvertimeData = getTotalOvertime(punchesPerDay, dailySchedulesTime)

	let color = ''
	if (totalOvertimeData.overtime && !totalOvertimeData.undertime) {
		color = "green"
	} else if (!totalOvertimeData.overtime && totalOvertimeData.undertime) {
		color = "red"
	}

	return (
		<div className="flex flex-col items-center justify-center w-full gap-5 m-5">
			<Typography variant="h4" component="h1" className="mb-6 text-center">
				Espelho Ponto
			</Typography>
			<OvertimeCard time={totalOvertimeData.timeStr} color={color}/>
			<PunchTable punchesPerDay={punchesPerDay} dailySchedulesTime={dailySchedulesTime} />			
		</div>
	)
}