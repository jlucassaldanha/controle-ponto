import { getFirstPunch } from "@/core/punch/punch.services"
import { requireUserSession } from "@/lib/session"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PunchType } from "@prisma/client";
import { getUserPreferences } from "@/core/preferences/preferences.services";
import { getPunchTime } from "@/core/punch/punch.utils";
import { getDailySchedulesTime } from "@/core/preferences/preferences.utils";
import { Card, CardContent, CardHeader, Divider, Typography } from "@mui/material";
import PunchTable from "@/components/punch/punchTable/PunchTable";
import { overtimeUndertime, getWorkdayBalanceReport, getTotalOvertime } from "@/core/punch/punch.reports";

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
			<Card>
				<CardHeader
					title="Horas Extras/Faltantes"
				/>
				<Divider />
				<CardContent>
					<p className={"text-" + color + "-500 flex items-center justify-center p-2"}>
						{totalOvertimeData.timeStr}	
					</p>
				</CardContent>
			</Card>
			<PunchTable punchesPerDay={punchesPerDay} dailySchedulesTime={dailySchedulesTime} />
			<div className="hidden">
				<div className="hidden md:flex">
				<TableContainer component={Paper} sx={{ maxHeight: 600, maxWidth: 800 }} >
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
								const daySchedule = dailySchedulesTime.find((schedule) => schedule.dayOfWeek === day.dayOfWeek.day)

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
			</div>
			<div className="md:hidden">
				<TableContainer component={Paper}  sx={{ maxHeight: 600, maxWidth: {xs: 400, md: 800} }} >
					<Table stickyHeader sx={{minWidth: {xs: 200, md: 400}}} arial-label="tabela simples">
						<TableHead>
							<TableRow>
								<TableCell>Data</TableCell>
								<TableCell sx={{display: "flex", justifyContent: "space-between", gap: "10px"}} >
									<span>Entrada</span>
									<span>Saída</span>
								</TableCell>
								<TableCell align="center">Total</TableCell>
								<TableCell align="center">Extras</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{punchesPerDay.map((day) => {
								const daySchedule = dailySchedulesTime.find((schedule) => schedule.dayOfWeek === day.dayOfWeek.day)

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
											{day.dayOfWeek.dayString} <br/> {day.date.slice(0, 5)}
										</TableCell>

										<TableCell sx={{ display: 'flex', flexDirection: "column", gap: "10px" }}>
											<div className="flex justify-between">
												<span>
													{getPunchTime(day.punches, PunchType.CLOCK_IN)}
												</span>
												<span>
													{getPunchTime(day.punches, PunchType.CLOCK_OUT)}
												</span>
											</div>
											<div className="flex justify-between">
												<span>
													{getPunchTime(day.punches, PunchType.START_LUNCH)}
												</span>
												<span>
													{getPunchTime(day.punches, PunchType.END_LUNCH)}
												</span>
											</div>
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
			</div>
			</div>				
		</div>
	)
}