import { getPunchTime } from "@/core/punch/punch.utils";
import { TableCell, TableRow } from "@mui/material";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps } from "./TableBodyRowDesktop";

export default function TableBodyRowMobile({day, overUnder, color}: TableBodyRowProps) {
	return (
		<TableRow
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
}