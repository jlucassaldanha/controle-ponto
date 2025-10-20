'use client'
import SubmitButton from "@/components/ui/SubmitButton";
import { Button, Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
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

	// NOVO: Encontramos os erros fora do JSX para deixar o código mais limpo
    const dateError = state.errors?.find((e) => e.path[0] === 'date')?.message;
    // Erro geral do array de punches (ex: sequência inválida)
    const punchesArrayError = state.errors?.find((e) => e.path.length === 1 && e.path[0] === 'punches')?.message;

	return (
		<div className="flex flex-col items-center justify-center w-full gap-2">
			
			<form action={formAction} className="flex flex-col gap-5 mt-4">
				<div className="flex gap-5">
					<TextField
						variant="outlined"
						label="Data"
						InputLabelProps={{ shrink: true }}
						name="punchDate"
						id="punchDate"
						type="date"
						onChange={(e) => setDate(e.target.value)}
						value={date}
						disabled={checkToday}
						error={!!dateError}
                        helperText={dateError}
					/>
					<FormControlLabel 
						control={ 
							<Checkbox 
								checked={checkToday} 
								onChange={(e) => {
									setCheckToday(e.target.checked)
									const dateNow = new Date()
									setDate(`${dateNow.getUTCFullYear()}-${(dateNow.getUTCMonth() + 1).toString().padStart(2, '0')}-${dateNow.getUTCDate().toString().padStart(2, '0')}`)
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

					const timeError = state.errors?.find(
                        (e) => e.path[0] === 'punches' && e.path[1] === i && e.path[2] === 'time'
                    )?.message;

                    const typeError = state.errors?.find(
                        (e) => e.path[0] === 'punches' && e.path[1] === i && e.path[2] === 'type'
                    )?.message;

					return (
						<div key={field.id} className="flex flex-col gap-5" >
							<div className="flex gap-5">
								<FormControl fullWidth error={!!typeError} >
									<InputLabel id={`type-label-${field.id}`} >Tipo</InputLabel>
									<Select
										labelId={`type-label-${field.id}`}
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
									{typeError && <FormHelperText>{typeError}</FormHelperText>}
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
								InputLabelProps={{ shrink: true }}
								onChange={(e) => handleTimeChange(field.id, e.target.value)}
								value={field.time}
								error={!!timeError}
                                helperText={timeError}
							/>
						</div>
					)
				})}
				<input 
					type="hidden" 
					name="punches" 
					value={JSON.stringify(punchFields)} 
				/>
				<input 
					type="hidden" 
					name="date" 
					value={date} 
				/>
				<Button variant='contained' onClick={handleAdd} startIcon={<AddBoxIcon />} disabled={punchFields.length >= 4}>
					Adicionar
				</Button>
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
	)
}