"use client"
import { Alert, Button } from "@mui/material";
import { useState, useTransition } from "react";
import { addPunchAction } from "@/actions/punch.action";


export default function PunchButton({disabled}: {disabled: boolean}) {
	const [isPending, startTransition] = useTransition()
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleClick = () => {
		setErrorMessage(null)

		startTransition(async () => {
			const result = await addPunchAction()

			if (result.error) {
				setErrorMessage(result.error)
			}

		})
	}

	return (
		<div>
			<Button onClick={handleClick} disabled={isPending || disabled} variant="contained" >
				{isPending ? 'Registrando...' : 'Bater ponto'}
			</Button>
			{errorMessage && (
				<Alert severity="error">
					{errorMessage}
				</Alert>
			)}
		</div>
	)
}