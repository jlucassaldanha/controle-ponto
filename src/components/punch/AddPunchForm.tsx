'use client'
import SubmitButton from "@/components/ui/SubmitButton";
import { Alert, Button } from "@mui/material";
import { useActionState } from "react";
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
		<form action={formAction} className="flex flex-col gap-5 m-8 border-[1px] border-gray-300 rounded-md p-7">
			<div className="flex justify-center items-center">
				<DateInput 
					checkToday={checkToday} 
					date={date} 
					state={state} 
					setDate={setDate} 
					setCheckToday={setCheckToday} 
				/>
			</div>
			<div className="flex flex-col md:flex-row gap-7 justify-center items-center">
				{punchFields.map((field, i) => {
					const usedPunchType = punchFields.map((field) => {
						return field.type
					})
					
					return (
						<PunchTypeTimeForm 
							field={field}
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
				<div className="flex justify-center items-center gap-5">
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
				</div>
				
				{state.message && (
					<Alert severity={state.success ? "success" : "error"}>
						{state.message}
					</Alert>
				)}
				{state.errors?.punches && (
					<div>
						{[...new Set(state.errors.punches)].map((error, i) => (
							<Alert key={i} severity="error">
								{error}
							</Alert>
						))}
					</div>
				)}
				{state.errors?.date && (
					<div>
						{[...new Set(state.errors.date)].map((error, i) => (
							<Alert key={i} severity="error">
								{error}
							</Alert>
						))}
					</div>
				)}
			</div>
		</form>
	)
}