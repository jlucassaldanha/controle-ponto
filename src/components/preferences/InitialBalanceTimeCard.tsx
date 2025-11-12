"use client"

import { Card, CardHeader, Divider, TextField } from "@mui/material"
import { useState } from "react"
import SubmitButton from "../ui/SubmitButton"

export default function InitialBalnceTimeCard() {
	const [timeValue, setTimeValue] = useState("")

	const handleTimeChange = (value: string) => {
		setTimeValue(value)
	}

	return (
		<div className="flex flex-col gap-3">
			<Card variant="outlined">
				<CardHeader 
					title="Saldo inicial"
				/>
				<Divider/>
				<form className="flex justify-center p-5">
					<TextField
						variant="outlined"
						label="Tempo"
						type='time'
						name={`initialBalnceTime`}
						value={timeValue} 
						slotProps={{ inputLabel: { shrink: true } }}
						onChange={(e) => handleTimeChange(e.target.value)}
					/>
				</form>
			</Card>
			<SubmitButton 
				text="Salvar"
				variant="contained"
			/>
		</div>
	)
}