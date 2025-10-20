'use client'
import SubmitButton from "@/components/ui/SubmitButton";
import { Button, SelectChangeEvent } from "@mui/material";
import { useActionState, useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import { addPunchesAction, type addPunchesActionForm } from "@/actions/punch.action";
import DateInput from "@/components/punch/DateInput";
import PunchTypeTimeForm from "@/components/punch/PunchTypeTimeForm";
import AddPunchHiddenInputs from "@/components/punch/AddPunchHiddenInputs";
import { useAddPunch } from "@/hooks/useAddPunch";

export type PunchFieldType = {
	id: string,
	time: string,
	type: string,
}

export default function AddPunchForm() {
	const {
		checkToday,
		date,
		punchFields,
		setCheckToday,
		setDate,
		handleAdd,
		handleRemove,
		handleSelectChange,
		handleTimeChange,
	} = useAddPunch()
	
	const initialState: addPunchesActionForm = { success: false }
	const [state, formAction] = useActionState(addPunchesAction, initialState);

	return (
		<form action={formAction} className="flex flex-col gap-5 mt-4 border-[1px] border-gray-300 rounded-md p-5">
			<div className="flex justify-center items-center">
				<DateInput 
					checkToday={checkToday} 
					date={date} 
					state={state} 
					setDate={setDate} 
					setCheckToday={setCheckToday} 
				/>
			</div>
			<div className="flex gap-7 justify-center items-center">
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
			</div>
			<div className="flex flex-col items-center justify-center gap-5">
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
			</div>
			
		</form>
	)
}