import { Checkbox, FormControlLabel, TextField } from "@mui/material"
import { DateInputProps } from "./types"

export default function DateInput({ date, checkToday, state, setDate, setCheckToday}: DateInputProps) {
	return (
		<div className="flex gap-5">
			<TextField
				variant="outlined"
				label="Data"
				name="punchDate"
				id="punchDate"
				type="date"
				slotProps={{ inputLabel: { shrink: true } }}
				onChange={(e) => setDate(e.target.value)}
				value={date}
				disabled={checkToday}
				error={!!state.errors?.date}
				helperText={state.errors?.date?.[0]}
			/>
			<FormControlLabel 
				control={ 
					<Checkbox 
						checked={checkToday} 
						onChange={(e) => {
							setCheckToday(e.target.checked)
							const dateNow = new Date()
							setDate(`${dateNow.getFullYear()}-${(dateNow.getMonth() + 1).toString().padStart(2, '0')}-${dateNow.getDate().toString().padStart(2, '0')}`)
						}}
					/> 
				}
				label="Hoje"
			/>
		</div>
	)
}