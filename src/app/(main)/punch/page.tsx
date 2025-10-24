import { groupPunchesByDay } from "@/core/punch/punch.services"
import { requireUserSession } from "@/lib/session"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { type Punch, PunchType } from "@prisma/client";
import { getUserPreferences } from "@/core/preferences/preferences.services";
import { overtimeUndertime, getPunchTime, getTotalOvertime } from "@/core/punch/punch.utils";
import { getDailySchedulesTime } from "@/core/preferences/preferences.utils";

export const dynamic = 'force-dynamic'

export default async function Punch() {
	const session = await requireUserSession()
	const userPreferences = await getUserPreferences(session.id)
	const punchesPerDay = await groupPunchesByDay(session.id)

	const DailySchedulesTime = getDailySchedulesTime(userPreferences?.dailySchedules)

	const totalOvertimeData = getTotalOvertime(punchesPerDay, DailySchedulesTime)

	let color = ''
	if (totalOvertimeData.overtime && !totalOvertimeData.undertime) {
		color = "green"
	} else if (!totalOvertimeData.overtime && totalOvertimeData.undertime) {
		color = "red"
	}

	return (
		<div className="flex items-center justify-center w-full gap-2">
			<TableContainer component={Paper}  sx={{ maxHeight: 600, maxWidth: 800 }} >
				<Table stickyHeader sx={{minWidth: 400}} arial-label="tabela simples">
					<TableHead>
						<TableRow>
							<TableCell>Data</TableCell>
							<TableCell align="center">Entrada</TableCell>
							<TableCell align="center">Entrada almoço</TableCell>
							<TableCell align="center">Saída almoço</TableCell>
							<TableCell align="center">Saída</TableCell>
							<TableCell align="center">Total</TableCell>
							<TableCell align="center">Extras</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{punchesPerDay.map((day) => {
							const daySchedule = DailySchedulesTime.find((schedule) => schedule.dayOfWeek === day.dayOfWeek.day)

							const workTime = daySchedule ? daySchedule.workTime : 0
							const overUnder = overtimeUndertime(workTime, day.workedTime.time)
							
							let color = ''
							if (overUnder.overtime && !overUnder.undertime) {
								color = "green"
							} else if (!overUnder.overtime && overUnder.undertime) {
								color = "red"
							}
							
							return (
								<TableRow
									key={day.date}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{day.date} <br/> {day.dayOfWeek.dayString}
									</TableCell>
									<TableCell align="center">
										{getPunchTime(day.punches, PunchType.CLOCK_IN)}
									</TableCell>
									<TableCell align="center">
										{getPunchTime(day.punches, PunchType.START_LUNCH)}
									</TableCell>
									<TableCell align="center">
										{getPunchTime(day.punches, PunchType.END_LUNCH)}
									</TableCell>
									<TableCell align="center">
										{getPunchTime(day.punches, PunchType.CLOCK_OUT)}
									</TableCell>
									<TableCell align="center">
										{day.workedTime.timeString}
									</TableCell>
									<TableCell align="center" sx={{color: color}}>
										{overUnder.timeStr}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<div className="m-7 border-[1px] border-gray-400 rounded-md p-3">
				<div className="border-b-[1px] border-gray-400 p-2">
					Total de horas extras ou faltantes
				</div>
				<p className={"text-" + color + "-500 flex items-center justify-center p-2"}>
					{totalOvertimeData.timeStr}	
				</p>
			</div>
		</div>
	)
}