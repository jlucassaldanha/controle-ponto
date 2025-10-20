'use client'
import SubmitButton from "@/components/ui/SubmitButton";
import { Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useActionState, useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete'
import { addPunchesAction, type addPunchesActionForm } from "@/actions/punch.action";
import { PunchType } from "@prisma/client";

type PunchFieldType = {
	id: string,
	time: string,
	type: string,
}

export default function AddPunch() {
	const [checkToday, setCheckToday] = useState(false)
	const [date, setDate] = useState('')
	const [punchFields, setPunchFields] = useState<PunchFieldType[]>([])
	const initialState: addPunchesActionForm = { success: false }
	const [state, formAction] = useActionState(addPunchesAction, initialState);

	const handleAdd = () => {
		if (punchFields.length < 4) {
			const blankPunchField = {
				id: Date.now().toString(),
				time: '',
				type: ''
			}
			setPunchFields(prev => [...prev, blankPunchField])
		}
	}

	const handleRemove = (id: string) => {
		setPunchFields(prev => prev.filter(field => field.id !== id))
	}

	const handleSelectChange = (event: SelectChangeEvent, fieldId: string) => {
		setPunchFields(currentFields => currentFields.map((field) => {
			if (field.id === fieldId) {
				return { ...field, type: event.target.value }
			}
			return field
		}))
	}

	const handleTimeChange = (fieldId: string, time: string) => {
		setPunchFields(currentFields => currentFields.map((field) => {
			if (field.id === fieldId) {
				return { ...field, time }
			}
			return field
		}))
	}

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			<div className="flex flex-col gap-5">
				<div className="flex gap-5">
					<TextField
						variant="outlined"
						label="Data"
						name="punchDate"
						id="punchDate"
						type="date"
						onChange={(e) => setDate(e.target.value)}
						value={date}
						disabled={checkToday}
					/>
					<FormControlLabel 
						control={ 
							<Checkbox 
								checked={checkToday} 
								onChange={(e) => {
									setCheckToday(e.target.checked)
									const dateNow = new Date()
									setDate(`${dateNow.getUTCDate()}/${dateNow.getUTCMonth()}/${dateNow.getUTCFullYear()}`)
								}}
							/> 
						}
						label="Hoje"
					/>
				</div>
				{punchFields.map((field, i) => {
					const usedPunchType = punchFields.map((field) => {
						return field.type
					})
					return (
						<div key={field.id} className="flex flex-col gap-5" >
							<div className="flex gap-5">
								<FormControl fullWidth>
									<InputLabel id="type" >Tipo</InputLabel>
									<Select
										labelId="type"
										id="type"
										label="Tipo"
										value={field.type}
										onChange={(e) => handleSelectChange(e, field.id)}
									>
										<MenuItem 
											value={PunchType.CLOCK_IN} 
											disabled={usedPunchType.includes(PunchType.CLOCK_IN) && field.type !== PunchType.CLOCK_IN}
										>
											Entrada
										</MenuItem>
										<MenuItem 
											value={PunchType.CLOCK_OUT} 
											disabled={usedPunchType.includes(PunchType.CLOCK_OUT) && field.type !== PunchType.CLOCK_OUT}
										>
											Saída
										</MenuItem>
										<MenuItem 
											value={PunchType.START_LUNCH} 
											disabled={usedPunchType.includes(PunchType.START_LUNCH) && field.type !== PunchType.START_LUNCH}
										>
											Entrada almoço
										</MenuItem>
										<MenuItem 
											value={PunchType.END_LUNCH} 
											disabled={usedPunchType.includes(PunchType.END_LUNCH) && field.type !== PunchType.END_LUNCH}
										>
											Saída almoço
										</MenuItem>
									</Select>
								</FormControl>
								<IconButton aria-label="delete" onClick={() => handleRemove(field.id)}>
									<DeleteIcon />
								</IconButton>
							</div>
							<TextField
								variant="outlined"
								label="Hora"
								name="punchTime"
								id="punchTime"
								type="time"
								onChange={(e) => handleTimeChange(field.id, e.target.value)}
								value={field.time}
							/>
						</div>
					)
				})}
				<Button variant='contained' onClick={handleAdd} startIcon={<AddBoxIcon />} disabled={punchFields.length >= 4}>
					Adicionar
				</Button>
				<form action={formAction} className="mt-4">
					<input 
						type="hidden" 
						name="punches" 
						value={JSON.stringify({date: date, punches: punchFields})} 
					/>
					<SubmitButton 
						variant='contained' 
						text='Salvar' 
						pendingText='Salvando'
					/>
					{state.message && (
						<p className={state.success ? "text-green-500":"text-red-500"} >
							{state.message}
						</p>
					)}
				</form>
			</div>
		</div>
	)
}