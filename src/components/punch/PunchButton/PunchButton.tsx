"use client"
import { Alert, Button } from "@mui/material";
import { useState, useTransition } from "react";
import { addPunchAction } from "@/actions/punch.action";
import PunchClockIcon from '@mui/icons-material/PunchClock';


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
			<Button 
				onClick={handleClick} 
				disabled={isPending || disabled} 
				variant="contained" 
				sx={{display: "flex", gap: "10px"}} 
			>
				<PunchClockIcon />
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