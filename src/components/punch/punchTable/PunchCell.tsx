import { TableCell, TextField, Typography } from "@mui/material";

type PunchCellProps = {
	punchTime: string, 
	isEditing: boolean, 
	currentValue: string, 
	onChange: (newTime: string) => void
}

export default function PunchCell({ punchTime, isEditing, currentValue, onChange }: PunchCellProps) {
	const value = isEditing ? currentValue : punchTime
	
	return (
		<TableCell align="center">
		{isEditing ? (
			<TextField 
				sx={{ width: 130 }}
				size="small"
				variant="outlined"
				type="time"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
		) : (
			<Typography>
				{value}
			</Typography>
		)}
	</TableCell>
	)
	
}