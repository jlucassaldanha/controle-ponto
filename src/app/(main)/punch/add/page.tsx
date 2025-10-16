'use client'
import SubmitButton from "@/components/ui/SubmitButton";
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";

export default function AddPunch() {
	const [type, setType] = useState('')
	const [checkToday, setCheckToday] = useState(false)

	const handleSelectChange = (event: SelectChangeEvent) => {
		setType(event.target.value as string)
	}

	const handleTodayCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCheckToday(event.target.checked)
	}

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			<div className="flex flex-col gap-5">
				<FormControl>
					<InputLabel id="type" >Tipo</InputLabel>
					<Select
						labelId="type"
						id="type"
						label="Tipo"
						value={type}
						onChange={handleSelectChange}
					>
						<MenuItem value={"sla"} >Entrada</MenuItem>
						<MenuItem value={"sla"} >Saída</MenuItem>
						<MenuItem value={"sla"} >Entrada almoço</MenuItem>
						<MenuItem value={"sla"} >Saída almoço</MenuItem>
					</Select>
				</FormControl>
				<div className="flex gap-5">
					<TextField
						variant="outlined"
						label="Data"
						name="punchDate"
						id="punchDate"
						type="date"
						disabled={checkToday}
					/>
					<FormControlLabel 
						control={ 
							<Checkbox 
								checked={checkToday} 
								onChange={handleTodayCheckChange}
							/> 
						}
						label="Hoje"
					/>
				</div>
				<TextField
					variant="outlined"
					label="Hora"
					name="punchTime"
					id="punchTime"
					type="time"
				/>
				<SubmitButton 
					text="Salvar" 
					pendingText="Salvando..." 
					variant="contained" 
				/>
			</div>
		</div>
	)
}