'use client'

import { TableCell, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function PunchCell({ initialValue, isEditing }: {initialValue: string, isEditing: boolean}) {
	const [value, setValue] = useState(initialValue)
	
	return (
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
				{initialValue}
			</Typography>
		)}
	</TableCell>
	)
	
}