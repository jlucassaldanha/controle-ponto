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
import { formatTime } from "@/lib/dateUtils";


export const dynamic = 'force-dynamic'

export default async function Punch() {
	const session = await requireUserSession()
	const punchesPerDay = await groupPunchesByDay(session.id)

	const getPunchTime = (punches: Punch[], type: PunchType) => {
		const punch = punches.find((punch) => ( punch.type === type ))
		if (punch) {
			return formatTime(punch.timestamp)
		}
	}

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
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
						</TableRow>
					</TableHead>
					<TableBody>
						{punchesPerDay.map((day) => {
							return (
								<TableRow
									key={day.date}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<TableCell component="th" scope="row">
										{day.date} <br/> {day.dayOfWeek}
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
										00:00
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}