'use client'
import SubmitButton from "@/components/ui/SubmitButton";
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';

type PunchFieldType = {
	id: string,
	date: string,
	time: string,
	type: string,
}

export default function AddPunch() {
	const [checkToday, setCheckToday] = useState(false)
	const [punchFields, setPunchFields] = useState<PunchFieldType[]>([])

	const handleAdd = () => {
		const blankPunchField = {
			id: Date.now().toString(),
			date: '',
			time: '',
			type: ''
		}
		setPunchFields(prev => [...prev, blankPunchField])
	}

	const handleRemove = (id: string) => {
		setPunchFields(prev => prev.filter(field => field.id === id))
	}

	const handleSelectChange = (event: SelectChangeEvent, fieldId: string) => {
		setPunchFields(currentFields => currentFields.map((field) => {
			if (field.id === fieldId) {
				return { ...field, type: event.target.value }
			}
			return field
		}))
	}

	const handleTodayCheckChange = (event: React.ChangeEvent<HTMLInputElement>, fieldId: string) => {
		setCheckToday(event.target.checked)

		if (event.target.checked) {
			setPunchFields(currentFields => currentFields.map((field) => {
				if (field.id === fieldId) {
					return { ...field, date: Date.now().toString() }
				}
				return field
			}))	
		}
	}

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			<div className="flex flex-col gap-5">
				{punchFields.map((field, i) => (
					<div key={field.id} className="flex flex-col gap-5" >
						<FormControl>
							<InputLabel id="type" >Tipo</InputLabel>
							<Select
								labelId="type"
								id="type"
								label="Tipo"
								value={field.type}
								onChange={(e) => handleSelectChange(e, field.id)}
							>
								<MenuItem value={"entryTime"} >Entrada</MenuItem>
								<MenuItem value={"exitTime"} >Saída</MenuItem>
								<MenuItem value={"lunchStartTime"} >Entrada almoço</MenuItem>
								<MenuItem value={"lunchEndTime"} >Saída almoço</MenuItem>
							</Select>
						</FormControl>
						<div className="flex gap-5">
							<TextField
								variant="outlined"
								label="Data"
								name="punchDate"
								id="punchDate"
								type="date"
								value={field.date}
								disabled={checkToday}
							/>
							<FormControlLabel 
								control={ 
									<Checkbox 
										checked={checkToday} 
										onChange={(event) => handleTodayCheckChange(event, field.id)}
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
							value={field.time}
						/>
					</div>
				))}
				<Button variant='contained' onClick={handleAdd} startIcon={<AddBoxIcon />} >
					Adicionar
				</Button>
				<SubmitButton 
					text="Salvar" 
					pendingText="Salvando..." 
					variant="contained" 
				/>
			</div>
		</div>
	)
}