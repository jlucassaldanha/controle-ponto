import { getPunchTime } from "@/core/punch/punch.utils";
import { TableCell, TableRow } from "@mui/material";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps } from "./types";

export default function TableBodyRowDesktop({ day, overUnder, color}: TableBodyRowProps) {
	return (
		<TableRow
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell component="th" scope="row">
				{day.dayOfWeek.dayString} <br/> {day.date.slice(0, 5)} 
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
} 