import { TextField } from "@mui/material";

type PunchCellProps = {
	currentValue: string,
	dateOrTime: "time" | "date",  
	onChange: (newTime: string) => void
}

export default function AddPunchCellMobile({ dateOrTime, currentValue, onChange }: PunchCellProps) {
	return (
		<TextField 
			fullWidth
			sx={{ 
				margin: 0,
				"& .MuiInputBase-input": {
					fontSize: "0.8rem",
					padding: "2px 0",
					textAlign: "center"
				} 
			}}
			size="small"
			variant="standard"
			type={dateOrTime}
			value={currentValue}
			onChange={(e) => onChange(e.target.value)}
		/>
	)
}