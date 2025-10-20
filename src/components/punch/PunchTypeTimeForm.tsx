import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import { PunchType } from "@prisma/client";
import { PunchFieldType } from "./AddPunchForm";

type PunchTypeTimeFormProps = {
	field: PunchFieldType
	usedPunchType: string[]
	fieldErrors: string[] | undefined
	handleRemove: (id: string) => void
	handleTimeChange: (fieldId: string, time: string) => void
	handleSelectChange: (event: SelectChangeEvent, fieldId: string) => void 
}

export default function PunchTypeTimeForm({ field, usedPunchType, fieldErrors, handleRemove, handleSelectChange, handleTimeChange}: PunchTypeTimeFormProps) {
	return (
		<div className="flex flex-col gap-5" >
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
				<IconButton className="w-[50px] h-[50px]" aria-label="delete" onClick={() => handleRemove(field.id)}>
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
			{fieldErrors?.map((error) => <p className="text-red-500" key={error}>{error}</p>)}
		</div>
	)
}