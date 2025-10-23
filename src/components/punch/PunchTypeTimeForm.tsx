import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import { PunchType } from "@prisma/client";
import { PunchFieldType } from "./AddPunchForm";

type PunchTypeTimeFormProps = {
	field: PunchFieldType
	usedPunchType: string[]
	handleRemove: (id: string) => void
	handleTimeChange: (fieldId: string, time: string) => void
	handleSelectChange: (event: SelectChangeEvent, fieldId: string) => void 
}

export default function PunchTypeTimeForm({ field, usedPunchType,  handleRemove, handleSelectChange, handleTimeChange}: PunchTypeTimeFormProps) {
	return (
		<div className="flex flex-col gap-5 min-w-[220px] border-[1px] border-gray-300 rounded-md p-5" >
			<FormControl className="min-w-[100px]">
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
			<TextField
				variant="outlined"
				label="Hora"
				name="punchTime"
				id="punchTime"
				type="time"
				slotProps={{ inputLabel: { shrink: true } }}
				onChange={(e) => handleTimeChange(field.id, e.target.value)}
				value={field.time}
			/>
			<div className="flex justify-center items-center w-full border-t-[1px] border-gray-200 pt-3" >
				<IconButton disabled={field.type === PunchType.CLOCK_IN || field.type === PunchType.CLOCK_OUT} aria-label="delete" onClick={() => handleRemove(field.id)}>
					<DeleteIcon />
				</IconButton>
			</div>
			
		</div>
	)
}