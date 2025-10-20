'use client'
import SubmitButton from "@/components/ui/SubmitButton";
import { Button, SelectChangeEvent } from "@mui/material";
import { useActionState, useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { addPunchesAction, type addPunchesActionForm } from "@/actions/punch.action";
import DateInput from "@/components/punch/DateInput";
import PunchTypeTimeForm from "@/components/punch/PunchTypeTimeForm";
import AddPunchHiddenInputs from "@/components/punch/AddPunchHiddenInputs";

export type PunchFieldType = {
	id: string,
	time: string,
	type: string,
}

export default function AddPunchForm() {
	const initialState: addPunchesActionForm = { success: false }
	const [state, formAction] = useActionState(addPunchesAction, initialState);

	const [checkToday, setCheckToday] = useState(false)
	const [date, setDate] = useState('')
	const [punchFields, setPunchFields] = useState<PunchFieldType[]>([])

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
		<form action={formAction} className="flex flex-col gap-5 mt-4">
			<DateInput 
				checkToday={checkToday} 
				date={date} 
				state={state} 
				setDate={setDate} 
				setCheckToday={setCheckToday} 
			/>
			{punchFields.map((field, i) => {
				const usedPunchType = punchFields.map((field) => {
					return field.type
				})
				const fieldErrors = state.errors?.punches
				return (
					<PunchTypeTimeForm 
						field={field}
						fieldErrors={fieldErrors}
						usedPunchType={usedPunchType}
						handleRemove={handleRemove}
						handleSelectChange={handleSelectChange}
						handleTimeChange={handleTimeChange}
						key={field.id}
					/>
				)
			})}
			<AddPunchHiddenInputs 
				date={date}
				stringPunchFields={JSON.stringify(punchFields)}
			/>
			<Button 
				variant='contained' 
				onClick={handleAdd} 
				startIcon={<AddBoxIcon />} 
				disabled={punchFields.length >= 4}
			>
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
	)
}