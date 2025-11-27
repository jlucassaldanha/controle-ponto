'use client'

import { getPunchTime } from "@/core/punch/punch.utils";
import { Button, ButtonGroup, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps } from "./types";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TableBodyRowDesktop({ day, overUnder, color}: TableBodyRowProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [value, setValue] = useState(getPunchTime(day.punches, PunchType.CLOCK_IN))

	return (
		<TableRow
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell component="th" scope="row">
				{day.dayOfWeek.dayString} <br/> {day.date.slice(0, 5)} 
			</TableCell>
			<TableCell align="center">
				{isEditing ? (
					<TextField 
						size="small"
						variant="outlined"
						type="time"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				) : (
					<Typography>
						{getPunchTime(day.punches, PunchType.CLOCK_IN)}
					</Typography>
				)}
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
			{isEditing ? (
				<TableCell align="center">
					<ButtonGroup variant="outlined" aria-label="save-cancel">
						<Button aria-label="save" onClick={() => setIsEditing(false)}>
							<SaveIcon />
						</Button>
						<Button aria-label="cancel" onClick={() => setIsEditing(false)}>
							<DeleteIcon />
						</Button>
					</ButtonGroup>
				</TableCell>
				
			) : (
				<TableCell align="center">
					<Button variant="outlined" aria-label="edit" onClick={() => setIsEditing(true)}>
						<EditIcon />
					</Button>
				</TableCell>
				
			)}
			
		</TableRow>
	)
} 