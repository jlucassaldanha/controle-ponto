import { TableCell, TextField } from "@mui/material";

type PunchCellProps = {
	currentValue: string,
	dateOrTime: "time" | "date",  
	onChange: (newTime: string) => void
}

export default function AddPunchCell({ dateOrTime, currentValue, onChange }: PunchCellProps) {
	return (
		<TableCell align="center">
			<TextField 
				sx={{ maxWidth: 130 }}
				size="small"
				variant="standard"
				type={dateOrTime}
				value={currentValue}
				onChange={(e) => onChange(e.target.value)}
			/>
		</TableCell>
	)
}