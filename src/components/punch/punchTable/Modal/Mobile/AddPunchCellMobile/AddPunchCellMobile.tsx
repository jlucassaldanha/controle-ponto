import { TextField } from "@mui/material";

type PunchCellProps = {
	currentValue: string,
	dateOrTime: "time" | "date",  
	onChange: (newTime: string) => void
}

export default function AddPunchCellMobile({ dateOrTime, currentValue, onChange }: PunchCellProps) {
	return (
		<TextField 
			sx={{ maxWidth: 130 }}
			size="small"
			variant="outlined"
			type={dateOrTime}
			value={currentValue}
			onChange={(e) => onChange(e.target.value)}
		/>
	)
}