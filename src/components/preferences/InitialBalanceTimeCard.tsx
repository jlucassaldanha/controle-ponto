"use client"

import { Alert, Card, CardHeader, Divider, FormControlLabel, Switch, TextField } from "@mui/material"
import { useActionState, useState } from "react"
import SubmitButton from "../ui/SubmitButton"
import SaveIcon from '@mui/icons-material/Save';
import { BalanceTimeFormState, updateInitialBalanceAction } from "@/actions/preferences.action";

export default function InitialBalanceTimeCard({ initialBalance, isNegative }: {initialBalance: string, isNegative: boolean}) {
	const [timeValue, setTimeValue] = useState(initialBalance)
	const [isNegativeState, setIsNegativeState] = useState(isNegative)

	const initialState: BalanceTimeFormState = { success: false };

	const [state, formAction] = useActionState(updateInitialBalanceAction, initialState);

	const handleTimeChange = (value: string) => {
		setTimeValue(value)
	}

	const handleIsNegativeChange = (value: boolean) => {
		setIsNegativeState(value)
	}

	return (
		<div className="flex flex-col gap-3 justify-center items-center">
			{state.message && (
				<Alert severity={state.success ? "success" : "error"}>
					{state.message}
				</Alert>
			)}
			<Card variant="outlined">
				<CardHeader 
					title="Saldo inicial"
				/>
				<Divider/>
				<div className="flex flex-col justify-center items-center gap-10 p-5">
					<div className="flex gap-5 items-center">
						<div className="flex flex-col">
							<FormControlLabel label="Saldo negativo" control={
								<Switch 
									checked={isNegativeState}
									onChange={(e) => handleIsNegativeChange(e.target.checked)}
								/>} 
							/>
						</div>
						<TextField
							variant="outlined"
							label="Tempo"
							type='time'
							name={"time"}
							value={timeValue} 
							slotProps={{ inputLabel: { shrink: true } }}
							onChange={(e) => handleTimeChange(e.target.value)}
						/>
					</div>
					<form action={formAction}>
						<input 
							type="hidden" 
							name="initialBalancePayload" 
							value={JSON.stringify({ time: timeValue, isNegative: isNegativeState })} 
						/>
						<SubmitButton 
							className='w-[140px]'
							variant='contained' 
							text='Salvar' 
							pendingText='Salvando'
							startIcon={<SaveIcon />}
						/>
					</form>
				</div>
			</Card>
		</div>
	)
}