'use client'

import { getPunchIdTime } from "@/core/punch/punch.utils";
import { Button, ButtonGroup, TableCell, TableRow } from "@mui/material";
import { PunchType } from "@prisma/client";
import { TableBodyRowProps } from "./types";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import PunchCell from "./PunchCell";
import { formatTime } from "@/lib/dateUtils";
import { updatePunchesAction } from "@/actions/punch.action";

export default function TableBodyRowDesktop({ day, overUnder, color}: TableBodyRowProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [editedValues, setEditedValues] = useState<Record<string, Date>>({})

	const clockIn = getPunchIdTime(day.punches, PunchType.CLOCK_IN);
    const startLunch = getPunchIdTime(day.punches, PunchType.START_LUNCH);
    const endLunch = getPunchIdTime(day.punches, PunchType.END_LUNCH);
    const clockOut = getPunchIdTime(day.punches, PunchType.CLOCK_OUT);

	const handlePunchChange = (id: string, newTime: string) => {
		const newTimestamp = new Date(day.timestamp)

		newTimestamp.setHours(Number(newTime.slice(0, 2)))
		newTimestamp.setMinutes(Number(newTime.slice(3)))

		setEditedValues(prev => ({
			...prev,
			[id]: newTimestamp
		}))
	}

	const onCancel = () => {
		setIsEditing(false)
		setEditedValues({})
	}

	const onSave = async () => {
		console.log("salvando")
		await updatePunchesAction(editedValues)
		
		setIsEditing(false)
		setEditedValues({})
	}

	const getDisplayTime = (id: string ) => {
		const editedTime = editedValues[id]
		if (editedTime) {
			return formatTime(editedTime)
		}
		return undefined;	
	}

	return (
		<TableRow
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell component="th" scope="row">
				{day.dayOfWeek.dayString} <br/> {day.date.slice(0, 5)} 
			</TableCell>
			<PunchCell 
				punchTime={clockIn.time || "00:00"}
				isEditing={isEditing}
				currentValue={getDisplayTime(clockIn.id)}
				onChange={(val) => handlePunchChange(clockIn.id, val)}
			/>
			<PunchCell 
				punchTime={startLunch.time || "00:00"}
				isEditing={isEditing}
				currentValue={getDisplayTime(startLunch.id)}
				onChange={(val) => handlePunchChange(startLunch.id, val)}
			/>
			<PunchCell 
				punchTime={endLunch.time || "00:00"}
				isEditing={isEditing}
				currentValue={getDisplayTime(endLunch.id)}
				onChange={(val) => handlePunchChange(endLunch.id, val)}
			/>
			<PunchCell 
				punchTime={clockOut.time || "00:00"}
				isEditing={isEditing}
				currentValue={getDisplayTime(clockOut.id)}
				onChange={(val) => handlePunchChange(clockOut.id, val)}
			/>
			<TableCell align="center">
				{day.workedTime.timeString}
			</TableCell>
			<TableCell align="center" sx={{color: color}}>
				{overUnder.timeStr}
			</TableCell>
			{isEditing ? (
				<TableCell align="center">
					<ButtonGroup variant="outlined" aria-label="save-cancel">
						<Button aria-label="save" onClick={onSave}>
							<SaveIcon fontSize="small"/>
						</Button>
						<Button aria-label="cancel" color="error" onClick={onCancel}>
							<CloseIcon fontSize="small"/>
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